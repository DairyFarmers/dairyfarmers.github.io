import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import { queryClient } from '@/lib/queryClient';

export function useSupplier() {
  const {
    data = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      try {
        const response = await api.get('/api/v1/suppliers/');
        return response || [];
      } catch (error) {
        console.error('Suppliers Error:', {
          message: error?.response?.data?.message || error.message,
          status: error?.response?.status
        });
        throw error;
      }
    }
  });

  const addSupplier = useMutation({
    mutationFn: async (newSupplier) => {
      const response = await api.post('/api/v1/suppliers/', newSupplier);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['suppliers']);
    }
  });

  const updateSupplier = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await api.patch(`/api/v1/suppliers/${id}/`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['suppliers']);
    }
  });

  const deleteSupplier = useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/api/v1/suppliers/${id}/`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['suppliers']);
    }
  });

  // Calculate stats
  const suppliers = data || [];
  const totalSuppliers = suppliers.length;
  const averageRating = suppliers.reduce((sum, supplier) => 
    sum + (supplier.rating || 0), 0) / (totalSuppliers || 1);
  const topRatedSuppliers = suppliers.filter(s => (s.rating || 0) >= 4.0);

  return {
    suppliers,
    isLoading,
    error,
    refetch,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    stats: {
      total: totalSuppliers,
      averageRating: averageRating.toFixed(2),
      topRated: topRatedSuppliers.length
    }
  };
}