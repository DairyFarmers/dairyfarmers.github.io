import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import { queryClient } from '@/lib/queryClient';

export function useNotifications({ 
  currentPage = 1, 
  pageSize = 10, 
  fetchAll = false 
} = {}) {
  // Main notifications query
  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['notifications', fetchAll ? 'all' : { currentPage, pageSize }],
    queryFn: async () => {
      try {
        const response = await api.get('/api/v1/notifications/', {
          params: {
            ...(fetchAll ? { all: true } : { page: currentPage, page_size: pageSize })
          }
        });

        console.log('Notifications response:', response);

        if (!response?.status) {
          throw new Error(response?.data?.message || 'Invalid response from server');
        }

        return response.data;
      } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to fetch notifications');
      }
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 30000,
    keepPreviousData: true,
  });

  // Mark as read mutation
  const markAsRead = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await api.patch(`/api/v1/notifications/${id}/read/`);
        
        if (!response?.status) {
          throw new Error('Failed to mark as read');
        }

        return response.data;
      } catch (error) {
        throw new Error('Failed to mark as read');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
    }
  });

  // Delete notification mutation
  const deleteNotification = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await api.delete(`/api/v1/notifications/${id}/`);
        if (!response?.data?.status) {
          throw new Error('Failed to delete notification');
        }
        return id;
      } catch (error) {
        throw new Error('Failed to delete notification');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
    }
  });

  // Mark all as read mutation
  const markAllAsRead = useMutation({
    mutationFn: async () => {
      try {
        const response = await api.post('/api/v1/notifications/mark-all/');
        
        if (!response?.data?.status) {
          throw new Error('Failed to mark all as read');
        }

        return response.data;
      } catch (error) {
        throw new Error('Failed to mark all as read');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
    }
  });

  const notifications = data?.results || [];
  const stats = {
    total: fetchAll ? notifications.length : data?.count || 0,
    unread: notifications.filter(n => !n.read).length,
    read: notifications.filter(n => n.read).length,
    urgent: notifications.filter(n => n.priority === 'urgent').length
  };

  return {
    notifications: fetchAll ? {
      results: notifications,
      count: notifications.length
    } : {
      results: notifications,
      count: data?.count || 0,
      num_pages: data?.num_pages || 1,
      next: data?.next,
      previous: data?.previous
    },
    stats: {
        total: stats.total,
        unread: stats.unread,
        read: stats.read,
        urgent: stats.urgent
    },
    isLoading,
    error,
    refetch,
    markAsRead,
    deleteNotification,
    markAllAsRead
  };
}