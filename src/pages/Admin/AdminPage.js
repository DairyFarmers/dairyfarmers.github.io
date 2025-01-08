import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/AdminSidebar';
import Navbar from '../../components/Navbar';
import Dashboard from '../../components/dashboard/AdminDashboard';
import 'boxicons/css/boxicons.min.css';
import './AdminPage.css';

const AdminPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark', !darkMode);
  };

  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible((prevState) => !prevState);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''} ${isSidebarVisible ? '' : 'sidebar-hidden'}`}>
      <Sidebar isSidebarVisible={isSidebarVisible}/>
      <div id="content">
        <Navbar toggleDarkMode={toggleDarkMode} toggleSidebar={toggleSidebar}/>
        <Dashboard />
      </div>
    </div>
  );
}

export default AdminPage;

