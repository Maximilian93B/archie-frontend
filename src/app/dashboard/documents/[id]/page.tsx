'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Download, 
  Trash2, 
  Share2, 
  FileText,
  Calendar,
  HardDrive,
  Sparkles,
  Tag,
  Folder,
  MessageSquare,
  MoreVertical,
  Eye,
  Edit,
  Copy
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/hooks/use-toast'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'
import { formatDate, formatBytes } from '@/lib/utils'
import type { } from '@/types'

export default function DocumentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const queryClient = useQueryClient()
  const documentId = params.id as string

  // Fetch document details
  const { data: document, isLoading, error } = useQuery<import('@/types').Document>({
    queryKey: ['document', documentId],
    queryFn: () => apiClient.getDocument(documentId),
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: () => apiClient.deleteDocument(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      toast({
        title: 'Document deleted',
        description: 'The document has been permanently deleted.',
      })
      router.push('/dashboard/documents')
    },
    onError: () => {
      toast({
        title: 'Delete failed',
        description: 'Failed to delete the document. Please try again.',
        variant: 'destructive',
      })
    },
  })

  const handleDownload = async () => {
    if (!document) return

    try {
      const blob = await apiClient.downloadDocument(documentId)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = document.filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: 'Download started',
        description: `Downloading ${document.filename}`,
      })
    } catch (error) {
      toast({
        title: 'Download failed',
        description: 'Failed to download the document. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      deleteMutation.mutate()
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: 'Copied to clipboard',
      description: 'Document ID has been copied to your clipboard.',
    })
  }

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center space-x-2 mb-6">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (error || !document) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Document not found
            </h3>
            <p className="text-sm text-gray-500 text-center max-w-sm mb-6">
              The document you&apos;re looking for doesn&apos;t exist or has been deleted.
            </p>
            <Button asChild>
              <Link href="/dashboard/documents">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Documents
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/documents">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">{document.title}</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => copyToClipboard(document.id)}>
                <Copy className="mr-2 h-4 w-4" />
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-4">
          {/* AI Summary */}
          {document.ai_summary && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Sparkles className="mr-2 h-5 w-5 text-green-600" />
                  AI Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {document.ai_summary}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Content Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Content Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {document.content_preview ? (
                <div className="prose prose-sm max-w-none">
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">
                    {document.content_preview}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <Eye className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Content preview not available
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Start AI Chat
              </Button>
              <Button className="w-full" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Document Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Type</p>
                <Badge variant="secondary">{document.document_type}</Badge>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-gray-500 mb-1">File Size</p>
                <p className="text-sm font-medium flex items-center">
                  <HardDrive className="mr-1 h-3 w-3" />
                  {formatBytes(document.file_size)}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-gray-500 mb-1">Uploaded</p>
                <p className="text-sm font-medium flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  {formatDate(document.created_at)}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-gray-500 mb-1">AI Status</p>
                <div className="flex items-center">
                  <Sparkles className={`mr-1 h-3 w-3 ${document.ai_processed ? 'text-green-600' : 'text-gray-400'}`} />
                  <p className="text-sm font-medium">
                    {document.ai_processed ? 'Processed' : 'Pending'}
                  </p>
                </div>
              </div>
              {document.folder_id && (
                <>
                  <Separator />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Folder</p>
                    <p className="text-sm font-medium flex items-center">
                      <Folder className="mr-1 h-3 w-3" />
                      {document.folder_name || 'Unknown'}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          {document.tags && document.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Tag className="mr-2 h-4 w-4" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {document.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* AI Insights */}
          {document.ai_metadata && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Sparkles className="mr-2 h-4 w-4 text-green-600" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {document.ai_metadata.key_topics && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Key Topics</p>
                    <div className="flex flex-wrap gap-1">
                      {document.ai_metadata.key_topics.map((topic, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {document.ai_metadata.sentiment && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Sentiment</p>
                    <Badge variant="outline">{document.ai_metadata.sentiment}</Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}