import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from '@/components/common/PrivateRoute';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import UserManagement from '@/pages/UserManagement';
import Inventory from '@/pages/Inventory';
import Unauthorized from '@/pages/Unauthorized';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      <Route path="/" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      
      <Route path="/users" element={
        <PrivateRoute requiredPermissions={['can_manage_users']}>
          <UserManagement />
        </PrivateRoute>
      } />
      
      <Route path="/inventory" element={
        <PrivateRoute 
          requiredPermissions={['can_manage_inventory', 'can_view_stock']} 
          requireAll={false}
        >
          <Inventory />
        </PrivateRoute>
      } />
    </Routes>
  );
};

export default AppRoutes; 