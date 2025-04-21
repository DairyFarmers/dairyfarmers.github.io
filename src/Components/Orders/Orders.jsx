import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/slices/orderSlice";
import OrdersList from "./OrdersList";
import AddOrderItem from "./AddOrderItem";

const Order = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.orders.loading);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mt-6">
        <AddOrderItem />
        <OrdersList />
      </div>
    </div>
  );
};

export default Order;
