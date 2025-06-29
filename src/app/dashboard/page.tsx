'use client';

import { useAuth } from '@/contexts/auth-context';
import { useWorkspaceContext, useDocumentInsights } from '@/hooks/queries/documents.queries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardSkeleton } from '@/components/ui/loading';
import { FullScreenLoading } from '@/components/ui/loading';
import { Brain, Upload, Search, BarChart3, FileText, MessageSquare, Users, HardDrive } from 'lucide-react';

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { data: workspaceContext, isLoading: contextLoading } = useWorkspaceContext();
  const { data: insights, isLoading: insightsLoading } = useDocumentInsights();

  // Show loading while auth is being checked
  if (authLoading) {
    return <FullScreenLoading />;
  }

  const isLoading = contextLoading || insightsLoading;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Archivus Dashboard</h1>
              <p className="text-gray-600">
                Welcome back, {user?.first_name}! Here's your document workspace overview.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
              <Button variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Workspace Context */}
        {workspaceContext && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                AI Workspace Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                {workspaceContext.recent_activity || "Your AI-powered workspace is ready for document analysis and intelligent chat."}
              </p>
              {workspaceContext.recommendations?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">AI Recommendations:</h4>
                  {workspaceContext.recommendations.slice(0, 3).map((rec, index) => (
                    <div key={index} className="text-sm p-3 bg-white rounded border">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                          rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {rec.priority} priority
                        </span>
                        <strong>{rec.type}:</strong>
                      </div>
                      <p className="mt-1 text-gray-600">{rec.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button className="h-20 flex-col gap-2 bg-blue-600 hover:bg-blue-700">
            <Upload className="h-6 w-6" />
            Upload Document
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2">
            <Brain className="h-6 w-6" />
            AI Analysis
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2">
            <Search className="h-6 w-6" />
            Smart Search
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2">
            <BarChart3 className="h-6 w-6" />
            Analytics
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {insights?.total_documents || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                {insights?.recent_uploads || 0} uploaded recently
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Processed</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {insights?.processing_status?.completed || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                {insights?.processing_status?.pending || 0} pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chat Sessions</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                3 active conversations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
              <HardDrive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4 GB</div>
              <p className="text-xs text-muted-foreground">
                of 10 GB limit
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Feature Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
              <CardDescription>
                Your latest uploads and AI analysis results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Document {i}.pdf</h4>
                      <p className="text-xs text-gray-500">
                        AI processed • 2 hours ago
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Documents
              </Button>
            </CardContent>
          </Card>

          {/* AI Features */}
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Features</CardTitle>
              <CardDescription>
                Unlock the full power of intelligent document management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Document Analysis</h4>
                    <p className="text-xs text-gray-500">
                      Automatic extraction, classification, and summarization
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Chat with Documents</h4>
                    <p className="text-xs text-gray-500">
                      Ask questions and get insights using Claude AI
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Search className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Hybrid Search</h4>
                    <p className="text-xs text-gray-500">
                      Semantic search with AI field analysis
                    </p>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4">
                Explore AI Features
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 