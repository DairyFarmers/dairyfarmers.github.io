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
            <th>Expiary At</th>
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
              <td>{log.expiary_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryListTable;