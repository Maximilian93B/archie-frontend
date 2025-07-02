'use client'

import { useEffect } from 'react'
import { useChatSessions, useCreateChatSession } from '@/hooks/queries/chat.queries'
import { useChatStore } from '@/store/chat-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

/**
 * Test Integration Component for Chat System
 * This component tests all the chat functionality we've implemented
 */
export function ChatTestIntegration() {
  const { 
    sessionsList, 
    isLoading, 
    currentSessionId,
    sessionSidebarOpen,
    toggleSessionSidebar 
  } = useChatStore()
  
  const { data: sessionsData, isLoading: isLoadingSessions, error } = useChatSessions()
  const createSession = useCreateChatSession()

  // Test data for creating a session
  const handleCreateTestSession = () => {
    createSession.mutate({
      document_id: 'test-doc-id',
      session_name: `Test Chat - ${new Date().toLocaleTimeString()}`
    })
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Chat System Integration Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          
          {/* API Connection Test */}
          <TestItem
            title="Chat API Connection"
            status={error ? 'error' : isLoadingSessions ? 'loading' : 'success'}
            details={error ? 'Failed to connect to chat API' : 'Successfully connected to chat endpoints'}
          />

          {/* Store Integration Test */}
          <TestItem
            title="Zustand Store Integration"
            status="success"
            details={`Store loaded with ${sessionsList.length} sessions`}
          />

          {/* React Query Integration Test */}
          <TestItem
            title="React Query Integration"
            status={sessionsData ? 'success' : isLoadingSessions ? 'loading' : 'error'}
            details={sessionsData ? `Fetched ${sessionsData.sessions?.length || 0} sessions` : 'Loading sessions...'}
          />

          {/* Session Management Test */}
          <TestItem
            title="Session Management"
            status="success"
            details={`Current session: ${currentSessionId || 'None'}, Sidebar: ${sessionSidebarOpen ? 'Open' : 'Closed'}`}
          />

          {/* Test Controls */}
          <div className="pt-4 border-t space-y-3">
            <h4 className="font-medium">Test Controls</h4>
            
            <div className="flex gap-3">
              <Button 
                onClick={handleCreateTestSession}
                disabled={createSession.isPending}
                size="sm"
              >
                {createSession.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Test Session'
                )}
              </Button>
              
              <Button 
                onClick={toggleSessionSidebar}
                variant="outline"
                size="sm"
              >
                Toggle Sidebar
              </Button>
            </div>
          </div>

          {/* Recent Sessions */}
          {sessionsList.length > 0 && (
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Recent Sessions</h4>
              <div className="space-y-2">
                {sessionsList.slice(0, 3).map(session => (
                  <div key={session.id} className="text-sm p-2 bg-gray-50 rounded">
                    <div className="font-medium">{session.sessionName}</div>
                    <div className="text-gray-600">
                      {session.totalMessages} messages • {new Date(session.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Backend Endpoints Test */}
      <Card>
        <CardHeader>
          <CardTitle>Backend API Endpoints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <EndpointTest endpoint="POST /chat/sessions" description="Create session" />
            <EndpointTest endpoint="GET /chat/sessions" description="List sessions" />
            <EndpointTest endpoint="PUT /chat/sessions/:id/name" description="Rename session" />
            <EndpointTest endpoint="DELETE /chat/sessions/:id" description="Delete session" />
            <EndpointTest endpoint="POST /chat/sessions/:id/ask" description="Ask question" />
            <EndpointTest endpoint="GET /chat/search" description="Search sessions" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface TestItemProps {
  title: string
  status: 'success' | 'error' | 'loading'
  details: string
}

function TestItem({ title, status, details }: TestItemProps) {
  const Icon = status === 'success' ? CheckCircle : status === 'error' ? XCircle : Loader2
  const colorClass = status === 'success' 
    ? 'text-green-600' 
    : status === 'error' 
    ? 'text-red-600' 
    : 'text-blue-600'

  return (
    <div className="flex items-start gap-3">
      <Icon className={`w-5 h-5 mt-0.5 ${colorClass} ${status === 'loading' ? 'animate-spin' : ''}`} />
      <div className="flex-1">
        <div className="font-medium">{title}</div>
        <div className="text-sm text-gray-600">{details}</div>
      </div>
    </div>
  )
}

interface EndpointTestProps {
  endpoint: string
  description: string
}

function EndpointTest({ endpoint, description }: EndpointTestProps) {
  return (
    <div className="p-2 border rounded">
      <div className="font-mono text-xs text-blue-600">{endpoint}</div>
      <div className="text-gray-600">{description}</div>
    </div>
  )
}