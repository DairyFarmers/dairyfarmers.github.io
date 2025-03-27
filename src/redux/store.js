import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import layoutReducer from './slices/layoutSlice';
import inventoryReducer from './slices/inventorySlice';
import ordersReducer from './slices/orderSlice';
import usersReducer from './slices/usersSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    layout: layoutReducer,
    inventory: inventoryReducer,
    orders: ordersReducer,
    users: usersReducer,
  },
});

export default store;