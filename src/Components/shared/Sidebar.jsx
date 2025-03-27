import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePage } from '../../redux/slices/layoutSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { activePage, isSidebarVisible } = useSelector(state => state.layout);  
  const role = useSelector((state) => state.user.role);
  console.log(role)
  const menuItems = {
    admin: [
      { id: 'dashboard', icon: 'bx bxs-dashboard', label: 'Dashboard' },
      { id: 'inventory', icon: 'bx bxs-user', label: 'Inventory' },
      { id: 'orders', icon: 'bx bxs-cog', label: 'Orders' },
    ],
    business: [
      { id: 'dashboard', icon: 'bx bxs-dashboard', label: 'Dashboard' },
      { id: 'inventory', icon: 'bx bxs-user', label: 'Inventory' },
      { id: 'orders', icon: 'bx bxs-cog', label: 'Orders' },
    ],
    customer: [
      { id: 'dashboard', icon: 'bx bxs-dashboard', label: 'Dashboard' },
      { id: 'inventory', icon: 'bx bxs-user', label: 'Inventory' },
      { id: 'orders', icon: 'bx bxs-cog', label: 'Orders' },
    ],
  };

  const handleMenuClick = (pageId) => {
    dispatch(setActivePage(pageId));
  };

  return (
    <section id="sidebar" className={isSidebarVisible ? '' : 'hide'}>
        <a href="#" className="brand">
            <img src="./Images/logo.png"/>
            <span className="text">DAIRY FARMER CO.</span>
        </a>
      <div className="side-menu top">
      <div className="side-menu top">
        {menuItems[role].map(item => (
          <div
            key={item.id}
            className={`menu-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => handleMenuClick(item.id)}
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default Sidebar;