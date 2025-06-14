import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import { queryClient } from '@/lib/queryClient';

export function useSupplier({
  currentPage = 1,
  pageSize = 10,
  fetchAll = false
}) {
  const {
    data = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['suppliers', fetchAll ? 'all' : { currentPage, pageSize }],
    queryFn: async () => {
      try {
        const response = await api.get('/api/v1/suppliers/', {
          params: {
            ...(fetchAll ? { all: true } : { page: currentPage, size: pageSize })
          }
        });

        if (!response?.status) {
          throw new Error('Invalid response from server');
        }

        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch suppliers');
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
      const response = await api.put(`/api/v1/suppliers/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['suppliers']);
    }
  });

  const deleteSupplier = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await api.delete(`/api/v1/suppliers/${id}`);
        return response.data;
      } catch (error) {
        throw new Error('Failed to delete supplier');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['suppliers']);
    }
  });

  const suppliers = data?.results || [];
  const totalSuppliers = suppliers.length;
  const averageRating = suppliers.length > 0 
    ? (suppliers
      .filter(supplier => supplier.rating !== null && supplier.rating !== undefined)
      .reduce((sum, supplier) => {
        const rating = parseFloat(supplier.rating);
        return isNaN(rating) ? sum : sum + rating;
      }, 0) / 
      suppliers.filter(supplier => 
        supplier.rating !== null && 
        supplier.rating !== undefined && 
        !isNaN(parseFloat(supplier.rating))
      ).length
    ) || 0
  : 0;
  const topRatedSuppliers = suppliers.filter(s => (s.rating || 0) >= 4.0);

  return {
    suppliers: fetchAll ? {
      results: suppliers,
      count: totalSuppliers
    } : {
      results: suppliers,
      count: data?.count || 0,
      num_pages: data?.num_pages || 1,
      next: data?.next,
      previous: data?.previous
    },
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

export function useSupplierDetails(supplierId) {
  const { 
    data: supplier,
    isLoading,
    error
  } = useQuery({
    queryKey: ['suppliers', 'detail', supplierId],
    queryFn: async () => {
      if (!supplierId) return null;
      const response = await api.get(`/api/v1/suppliers/${supplierId}`);
      console.log('Supplier Details Response:', response);
      return response.data;
    },
    enabled: !!supplierId
  });

  return {
    supplier,
    isLoading,
    error
  };
}