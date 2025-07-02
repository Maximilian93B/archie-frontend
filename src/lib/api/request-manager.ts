import { apiClient } from './client';

/**
 * RequestManager helps manage cancellable requests and cleanup
 */
export class RequestManager {
  private controllers: Map<string, AbortController> = new Map();

  /**
   * Create a cancellable request with a unique key
   */
  createRequest(key: string): AbortSignal {
    // Cancel any existing request with the same key
    this.cancelRequest(key);

    // Create new controller
    const controller = new AbortController();
    this.controllers.set(key, controller);

    return controller.signal;
  }

  /**
   * Cancel a specific request
   */
  cancelRequest(key: string): void {
    const controller = this.controllers.get(key);
    if (controller) {
      controller.abort();
      this.controllers.delete(key);
    }
  }

  /**
   * Cancel all managed requests
   */
  cancelAll(): void {
    this.controllers.forEach(controller => controller.abort());
    this.controllers.clear();
  }

  /**
   * Clean up completed requests
   */
  cleanup(key: string): void {
    this.controllers.delete(key);
  }
}

// Global request manager instance
export const requestManager = new RequestManager();

/**
 * React hook for managing request lifecycle
 */
export function useRequestManager() {
  const manager = new RequestManager();

  // Cleanup on unmount
  if (typeof window !== 'undefined') {
    import('react').then(({ useEffect }) => {
      useEffect(() => {
        return () => {
          manager.cancelAll();
        };
      }, []);
    });
  }

  return manager;
}