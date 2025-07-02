'use client'

import { useState, useEffect, useRef } from 'react'
import { useChatStore, selectSessionSidebarOpen } from '@/store/chat-store'
import { SessionQuickActions } from './session-quick-actions'
import { SessionSearch } from './session-search'
import { PinnedSessions } from './pinned-sessions'
import { SessionGrouping } from './session-grouping'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts'
import { cn } from '@/lib/utils'
import { 
  ChevronLeft, 
  ChevronRight,
  MessageCircle,
  Settings
} from 'lucide-react'

interface ChatSessionSidebarProps {
  className?: string
}

export function ChatSessionSidebar({ className }: ChatSessionSidebarProps) {
  const {
    sessionSidebarOpen,
    toggleSessionSidebar,
    searchQuery,
    sessionsList,
    regroupSessions
  } = useChatStore()
  
  const [isMobile, setIsMobile] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 'k',
      metaKey: true, // Cmd+K on Mac
      callback: () => {
        if (searchInputRef.current) {
          searchInputRef.current.focus()
        }
      }
    },
    {
      key: 'k',
      ctrlKey: true, // Ctrl+K on Windows/Linux
      callback: () => {
        if (searchInputRef.current) {
          searchInputRef.current.focus()
        }
      }
    },
    {
      key: 'b',
      metaKey: true, // Cmd+B to toggle sidebar
      callback: toggleSessionSidebar
    },
    {
      key: 'b',
      ctrlKey: true, // Ctrl+B to toggle sidebar
      callback: toggleSessionSidebar
    }
  ])
  
  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Regroup sessions when sessionsList changes
  useEffect(() => {
    if (sessionsList.length > 0) {
      regroupSessions()
    }
  }, [sessionsList.length, regroupSessions])
  
  // Mobile overlay
  if (isMobile && sessionSidebarOpen) {
    return (
      <div className="fixed inset-0 z-50 lg:hidden">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50" 
          onClick={toggleSessionSidebar}
        />
        
        {/* Sidebar */}
        <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl">
          <SidebarContent searchInputRef={searchInputRef} />
        </div>
      </div>
    )
  }
  
  // Desktop sidebar
  return (
    <div className={cn(
      "hidden lg:flex flex-col border-r bg-gray-50 transition-all duration-200",
      sessionSidebarOpen ? "w-80" : "w-0 overflow-hidden",
      className
    )}>
      {sessionSidebarOpen && <SidebarContent searchInputRef={searchInputRef} />}
      
      {/* Toggle button for desktop */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleSessionSidebar}
        className={cn(
          "absolute top-4 z-10 h-8 w-8 p-0 border bg-white shadow-sm hover:bg-gray-50",
          sessionSidebarOpen ? "-right-4" : "right-2"
        )}
      >
        {sessionSidebarOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}

interface SidebarContentProps {
  searchInputRef?: React.RefObject<HTMLInputElement>
}

function SidebarContent({ searchInputRef }: SidebarContentProps) {
  const { sessionsList, searchQuery } = useChatStore()
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-gray-600" />
          <h2 className="font-semibold text-gray-900">Chats</h2>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {sessionsList.length}
          </span>
        </div>
        
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Quick Actions */}
      <div className="p-4 border-b bg-white">
        <SessionQuickActions />
      </div>
      
      {/* Search */}
      <div className="p-4 border-b bg-white">
        <SessionSearch ref={searchInputRef} />
      </div>
      
      {/* Session Groups */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {/* Pinned Sessions */}
          <PinnedSessions />
          
          {/* Grouped Sessions */}
          <SessionGrouping />
          
          {/* Empty State */}
          {sessionsList.length === 0 && !searchQuery && (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <MessageCircle className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                No conversations yet
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Start chatting with your documents to see conversations here
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}