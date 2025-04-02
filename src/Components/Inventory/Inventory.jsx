import React from 'react';
import InventoryList from './InventoryList';
import AddInventoryItem from './AddInventoryItem';

const Inventory = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mt-6">
        <AddInventoryItem />
        <InventoryList />
      </div>
    </div>
  );
};

export default Inventory;