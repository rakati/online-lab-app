import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSync, FaUser, FaMoon, FaSun } from 'react-icons/fa';
import { ImLab } from "react-icons/im";
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ theme, toggleTheme }) => {
  const { isLoggedIn, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <aside className="h-full w-16 bg-gray-800 text-white flex flex-col justify-between items-center py-4">
      {/* Top Section */}
      <div className="space-y-6 flex flex-col items-center">
        {/* Home Icon */}
        <Link to="/" className="hover:text-gray-300" title="Home">
          <FaHome size={24} />
        </Link>
      </div>

      {/* Bottom Section */}
      <div className="space-y-6 flex flex-col items-center relative">
        {/* Reset Lab */}
        <Link to="#" className="hover:text-gray-300" title="Reset Lab">
          <FaSync size={24} />
        </Link>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="hover:text-gray-300" title="Toggle Theme">
          {theme === 'dark' ? <FaSun size={24} /> : <FaMoon size={24} />}
        </button>

        <Link to="/lab" className="text-bold hover:text-gray-300" title="Go to Lab">
          <ImLab size={24} />
        </Link>

        {/* User Icon */}
        <div className="p-2 hover:bg-gray-700 rounded-full">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="hover:text-gray-300"
            title="User Menu"
          >
            <FaUser size={24} />
          </button>

          {/* User Dropdown Menu */}
          {userMenuOpen && (
            <div className="absolute bottom-16 left-16 bg-gray-700 text-white rounded shadow-lg w-48 p-2">
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="block hover:bg-gray-600 py-2 px-4 rounded">
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="block hover:bg-gray-600 py-2 px-4 rounded w-full text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block hover:bg-gray-600 py-2 px-4 rounded">
                    Sign In
                  </Link>
                  <Link to="/register" className="block hover:bg-gray-600 py-2 px-4 rounded">
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
