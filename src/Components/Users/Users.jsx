import React from 'react';
import UserList from './UserList';
import AddUser from './AddUser';

const Users = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mt-6">
        <AddUser />
        <UserList />
      </div>
    </div>
  );
};

export default Users;