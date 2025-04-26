import React from "react";
import "./Table.scss";

const UsersListTable = ({ data }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.email}</td>
              <td>{log.role}</td>
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

export default UsersListTable;