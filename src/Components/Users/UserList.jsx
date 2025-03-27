import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../../redux/slices/usersSlice";

const UserList = ({ onEdit }) => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  return (
    <div className="bg-white p-4 mt-4 shadow-md rounded-lg">
      <h2>User List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => onEdit(user)}>Edit</button>
                <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;