import React, { useState } from 'react';
import Sidebar from '../../Components/sidebar';
import Navbar from '../../Components/Navbar';
import Dashboard from '../../Components/Dashboard';
import 'boxicons/css/boxicons.min.css';
import './Home.css';

function App() {
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

export default App;

