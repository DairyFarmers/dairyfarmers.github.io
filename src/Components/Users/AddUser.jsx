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
          name: item.name,
          description: item.description,
          quantity: item.quantity,
          price: item.price
        });
  
        if (response.status === 201) {
          setOperationStatus(true);
          setOperationStatusMsg('Item added successfully');
        } else {
          setOperationStatusMsg('Failed to add item. Please try again');
        }
      } catch (error) {
          navigate("/error", { replace: true });
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