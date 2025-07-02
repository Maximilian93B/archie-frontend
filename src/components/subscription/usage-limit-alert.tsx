import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface UsageLimitAlertProps {
  resource: string
  used: number
  limit: number
  onUpgrade?: () => void
  className?: string
}

export function UsageLimitAlert({ 
  resource, 
  used, 
  limit, 
  onUpgrade,
  className 
}: UsageLimitAlertProps) {
  const router = useRouter()
  const percentage = (used / limit) * 100
  
  // Don't show alert if usage is below 80%
  if (percentage < 80) return null
  
  // Don't show for unlimited resources
  if (limit === -1) return null
  
  const isExceeded = used >= limit
  const remaining = Math.max(0, limit - used)
  
  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade()
    } else {
      router.push('/pricing')
    }
  }
  
  return (
    <Alert 
      variant={isExceeded ? 'destructive' : 'warning'} 
      className={className}
    >
      {isExceeded ? (
        <XCircle className="h-4 w-4" />
      ) : (
        <AlertTriangle className="h-4 w-4" />
      )}
      <AlertTitle>
        {isExceeded 
          ? `${resource} limit reached` 
          : `Approaching ${resource} limit`
        }
      </AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-3">
          {isExceeded ? (
            <>You've reached your limit of {limit.toLocaleString()} {resource.toLowerCase()}.</>
          ) : (
            <>
              You've used {used.toLocaleString()} of {limit.toLocaleString()} {resource.toLowerCase()}.
              Only {remaining.toLocaleString()} remaining.
            </>
          )}
        </p>
        <Button 
          size="sm" 
          variant={isExceeded ? 'default' : 'outline'} 
          onClick={handleUpgrade}
        >
          Upgrade Plan
        </Button>
      </AlertDescription>
    </Alert>
  )
}

// Inline version for forms and modals
interface InlineUsageLimitAlertProps {
  resource: string
  used: number
  limit: number
  threshold?: number
}

export function InlineUsageLimitAlert({
  resource,
  used,
  limit,
  threshold = 0.8
}: InlineUsageLimitAlertProps) {
  const router = useRouter()
  const percentage = limit === -1 ? 0 : (used / limit)
  
  if (percentage < threshold || limit === -1) return null
  
  const isExceeded = used >= limit
  const remaining = Math.max(0, limit - used)
  
  return (
    <div className={`text-sm ${isExceeded ? 'text-red-600' : 'text-amber-600'} flex items-center gap-1`}>
      {isExceeded ? (
        <>
          <XCircle className="w-4 h-4" />
          <span>{resource} limit reached</span>
        </>
      ) : (
        <>
          <AlertTriangle className="w-4 h-4" />
          <span>{remaining} {resource.toLowerCase()} remaining</span>
        </>
      )}
      <button
        onClick={() => router.push('/pricing')}
        className="underline hover:no-underline ml-1"
      >
        Upgrade
      </button>
    </div>
  )
}

// Hook for checking limits before actions
export function useCheckLimit(resource: 'documents' | 'storage' | 'aiCredits' | 'users') {
  const checkLimit = (usage: any, showAlert = true): boolean => {
    if (!usage || !usage[resource]) return true
    
    const { used, limit } = usage[resource]
    if (limit === -1) return true // Unlimited
    
    const hasCapacity = used < limit
    
    if (!hasCapacity && showAlert) {
      // You can integrate with your toast system here
      console.error(`${resource} limit reached. Please upgrade your plan.`)
    }
    
    return hasCapacity
  }
  
  return checkLimit
}