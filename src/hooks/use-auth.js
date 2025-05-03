import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth as useAuthContext } from '@/contexts/AuthContext';
import { queryClient } from '@/lib/queryClient';

export function useAuth() {
  const navigate = useNavigate();
  const auth = useAuthContext();

  // Mutation for logging in
  const loginMutation = useMutation({
    mutationFn: auth.login,
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
      navigate('/');
    },
  });

  // Mutation for logging out
  const logoutMutation = useMutation({
    mutationFn: auth.logout,
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
      navigate('/login');
    },
  });

  return {
    user: auth.user,
    isLoading: auth.loading,
    loginMutation,
    logoutMutation,
    isAuthenticated: auth.isAuthenticated,
    refreshAuth: auth.refreshAuth,
  };
} 