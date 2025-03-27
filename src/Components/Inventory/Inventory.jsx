import React from 'react';
import InventoryList from './InventoryList';
import AddInventoryItem from './AddInventoryItem';

const Inventory = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>
      <div className="mt-6">
        <AddInventoryItem />
      </div>
      <InventoryList />
    </div>
  );
};

export default Inventory;