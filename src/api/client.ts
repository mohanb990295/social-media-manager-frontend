import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"; // Backend

export const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors for auth, error handling, etc.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
