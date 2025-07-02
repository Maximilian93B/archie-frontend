import React, { memo } from 'react'
import { Copy, RefreshCw, AlertCircle, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChatMessage } from '@/store/chat-store'
import { format, formatDistanceToNow } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MessageBubbleProps {
  message: ChatMessage
  onRetry?: () => void
  onCopy?: () => void
  showTimestamp?: boolean
  isCompact?: boolean
}

export const MessageBubble = memo(function MessageBubble({
  message,
  onRetry,
  onCopy,
  showTimestamp = true,
  isCompact = false
}: MessageBubbleProps) {
  const [copied, setCopied] = React.useState(false)
  const isUser = message.role === 'user'
  const isFailed = message.status === 'failed'
  const isPending = message.status === 'pending'

  const handleCopy = async () => {
    if (!onCopy) {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } else {
      onCopy()
    }
  }

  return (
    <div
      className={cn(
        'group relative flex gap-3 px-4',
        isCompact ? 'py-2' : 'py-4',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {/* Avatar */}
      {!isCompact && (
        <div
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium',
            isUser
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700'
          )}
        >
          {isUser ? 'U' : 'AI'}
        </div>
      )}

      {/* Message Content */}
      <div
        className={cn(
          'relative max-w-[70%] rounded-lg px-4 py-3',
          isUser
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-900',
          isPending && 'opacity-70',
          isFailed && 'border-2 border-red-500'
        )}
      >
        {/* Error indicator */}
        {isFailed && (
          <div className="mb-2 flex items-center gap-2 text-sm text-red-500">
            <AlertCircle className="h-4 w-4" />
            <span>Failed to send</span>
          </div>
        )}

        {/* Message content with markdown */}
        <div className="prose prose-sm max-w-none">
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>

        {/* Timestamp */}
        {showTimestamp && (
          <div
            className={cn(
              'mt-1 text-xs',
              isUser ? 'text-gray-300' : 'text-gray-500'
            )}
            title={format(new Date(message.timestamp), 'PPpp')}
          >
            {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
          </div>
        )}

        {/* Actions */}
        <div
          className={cn(
            'absolute -bottom-8 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100',
            isUser ? 'right-0' : 'left-0'
          )}
        >
          {/* Copy button */}
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className="h-7 px-2"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-600" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </Button>

          {/* Retry button for failed messages */}
          {isFailed && onRetry && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onRetry}
              className="h-7 px-2"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
})

// MessageTimestamp component for showing time separators
interface MessageTimestampProps {
  timestamp: string
}

export const MessageTimestamp = memo(function MessageTimestamp({ 
  timestamp 
}: MessageTimestampProps) {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
        {format(new Date(timestamp), 'EEEE, MMMM d, yyyy')}
      </div>
    </div>
  )
})

// Loading indicator for when AI is thinking
export const MessageLoading = memo(function MessageLoading() {
  return (
    <div className="flex gap-3 px-4 py-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-700">
        AI
      </div>
      <div className="flex items-center gap-1 rounded-lg bg-gray-100 px-4 py-3">
        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
      </div>
    </div>
  )
})