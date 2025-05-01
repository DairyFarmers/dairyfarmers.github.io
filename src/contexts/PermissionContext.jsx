import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';

const PermissionContext = createContext(null);

export const PermissionProvider = ({ children }) => {
  const [permissions, setPermissions] = useState({});
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchPermissions = async () => {
      if (!isAuthenticated) {
        setPermissions({});
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/users/permissions/');
        setPermissions(response.data.permissions);
        setRole(response.data.role_name);
      } catch (error) {
        console.error('Error fetching permissions:', error);
        setPermissions({});
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, [isAuthenticated]);

  const hasPermission = (permission) => {
    if (Array.isArray(permission)) {
      return permission.every(p => permissions[p] === true);
    }
    return permissions[permission] === true;
  };

  const getRolePermissions = async () => {
    try {
      const response = await api.get('/users/permissions/all/');
      return response.data;
    } catch (error) {
      console.error('Error fetching all permissions:', error);
      return {};
    }
  };

  return (
    <PermissionContext.Provider 
      value={{ 
        permissions, 
        role, 
        hasPermission, 
        loading,
        getRolePermissions 
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissions = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionProvider');
  }
  return context;
}; 