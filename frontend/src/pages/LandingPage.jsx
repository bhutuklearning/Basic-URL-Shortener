import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLink, FaChartLine, FaCog, FaArrowRight, FaStar, FaUsers, FaRocket, FaShieldAlt, FaClock } from 'react-icons/fa';
import { FaGithub, FaTwitter, FaLinkedin, FaHeart, FaCode } from 'react-icons/fa';

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
      icon: <FaLink className="h-8 w-8 text-blue-600" />,
      title: "Lightning Fast",
      description: "Shorten URLs in milliseconds with our optimized infrastructure"
    },

    {
      icon: <FaChartLine className="h-8 w-8 text-green-600" />,
      title: "Great Analytics",
      description: "Track clicks, visitors, and engagement with detailed insights"
    },

    {
      icon: <FaCog className="h-8 w-8 text-purple-600" />,
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
      <nav className="relative z-20 bg-white/80 backdrop-blur-lg border-b border-gray-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">

            {/* Logo */}
            <Link to="/home" className="flex items-center space-x-2 font-bold text-xl text-gray-900">
              <FaLink className="h-7 w-7 text-blue-600" />
              <span>URL Shortener</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/login" className="text-gray-600 hover:text-blue-600 transition">Sign In</Link>
              <Link to="/register" className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition">
                Get Started Free
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-blue-600 transition"
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
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg">
            <div className="px-6 py-6 flex flex-col items-center space-y-5 text-center">

              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-800 text-lg font-medium hover:text-blue-600 transition"
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

            </div>
          </div>
        )}
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
              <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block mb-3 pb-1.5">
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
                <div><h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3></div>
                <div><p className="text-gray-600 leading-relaxed">{feature.description}</p></div>
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













// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FaLink, FaChartLine, FaCog, FaArrowRight, FaRocket, FaClock, FaGithub, FaTwitter, FaLinkedin, FaHeart } from 'react-icons/fa';

// const LandingPage = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const currentYear = new Date().getFullYear();

//   useEffect(() => {
//     setIsVisible(true);

//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   const features = [
//     { icon: <FaLink className="h-8 w-8 text-blue-600" />, title: "Lightning Fast", description: "Shorten URLs in milliseconds with our optimized infrastructure" },
//     { icon: <FaChartLine className="h-8 w-8 text-green-600" />, title: "Great Analytics", description: "Track clicks, visitors, and engagement with detailed insights" },
//     { icon: <FaCog className="h-8 w-8 text-purple-600" />, title: "Custom URLs", description: "Create memorable, branded short links for your business" },
//     { icon: <FaClock className="h-8 w-8 text-orange-600" />, title: "Check Stats", description: "Monitor your links performance with live analytics dashboard" },
//   ];

//   const stats = [
//     { number: "10M+", label: "URLs Shortened" },
//     { number: "50M+", label: "Clicks Tracked" },
//     { number: "99.9%", label: "Uptime" },
//     { number: "50K+", label: "Happy Users" }
//   ];

//   return (
//     <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden relative">

//       {/* Animated Floating Background */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div
//           className="absolute w-[450px] h-[450px] bg-blue-300/30 rounded-full blur-3xl animate-[float_18s_ease-in-out_infinite]"
//           style={{ left: `${mousePosition.x * 0.04}px`, top: `${mousePosition.y * 0.04}px` }}
//         />
//         <div
//           className="absolute w-[450px] h-[450px] bg-purple-300/30 rounded-full blur-3xl animate-[float_22s_ease-in-out_infinite]"
//           style={{ right: `${mousePosition.x * 0.03}px`, bottom: `${mousePosition.y * 0.03}px` }}
//         />
//       </div>

//       {/* NAVIGATION */}
//       <nav className="relative z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16 lg:h-20">

//             <Link to="/home" className="flex items-center space-x-2 font-bold text-xl text-gray-900">
//               <FaLink className="h-7 w-7 text-blue-600" />
//               <span>URL Shortener</span>
//             </Link>

//             <div className="hidden md:flex items-center space-x-8">
//               <Link to="/login" className="text-gray-600 hover:text-blue-600 transition">Sign In</Link>
//               <Link to="/register" className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
//                 Get Started Free
//               </Link>
//             </div>

//             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-700 hover:text-blue-600 transition">
//               {isMenuOpen ? (
//                 <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               ) : (
//                 <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Dropdown Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-lg animate-fadeSlideDown">
//             <div className="px-6 py-6 flex flex-col items-center space-y-5 text-center">
//               <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-gray-800 text-lg font-medium hover:text-blue-600 transition">Sign In</Link>
//               <Link to="/register" onClick={() => setIsMenuOpen(false)} className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-xl hover:scale-[1.03] transition-all">
//                 Get Started Free
//               </Link>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* HERO SECTION */}
//       <section className="relative z-20 pt-20 lg:pt-28 text-center transition-all duration-1000">
//         <div className={`max-w-4xl mx-auto px-6 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} transition-all duration-1000`}>
//           <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
//             Shorten Your Links,
//             <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">Expand Your Reach</span>
//           </h1>

//           <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">Transform long URLs into clean, shareable links with branding, analytics, and real-time insights.</p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link to="/register" className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl shadow-xl hover:shadow-blue-500/30 hover:scale-105 flex items-center space-x-2 transition-all">
//               <span>Start For Free</span>
//               <FaArrowRight />
//             </Link>
//             <Link to="/login" className="bg-white border border-blue-200 text-blue-600 px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 flex items-center space-x-2 transition-all">
//               <span>Explore Demo</span>
//               <FaRocket />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* STATS */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto mt-20 text-center animate-fadeUp delay-500">
//         {stats.map((stat, i) => (
//           <div key={i}>
//             <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
//             <div className="text-gray-600 text-sm">{stat.label}</div>
//           </div>
//         ))}
//       </div>

//       {/* FEATURES */}
//       <section className="mt-28 bg-white/70 backdrop-blur-xl py-20">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
//           {features.map((f, i) => (
//             <div key={i} className="bg-white/80 p-8 rounded-2xl shadow-xl border backdrop-blur-sm hover:-translate-y-2 hover:shadow-2xl transition-all animate-fadeUp"
//               style={{ animationDelay: `${i * 120}ms` }}>
//               <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-linear-to-r from-blue-50 to-indigo-50 mb-6">
//                 {f.icon}
//               </div>
//               <h3 className="text-xl font-bold mb-2">{f.title}</h3>
//               <p className="text-gray-600">{f.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="text-center py-24">
//         <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Links?</h2>
//         <Link to="/register" className="inline-flex bg-linear-to-r from-blue-600 to-indigo-600 px-10 py-4 rounded-xl text-white font-semibold shadow-xl hover:scale-105 hover:shadow-blue-500/30 transition-all">
//           Get Started Now <FaArrowRight className="ml-2" />
//         </Link>
//       </section>

//       {/* FOOTER */}
//       <footer className="bg-linear-to-r from-gray-800 to-gray-900 text-white py-10 text-center">
//         <p className="text-gray-400 text-sm">© {currentYear} URL Shortener • Built with <FaHeart className="text-red-500 inline" /> by Amritanshu Goutam</p>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;
