import React from "react";
import "./Table.scss";

const InventoryListTable = ({ data }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.name}</td>
              <td>{log.description}</td>
              <td>{log.quantity}</td>
              <td>{log.price}</td>
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

export default InventoryListTable;