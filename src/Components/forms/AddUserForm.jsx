import React, { useState } from "react";
import "./AddItemForm.scss";

const AddUserForm = ({ onAddItem }) => {
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
      <h2 className="form-title">Add User</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            type="role"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Enter role"
            required
          />
        </div>

        <div className="form-buttons mt-2">
          <button type="submit" className="submit-btn">
            Add User
          </button>
          <button type="button" className="clear-btn" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;