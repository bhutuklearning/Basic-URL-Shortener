// // src/controllers/admin.controller.js
// import Url from "../models/url.model.js";
// import User from "../models/User.model.js";
// import { catchAsync, NotFoundError } from "../middlewares/error.middleware.js";

// // Get all URLs (admin only)
// export const getAllUrls = catchAsync(async (req, res) => {
//     const urls = await Url.find().sort({ createdAt: -1 }).populate('user', 'userName email');

//     res.json({
//         success: true,
//         count: urls.length,
//         data: urls.map(url => ({
//             shortId: url.shortId,
//             shortUrl: `${process.env.FRONTEND_URL}/${url.shortId}`,
//             originalUrl: url.originalUrl,
//             clicks: url.clicks.length,
//             createdAt: url.createdAt,
//             user: url.user ? {
//                 id: url.user._id,
//                 userName: url.user.userName,
//                 email: url.user.email
//             } : null
//         }))
//     });
// });

// // Get all users (admin only)
// export const getAllUsers = catchAsync(async (req, res) => {
//     const users = await User.find().sort({ createdAt: -1 });

//     res.json({
//         success: true,
//         count: users.length,
//         data: users.map(user => ({
//             id: user._id,
//             userName: user.userName,
//             email: user.email,
//             createdAt: user.createdAt,
//             urlCount: user.urls.length
//         }))
//     });
// });

// // Get detailed analytics for all URLs (admin only)
// export const getAllUrlsAnalytics = catchAsync(async (req, res) => {
//     const urls = await Url.find().sort({ createdAt: -1 });

//     const analytics = urls.map(url => {
//         const uniqueIps = [...new Set(url.clicks.map(click => click.ip))];
//         const referrers = [...new Set(url.clicks.map(click => click.referrer))];

//         return {
//             shortId: url.shortId,
//             shortUrl: `${process.env.FRONTEND_URL}/${url.shortId}`,
//             originalUrl: url.originalUrl,
//             clicks: url.clicks.length,
//             uniqueClicks: uniqueIps.length,
//             referrers: referrers,
//             createdAt: url.createdAt
//         };
//     });

//     res.json({
//         success: true,
//         count: analytics.length,
//         data: analytics
//     });
// });










// src/controllers/admin.controller.js
import Url from "../models/url.model.js";
import User from "../models/User.model.js";
import { catchAsync, NotFoundError } from "../middlewares/error.middleware.js";

// Get all URLs (admin only)
export const getAllUrls = catchAsync(async (req, res) => {
    const urls = await Url.find().sort({ createdAt: -1 }).populate('user', 'userName email');

    res.json({
        success: true,
        count: urls.length,
        data: urls.map(url => ({
            shortId: url.shortId,
            shortUrl: `${process.env.FRONTEND_URL}/${url.shortId}`,
            originalUrl: url.originalUrl,
            clicks: url.clicks?.length || 0,  // Safely handle undefined clicks
            createdAt: url.createdAt,
            user: url.user ? {
                id: url.user._id,
                userName: url.user.userName,
                email: url.user.email
            } : null
        }))
    });
});

// Get all users (admin only)
export const getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find().sort({ createdAt: -1 });

    // Use Promise.all to fetch URL counts for each user
    const usersWithUrlCounts = await Promise.all(
        users.map(async (user) => {
            const urlCount = await Url.countDocuments({ user: user._id });
            return {
                id: user._id,
                userName: user.userName,
                email: user.email,
                createdAt: user.createdAt,
                urlCount: urlCount
            };
        })
    );

    res.json({
        success: true,
        count: usersWithUrlCounts.length,
        data: usersWithUrlCounts
    });
});

// Get detailed analytics for all URLs (admin only)
export const getAllUrlsAnalytics = catchAsync(async (req, res) => {
    const urls = await Url.find().sort({ createdAt: -1 });

    const analytics = urls.map(url => {
        // Safely handle undefined clicks array
        const clicks = url.clicks || [];
        const uniqueIps = [...new Set(clicks.map(click => click.ip))];
        const referrers = [...new Set(clicks.map(click => click.referrer || "Direct"))];

        return {
            shortId: url.shortId,
            shortUrl: `${process.env.FRONTEND_URL}/${url.shortId}`,
            originalUrl: url.originalUrl,
            clicks: clicks.length,
            uniqueClicks: uniqueIps.length,
            referrers: referrers,
            createdAt: url.createdAt
        };
    });

    res.json({
        success: true,
        count: analytics.length,
        data: analytics
    });
});
