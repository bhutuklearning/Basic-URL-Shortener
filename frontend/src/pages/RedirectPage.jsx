import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { urlAPI } from "../api.js";
import { FaSpinner } from "react-icons/fa";

const RedirectPage = () => {
  const { shortId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      try {
        const baseApiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:9000/api/v1";
        const redirectUrl = `${baseApiUrl}/url/${shortId}`;
        // Navigate the browser; do not use XHR
        window.location.replace(redirectUrl);
      } catch (err) {
        console.error("Redirect error:", err);
        setError("This short URL doesn't exist or has expired");
        setLoading(false);
      }
    };

    redirectToOriginalUrl();
  }, [shortId]);

  const handleGoHome = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaSpinner className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Redirecting...</h2>
          <p className="text-gray-500">Please wait while we redirect you to your destination.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Redirect Failed</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleGoHome}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default RedirectPage;