import React, { useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import LabPage from './pages/LabPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
        <div className="flex">
          {/* Sidebar */}
          <Sidebar theme={theme} toggleTheme={toggleTheme} />

          {/* Main Content */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/lab" element={<LabPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>
        </div>
      </div>
  );
}

export default App;
