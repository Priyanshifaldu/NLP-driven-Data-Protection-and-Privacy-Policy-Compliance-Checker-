import React from 'react';
import { NavLink } from 'react-router-dom';
import { SIDEBAR_ITEMS } from '../constants.tsx';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={toggleSidebar}
      ></div>

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:relative lg:translate-x-0 lg:shadow-none`}
      >
        <div className="flex items-center mb-10 lg:justify-start">
          <span className="text-2xl font-bold text-primary-blue">Compliance AI</span>
        </div>
        <nav className="flex-1">
          <ul>
            {SIDEBAR_ITEMS.map((item) => (
              <li key={item.id} className="mb-2">
                <NavLink
                  to={item.path}
                  onClick={toggleSidebar} // Close sidebar on mobile after clicking a link
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg text-text-secondary hover:bg-light-blue hover:text-primary-blue transition-colors duration-200
                    ${isActive ? 'bg-primary-blue text-white hover:text-white' : ''}`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;