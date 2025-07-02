'use client'

import { useState, useEffect } from 'react'
import { DocumentPicker } from '@/components/documents/document-picker'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { 
  FileText, 
  Plus, 
  X, 
  MessageCircle,
  Brain,
  Sparkles,
  Users,
  Clock
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'

interface DocumentContextPickerProps {
  selectedDocuments: string[]
  onDocumentsChange: (documentIds: string[]) => void
  maxDocuments?: number
  className?: string
}

interface DocumentContextData {
  id: string
  title: string
  file_name: string
  file_size: number
  content_type: string
  ai_summary?: string
  ai_processed: boolean
  created_at: string
  document_type?: string
  ai_categories?: string[]
}

export function DocumentContextPicker({
  selectedDocuments,
  onDocumentsChange,
  maxDocuments = 5,
  className
}: DocumentContextPickerProps) {
  const [showPicker, setShowPicker] = useState(false)
  const [contextPreview, setContextPreview] = useState<string>('')

  // Fetch details for selected documents
  const { data: documentDetails } = useQuery({
    queryKey: ['documents', 'details', selectedDocuments],
    queryFn: async () => {
      if (selectedDocuments.length === 0) return []
      
      const promises = selectedDocuments.map(id => 
        apiClient.get(`/documents/${id}`)
      )
      
      const results = await Promise.all(promises)
      return results
    },
    enabled: selectedDocuments.length > 0
  })

  // Generate context preview when documents change
  useEffect(() => {
    if (documentDetails && documentDetails.length > 0) {
      const preview = generateContextPreview(documentDetails)
      setContextPreview(preview)
    } else {
      setContextPreview('')
    }
  }, [documentDetails])

  const handleAddDocuments = (newDocumentIds: string[]) => {
    const updatedSelection = [...new Set([...selectedDocuments, ...newDocumentIds])]
      .slice(0, maxDocuments)
    onDocumentsChange(updatedSelection)
    setShowPicker(false)
  }

  const handleRemoveDocument = (documentId: string) => {
    onDocumentsChange(selectedDocuments.filter(id => id !== documentId))
  }

  const canAddMore = selectedDocuments.length < maxDocuments

  return (
    <div className={cn('space-y-4', className)}>
      {/* Selected Documents */}
      {selectedDocuments.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Chat Context ({selectedDocuments.length}/{maxDocuments})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ScrollArea className="max-h-32">
              <div className="space-y-2">
                {documentDetails?.map((doc: DocumentContextData) => (
                  <SelectedDocumentItem
                    key={doc.id}
                    document={doc}
                    onRemove={() => handleRemoveDocument(doc.id)}
                  />
                ))}
              </div>
            </ScrollArea>
            
            {/* Context Preview */}
            {contextPreview && (
              <ContextPreview preview={contextPreview} />
            )}
          </CardContent>
        </Card>
      )}

      {/* Add Documents Button */}
      <Dialog open={showPicker} onOpenChange={setShowPicker}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full"
            disabled={!canAddMore}
          >
            <Plus className="h-4 w-4 mr-2" />
            {selectedDocuments.length === 0 
              ? 'Select Documents for Chat' 
              : `Add More Documents ${canAddMore ? '' : '(Max reached)'}`
            }
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Select Documents for Chat Context</DialogTitle>
            <DialogDescription>
              Choose up to {maxDocuments} documents to include in your conversation. 
              AI will have access to the content of selected documents.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-hidden">
            <DocumentPicker
              onSelect={() => {}} // Not used in multi-select mode
              allowMultiple={true}
              selectedIds={selectedDocuments}
              onMultiSelect={handleAddDocuments}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPicker(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowPicker(false)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Context Tips */}
      {selectedDocuments.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-6 text-center">
            <Brain className="h-8 w-8 text-gray-400 mx-auto mb-3" />
            <h3 className="font-medium text-gray-900 mb-2">No Documents Selected</h3>
            <p className="text-sm text-gray-600 mb-4">
              Add documents to provide context for your AI conversation. The AI will be able to:
            </p>
            <div className="text-left max-w-sm mx-auto">
              <ContextTip icon={<FileText className="h-4 w-4" />} text="Answer questions about document content" />
              <ContextTip icon={<Sparkles className="h-4 w-4" />} text="Provide insights and summaries" />
              <ContextTip icon={<Users className="h-4 w-4" />} text="Compare across multiple documents" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

interface SelectedDocumentItemProps {
  document: DocumentContextData
  onRemove: () => void
}

function SelectedDocumentItem({ document, onRemove }: SelectedDocumentItemProps) {
  return (
    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
      <FileText className="h-4 w-4 text-gray-600 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium truncate">
            {document.title || document.file_name}
          </span>
          {document.ai_processed && (
            <Badge variant="secondary" className="text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Ready
            </Badge>
          )}
        </div>
        {document.ai_summary && (
          <p className="text-xs text-gray-600 truncate">
            {document.ai_summary}
          </p>
        )}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="h-6 w-6 p-0 hover:bg-gray-200 shrink-0"
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  )
}

interface ContextPreviewProps {
  preview: string
}

function ContextPreview({ preview }: ContextPreviewProps) {
  return (
    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
      <div className="flex items-center gap-2 mb-2">
        <Brain className="h-4 w-4 text-blue-600" />
        <span className="text-sm font-medium text-blue-900">AI Context Preview</span>
      </div>
      <p className="text-sm text-blue-800 leading-relaxed">
        {preview}
      </p>
    </div>
  )
}

interface ContextTipProps {
  icon: React.ReactNode
  text: string
}

function ContextTip({ icon, text }: ContextTipProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
      <div className="text-gray-400">{icon}</div>
      {text}
    </div>
  )
}

// Helper function to generate context preview
function generateContextPreview(documents: DocumentContextData[]): string {
  if (documents.length === 0) return ''
  
  if (documents.length === 1) {
    const doc = documents[0]
    return `I'll help you with questions about "${doc.title || doc.file_name}". ${
      doc.ai_summary ? `This document contains: ${doc.ai_summary.slice(0, 100)}...` : ''
    }`
  }
  
  const types = documents.map(d => d.document_type || 'document').filter(Boolean)
  const uniqueTypes = [...new Set(types)]
  
  return `I have access to ${documents.length} documents${
    uniqueTypes.length > 0 ? ` including ${uniqueTypes.slice(0, 2).join(' and ')}` : ''
  }. I can answer questions about any of these documents or help you compare and analyze them together.`
}