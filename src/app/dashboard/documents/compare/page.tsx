'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DocumentComparisonInterface } from '@/components/multi-document/document-comparison-interface'
import { DocumentSelector } from '@/components/multi-document/document-selector'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  ArrowLeft, 
  Brain, 
  FileText, 
  MessageCircle,
  Lightbulb 
} from 'lucide-react'
import type { EnhancedDocument } from '@/lib/api/enhanced-documents'

export default function DocumentComparePage() {
  const router = useRouter()
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [selectedDocumentObjects, setSelectedDocumentObjects] = useState<EnhancedDocument[]>([])
  const [showSelector, setShowSelector] = useState(true)

  const handleDocumentToggle = (documentId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(documentId) 
        ? prev.filter(id => id !== documentId)
        : [...prev, documentId]
    )
  }

  const handleDocumentsChange = (documents: EnhancedDocument[]) => {
    setSelectedDocumentObjects(documents)
  }

  const handleStartComparison = () => {
    if (selectedDocuments.length >= 2) {
      setShowSelector(false)
    }
  }

  const handleDocumentChat = (documents: EnhancedDocument[]) => {
    // Navigate to chat with selected documents
    const documentIds = documents.map(doc => doc.id).join(',')
    router.push(`/dashboard/chat?documents=${documentIds}`)
  }

  const handleDocumentSelect = (document: EnhancedDocument) => {
    // Navigate to document detail view
    router.push(`/dashboard/documents/${document.id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard/documents')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Documents
              </Button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                  <Brain className="h-6 w-6 text-purple-600" />
                  Document Comparison
                </h1>
                <p className="text-gray-600 mt-1">
                  Compare multiple documents using AI analysis to find similarities, differences, and relationships
                </p>
              </div>
            </div>

            {!showSelector && selectedDocuments.length >= 2 && (
              <Button
                variant="outline"
                onClick={() => setShowSelector(true)}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Change Selection
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {showSelector ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Document Selector */}
            <div className="lg:col-span-2">
              <DocumentSelector
                selectedDocuments={selectedDocuments}
                onDocumentToggle={handleDocumentToggle}
                onDocumentsChange={handleDocumentsChange}
                maxDocuments={10}
              />
            </div>

            {/* Selection Summary & Actions */}
            <div className="space-y-6">
              {/* Selection Summary */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Selected Documents ({selectedDocuments.length})
                  </h3>
                  
                  {selectedDocuments.length === 0 ? (
                    <p className="text-sm text-gray-600">
                      Select at least 2 documents to start comparison
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {selectedDocumentObjects.map((doc) => (
                        <div key={doc.id} className="text-sm">
                          <div className="font-medium text-gray-900 truncate">
                            {doc.title || doc.file_name}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {doc.document_type} • {doc.file_size && `${Math.round(doc.file_size / 1024)} KB`}
                          </div>
                        </div>
                      ))}
                      
                      <div className="pt-3 border-t space-y-2">
                        <Button
                          onClick={handleStartComparison}
                          disabled={selectedDocuments.length < 2}
                          className="w-full"
                        >
                          <Brain className="h-4 w-4 mr-2" />
                          Start AI Comparison
                        </Button>
                        
                        {selectedDocuments.length > 0 && (
                          <Button
                            variant="outline"
                            onClick={() => handleDocumentChat(selectedDocumentObjects)}
                            className="w-full"
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Chat with Selected
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Tips */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                    Tips for Better Comparison
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 shrink-0" />
                      <span>Select documents of similar types for more meaningful comparisons</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 shrink-0" />
                      <span>Use "Custom Query" to focus on specific aspects</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 shrink-0" />
                      <span>AI-processed documents provide richer analysis</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 shrink-0" />
                      <span>Compare 2-5 documents for optimal results</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-gray-900 mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push('/dashboard/documents/upload')}
                      className="w-full justify-start"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Upload More Documents
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push('/dashboard/chat')}
                      className="w-full justify-start"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Start New Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Comparison Interface */
          <DocumentComparisonInterface
            initialDocuments={selectedDocumentObjects}
            onDocumentSelect={handleDocumentSelect}
            onDocumentChat={handleDocumentChat}
          />
        )}
      </div>
    </div>
  )
}