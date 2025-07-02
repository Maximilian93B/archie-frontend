import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { FileText, HardDrive, Sparkles, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UsageItem {
  used: number
  limit: number
  percentage?: number
}

interface UsageData {
  documents: UsageItem
  storage: UsageItem
  aiCredits: UsageItem
  users: UsageItem
}

interface UsageOverviewProps {
  usage: UsageData | null
  loading?: boolean
}

export function UsageOverview({ usage, loading }: UsageOverviewProps) {
  if (loading || !usage) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
                <div className="h-2 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const items = [
    {
      name: 'Documents',
      icon: FileText,
      data: usage.documents,
      format: (val: number) => val.toLocaleString(),
      color: 'text-blue-600'
    },
    {
      name: 'Storage',
      icon: HardDrive,
      data: usage.storage,
      format: (val: number) => {
        const gb = val / (1024 ** 3)
        return gb >= 1 ? `${gb.toFixed(1)} GB` : `${(val / (1024 ** 2)).toFixed(0)} MB`
      },
      color: 'text-green-600'
    },
    {
      name: 'AI Credits',
      icon: Sparkles,
      data: usage.aiCredits,
      format: (val: number) => val.toLocaleString(),
      color: 'text-purple-600'
    },
    {
      name: 'Team Members',
      icon: Users,
      data: usage.users,
      format: (val: number) => val.toString(),
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => {
        const percentage = item.data.percentage ?? (
          item.data.limit === -1 
            ? 0 
            : Math.round((item.data.used / item.data.limit) * 100)
        )
        const isUnlimited = item.data.limit === -1
        const isNearLimit = percentage > 80
        const isAtLimit = percentage >= 100

        return (
          <Card 
            key={item.name} 
            className={cn(
              "transition-all",
              isNearLimit && !isAtLimit && "border-amber-500",
              isAtLimit && "border-red-500"
            )}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span className="text-gray-700">{item.name}</span>
                <item.icon className={cn("w-4 h-4", item.color)} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-semibold">
                    {item.format(item.data.used)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {isUnlimited ? '∞' : `of ${item.format(item.data.limit)}`}
                  </span>
                </div>
                {!isUnlimited && (
                  <>
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className={cn(
                        "h-2",
                        isNearLimit && !isAtLimit && "[&>div]:bg-amber-500",
                        isAtLimit && "[&>div]:bg-red-500"
                      )}
                    />
                    {isNearLimit && !isAtLimit && (
                      <p className="text-xs text-amber-600 mt-1">
                        {100 - percentage}% remaining
                      </p>
                    )}
                    {isAtLimit && (
                      <p className="text-xs text-red-600 mt-1 font-medium">
                        Limit reached
                      </p>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}