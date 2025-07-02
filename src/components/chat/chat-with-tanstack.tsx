'use client'

import { useState } from 'react'
import { useChatSession, useAskQuestion, useOptimisticMessage } from '@/hooks/queries/chat.queries'
import { useChatStore } from '@/store/chat-store'
import { ChatInterface } from './chat-interface'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

interface ChatWithTanstackProps {
  sessionId: string
  documentId: string
  documentTitle: string
  onBack?: () => void
}

/**
 * Example of integrating TanStack Query with our chat components
 * This combines server state (TanStack Query) with client state (Zustand)
 */
export function ChatWithTanstack({
  sessionId,
  documentId,
  documentTitle,
  onBack
}: ChatWithTanstackProps) {
  // TanStack Query hooks for server state
  const { data: session, isLoading, error } = useChatSession(sessionId)
  const askQuestion = useAskQuestion()
  const { addMessage, removeMessage } = useOptimisticMessage()
  
  // Zustand store for client state (drafts, UI state)
  const { drafts, saveDraft, clearDraft } = useChatStore()
  
  const handleSendMessage = async (content: string) => {
    if (!content.trim() || askQuestion.isPending) return
    
    // Add optimistic message immediately
    const tempMessageId = addMessage(sessionId, content)
    
    try {
      // Send to server
      await askQuestion.mutateAsync({
        sessionId,
        question: content
      })
      
      // Clear draft on success
      clearDraft(sessionId)
    } catch (error) {
      // Remove optimistic message on error
      removeMessage(sessionId, tempMessageId)
      
      // Restore draft so user doesn't lose their message
      saveDraft(sessionId, content)
    }
  }
  
  // Loading state
  if (isLoading) {
    return (
      <div className="h-full p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    )
  }
  
  // Error state
  if (error) {
    return (
      <div className="h-full p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load chat session. Please try again.
          </AlertDescription>
        </Alert>
      </div>
    )
  }
  
  // Main chat interface
  return (
    <ChatInterface
      sessionId={sessionId}
      documentId={documentId}
      documentTitle={documentTitle}
      messages={session?.messages || []}
      isLoading={askQuestion.isPending}
      onSendMessage={handleSendMessage}
      onBack={onBack}
      draft={drafts.get(sessionId) || ''}
      onDraftChange={(draft) => saveDraft(sessionId, draft)}
    />
  )
}