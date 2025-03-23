import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>P.E.IoT</h2>
      </div>
      <nav className="sidebar-nav">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            isActive ? 'sidebar-link active' : 'sidebar-link'
          }
          end
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            width="24" 
            height="24" 
            className="sidebar-icon"
          >
            <path 
              fill="currentColor" 
              d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
            />
          </svg>
          Dashboard
        </NavLink>
        <NavLink 
          to="/admin" 
          className={({ isActive }) => 
            isActive ? 'sidebar-link active' : 'sidebar-link'
          }
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            width="24" 
            height="24" 
            className="sidebar-icon"
          >
            <path 
              fill="currentColor" 
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </svg>
          Admin
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <p>© 2025 P.E.IoT</p>
      </div>
    </div>
  );
};

export default Sidebar;