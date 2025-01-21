import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Define the structure of your tokens
interface Tokens {
  accessToken: string;
  refreshToken: string;
}

// Define the structure of the refresh token response
interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your API base URL
  timeout: 10000, // Request timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get the access token from storage
const getAccessToken = (): string | null => {
  return localStorage.getItem('access_token');
};

// Function to get the refresh token from storage
const getRefreshToken = (): string | null => {
  return localStorage.getItem('refresh_token');
};

// Function to refresh the access token
const refreshAccessToken = async (): Promise<Tokens | null> => {
  try {
    const refreshToken = getRefreshToken(); // Get the refresh token from storage
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    // Make a request to refresh the token
    const response = await axios.post<RefreshTokenResponse>(
      `${axiosInstance.defaults.baseURL}/v1/api/auth/refresh`,
      { refreshToken }
    );

    // Update the tokens in storage
    localStorage.setItem('access_token', response.data.accessToken);
    localStorage.setItem('refresh_token', response.data.refreshToken);

    return {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    };
  } catch (error) {
    console.error('Failed to refresh token:', error);
    // Clear tokens and redirect to login if refresh fails
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login'; // Redirect to login page
    return null;
  }
};

// Add a request interceptor to attach the access token to each request
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers = config.headers || {}; // Ensure headers object exists
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh logic
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token (401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      // Refresh the access token
      const tokens = await refreshAccessToken();
      if (tokens) {
        // Update the Authorization header with the new access token
        originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
        return axiosInstance(originalRequest); // Retry the original request
      }
    }

    // Handle other errors
    return Promise.reject(error);
  }
);

export default axiosInstance;