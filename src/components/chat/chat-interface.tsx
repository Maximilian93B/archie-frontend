'use client'

import React, { useEffect, useCallback, useState } from 'react'
import { VirtualizedMessageList, SimpleMessageList } from './virtualized-message-list'
import { ChatInput } from './chat-input'
import { DocumentContextPicker } from './context/document-context-picker'
import { ContextIndicator } from './context/context-indicator'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useChatStoreSafe } from '@/hooks/use-chat-store-safe'
import type { ChatMessage } from '@/store/chat-store'
import { useAskQuestion, useDeleteChatSession, useUpdateSessionName } from '@/hooks/queries/chat.queries'
import toast from 'react-hot-toast'
import { ArrowLeft, MoreVertical, Trash2, Edit2, Settings, FileText } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface ChatInterfaceProps {
  sessionId: string
  documentId: string
  documentTitle?: string
  onBack?: () => void
  className?: string
}

export function ChatInterface({
  sessionId,
  documentId,
  documentTitle,
  onBack,
  className
}: ChatInterfaceProps) {
  const {
    currentSession,
    setCurrentSession,
    isAsking,
    updateSession
  } = useChatStoreSafe()

  // Document context state
  const [contextDocuments, setContextDocuments] = useState<string[]>(
    documentId ? [documentId] : []
  )
  const [showContextPicker, setShowContextPicker] = useState(false)

  // React Query mutation for asking questions
  const askQuestion = useAskQuestion()

  // Load session on mount
  useEffect(() => {
    if (sessionId) {
      setCurrentSession(sessionId)
    }
  }, [sessionId, setCurrentSession])

  const handleSendMessage = async (content: string) => {
    try {
      await askQuestion.mutateAsync({
        sessionId,
        question: content
      })
    } catch (error) {
      // Error handling is done in the React Query mutation
    }
  }

  const handleRetry = async (messageId: string) => {
    const message = currentSession?.messages.find(m => m.id === messageId)
    if (!message) return

    // Remove failed message
    const updatedMessages = currentSession.messages.filter(m => m.id !== messageId)
    updateSession(sessionId, { messages: updatedMessages })

    // Resend
    await handleSendMessage(message.content)
  }

  const deleteSession = useDeleteChatSession()

  const handleDeleteSession = async () => {
    if (!confirm('Are you sure you want to delete this chat session?')) return

    try {
      await deleteSession.mutateAsync(sessionId)
      toast.success('Chat session deleted')
      onBack?.()
    } catch (error) {
      toast.error('Failed to delete session')
    }
  }

  const updateSessionName = useUpdateSessionName()

  const handleRenameSession = async () => {
    const newName = prompt('Enter new session name:', currentSession?.sessionName)
    if (!newName || newName === currentSession?.sessionName) return

    try {
      await updateSessionName.mutateAsync({ sessionId, sessionName: newName })
      updateSession(sessionId, { sessionName: newName })
      toast.success('Session renamed')
    } catch (error) {
      toast.error('Failed to rename session')
    }
  }

  if (!currentSession) {
    return (
      <div className={cn('flex items-center justify-center h-full', className)}>
        <Card className="p-8 text-center">
          <h3 className="text-lg font-medium">Loading chat session...</h3>
        </Card>
      </div>
    )
  }

  const messages = currentSession.messages || []
  const useVirtualization = messages.length > 50 // Use virtual scrolling for 50+ messages

  return (
    <div className={cn('flex flex-col h-full bg-white', className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-2 shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div className="min-w-0 flex-1">
            <h2 className="font-semibold truncate">{currentSession.sessionName}</h2>
            <div className="flex items-center gap-2">
              {contextDocuments.length > 0 ? (
                <ContextIndicator
                  documents={[]} // Will be populated with actual document data
                  variant="compact"
                  className="text-xs"
                />
              ) : (
                <p className="text-sm text-gray-500">
                  {documentTitle || 'Document Chat'}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowContextPicker(true)}
            className="p-2"
            title="Manage document context"
          >
            <FileText className="h-4 w-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowContextPicker(true)}>
                <Settings className="mr-2 h-4 w-4" />
                Manage Context
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleRenameSession}>
                <Edit2 className="mr-2 h-4 w-4" />
                Rename Session
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDeleteSession}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Session
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        {useVirtualization ? (
          <VirtualizedMessageList
            sessionId={sessionId}
            messages={messages}
            isAsking={isAsking}
            onRetry={handleRetry}
            className="h-full"
          />
        ) : (
          <SimpleMessageList
            messages={messages}
            isAsking={isAsking}
            onRetry={handleRetry}
            className="h-full"
          />
        )}
      </div>

      {/* Context Picker Modal */}
      {showContextPicker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Manage Chat Context</h3>
              <p className="text-sm text-gray-600 mt-1">
                Select documents to include in this conversation
              </p>
            </div>
            <div className="p-6">
              <DocumentContextPicker
                selectedDocuments={contextDocuments}
                onDocumentsChange={setContextDocuments}
                maxDocuments={5}
              />
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowContextPicker(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => setShowContextPicker(false)}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t">
        {/* Context Bar */}
        {contextDocuments.length > 0 && (
          <div className="px-4 py-2 bg-blue-50 border-b border-blue-200">
            <ContextIndicator
              documents={[]} // Will be populated with actual document data
              variant="expanded"
              onRemoveDocument={(docId) => {
                setContextDocuments(prev => prev.filter(id => id !== docId))
              }}
            />
          </div>
        )}
        
        <div className="p-4">
          <ChatInput
            sessionId={sessionId}
            onSend={handleSendMessage}
            disabled={isAsking || askQuestion.isPending}
            placeholder={
              contextDocuments.length > 0
                ? `Ask about ${contextDocuments.length} document${contextDocuments.length > 1 ? 's' : ''}...`
                : `Ask about ${documentTitle || 'documents'}...`
            }
          />
        </div>
      </div>
    </div>
  )
}

// Mobile-optimized version
export function ChatInterfaceMobile({
  sessionId,
  documentId,
  documentTitle,
  onBack
}: ChatInterfaceProps) {
  // Similar logic but optimized for mobile
  const { currentSession, isAsking } = useChatStoreSafe()

  if (!currentSession) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Mobile header */}
      <div className="flex items-center gap-3 border-b px-4 py-3 bg-white">
        {onBack && (
          <button onClick={onBack} className="p-1">
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <div className="flex-1">
          <h3 className="font-medium truncate">{currentSession.sessionName}</h3>
        </div>
      </div>

      {/* Messages */}
      <SimpleMessageList
        messages={currentSession.messages || []}
        isAsking={isAsking}
        className="flex-1"
      />

      {/* Mobile input */}
      <ChatInput
        sessionId={sessionId}
        onSend={() => {/* implement */}}
        disabled={isAsking}
      />
    </div>
  )
}