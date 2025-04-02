import React from "react";
import SummaryCard from "./SummaryCard";
import OrdersOverview from "./Charts";
import ExpiringStock from "./ExpiringStock";
import ActivityLogs from "./ActivityLogs";

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard />
        <OrdersOverview />
        <ActivityLogs />
      </div>
    </div>
  );
};

export default Dashboard;