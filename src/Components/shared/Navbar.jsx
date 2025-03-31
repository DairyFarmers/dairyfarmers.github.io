import React from 'react';
import { FaBars, FaSun, FaMoon, FaUserCircle, FaBell } from "react-icons/fa";

const Navbar = ({ toggleDarkMode, toggleSidebar, activePage, darkMode }) => {
  return (
    <nav>
      <button className="menu-btn" onClick={toggleSidebar}>
        <FaBars size={24} className='icon'/>
      </button>
      <a href="#" className="page-title">{activePage.charAt(0).toUpperCase() + activePage.slice(1)}</a>
      <button onClick={toggleDarkMode} className="dark-mode-btn">
        {darkMode ? <FaSun size={24} color="yellow" /> : <FaMoon size={24} color="black" />}
      </button>
      <a href="#" className="notification">
        <FaBell size={28} className='icon'/>
        <span className="text">8</span>
      </a>
      <a href="#" className="profile">
        <FaUserCircle size={40} className='icon' />
      </a>
    </nav>
  );
};

export default Navbar;
