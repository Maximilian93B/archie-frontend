import { AlertCircle, CheckCircle, Clock, XCircle, CreditCard } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { formatDistanceToNow } from 'date-fns'
import type { Subscription } from '@/types/subscription'

interface SubscriptionStatusProps {
  subscription: Subscription | null
  compact?: boolean
}

export function SubscriptionStatus({ subscription, compact = false }: SubscriptionStatusProps) {
  if (!subscription) {
    return compact ? null : (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Active Subscription</AlertTitle>
        <AlertDescription className="mt-2">
          <div className="flex items-center justify-between">
            <span>Subscribe to unlock all features</span>
            <Button size="sm" variant="outline" asChild>
              <a href="/pricing">View Plans</a>
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  const getStatusConfig = () => {
    switch (subscription.status) {
      case 'trialing':
        const trialDaysLeft = subscription.trialEnd 
          ? Math.ceil((new Date(subscription.trialEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
          : 0
        return {
          icon: Clock,
          variant: trialDaysLeft <= 3 ? 'warning' as const : 'default' as const,
          title: 'Trial Period',
          description: subscription.trialEnd
            ? `Your trial ends ${formatDistanceToNow(new Date(subscription.trialEnd), { addSuffix: true })}`
            : 'Trial period active',
          showUpgrade: true
        }
      
      case 'active':
        if (subscription.cancelAtPeriodEnd) {
          return {
            icon: AlertCircle,
            variant: 'warning' as const,
            title: 'Subscription Ending',
            description: `Your ${subscription.tier} plan will end ${formatDistanceToNow(new Date(subscription.currentPeriodEnd), { addSuffix: true })}`,
            showReactivate: true
          }
        }
        return {
          icon: CheckCircle,
          variant: 'default' as const,
          title: `${subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)} Plan`,
          description: `Renews ${formatDistanceToNow(new Date(subscription.currentPeriodEnd), { addSuffix: true })}`,
          showManage: true
        }
      
      case 'past_due':
        return {
          icon: AlertCircle,
          variant: 'destructive' as const,
          title: 'Payment Failed',
          description: 'Please update your payment method to continue using Archivus',
          showUpdatePayment: true
        }
      
      case 'canceled':
      case 'cancelled':
        return {
          icon: XCircle,
          variant: 'destructive' as const,
          title: 'Subscription Canceled',
          description: 'Your subscription has ended. Upgrade to continue using Archivus',
          showUpgrade: true
        }
      
      case 'incomplete':
      case 'incomplete_expired':
        return {
          icon: AlertCircle,
          variant: 'warning' as const,
          title: 'Setup Incomplete',
          description: 'Please complete your subscription setup',
          showUpdatePayment: true
        }
      
      case 'unpaid':
        return {
          icon: AlertCircle,
          variant: 'destructive' as const,
          title: 'Invoice Unpaid',
          description: 'You have an unpaid invoice. Please update your payment method',
          showUpdatePayment: true
        }
      
      default:
        return null
    }
  }

  const config = getStatusConfig()
  if (!config) return null

  // Compact mode for sidebar/header
  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <config.icon className={`h-4 w-4 ${
          config.variant === 'destructive' ? 'text-red-600' :
          config.variant === 'warning' ? 'text-amber-600' :
          'text-green-600'
        }`} />
        <span className="font-medium">{config.title}</span>
      </div>
    )
  }

  // Full alert mode
  return (
    <Alert variant={config.variant}>
      <config.icon className="h-4 w-4" />
      <AlertTitle>{config.title}</AlertTitle>
      <AlertDescription className="mt-2">
        <div className="flex items-center justify-between">
          <span>{config.description}</span>
          <div className="flex gap-2">
            {config.showUpgrade && (
              <Button size="sm" variant="outline" asChild>
                <a href="/pricing">Upgrade</a>
              </Button>
            )}
            {config.showManage && (
              <Button size="sm" variant="outline" asChild>
                <a href="/dashboard/billing">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Manage
                </a>
              </Button>
            )}
            {config.showUpdatePayment && (
              <Button size="sm" variant="outline" asChild>
                <a href="/dashboard/billing">Update Payment</a>
              </Button>
            )}
            {config.showReactivate && (
              <Button size="sm" variant="outline" asChild>
                <a href="/dashboard/billing">Reactivate</a>
              </Button>
            )}
          </div>
        </div>
      </AlertDescription>
    </Alert>
  )
}