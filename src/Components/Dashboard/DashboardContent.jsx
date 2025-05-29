import React from 'react';
import StatsCards from './StatsCards';
import ChartSection from './ChartSection';

export default function DashboardContent({ data, timeRange, user }) {
  if (!data) return null;

  // Destructure metrics from API response
  const {
    system_metrics,
    financial_metrics,
    inventory_metrics,
    order_metrics,
    last_login,
    notifications,
    recent_activities
  } = data;

  // Organize metrics for components
  const metrics = {
    system: system_metrics,
    financial: financial_metrics,
    inventory: inventory_metrics,
    orders: order_metrics
  };

  const commonData = {
    lastLogin: last_login,
    notifications,
    recentActivities: recent_activities
  };

  return (
    <div className="space-y-6">
      <StatsCards metrics={metrics} commonData={commonData} />
      <ChartSection 
        metrics={metrics} 
        timeRange={timeRange}
        role={user?.role?.name}
      />
    </div>
  );
}