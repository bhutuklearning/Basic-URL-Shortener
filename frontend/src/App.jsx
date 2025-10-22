import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import AuthGuard from "./components/AuthGuard";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import NotFoundPage from "./pages/NotFoundPage";
import RedirectPage from "./pages/RedirectPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Public routes - no authentication required */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected routes - authentication required */}
          <Route
            path="/home"
            element={
              <Layout>
                <AuthGuard>
                  <HomePage />
                </AuthGuard>
              </Layout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <AuthGuard>
                  <DashboardPage />
                </AuthGuard>
              </Layout>
            }
          />
          <Route
            path="/analytics"
            element={
              <Layout>
                <AuthGuard>
                  <AnalyticsPage />
                </AuthGuard>
              </Layout>
            }
          />
          {/* Redirect route for shortened URLs */}
          <Route path="/:shortId" element={<RedirectPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
