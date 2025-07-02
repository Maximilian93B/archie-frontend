import axios from 'axios';

class CSRFTokenManager {
  private token: string | null = null;
  private tokenExpiry: number | null = null;
  private fetchPromise: Promise<string> | null = null;

  async getToken(): Promise<string> {
    // Check if we have a valid token
    if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.token;
    }

    // If a fetch is already in progress, wait for it
    if (this.fetchPromise) {
      return this.fetchPromise;
    }

    // Fetch a new token
    this.fetchPromise = this.fetchToken();
    
    try {
      const token = await this.fetchPromise;
      return token;
    } finally {
      this.fetchPromise = null;
    }
  }

  private async fetchToken(): Promise<string> {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/csrf-token`,
        {
          withCredentials: true,
          timeout: 5000,
        }
      );

      const { token, expires_in } = response.data;
      
      this.token = token;
      // Set expiry to 5 minutes before actual expiry for safety
      this.tokenExpiry = Date.now() + (expires_in - 300) * 1000;
      
      return token;
    } catch (error) {
      console.error('Failed to fetch CSRF token:', error);
      throw new Error('Failed to fetch CSRF token');
    }
  }

  clearToken() {
    this.token = null;
    this.tokenExpiry = null;
    this.fetchPromise = null;
  }

  // Check if a request method requires CSRF protection
  requiresCSRF(method: string): boolean {
    const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
    return !safeMethods.includes(method.toUpperCase());
  }
}

export const csrfTokenManager = new CSRFTokenManager();