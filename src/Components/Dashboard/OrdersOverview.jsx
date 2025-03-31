import React from "react";
import { useSelector } from "react-redux";
import OrdersChart from "../charts/OrdersChart";
import SalesChart from "../charts/SalesChart";

const OrdersOverview = () => {
  const { orders } = useSelector((state) => state.orders);


  return (
    <div className="container mt-4">
      <div className="row g-4">
        <div className="col-md-6">
          <OrdersChart />
        </div>

        <div className="col-md-6">
          <SalesChart />        
        </div>
      </div>
    </div>
  );
};

export default OrdersOverview;