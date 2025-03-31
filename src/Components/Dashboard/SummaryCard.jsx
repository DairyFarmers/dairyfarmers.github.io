import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInventory } from "../../redux/slices/inventorySlice";
import Card from "../ui/card/Card";
import { FaBox, FaShoppingCart, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import { dashboard_summary_path } from "../../api/config";
import UserCard from "../ui/card/UserCard";

const SummaryCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { inventory, loading } = useSelector((state) => state.inventory);
  let stockSummary = {
    totalStock: 0,
    lowStockItems: 0,
  };
  let ordersOverview = {
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
  };
  let userStatistics = {
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    admins: 0,
    inventoryManagers: 0,
    shopOwners: 0,
    farmers: 0,
  };

  const fetchSummaryData = async () => {
    try {
      const response = await axiosPrivate.get(dashboard_summary_path);
      stockSummary = {
        totalStock: response.data.stock_summary.total_stock,
        lowStockItems: response.data.stock_summary.low_stock,
      };
      ordersOverview = {
        totalOrders: response.data.orders_overview.total_orders,
      };
      userStatistics = {
        totalUsers: response.data.user_statistics.total_users,
        admins: response.data.user_statistics.admins,
        inventoryManagers: response.data.user_statistics.inventory_managers,
        shopOwners: response.data.user_statistics.shop_owners,
        farmers: response.data.user_statistics.farmers,
      };
      if (response.status === 200) {
        navigate("/", { replace: true });
      } else {
        navigate("/error", { replace: true });
      }
    } catch (error) {
      navigate("/error", { replace: true });
    }
  };

  useEffect(() => {
    dispatch(fetchInventory());
    fetchSummaryData();
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="row g-4">
        <div className="col-md-4">
          <Card 
            title="Total Stock" 
            number={stockSummary.totalStock} 
            icon={FaBox} 
            className="bg-primary text-white" />
        </div>
        <div className="col-md-4">
          <Card 
            title="Total Orders" 
            number={ordersOverview.totalOrders} 
            icon={FaShoppingCart} 
            className="bg-warning text-dark" />
        </div>
        <div className="col-md-4">
          <Card 
            title="Total Users" 
            number={userStatistics.totalUsers} 
            icon={FaUsers} 
            className="bg-danger text-white" />
        </div>
      </div>

      <div className="row g-4 mt-1">
        <div className="col-md-3">
            <UserCard 
              title="Admins" 
              number={userStatistics.admins} 
              icon={FaUsers} 
              className="user-card" />
          </div>
          <div className="col-md-3">
            <UserCard 
              title="Inventory Managers" 
              number={userStatistics.inventoryManagers} 
              icon={FaUsers} 
              className="user-card" />
          </div>
          <div className="col-md-3">
            <UserCard 
              title="Shop Owners" 
              number={userStatistics.shopOwners} 
              icon={FaUsers} 
              className="user-card" />
          </div>
          <div className="col-md-3">
            <UserCard 
              title="Farmers" 
              number={userStatistics.farmers} 
              icon={FaUsers} 
              className="user-card" />
          </div>
      </div>
  </div>
  );
};

export default SummaryCard;
