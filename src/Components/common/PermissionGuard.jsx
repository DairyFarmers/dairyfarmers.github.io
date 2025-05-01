import React from 'react';
import { usePermissions } from '../../contexts/PermissionContext';

export const PermissionGuard = ({ 
  permissions, 
  children, 
  fallback = null 
}) => {
  const { hasPermission, loading } = usePermissions();

  if (loading) {
    return null;
  }

  if (!permissions) {
    return children;
  }

  const hasRequiredPermissions = hasPermission(permissions);

  return hasRequiredPermissions ? children : fallback;
}; 