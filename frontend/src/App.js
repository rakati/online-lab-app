import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, setTheme } from './store/themeSlice';
import Sidebar from './components/Sidebar';
import LabPage from './pages/LabPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import CreateLabPage from './pages/CreateLabPage';
import LabsPage from './pages/LabsPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  // Grab the theme from Redux
  const theme = useSelector((state) => state.theme.theme);

  // On first load, make sure the <html> class is correct
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // This is the handler we'll pass down to the sidebar
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <AuthProvider>
      <div className={theme}>
          <div className="flex h-screen">
            <Sidebar theme={theme} toggleTheme={handleToggleTheme} />

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto g-white dark:bg-gray-900 text-gray-300">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route
                  path="/lab"
                  element={
                    <ProtectedRoute>
                      <LabPage />
                    </ProtectedRoute>
                  }
              />
              <Route
                  path="/labs"
                  element={
                    <ProtectedRoute>
                      <LabsPage />
                    </ProtectedRoute>
                  }
              />
              <Route
                  path="/add-lab"
                  element={
                    <ProtectedRoute>
                      <CreateLabPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>}
                />
              </Routes>
            </div>
          </div>
        </div>
      </AuthProvider>
  );
}

export default App;
