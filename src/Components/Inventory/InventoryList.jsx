import React, { useState } from "react";
import InventoryListTable from "../tables/InventoryListTable";

const InventoryList = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEdit = (item) => {
    setSelectedItem(item);
    console.log("Editing Item:", item);
  };

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
      <InventoryListTable data={inventoryData} />
    </div>
  );
};

export default InventoryList;