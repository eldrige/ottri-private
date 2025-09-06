import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  timeout: 1000 * 60 * 5,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuLmtheWlyYW5nYUBhbHVzdHVkZW50LmNvbSIsImlhdCI6MTc1NzE1NjMzNSwiZXhwIjoxNzU3MTg1MTM1fQ.Hbe6al-NCwsXXAXmHgzKhN1X5jjlpkm1C33pxSTZ7cY" // Hardcoded token
  }
});

export default axios;
