
import React from 'react';
import { BellIcon, SettingsIcon, UserCircleIcon, MenuIcon } from 'lucide-react';
import { useAppContext } from '../App';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { userName } = useAppContext();

  return (
    <nav className="bg-white shadow-sm p-4 flex justify-between items-center z-20 sticky top-0">
      {/* Mobile menu button and title */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-md text-medium-grey hover:bg-light-grey focus:outline-none focus:ring-2 focus:ring-primary-blue"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
        <span className="text-xl font-bold text-primary-blue ml-4 lg:hidden">Compliance AI</span>
      </div>

      {/* Placeholder for desktop search or other left-aligned elements (not in current design) */}
      <div className="hidden lg:block"></div>

      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full text-medium-grey hover:bg-light-blue hover:text-primary-blue transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-blue">
          <BellIcon className="h-6 w-6" />
        </button>
        <button className="p-2 rounded-full text-medium-grey hover:bg-light-blue hover:text-primary-blue transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-blue">
          <SettingsIcon className="h-6 w-6" />
        </button>
        <div className="flex items-center space-x-2">
          <UserCircleIcon className="h-8 w-8 text-primary-blue" />
          <span className="font-medium text-text-primary hidden md:block">{userName}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
