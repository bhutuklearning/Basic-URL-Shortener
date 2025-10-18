import express from "express";
import {
    shortenUrl,
    redirectUrl,
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
// Redirect to original URL (public)
router.get("/:shortId", redirectUrl);
// Get analytics (protected)
router.get("/:shortId/analytics", protect, getUrlAnalytics);

router.get("/myurls/populate", protect, getMyUrlsPopulate); // Using virtual field
router.get("/myurls/direct", protect, getMyUrlsDirect); // Direct query



export default router;