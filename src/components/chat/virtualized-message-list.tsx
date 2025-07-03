import React, { useEffect, useRef, useCallback, memo } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { MessageBubble, MessageTimestamp, MessageLoading } from './message-bubble'
import { ChatMessage, useChatStore } from '@/store/chat-store'
import { cn } from '@/lib/utils'
import { isSameDay } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { useMessagePagination, useInfiniteScroll } from '@/hooks/use-message-pagination'

interface VirtualizedMessageListProps {
  sessionId: string
  messages: ChatMessage[]
  isLoading?: boolean
  isAsking?: boolean
  onRetry?: (messageId: string) => void
  className?: string
}

// Helper to determine if we should show a date separator
function shouldShowDateSeparator(currentMsg: ChatMessage, prevMsg?: ChatMessage): boolean {
  if (!prevMsg) return true
  return !isSameDay(new Date(currentMsg.timestamp), new Date(prevMsg.timestamp))
}

export const VirtualizedMessageList = memo(function VirtualizedMessageList({
  sessionId,
  messages,
  isLoading = false,
  isAsking = false,
  onRetry,
  className
}: VirtualizedMessageListProps) {
  const parentRef = useRef<HTMLDivElement>(null)
  const [autoScroll, setAutoScroll] = React.useState(true)
  const prevMessageCount = useRef(messages.length)
  
  // Message pagination
  const { isLoadingMore, hasMore, loadMore, canLoadMore } = useMessagePagination({ 
    sessionId,
    pageSize: 50 
  })
  
  // Infinite scroll for loading more messages
  useInfiniteScroll(parentRef, loadMore, {
    threshold: 200,
    enabled: canLoadMore
  })

  // Build items array with date separators
  const items = React.useMemo(() => {
    const result: Array<{ type: 'message' | 'separator'; data: ChatMessage | string; id: string }> = []
    
    messages.forEach((msg, index) => {
      const prevMsg = index > 0 ? messages[index - 1] : undefined
      
      // Add date separator if needed
      if (shouldShowDateSeparator(msg, prevMsg)) {
        result.push({
          type: 'separator',
          data: msg.timestamp,
          id: `separator-${msg.timestamp}`
        })
      }
      
      // Add message
      result.push({
        type: 'message',
        data: msg,
        id: msg.id
      })
    })
    
    return result
  }, [messages])

  // Virtual scrolling setup
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback((index: number) => {
      // Estimate sizes based on item type
      const item = items[index]
      if (item.type === 'separator') return 56 // Date separator height
      
      // Estimate message height based on content length and role
      const msg = item.data as ChatMessage
      const isUser = msg.role === 'user'
      const baseHeight = isUser ? 60 : 80 // User messages are typically shorter
      const charPerLine = 60
      const linesEstimate = Math.ceil(msg.content.length / charPerLine)
      
      // Add extra height for code blocks or lists
      const hasCodeBlocks = msg.content.includes('```')
      const hasLists = msg.content.includes('\n-') || msg.content.includes('\n*')
      const extraHeight = hasCodeBlocks ? 40 : hasLists ? 20 : 0
      
      return baseHeight + (linesEstimate * 20) + extraHeight // 20px per line
    }, [items]),
    overscan: 5, // Render 5 items outside viewport
    getItemKey: useCallback((index: number) => items[index].id, [items])
  })

  // Handle scroll position when loading older messages
  const scrollHeightBeforeLoad = useRef<number>(0)
  const scrollTopBeforeLoad = useRef<number>(0)
  
  // Save scroll position before loading more
  useEffect(() => {
    if (isLoadingMore && parentRef.current) {
      scrollHeightBeforeLoad.current = parentRef.current.scrollHeight
      scrollTopBeforeLoad.current = parentRef.current.scrollTop
    }
  }, [isLoadingMore])
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (!parentRef.current) return
    
    // If we just loaded older messages, maintain scroll position
    if (scrollHeightBeforeLoad.current > 0 && !isLoadingMore) {
      const scrollHeightDiff = parentRef.current.scrollHeight - scrollHeightBeforeLoad.current
      parentRef.current.scrollTop = scrollTopBeforeLoad.current + scrollHeightDiff
      scrollHeightBeforeLoad.current = 0
      scrollTopBeforeLoad.current = 0
      return
    }
    
    // Normal auto-scroll for new messages
    if (messages.length > prevMessageCount.current && autoScroll) {
      // Scroll to bottom smoothly
      setTimeout(() => {
        parentRef.current?.scrollTo({
          top: parentRef.current.scrollHeight,
          behavior: 'smooth'
        })
      }, 100)
    }
    prevMessageCount.current = messages.length
  }, [messages.length, autoScroll, isLoadingMore])

  // Detect if user scrolls up (disable auto-scroll)
  const handleScroll = useCallback(() => {
    if (!parentRef.current) return
    
    const { scrollTop, scrollHeight, clientHeight } = parentRef.current
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 100
    
    setAutoScroll(isAtBottom)
  }, [])

  // Show loading indicator when fetching messages
  if (isLoading && messages.length === 0) {
    return (
      <div className={cn('flex items-center justify-center py-8', className)}>
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    )
  }

  // Empty state
  if (messages.length === 0 && !isAsking) {
    return (
      <div className={cn('flex items-center justify-center py-12 text-center', className)}>
        <div>
          <h3 className="text-lg font-medium text-gray-900">No messages yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Start a conversation by asking a question about this document
          </p>
        </div>
      </div>
    )
  }

  // Get total message count
  const totalMessages = messages.length // Will be updated when we have proper session data
  const showingMessages = messages.length
  
  return (
    <div
      ref={parentRef}
      className={cn(
        'relative h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100',
        className
      )}
      onScroll={handleScroll}
    >
      {/* Loading more indicator at the top */}
      {isLoadingMore && (
        <div className="flex items-center justify-center py-4 sticky top-0 bg-white/90 backdrop-blur-sm z-10">
          <Loader2 className="h-4 w-4 animate-spin text-gray-400 mr-2" />
          <span className="text-sm text-gray-500">Loading older messages...</span>
        </div>
      )}
      
      {/* Message count indicator */}
      {hasMore && showingMessages < totalMessages && !isLoadingMore && (
        <div className="text-center py-3 text-sm text-gray-500 bg-gray-50 sticky top-0 z-10">
          Showing {showingMessages} of {totalMessages} messages
          <button 
            onClick={loadMore}
            className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
            disabled={!canLoadMore}
          >
            Load more
          </button>
        </div>
      )}
      
      {/* Virtual list container */}
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {/* Render only visible items */}
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const item = items[virtualItem.index]
          
          return (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {item.type === 'separator' ? (
                <MessageTimestamp timestamp={item.data as string} />
              ) : (
                <MessageBubble
                  message={item.data as ChatMessage}
                  onRetry={() => onRetry?.(item.id)}
                  showTimestamp={true}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* AI thinking indicator */}
      {isAsking && <MessageLoading />}

      {/* Scroll to bottom button */}
      {!autoScroll && (
        <button
          onClick={() => {
            parentRef.current?.scrollTo({
              top: parentRef.current.scrollHeight,
              behavior: 'smooth'
            })
            setAutoScroll(true)
          }}
          className="absolute bottom-4 right-4 rounded-full bg-white p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          aria-label="Scroll to bottom"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      )}
    </div>
  )
})

// Simpler non-virtualized version for small message counts
export const SimpleMessageList = memo(function SimpleMessageList({
  messages,
  isAsking = false,
  onRetry,
  className
}: Omit<VirtualizedMessageListProps, 'sessionId'>) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages.length])

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100',
        className
      )}
    >
      <div className="min-h-full pb-4">
        {messages.map((message, index) => {
          const prevMessage = index > 0 ? messages[index - 1] : undefined
          const showDate = shouldShowDateSeparator(message, prevMessage)

          return (
            <React.Fragment key={message.id}>
              {showDate && <MessageTimestamp timestamp={message.timestamp} />}
              <MessageBubble
                message={message}
                onRetry={() => onRetry?.(message.id)}
                showTimestamp={true}
              />
            </React.Fragment>
          )
        })}
        {isAsking && <MessageLoading />}
      </div>
    </div>
  )
})