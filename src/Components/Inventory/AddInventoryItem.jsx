import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/slices/inventorySlice';
import AddInventoryForm from '../forms/AddInventoryForm';

const AddInventoryItem = () => {
  const dispatch = useDispatch();
  
  const handleAddItem = (item) => {
    console.log("New Inventory Item:", item);
  };

  return (
    <div className="container mt-5">
      <AddInventoryForm onAddItem={handleAddItem} />
    </div>
  );
};

export default AddInventoryItem;