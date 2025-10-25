import React from "react";
import { createBrowserRouter } from "react-router-dom";
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

const router = createBrowserRouter(
  [
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    {
      path: "/home",
      element: (
        <Layout>
          <AuthGuard>
            <HomePage />
          </AuthGuard>
        </Layout>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <Layout>
          <AuthGuard>
            <DashboardPage />
          </AuthGuard>
        </Layout>
      ),
    },
    {
      path: "/analytics",
      element: (
        <Layout>
          <AuthGuard>
            <AnalyticsPage />
          </AuthGuard>
        </Layout>
      ),
    },
    { path: "/:shortId", element: <RedirectPage /> },
    { path: "*", element: <NotFoundPage /> },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

export default router;