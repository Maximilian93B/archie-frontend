'use client';

import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Brain, Upload, Search, BarChart3, FileText, MessageSquare, HardDrive, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { WorkspaceIntelligence } from '@/components/dashboard/workspace-intelligence';

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const stats = [
    {
      name: 'Total Documents',
      value: '0',
      icon: FileText,
      description: 'documents in your library',
    },
    {
      name: 'Storage Used',
      value: '0 GB',
      icon: HardDrive,
      description: 'of 10 GB',
    },
    {
      name: 'AI Analyses',
      value: '0',
      icon: Sparkles,
      description: 'documents processed',
    },
    {
      name: 'Chat Sessions',
      value: '0',
      icon: MessageSquare,
      description: 'active conversations',
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.first_name}!
        </h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/search">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/dashboard/upload">
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.name}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Workspace Intelligence */}
      <WorkspaceIntelligence />

      {/* Quick Actions and Recent Documents */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>
              Your most recently uploaded documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No documents yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by uploading your first document.
              </p>
              <div className="mt-6">
                <Button size="sm" asChild>
                  <Link href="/dashboard/upload">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Document
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and workflows
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/dashboard/upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload New Document
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/dashboard/documents">
                <FileText className="mr-2 h-4 w-4" />
                Browse Documents
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/dashboard/chat">
                <MessageSquare className="mr-2 h-4 w-4" />
                Start AI Chat
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/dashboard/analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* AI Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI-Powered Features
          </CardTitle>
          <CardDescription>
            Unlock the full power of intelligent document management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Brain className="h-4 w-4 text-purple-600" />
                </div>
                <h4 className="font-medium">Document Analysis</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Automatic extraction, classification, and summarization
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-green-600" />
                </div>
                <h4 className="font-medium">Chat with Documents</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Ask questions and get insights using Claude AI
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Brain className="h-4 w-4 text-orange-600" />
                </div>
                <h4 className="font-medium">Hybrid Search</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Semantic search with AI field analysis
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}