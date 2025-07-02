'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, FileText, AlertCircle, CheckCircle, Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { FolderSelector } from '@/components/folders/folder-selector'
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

interface DocumentUploaderWithFoldersProps {
  onUploadComplete?: (documentId: string) => void
  maxFiles?: number
  maxSize?: number // in bytes
  acceptedFileTypes?: Record<string, string[]>
  defaultFolderId?: string
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

export function DocumentUploaderWithFolders({
  onUploadComplete,
  maxFiles = 10,
  maxSize = 50 * 1024 * 1024, // 50MB
  acceptedFileTypes = DEFAULT_ACCEPTED_TYPES,
  defaultFolderId,
}: DocumentUploaderWithFoldersProps) {
  const [files, setFiles] = useState<FileWithProgress[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(defaultFolderId || null)
  const [enableAI, setEnableAI] = useState(true)
  const [enableOCR, setEnableOCR] = useState(true)
  const [showSettings, setShowSettings] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        ...file,
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        progress: 0,
        status: 'pending' as const,
      }))

      setFiles((prev) => [...prev, ...newFiles])
    },
    []
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
        enable_ai: enableAI,
        enable_ocr: enableOCR && file.type === 'application/pdf',
        folder_id: selectedFolderId || undefined,
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

  const getFileIcon = (file: File) => {
    const label = FILE_TYPE_LABELS[file.type] || 'File'
    return label
  }

  const hasFiles = files.length > 0
  const hasPendingFiles = files.some((f) => f.status === 'pending')
  const hasCompletedFiles = files.some((f) => f.status === 'completed')

  return (
    <div className="space-y-4">
      {/* Upload Options */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium">Upload Settings</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Folder Selection */}
        <div className="space-y-2">
          <Label htmlFor="folder">Destination Folder</Label>
          <FolderSelector
            value={selectedFolderId}
            onChange={setSelectedFolderId}
            placeholder="Select a folder (optional)"
          />
        </div>

        {showSettings && (
          <>
            <Separator className="my-4" />
            
            {/* AI Processing Toggle */}
            <div className="flex items-center justify-between mb-3">
              <div className="space-y-0.5">
                <Label htmlFor="enable-ai">AI Processing</Label>
                <p className="text-xs text-gray-500">
                  Extract insights, summaries, and enable AI search
                </p>
              </div>
              <Switch
                id="enable-ai"
                checked={enableAI}
                onCheckedChange={setEnableAI}
              />
            </div>

            {/* OCR Toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enable-ocr">OCR for PDFs</Label>
                <p className="text-xs text-gray-500">
                  Extract text from scanned PDFs
                </p>
              </div>
              <Switch
                id="enable-ocr"
                checked={enableOCR}
                onCheckedChange={setEnableOCR}
              />
            </div>
          </>
        )}
      </Card>

      {/* Dropzone */}
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

      {/* File Queue */}
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

            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50"
                >
                  <div className="flex-shrink-0">
                    {file.status === 'completed' && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {file.status === 'error' && (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                    {(file.status === 'pending' || file.status === 'uploading') && (
                      <FileText className="h-5 w-5 text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {formatBytes(file.size)}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">
                          {getFileIcon(file)}
                        </span>
                      </div>
                    </div>

                    {file.status === 'uploading' && (
                      <div className="mt-2">
                        <Progress value={file.progress} className="h-1" />
                      </div>
                    )}

                    {file.error && (
                      <p className="mt-1 text-xs text-red-600">{file.error}</p>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0"
                    onClick={() => removeFile(file.id)}
                    disabled={file.status === 'uploading'}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}