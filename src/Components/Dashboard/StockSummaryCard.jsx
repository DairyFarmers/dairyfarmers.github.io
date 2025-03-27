import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInventory } from "../../redux/slices/inventorySlice";

const StockSummaryCard = () => {
  const dispatch = useDispatch();
  const { inventory, loading } = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  const totalStock = inventory.reduce((acc, item) => acc + item.quantity, 0);
  const lowStockItems = inventory.filter((item) => item.quantity < 10).length;

  return (
    <div className="bg-white p-4 mt-4 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold">Stock Summary</h2>
      <p>Total Stock: <span className="font-bold">{totalStock}</span></p>
      <p>Low Stock Items: <span className="text-red-500 font-bold">{lowStockItems}</span></p>
    </div>
  );
};

export default StockSummaryCard;
