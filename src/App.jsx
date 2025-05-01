import React from 'react';
import { PermissionProvider } from '@/contexts/PermissionContext';
import AppRoutes from '@/routes';
import './App.scss';

function App() {
  return (
    <PermissionProvider>
      <AppRoutes />
    </PermissionProvider>
  );
}

export default App;
