'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
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

  // Initialize auth state from Supabase session
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.access_token) {
          setToken(session.access_token);
          
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
        await supabase.auth.signOut();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          try {
            const userData = await apiClient.validateToken();
            setUser(userData);
            setToken(session.access_token);
          } catch (error) {
            console.error('Error validating session:', error);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setToken(null);
          localStorage.removeItem('tenant_id');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (credentials: LoginCredentials): Promise<User> => {
    try {
      setIsLoading(true);
      
      // Login through backend API
      const response = await apiClient.login(credentials);
      
      // Set Supabase session
      const { error } = await supabase.auth.setSession({
        access_token: response.token,
        refresh_token: response.refresh_token,
      });
      
      if (error) throw error;
      
      setUser(response.user);
      setToken(response.token);
      
      // Store tenant ID
      if (response.user.tenant_id) {
        localStorage.setItem('tenant_id', response.user.tenant_id);
      }
      
      toast({
        title: 'Welcome back!',
        description: `Logged in as ${response.user.email}`,
      });
      
      router.push('/dashboard');
      return response.user;
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'Invalid credentials',
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
      
      // Register through backend API
      const response = await apiClient.register(data);
      
      // Set Supabase session
      const { error } = await supabase.auth.setSession({
        access_token: response.token,
        refresh_token: response.refresh_token,
      });
      
      if (error) throw error;
      
      setUser(response.user);
      setToken(response.token);
      
      // Store tenant ID
      if (response.user.tenant_id) {
        localStorage.setItem('tenant_id', response.user.tenant_id);
      }
      
      toast({
        title: 'Account created!',
        description: 'Welcome to Archivus.',
      });
      
      router.push('/dashboard');
      return response.user;
    } catch (error) {
      console.error('Registration failed:', error);
      toast({
        title: 'Registration failed',
        description: error instanceof Error ? error.message : 'Failed to create account',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Logout from backend
      await apiClient.logout();
      
      // Logout from Supabase
      await supabase.auth.signOut();
      
      setUser(null);
      setToken(null);
      localStorage.removeItem('tenant_id');
      
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Logout error',
        description: 'There was a problem logging out.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession();
      
      if (error || !session) {
        throw new Error('Failed to refresh session');
      }
      
      setToken(session.access_token);
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