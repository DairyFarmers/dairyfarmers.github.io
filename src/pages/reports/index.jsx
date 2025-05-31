import React, { useState } from 'react';
import Sidebar from '@/components/layout/sidebar';
import TopNavbar from '@/components/layout/top-navbar';
import { PermissionGuard } from '@/components/common/PermissionGuard';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  AlertCircle, 
  Plus, 
  Download, 
  Trash2, 
  RefreshCcw, 
  FileText,
  BarChart 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useReports } from '@/hooks/useReports';
import { GenerateReportForm } from '@/components/reports/GenerateReportForm';

export default function Reports() {
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);

  const { 
    reports, 
    isLoading, 
    error, 
    refetch,
    stats,
    generateReport,
    downloadReport,
    deleteReport 
  } = useReports();

  const handleGenerateReport = async (formData) => {
    try {
      await generateReport.mutateAsync(formData);
      setIsGenerateDialogOpen(false);
    } catch (error) {
      console.error('Failed to generate report:', error);
    }
  };

  const handleDownload = async (report) => {
    try {
      const blob = await downloadReport.mutateAsync(report.id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = report.filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download report:', error);
    }
  };

  if (isLoading) {
      return (
        <div className="flex h-screen bg-background">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopNavbar />
            <div className="flex items-center justify-center flex-1">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="flex h-screen bg-background">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopNavbar />
            <div className="p-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error loading reports</AlertTitle>
                <AlertDescription className="flex items-center justify-between">
                  <span>{error.message}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => refetch()}
                    className="ml-4"
                  >
                    <RefreshCcw className="h-4 w-4 mr-2" />
                    Retry
                  </Button>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      );
    }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Reports</h1>
                <p className="text-muted-foreground mt-1">
                  Generate and manage system reports
                </p>
              </div>
              <PermissionGuard permissions="can_generate_reports">
                <Button onClick={() => setIsGenerateDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </PermissionGuard>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Reports</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.today}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">This Month</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.thisMonth}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Report History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Type</TableHead>
                      <TableHead>Generated On</TableHead>
                      <TableHead>Generated By</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="capitalize">{report.report_type}</TableCell>
                        <TableCell>
                          {new Date(report.generated_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{report.generated_by.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {report.format.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={report.status === 'completed' ? 'success' : 'warning'}>
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <PermissionGuard permissions="can_download_reports">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="mr-2 hover:bg-primary/10"
                              onClick={() => handleDownload(report)}
                              disabled={report.status !== 'completed'}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </PermissionGuard>
                          <PermissionGuard permissions="can_delete_reports">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="hover:bg-destructive/10"
                              onClick={() => deleteReport.mutate(report.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </PermissionGuard>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>

        <GenerateReportForm 
          isOpen={isGenerateDialogOpen}
          onClose={() => setIsGenerateDialogOpen(false)}
          onSubmit={handleGenerateReport}
        />
      </div>
    </div>
  );
}