import { apiClient } from './client'

export interface Document {
  id: string
  title: string
  file_name: string
  content_type: string
  file_size: number
  status: string
  document_type?: string
  created_at: string
  updated_at: string
  created_by: string
  workspace_id: string
}

export interface UploadOptions {
  onProgress?: (progress: number) => void
}

export const documentsAPI = {
  /**
   * Upload a document
   */
  async upload(file: File, options?: UploadOptions): Promise<Document> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await apiClient.post('/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (options?.onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          options.onProgress(progress)
        }
      },
    })

    return response
  },

  /**
   * Get a single document
   */
  async getDocument(id: string): Promise<Document> {
    const response = await apiClient.get(`/documents/${id}`)
    return response
  },

  /**
   * List documents
   */
  async listDocuments(params?: {
    page?: number
    page_size?: number
    folder_id?: string
    document_type?: string
    status?: string
  }): Promise<{
    documents: Document[]
    total: number
    page: number
    page_size: number
  }> {
    const response = await apiClient.get('/documents', { params })
    return response
  },

  /**
   * Delete a document
   */
  async deleteDocument(id: string): Promise<void> {
    await apiClient.delete(`/documents/${id}`)
  },

  /**
   * Update document metadata
   */
  async updateDocument(id: string, data: Partial<Document>): Promise<Document> {
    const response = await apiClient.patch(`/documents/${id}`, data)
    return response
  },

  /**
   * Download a document
   */
  async downloadDocument(id: string): Promise<Blob> {
    const response = await apiClient.get(`/documents/${id}/download`, {
      responseType: 'blob'
    })
    return response
  },

  /**
   * Get document processing status
   */
  async getProcessingStatus(id: string): Promise<{
    status: string
    progress: number
    message?: string
  }> {
    const response = await apiClient.get(`/documents/${id}/processing-status`)
    return response
  }
}