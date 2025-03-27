import React from 'react';
import InventoryList from './InventoryList';

const Inventory = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InventoryList />
        <OrdersOverview />
        <ExpiringStock />
      </div>
    </div>
  )
}

export default Inventory