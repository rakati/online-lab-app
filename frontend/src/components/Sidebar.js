import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSync, FaUser, FaMoon, FaSun } from 'react-icons/fa';
import { ImLab } from "react-icons/im";
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../store/userSlice';

const Sidebar = ({ theme, toggleTheme }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <aside className="h-full w-16 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col justify-between items-center py-4 border-r border-gray-300 dark:border-gray-700">
      {/* Top Section */}
      <div className="space-y-6 flex flex-col items-center">
        {/* Home Icon */}
        <Link to="/" className="hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded border border-transparent focus:border-blue-500" title="Home">
          <FaHome size={24} />
        </Link>
      </div>

      {/* Bottom Section */}
      <div className="space-y-6 flex flex-col items-center relative">
        {/* Reset Lab */}
        <Link to="#" className="hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded border border-transparent focus:border-blue-500" title="Reset Lab">
          <FaSync size={24} />
        </Link>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded border border-transparent focus:border-blue-500" title="Toggle Theme">
          {theme === 'dark' ? <FaSun size={24} /> : <FaMoon size={24} />}
        </button>

        <Link to="/lab" className="hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded border border-transparent focus:border-blue-500" title="Go to Lab">
          <ImLab size={24} />
        </Link>

        {/* User Icon */}
        <div className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded order border-transparent focus:border-blue-500">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            title="User Menu"
          >
            <FaUser size={24} />
          </button>

          {/* User Dropdown Menu */}
          {userMenuOpen && (
            <div className="absolute bottom-16 left-16 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded shadow-lg w-48 p-2">
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="block hover:bg-gray-200 dark:hover:bg-gray-700 py-2 px-4 rounded">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block hover:bg-gray-200 dark:hover:bg-gray-700 py-2 px-4 rounded w-full text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block hover:bg-gray-200 dark:hover:bg-gray-700 py-2 px-4 rounded">
                    Sign In
                  </Link>
                  <Link to="/register" className="block hover:bg-gray-200 dark:hover:bg-gray-700 py-2 px-4 rounded">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
