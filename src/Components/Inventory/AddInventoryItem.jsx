import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/slices/inventorySlice';

const AddInventoryItem = () => {
  const dispatch = useDispatch();
  const [item, setItem] = useState({ name: '', quantity: '', unit: '', category: '', expiration_date: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { ...item, id: Date.now() };
    dispatch(addItem(newItem));
    setItem({ name: '', quantity: '', unit: '', category: '', expiration_date: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 mt-4 shadow rounded">
      <h3 className="text-lg font-bold mb-2">Add New Item</h3>
      <input type="text" placeholder="Item Name" value={item.name} onChange={(e) => setItem({ ...item, name: e.target.value })} className="border p-2 w-full mb-2" required />
      <input type="number" placeholder="Quantity" value={item.quantity} onChange={(e) => setItem({ ...item, quantity: e.target.value })} className="border p-2 w-full mb-2" required />
      <input type="text" placeholder="Unit (e.g., L, kg)" value={item.unit} onChange={(e) => setItem({ ...item, unit: e.target.value })} className="border p-2 w-full mb-2" required />
      <input type="text" placeholder="Category" value={item.category} onChange={(e) => setItem({ ...item, category: e.target.value })} className="border p-2 w-full mb-2" required />
      <input type="date" value={item.expiration_date} onChange={(e) => setItem({ ...item, expiration_date: e.target.value })} className="border p-2 w-full mb-2" required />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">Add Item</button>
    </form>
  );
};

export default AddInventoryItem;