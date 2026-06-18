import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLink, FaChartLine, FaCog, FaArrowRight, FaStar, FaUsers, FaRocket, FaShieldAlt, FaClock } from 'react-icons/fa';
import { FaGithub, FaTwitter, FaLinkedin, FaHeart, FaCode } from 'react-icons/fa';
import ThemeToggle from "../components/ThemeToggle";

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      icon: <FaLink className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Lightning Fast",
      description: "Shorten URLs in milliseconds with our optimized infrastructure"
    },

    {
      icon: <FaChartLine className="h-8 w-8 text-green-600 dark:text-green-400" />,
      title: "Great Analytics",
      description: "Track clicks, visitors, and engagement with detailed insights"
    },

    {
      icon: <FaCog className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
      title: "Custom URLs",
      description: "Create memorable, branded short links for your business"
    },
  ];

  const stats = [
    { number: "10K+", label: "URLs Shortened" },
    { number: "8K+", label: "Clicks Tracked" },
    { number: "90.5%", label: "Uptime" },
    { number: "1K+", label: "Happy Users" }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 dark:bg-gray-950 dark:from-gray-950 dark:via-blue-950 dark:to-indigo-950 overflow-hidden text-gray-900 dark:text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{
            left: `${mousePosition.x * 0.05}px`,
            top: `${mousePosition.y * 0.05}px`,
          }}
        />
        <div
          className="absolute w-96 h-96 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{
            right: `${mousePosition.x * 0.03}px`,
            bottom: `${mousePosition.y * 0.03}px`,
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/60 dark:border-gray-700/60 shadow-sm dark:shadow-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">

            {/* Logo */}
            <Link to="/home" className="flex items-center space-x-2 font-bold text-xl text-gray-900 dark:text-white">
              <FaLink className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              <span>URL Shortener</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Sign In</Link>
              <Link to="/register" className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition">
                Get Started Free
              </Link>
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
            >
              {isMenuOpen ? (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-gray-900/50">
            <div className="px-6 py-6 flex flex-col items-center space-y-5 text-center">

              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-800 dark:text-gray-100 text-lg font-medium hover:text-blue-600 transition"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg text-base font-semibold shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
              >
                Get Started Free
              </Link>

              <ThemeToggle />

            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 lg:pt-24 pb-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-6 lg:mb-8">
                Shorten Your Links,
                <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                  Expand Your Reach
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
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
                className="group bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 px-8 lg:px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl dark:shadow-gray-900/50 hover:shadow-2xl hover:scale-105 border-2 border-blue-100 dark:border-blue-800 flex items-center space-x-3"
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
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 lg:py-32 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to
              <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block mb-3 pb-1.5">
                Manage Your Links
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powerful features designed for professionals who demand the best from their link management tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl dark:shadow-gray-900/50 hover:shadow-2xl transition-all duration-1000 hover:-translate-y-2 border border-white/20 dark:border-gray-800 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <div><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3></div>
                <div><p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Transform Your Links?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 lg:mb-12 max-w-2xl mx-auto">
              Join thousands of users who have already revolutionized their link management.
              Start your journey today with our free plan.
            </p>
            <Link
              to="/register"
              className="group inline-flex items-center space-x-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 lg:px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
            >
              <span>Get Started Now</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-linear-to-r from-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-1 py-1">
          <div className="border-t border-gray-700 mt-2 pt-4 mb-2 pb-4 flex flex-col md:flex-row justify-between items-center">
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
