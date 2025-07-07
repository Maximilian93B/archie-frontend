'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Progress } from '@/components/ui/progress'
import { 
  Loader2, 
  ExternalLink, 
  CreditCard, 
  AlertCircle,
  FileText,
  HardDrive,
  Sparkles,
  Users,
  TrendingUp,
  Calendar,
  Download,
  Settings
} from 'lucide-react'
import { useSubscription } from '@/hooks/use-subscription'
import { formatPrice, formatNumber, formatBytes } from '@/types/subscription'
import { cn } from '@/lib/utils'
import { toast } from 'react-hot-toast'

export default function BillingPage() {
  const { 
    status,
    currentPlan,
    isLoading, 
    error, 
    openBillingPortal,
    checkQuota,
    refreshStatus,
    getRemainingQuota
  } = useSubscription()
  
  const [portalLoading, setPortalLoading] = useState(false)
  const [quotas, setQuotas] = useState<Record<string, any>>({})
  const [quotaLoading, setQuotaLoading] = useState(true)

  useEffect(() => {
    // Only load quotas, subscription status is already loaded by SubscriptionProvider
    loadQuotas()
  }, [])

  const loadQuotas = async () => {
    setQuotaLoading(true)
    try {
      // Check quotas to populate cache
      await Promise.all([
        checkQuota('documents', { showError: false, showWarning: false }),
        checkQuota('storage', { showError: false, showWarning: false }),
        checkQuota('ai_credits', { showError: false, showWarning: false })
      ])
      
      // Get quota details from cache
      setQuotas({
        documents: getRemainingQuota('documents'),
        storage: getRemainingQuota('storage'),
        ai_credits: getRemainingQuota('ai_credits')
      })
    } catch (error) {
      console.error('Failed to load quotas:', error)
    } finally {
      setQuotaLoading(false)
    }
  }

  const handleOpenPortal = async () => {
    setPortalLoading(true)
    try {
      await openBillingPortal()
    } finally {
      setPortalLoading(false)
    }
  }

  const formatPlanStatus = () => {
    if (!status) return { text: 'No Plan', variant: 'secondary' as const }
    
    switch (status.status) {
      case 'active':
        return { text: 'Active', variant: 'default' as const }
      case 'trialing':
        return { text: 'Trial', variant: 'secondary' as const }
      case 'past_due':
        return { text: 'Past Due', variant: 'destructive' as const }
      case 'canceled':
        return { text: 'Canceled', variant: 'outline' as const }
      default:
        return { text: 'Inactive', variant: 'secondary' as const }
    }
  }

  if (isLoading && !status) {
    return <BillingPageSkeleton />
  }

  const planStatus = formatPlanStatus()
  const nextBillingDate = status?.currentPeriodEnd ? new Date(status.currentPeriodEnd) : null

  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Billing & Usage</h1>
        <p className="text-gray-600 mt-2">
          Manage your subscription and monitor usage
        </p>
      </div>

      <div className="space-y-6">
        {/* Current Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>
              Your current plan and billing details
            </CardDescription>
          </CardHeader>
          <CardContent>
            {status?.hasSubscription ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold">
                        {currentPlan?.name || status.plan?.name || 'Subscription'}
                      </h3>
                      <Badge variant={planStatus.variant}>
                        {planStatus.text}
                      </Badge>
                      {status.isTrialing && (
                        <Badge variant="secondary">
                          <Calendar className="w-3 h-3 mr-1" />
                          Trial
                        </Badge>
                      )}
                    </div>
                    
                    {nextBillingDate && (
                      <p className="text-sm text-gray-600">
                        {status.isTrialing ? 'Trial ends' : 'Next billing date'} {' '}
                        {nextBillingDate.toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    )}
                    
                    {status.plan?.amount && (
                      <p className="text-2xl font-semibold mt-2">
                        {formatPrice(status.plan.amount, status.plan.currency)}
                        <span className="text-base font-normal text-gray-600">
                          /{status.plan.interval}
                        </span>
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      onClick={handleOpenPortal}
                      disabled={portalLoading}
                      variant="outline"
                    >
                      {portalLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Manage Billing
                        </>
                      )}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.location.href = '/pricing'}
                      className="w-full"
                    >
                      Change Plan
                    </Button>
                  </div>
                </div>

                {/* Payment Issues Alert */}
                {status.status === 'past_due' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-red-900">Payment Failed</p>
                      <p className="text-sm text-red-800 mt-1">
                        Please update your payment method to continue using Archivus.
                      </p>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        className="mt-3"
                        onClick={handleOpenPortal}
                      >
                        Update Payment Method
                      </Button>
                    </div>
                  </div>
                )}

                {/* Cancellation Notice */}
                {status.cancelAt && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-900">Subscription Ending</p>
                      <p className="text-sm text-amber-800 mt-1">
                        Your subscription will end on {new Date(status.cancelAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-4">No active subscription</p>
                <Button onClick={() => window.location.href = '/pricing'}>
                  View Plans
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Usage Overview */}
        {status?.hasSubscription && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Usage This Period</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={loadQuotas}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
            
            {quotaLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <Skeleton className="h-20 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <UsageCard
                  icon={FileText}
                  title="Documents"
                  quota={quotas.documents}
                  color="blue"
                />
                <UsageCard
                  icon={HardDrive}
                  title="Storage"
                  quota={quotas.storage}
                  color="green"
                  formatter={(value) => {
                    // Convert GB to bytes for display
                    if (quotas.storage?.limit === -1) return formatBytes(value)
                    return formatBytes(value * (1024 ** 3))
                  }}
                />
                <UsageCard
                  icon={Sparkles}
                  title="AI Credits"
                  quota={quotas.ai_credits}
                  color="purple"
                />
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        {status?.hasSubscription && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card 
                className="cursor-pointer hover:shadow-md transition-all hover:scale-[1.02]"
                onClick={handleOpenPortal}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Download Invoices</p>
                      <p className="text-sm text-gray-600">
                        Get your billing history
                      </p>
                    </div>
                    <Download className="w-5 h-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-md transition-all hover:scale-[1.02]"
                onClick={handleOpenPortal}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Payment Methods</p>
                      <p className="text-sm text-gray-600">
                        Update your cards
                      </p>
                    </div>
                    <CreditCard className="w-5 h-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-md transition-all hover:scale-[1.02]"
                onClick={handleOpenPortal}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Billing Settings</p>
                      <p className="text-sm text-gray-600">
                        Manage preferences
                      </p>
                    </div>
                    <Settings className="w-5 h-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Portal Access Info */}
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <ExternalLink className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-gray-700">Billing Portal</p>
                <p className="text-gray-600 mt-1">
                  Access your complete billing history, update payment methods, download invoices, 
                  and manage your subscription settings through our secure Stripe portal.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function UsageCard({ 
  icon: Icon, 
  title, 
  quota,
  color,
  formatter = formatNumber
}: { 
  icon: any
  title: string
  quota?: any
  color?: string
  formatter?: (value: number) => string
}) {
  if (!quota) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            <Icon className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500">No data available</p>
        </CardContent>
      </Card>
    )
  }

  const isUnlimited = quota.isUnlimited || quota.limit === -1
  const isNearLimit = quota.percentage > 80
  const isAtLimit = quota.percentage >= 100

  return (
    <Card className={cn(
      "transition-all",
      isNearLimit && !isAtLimit && "border-amber-500",
      isAtLimit && "border-red-500"
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <Icon className={cn(
            "w-4 h-4",
            isAtLimit ? "text-red-500" :
            isNearLimit ? "text-amber-500" :
            color === 'blue' ? "text-blue-500" :
            color === 'green' ? "text-green-500" :
            color === 'purple' ? "text-purple-500" :
            "text-gray-400"
          )} />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-2xl font-semibold">
              {formatter(quota.used)}
            </span>
            <span className="text-sm text-gray-500">
              {isUnlimited ? 'Unlimited' : `of ${formatter(quota.limit)}`}
            </span>
          </div>
          
          {!isUnlimited && (
            <>
              <Progress 
                value={Math.min(quota.percentage, 100)} 
                className={cn(
                  "h-2",
                  isNearLimit && !isAtLimit && "[&>div]:bg-amber-500",
                  isAtLimit && "[&>div]:bg-red-500"
                )}
              />
              {isNearLimit && !isAtLimit && (
                <p className="text-xs text-amber-600">
                  {quota.remaining} remaining ({100 - quota.percentage}%)
                </p>
              )}
              {isAtLimit && (
                <p className="text-xs text-red-600 font-medium">
                  Limit reached - upgrade to continue
                </p>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function BillingPageSkeleton() {
  return (
    <div className="container max-w-6xl py-8">
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  )
}