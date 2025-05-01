import React, { useState, useEffect } from 'react';
import { PermissionGuard } from '../../components/common/PermissionGuard';
import api from '../../services/api';
import './Inventory.scss';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await api.get('/inventories/items/');
      setInventory(response.data.data || []);
    } catch (err) {
      setError('Failed to fetch inventory items');
      console.error('Error fetching inventory:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="inventory">
      <h1>Inventory Management</h1>

      <PermissionGuard permissions="can_manage_inventory">
        <div className="actions mb-4">
          <button className="btn btn-primary">Add New Item</button>
        </div>
      </PermissionGuard>

      <div className="inventory-stats mb-4">
        <div className="stat-card">
          <h3>Total Items</h3>
          <p className="number">{inventory.length}</p>
        </div>
        <div className="stat-card">
          <h3>Low Stock Items</h3>
          <p className="number warning">
            {inventory.filter(item => item.quantity <= item.reorder_level).length}
          </p>
        </div>
        <div className="stat-card">
          <h3>Out of Stock</h3>
          <p className="number danger">
            {inventory.filter(item => item.quantity === 0).length}
          </p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.sku}</td>
                <td>{item.category}</td>
                <td>
                  <span className={item.quantity <= item.reorder_level ? 'text-warning' : ''}>
                    {item.quantity}
                  </span>
                </td>
                <td>${item.unit_price}</td>
                <td>
                  <span className={`badge ${item.is_active ? 'bg-success' : 'bg-danger'}`}>
                    {item.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <PermissionGuard permissions="can_manage_inventory">
                    <button className="btn btn-sm btn-outline-primary me-2">
                      Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      Delete
                    </button>
                  </PermissionGuard>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory; 