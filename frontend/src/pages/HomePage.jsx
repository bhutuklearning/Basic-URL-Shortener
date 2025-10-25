import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { urlAPI, authAPI, getPublicUrl } from "../api.js";
import { FaLink, FaCopy, FaCheck, FaArrowRight, FaTachometerAlt } from "react-icons/fa";

const HomePage = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customShortId, setCustomShortId] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
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
        setUser(null);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const urlData = { originalUrl };
      if (customShortId) {
        urlData.customShortId = customShortId;
      }

      const response = await urlAPI.createShortUrl(urlData);
      console.log("API Response:", response); // Debug log

      if (response && response.data) {
        let shortId;

        if (response.data.data) {
          shortId = response.data.data.shortId;
        } else {
          shortId = response.data.shortId || response.data.customShortId;
        }

        if (shortId) {
          // Use the utility function to get the correct URL for the environment
          const fullShortUrl = getPublicUrl(shortId);
          setShortUrl(fullShortUrl);
        } else {
          throw new Error("No shortId found in response");
        }
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create short URL");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Shorten Your URLs
          <span className="text-blue-600"> Instantly</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create short, memorable links that are perfect for sharing. Track
          clicks and get detailed analytics.
        </p>
        {user && (
          <div className="mt-6">
            <Link
              to="/dashboard"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors"
            >
              <FaTachometerAlt className="mr-2" />
              Go to Dashboard
            </Link>
          </div>
        )}
      </div>

      {/* URL Shortener Form */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="originalUrl"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter your long URL
            </label>
            <input
              type="url"
              id="originalUrl"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://example.com/very-long-url"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="customShortId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Custom short ID
            </label>
            <input
              type="text"
              id="customShortId"
              value={customShortId}
              onChange={(e) => setCustomShortId(e.target.value)}
              placeholder="my-custom-link"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-md"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Creating...</span>
              </>
            ) : (
              <>
                <FaLink className="h-5 w-5" />
                <span>Shorten URL</span>
              </>
            )}
          </button>
        </form>

        {/* Result */}
        {shortUrl && (
          <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Shortened URL</h3>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1 bg-white p-3 rounded-lg border border-blue-200 font-mono text-blue-700 truncate break-all">
                {shortUrl}
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-sm"
              >
                {copied ? (
                  <FaCheck className="h-4 w-4" />
                ) : (
                  <FaCopy className="h-4 w-4" />
                )}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => window.open(shortUrl, '_blank', 'noopener,noreferrer')}
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <span>Visit shortened URL</span>
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaLink className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Fast & Simple
          </h3>
          <p className="text-gray-600">
            Create short URLs in seconds with our simple interface.
          </p>
        </div>
        <div className="text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCopy className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Easy Sharing
          </h3>
          <p className="text-gray-600">
            Share your links easily with one-click copy functionality.
          </p>
        </div>
        <div className="text-center">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaArrowRight className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Analytics
          </h3>
          <p className="text-gray-600">
            Track clicks and get detailed analytics for your URLs.
          </p>
        </div>
      </div>

      {/* CTA */}
      {/* <div className="text-center bg-blue-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to get started?
        </h2>
        <p className="text-gray-600 mb-6">
          Sign up for free to manage all your short URLs in one place.
        </p>
        <button
          onClick={() => navigate("/register")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          Get Started Free
        </button>
      </div> */}
    </div>
  );
};

export default HomePage;
