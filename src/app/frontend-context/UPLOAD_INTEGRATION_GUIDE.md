# Document Upload Integration Guide

## Overview

This guide maps the backend's document upload capabilities to our frontend implementation, highlighting what needs to be updated based on the comprehensive backend API context.

## Current Backend Capabilities

### 1. Supported File Formats
```typescript
// Backend supports these formats with immediate text extraction:
const SUPPORTED_FORMATS = {
  // Documents
  'PDF': { mime: 'application/pdf', extraction: 'pdfium' },
  'DOCX': { mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', extraction: 'xml-parser' },
  'DOC': { mime: 'application/msword', extraction: 'planned' },
  'TXT': { mime: 'text/plain', extraction: 'direct' },
  'RTF': { mime: 'application/rtf', extraction: 'planned' },
  'ODT': { mime: 'application/vnd.oasis.opendocument.text', extraction: 'planned' },
  
  // Data
  'CSV': { mime: 'text/csv', extraction: 'csv-parser' },
  'XLSX': { mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', extraction: 'xlsx-parser' },
  'XLS': { mime: 'application/vnd.ms-excel', extraction: 'planned' },
  'JSON': { mime: 'application/json', extraction: 'direct' },
  'XML': { mime: 'application/xml', extraction: 'direct' },
  
  // Images (OCR via Claude Vision)
  'PNG': { mime: 'image/png', extraction: 'claude-vision' },
  'JPG': { mime: 'image/jpeg', extraction: 'claude-vision' },
  'GIF': { mime: 'image/gif', extraction: 'claude-vision' },
  'BMP': { mime: 'image/bmp', extraction: 'claude-vision' },
  'WEBP': { mime: 'image/webp', extraction: 'claude-vision' },
  'TIFF': { mime: 'image/tiff', extraction: 'claude-vision' },
  
  // HTML
  'HTML': { mime: 'text/html', extraction: 'html-parser' },
  
  // Presentations (planned)
  'PPTX': { mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', extraction: 'planned' },
  'PPT': { mime: 'application/vnd.ms-powerpoint', extraction: 'planned' },
}
```

### 2. Processing Pipeline
```
1. Upload → Immediate text extraction during upload
2. Text normalization → Clean text for AI processing
3. AI Processing Queue → Background jobs for:
   - Summarization
   - Entity extraction  
   - Document classification
   - Tag generation
4. Result Storage → AI results stored in document fields
```

## Required Frontend Updates

### 1. Update Type Definitions

The backend returns a much richer document structure than our current types:

```typescript
// src/types/index.ts - Update Document interface
export interface Document {
  // Existing fields...
  
  // Add new backend fields:
  file_name: string;
  original_name: string;
  storage_path: string;
  content_hash: string;
  
  // Text extraction details
  text_extraction_status: 'pending' | 'completed' | 'failed';
  text_extraction_error?: string;
  text_extraction_method?: string;
  text_quality?: number;
  text_language?: string;
  text_word_count: number;
  text_char_count: number;
  text_extraction_time_ms: number;
  text_extracted_at?: string;
  
  // Enhanced AI fields
  ai_key_points?: Record<string, any>;
  ai_entities?: Record<string, any>;
  ai_categories?: string[];
  
  // Financial data
  amount?: number;
  currency?: string;
  tax_amount?: number;
  vendor_name?: string;
  customer_name?: string;
  document_date?: string;
  due_date?: string;
  
  // Compliance
  compliance_status: 'compliant' | 'non_compliant' | 'pending' | 'exempt';
  retention_date?: string;
  legal_hold: boolean;
  
  // Additional metadata
  version: number;
  language: string;
  document_number?: string;
  reference_number?: string;
  permissions: DocumentPermissions;
}

export interface DocumentPermissions {
  read: boolean;
  update: boolean;
  delete: boolean;
  share: boolean;
}
```

### 2. Enhanced Upload Options

The backend accepts more upload parameters:

```typescript
// src/types/index.ts - Update UploadOptions
export interface UploadOptions {
  title?: string;
  description?: string;
  enable_ai?: boolean;
  enable_ocr?: boolean;
  folder_id?: string;
  tags?: string[];
  
  // Add new options:
  categories?: string[];
  document_type?: DocumentType;
  skip_duplicate_check?: boolean;
  
  // Financial fields
  amount?: number;
  currency?: string;
  tax_amount?: number;
  vendor_name?: string;
  customer_name?: string;
  document_date?: string;
  due_date?: string;
}
```

### 3. Update API Client

Update the upload method to handle all new fields:

```typescript
// src/lib/api/client.ts
async uploadDocument(
  file: File, 
  options: UploadOptions = {},
  onProgress?: (progress: number) => void,
  signal?: AbortSignal
): Promise<Document> {
  const formData = new FormData();
  formData.append('file', file);
  
  // Existing fields
  formData.append('title', options.title || file.name);
  formData.append('enable_ai', String(options.enable_ai ?? true));
  formData.append('enable_ocr', String(options.enable_ocr ?? false));
  
  // Add all new optional fields
  if (options.description) formData.append('description', options.description);
  if (options.document_type) formData.append('document_type', options.document_type);
  if (options.skip_duplicate_check) formData.append('skip_duplicate_check', 'true');
  
  // Financial fields
  if (options.amount !== undefined) formData.append('amount', String(options.amount));
  if (options.currency) formData.append('currency', options.currency);
  if (options.tax_amount !== undefined) formData.append('tax_amount', String(options.tax_amount));
  if (options.vendor_name) formData.append('vendor_name', options.vendor_name);
  if (options.customer_name) formData.append('customer_name', options.customer_name);
  if (options.document_date) formData.append('document_date', options.document_date);
  if (options.due_date) formData.append('due_date', options.due_date);
  
  // Arrays
  if (options.folder_id) formData.append('folder_id', options.folder_id);
  if (options.tags?.length) formData.append('tags', options.tags.join(','));
  if (options.categories?.length) formData.append('categories', options.categories.join(','));

  // ... rest of implementation
}
```

### 4. Add Processing Status Endpoint

```typescript
// src/lib/api/client.ts
async getProcessingStatus(documentId: string): Promise<ProcessingStatusResponse> {
  return this.get<ProcessingStatusResponse>(`/api/v1/documents/${documentId}/processing-status`);
}

async getBatchProcessingStatus(documentIds: string[]): Promise<BatchStatusResponse> {
  return this.post<BatchStatusResponse>('/api/v1/documents/batch-status', {
    document_ids: documentIds
  });
}
```

### 5. Update Processing Status Component

Our `DocumentProcessingStatus` component should use the actual API:

```typescript
// src/components/documents/document-processing-status.tsx
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'

export function DocumentProcessingStatus({ 
  document, 
  onComplete,
  className 
}: DocumentProcessingStatusProps) {
  // Poll the actual processing status endpoint
  const { data: processingStatus } = useQuery({
    queryKey: ['processing-status', document.id],
    queryFn: () => apiClient.getProcessingStatus(document.id),
    enabled: document.text_extraction_status !== 'completed' || 
             document.ai_processing_status !== 'completed',
    refetchInterval: 2000, // Poll every 2 seconds
    onSuccess: (data) => {
      if (data.processing_steps.text_extraction.status === 'completed' &&
          data.processing_steps.ai_analysis.status === 'completed') {
        onComplete?.()
      }
    }
  })

  // Use actual API data for rendering
  const stages = processingStatus ? [
    {
      id: 'text_extraction',
      label: 'Text Extraction',
      status: processingStatus.processing_steps.text_extraction.status,
      message: `${processingStatus.processing_steps.text_extraction.word_count} words extracted`,
    },
    {
      id: 'ai_analysis',
      label: 'AI Analysis',
      status: processingStatus.processing_steps.ai_analysis.status,
      message: processingStatus.processing_steps.ai_analysis.summary_generated 
        ? 'Summary generated' 
        : 'Processing...',
    }
  ] : []

  // ... rest of component
}
```

### 6. Enhanced Upload Form

Add support for financial and metadata fields:

```tsx
// src/components/documents/upload/enhanced-upload-form.tsx
export function EnhancedUploadForm({ onUpload }: { onUpload: (file: File, options: UploadOptions) => void }) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [options, setOptions] = useState<UploadOptions>({
    enable_ai: true,
    enable_ocr: true,
  })

  return (
    <form>
      {/* Basic fields */}
      <Input
        label="Title"
        value={options.title}
        onChange={(e) => setOptions({ ...options, title: e.target.value })}
      />
      
      <Textarea
        label="Description"
        value={options.description}
        onChange={(e) => setOptions({ ...options, description: e.target.value })}
      />

      <Select
        label="Document Type"
        value={options.document_type}
        onChange={(value) => setOptions({ ...options, document_type: value as DocumentType })}
      >
        <option value="invoice">Invoice</option>
        <option value="receipt">Receipt</option>
        <option value="contract">Contract</option>
        {/* ... more types */}
      </Select>

      {/* Advanced fields toggle */}
      <Button onClick={() => setShowAdvanced(!showAdvanced)}>
        {showAdvanced ? 'Hide' : 'Show'} Advanced Options
      </Button>

      {showAdvanced && (
        <>
          {/* Financial fields for invoices/receipts */}
          {(options.document_type === 'invoice' || options.document_type === 'receipt') && (
            <>
              <Input
                label="Amount"
                type="number"
                value={options.amount}
                onChange={(e) => setOptions({ ...options, amount: parseFloat(e.target.value) })}
              />
              
              <Input
                label="Vendor Name"
                value={options.vendor_name}
                onChange={(e) => setOptions({ ...options, vendor_name: e.target.value })}
              />
              
              <DatePicker
                label="Document Date"
                value={options.document_date}
                onChange={(date) => setOptions({ ...options, document_date: date })}
              />
            </>
          )}
        </>
      )}
    </form>
  )
}
```

### 7. Update Document List Display

Show the rich processing information:

```tsx
// src/components/documents/list/document-list-item.tsx
function DocumentListItem({ document }: { document: Document }) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <h3>{document.title}</h3>
          <p className="text-sm text-gray-600">
            {document.text_word_count} words • 
            {document.text_language} • 
            {document.text_quality && `Quality: ${(document.text_quality * 100).toFixed(0)}%`}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Text extraction status */}
          {document.text_extraction_status === 'completed' ? (
            <Badge variant="success">Text Extracted</Badge>
          ) : document.text_extraction_status === 'failed' ? (
            <Badge variant="error">Extraction Failed</Badge>
          ) : (
            <Badge variant="secondary">Extracting...</Badge>
          )}
          
          {/* AI processing status */}
          {document.ai_processed && (
            <Badge variant="purple">
              AI Score: {(document.ai_confidence_score * 100).toFixed(0)}%
            </Badge>
          )}
        </div>
      </div>
      
      {/* Show AI summary if available */}
      {document.ai_summary && (
        <p className="mt-2 text-sm text-gray-700 line-clamp-2">
          {document.ai_summary}
        </p>
      )}
    </Card>
  )
}
```

## Testing the Integration

### 1. Test File Upload with Processing
```typescript
it('should upload and track processing status', async () => {
  const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' })
  
  // Upload
  const document = await apiClient.uploadDocument(file, {
    enable_ai: true,
    document_type: 'invoice',
    amount: 150.00,
    vendor_name: 'Test Vendor'
  })
  
  expect(document.text_extraction_status).toBe('pending')
  
  // Poll for status
  let status
  do {
    await new Promise(resolve => setTimeout(resolve, 2000))
    status = await apiClient.getProcessingStatus(document.id)
  } while (status.processing_steps.ai_analysis.status !== 'completed')
  
  // Verify AI results
  const updatedDoc = await apiClient.getDocument(document.id)
  expect(updatedDoc.ai_summary).toBeDefined()
  expect(updatedDoc.ai_entities).toBeDefined()
})
```

### 2. Test Batch Processing Status
```typescript
it('should check multiple document statuses', async () => {
  const documentIds = ['doc-1', 'doc-2', 'doc-3']
  
  const batchStatus = await apiClient.getBatchProcessingStatus(documentIds)
  
  expect(Object.keys(batchStatus.statuses)).toHaveLength(3)
  
  Object.values(batchStatus.statuses).forEach(status => {
    if ('error' in status) {
      expect(status.error).toBeDefined()
    } else {
      expect(status.processing_steps).toBeDefined()
    }
  })
})
```

## Error Handling

### 1. Handle Processing Errors
```typescript
// Show specific error messages based on extraction failure
if (document.text_extraction_status === 'failed') {
  if (document.text_extraction_error?.includes('unsupported')) {
    toast.error('This file format is not yet supported for text extraction')
  } else {
    toast.error(`Text extraction failed: ${document.text_extraction_error}`)
  }
}
```

### 2. Handle Quota Errors
```typescript
// Backend returns 402 for quota exceeded
if (error.response?.status === 402) {
  const details = error.response.data.details
  toast.error(`Document limit reached: ${details.used}/${details.limit}`)
  // Show upgrade prompt
}
```

## Performance Optimizations

### 1. Batch Status Checks
```typescript
// Instead of polling each document individually
const documentsToCheck = uploadedDocuments.filter(d => 
  d.text_extraction_status !== 'completed' || !d.ai_processed
)

if (documentsToCheck.length > 0) {
  const batchStatus = await apiClient.getBatchProcessingStatus(
    documentsToCheck.map(d => d.id)
  )
  // Update local state with batch results
}
```

### 2. Smart Polling
```typescript
// Adjust polling frequency based on processing stage
const getPollingInterval = (status: ProcessingStatusResponse) => {
  if (status.processing_steps.text_extraction.status === 'pending') {
    return 1000 // 1 second for text extraction
  }
  if (status.processing_steps.ai_analysis.status === 'processing') {
    return 3000 // 3 seconds for AI processing
  }
  return 5000 // 5 seconds for completed/failed
}
```

## Next Steps

1. **Update all type definitions** to match backend response
2. **Add processing status polling** to upload flow
3. **Implement enhanced upload form** with metadata fields
4. **Add batch status checking** for document lists
5. **Update UI components** to show rich processing information
6. **Add comprehensive error handling** for all failure modes
7. **Implement smart polling** for better performance

This integration will provide users with real-time feedback on document processing and leverage all the backend's AI capabilities.