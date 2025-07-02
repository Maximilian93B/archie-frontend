'use client'

import { ChatLayout } from '@/components/chat/chat-layout'
import { useSearchParams } from 'next/navigation'

export default function ChatPage() {
  const searchParams = useSearchParams()
  const documentId = searchParams.get('document')
  const documentTitle = searchParams.get('title')
  
  return (
    <div className="h-[calc(100vh-64px)]">
      <ChatLayout
        defaultDocumentId={documentId || undefined}
        defaultDocumentTitle={documentTitle || undefined}
      />
    </div>
  )
}