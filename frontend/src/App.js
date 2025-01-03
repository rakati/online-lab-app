import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './pages/Header';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Lab from './pages/Lab';

function App() {
  return (
    <div>
      <Header />
      <h1>Online Lab Application</h1>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/lab" element={<Lab />} />
      </Routes>
    </div>
  );
}

export default App;
