import React, { useState } from "react";
import "./AddItemForm.scss";

const AddOrderForm = ({ onAddItem }) => {
  const [formData, setFormData] = useState({
    customer: "",
    deliveryDate: "",
    amount: "",
    paymentStatus: "Unpaid",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(formData);
    setFormData({
      customer: "",
      deliveryDate: "",
      amount: "",
      paymentStatus: "Unpaid",
      notes: "",
    });
  };

  const handleClear = () => {
    setFormData({
      customer: "",
      deliveryDate: "",
      amount: "",
      paymentStatus: "Unpaid",
      notes: "",
    });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">New Order</h2>
      <form onSubmit={handleSubmit} className="form">
        {/* Customer Name */}
        <div className="form-group">
          <label htmlFor="customer">Customer Name</label>
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

        {/* Delivery Date */}
        <div className="form-group">
          <label htmlFor="deliveryDate">Delivery Date</label>
          <input
            type="date"
            id="deliveryDate"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
          />
        </div>

        {/* Amount */}
        <div className="form-group">
          <label htmlFor="amount">Amount (LKR)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter total amount"
            required
          />
        </div>

        {/* Payment Status */}
        <div className="form-group">
          <label htmlFor="paymentStatus">Payment Status</label>
          <select
            id="paymentStatus"
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
          >
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
            <option value="Partial">Partial</option>
          </select>
        </div>

        {/* Notes */}
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Enter any special notes"
          />
        </div>

        {/* Buttons */}
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