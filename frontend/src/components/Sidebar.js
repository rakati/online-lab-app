import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSync, FaUser, FaMoon, FaSun, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Sidebar = ({ theme, toggleTheme }) => {
  return (
    <aside className="h-screen w-16 bg-gray-800 text-white flex flex-col items-center py-4 space-y-4">
      {/* Home Page */}
      <Link to="/" className="hover:text-gray-300" title="Home">
        <FaHome size={24} />
      </Link>

      {/* Reset Lab */}
      <button className="hover:text-gray-300" title="Reset Lab">
        <FaSync size={24} />
      </button>

      {/* Theme Toggle */}
      <button onClick={toggleTheme} className="hover:text-gray-300" title="Toggle Theme">
        {theme === 'dark' ? <FaSun size={24} /> : <FaMoon size={24} />}
      </button>

      {/* Login */}
      <Link to="/login" className="hover:text-gray-300" title="Login">
        <FaSignInAlt size={24} />
      </Link>

      {/* Register */}
      <Link to="/register" className="hover:text-gray-300" title="Register">
        <FaUserPlus size={24} />
      </Link>

      {/* Profile */}
      <Link to="/profile" className="hover:text-gray-300" title="Profile">
        <FaUser size={24} />
      </Link>
    </aside>
  );
};

export default Sidebar;
