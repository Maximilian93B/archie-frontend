import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'

interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy'
  checks: {
    database: { status: string; duration?: string; message?: string }
    redis: { status: string; message?: string }
    rate_limiter: { status: string }
    claude_ai: { status: string }
    storage: { status: string }
    external_deps: { status: string }
  }
  system: {
    go_version: string
    num_goroutine: number
    memory: {
      alloc_mb: number
      total_alloc_mb: number
      sys_mb: number
      num_gc: number
    }
  }
  timestamp: string
}

interface SystemMetrics {
  timestamp: string
  system: {
    go_version: string
    num_goroutine: number
    memory: {
      alloc_mb: number
      total_alloc_mb: number
      sys_mb: number
      num_gc: number
    }
  }
  application: {
    uptime_seconds: number
    requests_total: number
    requests_active: number
    response_time_avg_ms: number
  }
  redis: {
    mode: string
    cluster_addresses: number
    route_by_latency: boolean
  }
}

export function useHealthCheck() {
  return useQuery<HealthCheckResult>({
    queryKey: ['health', 'detailed'],
    queryFn: async () => {
      // Health endpoints don't require auth
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health/detailed`)
      if (!response.ok) throw new Error('Failed to fetch health status')
      return response.json()
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Check every minute
  })
}

export function useSystemMetrics() {
  return useQuery<SystemMetrics>({
    queryKey: ['health', 'metrics'],
    queryFn: async () => {
      // Metrics endpoints don't require auth
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/metrics`)
      if (!response.ok) throw new Error('Failed to fetch metrics')
      return response.json()
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Update every minute
  })
}

// Hook to check overall system health
export function useSystemHealth() {
  const healthQuery = useHealthCheck()
  const metricsQuery = useSystemMetrics()

  const isHealthy = healthQuery.data?.status === 'healthy'
  const isDegraded = healthQuery.data?.status === 'degraded'
  const isUnhealthy = healthQuery.data?.status === 'unhealthy'

  const failedChecks = healthQuery.data ? Object.entries(healthQuery.data.checks)
    .filter(([_, check]) => check.status !== 'healthy')
    .map(([name, check]) => ({ name, ...check })) : []

  return {
    isLoading: healthQuery.isLoading || metricsQuery.isLoading,
    isError: healthQuery.isError || metricsQuery.isError,
    isHealthy,
    isDegraded,
    isUnhealthy,
    failedChecks,
    health: healthQuery.data,
    metrics: metricsQuery.data,
    refetch: () => {
      healthQuery.refetch()
      metricsQuery.refetch()
    }
  }
}