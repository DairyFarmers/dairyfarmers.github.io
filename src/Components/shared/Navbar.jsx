import React from 'react';
import { FaBars } from "react-icons/fa";

const Navbar = ({ toggleDarkMode, toggleSidebar, activePage }) => {
  return (
    <nav>
      <button className="menu-btn" onClick={toggleSidebar}>
        <FaBars size={24} />
      </button>
      <a href="#" className="page-title">{activePage.charAt(0).toUpperCase() + activePage.slice(1)}</a>
      <input type="checkbox" id="switch-mode" hidden onChange={toggleDarkMode} />
      <label htmlFor="switch-mode" className="switch-mode"></label>
      <a href="#" className="notification">
        <i className="bx bxs-bell"></i>
        <span className="num">8</span>
      </a>
      <a href="#" className="profile">
        <img src="./Images/people.png" alt="profile" />
      </a>
    </nav>
  );
};

export default Navbar;
