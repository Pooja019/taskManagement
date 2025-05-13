import React from "react";
import { Navigate } from "react-router-dom";

// Login Component Protected Route - Redirects to dashboard if logged in
export const Login = ({ children }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  return isLoggedIn === "true" ? <Navigate to="/dashboard" /> : children;
};

// Dashboard Component Protected Route - Redirects to login if not logged in
export const ProtectedRoute = ({ children }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  return isLoggedIn === "true" ? children : <Navigate to="/" />;
};
