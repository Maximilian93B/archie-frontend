'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from '@/lib/api/client';
import type { User, LoginCredentials, RegisterData, AuthContextType } from '@/types';
import { toast } from 'react-hot-toast';

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => { throw new Error('Not implemented'); },
  logout: async () => { throw new Error('Not implemented'); },
  register: async () => { throw new Error('Not implemented'); },
  refreshToken: async () => false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('access_token');
        if (storedToken) {
          apiClient.setToken(storedToken);
          setToken(storedToken);
          
          // Validate token and get user data
          const userData = await apiClient.validateToken();
          setUser(userData);
        }
      } catch (error) {
        // Token is invalid, clear it
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        apiClient.clearToken();
        console.error('Token validation failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<User> => {
    try {
      const response = await apiClient.login(credentials);
      
      setUser(response.user);
      setToken(response.token);
      
      toast.success(`Welcome back, ${response.user.first_name}!`);
      return response.user;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (data: RegisterData): Promise<User> => {
    try {
      const response = await apiClient.register(data);
      
      setUser(response.user);
      setToken(response.token);
      
      toast.success(`Welcome to Archivus, ${response.user.first_name}!`);
      return response.user;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await apiClient.logout();
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with local logout even if API call fails
    } finally {
      setUser(null);
      setToken(null);
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const refreshTokenValue = localStorage.getItem('refresh_token');
      if (!refreshTokenValue) return false;

      // This would be handled by the API client internally
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    logout,
    register,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 