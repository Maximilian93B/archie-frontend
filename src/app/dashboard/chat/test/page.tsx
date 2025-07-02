'use client'

import { useState } from 'react'
import { ChatInterface } from '@/components/chat/chat-interface'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { apiClient } from '@/lib/api/client'
import { toast } from '@/hooks/use-toast'

export default function ChatTestPage() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [documentId, setDocumentId] = useState<string>('')
  const [sessionName, setSessionName] = useState<string>('Test Chat Session')
  const [isCreating, setIsCreating] = useState(false)

  const createTestSession = async () => {
    if (!documentId.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a document ID',
        variant: 'destructive'
      })
      return
    }

    setIsCreating(true)
    try {
      const response = await apiClient.createChatSession(documentId, sessionName)
      setSessionId(response.session.id)
      toast({
        title: 'Success',
        description: 'Chat session created successfully'
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create session',
        variant: 'destructive'
      })
    } finally {
      setIsCreating(false)
    }
  }

  const loadExistingSession = async () => {
    const id = prompt('Enter session ID:')
    if (!id) return

    try {
      await apiClient.getChatSession(id)
      setSessionId(id)
      toast({
        title: 'Success',
        description: 'Session loaded successfully'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load session',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Chat Interface Test</h1>

      {!sessionId ? (
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Chat Session</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Document ID
                </label>
                <input
                  type="text"
                  value={documentId}
                  onChange={(e) => setDocumentId(e.target.value)}
                  placeholder="Enter document ID"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Session Name
                </label>
                <input
                  type="text"
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                  placeholder="Enter session name"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={createTestSession}
                  disabled={isCreating}
                >
                  {isCreating ? 'Creating...' : 'Create Session'}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={loadExistingSession}
                >
                  Load Existing Session
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-600">
              <p>1. Enter a valid document ID from your database</p>
              <p>2. Click "Create Session" to start a new chat</p>
              <p>3. Or load an existing session by ID</p>
              <p>4. Test the chat functionality:</p>
              <ul className="ml-6 list-disc space-y-1">
                <li>Send messages</li>
                <li>Check virtual scrolling with many messages</li>
                <li>Test rate limiting (10 messages/minute)</li>
                <li>Try markdown formatting in responses</li>
                <li>Test retry on failed messages</li>
                <li>Check draft saving</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="h-[calc(100vh-120px)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Session ID: {sessionId}</p>
              <p className="text-sm text-gray-600">Document ID: {documentId}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSessionId(null)
                setDocumentId('')
              }}
            >
              New Session
            </Button>
          </div>
          
          <Card className="h-full">
            <ChatInterface
              sessionId={sessionId}
              documentId={documentId}
              documentTitle="Test Document"
              onBack={() => setSessionId(null)}
              className="h-full"
            />
          </Card>
        </div>
      )}
    </div>
  )
}