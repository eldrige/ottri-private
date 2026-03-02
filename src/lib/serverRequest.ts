"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { axiosInstance } from "./axios";

// Create a function for server-side requests that automatically adds auth headers

export async function serverRequest(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  data?: any,
  headers?: Record<string, string>
) {
  // Access cookies from the server context
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // If data is FormData, make sure axios doesn't try to transform it
  const config: any = {
    url,
    method,
    data,
    headers: {
      ...headers,
      ...(accessToken && { Authorization: `Bearer ${accessToken}` })
    }
  };

  // Add special handling for FormData
  if (data instanceof FormData) {
    // axios will automatically set the correct content-type with boundary
    config.transformRequest = [(data: any) => data];
  }

  // Make the request with auth header if token exists
  return axiosInstance(config);
}
