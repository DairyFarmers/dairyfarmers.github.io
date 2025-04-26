import React, { useState, useEffect } from "react";
import UsersListTable from "../tables/UsersListTable";
import { axiosPrivate } from '../../api/axios';
import { user_list_path } from '../../api/config';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);

  const getUserList = async (item) => {
        try {
          const response = await axiosPrivate.get(user_list_path);
    
          if (response.status === 200) {
            setUserList(response.data);
          }
        } catch (error) {
            navigate("/error", { replace: true });
            console.error("Error fetching user list:", error);
        }
  };

  useEffect(() => {
    getUserList();
  }, []);


  return (
    <div className="container mt-4 p-4">
      <h2 className="font-bold mb-4 title">User Accounts</h2>
      <UsersListTable data={userList} />
    </div>
  );
};

export default UserList;