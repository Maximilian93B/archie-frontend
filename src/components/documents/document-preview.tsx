'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FileText, FileSpreadsheet, FileImage, FileCode, File, Loader2, AlertCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Document } from '@/types'

interface DocumentPreviewProps {
  document: Document
  className?: string
  showText?: boolean
  maxTextLength?: number
}

const FILE_TYPE_ICONS: Record<string, React.ElementType> = {
  pdf: FileText,
  doc: FileText,
  docx: FileText,
  odt: FileText,
  rtf: FileText,
  txt: FileText,
  md: FileCode,
  csv: FileSpreadsheet,
  xls: FileSpreadsheet,
  xlsx: FileSpreadsheet,
  ods: FileSpreadsheet,
  json: FileCode,
  xml: FileCode,
  ppt: FileText,
  pptx: FileText,
  odp: FileText,
}

const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg', 'tiff', 'tif']

export function DocumentPreview({ 
  document, 
  className,
  showText = false,
  maxTextLength = 300
}: DocumentPreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const fileExtension = document.filename.split('.').pop()?.toLowerCase() || ''
  const isImage = IMAGE_EXTENSIONS.includes(fileExtension)
  const IconComponent = FILE_TYPE_ICONS[fileExtension] || File

  useEffect(() => {
    // In a real implementation, this would fetch the preview URL from the backend
    // For now, we'll simulate it
    if (document.thumbnail_url) {
      setPreviewUrl(document.thumbnail_url)
    } else if (isImage) {
      // For images, we might have a direct preview URL
      // This would come from the backend
      setLoading(true)
      // Simulate loading
      setTimeout(() => {
        setLoading(false)
        // In production, set the actual preview URL
        // setPreviewUrl(document.preview_url)
      }, 1000)
    }
  }, [document, isImage])

  const renderPreview = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-48 bg-gray-50">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      )
    }

    if (error || !previewUrl) {
      return (
        <div className="flex flex-col items-center justify-center h-48 bg-gray-50">
          <IconComponent className="w-16 h-16 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">{fileExtension.toUpperCase()}</span>
        </div>
      )
    }

    if (isImage && previewUrl) {
      return (
        <div className="relative h-48">
          <Image
            src={previewUrl}
            alt={document.filename}
            fill
            className="object-contain"
            onError={() => setError(true)}
          />
        </div>
      )
    }

    return (
      <div className="flex flex-col items-center justify-center h-48 bg-gray-50">
        <IconComponent className="w-16 h-16 text-gray-400 mb-2" />
        <span className="text-sm text-gray-500">{fileExtension.toUpperCase()}</span>
      </div>
    )
  }

  const renderTextPreview = () => {
    if (!showText || !document.extracted_text) return null

    const truncatedText = document.extracted_text.length > maxTextLength
      ? document.extracted_text.substring(0, maxTextLength) + '...'
      : document.extracted_text

    return (
      <div className="p-4 border-t">
        <h4 className="text-sm font-medium mb-2">Text Preview</h4>
        <p className="text-sm text-gray-600 whitespace-pre-wrap">
          {truncatedText}
        </p>
      </div>
    )
  }

  return (
    <Card className={cn('overflow-hidden', className)}>
      {renderPreview()}
      {renderTextPreview()}
      
      {/* Document Info */}
      <div className="p-4">
        <h3 className="font-medium truncate">{document.title}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {(document.file_size / 1024 / 1024).toFixed(2)} MB • {fileExtension.toUpperCase()}
        </p>
        
        {/* AI Processing Indicator */}
        {document.ai_processed && (
          <div className="flex items-center gap-1 mt-2">
            <div className="w-2 h-2 bg-purple-600 rounded-full" />
            <span className="text-xs text-purple-600">AI Processed</span>
          </div>
        )}
      </div>
    </Card>
  )
}

// Thumbnail component for grid views
export function DocumentThumbnail({ 
  document, 
  onClick,
  selected = false,
  className 
}: { 
  document: Document
  onClick?: () => void
  selected?: boolean
  className?: string 
}) {
  const fileExtension = document.filename.split('.').pop()?.toLowerCase() || ''
  const isImage = IMAGE_EXTENSIONS.includes(fileExtension)
  const IconComponent = FILE_TYPE_ICONS[fileExtension] || File

  return (
    <div
      className={cn(
        'group cursor-pointer rounded-lg border transition-all',
        'hover:shadow-md hover:border-gray-300',
        selected && 'ring-2 ring-primary border-primary',
        className
      )}
      onClick={onClick}
    >
      <div className="aspect-[4/3] relative bg-gray-50 rounded-t-lg overflow-hidden">
        {document.thumbnail_url && isImage ? (
          <Image
            src={document.thumbnail_url}
            alt={document.filename}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <IconComponent className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {/* Processing Status Overlay */}
        {document.status === 'processing' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-white" />
          </div>
        )}
      </div>
      
      <div className="p-3">
        <p className="text-sm font-medium truncate">{document.title}</p>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(document.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}