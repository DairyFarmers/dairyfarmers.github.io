import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { usePermissions } from '@/contexts/PermissionContext';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export const PrivateRoute = () => {
  const { hasPermission, loading } = usePermissions();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Get the required permissions from the route loader data
  const permissions = location.state?.permissions;
  const hasRequiredPermissions = permissions ? hasPermission(permissions) : true;

  if (!hasRequiredPermissions) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};