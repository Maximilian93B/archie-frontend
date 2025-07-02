import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface WebhookEvent {
  id: string
  type: string
  status: 'success' | 'failed' | 'pending'
  timestamp: Date
  data?: any
}

/**
 * Development component to monitor Stripe webhook events
 * Only use this in development with Stripe CLI
 */
export function StripeWebhookMonitor() {
  const [events, setEvents] = useState<WebhookEvent[]>([])
  const [isListening, setIsListening] = useState(false)

  // In a real implementation, this would connect to your backend's webhook endpoint
  // For now, it's a mock to show the UI
  useEffect(() => {
    // Simulate receiving webhook events
    const mockEvents = [
      { id: '1', type: 'checkout.session.completed', status: 'success' as const, timestamp: new Date() },
      { id: '2', type: 'customer.subscription.created', status: 'success' as const, timestamp: new Date() },
      { id: '3', type: 'invoice.payment_succeeded', status: 'success' as const, timestamp: new Date() },
    ]

    // Add events one by one to simulate real-time updates
    mockEvents.forEach((event, index) => {
      setTimeout(() => {
        setEvents(prev => [event, ...prev].slice(0, 10)) // Keep last 10 events
      }, index * 1000)
    })

    setIsListening(true)
  }, [])

  const getEventIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const getEventColor = (type: string) => {
    if (type.includes('succeeded') || type.includes('completed')) return 'success'
    if (type.includes('failed')) return 'destructive'
    if (type.includes('pending')) return 'warning'
    return 'default'
  }

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 max-h-96 overflow-hidden shadow-lg z-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center justify-between">
          <span>Stripe Webhook Monitor</span>
          <Badge variant={isListening ? 'success' : 'secondary'} className="text-xs">
            {isListening ? 'Live' : 'Offline'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-72 overflow-y-auto">
          {events.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">
              Waiting for webhook events...
            </p>
          ) : (
            <div className="space-y-1">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  {getEventIcon(event.status)}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">
                      {event.type}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(event.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                  <Badge variant={getEventColor(event.type)} className="text-xs">
                    {event.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border-t p-3">
          <p className="text-xs text-gray-500">
            Run <code className="bg-gray-100 px-1 rounded">stripe listen</code> to see events
          </p>
        </div>
      </CardContent>
    </Card>
  )
}