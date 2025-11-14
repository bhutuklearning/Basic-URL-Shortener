import express from "express";
import {
    shortenUrl,
    redirectUrl,
    getOriginalUrl,
    getUrlAnalytics,
    getMyUrlsPopulate,
    getMyUrlsDirect,
} from "../controllers/url.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { urlShortenerLogger } from "../config/logger.js";


const router = express.Router();

// Apply URL shortener specific logger to these routes
router.use(urlShortenerLogger);

// Home Route for URL service
router.get("/", (req, res) => {
    res.send("Welcome to the URL Shortener Service.");
});
// Shorten a URL (protected)
router.post("/", protect, shortenUrl);

// Specific routes must be defined before the generic :shortId route
// Get original URL as JSON (for frontend use) - tracks click
router.get("/:shortId/original", getOriginalUrl);
// Get analytics (protected)
router.get("/:shortId/analytics", protect, getUrlAnalytics);

// User URLs routes
router.get("/myurls/populate", protect, getMyUrlsPopulate); // Using virtual field
router.get("/myurls/direct", protect, getMyUrlsDirect); // Direct query

// Redirect to original URL (for direct browser requests) - tracks click
// This must be last to avoid matching specific routes above
router.get("/:shortId", redirectUrl);



export default router;