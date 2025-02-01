import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { store } from './store';
import { loadUserFromStorage } from './store/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, setTheme } from './store/themeSlice';
import Sidebar from './components/Sidebar';
import LabPage from './pages/LabPage';
import LabInfoPage from './pages/LabInfoPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import CreateLabPage from './pages/CreateLabPage';
import LabsPage from './pages/LabsPage';
import DashboardPage from './pages/DashboardPage';
import { ProtectedRoute, PublicOnlyRoute } from './components/ProtectedRoute';

function App() {
  store.dispatch(loadUserFromStorage());
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
    <div className={theme}>
        <div className="flex h-screen">
          <Sidebar theme={theme} toggleTheme={handleToggleTheme} />

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto g-white dark:bg-gray-900 text-gray-300">
            <Routes>

              {/* Public pages */}
              <Route path="/"               element={                  <LandingPage/>                         }/>
              <Route path="/login"          element={<PublicOnlyRoute> <LoginPage />        </PublicOnlyRoute>}/>
              <Route path="/register"       element={                   <RegisterPage />                      }/>

              {/* User info and settings */}
              <Route path="/profile"        element={<ProtectedRoute>  <ProfilePage />      </ProtectedRoute>}/>
              <Route path="/dashboard"      element={<ProtectedRoute>  <DashboardPage />    </ProtectedRoute>}/>

              {/* Lab routes */}
              <Route path="/labs"           element={<ProtectedRoute>  <LabsPage />         </ProtectedRoute>}/>
              <Route path="/labs/:id"       element={<ProtectedRoute>  <LabInfoPage />      </ProtectedRoute>}/>
              <Route path="/labs/:id/edit"  element={<ProtectedRoute>  <LabInfoPage />      </ProtectedRoute>}/>
              <Route path="/lab/:id/start"  element={<ProtectedRoute>  <LabPage />          </ProtectedRoute>}/>
              <Route path="/lab/new"        element={<ProtectedRoute>  <CreateLabPage />    </ProtectedRoute>}/>
              {/* temp */}
              <Route path="/lab"            element={<ProtectedRoute>  <LabPage />          </ProtectedRoute>}/>

            </Routes>
          </div>
        </div>
      </div>
  );
}

export default App;
