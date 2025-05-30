import React from 'react';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import AppRoutes from '@/routes';
import { Toaster } from "sonner";

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          className: 'bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100',
          style: {
            fontSize: '14px',
            padding: '12px 16px',
            borderRadius: '8px',
          },
          success: {
            className: 'bg-green-500 text-white',
          },
          error: {
            className: 'bg-red-500 text-white',
          },
        }}
      />
    </Provider>
  );
}

export default App;
