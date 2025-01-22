import React, { useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import LabPage from './pages/LabPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  };

  return (
    <AuthProvider>
      <div className={theme === 'dark' ? 'dark' : ''}>
          <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar theme={theme} toggleTheme={toggleTheme} />

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto bg-gray-900 text-gray-300">
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
      </AuthProvider>
  );
}

export default App;
