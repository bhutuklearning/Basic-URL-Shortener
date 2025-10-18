import { Link } from "react-router-dom";
import { FaLink, FaArrowRight } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center px-4">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <FaLink className="h-16 w-16 text-blue-600 mr-4" />
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900">
              URL Shortener
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create short, memorable links that are perfect for sharing. Track
            clicks and get detailed analytics for your URLs.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
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
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaArrowRight className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Analytics
            </h3>
            <p className="text-gray-600">
              Track clicks and get detailed analytics for your URLs.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLink className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Custom URLs
            </h3>
            <p className="text-gray-600">
              Create custom short IDs for your branded links.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors flex items-center justify-center space-x-2 text-lg"
          >
            <span>Get Started Free</span>
            <FaArrowRight className="h-5 w-5" />
          </Link>
          <Link
            to="/login"
            className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-8 rounded-lg border-2 border-gray-300 transition-colors text-lg"
          >
            Sign In
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-16 text-gray-500">
          <p>&copy; 2024 URL Shortener. Built with React & Tailwind CSS.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

