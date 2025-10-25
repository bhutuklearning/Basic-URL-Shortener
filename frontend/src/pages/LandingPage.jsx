import React from "react";
import { Link } from "react-router-dom";
import { FaLink, FaArrowRight } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Header / Hero */}
      <header className="px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <FaLink className="h-14 w-14 sm:h-16 sm:w-16 text-blue-600 mr-3" aria-hidden="true" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              URL Shortener
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto">
            Create short, memorable links perfect for sharing. Track clicks and get detailed analytics for your URLs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-lg bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
            >
              <span className="mr-2">Get Started Free</span>
              <FaArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 sm:py-4 sm:px-8 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
            >
              Log In
            </Link>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <article className="bg-white rounded-xl shadow-lg p-6 md:p-7">
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLink className="h-7 w-7 text-blue-600" aria-hidden="true" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 text-center">Fast & Simple</h3>
            <p className="text-gray-600 text-center">Create short URLs in seconds with our simple interface.</p>
          </article>
          <article className="bg-white rounded-xl shadow-lg p-6 md:p-7">
            <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaArrowRight className="h-7 w-7 text-green-600" aria-hidden="true" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 text-center">Analytics</h3>
            <p className="text-gray-600 text-center">Track clicks and get detailed analytics for your URLs.</p>
          </article>
          <article className="bg-white rounded-xl shadow-lg p-6 md:p-7">
            <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLink className="h-7 w-7 text-purple-600" aria-hidden="true" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 text-center">Custom URLs</h3>
            <p className="text-gray-600 text-center">Create custom short IDs for your branded links.</p>
          </article>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Basic URL Shortener.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

