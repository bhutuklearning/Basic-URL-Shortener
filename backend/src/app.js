import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import authRoute from "./routes/auth.route.js";
import urlRoute from "./routes/url.route.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";
import { setupLogger } from "./config/logger.js";

dotenv.config();
const app = express();

// Trust first proxy (Render/Vercel) for Secure cookies
app.set("trust proxy", 1);

// Logging
setupLogger(app);

// Allowed origins
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://url-shortener-basic.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

// CORS (credentials + strict origin)
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
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
app.options("*", cors(corsOptions));

// Security headers (after CORS)
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// Body & cookies
app.use(express.json());
app.use(cookieParser());

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
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many URL requests, please try again later." },
});
app.use("/api/v1/", apiLimiter);
app.use("/api/v1/url", urlLimiter);

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/url", urlRoute);

// Health/test
app.get("/home", (req, res) => res.send("Hello World!"));
app.get("/health", (req, res) => res.status(200).json({ status: "OK" }));

// Errors
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
