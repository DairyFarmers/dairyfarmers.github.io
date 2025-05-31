import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { toast } from 'sonner';

export function useUsers() {
  const queryClient = useQueryClient();

  // Fetch users
  const { 
    data: users = [], 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.get('/api/v1/users/list');
      console.log('Fetched users:', response);
      return response;
    }
  });

  // Fetch roles
  const { data: roles = [] } = useQuery({
    queryKey: ['user-roles'],
    queryFn: async () => {
      const response = await api.get('/api/v1/users/roles/');
      console.log('Fetched roles:', response);
      return response;
    }
  });

  // Add user mutation
  const addUser = useMutation({
    mutationFn: async (userData) => {
      const response = await api.post('/api/v1/users/registration', userData);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User added successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to add user');
    }
  });

  // Update user mutation
  const updateUser = useMutation({
    mutationFn: async ({ userId, data }) => {
      const response = await api.patch(`/api/v1/users/detail/${userId}`, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User updated successfully');
    }
  });

  // Delete user mutation
  const deleteUser = useMutation({
    mutationFn: async (userId) => {
      await api.delete(`/api/v1/users/detail/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User deleted successfully');
    }
  });

  // Calculate stats
  const stats = {
    total: users.length || 0,
    active: users.filter(user => user.is_active).length || 0,
    inactive: users.filter(user => !user.is_active).length || 0
  };

  return {
    users,
    roles,
    isLoading,
    error,
    refetch,
    stats,
    addUser,
    updateUser,
    deleteUser
  };
}