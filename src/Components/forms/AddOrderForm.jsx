import React, { useState } from "react";
import "./AddItemForm.scss";

const AddOrderForm = ({ onAddItem }) => {
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
    <div className="form-container">
      <h2 className="form-title">Add Item</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="customer">Customer</label>
          <input
            type="text"
            id="customer"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            placeholder="Enter customer name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount (LKR)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            required
          />
        </div>

        <div className="form-buttons mt-2">
          <button type="submit" className="submit-btn">
            Add Order
          </button>
          <button type="button" className="clear-btn" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrderForm;