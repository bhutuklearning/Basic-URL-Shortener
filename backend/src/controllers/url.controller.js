// Updated code with error handling middleware and async wrapper
import Url from "../models/url.model.js";
import User from "../models/User.model.js";
import { catchAsync, AppError, ValidationError, NotFoundError, AuthError } from "../middlewares/error.middleware.js";

// Shorten a URL
export const shortenUrl = catchAsync(async (req, res) => {
    const { originalUrl, customShortId } = req.body;

    if (!originalUrl) {
        throw new ValidationError("Original URL is required");
    }

    const urlData = { originalUrl, user: req.user.id };

    if (customShortId) {
        const existing = await Url.findOne({ customShortId });
        if (existing) {
            throw new ValidationError("Custom short ID already in use");
        }
        urlData.shortId = customShortId;
        urlData.customShortId = customShortId;
    }

    const url = await Url.create(urlData);
    res.status(201).json({
        success: true,
        data: {
            shortId: url.shortId,
            shortUrl: `${req.protocol}://${req.get("host")}/api/v1/url/${url.shortId}`,
            originalUrl: url.originalUrl,
        },
    });
});

// Redirect to original URL and track click
export const redirectUrl = catchAsync(async (req, res) => {
    const { shortId } = req.params;

    const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip;

    const url = await Url.findOneAndUpdate(
        { shortId },
        {
            $push: {
                clicks: {
                    timestamp: new Date(),
                    referrer: req.get("Referrer") || "Direct",
                    ip: ip.replace("::ffff:", ""),
                },
            },
        },
        { new: true }
    );

    if (!url) {
        throw new NotFoundError("URL not found");
    }

    res.redirect(url.originalUrl);
});

// Get analytics for a URL
export const getUrlAnalytics = catchAsync(async (req, res) => {
    const { shortId } = req.params;

    const url = await Url.findOne({ shortId, user: req.user.id });
    if (!url) {
        throw new NotFoundError("URL not found");
    }

    const uniqueIps = [...new Set(url.clicks.map(click => click.ip))];
    const referrers = [...new Set(url.clicks.map(click => click.referrer))];

    res.json({
        success: true,
        data: {
            clicks: url.clicks.length,
            uniqueClicks: uniqueIps.length,
            referrers,
            details: url.clicks,
        },
    });
});

// Get all URLs for the logged-in user using populate of virtual field
export const getMyUrlsPopulate = catchAsync(async (req, res) => {
    if (!req.user) {
        throw new AuthError("User is not authenticated");
    }

    const user = await User.findById(req.user.id).populate({
        path: "urls",
        options: { sort: { createdAt: -1 } },
    });

    if (!user) {
        throw new NotFoundError("User not found");
    }

    res.json({
        success: true,
        data: user.urls.map((url) => ({
            shortId: url.shortId,
            shortUrl: `${req.protocol}://${req.get("host")}/api/v1/url/${url.shortId}`,
            originalUrl: url.originalUrl,
            clicks: url.clicks.length,
            createdAt: url.createdAt,
        })),
    });
});

// Get all URLs for the logged-in user using direct query
export const getMyUrlsDirect = catchAsync(async (req, res) => {
    if (!req.user) {
        throw new AuthError("User is not authenticated");
    }

    const urls = await Url.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.json({
        success: true,
        data: urls.map((url) => ({
            shortId: url.shortId,
            shortUrl: `${req.protocol}://${req.get("host")}/api/v1/url/${url.shortId}`,
            originalUrl: url.originalUrl,
            clicks: url.clicks.length,
            createdAt: url.createdAt,
        })),
    });
});
