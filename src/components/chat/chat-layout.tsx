'use client'

import { useState, useEffect } from 'react'
import { ChatSessionSidebar } from './sessions/chat-session-sidebar'
import { ChatInterface } from './chat-interface'
import { useChatStore } from '@/store/chat-store'
import { useChatSessions } from '@/hooks/queries/chat.queries'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageCircle, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatLayoutProps {
  className?: string
  defaultDocumentId?: string
  defaultDocumentTitle?: string
}

export function ChatLayout({ 
  className,
  defaultDocumentId,
  defaultDocumentTitle 
}: ChatLayoutProps) {
  const { 
    currentSessionId, 
    currentSession,
    sessionSidebarOpen,
    setCurrentSession,
    addSession
  } = useChatStore()
  
  const { data: sessions, isLoading } = useChatSessions()
  const [isMobile, setIsMobile] = useState(false)
  
  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Sessions are automatically added to store by the useChatSessions hook
  // No need to manually sync here
  
  // Mobile layout - full screen session list or chat
  if (isMobile) {
    return (
      <div className={cn('h-screen bg-gray-50', className)}>
        {currentSessionId && currentSession ? (
          <ChatInterface
            sessionId={currentSessionId}
            documentId={currentSession.documentId}
            documentTitle={currentSession.documentTitle}
            onBack={() => setCurrentSession(null)}
            className="h-full"
          />
        ) : (
          <div className="h-full">
            <ChatSessionSidebar />
          </div>
        )}
      </div>
    )
  }
  
  // Desktop layout - sidebar + chat
  return (
    <div className={cn('flex h-screen bg-gray-50', className)}>
      {/* Session Sidebar */}
      <ChatSessionSidebar />
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentSessionId && currentSession ? (
          <ChatInterface
            sessionId={currentSessionId}
            documentId={currentSession.documentId}
            documentTitle={currentSession.documentTitle}
            className="h-full"
          />
        ) : (
          <ChatWelcomeScreen 
            defaultDocumentId={defaultDocumentId}
            defaultDocumentTitle={defaultDocumentTitle}
          />
        )}
      </div>
    </div>
  )
}

interface ChatWelcomeScreenProps {
  defaultDocumentId?: string
  defaultDocumentTitle?: string
}

function ChatWelcomeScreen({ 
  defaultDocumentId, 
  defaultDocumentTitle 
}: ChatWelcomeScreenProps) {
  const { sessionsList, toggleSessionSidebar, sessionSidebarOpen } = useChatStore()
  
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <Card className="max-w-lg p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageCircle className="h-8 w-8 text-blue-600" />
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          Welcome to AI Chat
        </h2>
        
        <p className="text-gray-600 mb-8">
          {sessionsList.length === 0 
            ? "Start your first conversation by selecting a document or asking a general question."
            : "Select a conversation from the sidebar or start a new one to continue chatting."
          }
        </p>
        
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-3">
            {defaultDocumentId && (
              <QuickStartCard
                title={`Chat about ${defaultDocumentTitle}`}
                description="Ask questions about this document"
                icon={<MessageCircle className="h-5 w-5" />}
                onClick={() => {
                  // This would trigger the new chat flow with this document
                  // Implementation depends on how the SessionQuickActions works
                }}
              />
            )}
            
            <QuickStartCard
              title="General Workspace Chat"
              description="Ask questions about your entire workspace"
              icon={<Plus className="h-5 w-5" />}
              onClick={() => {
                // This would trigger the new chat flow for workspace
              }}
            />
          </div>
          
          {/* Show sidebar button on desktop if hidden */}
          {!sessionSidebarOpen && sessionsList.length > 0 && (
            <Button
              variant="outline"
              onClick={toggleSessionSidebar}
              className="w-full"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              View Previous Conversations ({sessionsList.length})
            </Button>
          )}
        </div>
        
        {/* Help Text */}
        <div className="mt-8 pt-6 border-t text-sm text-gray-500">
          <p>
            💡 <strong>Pro tip:</strong> Use Cmd+K to quickly search through your conversations
          </p>
        </div>
      </Card>
    </div>
  )
}

interface QuickStartCardProps {
  title: string
  description: string
  icon: React.ReactNode
  onClick: () => void
}

function QuickStartCard({ title, description, icon, onClick }: QuickStartCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors text-left w-full"
    >
      <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </button>
  )
}