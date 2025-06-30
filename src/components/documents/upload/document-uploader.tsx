'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, FileText, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { formatBytes } from '@/lib/utils'
import { apiClient } from '@/lib/api/client'
import { toast } from '@/hooks/use-toast'
import type { UploadOptions } from '@/types'

interface FileWithProgress extends File {
  id: string
  progress: number
  status: 'pending' | 'uploading' | 'completed' | 'error'
  error?: string
}

interface DocumentUploaderProps {
  onUploadComplete?: (documentId: string) => void
  maxFiles?: number
  maxSize?: number // in bytes
  acceptedFileTypes?: Record<string, string[]>
  folderId?: string // Optional folder selection
}

const DEFAULT_ACCEPTED_TYPES = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'text/plain': ['.txt'],
  'text/markdown': ['.md'],
  'text/csv': ['.csv'],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/gif': ['.gif'],
  'image/webp': ['.webp'],
}

const FILE_TYPE_LABELS: Record<string, string> = {
  'application/pdf': 'PDF',
  'application/msword': 'Word',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word',
  'text/plain': 'Text',
  'text/markdown': 'Markdown',
  'text/csv': 'CSV',
  'application/vnd.ms-excel': 'Excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel',
  'image/png': 'PNG',
  'image/jpeg': 'JPEG',
  'image/gif': 'GIF',
  'image/webp': 'WebP',
}

const getFileTypeLabel = (mimeType: string): string => {
  return FILE_TYPE_LABELS[mimeType] || 'File'
}

export function DocumentUploader({
  onUploadComplete,
  maxFiles = 10,
  maxSize = 50 * 1024 * 1024, // 50MB
  acceptedFileTypes = DEFAULT_ACCEPTED_TYPES,
  folderId,
}: DocumentUploaderProps) {
  const [files, setFiles] = useState<FileWithProgress[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: Array<{file: File, errors: Array<{code: string, message: string}>}>) => {
      // Handle rejected files
      rejectedFiles.forEach((file) => {
        const error = file.errors[0]
        if (error.code === 'file-too-large') {
          toast({
            title: 'File too large',
            description: `${file.file.name} exceeds the ${formatBytes(maxSize)} limit`,
            variant: 'destructive',
          })
        } else if (error.code === 'file-invalid-type') {
          toast({
            title: 'Invalid file type',
            description: `${file.file.name} is not a supported file type`,
            variant: 'destructive',
          })
        }
      })

      // Add accepted files
      const newFiles: FileWithProgress[] = acceptedFiles.map((file) => ({
        ...file,
        id: Math.random().toString(36).substring(7),
        progress: 0,
        status: 'pending' as const,
      }))

      setFiles((prev) => [...prev, ...newFiles])
    },
    [maxSize]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxSize,
    maxFiles,
  })

  const uploadFile = async (file: FileWithProgress) => {
    try {
      // Update status to uploading
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id ? { ...f, status: 'uploading' as const } : f
        )
      )

      const options: UploadOptions = {
        title: file.name,
        enable_ai: true,
        enable_ocr: file.type === 'application/pdf',
        folder_id: folderId,
      }

      const response = await apiClient.uploadDocument(
        file,
        options,
        (progress) => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id ? { ...f, progress } : f
            )
          )
        }
      )

      // Update status to completed
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id
            ? { ...f, status: 'completed' as const, progress: 100 }
            : f
        )
      )

      toast({
        title: 'Upload successful',
        description: `${file.name} has been uploaded`,
      })

      if (onUploadComplete) {
        onUploadComplete(response.id)
      }
    } catch (error) {
      console.error('Upload error:', error)
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id
            ? {
                ...f,
                status: 'error' as const,
                error: error instanceof Error ? error.message : 'Upload failed',
              }
            : f
        )
      )

      toast({
        title: 'Upload failed',
        description: `Failed to upload ${file.name}`,
        variant: 'destructive',
      })
    }
  }

  const uploadAll = async () => {
    setIsUploading(true)
    const pendingFiles = files.filter((f) => f.status === 'pending')

    // Upload files sequentially to avoid overwhelming the server
    for (const file of pendingFiles) {
      await uploadFile(file)
    }

    setIsUploading(false)
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const clearCompleted = () => {
    setFiles((prev) => prev.filter((f) => f.status !== 'completed'))
  }

  const hasFiles = files.length > 0
  const hasPendingFiles = files.some((f) => f.status === 'pending')
  const hasCompletedFiles = files.some((f) => f.status === 'completed')

  return (
    <div className="space-y-4">
      <Card
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed cursor-pointer transition-colors',
          isDragActive
            ? 'border-black bg-gray-50'
            : 'border-gray-300 hover:border-gray-400'
        )}
      >
        <div className="p-8 text-center">
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            {isDragActive
              ? 'Drop the files here...'
              : 'Drag and drop files here, or click to select'}
          </p>
          <div className="mt-2 space-y-1">
            <p className="text-xs text-gray-500">
              Maximum {maxFiles} files, up to {formatBytes(maxSize)} each
            </p>
            <p className="text-xs text-gray-500">
              Supported formats: {Object.values(FILE_TYPE_LABELS).filter((v, i, a) => a.indexOf(v) === i).join(', ')}
            </p>
          </div>
          <Button variant="outline" className="mt-4">
            Select Files
          </Button>
        </div>
      </Card>

      {hasFiles && (
        <Card>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Upload Queue</h3>
              <div className="space-x-2">
                {hasCompletedFiles && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearCompleted}
                  >
                    Clear Completed
                  </Button>
                )}
                {hasPendingFiles && (
                  <Button
                    size="sm"
                    onClick={uploadAll}
                    disabled={isUploading}
                  >
                    Upload All
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="relative">
                    <FileText className="h-8 w-8 text-gray-400 flex-shrink-0" />
                    <span className="absolute -bottom-1 -right-1 text-[10px] font-medium bg-gray-200 px-1 rounded">
                      {getFileTypeLabel(file.type)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatBytes(file.size)}
                    </p>
                    {file.status === 'uploading' && (
                      <Progress value={file.progress} className="mt-2 h-1" />
                    )}
                    {file.error && (
                      <p className="text-xs text-red-600 mt-1">{file.error}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {file.status === 'pending' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => uploadFile(file)}
                        disabled={isUploading}
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    )}
                    {file.status === 'completed' && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {file.status === 'error' && (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                    {file.status !== 'uploading' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}