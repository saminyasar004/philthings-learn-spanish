import axios from "axios";
import { backendApiBaseUrl } from "@/config/dotenv";

// Create an Axios instance
const axiosInstance = axios.create({
	baseURL: backendApiBaseUrl, // Replace with your backend API base URL
	timeout: 10000, // 10-second timeout
	headers: {
		"Content-Type": "application/json",
		// Add authentication token if needed (e.g., from localStorage)
		// Authorization: `Bearer ${localStorage.getItem("token")}`,
	},
});

// Request interceptor to add token or modify requests
axiosInstance.interceptors.request.use(
	(config) => {
		// Example: Add token from localStorage or context
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
	(response) => {
		return response.data; // Return just the data for convenience
	},
	(error) => {
		// Handle errors (e.g., 401, 500) globally
		if (error.response) {
			switch (error.response.status) {
				case 401:
					console.log("Unauthorized - Please log in again");
					// Optionally redirect to login page
					break;
				case 500:
					console.log("Server error - Please try again later");
					break;
				default:
					console.log(`Error: ${error.response.status}`);
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
