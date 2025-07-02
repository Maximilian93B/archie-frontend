'use client'

import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DocumentUploader } from '@/components/documents/upload/document-uploader'
import Link from 'next/link'

export default function UploadPage() {
  const handleUploadComplete = () => {
    // Optionally navigate to the document detail page
    // router.push(`/dashboard/documents/${documentId}`)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
            >
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h2 className="text-3xl font-bold tracking-tight">
              Upload Documents
            </h2>
          </div>
          <p className="text-muted-foreground mt-2">
            Upload your documents for AI-powered analysis and management
          </p>
        </div>
      </div>

      <div className="max-w-3xl">
        <DocumentUploader />
      </div>

      <div className="max-w-3xl">
        <div className="rounded-lg bg-blue-50 p-4">
          <h3 className="text-sm font-medium text-blue-900">
            AI Processing
          </h3>
          <p className="mt-1 text-sm text-blue-700">
            Documents are automatically processed with AI to extract key information,
            generate summaries, and enable intelligent search. This typically takes
            30-60 seconds depending on document size.
          </p>
        </div>
      </div>
    </div>
  )
}