import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken } from '@/redux/slices/userSlice';

export const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoggedIn, loading, permissions, tokenChecked } = useSelector((state) => state.user);

  useEffect(() => {
    if (!tokenChecked) {
      dispatch(verifyToken());
    }
  }, [dispatch, tokenChecked]);

  if (loading || !tokenChecked) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;