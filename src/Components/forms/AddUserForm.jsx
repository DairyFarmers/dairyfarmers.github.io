import React, { useState } from "react";
import "./AddItemForm.scss";

const AddUserForm = ({ onAddItem }) => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "farmer",
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
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter First Name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter Last Name"
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
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="admin">Unpaid</option>
            <option value="inventory_manager">Inventory Manager</option>
            <option value="shop_owner">Shop Owner</option>
            <option value="farmer">Farmer</option>
          </select>
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