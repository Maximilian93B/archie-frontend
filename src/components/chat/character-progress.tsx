import React from 'react'
import { cn } from '@/lib/utils'

interface CharacterProgressProps {
  current: number
  min: number
  max: number
  warningThreshold: number
  dangerThreshold: number
  className?: string
}

export function CharacterProgress({
  current,
  min,
  max,
  warningThreshold,
  dangerThreshold,
  className
}: CharacterProgressProps) {
  const percentage = (current / max) * 100
  const isValid = current >= min && current <= max
  
  const getProgressColor = () => {
    if (current < min) return 'bg-gray-300'
    if (current >= dangerThreshold) return 'bg-red-500'
    if (current >= warningThreshold) return 'bg-amber-500'
    return 'bg-green-500'
  }
  
  return (
    <div className={cn('relative', className)}>
      {/* Background track */}
      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
        {/* Progress bar */}
        <div
          className={cn(
            'h-full transition-all duration-200 ease-out rounded-full',
            getProgressColor()
          )}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
        
        {/* Min threshold marker */}
        <div
          className="absolute top-0 h-full w-px bg-gray-400"
          style={{ left: `${(min / max) * 100}%` }}
        />
        
        {/* Warning threshold marker */}
        <div
          className="absolute top-0 h-full w-px bg-amber-500"
          style={{ left: `${(warningThreshold / max) * 100}%` }}
        />
        
        {/* Danger threshold marker */}
        <div
          className="absolute top-0 h-full w-px bg-red-500"
          style={{ left: `${(dangerThreshold / max) * 100}%` }}
        />
      </div>
    </div>
  )
}