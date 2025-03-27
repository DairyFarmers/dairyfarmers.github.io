import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/slices/orderSlice";
import OrdersTable from "./OrdersTable";
import AddOrderForm from "./AddOrderForm";

const Order = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.orders.loading);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div>
      <h1>Order Management</h1>
      <AddOrderForm />
      {loading ? <p>Loading orders...</p> : <OrdersTable />}
    </div>
  );
};

export default Order;
