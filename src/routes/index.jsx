import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from '@/components/common/PrivateRoute';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import UserManagement from '@/pages/UserManagement';
import Inventory from '@/pages/Inventory';
import Unauthorized from '@/pages/Unauthorized';
import Suppliers from '@/pages/Suppliers';
import Orders from '@/pages/Orders';

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

      <Route path="/suppliers" element={
        <PrivateRoute 
          requiredPermissions={['can_manage_suppliers']}
          requireAll={false}  
        >
          <Suppliers />
        </PrivateRoute>
      } />

      <Route path="/orders" element={
        <PrivateRoute 
          requiredPermissions={['can_manage_orders', 'can_view_orders']} 
          requireAll={false}
        >
          <Orders />
        </PrivateRoute>
      } /> 
    </Routes>
  );
};

export default AppRoutes; 