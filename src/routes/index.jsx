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
      
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route 
          path="/users" 
          element={<UserManagement />}
          loader={({ request }) => {
            const permissions = ['can_manage_users'];
            // Permission check will be handled by PrivateRoute
            return { permissions };
          }}
        />
        <Route 
          path="/inventory" 
          element={<Inventory />}
          loader={({ request }) => {
            const permissions = ['can_manage_inventory', 'can_view_stock'];
            // Permission check will be handled by PrivateRoute
            return { permissions };
          }}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes; 