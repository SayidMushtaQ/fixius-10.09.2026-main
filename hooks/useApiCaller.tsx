"use client";
// useApiCaller.js
"use client";
import axios from "axios";
import { useState } from "react";

const useApiCaller = () => {
	// const { userData } = useAuth();
	const [apiCaller] = useState(() => {
		const instance = axios.create({
			baseURL: "/api", // Your API base URL
			// timeout: 5000, // Request timeout
			headers: {
				"Content-Type": "application/json",
			},
		});

		// Add a request interceptor to set the authorization token
		instance.interceptors.request.use(
			(config) => {
				const accessToken = localStorage.getItem("accessToken");
				if (accessToken) {
					config.headers.Authorization = `Bearer ${JSON.parse(
						accessToken
					)}`;
				}
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);

		// Add a response interceptor to handle common response logic
		instance.interceptors.response.use(
			(response) => {
				// Custom logic for successful responses
				return response;
			},
			(error) => {
				// Custom logic for handling errors
				return Promise.reject(error);
			}
		);

		return instance;
	});

	return apiCaller;
};

export default useApiCaller;
