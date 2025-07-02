import React, { useRef, useEffect, useCallback } from 'react'
import { Send, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useChatStore } from '@/store/chat-store'
import { useDebounce } from '@/hooks/use-debounce'

interface ChatInputProps {
  sessionId: string
  onSend: (message: string) => void
  disabled?: boolean
  placeholder?: string
  maxLength?: number
  className?: string
}

export function ChatInput({
  sessionId,
  onSend,
  disabled = false,
  placeholder = 'Ask a question about this document...',
  maxLength = 4000,
  className
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [value, setValue] = React.useState('')
  const [rows, setRows] = React.useState(1)
  
  const {
    drafts,
    setDraft,
    clearDraft,
    isAsking,
    canSendMessage,
    incrementMessageCount
  } = useChatStore()

  const isRateLimited = !canSendMessage()
  const draft = drafts.get(sessionId) || ''

  // Load draft on mount or session change
  useEffect(() => {
    if (draft && !value) {
      setValue(draft)
      adjustTextareaHeight(draft)
    }
  }, [sessionId, draft])

  // Debounced draft saving
  const debouncedDraft = useDebounce(value, 500)
  useEffect(() => {
    if (debouncedDraft && !isAsking) {
      setDraft(sessionId, debouncedDraft)
    }
  }, [debouncedDraft, sessionId, setDraft, isAsking])

  // Auto-resize textarea
  const adjustTextareaHeight = useCallback((text: string) => {
    const lineCount = text.split('\n').length
    const charPerLine = 80 // Approximate characters per line
    const estimatedLines = Math.ceil(text.length / charPerLine)
    const totalLines = Math.max(lineCount, estimatedLines)
    setRows(Math.min(Math.max(1, totalLines), 10)) // Between 1 and 10 rows
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (newValue.length <= maxLength) {
      setValue(newValue)
      adjustTextareaHeight(newValue)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSend = () => {
    const trimmedValue = value.trim()
    if (!trimmedValue || disabled || isAsking || isRateLimited) return

    // Check rate limit
    if (!canSendMessage()) {
      return
    }

    incrementMessageCount()
    onSend(trimmedValue)
    setValue('')
    setRows(1)
    clearDraft(sessionId)
    
    // Focus back on input
    setTimeout(() => {
      textareaRef.current?.focus()
    }, 100)
  }

  const charactersLeft = maxLength - value.length
  const showCharacterWarning = charactersLeft < 100

  return (
    <div className={cn('relative', className)}>
      <div className="flex items-end gap-2 rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isAsking}
            rows={rows}
            className={cn(
              'w-full resize-none rounded-md border-0 bg-transparent px-3 py-2',
              'placeholder:text-gray-400 focus:outline-none focus:ring-0',
              'text-sm leading-6',
              disabled && 'cursor-not-allowed opacity-50'
            )}
            style={{
              minHeight: '40px',
              maxHeight: '200px'
            }}
          />
          
          {/* Character count */}
          {value.length > 0 && (
            <div
              className={cn(
                'absolute bottom-1 right-2 text-xs',
                showCharacterWarning ? 'text-amber-600' : 'text-gray-400'
              )}
            >
              {charactersLeft}
            </div>
          )}
        </div>

        {/* Send button */}
        <Button
          onClick={handleSend}
          disabled={!value.trim() || disabled || isAsking || isRateLimited}
          size="sm"
          className="h-10 px-3"
        >
          {isAsking ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Help text */}
      <div className="mt-2 flex items-center justify-between px-1 text-xs text-gray-500">
        <span>Press Enter to send, Shift+Enter for new line</span>
        {isRateLimited && (
          <span className="flex items-center gap-1 text-amber-600">
            <AlertCircle className="h-3 w-3" />
            Rate limit reached. Please wait a moment.
          </span>
        )}
      </div>

      {/* Draft indicator */}
      {draft && !value && (
        <div className="absolute -top-8 left-0 text-xs text-gray-500">
          Draft saved
        </div>
      )}
    </div>
  )
}

// Simplified version for mobile
export function ChatInputMobile({
  sessionId,
  onSend,
  disabled = false,
  placeholder = 'Type a message...'
}: ChatInputProps) {
  const [value, setValue] = React.useState('')
  const { isAsking } = useChatStore()

  const handleSend = () => {
    const trimmedValue = value.trim()
    if (!trimmedValue || disabled || isAsking) return

    onSend(trimmedValue)
    setValue('')
  }

  return (
    <div className="flex items-center gap-2 border-t bg-white p-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            handleSend()
          }
        }}
        placeholder={placeholder}
        disabled={disabled || isAsking}
        className="flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm focus:border-gray-400 focus:outline-none disabled:opacity-50"
      />
      <Button
        onClick={handleSend}
        disabled={!value.trim() || disabled || isAsking}
        size="sm"
        className="h-9 w-9 rounded-full p-0"
      >
        {isAsking ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}