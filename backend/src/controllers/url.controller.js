// // Updated code with error handling middleware and async wrapper
// import Url from "../models/url.model.js";
// import User from "../models/User.model.js";
// import { catchAsync, AppError, ValidationError, NotFoundError, AuthError } from "../middlewares/error.middleware.js";

// // Shorten a URL
// export const shortenUrl = catchAsync(async (req, res) => {
//     const { originalUrl, customShortId } = req.body;

//     if (!originalUrl) {
//         throw new ValidationError("Original URL is required");
//     }

//     const urlData = { originalUrl, user: req.user.id };

//     if (customShortId) {
//         const existing = await Url.findOne({ customShortId });
//         if (existing) {
//             throw new ValidationError("Custom short ID already in use");
//         }
//         urlData.shortId = customShortId;
//         urlData.customShortId = customShortId;
//     }

//     const url = await Url.create(urlData);
//     res.status(201).json({
//         success: true,
//         data: {
//             shortId: url.shortId,
//             shortUrl: `${req.protocol}://${req.get("host")}/api/v1/url/${url.shortId}`,
//             originalUrl: url.originalUrl,
//         },
//     });
// });

// // Redirect to original URL and track click
// export const redirectUrl = catchAsync(async (req, res) => {
//     const { shortId } = req.params;

//     const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip;

//     const url = await Url.findOneAndUpdate(
//         { shortId },
//         {
//             $push: {
//                 clicks: {
//                     timestamp: new Date(),
//                     referrer: req.get("Referrer") || "Direct",
//                     ip: ip.replace("::ffff:", ""),
//                 },
//             },
//         },
//         { new: true }
//     );

//     if (!url) {
//         throw new NotFoundError("URL not found");
//     }

//     res.redirect(url.originalUrl);
// });

// // Get analytics for a URL
// export const getUrlAnalytics = catchAsync(async (req, res) => {
//     const { shortId } = req.params;

//     const url = await Url.findOne({ shortId, user: req.user.id });
//     if (!url) {
//         throw new NotFoundError("URL not found");
//     }

//     const uniqueIps = [...new Set(url.clicks.map(click => click.ip))];
//     const referrers = [...new Set(url.clicks.map(click => click.referrer))];

//     res.json({
//         success: true,
//         data: {
//             clicks: url.clicks.length,
//             uniqueClicks: uniqueIps.length,
//             referrers,
//             details: url.clicks,
//         },
//     });
// });

// // Get all URLs for the logged-in user using populate of virtual field
// export const getMyUrlsPopulate = catchAsync(async (req, res) => {
//     if (!req.user) {
//         throw new AuthError("User is not authenticated");
//     }

//     const user = await User.findById(req.user.id).populate({
//         path: "urls",
//         options: { sort: { createdAt: -1 } },
//     });

//     if (!user) {
//         throw new NotFoundError("User not found");
//     }

//     res.json({
//         success: true,
//         data: user.urls.map((url) => ({
//             shortId: url.shortId,
//             shortUrl: `${req.protocol}://${req.get("host")}/api/v1/url/${url.shortId}`,
//             originalUrl: url.originalUrl,
//             clicks: url.clicks.length,
//             createdAt: url.createdAt,
//         })),
//     });
// });

// // Get all URLs for the logged-in user using direct query
// export const getMyUrlsDirect = catchAsync(async (req, res) => {
//     if (!req.user) {
//         throw new AuthError("User is not authenticated");
//     }

//     const urls = await Url.find({ user: req.user.id }).sort({ createdAt: -1 });

//     res.json({
//         success: true,
//         data: urls.map((url) => ({
//             shortId: url.shortId,
//             shortUrl: `${req.protocol}://${req.get("host")}/api/v1/url/${url.shortId}`,
//             originalUrl: url.originalUrl,
//             clicks: url.clicks.length,
//             createdAt: url.createdAt,
//         })),
//     });
// });








// Updated URL controller with frontend domain support
import Url from "../models/url.model.js";
import User from "../models/User.model.js";
import { catchAsync, AppError, ValidationError, NotFoundError, AuthError } from "../middlewares/error.middleware.js";
import { ENV } from "../config/env.js";

// Helper function to generate short URL with frontend domain
const generateShortUrl = (shortId, req) => {
    // Use frontend domain from environment variables
    let frontendDomain = ENV.FRONTEND_URL;

    if (!frontendDomain) {
        // In production, FRONTEND_URL must be set!
        if (ENV.NODE_ENV === 'production') {
            console.warn('WARNING: FRONTEND_URL is not set in production! Short URLs may be incorrect.');
        }

        // Fallback: try to infer from request headers
        // This works for development but is unreliable in production
        const host = req.get("host") || "localhost";
        const protocol = req.protocol || "http";
        const origin = req.get("origin");

        // If we have an origin header (from frontend request), use it
        if (origin) {
            frontendDomain = origin;
        } else {
            // Last resort: use request host (won't work correctly in production if backend and frontend are different domains)
            frontendDomain = `${protocol}:/${host}`;
        }
    }

    // Remove any trailing slashes from the domain and ensure proper URL format
    const cleanDomain = frontendDomain.replace(/\/+$/, '');
    return `${cleanDomain}/${shortId}`;
};

// Shorten a URL
export const shortenUrl = catchAsync(async (req, res) => {
    const { originalUrl, customShortId } = req.body;

    if (!originalUrl) {
        throw new ValidationError("Original URL is required");
    }

    // Validate URL format
    try {
        new URL(originalUrl);
    } catch (err) {
        throw new ValidationError("Invalid URL format");
    }

    const urlData = { originalUrl, user: req.user.id };

    if (customShortId) {
        // Validate custom short ID format
        if (!/^[a-zA-Z0-9_-]{3,30}$/.test(customShortId)) {
            throw new ValidationError("Custom short ID can only contain letters, numbers, underscores, and hyphens (3-30 characters)");
        }

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
            shortUrl: generateShortUrl(url.shortId, req),
            originalUrl: url.originalUrl,
        },
    });
});

// Get original URL (for frontend use) - tracks click and returns JSON
export const getOriginalUrl = catchAsync(async (req, res) => {
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
                    userAgent: req.get("User-Agent"),
                },
            },
        },
        { new: true }
    );

    if (!url) {
        throw new NotFoundError("URL not found");
    }

    // Return original URL as JSON (for frontend to handle redirect)
    res.json({
        success: true,
        data: {
            originalUrl: url.originalUrl,
            shortId: url.shortId,
        },
    });
});

// Redirect to original URL and track click (for direct browser requests)
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
                    userAgent: req.get("User-Agent"),
                },
            },
        },
        { new: true }
    );

    if (!url) {
        throw new NotFoundError("URL not found");
    }

    // Redirect to original URL
    res.redirect(301, url.originalUrl);
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
            shortUrl: generateShortUrl(url.shortId, req),
            originalUrl: url.originalUrl,
            shortId: url.shortId,
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
            shortUrl: generateShortUrl(url.shortId, req),
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
            shortUrl: generateShortUrl(url.shortId, req),
            originalUrl: url.originalUrl,
            clicks: url.clicks.length,
            createdAt: url.createdAt,
        })),
    });
});
