import React, { createContext, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { AUTH_ENDPOINTS } from '@/constants/endpoints';

// Export the context itself
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // Use React Query for auth status
  const { data: authData, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      try {
        const response = await api.get(AUTH_ENDPOINTS.VERIFY_TOKEN);
        if (response.data?.data) {
          return {
            isAuthenticated: true,
            user: response.data.data
          };
        }
        return { isAuthenticated: false, user: null };
      } catch (error) {
        return { isAuthenticated: false, user: null };
      }
    },
    // Refresh auth status when tab becomes visible
    refetchOnWindowFocus: true,
    // Don't refetch on mount if we have data
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const login = async (credentials) => {
    try {
      const response = await api.post(AUTH_ENDPOINTS.LOGIN, credentials);
      if (response.data?.data) {
        // Invalidate and refetch auth query
        await queryClient.invalidateQueries(['auth']);
        return response.data;
      } else {
        throw new Error('Login response missing user data');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post(AUTH_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear auth data
      queryClient.setQueryData(['auth'], { isAuthenticated: false, user: null });
    }
  };

  // Expose a method to force a re-verification
  const refreshAuth = () => {
    return queryClient.invalidateQueries(['auth']);
  };

  const value = {
    isAuthenticated: authData?.isAuthenticated ?? false,
    user: authData?.user ?? null,
    loading: isLoading,
    login,
    logout,
    refreshAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

// Export both hooks for flexibility
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Alias for useAuth for those who prefer the more explicit name
export const useAuthContext = useAuth; 