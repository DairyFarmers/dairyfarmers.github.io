import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import { queryClient } from '@/lib/queryClient';

export function useUsers({ page = 1, pageSize = 10, filters = {} } = {}) {
  // Fetch users with pagination
  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['users', { page, pageSize, ...filters }],
    queryFn: async () => {
      const response = await api.get('/api/v1/users/', {
        params: {
          page,
          page_size: pageSize,
          ...filters
        }
      });
      return response.data;
    }
  });

  // Add user mutation
  const addUser = useMutation({
    mutationFn: async (userData) => {
      const response = await api.post('/api/v1/users/', userData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    }
  });

  // Update user mutation
  const updateUser = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await api.patch(`/api/v1/users/${id}/`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    }
  });

  // Delete user mutation
  const deleteUser = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/api/v1/users/${id}/`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    }
  });

  // Calculate stats
  const users = data?.results || [];
  const totalUsers = data?.count || 0;
  const activeUsers = users.filter(user => user.is_active).length;
  const inactiveUsers = totalUsers - activeUsers;

  return {
    users: data || { results: [], count: 0 },
    isLoading,
    error,
    refetch,
    addUser,
    updateUser,
    deleteUser,
    stats: {
      total: totalUsers,
      active: activeUsers,
      inactive: inactiveUsers
    }
  };
}