/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from "axios";
import { cookies } from "next/headers";

// Create the base axios instance
// Resolve a safe base URL for both server and client. During prerender/build,
// env vars like BACKEND_API may be undefined which causes Axios/WHATWG URL to
// throw "Invalid URL" when using relative request URLs. Provide fallbacks.
const resolvedBaseURL =
  process.env.BACKEND_API ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3000/api/v1";

export const axios = Axios.create({
  baseURL: resolvedBaseURL
});

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

// // For client-side requests, add a simple interceptor
// if (typeof window !== 'undefined') {
//   axios.interceptors.request.use(request => {
//     // Get token from document.cookie on client side
//     const cookies = document.cookie.split(';').reduce((acc, cookie) => {
//       const [key, value] = cookie.trim().split('=');
//       acc[key] = value;
//       return acc;
//     }, {} as Record<string, string>);

//     const accessToken = cookies['accessToken'];

//     if (accessToken && request.headers) {
//       request.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return request;
//   });
// }
