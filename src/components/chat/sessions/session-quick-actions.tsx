'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DocumentPicker } from '@/components/documents/document-picker'
import { useCreateChatSession } from '@/hooks/queries/chat.queries'
import { useChatStore } from '@/store/chat-store'
import { Plus, FileText, MessageSquare } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

export function SessionQuickActions() {
  const [showDocumentPicker, setShowDocumentPicker] = useState(false)
  const [showQuickStart, setShowQuickStart] = useState(false)
  const { setCurrentSession } = useChatStore()
  const createSession = useCreateChatSession()
  
  const handleNewChatWithDocument = async (documentId: string) => {
    try {
      const result = await createSession.mutateAsync({
        document_id: documentId,
        session_name: `Chat - ${new Date().toLocaleDateString()}`
      })
      
      setCurrentSession(result.id)
      setShowDocumentPicker(false)
      
      toast({
        title: 'New chat started',
        description: 'You can now ask questions about this document.'
      })
    } catch (error) {
      toast({
        title: 'Failed to create chat',
        description: 'Please try again.',
        variant: 'destructive'
      })
    }
  }
  
  const handleQuickStart = () => {
    setShowQuickStart(true)
  }
  
  return (
    <>
      <div className="flex flex-col gap-2">
        {/* New Chat with Document */}
        <Button
          onClick={() => setShowDocumentPicker(true)}
          className="w-full justify-start h-9"
          disabled={createSession.isPending}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
        
        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleQuickStart}
            className="flex-1 h-8"
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            Quick Start
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDocumentPicker(true)}
            className="flex-1 h-8"
          >
            <FileText className="h-3 w-3 mr-1" />
            Browse Docs
          </Button>
        </div>
      </div>
      
      {/* Document Picker Dialog */}
      <Dialog open={showDocumentPicker} onOpenChange={setShowDocumentPicker}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Select Document for Chat</DialogTitle>
            <DialogDescription>
              Choose a document to start a conversation about
            </DialogDescription>
          </DialogHeader>
          
          <div className="max-h-[400px] overflow-y-auto">
            <DocumentPicker
              onSelect={handleNewChatWithDocument}
              selectedId=""
            />
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDocumentPicker(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Quick Start Dialog */}
      <Dialog open={showQuickStart} onOpenChange={setShowQuickStart}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Quick Start Options</DialogTitle>
            <DialogDescription>
              How would you like to begin chatting?
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                setShowQuickStart(false)
                setShowDocumentPicker(true)
              }}
            >
              <FileText className="h-4 w-4 mr-2" />
              Chat about a specific document
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                // TODO: Implement workspace-wide chat
                setShowQuickStart(false)
                toast({
                  title: 'Coming soon',
                  description: 'Workspace-wide chat will be available soon.'
                })
              }}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat about my entire workspace
            </Button>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowQuickStart(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}