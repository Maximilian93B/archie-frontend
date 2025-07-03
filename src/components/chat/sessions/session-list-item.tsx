'use client'

import { useState } from 'react'
import { ChatSession } from '@/store/chat-store'
import { useChatStoreSafe } from '@/hooks/use-chat-store-safe'
import { useUpdateSessionName, useDeleteChatSession, usePinSession } from '@/hooks/queries/chat.queries'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { 
  Pin, 
  PinOff, 
  MoreHorizontal, 
  Edit2, 
  Trash2, 
  Download,
  MessageCircle,
  FileText,
  Clock
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'react-hot-toast'

interface SessionListItemProps {
  session: ChatSession
  isPinned: boolean
  showPin?: boolean
  className?: string
}

export function SessionListItem({ 
  session, 
  isPinned, 
  showPin = true,
  className 
}: SessionListItemProps) {
  const { currentSessionId, setCurrentSession, exportSession } = useChatStoreSafe()
  
  // React Query mutations
  const updateSessionName = useUpdateSessionName()
  const deleteSession = useDeleteChatSession()
  const { pinSession, unpinSession } = usePinSession()
  
  const [showRenameDialog, setShowRenameDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [newName, setNewName] = useState(session.sessionName)
  const [isExporting, setIsExporting] = useState(false)
  
  const isActive = currentSessionId === session.id
  const lastMessage = session.messages[session.messages.length - 1]
  const timeAgo = formatDistanceToNow(new Date(session.updatedAt), { addSuffix: true })
  
  const handleSelect = () => {
    setCurrentSession(session.id)
  }
  
  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isPinned) {
      unpinSession(session.id)
    } else {
      pinSession(session.id)
    }
  }
  
  const handleRename = async () => {
    if (newName.trim() && newName !== session.sessionName) {
      try {
        await updateSessionName.mutateAsync({
          sessionId: session.id,
          sessionName: newName.trim()
        })
        setShowRenameDialog(false)
      } catch (error) {
        // Error is handled by the mutation
      }
    } else {
      setShowRenameDialog(false)
    }
  }
  
  const handleDelete = async () => {
    try {
      await deleteSession.mutateAsync(session.id)
      setShowDeleteDialog(false)
    } catch (error) {
      // Error is handled by the mutation
    }
  }
  
  const handleExport = async () => {
    setIsExporting(true)
    try {
      const markdown = await exportSession(session.id)
      
      // Create and download file
      const blob = new Blob([markdown], { type: 'text/markdown' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${session.sessionName.replace(/[^a-z0-9]/gi, '_')}.md`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      toast.success('Chat history downloaded as Markdown file')
    } catch (error) {
      toast.error('Failed to export chat history')
    }
    setIsExporting(false)
  }
  
  return (
    <>
      <div
        onClick={handleSelect}
        className={cn(
          "group relative flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all",
          "hover:bg-gray-50 border border-transparent",
          isActive && "bg-blue-50 border-blue-200 shadow-sm",
          className
        )}
      >
        {/* Session Icon */}
        <div className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isActive ? "bg-blue-100" : "bg-gray-100"
        )}>
          {session.documentTitle ? (
            <FileText className={cn(
              "h-4 w-4",
              isActive ? "text-blue-600" : "text-gray-600"
            )} />
          ) : (
            <MessageCircle className={cn(
              "h-4 w-4",
              isActive ? "text-blue-600" : "text-gray-600"
            )} />
          )}
        </div>
        
        {/* Session Content */}
        <div className="flex-1 min-w-0">
          {/* Session Name */}
          <div className="flex items-center gap-2 mb-1">
            <h4 className={cn(
              "text-sm font-medium truncate",
              isActive ? "text-blue-900" : "text-gray-900"
            )}>
              {session.sessionName}
            </h4>
            {isPinned && showPin && (
              <Pin className="h-3 w-3 text-amber-500 flex-shrink-0" />
            )}
          </div>
          
          {/* Document Title */}
          {session.documentTitle && (
            <p className="text-xs text-gray-500 mb-1 truncate">
              📄 {session.documentTitle}
            </p>
          )}
          
          {/* Last Message Preview */}
          {lastMessage && (
            <p className="text-xs text-gray-600 line-clamp-2 mb-1">
              {lastMessage.role === 'user' ? 'You: ' : 'AI: '}
              {lastMessage.content}
            </p>
          )}
          
          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {timeAgo}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              {session.totalMessages}
            </span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Pin Button */}
          {showPin && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePin}
              className="h-6 w-6 p-0 hover:bg-gray-200"
              title={isPinned ? 'Unpin session' : 'Pin session'}
            >
              {isPinned ? (
                <PinOff className="h-3 w-3 text-amber-500" />
              ) : (
                <Pin className="h-3 w-3 text-gray-400" />
              )}
            </Button>
          )}
          
          {/* More Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setShowRenameDialog(true)}>
                <Edit2 className="h-4 w-4 mr-2" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleExport}
                disabled={isExporting || !session.canModify}
              >
                <Download className="h-4 w-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Export'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => setShowDeleteDialog(true)}
                disabled={deleteSession.isPending || !session.canModify}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {deleteSession.isPending ? 'Deleting...' : 'Delete'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Rename Dialog */}
      <Dialog open={showRenameDialog} onOpenChange={setShowRenameDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rename Conversation</DialogTitle>
            <DialogDescription>
              Enter a new name for this conversation
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Conversation name"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleRename()
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRenameDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleRename}
              disabled={updateSessionName.isPending}
            >
              {updateSessionName.isPending ? 'Renaming...' : 'Rename'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Conversation</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{session.sessionName}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={deleteSession.isPending}
            >
              {deleteSession.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}