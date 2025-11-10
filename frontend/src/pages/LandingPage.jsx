import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLink, FaChartLine, FaCog, FaArrowRight, FaStar, FaUsers, FaRocket, FaShieldAlt, FaClock } from 'react-icons/fa';
import { FaGithub, FaTwitter, FaLinkedin, FaHeart, FaCode } from 'react-icons/fa';
const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: <FaLink className="h-8 w-8 text-blue-600" />,
      title: "Lightning Fast",
      description: "Shorten URLs in milliseconds with our optimized infrastructure"
    },
    {
      icon: <FaChartLine className="h-8 w-8 text-green-600" />,
      title: "Advanced Analytics",
      description: "Track clicks, visitors, and engagement with detailed insights"
    },
    {
      icon: <FaCog className="h-8 w-8 text-purple-600" />,
      title: "Custom URLs",
      description: "Create memorable, branded short links for your business"
    },
    {
      icon: <FaShieldAlt className="h-8 w-8 text-red-600" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee"
    },
    {
      icon: <FaClock className="h-8 w-8 text-orange-600" />,
      title: "Real-time Stats",
      description: "Monitor your links performance with live analytics dashboard"
    },
    {
      icon: <FaUsers className="h-8 w-8 text-indigo-600" />,
      title: "Team Collaboration",
      description: "Manage multiple users and share analytics across your team"
    }
  ];

  const stats = [
    { number: "10M+", label: "URLs Shortened" },
    { number: "50M+", label: "Clicks Tracked" },
    { number: "99.9%", label: "Uptime" },
    { number: "50K+", label: "Happy Users" }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{
            left: `${mousePosition.x * 0.05}px`,
            top: `${mousePosition.y * 0.05}px`,
          }}
        />
        <div
          className="absolute w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{
            right: `${mousePosition.x * 0.03}px`,
            bottom: `${mousePosition.y * 0.03}px`,
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <div className="flex items-center space-x-3">
              <Link to="/home" className="flex items-center space-x-2">
                <FaLink className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">
                  URL Shortener
                </span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started Free
              </Link>
            </div>
            <div className="md:hidden">
              <button className="text-gray-600 hover:text-blue-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 lg:pt-24 pb-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 lg:mb-8">
                Shorten Your Links,
                <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                  Expand Your Reach
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
                Transform long, complex URLs into clean, shareable links with advanced analytics,
                custom branding, and real-time insights. Join thousands of professionals who trust our platform.
              </p>
            </div>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Link
                to="/register"
                className="group bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 lg:px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 flex items-center space-x-3"
              >
                <span>Start For Free</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="group bg-white text-blue-600 hover:text-blue-700 px-8 lg:px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 border-2 border-blue-100 flex items-center space-x-3"
              >
                <span>Explore Demo</span>
                <FaRocket className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 lg:mt-24 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 lg:py-32 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to
              <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                Manage Your Links
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed for professionals who demand the best from their link management tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-1000 hover:-translate-y-2 border border-white/20 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-linear-to-r from-blue-50 to-indigo-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Links?
            </h2>
            <p className="text-lg text-gray-600 mb-8 lg:mb-12 max-w-2xl mx-auto">
              Join thousands of users who have already revolutionized their link management.
              Start your journey today with our free plan.
            </p>
            <Link
              to="/register"
              className="group inline-flex items-center space-x-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 lg:px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
            >bg-linear-to-r
              <span>Get Started Now</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-linear-to-r from-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-4">
                <FaLink className="h-6 w-6 text-blue-400 mr-2" />
                <span className="text-xl font-bold">URL Shortener</span>
              </div>
              <p className="text-gray-300 mb-4">
                A modern URL shortening service with powerful analytics and tracking capabilities.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/bhutuklearning" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <FaGithub className="h-6 w-6" />
                </a>
                <a href="https://x.com/Amritanshutwt" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <FaTwitter className="h-6 w-6" />
                </a>
                <a href="https://www.linkedin.com/in/amritanshu-goutam/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <FaLinkedin className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
                </li>
                <li>
                  <Link to="/analytics" className="text-gray-300 hover:text-white transition-colors">Analytics</Link>
                </li>
                <li>
                  <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="text-gray-300 hover:text-white transition-colors">Register</Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">API Documentation</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">Developer Guide</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">FAQs</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">Support</a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Stay Updated</h3>
              <p className="text-gray-300 mb-4">Subscribe to our newsletter for the latest updates and features.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} URL Shortener. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex items-center text-gray-400 text-sm">
              <span>Built with</span>
              <FaHeart className="h-4 w-4 text-red-500 mx-1" />
              <span>by <Link to="https://www.linkedin.com/in/amritanshu-goutam/" className="text-gray-300 hover:text-white transition-colors">Amritanshu Goutam</Link></span>

            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

