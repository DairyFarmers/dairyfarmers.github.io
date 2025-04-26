import React from "react";
import "./Table.scss";

const OrdersListTable = ({ data }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Total (LKR)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.customer_name}</td>
              <td>{log.customer_email}</td>
              <td>{log.total_amount}</td>
              <td>{log.order_status}</td>
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