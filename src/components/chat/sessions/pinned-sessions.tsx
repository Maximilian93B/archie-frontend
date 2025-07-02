'use client'

import { useChatStore, selectPinnedSessions, selectIsGroupExpanded } from '@/store/chat-store'
import { SessionListItem } from './session-list-item'
import { Button } from '@/components/ui/button'
import { Pin, ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PinnedSessions() {
  const pinnedSessions = useChatStore(selectPinnedSessions)
  const isExpanded = useChatStore(selectIsGroupExpanded('pinned'))
  const { toggleGroup, searchQuery } = useChatStore()
  
  // Don't show pinned section during search
  if (searchQuery) return null
  
  // Don't show if no pinned sessions
  if (pinnedSessions.length === 0) return null
  
  return (
    <div className="mb-4">
      {/* Section Header */}
      <Button
        variant="ghost"
        onClick={() => toggleGroup('pinned')}
        className="w-full h-8 justify-start px-2 mb-2 text-gray-700 hover:bg-gray-100"
      >
        {isExpanded ? (
          <ChevronDown className="h-3 w-3 mr-1" />
        ) : (
          <ChevronRight className="h-3 w-3 mr-1" />
        )}
        <Pin className="h-3 w-3 mr-2 text-amber-500" />
        <span className="text-xs font-medium">Pinned</span>
        <span className="ml-auto text-xs text-gray-500">
          {pinnedSessions.length}
        </span>
      </Button>
      
      {/* Session List */}
      {isExpanded && (
        <div className="space-y-1 ml-4">
          {pinnedSessions.map((session) => (
            <SessionListItem
              key={session.id}
              session={session}
              isPinned={true}
              showPin={true}
              className="pl-2"
            />
          ))}
        </div>
      )}
    </div>
  )
}