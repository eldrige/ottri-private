import Axios from "axios";

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
