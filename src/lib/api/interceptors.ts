import { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { APIErrorHandler } from './error-handler';
import { DEFAULT_RETRY_CONFIG, RequestConfig } from './request-config';
import { csrfTokenManager } from './csrf';

export class InterceptorManager {
  private client: AxiosInstance;
  private getToken: () => string | null;
  private refreshToken: () => Promise<boolean>;
  private onUnauthorized: () => void;

  constructor(
    client: AxiosInstance,
    getToken: () => string | null,
    refreshToken: () => Promise<boolean>,
    onUnauthorized: () => void
  ) {
    this.client = client;
    this.getToken = getToken;
    this.refreshToken = refreshToken;
    this.onUnauthorized = onUnauthorized;
  }

  setupInterceptors() {
    this.setupRequestInterceptor();
    this.setupResponseInterceptor();
  }

  private setupRequestInterceptor() {
    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const requestConfig = config.requestConfig as RequestConfig;

        // Add auth token if not skipped
        if (!requestConfig?.skipAuth) {
          const token = this.getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }

        // Add tenant header when available
        const tenantSubdomain = typeof window !== 'undefined' 
          ? localStorage.getItem('tenant_subdomain') 
          : null;
        if (tenantSubdomain) {
          config.headers['X-Tenant-Subdomain'] = tenantSubdomain;
          
          // Debug log in development
          if (process.env.NODE_ENV === 'development' && typeof tenantSubdomain !== 'string') {
            console.warn('[API] Invalid tenant subdomain type:', typeof tenantSubdomain, tenantSubdomain);
          }
        }

        // Add CSRF token for state-changing requests
        if (csrfTokenManager.requiresToken(config.method || '')) {
          try {
            const csrfToken = await csrfTokenManager.get();
            config.headers['X-CSRF-Token'] = csrfToken;
          } catch (error) {
            console.error('[API] Failed to get CSRF token:', error);
            // Continue without CSRF token - let the server reject if needed
          }
        }

        // Note: Removed X-Request-ID header due to CORS restrictions
        // If request tracking is needed, it should be added to backend's allowed headers

        // Log request in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, {
            headers: config.headers,
            data: config.data,
          });
        }

        return config;
      },
      (error) => {
        console.error('[API] Request error:', error);
        return Promise.reject(error);
      }
    );
  }

  private setupResponseInterceptor() {
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log response in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`[API] Response ${response.config.url}:`, response.data);
        }
        
        // Check rate limit headers
        const remaining = response.headers['x-ratelimit-remaining'];
        const reset = response.headers['x-ratelimit-reset'];
        
        if (remaining && parseInt(remaining) < 10) {
          // Warn user about approaching rate limit
          console.warn(`[API] Rate limit warning: ${remaining} requests remaining`);
          if (parseInt(remaining) < 5) {
            import('@/hooks/use-toast').then(({ toast }) => {
              toast({
                title: 'Rate Limit Warning',
                description: `Only ${remaining} requests remaining. Please slow down.`,
                variant: 'default',
              });
            });
          }
        }
        
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        const requestConfig = originalRequest?.requestConfig as RequestConfig;

        // Handle 403 CSRF Token errors
        if (error.response?.status === 403 && 
            (error.response?.data?.code === 'CSRF_TOKEN_REQUIRED' ||
             error.response?.data?.error?.includes('CSRF'))) {
          
          // Clear invalid token and retry once
          if (!originalRequest._csrfRetry) {
            originalRequest._csrfRetry = true;
            csrfTokenManager.clear();
            
            try {
              const newToken = await csrfTokenManager.get();
              originalRequest.headers['X-CSRF-Token'] = newToken;
              return this.client.request(originalRequest);
            } catch (csrfError) {
              console.error('[API] Failed to refresh CSRF token:', csrfError);
            }
          }
        }

        // Handle 401 Unauthorized
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          // Try to refresh token
          const refreshed = await this.refreshToken();
          if (refreshed) {
            // Update the auth header with new token
            const newToken = this.getToken();
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            // Retry the original request
            return this.client.request(originalRequest);
          } else {
            // Refresh failed, redirect to login
            this.onUnauthorized();
            return Promise.reject(error);
          }
        }

        // Handle retries for other errors
        if (this.shouldRetry(error, originalRequest)) {
          return this.retryRequest(error, originalRequest);
        }

        // Handle error display
        const apiError = APIErrorHandler.handle(error);
        APIErrorHandler.showError(apiError, { silent: requestConfig?.silent });

        return Promise.reject(error);
      }
    );
  }

  private shouldRetry(error: any, config: any): boolean {
    const requestConfig = config?.requestConfig as RequestConfig;
    
    // Check if retries are disabled
    if (requestConfig?.retry === false) {
      return false;
    }

    // Check retry count
    const retryCount = config._retryCount || 0;
    const maxRetries = requestConfig?.retry && typeof requestConfig.retry === 'object'
      ? requestConfig.retry.maxRetries || DEFAULT_RETRY_CONFIG.maxRetries
      : DEFAULT_RETRY_CONFIG.maxRetries;

    if (retryCount >= maxRetries) {
      return false;
    }

    // Check if error is retryable
    return APIErrorHandler.isRetryable(error);
  }

  private async retryRequest(error: any, config: any) {
    const retryCount = (config._retryCount || 0) + 1;
    config._retryCount = retryCount;

    const delay = APIErrorHandler.getRetryDelay(error, retryCount);
    
    console.log(`[API] Retrying request (attempt ${retryCount}), waiting ${delay}ms...`);
    
    await new Promise(resolve => setTimeout(resolve, delay));
    
    return this.client.request(config);
  }

}