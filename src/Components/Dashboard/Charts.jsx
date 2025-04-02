import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import OrdersChart from "../charts/OrdersChart";
import SalesChart from "../charts/SalesChart";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { axiosPrivate } from "../../api/axios";
import { orders_overview_path, sales_graph_path } from "../../api/config";

const Charts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([
    { name: "Pending", value: 1 },
    { name: "Completed", value: 1 },
    { name: "Cancelled", value: 0 },
  ]);
  const [salesData, setSalesData] = useState([]);

  const fetchOrdersOverviewData = async () => {
      try {
        const response = await axiosPrivate.get(orders_overview_path);

        if (response.status === 200) {
          setOrderData([
            { name: "Pending", value: response.data.pending_rders },
            { name: "Completed", value: response.data.completed_orders },
            { name: "Cancelled", value: response.data.cancelled_orders },
          ]);
        } else {
          navigate("/error", { replace: true });
        }
      } catch (error) {
        navigate("/error", { replace: true });
      }
    };

    const fetchSalesData = async () => {
      try {
        const response = await axiosPrivate.get(sales_graph_path);

        if (response.status === 200) {
          setSalesData(response.data);
        } else {
          navigate("/error", { replace: true });
        }
      } catch (error) {
        navigate("/error", { replace: true });
      }
    };
  
    useEffect(() => {
      fetchOrdersOverviewData();
      fetchSalesData();
    }, [dispatch]);

  return (
    <div className="container mt-4">
      <div className="row g-4">
        <div className="col-md-6">
          <OrdersChart data={orderData}/>
        </div>

        <div className="col-md-6">
          <SalesChart data={salesData}/>        
        </div>
      </div>
    </div>
  );
};

export default Charts;