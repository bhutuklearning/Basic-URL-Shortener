// import morgan from 'morgan';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Get directory name
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Create logs directory if it doesn't exist
// const logsDir = path.join(__dirname, '../logs');
// if (!fs.existsSync(logsDir)) {
//     fs.mkdirSync(logsDir);
// }

// // Create a write stream for access logs in production
// const accessLogStream = fs.createWriteStream(
//     path.join(logsDir, 'access.log'),
//     { flags: 'a' } // 'a' means append
// );

// // Custom token for user ID
// morgan.token('user', (req) => {
//     return req.user ? req.user.id : 'anonymous';
// });

// // Custom token for request ID
// morgan.token('id', (req) => {
//     return req.id || 'no-id';
// });

// // Middleware to add request ID to each request
// export const requestIdMiddleware = (req, res, next) => {
//     req.id = Math.random().toString(36).substring(2, 9);
//     next();
// };

// // Development logger
// export const devLogger = morgan('dev');

// // Production logger (logs to file)
// export const prodLogger = morgan('combined', { stream: accessLogStream });

// // API-specific logger with custom format
// const apiFormat = ':id [:date[clf]] ":method :url" :status :response-time ms - :user';
// export const apiLogger = morgan(apiFormat, {
//     skip: (req) => req.originalUrl === '/health' // Skip health checks
// });











import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createStream } from 'rotating-file-stream';

// Get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Create subdirectories for dev and prod logs
const devLogsDir = path.join(logsDir, 'development');
const prodLogsDir = path.join(logsDir, 'production');

if (!fs.existsSync(devLogsDir)) {
    fs.mkdirSync(devLogsDir, { recursive: true });
}
if (!fs.existsSync(prodLogsDir)) {
    fs.mkdirSync(prodLogsDir, { recursive: true });
}

// Custom tokens with improved formatting
morgan.token('user', (req) => {
    // Show username if available, otherwise user ID, otherwise 'anonymous'
    if (req.user) {
        return req.user.userName ? req.user.userName : req.user.id;
    }
    return 'anonymous';
});

morgan.token('id', (req) => {
    return req.id || 'no-id';
});

morgan.token('shortId', (req) => {
    return req.body?.shortId || req.params?.shortId || 'none';
});

morgan.token('originalUrl', (req) => {
    return req.body?.originalUrl || 'none';
});

morgan.token('ip', (req) => {
    // Improved IP detection that handles IPv6 and proxy headers
    let ip = req.headers['x-forwarded-for'] ||
        req.headers['x-real-ip'] ||
        req.connection?.remoteAddress ||
        req.socket?.remoteAddress ||
        req.connection?.socket?.remoteAddress ||
        '';

    // Handle IPv6 addresses (like ::1 for localhost)
    if (ip.substr(0, 7) === "::ffff:") {
        ip = ip.substr(7);
    }

    // Handle multiple IPs from x-forwarded-for
    if (ip.includes(',')) {
        ip = ip.split(',')[0].trim();
    }

    return ip || 'unknown-ip';
});

morgan.token('userAgent', (req) => {
    return req.headers['user-agent']?.substring(0, 50) || 'unknown-user-agent';
});

morgan.token('localTime', (req) => {
    // Format timestamp in a more readable local time format
    return new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata', // Set to your timezone
        hour12: false,
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
});

// Middleware to add request ID to each request
export const requestIdMiddleware = (req, res, next) => {
    req.id = Math.random().toString(36).substring(2, 9);
    next();
};

// Create rotating file streams for different environments
const createRotatingStream = (dir, filename) => {
    return createStream(filename, {
        interval: '1d', // Rotate daily
        path: dir,
        maxFiles: 30, // Keep 30 days of logs
    });
};

// Development log streams
const devAccessLogStream = createRotatingStream(devLogsDir, 'access.log');
const devErrorLogStream = createRotatingStream(devLogsDir, 'error.log');

// Production log streams
const prodAccessLogStream = createRotatingStream(prodLogsDir, 'access.log');
const prodErrorLogStream = createRotatingStream(prodLogsDir, 'error.log');

// Format for console (development) - more readable
const consoleFormat = ':method :url :status :response-time ms - :ip :user';

// Format for file logs - very detailed and organized
const fileFormat = '[:localTime] :id | IP: :ip | User: :user | ":method :url" | Status: :status | Time: :response-time ms | UA: :userAgent | ShortID: :shortId | OriginalURL: :originalUrl';

// Development logger configuration
export const setupDevLogger = (app) => {
    // Log to console (colorful output)
    app.use(morgan(consoleFormat, {
        skip: (req) => req.originalUrl === '/health'
    }));

    // Log to development access log file
    app.use(morgan(fileFormat, {
        stream: devAccessLogStream,
        skip: (req) => req.originalUrl === '/health'
    }));
};

// Production logger configuration
export const setupProdLogger = (app) => {
    // Log to production access log file
    app.use(morgan(fileFormat, {
        stream: prodAccessLogStream,
        skip: (req) => req.originalUrl === '/health'
    }));
};

// URL shortener specific logger (works in both environments)
const urlShortenerFormat = '[:localTime] :id | IP: :ip | User: :user | ":method :url" | Status: :status | Time: :response-time ms | ShortID: :shortId | OriginalURL: :originalUrl';
export const urlShortenerLogger = morgan(urlShortenerFormat, {
    skip: (req) => req.originalUrl === '/health'
});

// Error logging middleware
export const setupErrorLogger = (app) => {
    const getErrorMessage = (err, req) => {
        return `[${new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Kolkata',
            hour12: false
        })}] ${req.id} | IP: ${req.ip} | User: ${req.user?.userName || req.user?.id || 'anonymous'} | ${req.method} ${req.url} | ${err.message}\n${err.stack}\n`;
    };

    if (process.env.NODE_ENV === 'development') {
        app.use((err, req, res, next) => {
            const errorMessage = getErrorMessage(err, req);
            devErrorLogStream.write(errorMessage);
            next(err);
        });
    } else {
        app.use((err, req, res, next) => {
            const errorMessage = getErrorMessage(err, req);
            prodErrorLogStream.write(errorMessage);
            next(err);
        });
    }
};

// Setup logger based on environment
export const setupLogger = (app) => {
    app.use(requestIdMiddleware);

    if (process.env.NODE_ENV === 'development') {
        setupDevLogger(app);
    } else {
        setupProdLogger(app);
    }
};


// Add this export to ensure error logging is properly set up
export const initializeErrorLogging = () => {
    // Error logging is already handled in error.middleware.js
    // This function is just a placeholder to ensure the error log stream is created
    return true;
};
