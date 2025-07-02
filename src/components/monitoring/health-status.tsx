'use client'

import { AlertCircle, CheckCircle, AlertTriangle, Activity } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useSystemHealth } from '@/hooks/use-health-check'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export function HealthStatus() {
  const { isLoading, isHealthy, isDegraded, isUnhealthy, failedChecks, health, metrics } = useSystemHealth()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    )
  }

  const getStatusIcon = () => {
    if (isHealthy) return <CheckCircle className="h-5 w-5 text-green-600" />
    if (isDegraded) return <AlertTriangle className="h-5 w-5 text-amber-600" />
    return <AlertCircle className="h-5 w-5 text-red-600" />
  }

  const getStatusBadge = () => {
    if (isHealthy) return <Badge className="bg-green-100 text-green-800">Healthy</Badge>
    if (isDegraded) return <Badge className="bg-amber-100 text-amber-800">Degraded</Badge>
    return <Badge className="bg-red-100 text-red-800">Unhealthy</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Health
          </CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Overall Status */}
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <p className="font-medium">Overall System Status</p>
              <p className="text-sm text-gray-600">
                {isHealthy && 'All systems operational'}
                {isDegraded && `${failedChecks.length} service(s) degraded`}
                {isUnhealthy && 'System experiencing issues'}
              </p>
            </div>
          </div>

          {/* Service Status Grid */}
          {health && (
            <div className="grid grid-cols-2 gap-3 pt-4 border-t">
              {Object.entries(health.checks).map(([name, check]) => (
                <div key={name} className="flex items-center gap-2">
                  <div className={cn(
                    "h-2 w-2 rounded-full",
                    check.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'
                  )} />
                  <span className="text-sm capitalize">
                    {name.replace(/_/g, ' ')}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Metrics Summary */}
          {metrics && (
            <div className="grid grid-cols-2 gap-3 pt-4 border-t text-sm">
              <div>
                <p className="text-gray-600">Active Requests</p>
                <p className="font-medium">{metrics.application.requests_active}</p>
              </div>
              <div>
                <p className="text-gray-600">Avg Response Time</p>
                <p className="font-medium">{metrics.application.response_time_avg_ms.toFixed(0)}ms</p>
              </div>
              <div>
                <p className="text-gray-600">Memory Usage</p>
                <p className="font-medium">{metrics.system.memory.alloc_mb.toFixed(1)}MB</p>
              </div>
              <div>
                <p className="text-gray-600">Goroutines</p>
                <p className="font-medium">{metrics.system.num_goroutine}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}