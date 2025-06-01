import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import { queryClient } from '@/lib/queryClient';

export function useOrder({ currentPage = 1, pageSize = 10 } = {}) {
  // Fetch orders with pagination
  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['orders', { currentPage, pageSize }],
    queryFn: async () => {
      try {
        const response = await api.get('/api/v1/orders/', {
          params: {
            page: currentPage,
            size: pageSize
          }
        });

        if (!response?.status) {
          throw new Error('Invalid response from server');
        }

        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch orders');
      }
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 30000,
    keepPreviousData: true,
  });

  // Add new order
  const addOrder = useMutation({
    mutationFn: async (newOrder) => {
      try {
        const response = await api.post('/api/v1/orders/', newOrder);
        
        if (!response?.status) {
          throw new Error('Invalid response from server');
        }

        return response.data;
      } catch (error) {
        throw new Error('Failed to create order');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    }
  });

  // Update order
  const updateOrder = useMutation({
    mutationFn: async ({ id, data: updateData }) => {
      try {
        const response = await api.put(`/api/v1/orders/${id}/`, updateData);
        
        if (!response?.status) {
          throw new Error('Invalid response from server');
        }
        
        return response.data;
      } catch (error) {
        throw new Error('Failed to update order');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    }
  });

  // Delete order
  const deleteOrder = useMutation({
    mutationFn: async (id) => {
      try {
        await api.delete(`/api/v1/orders/${id}/`);
        return id;
      } catch (error) {
        throw new Error('Failed to delete order');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    }
  });

  const orders = data?.results || [];
  const totalOrders = data?.count || 0;
  const pendingOrders = orders.filter(order => 
    ['draft', 'pending', 'confirmed'].includes(order.status)
  );
  const completedOrders = orders.filter(order => 
    order.status === 'delivered'
  );
  const totalRevenue = orders.reduce((sum, order) => 
    sum + (Number(order.total_amount) || 0), 0
  );

  return {
    orders: data?.orders || {
      results: [],
      count: 0,
      num_pages: 1,
      next: null,
      previous: null
    },
    stats: data?.stats || {
      pending: 0,
      completed: 0,
      totalRevenue: 0
    },
    isLoading,
    error,
    refetch,
    addOrder,
    updateOrder,
    deleteOrder
  };
}