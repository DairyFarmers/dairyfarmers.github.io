import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import layoutReducer from './slices/layoutSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    layout: layoutReducer
  },
});

export default store;