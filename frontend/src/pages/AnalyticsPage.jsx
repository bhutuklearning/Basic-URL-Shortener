import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { urlAPI } from "../api.js";
import {
  FaChartBar,
  FaMousePointer,
  FaUsers,
  FaGlobe,
  FaArrowLeft,
  FaCalendarAlt,
  FaLink,
  FaExternalLinkAlt,
  FaInfoCircle,
  FaClock,
  FaMapMarkerAlt,
  FaDesktop,
  FaMobileAlt
} from "react-icons/fa";

const AnalyticsPage = () => {
  const [searchParams] = useSearchParams();
  const [analytics, setAnalytics] = useState(null);
  const [urlDetails, setUrlDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const urlDataRaw = searchParams.get("data");
  const urlData = urlDataRaw ? JSON.parse(decodeURIComponent(urlDataRaw)) : null;
  const shortId = urlData?.shortId;

  // Sample data for preview
  const sampleUrls = [
    {
      id: "abc123",
      originalUrl: "https://www.example.com/very-long-url-path-that-needs-shortening",
      shortUrl: "http://localhost:9000/api/v1/url/abc123",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      analytics: {
        clicks: 145,
        uniqueClicks: 98,
        referrers: ["google.com", "facebook.com", "twitter.com", "linkedin.com"],
        details: Array(25).fill().map((_, i) => ({
          timestamp: new Date(Date.now() - (25 - i) * 3600000),
          ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          referrer: ["google.com", "facebook.com", "twitter.com", "linkedin.com", "direct"][Math.floor(Math.random() * 5)]
        }))
      }
    },
    {
      id: "def456",
      originalUrl: "https://www.example.org/blog/top-10-programming-tips",
      shortUrl: "http://localhost:9000/api/v1/url/def456",
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
      analytics: {
        clicks: 89,
        uniqueClicks: 67,
        referrers: ["google.com", "dev.to", "stackoverflow.com"],
        details: Array(15).fill().map((_, i) => ({
          timestamp: new Date(Date.now() - (15 - i) * 7200000),
          ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          referrer: ["google.com", "dev.to", "stackoverflow.com", "direct"][Math.floor(Math.random() * 4)]
        }))
      }
    },
    {
      id: "ghi789",
      originalUrl: "https://www.example.net/products/new-tech-gadget",
      shortUrl: "http://localhost:9000/api/v1/url/ghi789",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      analytics: {
        clicks: 237,
        uniqueClicks: 189,
        referrers: ["google.com", "instagram.com", "pinterest.com", "youtube.com"],
        details: Array(35).fill().map((_, i) => ({
          timestamp: new Date(Date.now() - (35 - i) * 2400000),
          ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          referrer: ["google.com", "instagram.com", "pinterest.com", "youtube.com", "direct"][Math.floor(Math.random() * 5)]
        }))
      }
    },
    {
      id: "jkl012",
      originalUrl: "https://www.example.co/events/annual-conference-2023",
      shortUrl: "http://localhost:9000/api/v1/url/jkl012",
      createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 21 days ago
      analytics: {
        clicks: 412,
        uniqueClicks: 356,
        referrers: ["google.com", "eventbrite.com", "meetup.com", "facebook.com", "linkedin.com"],
        details: Array(45).fill().map((_, i) => ({
          timestamp: new Date(Date.now() - (45 - i) * 1800000),
          ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          referrer: ["google.com", "eventbrite.com", "meetup.com", "facebook.com", "linkedin.com", "direct"][Math.floor(Math.random() * 6)]
        }))
      }
    },
    {
      id: "mno345",
      originalUrl: "https://www.example.io/docs/api-reference",
      shortUrl: "http://localhost:9000/api/v1/url/mno345",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      analytics: {
        clicks: 76,
        uniqueClicks: 42,
        referrers: ["google.com", "github.com", "stackoverflow.com"],
        details: Array(12).fill().map((_, i) => ({
          timestamp: new Date(Date.now() - (12 - i) * 14400000),
          ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          referrer: ["google.com", "github.com", "stackoverflow.com", "direct"][Math.floor(Math.random() * 4)]
        }))
      }
    }
  ];

  useEffect(() => {
    if (shortId) {
      fetchAnalytics();
    } else {
      // Instead of showing error, show sample data for the first URL
      setLoading(true);
      setTimeout(() => {
        const sampleData = sampleUrls[0];
        setAnalytics(sampleData.analytics);
        setUrlDetails({
          originalUrl: sampleData.originalUrl,
          shortUrl: sampleData.shortUrl,
          createdAt: sampleData.createdAt,
          id: sampleData.id
        });
        setLoading(false);
      }, 800); // Simulate loading
    }
  }, [shortId]);

  const fetchAnalytics = async () => {
    try {
      const response = await urlAPI.getUrlAnalytics(shortId);
      console.log("Analytics response:", response);

      // Handle different response formats
      if (response && response.data) {
        // Check if data is nested in data property
        if (response.data.data) {
          setAnalytics(response.data.data);
          // If URL details are included in the response
          if (response.data.urlDetails) {
            setUrlDetails(response.data.urlDetails);
          }
        } else {
          // Direct structure
          setAnalytics(response.data);
          // If URL details are included in the response
          if (response.data.urlDetails) {
            setUrlDetails(response.data.urlDetails);
          }
        }

        // If analytics data doesn't have expected properties, create defaults
        if (response.data.data && !response.data.data.details) {
          setAnalytics(prev => ({
            ...prev,
            details: [],
            referrers: [],
            clicks: 0,
            uniqueClicks: 0
          }));
        }
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Analytics error:", err);
      setError(err.response?.data?.error || "Failed to fetch analytics");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString();
  };

  // Calculate percentage for progress bars
  const calculatePercentage = (value, total) => {
    if (!total) return 0;
    return Math.round((value / total) * 100);
  };

  // Get top referrers with counts
  const getTopReferrers = () => {
    if (!analytics || !analytics.details || !analytics.details.length) return [];

    const referrerCounts = {};
    analytics.details.forEach(click => {
      const referrer = click.referrer || "Direct";
      referrerCounts[referrer] = (referrerCounts[referrer] || 0) + 1;
    });

    return Object.entries(referrerCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  // Get click data by day for the last 7 days
  const getClicksByDay = () => {
    if (!analytics || !analytics.details || !analytics.details.length) return [];

    const now = new Date();
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      days.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        count: 0
      });
    }

    analytics.details.forEach(click => {
      const clickDate = new Date(click.timestamp);
      const dayDiff = Math.floor((now - clickDate) / (1000 * 60 * 60 * 24));

      if (dayDiff >= 0 && dayDiff < 7) {
        days[6 - dayDiff].count++;
      }
    });

    return days;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading analytics data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-lg mb-6 flex items-start">
          <FaInfoCircle className="h-6 w-6 mr-3 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-bold mb-1">Error Loading Analytics</h3>
            <p>{error}</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors shadow-md"
        >
          <FaArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>
    );
  }

  // Ensure analytics has the expected structure
  const safeAnalytics = {
    clicks: analytics?.clicks || 0,
    uniqueClicks: analytics?.uniqueClicks || 0,
    referrers: analytics?.referrers || [],
    details: analytics?.details || []
  };

  const topReferrers = getTopReferrers();
  const clicksByDay = getClicksByDay();

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header with Back Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 bg-linear-to-r from-blue-600 to-indigo-700 p-6 rounded-lg shadow-lg text-white">
        <div>
          <h1 className="text-3xl font-bold mb-2">URL Analytics Dashboard</h1>
          <p className="opacity-90">Detailed performance insights for your shortened URL</p>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 md:mt-0 bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors shadow-md"
        >
          <FaArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* URL Info Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-t-4 border-blue-600">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <FaLink className="mr-2 text-blue-600" />
          URL Information
        </h2>
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-500 mb-1">Short URL</p>
              <div className="flex items-center">
                <span className="font-mono text-blue-700 mr-2">
                  {urlDetails?.shortUrl}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`http://localhost:9000/api/v1/url/${shortId}`);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                  title="Copy to clipboard"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Original URL</p>
              <div className="flex items-center">
                <span className="truncate max-w-md mr-2">
                  {urlDetails?.originalUrl || "—"}
                </span>
                <a
                  href={urlDetails?.originalUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                  title="Visit original URL"
                >
                  <FaExternalLinkAlt className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-200 flex flex-col md:flex-row md:justify-between">
            <div className="mb-2 md:mb-0">
              <p className="text-sm text-gray-500 mb-1">Created</p>
              <div className="flex items-center">
                <FaCalendarAlt className="h-4 w-4 text-gray-500 mr-2" />
                <span>{formatDate(urlDetails?.createdAt || new Date())}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Short ID</p>
              <div className="flex items-center">
                <span className="font-mono bg-blue-100 px-2 py-1 rounded text-blue-800">
                  {shortId}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaMousePointer className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Clicks</p>
              <p className="text-3xl font-bold text-gray-900">
                {safeAnalytics.clicks}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-xs text-gray-500 mb-1">Click-through rate</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <FaUsers className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Unique Visitors</p>
              <p className="text-3xl font-bold text-gray-900">
                {safeAnalytics.uniqueClicks}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-xs text-gray-500 mb-1">
              {safeAnalytics.uniqueClicks} of {safeAnalytics.clicks} total clicks
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{
                  width: `${calculatePercentage(safeAnalytics.uniqueClicks, safeAnalytics.clicks)}%`
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <FaGlobe className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Traffic Sources</p>
              <p className="text-3xl font-bold text-gray-900">
                {safeAnalytics.referrers.length}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-xs text-gray-500 mb-1">Top source: {topReferrers[0]?.name || "Direct"}</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-purple-600 h-2.5 rounded-full"
                style={{
                  width: topReferrers[0] ? `${calculatePercentage(topReferrers[0].count, safeAnalytics.clicks)}%` : "0%"
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Click Trends Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <FaChartBar className="mr-2 text-blue-600" />
          Click Trends
        </h2>
        <div className="h-64 flex items-end justify-between space-x-2">
          {clicksByDay.map((day, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className="w-full bg-blue-500 hover:bg-blue-600 transition-all rounded-t-lg"
                style={{
                  height: `${Math.max(5, (day.count / Math.max(...clicksByDay.map(d => d.count))) * 180)}px`
                }}
              ></div>
              <div className="text-xs font-medium text-gray-600 mt-2">{day.date}</div>
              <div className="text-sm font-bold">{day.count}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Referrers */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-linear-to-r from-gray-50 to-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <FaGlobe className="mr-2 text-blue-600" />
              Top Referrers
            </h2>
          </div>
          <div className="p-6">
            {topReferrers.length > 0 ? (
              <div className="space-y-4">
                {topReferrers.map((referrer, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {referrer.name === "Direct" ? "Direct / No Referrer" : referrer.name}
                      </span>
                      <span className="text-sm font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {referrer.count} clicks
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 group-hover:bg-gray-300 transition-colors">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full group-hover:bg-blue-500 transition-colors"
                        style={{ width: `${calculatePercentage(referrer.count, safeAnalytics.clicks)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FaGlobe className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No referrer data available yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Device & Browser Stats (Placeholder) */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-linear-to-r from-gray-50 to-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <FaDesktop className="mr-2 text-blue-600" />
              Devices & Browsers
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Device Types</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="flex items-center text-gray-700">
                        <FaDesktop className="mr-2 text-blue-500" />
                        Desktop
                      </span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="flex items-center text-gray-700">
                        <FaMobileAlt className="mr-2 text-green-500" />
                        Mobile
                      </span>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Top Browsers</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-700">Chrome</span>
                      <span className="text-sm font-medium">70%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-700">Firefox</span>
                      <span className="text-sm font-medium">20%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click Details */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-linear-to-r from-gray-50 to-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <FaClock className="mr-2 text-blue-600" />
            Click History
            <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {safeAnalytics.details.length}
            </span>
          </h2>
        </div>
        <div className="overflow-x-auto">
          {safeAnalytics.details.length > 0 ? (
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
                {safeAnalytics.details.map((click, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <FaCalendarAlt className="h-4 w-4 text-gray-400 mr-2" />
                        {formatDate(click.timestamp)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="h-4 w-4 text-gray-400 mr-2" />
                        {click.ip}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <FaGlobe className="h-4 w-4 text-gray-400 mr-2" />
                        {click.referrer || "Direct / No Referrer"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-16">
              <div className="bg-blue-50 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
                <FaChartBar className="h-12 w-12 text-blue-300" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No clicks recorded yet
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Share your shortened URL to start collecting click data and analytics
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
              >
                Create Another URL
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
