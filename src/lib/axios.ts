import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  timeout: 1000 * 60 * 5,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuLmtheWlyYW5nYUBhbHVzdHVkZW50LmNvbSIsImlhdCI6MTc1NzA4MDg5NCwiZXhwIjoxNzU3MTA5Njk0fQ.P6mZ_U6Alqihrmyn_Wu9HgQy15tt_l47NcHKCqcDVFA" // Hardcoded token
  }
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axios;
