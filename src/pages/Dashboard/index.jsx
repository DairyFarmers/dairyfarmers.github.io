import React from 'react';
import { PermissionGuard } from '../../components/common/PermissionGuard';
import { usePermissions } from '../../contexts/PermissionContext';
import './Dashboard.scss';

const Dashboard = () => {
  const { role } = usePermissions();

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      {/* Analytics Section */}
      <PermissionGuard permissions="can_view_analytics">
        <div className="dashboard-section">
          <h2>Analytics Overview</h2>
          {/* Analytics components */}
        </div>
      </PermissionGuard>

      {/* User Management Section */}
      <PermissionGuard permissions="can_manage_users">
        <div className="dashboard-section">
          <h2>User Management</h2>
          {/* User management components */}
        </div>
      </PermissionGuard>

      {/* Inventory Section */}
      <PermissionGuard permissions={['can_manage_inventory', 'can_view_stock']}>
        <div className="dashboard-section">
          <h2>Inventory Overview</h2>
          {/* Inventory components */}
        </div>
      </PermissionGuard>

      {/* Role-specific content */}
      {role === 'admin' && (
        <div className="dashboard-section">
          <h2>Admin Controls</h2>
          {/* Admin-specific components */}
        </div>
      )}
    </div>
  );
};

export default Dashboard; 