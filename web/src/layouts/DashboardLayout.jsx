// DashboardLayout.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Import des composants du header et du sidebar
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Fonction pour déterminer si un lien est actif
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar pour mobile (affiché en overlay) */}
      <div 
        className={`${
          sidebarOpen ? 'block' : 'hidden'
        } fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-white lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center">
            <span className="mx-2 text-xl font-semibold text-gray-800">P.E.IoT Dashboard</span>
          </div>
        </div>

        <nav className="mt-10">
          <Link
            to="/"
            className={`${
              isActive('/') ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            } flex items-center px-6 py-2 mt-4 text-sm font-medium`}
          >
            <svg 
              className="w-5 h-5 mr-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
              />
            </svg>
            <span>Dashboard</span>
          </Link>

          <Link
            to="/admin"
            className={`${
              isActive('/admin') ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            } flex items-center px-6 py-2 mt-4 text-sm font-medium`}
          >
            <svg 
              className="w-5 h-5 mr-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
            <span>Administration</span>
          </Link>

          <Link
            to="/sensors"
            className={`${
              isActive('/sensors') ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            } flex items-center px-6 py-2 mt-4 text-sm font-medium`}
          >
            <svg 
              className="w-5 h-5 mr-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" 
              />
            </svg>
            <span>Capteurs</span>
          </Link>

          <Link
            to="/users"
            className={`${
              isActive('/users') ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            } flex items-center px-6 py-2 mt-4 text-sm font-medium`}
          >
            <svg 
              className="w-5 h-5 mr-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
              />
            </svg>
            <span>Utilisateurs</span>
          </Link>

          <Link
            to="/alerts"
            className={`${
              isActive('/alerts') ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            } flex items-center px-6 py-2 mt-4 text-sm font-medium`}
          >
            <svg 
              className="w-5 h-5 mr-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
              />
            </svg>
            <span>Alertes</span>
          </Link>

          <Link
            to="/reports"
            className={`${
              isActive('/reports') ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            } flex items-center px-6 py-2 mt-4 text-sm font-medium`}
          >
            <svg 
              className="w-5 h-5 mr-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
            <span>Rapports</span>
          </Link>
        </nav>

        <div className="absolute bottom-0 w-full">
          <div className="flex items-center px-5 py-3">
            <div className="flex-shrink-0">
              <img
                className="w-8 h-8 rounded-full"
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Avatar"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Admin User</p>
              <p className="text-xs text-gray-500">admin@peiot.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none lg:hidden"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>

            <div className="relative mx-4 lg:mx-0">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </span>
              <input
                className="w-32 pl-10 pr-4 py-2 text-sm text-gray-700 placeholder-gray-500 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:bg-white focus:ring focus:ring-blue-300 focus:border-transparent lg:w-64"
                type="text"
                placeholder="Rechercher..."
              />
            </div>
          </div>

          <div className="flex items-center">
            <div className="relative mr-4">
              <button className="relative p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 focus:outline-none">
                <span className="sr-only">Notifications</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  ></path>
                </svg>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>

            <div className="relative">
              <button className="relative block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none">
                <img
                  className="object-cover w-full h-full"
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Avatar"
                />
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container px-6 py-8 mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;