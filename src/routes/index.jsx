import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from '@/components/common/PrivateRoute';
import { EmailVerification } from '@/components/common/EmailVerification';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import UserManagement from '@/pages/UserManagement';
import Inventory from '@/pages/Inventory';
import Unauthorized from '@/pages/Unauthorized';
import Suppliers from '@/pages/Suppliers';
import Orders from '@/pages/Orders';
import Sales from '@/pages/Sales';
import Reports from '@/pages/reports';
import Notifications from '@/pages/Notifications';
import Settings from '@/pages/Settings';
import VerifyEmail from '@/pages/VerifyEmail';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      <Route path="/" element={
        <PrivateRoute>
          <EmailVerification>
            <Dashboard />
          </EmailVerification>
        </PrivateRoute>
      } />

      <Route path="/users" element={
        <PrivateRoute
          requiredPermissions={['can_manage_users', 'can_view_users']}
          requireAll={false}
        >
          <EmailVerification>
            <UserManagement />
          </EmailVerification>
        </PrivateRoute>
      } />

      <Route path="/inventory" element={
        <PrivateRoute
          requiredPermissions={['can_manage_inventory', 'can_view_inventory']}
          requireAll={false}
        >
          <EmailVerification>
            <Inventory />
          </EmailVerification>
        </PrivateRoute>
      } />

      <Route path="/suppliers" element={
        <PrivateRoute
          requiredPermissions={['can_manage_suppliers', 'can_view_suppliers']}
          requireAll={false}
        >
          <EmailVerification>
            <Suppliers />
          </EmailVerification>
        </PrivateRoute>
      } />

      <Route path="/orders" element={
        <PrivateRoute
          requiredPermissions={['can_manage_orders', 'can_view_orders']}
          requireAll={false}
        >
          <EmailVerification>
            <Orders />
          </EmailVerification>
        </PrivateRoute>
      } />

      <Route path="/sales" element={
        <PrivateRoute
          requiredPermissions={['can_manage_sales', 'can_view_sales']}
          requireAll={false}
        >
          <EmailVerification>
            <Sales />
          </EmailVerification>
        </PrivateRoute>
      } />

      <Route path="/reports" element={
        <PrivateRoute
          requiredPermissions={['can_view_reports']}
          requireAll={false}
        >
          <EmailVerification>
            <Reports />
          </EmailVerification>
        </PrivateRoute>
      } />
      <Route path='/notifications' element={
        <PrivateRoute
          requiredPermissions={['can_view_notifications']}
          requireAll={false}
        >
          <EmailVerification>
            <Notifications />
          </EmailVerification>
        </PrivateRoute>
      } />

      <Route path="/settings"
        element={
          <PrivateRoute
            requiredPermissions={['can_manage_settings']}
            requireAll={true}
          >
            <EmailVerification>
              <Settings />
            </EmailVerification>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes; 