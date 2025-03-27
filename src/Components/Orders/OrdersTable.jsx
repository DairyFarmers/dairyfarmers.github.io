import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrder } from "../../redux/slices/orderSlice";

const OrdersTable = () => {
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateOrder({ id, status: newStatus }));
  };

  return (
    <div className="bg-white p-4 mt-4 shadow-md rounded-lg">
      <h2>Order Details</h2>
      <table border="1">
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
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.status}</td>
              <td>{order.total.toFixed(2)}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;