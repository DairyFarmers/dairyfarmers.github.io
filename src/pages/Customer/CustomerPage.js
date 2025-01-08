import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/CustomerSidebar';
import Navbar from '../../components/Navbar';
import Dashboard from '../../components/dashboard/CustomerDashboard';
import 'boxicons/css/boxicons.min.css';
import './CustomerPage.css';

const CustomerPage = () => {
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

export default CustomerPage;

