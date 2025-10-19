import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { urlAPI } from "../api.js";
import {
  FaChartBar,
  FaMousePointer,
  FaUsers,
  FaGlobe,
  FaArrowLeft,
} from "react-icons/fa";

const AnalyticsPage = () => {
  const [searchParams] = useSearchParams();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const shortId = searchParams.get("url");

  useEffect(() => {
    if (shortId) {
      fetchAnalytics();
    } else {
      setError("No URL specified");
      setLoading(false);
    }
  }, [shortId]);

  const fetchAnalytics = async () => {
    try {
      const response = await urlAPI.getUrlAnalytics(shortId);
      setAnalytics(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch analytics");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <FaArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <FaArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">URL Analytics</h1>
        <p className="text-gray-600">Detailed insights for your short URL</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaMousePointer className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Clicks</p>
              <p className="text-2xl font-bold text-gray-900">
                {analytics.clicks}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <FaUsers className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Unique Clicks</p>
              <p className="text-2xl font-bold text-gray-900">
                {analytics.uniqueClicks}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <FaGlobe className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Referrers</p>
              <p className="text-2xl font-bold text-gray-900">
                {analytics.referrers.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Referrers */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Top Referrers
        </h2>
        {analytics.referrers.length > 0 ? (
          <div className="space-y-2">
            {analytics.referrers.map((referrer, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg"
              >
                <span className="font-medium text-gray-900">{referrer}</span>
                <span className="text-sm text-gray-500">
                  {
                    analytics.details.filter(
                      (click) => click.referrer === referrer
                    ).length
                  }{" "}
                  clicks
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No referrer data available</p>
        )}
      </div>

      {/* Click Details */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Click History</h2>
        </div>
        <div className="overflow-x-auto">
          {analytics.details.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Referrer
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analytics.details.map((click, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(click.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      {click.ip}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {click.referrer}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <FaChartBar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No clicks yet
              </h3>
              <p className="text-gray-600">
                Share your URL to start seeing analytics data
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
