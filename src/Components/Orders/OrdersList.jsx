import React, { useState } from "react";
import OrdersListTable from "../tables/OrdersListTable";

const OrdersList = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEdit = (item) => {
    setSelectedItem(item);
    console.log("Editing Item:", item);
  };

  const orderData = [
    {
      "id": 1,
      "customer": "John Doe",
      "status": "Pending",
      "total": 150.0,
    },
    {
      "id": 2,
      "customer": "Jane Smith",
      "status": "Shipped",
      "total": 200.0,
    },
    {
      "id": 3,
      "customer": "Alice Johnson",
      "status": "Delivered",
      "total": 300.0,
    },
    {
      "id": 4,
      "customer": "Bob Brown",
      "status": "Cancelled",
      "total": 100.0,
    },
    {
      "id": 5,
      "customer": "Charlie Davis",
      "status": "Returned",
      "total": 250.0,
    },
  ];


  return (
    <div className="container mt-4 p-4">
      <h2 className="font-bold mb-4 title">Ordered Items</h2>
      <OrdersListTable data={orderData} />
    </div>
  );
};

export default OrdersList;