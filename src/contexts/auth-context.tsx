'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api/client';
import type { User, LoginCredentials, RegisterData, AuthContextType } from '@/types';
import { toast } from '@/hooks/use-toast';
import { useSubscriptionStore } from '@/store/subscription-store';
import Cookies from 'js-cookie';

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
          // Note: We don't know the expiration time here, so we'll validate it
          apiClient.setToken(storedToken);
          setToken(storedToken);
          
          // Validate token and get user data from backend
          const userData = await apiClient.validateToken();
          setUser(userData);
          
          // Store tenant subdomain if available
          if (userData.tenant_subdomain || userData.company) {
            // Use tenant_subdomain if available, otherwise derive from company name
            const subdomain = userData.tenant_subdomain || userData.company?.toLowerCase().replace(/[^a-z0-9]/g, '-');
            if (subdomain) {
              localStorage.setItem('tenant_subdomain', subdomain);
            }
          }
          
          // Fetch subscription status
          try {
            const subscriptionStore = useSubscriptionStore.getState();
            await subscriptionStore.fetchStatus();
            
            // Set subscription cookies for middleware
            const subscription = subscriptionStore.subscription;
            if (subscription) {
              Cookies.set('has_subscription', String(subscription.isActive), { expires: 1 });
              Cookies.set('is_trialing', String(subscription.isTrialing), { expires: 1 });
            } else {
              Cookies.set('has_subscription', 'false', { expires: 1 });
              Cookies.set('is_trialing', 'false', { expires: 1 });
            }
          } catch (subError) {
            console.warn('Failed to fetch subscription status on init:', subError);
          }
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        // Clear invalid tokens
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('tenant_subdomain');
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
      
      // Store tenant subdomain
      if (response.user.tenant_subdomain || response.user.company) {
        // Use tenant_subdomain if available, otherwise derive from company name
        const subdomain = response.user.tenant_subdomain || response.user.company?.toLowerCase().replace(/[^a-z0-9]/g, '-');
        if (subdomain) {
          localStorage.setItem('tenant_subdomain', subdomain);
        }
      }
      
      // Fetch subscription status after login
      try {
        const subscriptionStore = useSubscriptionStore.getState();
        await subscriptionStore.fetchStatus();
        
        // Set subscription cookies for middleware
        const status = subscriptionStore.status;
        if (status) {
          const hasActiveSubscription = status.status === 'active' || status.status === 'trialing';
          const isTrialing = status.trial === true;
          Cookies.set('has_subscription', String(hasActiveSubscription), { expires: 1 });
          Cookies.set('is_trialing', String(isTrialing), { expires: 1 });
        } else {
          Cookies.set('has_subscription', 'false', { expires: 1 });
          Cookies.set('is_trialing', 'false', { expires: 1 });
        }
      } catch (subError) {
        console.warn('Failed to fetch subscription status:', subError);
        // Don't fail login if subscription check fails
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
      
      if (response.user.tenant_subdomain || response.user.company) {
        // Use tenant_subdomain if available, otherwise derive from company name
        const subdomain = response.user.tenant_subdomain || response.user.company?.toLowerCase().replace(/[^a-z0-9]/g, '-');
        if (subdomain) {
          localStorage.setItem('tenant_subdomain', subdomain);
        }
      }
      
      apiClient.setToken(response.token, response.expires_in);
      
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
      localStorage.removeItem('tenant_subdomain');
      apiClient.clearToken();
      
      // Clear subscription state and cookies
      const subscriptionStore = useSubscriptionStore.getState();
      subscriptionStore.clearCache();
      Cookies.remove('has_subscription');
      Cookies.remove('is_trialing');
      
      router.push('/auth/login');
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    // Use the API client's refreshToken method which handles everything
    const success = await apiClient.refreshToken();
    
    if (success) {
      // Update local state with the new token
      const newToken = apiClient.getStoredToken();
      if (newToken) {
        setToken(newToken);
      }
    }
    
    return success;
  };

  const setAuth = async (userData: User, accessToken: string, expiresIn?: number) => {
    setUser(userData);
    setToken(accessToken);
    apiClient.setToken(accessToken, expiresIn);
    
    // Store subdomain consistently
    if (userData.tenant_subdomain || userData.company) {
      const subdomain = userData.tenant_subdomain || 
                       userData.company?.toLowerCase().replace(/[^a-z0-9]/g, '-');
      if (subdomain) {
        localStorage.setItem('tenant_subdomain', subdomain);
      }
    }
    
    // Fetch subscription status after setting auth
    try {
      const subscriptionStore = useSubscriptionStore.getState();
      await subscriptionStore.fetchStatus();
      
      // Set subscription cookies for middleware
      const status = subscriptionStore.status;
      if (status) {
        const hasActiveSubscription = status.status === 'active' || status.status === 'trialing';
        const isTrialing = status.trial === true;
        Cookies.set('has_subscription', String(hasActiveSubscription), { expires: 1 });
        Cookies.set('is_trialing', String(isTrialing), { expires: 1 });
      }
    } catch (subError) {
      console.warn('Failed to fetch subscription status in setAuth:', subError);
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