import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { toast } from 'sonner';

export function useReports() {
  const queryClient = useQueryClient();

  // Fetch reports
  const { 
    data: reports = [], 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['reports'],
    queryFn: async () => {
      const response = await api.get('/api/v1/reports/list');
      return response;
    }
  });

  // Generate report mutation
  const generateReport = useMutation({
    mutationFn: async (reportData) => {
      const response = await api.post('/api/v1/reports/generate', reportData);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reports']);
      toast.success('Report generated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to generate report');
    }
  });

  // Download report mutation
  const downloadReport = useMutation({
    mutationFn: async (reportId) => {
      const response = await api.get(`/api/v1/reports/${reportId}/download`, {
        responseType: 'blob'
      });
      return response;
    }
  });

  // Delete report mutation
  const deleteReport = useMutation({
    mutationFn: async (reportId) => {
      await api.delete(`/api/v1/reports/${reportId}/delete`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reports']);
      toast.success('Report deleted successfully');
    }
  });

  // Calculate stats
  const stats = {
    total: reports.length || 0,
    today: reports.filter(report => 
      new Date(report.generated_at).toDateString() === new Date().toDateString()
    ).length || 0,
    thisMonth: reports.filter(report => 
      new Date(report.generated_at).getMonth() === new Date().getMonth()
    ).length || 0
  };

  return {
    reports,
    isLoading,
    error,
    refetch,
    stats,
    generateReport,
    downloadReport,
    deleteReport
  };
}