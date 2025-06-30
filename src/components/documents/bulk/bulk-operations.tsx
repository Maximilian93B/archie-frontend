'use client'

import { Download, Trash2, FolderInput, Tag, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDocumentStore } from '@/store/document-store'
import { apiClient } from '@/lib/api/client'
import { toast } from '@/hooks/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface BulkOperationsProps {
  onComplete?: () => void
}

export function BulkOperations({ onComplete }: BulkOperationsProps) {
  const queryClient = useQueryClient()
  const { selectedDocumentIds, clearSelection } = useDocumentStore()
  const selectedCount = selectedDocumentIds.length

  // Bulk delete mutation
  const bulkDeleteMutation = useMutation({
    mutationFn: async (documentIds: string[]) => {
      // Delete documents one by one (backend may not support bulk delete yet)
      const results = await Promise.allSettled(
        documentIds.map(id => apiClient.deleteDocument(id))
      )
      
      const failures = results.filter(r => r.status === 'rejected').length
      if (failures > 0) {
        throw new Error(`Failed to delete ${failures} documents`)
      }
      
      return results
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      toast({
        title: 'Documents deleted',
        description: `${selectedCount} documents have been permanently deleted.`,
      })
      clearSelection()
      onComplete?.()
    },
    onError: (error: Error) => {
      toast({
        title: 'Delete failed',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  // Bulk download handler
  const handleBulkDownload = async () => {
    try {
      // Download documents one by one
      for (const docId of selectedDocumentIds) {
        try {
          const blob = await apiClient.downloadDocument(docId)
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `document-${docId}`
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
          document.body.removeChild(a)
        } catch (error) {
          console.error(`Failed to download document ${docId}:`, error)
        }
      }
      
      toast({
        title: 'Downloads started',
        description: `Downloading ${selectedCount} documents`,
      })
    } catch {
      toast({
        title: 'Download failed',
        description: 'Failed to download some documents',
        variant: 'destructive',
      })
    }
  }

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedCount} documents? This action cannot be undone.`)) {
      bulkDeleteMutation.mutate(selectedDocumentIds)
    }
  }

  if (selectedCount === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white rounded-lg shadow-lg p-4 flex items-center gap-4 z-50">
      <span className="text-sm font-medium">
        {selectedCount} document{selectedCount !== 1 ? 's' : ''} selected
      </span>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20"
          onClick={handleBulkDownload}
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20"
          disabled
          title="Move to folder (coming soon)"
        >
          <FolderInput className="h-4 w-4 mr-2" />
          Move
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20"
          disabled
          title="Add tags (coming soon)"
        >
          <Tag className="h-4 w-4 mr-2" />
          Tag
        </Button>
        
        <div className="w-px h-6 bg-white/20" />
        
        <Button
          variant="ghost"
          size="sm"
          className="text-red-400 hover:bg-red-400/20"
          onClick={handleBulkDelete}
          disabled={bulkDeleteMutation.isPending}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-white/20 ml-2"
        onClick={clearSelection}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}