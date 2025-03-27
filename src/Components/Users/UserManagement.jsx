import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/slices/usersSlice";
import UserList from "./UserList";
import UserForm from "./UserForm";

const UserManagement = () => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h1>User Management</h1>
      <UserForm selectedUser={selectedUser} onSave={() => setSelectedUser(null)} />
      <UserList onEdit={setSelectedUser} />
    </div>
  );
};

export default UserManagement;