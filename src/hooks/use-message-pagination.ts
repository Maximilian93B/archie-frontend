import { useCallback, useEffect } from 'react'
import { useChatStoreSafe } from './use-chat-store-safe'
import { chatAPI } from '@/lib/api/chat'
import { handleChatError } from '@/lib/chat-errors'

interface UseMessagePaginationOptions {
  sessionId: string
  pageSize?: number
}

interface UseMessagePaginationReturn {
  isLoadingMore: boolean
  hasMore: boolean
  loadMore: () => Promise<void>
  canLoadMore: boolean
}

/**
 * Hook for handling paginated message loading
 * Implements the backend's recommendation for efficient message loading
 */
export function useMessagePagination({ 
  sessionId, 
  pageSize = 50 
}: UseMessagePaginationOptions): UseMessagePaginationReturn {
  const store = useChatStoreSafe()
  const session = store.sessions.get(sessionId)
  const pagination = store.messagePagination.get(sessionId) || {
    isLoadingMore: false,
    hasMore: true,
    page: 1,
    pageSize
  }

  // Initialize pagination state for session
  useEffect(() => {
    if (sessionId && !store.messagePagination.has(sessionId)) {
      store.setMessagePaginationLoading(sessionId, false)
    }
  }, [sessionId, store])

  const loadMore = useCallback(async () => {
    if (!session || pagination.isLoadingMore || !pagination.hasMore) {
      return
    }

    try {
      // Set loading state
      store.setMessagePaginationLoading(sessionId, true)

      // Calculate pagination params
      const currentMessageCount = session.messages.length
      const currentPage = pagination.page
      const messageOffset = Math.max(0, session.totalMessages - (currentPage * pageSize))
      
      // Fetch older messages from API with pagination
      const response = await chatAPI.getSession(sessionId, {
        limit: pageSize,
        offset: messageOffset
      })
      
      // Transform backend messages to frontend format
      const olderMessages = (response.messages || [])
        .filter(msg => !session.messages.some(m => m.id === msg.id))
        .map(msg => ({
          id: msg.id,
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
          timestamp: msg.created_at,
          status: 'sent' as const
        }))

      if (olderMessages.length > 0) {
        // Prepend older messages to the session
        store.prependMessages(sessionId, olderMessages)
        
        // Update pagination state
        const newPagination = new Map(store.messagePagination)
        newPagination.set(sessionId, {
          ...pagination,
          isLoadingMore: false,
          hasMore: startIndex > 0,
          page: pagination.page + 1
        })
        store.messagePagination = newPagination
      } else {
        // No more messages to load
        const newPagination = new Map(store.messagePagination)
        newPagination.set(sessionId, {
          ...pagination,
          isLoadingMore: false,
          hasMore: false
        })
        store.messagePagination = newPagination
      }
    } catch (error) {
      handleChatError(error, {
        showToast: true,
        onRetry: loadMore
      })
      
      // Reset loading state on error
      store.setMessagePaginationLoading(sessionId, false)
    }
  }, [sessionId, session, pagination, pageSize, store])

  return {
    isLoadingMore: pagination.isLoadingMore,
    hasMore: pagination.hasMore,
    loadMore,
    canLoadMore: !pagination.isLoadingMore && pagination.hasMore && !!session
  }
}

/**
 * Hook to detect when user scrolls near the top of message list
 * Used to trigger loading more messages
 */
export function useInfiniteScroll(
  scrollRef: React.RefObject<HTMLElement>,
  callback: () => void,
  options: {
    threshold?: number
    enabled?: boolean
  } = {}
) {
  const { threshold = 100, enabled = true } = options

  useEffect(() => {
    if (!enabled || !scrollRef.current) return

    const element = scrollRef.current
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (element.scrollTop <= threshold) {
            callback()
          }
          ticking = false
        })
        ticking = true
      }
    }

    element.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      element.removeEventListener('scroll', handleScroll)
    }
  }, [scrollRef, callback, threshold, enabled])
}