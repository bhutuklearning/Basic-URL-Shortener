import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { urlAPI } from "../api.js";
import {
  FaLink,
  FaCopy,
  FaCheck,
  FaPlus,
  FaChartBar,
  FaExternalLinkAlt,
} from "react-icons/fa";

const DashboardPage = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newUrl, setNewUrl] = useState({ originalUrl: "", customShortId: "" });
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await urlAPI.getUserUrls();
      // Check if the response has the expected format
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        setUrls(response.data.data);
      } else if (Array.isArray(response.data)) {
        // Handle case where data is directly an array
        setUrls(response.data);
      } else {
        console.error("Unexpected API response format:", response.data);
        setUrls([]);
      }
    } catch (err) {
      console.error("Failed to fetch URLs:", err);
      setUrls([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUrl = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError("");

    try {
      const urlData = { originalUrl: newUrl.originalUrl };
      if (newUrl.customShortId) {
        urlData.customShortId = newUrl.customShortId;
      }

      const response = await urlAPI.createShortUrl(urlData);

      // Handle the API response properly
      if (response.data && response.data.success && response.data.data) {
        // Create a properly formatted URL object from the API response
        const newUrlData = {
          shortId: response.data.data.shortId,
          shortUrl: response.data.data.shortUrl,
          originalUrl: response.data.data.originalUrl,
          clicks: 0,
          createdAt: new Date().toISOString()
        };

        // Add the new URL to the list
        setUrls([newUrlData, ...urls]);
        setNewUrl({ originalUrl: "", customShortId: "" });
        setShowCreateForm(false);
      } else {
        // If the response format is different than expected
        console.error("Unexpected API response format:", response.data);
        setError("Received an invalid response from the server");
      }
    } catch (err) {
      console.error("Error creating URL:", err);
      setError(err.response?.data?.error || "Failed to create URL");
    } finally {
      setCreating(false);
    }
  };

  const copyToClipboard = async (url, shortId) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(shortId);
      setTimeout(() => setCopied(""), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 bg-linear-to-r from-blue-600 to-indigo-700 p-6 rounded-lg shadow-lg">
        <div className="text-white">
          <h1 className="text-3xl font-bold">URL Dashboard</h1>
          <p className="mt-2 opacity-90">Create and manage your shortened URLs</p>
        </div>
        <button
          onClick={() => navigate('/home')}
          className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors shadow-md"
        >
          <FaPlus className="h-5 w-5" />
          <span>Create New URL</span>
        </button>
      </div>

      {/* Create URL Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-t-4 border-blue-600 transform transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <FaLink className="mr-2 text-blue-600" />
            Create Short URL
          </h2>
          <form onSubmit={handleCreateUrl} className="space-y-5">
            <div className="transition-all duration-300 hover:shadow-md p-4 rounded-lg">
              <label
                htmlFor="originalUrl"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Original URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLink className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  id="originalUrl"
                  value={newUrl.originalUrl}
                  onChange={(e) =>
                    setNewUrl({ ...newUrl, originalUrl: e.target.value })
                  }
                  placeholder="https://example.com/very-long-url"
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Enter the full URL you want to shorten</p>
            </div>

            <div className="transition-all duration-300 hover:shadow-md p-4 rounded-lg">
              <label
                htmlFor="customShortId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Custom Short ID (optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEdit className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="customShortId"
                  value={newUrl.customShortId}
                  onChange={(e) =>
                    setNewUrl({ ...newUrl, customShortId: e.target.value })
                  }
                  placeholder="my-custom-link"
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Leave blank for an auto-generated short URL</p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <div className="flex space-x-4 pt-2">
              <button
                type="submit"
                disabled={creating}
                className="bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:opacity-70 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md flex-1 flex justify-center items-center"
              >
                {creating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>
                    <FaPlus className="mr-2" />
                    Create URL
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* URLs List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-linear-to-r from-gray-50 to-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <FaLink className="mr-2 text-blue-600" />
            Your URLs
            <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {urls.length}
            </span>
          </h2>
        </div>

        {urls.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="bg-blue-50 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
              <FaLink className="h-12 w-12 text-blue-300" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No URLs yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Create your first short URL to start tracking clicks and sharing simplified links
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md flex items-center mx-auto"
            >
              <FaPlus className="mr-2" />
              Create Your First URL
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {urls.map((url) => (
              <div
                key={url.shortId}
                className="p-6 hover:bg-blue-50 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-base lg:text-lg font-medium text-gray-900 truncate max-w-full lg:max-w-md break-all" title={url.originalUrl}>
                        {url.originalUrl}
                      </h3>
                      <a
                        href={url.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 transition-colors shrink-0"
                        title="Visit original URL"
                      >
                        <FaExternalLinkAlt className="h-4 w-4" />
                      </a>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 lg:gap-4 text-sm text-gray-500">
                      <span className="font-mono bg-white border border-blue-200 px-3 py-1.5 rounded-lg flex items-center max-w-full" title={url.shortUrl}>
                        <span className="mr-2 text-blue-600 shrink-0">🔗</span>
                        <span className="truncate">{url.shortUrl}</span>
                      </span>
                      <span className="flex items-center shrink-0">
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
                        {url.clicks || 0} clicks
                      </span>
                      <span className="flex items-center shrink-0">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-600 mr-2"></span>
                        {formatDate(url.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 lg:space-x-3 mt-3 lg:mt-0 flex-wrap gap-2">
                    <button
                      onClick={() => copyToClipboard(url.shortUrl, url.shortId)}
                      className="flex items-center space-x-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 shadow-sm shrink-0"
                    >
                      {copied === url.shortId ? (
                        <>
                          <FaCheck className="h-4 w-4 text-green-600" />
                          <span className="text-green-600 hidden sm:inline">Copied!</span>
                        </>
                      ) : (
                        <>
                          <FaCopy className="h-4 w-4" />
                          <span className="hidden sm:inline">Copy</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => window.open(url.shortUrl, '_blank', 'noopener')}
                      className="flex items-center space-x-2 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 shadow-sm shrink-0"
                      title="Open shortened URL"
                    >
                      <FaExternalLinkAlt className="h-4 w-4" />
                      <span className="hidden sm:inline">Redirect</span>
                    </button>               
                    <button
                      onClick={() => navigate(`/analytics?data=${encodeURIComponent(JSON.stringify(url))}`)}
                      className="flex items-center space-x-2 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 shadow-sm shrink-0"
                    >
                      <FaChartBar className="h-4 w-4" />
                      <span className="hidden sm:inline">Analytics</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
