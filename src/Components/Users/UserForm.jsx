import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, updateUser } from "../../redux/slices/usersSlice";

const UserForm = ({ selectedUser, onSave }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("farmer");

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setRole(selectedUser.role);
    }
  }, [selectedUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { id: selectedUser ? selectedUser.id : Date.now(), name, email, role };

    if (selectedUser) {
      dispatch(updateUser(userData));
    } else {
      dispatch(addUser(userData));
    }
    onSave();
  };

  return (
    <div className="bg-white p-4 mt-4 shadow-md rounded-lg">
      <h2>{selectedUser ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="inventory_manager">Inventory Manager</option>
          <option value="shop_owner">Shop Owner</option>
          <option value="farmer">Farmer</option>
        </select>
        <button type="submit">{selectedUser ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default UserForm;