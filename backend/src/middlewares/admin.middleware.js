// src/middlewares/admin.middleware.js
import { catchAsync, AuthError } from "./error.middleware.js";

export const isAdmin = catchAsync(async (req, res, next) => {
    // Check if the user is authenticated
    if (!req.user) {
        throw new AuthError("Authentication required");
    }

    // Check if the user is the admin
    if (req.user.email !== process.env.ADMIN_EMAIL) {
        throw new AuthError("Admin access required");
    }

    // User is admin, proceed
    next();
});

// Alternative: Basic auth for admin-only routes
export const adminBasicAuth = catchAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        throw new AuthError("Authentication required");
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
        throw new AuthError("Invalid admin credentials");
    }

    next();
});
