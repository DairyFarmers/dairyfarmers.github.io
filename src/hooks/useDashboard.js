import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

export function useDashboard(timeRange = 'week') {
  return useQuery({
    queryKey: ['dashboard', 'summary', timeRange],
    queryFn: async () => {
      try {
        const response = await api.get('/api/v1/dashboard/summary/', {
          params: { time_range: timeRange }
        });
        
        if (!response?.data) {
          throw new Error('No data received from server');
        }
        
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch dashboard data');
      }
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2
  });
}