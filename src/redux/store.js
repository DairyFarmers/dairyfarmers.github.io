import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import layoutReducer from './slices/layoutSlice';
import inventoryReducer from './slices/inventorySlice';
import ordersReducer from './slices/orderSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    layout: layoutReducer,
    inventory: inventoryReducer,
    orders: ordersReducer,
  },
});

export default store;