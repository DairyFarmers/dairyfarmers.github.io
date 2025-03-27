import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addOrder } from "../../redux/slices/orderSlice";

const AddOrderForm = () => {
  const [customer, setCustomer] = useState("");
  const [total, setTotal] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      id: Math.floor(Math.random() * 1000),
      customer,
      status: "Pending",
      total: parseFloat(total),
    };
    dispatch(addOrder(newOrder));
    setCustomer("");
    setTotal("");
  };

  return (
    <div className="bg-white p-4 mt-4 shadow-md rounded-lg">
      <h2>Add Order</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Customer Name"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Total Amount"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          required
        />
        <button type="submit">Add Order</button>
      </form>
    </div>
  );
};

export default AddOrderForm;