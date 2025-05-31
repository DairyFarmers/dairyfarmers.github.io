import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import { queryClient } from '@/lib/queryClient';

export function useSales({ page = 1, pageSize = 10, filters = {} } = {}) {
  // Fetch sales with pagination
  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['sales', { page, pageSize, ...filters }],
    queryFn: async () => {
      try {
        const response = await api.get('/api/v1/sales/');
        return {
          results: response.results || [],
          count: response.count,
          next: response.next,
          previous: response.previous
        };
      } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to fetch sales');
      }
    },
    keepPreviousData: true
  });

  // Create sale from order
  const addSale = useMutation({
    mutationFn: async (saleData) => {
      const response = await api.post('/api/v1/sales/', {saleData});
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['sales']);
    }
  });

  // Update sale
  const updateSale = useMutation({
    mutationFn: async ({ id, data: updateData }) => {
      const response = await api.patch(`/api/v1/sales/${id}/`, updateData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['sales']);
    }
  });

  // Delete sale
  const deleteSale = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/api/v1/sales/${id}/`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['sales']);
    }
  });

  // Calculate stats
  const sales = data?.results || [];
  const totalSales = data?.count || 0;
  const pendingPayments = sales.filter(sale => 
    ['pending', 'partial'].includes(sale.payment_status)
  ).length;
  const completedSales = sales.filter(sale => 
    sale.payment_status === 'paid'
  ).length;
  const totalRevenue = sales.reduce((sum, sale) => 
    sum + Number(sale.total_amount), 0
  );

  return {
    sales: data || { results: [], count: 0 },
    isLoading,
    error,
    refetch,
    addSale,
    updateSale,
    deleteSale,
    stats: {
      total: totalSales,
      totalAmount: totalRevenue,
      pending: pendingPayments,
      completed: completedSales
    }
  };
}