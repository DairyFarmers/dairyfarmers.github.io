import React, { useState, useEffect } from "react";
import OrdersListTable from "../tables/OrdersListTable";
import { axiosPrivate } from '../../api/axios';
import { order_list_path } from '../../api/config';
import { useNavigate } from 'react-router-dom';

const OrdersList = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);

  const getOrders = async (item) => {
          try {
            const response = await axiosPrivate.get(order_list_path);
      
            if (response.status === 200) {
              setOrderList(response.data);
            }
          } catch (error) {
              navigate("/error", { replace: true });
              console.error("Error fetching inventory items:", error);
          }
    };
  
    useEffect(() => {
      getOrders();
    }, []);

  return (
    <div className="container mt-4 p-4">
      <h2 className="font-bold mb-4 title">Ordered Items</h2>
      <OrdersListTable data={orderList} />
    </div>
  );
};

export default OrdersList;