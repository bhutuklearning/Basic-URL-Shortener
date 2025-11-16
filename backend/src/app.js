import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import axios from "axios";
import authRoute from "./routes/auth.route.js";
import urlRoute from "./routes/url.route.js";
import adminRoute from "./routes/admin.route.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";
import { setupLogger } from "./config/logger.js";
import { ENV } from "./config/env.js";

dotenv.config();
const app = express();

// Trust first proxy (Render/Vercel) for Secure cookies
app.set("trust proxy", 1);

// Logging
setupLogger(app);

// Body & cookies
app.use(express.json());
app.use(cookieParser());

// CORS - normalize URLs by removing trailing slashes
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "https://url-shortener-basic.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
].filter(Boolean).map(url => url.replace(/\/$/, '')); // Remove trailing slashes

// CORS (credentials + strict origin)
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        // Normalize origin by removing trailing slash
        const normalizedOrigin = origin.replace(/\/$/, '');

        if (allowedOrigins.includes(normalizedOrigin) || /\.vercel\.app$/.test(normalizedOrigin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS not allowed for origin: " + origin));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    optionsSuccessStatus: 204,
};

// Apply CORS early and handle preflight
app.use(cors(corsOptions));


// Security headers (after CORS)
app.use(
    helmet({
        crossOriginResourcePolicy: false,
        crossOriginOpenerPolicy: false,
        crossOriginEmbedderPolicy: false,
    })
);



// Rate limiting
const apiLimiter = rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: "Too many requests, please try again later." },
});
const urlLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: "Too many URL requests, please try again later." },
});
app.use("/api/v1/", apiLimiter);
app.use("/api/v1/url", urlLimiter);

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/url", urlRoute);

// Health/test
app.get("/home", (req, res) => res.send("Hello World!"));
app.get("/health", (req, res) => res.status(200).json({ status: "OK" }));

// Pinging the server to keep it awake
// Endpoint to ping
app.get('/ping', (req, res) => {
    res.status(200).send('Pong!');
});

// Function to ping the server every 5 minutes
function pingServer() {
    const url = `${ENV.BACKEND_URL}/ping` || `http://localhost:${ENV.PORT}/ping`;
    axios.get(url)
        .then(() => console.log('Pinged server at', new Date().toLocaleString()))
        .catch(err => console.error('Error pinging server:', err.message));
}

// Ping every 12 minutes (720,000 milliseconds)
setInterval(pingServer, 720000);

// Errors
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
