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
      setUrls(response.data);
    } catch (err) {
      console.error("Failed to fetch URLs:", err);
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
      setUrls([response.data, ...urls]);
      setNewUrl({ originalUrl: "", customShortId: "" });
      setShowCreateForm(false);
    } catch (err) {
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your short URLs</p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
        >
          <FaPlus className="h-5 w-5" />
          <span>Create New URL</span>
        </button>
      </div>

      {/* Create URL Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Create Short URL
          </h2>
          <form onSubmit={handleCreateUrl} className="space-y-4">
            <div>
              <label
                htmlFor="originalUrl"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Original URL
              </label>
              <input
                type="url"
                id="originalUrl"
                value={newUrl.originalUrl}
                onChange={(e) =>
                  setNewUrl({ ...newUrl, originalUrl: e.target.value })
                }
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
                Custom Short ID (optional)
              </label>
              <input
                type="text"
                id="customShortId"
                value={newUrl.customShortId}
                onChange={(e) =>
                  setNewUrl({ ...newUrl, customShortId: e.target.value })
                }
                placeholder="my-custom-link"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={creating}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {creating ? "Creating..." : "Create URL"}
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* URLs List */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Your URLs</h2>
        </div>

        {urls.length === 0 ? (
          <div className="text-center py-12">
            <FaLink className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No URLs yet
            </h3>
            <p className="text-gray-600 mb-4">
              Create your first short URL to get started
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Create URL
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {urls.map((url) => (
              <div
                key={url.shortId}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {url.originalUrl}
                      </h3>
                      <a
                        href={url.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <FaExternalLinkAlt className="h-4 w-4" />
                      </a>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                        {url.shortUrl}
                      </span>
                      <span>{url.clicks} clicks</span>
                      <span>Created {formatDate(url.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(url.shortUrl, url.shortId)}
                      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors"
                    >
                      {copied === url.shortId ? (
                        <>
                          <FaCheck className="h-4 w-4 text-green-600" />
                          <span className="text-green-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <FaCopy className="h-4 w-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => navigate(`/analytics?url=${url.shortId}`)}
                      className="flex items-center space-x-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg transition-colors"
                    >
                      <FaChartBar className="h-4 w-4" />
                      <span>Analytics</span>
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
