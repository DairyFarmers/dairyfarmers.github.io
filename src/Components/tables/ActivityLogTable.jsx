import React from "react";
import "./Table.scss";

const ActivityLogTable = ({ data }) => {
  return (
    <div className="activity-log-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Action</th>
            <th>Timestamp</th>
            <th>IP Address</th>
          </tr>
        </thead>
        <tbody>
          {data.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
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