import React from "react";
import { useSelector } from "react-redux";

const OrdersOverview = () => {
  const { orders } = useSelector((state) => state.orders);

  const pendingOrders = orders.filter((order) => order.status === "Pending").length;
  const shippedOrders = orders.filter((order) => order.status === "Shipped").length;
  const completedOrders = orders.filter((order) => order.status === "Completed").length;

  return (
    <div className="bg-white p-4 mt-4 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold">Orders Overview</h2>
      <p>Pending: <span className="text-orange-500 font-bold">{pendingOrders}</span></p>
      <p>Shipped: <span className="text-blue-500 font-bold">{shippedOrders}</span></p>
      <p>Completed: <span className="text-green-500 font-bold">{completedOrders}</span></p>
    </div>
  );
};

export default OrdersOverview;