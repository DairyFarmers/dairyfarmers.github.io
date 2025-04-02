import React, { useState } from "react";
import "./AddInventoryForm.scss"; // Import the SASS file

const AddInventoryForm = ({ onAddItem }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(formData);
    setFormData({ name: "", description: "", quantity: "", price: "" });
  };

  const handleClear = () => {
    setFormData({ name: "", description: "", quantity: "", price: "" });
  };

  return (
    <div className="inventory-form-container">
      <h2 className="form-title">Add Item</h2>
      <form onSubmit={handleSubmit} className="inventory-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter item name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (LKR)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </div>

        <div className="form-buttons mt-2">
          <button type="submit" className="submit-btn">
            Add Item
          </button>
          <button type="button" className="clear-btn" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInventoryForm;