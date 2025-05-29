import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser, verifyToken } from '@/redux/slices/userSlice';
import { queryClient } from '@/lib/queryClient';

export function useAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.user.loading);
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);

  const loginMutation = useMutation({
    mutationFn: (credentials) => dispatch(loginUser(credentials)).unwrap(),
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
      navigate('/');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => dispatch(logoutUser()).unwrap(),
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
      navigate('/login');
    },
  });

  return {
    user,
    isLoading,
    loginMutation,
    logoutMutation,
    isAuthenticated,
    refreshAuth: () => dispatch(verifyToken()),
  };
}