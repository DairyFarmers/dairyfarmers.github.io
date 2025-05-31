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
import Sales from '@/pages/Sales';
import Reports from '@/pages/reports';

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

      <Route path="/sales" element={
        <PrivateRoute 
          requiredPermissions={['can_manage_sales', 'can_view_sales']} 
          requireAll={false}
        >
          <Sales />
        </PrivateRoute>
      } />

      <Route path="/reports" element={
        <PrivateRoute 
          requiredPermissions={['can_view_reports', 'can_generate_reports']} 
          requireAll={false}
        >
          <Reports />
        </PrivateRoute>
      } />
    </Routes>
  );
};

export default AppRoutes; 