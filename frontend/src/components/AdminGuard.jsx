import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authAPI } from "../api";
import { toast } from "react-hot-toast";

const AdminGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authAPI.getProfile();
        setIsAuthenticated(true);
        // Check if user has admin role
        if (response.data?.user?.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          toast.error("You do not have permission to access this page.");
        }
      } catch (error) {
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    };

    checkAuth();
  }, [location.pathname]);

  if (isAuthenticated === null || isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminGuard;
