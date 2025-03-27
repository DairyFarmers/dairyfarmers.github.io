import React from "react";
import StockSummaryCard from "./StockSummaryCard";
import OrdersOverview from "./OrdersOverview";
import ExpiringStock from "./ExpiringStock";
import SalesGraph from "./SalesGraph";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StockSummaryCard />
        <OrdersOverview />
        <ExpiringStock />
        <SalesGraph />
      </div>
    </div>
  );
};

export default Dashboard;