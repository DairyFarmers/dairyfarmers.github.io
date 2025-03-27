import React, { useState } from "react";
import InventoryTable from "./InventoryTable";

const InventoryList = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEdit = (item) => {
    setSelectedItem(item);
    console.log("Editing Item:", item);
    // Open a modal or form for editing
  };

  return (
    <div className="bg-white p-4 mt-4 shadow rounded">
      <InventoryTable onEdit={handleEdit} />
      {selectedItem && <p>Editing: {selectedItem.name}</p>}
    </div>
  );
};

export default InventoryList;