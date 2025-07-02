/**
 * Example usage of Stripe subscription components
 * This file shows how to integrate the subscription components in your app
 */

import { FeatureGate, InlineFeatureGate } from '@/components/subscription/feature-gate'
import { UsageOverview } from '@/components/subscription/usage-overview'
import { SubscriptionStatus } from '@/components/subscription/subscription-status'
import { UsageLimitAlert, InlineUsageLimitAlert } from '@/components/subscription/usage-limit-alert'
import { useSubscription } from '@/hooks/use-subscription'
import { Button } from '@/components/ui/button'

// Example 1: Feature Gate for Premium Features
export function WorkflowFeatureExample() {
  return (
    <FeatureGate feature="Workflow Automation" minimumTier="professional">
      {/* This content only shows for Professional and Enterprise users */}
      <div className="p-6">
        <h2>Workflow Builder</h2>
        <p>Create automated workflows for your documents</p>
        {/* Your workflow builder component here */}
      </div>
    </FeatureGate>
  )
}

// Example 2: Inline Feature Gate for Buttons
export function UploadButtonExample() {
  const { usage, hasReachedLimit } = useSubscription()
  
  return (
    <div className="space-y-4">
      {/* Show alert if approaching limit */}
      {usage && (
        <UsageLimitAlert
          resource="Documents"
          used={usage.documents.used}
          limit={usage.documents.limit}
        />
      )}
      
      {/* Disable button if limit reached */}
      <InlineFeatureGate feature="Upload Documents" minimumTier="starter">
        <Button 
          disabled={hasReachedLimit('documents')}
          onClick={() => console.log('Upload document')}
        >
          Upload Document
        </Button>
      </InlineFeatureGate>
    </div>
  )
}

// Example 3: Dashboard with Usage Overview
export function DashboardExample() {
  const { subscription, usage, isLoading } = useSubscription()
  
  return (
    <div className="space-y-6">
      {/* Show subscription status */}
      {subscription && <SubscriptionStatus subscription={subscription} />}
      
      {/* Show usage overview */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Usage Overview</h2>
        <UsageOverview usage={usage} loading={isLoading} />
      </div>
    </div>
  )
}

// Example 4: Document Upload with Limit Check
export function DocumentUploadExample() {
  const { usage, hasReachedLimit, getRemainingCredits } = useSubscription()
  
  const handleUpload = () => {
    if (hasReachedLimit('documents')) {
      alert('You have reached your document limit. Please upgrade your plan.')
      return
    }
    
    // Proceed with upload
    console.log('Uploading document...')
  }
  
  return (
    <div className="space-y-4">
      {/* Show inline warning */}
      {usage && (
        <InlineUsageLimitAlert
          resource="documents"
          used={usage.documents.used}
          limit={usage.documents.limit}
          threshold={0.9} // Show warning at 90% usage
        />
      )}
      
      <Button onClick={handleUpload}>
        Upload Document
        {getRemainingCredits('documents') !== null && (
          <span className="ml-2 text-xs">
            ({getRemainingCredits('documents')} remaining)
          </span>
        )}
      </Button>
    </div>
  )
}

// Example 5: AI Features with Credit Check
export function AIAnalysisExample() {
  const { usage, hasReachedLimit, canAccessFeature } = useSubscription()
  
  const runAIAnalysis = () => {
    // Check tier access
    if (!canAccessFeature('professional')) {
      alert('AI Analysis requires Professional plan or higher')
      return
    }
    
    // Check credit limit
    if (hasReachedLimit('aiCredits')) {
      alert('You have used all your AI credits this month')
      return
    }
    
    // Run analysis
    console.log('Running AI analysis...')
  }
  
  return (
    <FeatureGate 
      feature="AI Document Analysis" 
      minimumTier="professional"
      fallback={
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">
            AI Analysis is available on Professional plans and above
          </p>
          <Button variant="outline" size="sm">
            Learn More
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {usage && usage.aiCredits.limit !== -1 && (
          <div className="text-sm text-gray-600">
            AI Credits: {usage.aiCredits.used}/{usage.aiCredits.limit}
          </div>
        )}
        
        <Button onClick={runAIAnalysis}>
          Analyze Document with AI
        </Button>
      </div>
    </FeatureGate>
  )
}