import React, { useState, useEffect } from "react";
import InventoryListTable from "../tables/InventoryListTable";
import { axiosPrivate } from '../../api/axios';
import { inventory_list_path } from '../../api/config';
import { useNavigate } from 'react-router-dom';

const InventoryList = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [inventoryItems, setInventoryItems] = useState([]);

  const getInventoryItems = async (item) => {
        try {
          const response = await axiosPrivate.get(inventory_list_path);
    
          if (response.status === 200) {
            setInventoryItems(response.data);
          }
        } catch (error) {
            navigate("/error", { replace: true });
            console.error("Error fetching inventory items:", error);
        }
  };

  useEffect(() => {
    getInventoryItems();
  }, []);

  const inventoryData = [
    {
      "id": 1,
      "name": "Smartphone 2",
      "description": "Android Phone",
      "quantity": 15,
      "price": "500.00",
      "expiry_date": null,
      "created_at": "2025-04-02T13:03:06.038018Z",
      "updated_at": "2025-04-02T13:03:06.038018Z"
    },
    {
      "id": 2,
      "name": "Smartphone 2",
      "description": "Android Phone",
      "quantity": 15,
      "price": "500.00",
      "expiry_date": null,
      "created_at": "2025-04-02T13:03:08.507965Z",
      "updated_at": "2025-04-02T13:03:08.507965Z"
    }
  ];


  return (
    <div className="container mt-4 p-4">
      <h2 className="font-bold mb-4 title">Inventory Items</h2>
      <InventoryListTable data={inventoryItems} />
    </div>
  );
};

export default InventoryList;