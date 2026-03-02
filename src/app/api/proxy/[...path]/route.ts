/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { serverRequest } from "@/lib/serverRequest";
import { AxiosResponseHeaders } from "axios";

async function handler(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    // Reconstruct the path from segments
    const params = await context.params;
    const pathSegments = "/" + params.path.join("/");

    // Get query parameters from the original URL
    const url = new URL(req.url);
    const queryString = url.search;

    // Extract headers to forward
    const headersToForward: Record<string, string> = {};
    req.headers.forEach((value, key) => {
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
        const formData = await req.formData();
        requestBody = formData;
        if (contentType) {
          headersToForward["content-type"] = contentType;
        }
      } else {
        requestBody = await req.text();
      }
    }

    // Make the API call with the clean path and query string
    const response = await serverRequest(
      pathSegments + queryString,
      req.method as "GET",
      requestBody,
      headersToForward
    );

    // Handle special status codes
    if (response.status === 304) {
      return new NextResponse(null, {
        status: 304,
        statusText: "Not Modified",
        headers: response.headers as AxiosResponseHeaders
      });
    }

    return NextResponse.json(response.data, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers as AxiosResponseHeaders
    });
  } catch (error: any) {
    const status = error.response?.status || 500;

    if (status === 304) {
      return new NextResponse(null, {
        status: 304,
        statusText: "Not Modified",
        headers: error.response?.headers || {}
      });
    }

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

    return NextResponse.json(errorData, { status });
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const HEAD = handler;
export const OPTIONS = handler;
