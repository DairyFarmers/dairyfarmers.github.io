import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/services/api';
import { AUTH_ENDPOINTS } from '@/constants/endpoints';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth status when the app loads and when cookies might have changed
  useEffect(() => {
    checkAuthStatus();
    // Listen for visibility changes to recheck auth when user returns to the tab
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      checkAuthStatus();
    }
  };

  const checkAuthStatus = async () => {
    try {
      const response = await api.get(AUTH_ENDPOINTS.VERIFY_TOKEN);
      if (response.data?.user) {
        setIsAuthenticated(true);
        setUser(response.data.user);
      } else {
        // If we get a 200 but no user data, treat as not authenticated
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      // Any error means we're not authenticated
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await api.post(AUTH_ENDPOINTS.LOGIN, credentials);
      if (response.data?.user) {
        setIsAuthenticated(true);
        setUser(response.data.user);
        return response.data;
      } else {
        throw new Error('Login response missing user data');
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post(AUTH_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  // Expose a method to force a re-verification
  const refreshAuth = () => {
    return checkAuthStatus();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        refreshAuth
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 