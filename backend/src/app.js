// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import rateLimit from "express-rate-limit";
// import authRoute from "./routes/auth.route.js";
// import urlRoute from "./routes/url.route.js";
// import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";
// // import { requestIdMiddleware, devLogger, prodLogger, apiLogger } from "./config/logger.js";
// import { setupLogger, urlShortenerLogger, setupErrorLogger } from "./config/logger.js";

// //import morgan from "morgan";

// dotenv.config();
// const app = express();

// // Trust proxy (for real IP detection)
// // Trust only specific proxies (e.g., localhost for testing)
// app.set("trust proxy", ["127.0.0.1", "::1"]);

// // // Add request ID middleware before other middlewares
// // app.use(requestIdMiddleware);

// // // Replace the basic app.use(morgan("dev")) with this:
// // if (process.env.NODE_ENV === "development") {
// //     //app.use(morgan("dev")); // Color-coded, human-readable format for development
// //     app.use(devLogger);
// // } else {
// //     //app.use(morgan("combined")); // Standard Apache format for production
// //     app.use(prodLogger);
// //     app.use(apiLogger); // Additional API-specific logging
// // }

// // Setup logger (this handles both dev and prod logging)
// setupLogger(app);

// // Middlewares (order matters!)
// app.use(express.json());
// app.use(cors());
// app.use(cookieParser());
// app.use(helmet());

// // Rate limiters
// const apiLimiter = rateLimit({
//     windowMs: 3 * 60 * 1000, // 3 minutes
//     max: 16, // 16 requests per window
//     standardHeaders: true,
//     legacyHeaders: false,
//     message: {
//         success: false,
//         error: "Too many requests, please try again later.",
//     },
// });

// const urlLimiter = rateLimit({
//     windowMs: 1 * 60 * 1000, // 1 minute
//     max: 3, // Reduced to 2 requests per minute for testing
//     standardHeaders: true,
//     legacyHeaders: false,
//     message: {
//         success: false,
//         error: "Too many URL shorten requests, please try again later.",
//     },
// });

// // Apply rate limiters BEFORE routes
// app.use("/api/v1/", apiLimiter);
// app.use("/api/v1/url", urlLimiter);

// // Routes
// app.use("/api/v1/auth", authRoute);
// app.use("/api/v1/url", urlRoute);

// app.get("/home", (req, res) => {
//     res.send("Hello World!");
// });

// // 404 handler for undefined routes
// app.use(notFoundHandler);

// // Error handler middleware (must be last)
// app.use(errorHandler);

// export default app;














import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import authRoute from "./routes/auth.route.js";
import urlRoute from "./routes/url.route.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";
import { setupLogger, urlShortenerLogger, setupErrorLogger } from "./config/logger.js";

dotenv.config();
const app = express();

// Trust proxy (for real IP detection)
// Trust first proxy (Render/Vercel), required for secure cookies
app.set("trust proxy", 1);

// Setup logger (this handles both dev and prod logging)
setupLogger(app);

// // Configure CORS properly for your React frontend
// const corsOptions = {
//     origin: [
//         'http://localhost:5173',  // Your React dev server
//         'http://localhost:9000',  // Your backend
//         process.env.FRONTEND_URL || 'http://localhost:5173'  // Production frontend URL
//     ],
//     credentials: true,  // Allow cookies to be sent
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// };


const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL,
].filter(Boolean);

const isAllowedOrigin = (origin) => {
    try {
        if (!origin) return true; // non-browser or same-origin
        const url = new URL(origin);
        const host = url.hostname;
        // Allow exact matches
        if (allowedOrigins.includes(origin)) return true;
        // Allow any Vercel preview/production domain
        if (host.endsWith('.vercel.app')) return true;
        return false;
    } catch {
        return false;
    }
};

const corsOptions = {
    origin: (origin, callback) => {
        if (isAllowedOrigin(origin)) return callback(null, true);
        return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 204,
};

// Ensure preflight requests are handled
app.options('*', cors(corsOptions));



// Middlewares (order matters!)
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet());

// Rate limiters
const apiLimiter = rateLimit({
    windowMs: 3 * 60 * 1000, // 3 minutes
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        error: "Too many requests, please try again later.",
    },
});

const urlLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        error: "Too many URL shorten requests, please try again later.",
    },
});

// Apply rate limiters BEFORE routes
app.use("/api/v1/", apiLimiter);
app.use("/api/v1/url", urlLimiter);

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/url", urlRoute);

app.get("/home", (req, res) => {
    res.send("Hello World!");
});

// Health check endpoint (excluded from logging)
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});

// 404 handler for undefined routes
app.use(notFoundHandler);

// Error handler middleware (must be last)
app.use(errorHandler);

export default app;