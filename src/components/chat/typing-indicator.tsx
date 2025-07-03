import React from 'react'
import { cn } from '@/lib/utils'

interface TypingIndicatorProps {
  show: boolean
  className?: string
  compact?: boolean
}

export function TypingIndicator({ show, className, compact = false }: TypingIndicatorProps) {
  if (!show) return null
  
  if (compact) {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        <div className="flex space-x-1">
          <div className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" />
        </div>
        <span className="text-xs text-gray-500">AI is thinking</span>
      </div>
    )
  }
  
  return (
    <div className={cn('flex items-center space-x-2 p-3 bg-gray-50 rounded-lg', className)}>
      <div className="flex space-x-1">
        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" />
      </div>
      <span className="text-sm text-gray-600">AI is generating a response...</span>
    </div>
  )
}