'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { useDocumentUpload } from '@/hooks/queries/documents.queries'
import { useSubscription, withQuotaCheck } from '@/hooks/use-subscription'
import { toast } from 'react-hot-toast'

interface UploadFile {
  file: File
  id: string
  progress: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
}

export function DocumentUploader() {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const { mutateAsync: uploadDocument } = useDocumentUpload()
  const { checkQuota } = useSubscription()

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Check quota before accepting files
    const canUpload = await checkQuota('documents', { showError: true })
    if (!canUpload) return

    const newFiles: UploadFile[] = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substring(7),
      progress: 0,
      status: 'pending' as const
    }))

    setFiles(prev => [...prev, ...newFiles])
  }, [checkQuota])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      // Documents
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.oasis.opendocument.text': ['.odt'],
      'application/rtf': ['.rtf'],
      'text/rtf': ['.rtf'],
      
      // Text & Data
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
      'text/csv': ['.csv'],
      'application/json': ['.json'],
      'application/xml': ['.xml'],
      'text/xml': ['.xml'],
      
      // Spreadsheets
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.oasis.opendocument.spreadsheet': ['.ods'],
      
      // Presentations
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'application/vnd.oasis.opendocument.presentation': ['.odp'],
      
      // Images
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
      'image/bmp': ['.bmp'],
      'image/svg+xml': ['.svg'],
      'image/tiff': ['.tiff', '.tif'],
    },
    maxSize: 50 * 1024 * 1024 // 50MB
  })

  const uploadFiles = async () => {
    setIsUploading(true)
    const pendingFiles = files.filter(f => f.status === 'pending')

    for (const uploadFile of pendingFiles) {
      try {
        // Update status to uploading
        setFiles(prev => prev.map(f => 
          f.id === uploadFile.id 
            ? { ...f, status: 'uploading' as const }
            : f
        ))

        // Create form data
        const formData = new FormData()
        formData.append('file', uploadFile.file)

        // Upload with progress tracking
        await uploadDocument(formData, {
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded / progressEvent.total) * 100)
              : 0
            
            setFiles(prev => prev.map(f => 
              f.id === uploadFile.id 
                ? { ...f, progress }
                : f
            ))
          }
        })

        // Mark as success
        setFiles(prev => prev.map(f => 
          f.id === uploadFile.id 
            ? { ...f, status: 'success' as const, progress: 100 }
            : f
        ))

        toast.success(`${uploadFile.file.name} uploaded successfully`)
      } catch (error) {
        // Mark as error
        setFiles(prev => prev.map(f => 
          f.id === uploadFile.id 
            ? { 
                ...f, 
                status: 'error' as const, 
                error: error instanceof Error ? error.message : 'Upload failed'
              }
            : f
        ))

        toast.error(`Failed to upload ${uploadFile.file.name}`)
      }
    }

    setIsUploading(false)
  }

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  const clearCompleted = () => {
    setFiles(prev => prev.filter(f => f.status === 'pending' || f.status === 'uploading'))
  }

  const hasFiles = files.length > 0
  const hasPendingFiles = files.some(f => f.status === 'pending')
  const hasCompletedFiles = files.some(f => f.status === 'success' || f.status === 'error')

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <Card
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed p-8 text-center cursor-pointer transition-colors',
          isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'
        )}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-lg font-medium text-gray-700">
          {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          or <span className="text-primary font-medium">browse</span> to upload
        </p>
        <p className="text-xs text-gray-400 mt-4">
          Supported: Documents (PDF, Word, ODT, RTF) • Data (TXT, CSV, JSON, XML) • 
          Sheets (Excel, ODS) • Slides (PowerPoint, ODP) • Images (PNG, JPG, GIF, WebP, BMP, SVG, TIFF)
        </p>
      </Card>

      {/* File list */}
      {hasFiles && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Files ({files.length})</h3>
            {hasCompletedFiles && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCompleted}
              >
                Clear completed
              </Button>
            )}
          </div>

          <div className="space-y-2">
            {files.map(uploadFile => (
              <div
                key={uploadFile.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <File className="w-5 h-5 text-gray-500 flex-shrink-0" />
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {uploadFile.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  
                  {uploadFile.status === 'uploading' && (
                    <Progress value={uploadFile.progress} className="h-1 mt-2" />
                  )}
                  
                  {uploadFile.error && (
                    <p className="text-xs text-red-600 mt-1">{uploadFile.error}</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {uploadFile.status === 'success' && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  {uploadFile.status === 'error' && (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  {uploadFile.status === 'pending' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(uploadFile.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {hasPendingFiles && (
            <Button
              className="w-full mt-4"
              onClick={uploadFiles}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : `Upload ${files.filter(f => f.status === 'pending').length} files`}
            </Button>
          )}
        </Card>
      )}
    </div>
  )
}

// Quick upload button for use in other components
export function QuickUploadButton({ onSuccess }: { onSuccess?: () => void }) {
  const { checkQuota } = useSubscription()
  const { mutateAsync: uploadDocument } = useDocumentUpload()
  const [isUploading, setIsUploading] = useState(false)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check quota
    const canUpload = await checkQuota('documents')
    if (!canUpload) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      await uploadDocument(formData)
      toast.success('Document uploaded successfully')
      onSuccess?.()
    } catch (error) {
      toast.error('Failed to upload document')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <>
      <input
        type="file"
        id="quick-upload"
        className="hidden"
        onChange={handleFileSelect}
        accept=".pdf,.doc,.docx,.odt,.rtf,.txt,.md,.csv,.json,.xml,.xls,.xlsx,.ods,.ppt,.pptx,.odp,.png,.jpg,.jpeg,.gif,.webp,.bmp,.svg,.tiff,.tif"
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => document.getElementById('quick-upload')?.click()}
        disabled={isUploading}
      >
        <Upload className="w-4 h-4 mr-2" />
        {isUploading ? 'Uploading...' : 'Upload'}
      </Button>
    </>
  )
}