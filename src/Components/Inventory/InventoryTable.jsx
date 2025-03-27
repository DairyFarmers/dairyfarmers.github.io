import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../../redux/slices/inventorySlice";

const InventoryTable = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { inventory, loading, error } = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  if (loading) return <p>Loading inventory...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="inventory-container">
      <h2>Inventory List</h2>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Category</th>
            <th>Actions</th> {/* Edit button column */}
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.unit}</td>
              <td>{item.category}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(item)}>
                  Edit
                </button>
                <button className="edit-btn" onClick={() => onEdit(item)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;