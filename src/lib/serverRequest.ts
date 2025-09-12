"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { axios } from "./axios";

// Create a function for server-side requests that automatically adds auth headers

export async function serverRequest(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: any,
  headers?: Record<string, string>
) {
  // Access cookies from the server context
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // Make the request with auth header if token exists
  return axios({
    url,
    method,
    data,
    headers: {
      ...headers,
      ...(accessToken && { Authorization: `Bearer ${accessToken}` })
    }
  });
}
