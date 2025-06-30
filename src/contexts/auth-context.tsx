'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api/client';
import type { User, LoginCredentials, RegisterData, AuthContextType } from '@/types';
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => { throw new Error('Not implemented'); },
  logout: async () => { throw new Error('Not implemented'); },
  register: async () => { throw new Error('Not implemented'); },
  refreshToken: async () => false,
  setAuth: async () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated = !!user && !!token;

  // Initialize auth state from stored tokens
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('access_token');
        
        if (storedToken) {
          apiClient.setToken(storedToken);
          setToken(storedToken);
          
          // Validate token and get user data from backend
          const userData = await apiClient.validateToken();
          setUser(userData);
          
          // Store tenant ID if available
          if (userData.tenant_id) {
            localStorage.setItem('tenant_id', userData.tenant_id);
          }
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        // Clear invalid tokens
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('tenant_id');
        apiClient.clearToken();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<User> => {
    try {
      setIsLoading(true);
      
      // Login through backend API
      const response = await apiClient.login(credentials);
      
      setUser(response.user);
      setToken(response.token);
      
      // Store tenant ID
      if (response.user.tenant_id) {
        localStorage.setItem('tenant_id', response.user.tenant_id);
      }
      
      toast({
        title: 'Success',
        description: 'Successfully logged in!',
      });
      
      return response.user;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      toast({
        title: 'Login failed',
        description: message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<User> => {
    try {
      setIsLoading(true);
      
      const response = await apiClient.register(data);
      
      setUser(response.user);
      setToken(response.token);
      
      // Store tokens
      localStorage.setItem('access_token', response.token);
      localStorage.setItem('refresh_token', response.refresh_token);
      
      if (response.user.tenant_id) {
        localStorage.setItem('tenant_id', response.user.tenant_id);
      }
      
      apiClient.setToken(response.token);
      
      toast({
        title: 'Success',
        description: 'Account created successfully!',
      });
      
      return response.user;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      toast({
        title: 'Registration failed',
        description: message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local state and storage
      setUser(null);
      setToken(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('tenant_id');
      apiClient.clearToken();
      
      router.push('/auth/login');
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) return false;

      const response = await apiClient.post<any>('/api/v1/auth/refresh', {
        refresh_token: refreshToken,
      });

      if (response.token) {
        setToken(response.token);
        localStorage.setItem('access_token', response.token);
        localStorage.setItem('refresh_token', response.refresh_token);
        apiClient.setToken(response.token);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  };

  const setAuth = async (userData: User, accessToken: string) => {
    setUser(userData);
    setToken(accessToken);
    apiClient.setToken(accessToken);
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
    setAuth,
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