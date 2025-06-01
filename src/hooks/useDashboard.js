import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

export function useDashboard(timeRange = 'week') {
  return useQuery({
    queryKey: ['dashboard', 'summary', timeRange],
    queryFn: async () => {
      try {
        const response = await api.get('/api/v1/dashboard/summary', {
          params: { time_range: timeRange },
          withCredentials: true
        });
    
        if (!response?.status){
          throw new Error('Invalid response from server');
        }

        return response?.data || {};
      } catch (error) {
        throw new Error('Failed to fetch dashboard data');
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    retry: 1,
    retryDelay: 1000
  });
}