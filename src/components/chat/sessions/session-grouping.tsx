'use client'

import { useChatStore, selectSessionsByDateGroup, selectIsGroupExpanded, selectFilteredSessions } from '@/store/chat-store'
import { SessionListItem } from './session-list-item'
import { Button } from '@/components/ui/button'
import { 
  ChevronDown, 
  ChevronRight, 
  Calendar,
  Clock,
  Archive,
  FileText
} from 'lucide-react'
import { cn } from '@/lib/utils'

const DATE_GROUPS = [
  { 
    key: 'today' as const, 
    label: 'Today', 
    icon: Clock,
    iconColor: 'text-green-500'
  },
  { 
    key: 'thisWeek' as const, 
    label: 'This Week', 
    icon: Calendar,
    iconColor: 'text-blue-500'
  },
  { 
    key: 'thisMonth' as const, 
    label: 'This Month', 
    icon: Calendar,
    iconColor: 'text-purple-500'
  },
  { 
    key: 'older' as const, 
    label: 'Older', 
    icon: Archive,
    iconColor: 'text-gray-500'
  }
] as const

export function SessionGrouping() {
  const { 
    toggleGroup, 
    searchQuery, 
    pinnedSessionIds,
    sessionGroups 
  } = useChatStore()
  
  // If searching, show filtered results
  if (searchQuery) {
    return <SearchResults />
  }
  
  // Show date-based grouping
  return (
    <div className="space-y-4">
      {DATE_GROUPS.map((group) => (
        <DateGroup key={group.key} group={group} />
      ))}
    </div>
  )
}

function SearchResults() {
  const filteredSessions = useChatStore(selectFilteredSessions)
  const { pinnedSessionIds } = useChatStore()
  
  if (filteredSessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
        <FileText className="h-8 w-8 text-gray-300 mb-2" />
        <p className="text-sm text-gray-500">No matching conversations</p>
      </div>
    )
  }
  
  return (
    <div className="space-y-1">
      <div className="text-xs font-medium text-gray-600 px-2 mb-2">
        Search Results
      </div>
      {filteredSessions.map((session) => (
        <SessionListItem
          key={session.id}
          session={session}
          isPinned={pinnedSessionIds.has(session.id)}
          showPin={false}
        />
      ))}
    </div>
  )
}

interface DateGroupProps {
  group: typeof DATE_GROUPS[number]
}

function DateGroup({ group }: DateGroupProps) {
  const sessions = useChatStore(selectSessionsByDateGroup(group.key))
  const isExpanded = useChatStore(selectIsGroupExpanded(group.key))
  const { toggleGroup, pinnedSessionIds } = useChatStore()
  
  // Filter out pinned sessions (they're shown in pinned section)
  const unpinnedSessions = sessions.filter(session => 
    !pinnedSessionIds.has(session.id)
  )
  
  // Don't show empty groups
  if (unpinnedSessions.length === 0) return null
  
  return (
    <div>
      {/* Group Header */}
      <Button
        variant="ghost"
        onClick={() => toggleGroup(group.key)}
        className="w-full h-8 justify-start px-2 mb-2 text-gray-700 hover:bg-gray-100"
      >
        {isExpanded ? (
          <ChevronDown className="h-3 w-3 mr-1" />
        ) : (
          <ChevronRight className="h-3 w-3 mr-1" />
        )}
        <group.icon className={cn("h-3 w-3 mr-2", group.iconColor)} />
        <span className="text-xs font-medium">{group.label}</span>
        <span className="ml-auto text-xs text-gray-500">
          {unpinnedSessions.length}
        </span>
      </Button>
      
      {/* Session List */}
      {isExpanded && (
        <div className="space-y-1 ml-4">
          {unpinnedSessions.map((session) => (
            <SessionListItem
              key={session.id}
              session={session}
              isPinned={false}
              showPin={true}
              className="pl-2"
            />
          ))}
        </div>
      )}
    </div>
  )
}