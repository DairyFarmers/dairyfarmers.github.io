import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import dashboardReducer from './slices/dashboardSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;