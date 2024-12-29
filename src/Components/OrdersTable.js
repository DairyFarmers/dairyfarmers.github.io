import React from 'react';

const OrdersTable = () => {
  return (
    <div className="order">
      <div className="head">
        <h3>Recent Orders</h3>
        <i className="bx bx-search"></i>
        <i className="bx bx-filter"></i>
      </div>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Date Order</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src="./Images/people.png" alt="User" />
              <p>John Doe</p>
            </td>
            <td>01-10-2021</td>
            <td><span className="status completed">Completed</span></td>
          </tr>
          <tr>
            <td>
              <img src="./Images/people.png" alt="User" />
              <p>John Doe</p>
            </td>
            <td>01-10-2021</td>
            <td><span className="status pending">Pending</span></td>
          </tr>
          <tr>
            <td>
              <img src="./Images/people.png" alt="User" />
              <p>John Doe</p>
            </td>
            <td>01-10-2021</td>
            <td><span className="status process">Process</span></td>
          </tr>
          <tr>
            <td>
              <img src="./Images/people.png" alt="User" />
              <p>John Doe</p>
            </td>
            <td>01-10-2021</td>
            <td><span className="status pending">Pending</span></td>
          </tr>
          <tr>
            <td>
              <img src="./Images/people.png" alt="User" />
              <p>John Doe</p>
            </td>
            <td>01-10-2021</td>
            <td><span className="status completed">Completed</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
