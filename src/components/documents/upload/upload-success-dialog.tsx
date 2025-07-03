'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { DocumentProcessingStatus } from '@/components/documents/document-processing-status'
import { useDocument } from '@/hooks/queries/documents.queries'
import type { Document } from '@/types'

interface UploadSuccessDialogProps {
  document: Document
  open: boolean
  onOpenChange: (open: boolean) => void
  onViewDocument?: () => void
}

export function UploadSuccessDialog({
  document,
  open,
  onOpenChange,
  onViewDocument,
}: UploadSuccessDialogProps) {
  const router = useRouter()
  const [showProcessing, setShowProcessing] = useState(true)
  const [processingComplete, setProcessingComplete] = useState(false)
  
  // Poll for document updates if processing
  const { data: updatedDocument } = useDocument(document.id, {
    enabled: showProcessing && !processingComplete,
    refetchInterval: processingComplete ? false : 2000, // Poll every 2 seconds
  })

  const currentDocument = updatedDocument || document

  // Check if processing is complete
  useEffect(() => {
    if (currentDocument.status === 'ai_processed' && 
        currentDocument.embedding_status === 'completed') {
      setProcessingComplete(true)
    }
  }, [currentDocument])

  const handleViewDocument = () => {
    onOpenChange(false)
    if (onViewDocument) {
      onViewDocument()
    } else {
      router.push(`/dashboard/documents/${document.id}`)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Upload Successful
          </DialogTitle>
          <DialogDescription>
            Your document has been uploaded and is being processed.
          </DialogDescription>
        </DialogHeader>

        <div className="my-6">
          {showProcessing ? (
            <DocumentProcessingStatus
              document={currentDocument}
              onComplete={() => setProcessingComplete(true)}
            />
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {currentDocument.title}
              </h3>
              <p className="text-sm text-gray-600">
                Document uploaded successfully
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button
            variant="ghost"
            onClick={() => setShowProcessing(!showProcessing)}
            className="mr-auto"
          >
            {showProcessing ? 'Hide Details' : 'Show Processing Status'}
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
            <Button onClick={handleViewDocument}>
              View Document
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Simple upload notification for multiple files
export function UploadNotification({
  filesCount,
  successCount,
  errorCount,
  onDismiss,
}: {
  filesCount: number
  successCount: number
  errorCount: number
  onDismiss: () => void
}) {
  return (
    <div className="fixed bottom-4 right-4 bg-white border rounded-lg shadow-lg p-4 max-w-sm">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium">Upload Complete</h4>
          <p className="text-sm text-gray-600 mt-1">
            {successCount} of {filesCount} files uploaded successfully
            {errorCount > 0 && (
              <span className="text-red-600"> ({errorCount} failed)</span>
            )}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-4"
          onClick={onDismiss}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="mt-3 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.href = '/dashboard/documents'}
        >
          View Documents
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDismiss}
        >
          Dismiss
        </Button>
      </div>
    </div>
  )
}