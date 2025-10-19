import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AuthGuard from "./components/AuthGuard";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
