import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import { queryClient } from '@/lib/queryClient';

export function useSales() {
  // Fetch sales data
  const {
    data = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['sales'],
    queryFn: async () => {
      try {
        const response = await api.get('/sales/');
        return response.data.data || [];
      } catch (error) {
        console.error('Sales Error:', {
          message: error?.response?.data?.message || error.message,
          status: error?.response?.status
        });
        throw error;
      }
    }
  });

  // Add new sale
  const addSale = useMutation({
    mutationFn: async (newSale) => {
      const response = await api.post('/sales/', newSale);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['sales']);
    }
  });

  // Update sale
  const updateSale = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await api.patch(`/sales/${id}/`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['sales']);
    }
  });

  // Delete sale
  const deleteSale = useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/sales/${id}/`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['sales']);
    }
  });

  // Computed stats
  const sales = data || [];
  const totalSales = sales.reduce((sum, sale) => sum + sale.total_amount, 0);
  const pendingPayments = sales.filter(sale => sale.status === 'pending');
  const completedSales = sales.filter(sale => sale.status === 'completed');

  return {
    sales,
    isLoading,
    error,
    refetch,
    addSale,
    updateSale,
    deleteSale,
    stats: {
      total: sales.length,
      totalAmount: totalSales,
      pending: pendingPayments.length,
      completed: completedSales.length
    }
  };
}