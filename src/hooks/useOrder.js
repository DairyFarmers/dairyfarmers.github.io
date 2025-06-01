import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import { queryClient } from '@/lib/queryClient';

export function useOrder({ page = 1, pageSize = 10 } = {}) {
  // Fetch orders with pagination
  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['orders', { page, pageSize }],
    queryFn: async () => {
      try {
        const response = await api.get('/api/v1/orders/');
        return response; // Return response.data instead of response
      } catch (error) {
        console.error('Orders Error:', {
          message: error?.response?.data?.message || error.message,
          status: error?.response?.status
        });
        throw new Error(error?.response?.data?.message || 'Failed to fetch orders');
      }
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 30000, // Consider data stale after 30 seconds
    keepPreviousData: true,
  });

  // Add new order
  const addOrder = useMutation({
    mutationFn: async (newOrder) => {
      try {
        const response = await api.post('/api/v1/orders/', newOrder);
        return response.data;
      } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to create order');
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
        return response.data;
      } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to update order');
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
        throw new Error(error?.response?.data?.message || 'Failed to delete order');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    }
  });

  // Calculate stats from the current page results
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
    orders: {
      results: orders,
      count: totalOrders,
      next: data?.next,
      previous: data?.previous
    },
    isLoading,
    error,
    refetch,
    addOrder,
    updateOrder,
    deleteOrder,
    stats: {
      total: totalOrders,
      pending: pendingOrders.length,
      completed: completedOrders.length,
      totalRevenue
    }
  };
}