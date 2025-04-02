import React from 'react';
import ActivityLogTable from '../tables/ActivityLogTable';

const ActivityLogs = () => {
  const activityData = [
    { id: 1, user: "admin@dfi.com", action: "Logged in", timestamp: "2025-03-29 20:35:35", ip_address: "192.168.1.10" },
    { id: 2, user: "manager@dfi.com", action: "Updated Inventory Item", timestamp: "2025-03-29 19:15:20", ip_address: "192.168.1.12" },
    { id: 3, user: "shopowner@dfi.com", action: "Placed an Order", timestamp: "2025-03-29 18:45:00", ip_address: "192.168.1.15" },
  ];
  return (
    <div className="container mt-4">
      <div className="row g-4">
        <div className="col-md-12">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="text-lg font-semibold ms-1 mt-2">
                    Recent Activity
                </h5>
            </div>
          <ActivityLogTable data={activityData}/>
        </div>
      </div>
    </div>
  )
}

export default ActivityLogs