import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AddUserForm from '../forms/AddUserForm';
import { useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../../api/axios';
import { user_add_path } from '../../api/config';
import Toast from '../ui/Toast';

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [operationStatus, setOperationStatus] = useState(false);
  const [operationStatusMsg, setOperationStatusMsg] = useState('');

  const addUser = async (item) => {
      try {
        const response = await axiosPrivate.post(user_add_path, {
          email: item.email,
          first_name: item.firstName,
          last_name: item.lastName,
          password: item.password,
          role: item.role,
        }, {
          headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
  
        if (response.status === 201) {
          setOperationStatus(true);
          setOperationStatusMsg('User account created successfully');
        } else {
          setOperationStatusMsg('Failed to create user account');
        }
      } catch (error) {
          setOperationStatusMsg('Something went wrong. Please try again.');
      }
  };

  return (
    <div className="container mt-5">
      {operationStatus && (
        <Toast message={operationStatusMsg} type="success" onClose={() => setOperationStatus(false)} />
      )}
      <AddUserForm onAddItem={addUser} />
    </div>
  );
};

export default AddUser;