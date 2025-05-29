import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaBox, FaShoppingCart, FaUsers, FaMoneyBillWave } from "react-icons/fa";

export default function StatsCards({ data }) {
  const { stock_summary, orders_overview, user_statistics, revenue_metrics } = data;

  const stats = [
    {
      title: "Total Stock",
      value: stock_summary?.total_stock || 0,
      description: `${stock_summary?.low_stock || 0} items low in stock`,
      icon: FaBox,
      trend: stock_summary?.stock_trend || 0,
    },
    {
      title: "Total Orders",
      value: orders_overview?.total_orders || 0,
      description: `${orders_overview?.pending_orders || 0} orders pending`,
      icon: FaShoppingCart,
      trend: orders_overview?.order_trend || 0,
    },
    {
      title: "Total Users",
      value: user_statistics?.total_users || 0,
      description: `${user_statistics?.active_users || 0} active users`,
      icon: FaUsers,
      trend: user_statistics?.user_trend || 0,
    },
    {
      title: "Revenue",
      value: revenue_metrics?.total_revenue || 0,
      description: `${revenue_metrics?.revenue_growth || 0}% growth`,
      icon: FaMoneyBillWave,
      trend: revenue_metrics?.revenue_trend || 0,
      prefix: "$",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stat.prefix}{stat.value.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
            <div className={`text-xs ${stat.trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stat.trend > 0 ? '↑' : '↓'} {Math.abs(stat.trend)}%
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 