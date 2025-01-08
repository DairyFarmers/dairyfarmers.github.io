import React from 'react';

const AdminSidebar = ({ isSidebarVisible }) => {
  const handleActiveMenu = (e) => {
    const allMenus = document.querySelectorAll('#sidebar .side-menu li');
    allMenus.forEach((menu) => menu.classList.remove('active'));
    e.target.closest('li').classList.add('active');
  };

  return (
    <section id="sidebar" className={isSidebarVisible ? '' : 'hide'}>
      <a href="#" className="brand">
        <img src="./Images/logo.png"/>
        <span className="text">DAIRY FARMER CO.</span>
      </a>
      <ul className="side-menu top">
        <li className="active" onClick={handleActiveMenu}>
          <a href="#">
            <i className="bx bxs-dashboard"></i>
            <span className="text">Dashboard</span>
          </a>
        </li>
        <li onClick={handleActiveMenu}>
          <a href="#">
            <i className="bx bxs-shopping-bag-alt"></i>
            <span className="text">My Store</span>
          </a>
        </li>
        <li onClick={handleActiveMenu}>
          <a href="#">
            <i className="bx bxs-doughnut-chart"></i>
            <span className="text">Analytics</span>
          </a>
        </li>
        <li onClick={handleActiveMenu}>
          <a href="#">
            <i className="bx bxs-message-dots"></i>
            <span className="text">Message</span>
          </a>
        </li>
        <li onClick={handleActiveMenu}>
          <a href="#">
            <i className="bx bxs-group"></i>
            <span className="text">Team</span>
          </a>
        </li>
      </ul>
      <ul className="side-menu">
        <li>
          <a href="#">
            <i className="bx bxs-cog"></i>
            <span className="text">Settings</span>
          </a>
        </li>
        <li>
          <a href="#" className="logout">
            <i className="bx bxs-log-out-circle"></i>
            <span className="text">Logout</span>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default AdminSidebar;