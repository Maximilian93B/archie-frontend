'use client'

import { useState, useMemo } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { 
  useChatSessions, 
  useDeleteChatSession, 
  useUpdateSessionName,
  usePrefetchChatSession 
} from '@/hooks/queries/chat.queries'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Search, 
  Plus, 
  MessageCircle, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Pin,
  Calendar,
  Hash
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ChatSession } from '@/types'

interface ChatSessionListProps {
  currentSessionId?: string
  onSessionSelect: (sessionId: string) => void
  onCreateSession: () => void
}

export function ChatSessionList({
  currentSessionId,
  onSessionSelect,
  onCreateSession
}: ChatSessionListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  
  // TanStack Query hooks
  const { data: sessions, isLoading } = useChatSessions()
  const deleteSession = useDeleteChatSession()
  const updateName = useUpdateSessionName()
  const prefetchSession = usePrefetchChatSession()
  
  // Filter sessions based on search
  const filteredSessions = useMemo(() => {
    if (!sessions?.data) return []
    if (!searchQuery) return sessions.data
    
    const query = searchQuery.toLowerCase()
    return sessions.data.filter(session => 
      session.session_name.toLowerCase().includes(query) ||
      session.messages.some(msg => 
        msg.content.toLowerCase().includes(query)
      )
    )
  }, [sessions?.data, searchQuery])
  
  const handleRename = async (sessionId: string) => {
    if (!editingName.trim()) return
    
    await updateName.mutateAsync({
      sessionId,
      name: editingName
    })
    
    setEditingId(null)
    setEditingName('')
  }
  
  const handleDelete = async () => {
    if (!deleteId) return
    
    await deleteSession.mutateAsync(deleteId)
    setDeleteId(null)
    
    // If we deleted the current session, clear selection
    if (deleteId === currentSessionId) {
      onSessionSelect('')
    }
  }
  
  const handleSessionClick = (sessionId: string) => {
    // Prefetch session data on hover/click for instant loading
    prefetchSession(sessionId)
    onSessionSelect(sessionId)
  }
  
  const getSessionPreview = (session: ChatSession) => {
    const lastMessage = session.messages[session.messages.length - 1]
    if (!lastMessage) return 'No messages yet'
    
    const preview = lastMessage.content.substring(0, 100)
    return preview.length < lastMessage.content.length ? `${preview}...` : preview
  }
  
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Chat Sessions</h2>
          <Button
            size="sm"
            onClick={onCreateSession}
          >
            <Plus className="h-4 w-4 mr-1" />
            New
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="pl-9"
          />
        </div>
      </div>
      
      {/* Session List */}
      <ScrollArea className="flex-1">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        ) : filteredSessions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {searchQuery ? 'No sessions found' : 'No chat sessions yet'}
          </div>
        ) : (
          <div className="p-2">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className={cn(
                  "group relative mb-1 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors",
                  currentSessionId === session.id && "bg-gray-100"
                )}
                onClick={() => handleSessionClick(session.id)}
                onMouseEnter={() => prefetchSession(session.id)}
              >
                {/* Edit mode */}
                {editingId === session.id ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleRename(session.id)
                    }}
                    className="flex gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      placeholder="Session name"
                      autoFocus
                      className="h-8"
                    />
                    <Button size="sm" type="submit">
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </form>
                ) : (
                  <>
                    {/* Session info */}
                    <div className="pr-8">
                      <h3 className="font-medium text-sm mb-1 flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-gray-400" />
                        {session.session_name}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {getSessionPreview(session)}
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDistanceToNow(new Date(session.created_at), { addSuffix: true })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Hash className="h-3 w-3" />
                          {session.messages.length} messages
                        </span>
                      </div>
                    </div>
                    
                    {/* Actions menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-3 opacity-0 group-hover:opacity-100"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            setEditingId(session.id)
                            setEditingName(session.session_name)
                          }}
                        >
                          <Edit2 className="h-4 w-4 mr-2" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled>
                          <Pin className="h-4 w-4 mr-2" />
                          Pin to top
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={(e) => {
                            e.stopPropagation()
                            setDeleteId(session.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
      
      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete chat session?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this chat session and all its messages. 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}