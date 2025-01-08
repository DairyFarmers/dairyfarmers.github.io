import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/BusinessSidebar';
import Navbar from '../../components/Navbar';
import Dashboard from '../../components/dashboard/BusinessDashboard';
import 'boxicons/css/boxicons.min.css';
import './BusinessPage.css';

const BusinessPage = () => {
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

export default BusinessPage;

