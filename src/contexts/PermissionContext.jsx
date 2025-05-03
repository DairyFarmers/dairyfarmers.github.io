import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';

const PermissionContext = createContext(null);

export const PermissionProvider = ({ children }) => {
  const [permissions, setPermissions] = useState({});
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const updatePermissions = () => {
      if (!isAuthenticated || !user) {
        setPermissions({});
        setRole(null);
        setLoading(false);
        return;
      }

      // Use the role data from the user object
      if (user.role) {
        setPermissions(user.role.permissions || {});
        setRole(user.role.name);
      } else {
        setPermissions({});
        setRole(null);
      }
      setLoading(false);
    };

    updatePermissions();
  }, [isAuthenticated, user]);

  const hasPermission = (permission) => {
    if (!permissions) return false;
    
    if (Array.isArray(permission)) {
      return permission.every(p => permissions[p] === true);
    }
    return permissions[permission] === true;
  };

  const getRolePermissions = async () => {
    try {
      const response = await api.get('/api/v1/users/permissions/all/');
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