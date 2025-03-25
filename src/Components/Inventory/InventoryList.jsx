import { useState, useEffect } from "react";
import InventoryRow from "./InventoryRow";

export default function InventoryList() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetch("/api/inventory")
      .then((res) => res.json())
      .then((data) => setInventory(data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Inventory Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {inventory.map((item) => (
          <InventoryRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}