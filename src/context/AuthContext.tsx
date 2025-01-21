import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance'; // Import your axiosInstance

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() => 
    localStorage.getItem('access_token')
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
    localStorage.getItem('refresh_token')
  );

  const login = async (email: string, password: string) => {
    try {
      // Make a POST request to the login endpoint
      const response = await axiosInstance.post('/v1/api/auth/login', {
        email,
        password,
      });

      // Extract tokens from the response
      const { accessToken, refreshToken } = response.data;

      // Store tokens in state and localStorage
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    // Clear tokens from state and localStorage
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: !!accessToken, 
      accessToken, 
      refreshToken, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);