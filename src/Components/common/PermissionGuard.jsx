import React from 'react';
import { useSelector } from 'react-redux';

export const PermissionGuard = ({
  permissions,
  children,
  fallback = null,
  requireAll = true, // Optionally allow "all" or "any" logic
}) => {
  const { permissions: userPermissions, loading } = useSelector((state) => state.user);

  if (loading) {
    return null;
  }

  if (!permissions) {
    return children;
  }

  // permissions can be a string or array
  const permsArray = Array.isArray(permissions) ? permissions : [permissions];
  const hasRequiredPermissions = requireAll
    ? permsArray.every((perm) => userPermissions[perm])
    : permsArray.some((perm) => userPermissions[perm]);

  return hasRequiredPermissions ? children : fallback;
};