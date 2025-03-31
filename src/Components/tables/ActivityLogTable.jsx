import React from "react";
import "./Table.scss";

const activityData = [
  { id: 1, user: "admin@dfi.com", action: "Logged in", timestamp: "2025-03-29 20:35:35", ip_address: "192.168.1.10" },
  { id: 2, user: "manager@dfi.com", action: "Updated Inventory Item", timestamp: "2025-03-29 19:15:20", ip_address: "192.168.1.12" },
  { id: 3, user: "shopowner@dfi.com", action: "Placed an Order", timestamp: "2025-03-29 18:45:00", ip_address: "192.168.1.15" },
];

const ActivityLogTable = () => {
  return (
    <div className="activity-log-container">
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Action</th>
            <th>Timestamp</th>
            <th>IP Address</th>
          </tr>
        </thead>
        <tbody>
          {activityData.map((log) => (
            <tr key={log.id}>
              <td>{log.user}</td>
              <td>{log.action}</td>
              <td>{log.timestamp}</td>
              <td>{log.ip_address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityLogTable;