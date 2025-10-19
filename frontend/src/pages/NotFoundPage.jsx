import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHome, FaExclamationTriangle, FaTachometerAlt } from "react-icons/fa";
import { authAPI } from "../api.js";

const NotFoundPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authAPI.getProfile();
        if (response && response.data && response.data.user) {
          setUser(response.data.user);
        } else if (response && response.user) {
          setUser(response.user);
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <FaExclamationTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                <FaTachometerAlt className="h-5 w-5" />
                <span>Go to Dashboard</span>
              </Link>
            </>
          ) : (
            <Link
              to="/"
              className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              <FaHome className="h-5 w-5" />
              <span>Go Home</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
