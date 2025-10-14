/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { serverRequest } from "@/lib/serverRequest";

/**
 * Handles all HTTP methods and forwards them to the backend API
 */
async function handler(req: NextRequest) {
  try {
    // Get the path from the request URL
    const url = new URL(
      "https://example.com" + (req.nextUrl.searchParams.get("path") || "")
    );
    // const pathSegments = url.pathname.replace('/api/proxy', '');
    const pathSegments = url.pathname;

    console.log(url.searchParams);
    // Extract query parameters as a plain object
    const queryParams: Record<string, string> = {};
    url.searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });

    // Extract relevant headers to forward
    const headersToForward: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      // Skip headers that shouldn't be forwarded
      if (
        ![
          "host",
          "connection",
          "content-length",
          "sec-fetch-dest",
          "sec-fetch-mode",
          "sec-fetch-site"
        ].includes(key.toLowerCase())
      ) {
        headersToForward[key] = value;
      }
    });

    // Extract request body for methods that support it
    let requestBody;
    if (req.method !== "GET" && req.method !== "HEAD") {
      const contentType = req.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        requestBody = await req.json();
      } else if (contentType?.includes("multipart/form-data")) {
        // Handle FormData
        const formData = await req.formData();
        requestBody = formData;

        // Make sure to override the content-type header to include boundary
        // The browser sets this automatically when sending FormData
        if (contentType) {
          headersToForward["content-type"] = contentType;
        }
      } else {
        requestBody = await req.text();
      }
    }

    // Use serverRequest helper to make the API call
    const response = await serverRequest(
      pathSegments + (url.search || ""),
      req.method as any,
      requestBody,
      headersToForward
    );

    // Handle special status codes that shouldn't include a body
    if (response.status === 304) {
      return new NextResponse(null, {
        status: 304,
        statusText: "Not Modified",
        headers: response.headers as any
      });
    }

    // For normal responses, include the data
    return NextResponse.json(response.data, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers as any
    });
  } catch (error: any) {
    console.error("Proxy error:", error);

    // Return error with status code if available from axios error
    const status = error.response?.status || 500;

    // Handle special status codes in error responses
    if (status === 304) {
      return new NextResponse(null, {
        status: 304,
        statusText: "Not Modified",
        headers: error.response?.headers || {}
      });
    }

    // For status codes that expect no content
    if (status === 204 || status === 205) {
      return new NextResponse(null, {
        status,
        statusText: error.response?.statusText || "",
        headers: error.response?.headers || {}
      });
    }

    const errorData = error.response?.data || {
      error: "Failed to proxy request"
    };

    return NextResponse.json(errorData, {
      status
    });
  }
}

// Export all HTTP method handlers
export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const HEAD = handler;
export const OPTIONS = handler;
