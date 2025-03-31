import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePage } from '../../redux/slices/layoutSlice';

const Sidebar = ({ isSidebarVisible }) => {
  const dispatch = useDispatch();
  const { activePage } = useSelector(state => state.layout);  
  const role = useSelector((state) => state.user.role);

  const menuItems = {
    admin: [
      { id: 'dashboard', icon: 'bx bxs-dashboard', label: 'Dashboard' },
      { id: 'inventory', icon: 'bx bxs-user', label: 'Inventory' },
      { id: 'orders', icon: 'bx bxs-cog', label: 'Orders' },
      { id: 'users', icon: 'bx bxs-cog', label: 'Users' },
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
    <aside className={`sidebar ${isSidebarVisible ? "visible" : "hidden"}`}>
          <a href="#" className="brand">
              <img src="./Images/logo.png" className="brand-logo" alt="Logo" />
              <span className="brand-text">DAIRY FARMERS</span>
          </a>

          <div className="side-menu">
            {menuItems[role].map(item => (
              <div
                key={item.id}
                className={`menu-item ${activePage === item.id ? 'active' : ''}`}
                onClick={() => handleMenuClick(item.id)}
              >
                <i className={item.icon}></i>
                <span className='nav-item-text'>{item.label}</span>
              </div>
            ))}
          </div>
    </aside>
  );
};

export default Sidebar;