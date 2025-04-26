import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AddOrderForm from '../forms/AddOrderForm';
import { useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../../api/axios';
import { order_add_path } from '../../api/config';
import Toast from '../ui/Toast';

const AddOrderItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [operationStatus, setOperationStatus] = useState(false);
  const [operationStatusMsg, setOperationStatusMsg] = useState('');

  const addOrderItem = async (item) => {
      try {
        const response = await axiosPrivate.post(order_add_path, {
          customer_name: item.customer,
          delivery_date: item.deliveryDate,
          total_amount: item.amount,
          payment_status: item.paymentStatus,
          notes: item.notes,
        });
  
        if (response.status === 201) {
          setOperationStatus(true);
          setOperationStatusMsg('Order created successfully');
        } else {
          setOperationStatusMsg('Failed to create order');
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
      <AddOrderForm onAddItem={addOrderItem} />
    </div>
  );
};

export default AddOrderItem;