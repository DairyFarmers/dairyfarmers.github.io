import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../components/shared/Sidebar';
import Navbar from '../../components/shared/Navbar';
import Dashboard from '../../components/Dashboard/Dashboard';
import Inventory from '../../components/Inventory/Inventory';
import Orders from '../../components/Orders/Orders';
import UserManagement from '../../components/Users/UserManagement';
import 'boxicons/css/boxicons.min.css';
import './Home.scss';

const Content = () => {
  const activePage = useSelector(state => state.layout.activePage);
  
  const pages = {
    dashboard: <Dashboard />,
    inventory: <Inventory />,
    orders: <Orders />,
    users: <UserManagement />,
  };

  return pages[activePage] || <Dashboard />;
};

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);  
  const [isSidebarVisible, setSidebarVisible] = useState(window.innerWidth >= 786);
  const activePage = useSelector(state => state.layout.activePage);

  useEffect(() => {
    const handleResize = () => {
      setSidebarVisible(window.innerWidth >= 786);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode);
  };

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''} ${isSidebarVisible ? 'sidebar-open' : ''}`}>
      <Sidebar isSidebarVisible={isSidebarVisible}/>

      {isSidebarVisible && <div className="overlay" onClick={toggleSidebar}></div>}

      <div id="content">
        <Navbar 
          toggleDarkMode={toggleDarkMode} 
          toggleSidebar={toggleSidebar} 
          isSidebarVisible={isSidebarVisible} 
          activePage={activePage} 
          darkMode={darkMode}/>

        <main className="main-content">
            <Content />
        </main>
      </div>
    </div>
  );
}

export default Home;

