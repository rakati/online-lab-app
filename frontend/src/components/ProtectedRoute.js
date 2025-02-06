import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children }) => {
  console.log("ProtectedRoute: checking is logged in");
  const { isLoggedIn } = useSelector((state) => state.user);
  const location = useLocation();
  console.log("ProtectedRoute:", isLoggedIn, location);

  return isLoggedIn ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export function PublicOnlyRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  if (isLoggedIn) {
    // If already logged in, send them somewhere else
    return <Navigate to="/labs" />;
  }
  return children;
}

export default ProtectedRoute;
