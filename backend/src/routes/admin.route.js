// src/routes/admin.route.js
import express from "express";
import { getAllUrls, getAllUsers, getAllUrlsAnalytics } from "../controllers/admin.controller.js";
import { isAdmin, adminBasicAuth } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Admin routes - require authentication and admin status
router.use(protect); // First protect the routes

// Route 1: Get all URLs
router.get("/urls", isAdmin, getAllUrls);

// Route 2: Get all users
router.get("/users", isAdmin, getAllUsers);

// Route 3: Get all URLs analytics
router.get("/urls/analytics", isAdmin, getAllUrlsAnalytics);

// Alternative route using basic auth (for API clients)
router.get("/basic/urls", adminBasicAuth, getAllUrls);

export default router;
