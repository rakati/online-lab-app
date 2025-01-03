import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav>
        <Link to="/" className="mr-4">Login</Link>
        <Link to="/profile" className="mr-4">Profile</Link>
        <Link to="/lab">Lab</Link>
      </nav>
    </header>
  );
};

export default Header;
