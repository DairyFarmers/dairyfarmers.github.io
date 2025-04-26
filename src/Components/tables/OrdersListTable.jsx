import React from "react";
import "./Table.scss";

const OrdersListTable = ({ data }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Total ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.customer}</td>
              <td>{log.status}</td>
              <td>{log.total}</td>
              <td class="table-actions">
                <button class="btn btn-edit">
                  <i class="bi bi-pencil-fill"></i> Edit
                </button>
                <button class="btn btn-delete">
                  <i class="bi bi-trash-fill"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersListTable;