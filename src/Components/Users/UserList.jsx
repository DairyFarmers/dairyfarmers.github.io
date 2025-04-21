import React, { useState } from "react";
import UsersListTable from "../tables/UsersListTable";

const UserList = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEdit = (item) => {
    setSelectedItem(item);
    console.log("Editing Item:", item);
  };

  const UserData = [
    {
      "id": 1,
      "email": "test1@dfi.com",
      "role": "admin",
    },
    {
      "id": 2,
      "email": "test2@dfi.com",
      "role": "user",
    },
  ];


  return (
    <div className="container mt-4 p-4">
      <h2 className="font-bold mb-4 title">User Items</h2>
      <UsersListTable data={UserData} />
    </div>
  );
};

export default UserList;