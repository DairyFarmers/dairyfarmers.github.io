import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import { queryClient } from '@/lib/queryClient';
import { toast } from 'sonner';

export function useUsers({
  currentPage = 1,
  pageSize = 10,
  fetchAll = false
}) {
  // Fetch users
  const { 
    data: users = [], 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['users', fetchAll ? 'all' : { currentPage, pageSize }],
    queryFn: async () => {
      const response = await api.get('/api/v1/users/list', {
        ...(fetchAll ? { all: true } : { page: currentPage, size: pageSize })
      });
      
      if (!response?.status) {
        throw new Error('Failed to fetch users');
      }
      
      return response.data;
    }
  });

  // Fetch roles
  const { data: roles = [] } = useQuery({
    queryKey: ['user-roles'],
    queryFn: async () => {
      const response = await api.get('/api/v1/users/roles/');

      if (!response?.status) {
        throw new Error('Failed to fetch user roles');
      }

      return response.data;
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
    mutationFn: async (id) => {
      await api.delete(`/api/v1/users/detail/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User deleted successfully');
    }
  });

  console.log('user roles', roles);
  console.log('users data', users);

  const stats = {
    total: users.results?.length || 0,
    active: users.results?.filter(user => user.is_active).length || 0,
    inactive: users.results?.filter(user => !user.is_active).length || 0
  };

  return {
    users: fetchAll ? {
      results: users?.results || [],
      count: users.count || 0,
    } : {
      results: users?.results || [],
      count: users?.count || 0,
      num_pages: users?.num_pages || 1,
      next: users?.next,
      previous: users?.previous
    },
    roles: {
      results: roles?.results || [],
      count: roles?.count || 0
    },
    isLoading,
    error,
    refetch,
    stats,
    addUser,
    updateUser,
    deleteUser
  };
}