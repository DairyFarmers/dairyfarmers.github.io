import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import { queryClient } from '@/lib/queryClient';

export function useInventory() {
  const {
    data = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['inventory', 'items'],
    queryFn: async () => {
      try {
        const response = await api.get('/api/v1/inventory/items/');
        return response || [];
      } catch (error) {
        console.error('Inventory Error:', {
          message: error?.response?.data?.message || error.message,
          status: error?.response?.status
        });
        throw error;
      }
    }
  });

  const addItem = useMutation({
    mutationFn: async (newItem) => {
      const response = await api.post('/api/v1/inventory/items/', newItem);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['inventory', 'items']);
    }
  });

  const updateItem = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await api.put(`/api/v1/inventory/items/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['inventory', 'items']);
    }
  });

  const deleteItem = useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/api/v1/inventory/items/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['inventory', 'items']);
    }
  });

  const { data: suppliers = [] } = useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      try {
        const response = await api.get('/api/v1/suppliers/');
        return response || [];
      } catch (error) {
        console.error('Suppliers Error:', error);
        return [];
      }
    }
  });

  const inventory = data || [];
  const lowStockItems = inventory.filter(item => item.quantity <= 10 && item.quantity > 0);
  const outOfStockItems = inventory.filter(item => item.quantity === 0);

  return {
    inventory,
    isLoading,
    error,
    refetch,
    addItem,
    updateItem,
    deleteItem,
    stats: {
      total: inventory.length,
      lowStock: lowStockItems.length,
      outOfStock: outOfStockItems.length
    },
    suppliers,
  };
}