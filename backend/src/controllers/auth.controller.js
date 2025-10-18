// import User from "../models/User.model.js";
// import bcrypt from "bcryptjs";
// import generateToken from "../utils/generateToken.js";

// // Register
// export const register = async (req, res) => {
//     try {
//         const { userName, email, password } = req.body;
//         if (!userName || !email || !password) {
//             return res.status(400).json({ message: "Please provide name, email and password" });
//         }

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "User with this email already exists" });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
//         const user = await User.create({ userName, email, password: hashedPassword });

//         // Optionally update lastLogin on register (comment out if you prefer null)
//         // user.lastLogin = new Date();
//         await user.save();

//         generateToken(res, user._id); // sets cookie 'jwt'

//         res.status(201).json({
//             success: true,
//             message: "User registered successfully",
//             _id: user._id,
//             userName: user.userName,
//             email: user.email,
//         });
//     } catch (error) {
//         console.error("Error in user registration:", error);
//         res.status(500).json({ message: "Error during registration", error: error.message });
//     }
// };

// // Login
// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ message: "Please provide email and password" });
//         }

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: "User not found. Please register." });
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: "Invalid password" });
//         }


//         generateToken(res, user._id); // sets cookie 'jwt'

//         // // update lastLogin
//         // user.lastLogin = new Date();
//         // await user.save();

//         // return profile without password
//         const safeUser = await User.findById(user._id).select("-password");
//         res.status(200).json({
//             success: true,
//             message: "User logged in successfully",
//             user: safeUser,
//         });
//     } catch (error) {
//         console.error("Error in user login:", error);
//         res.status(500).json({ message: "Error during login", error: error.message });
//     }
// };

// // Logout
// export const logout = async (req, res) => {
//     try {
//         // clear the same cookie name: 'jwt'
//         res.cookie("jwt", "", {
//             httpOnly: true,
//             expires: new Date(0),
//         });
//         res.status(200).json({ message: "User logged out successfully" });
//     } catch (error) {
//         console.error("Error in user logout:", error);
//         res.status(500).json({ message: "Error during logout", error: error.message });
//     }
// };
















// import User from "../models/User.model.js";
// import bcrypt from "bcryptjs";
// import generateToken from "../utils/generateToken.js";
// import { catchAsync, ValidationError, AuthError } from "../middlewares/error.middleware.js";

// // Register
// export const register = catchAsync(async (req, res) => {
//     const { userName, email, password } = req.body;

//     if (!userName || !email || !password) {
//         throw new ValidationError("Please provide name, email, and password");
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//         throw new ValidationError("User with this email already exists");
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const user = await User.create({ userName, email, password: hashedPassword });

//     generateToken(res, user._id); // sets cookie 'jwt'

//     res.status(201).json({
//         success: true,
//         message: "User registered successfully",
//         _id: user._id,
//         userName: user.userName,
//         email: user.email,
//     });
// });

// // Login
// export const login = catchAsync(async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         throw new ValidationError("Please provide email and password");
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//         throw new AuthError("User not found. Please register.");
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//         throw new AuthError("Invalid password");
//     }

//     generateToken(res, user._id); // sets cookie 'jwt'

//     // Return profile without password
//     const safeUser = await User.findById(user._id).select("-password");

//     res.status(200).json({
//         success: true,
//         message: "User logged in successfully",
//         user: safeUser,
//     });
// });

// // Logout
// export const logout = catchAsync(async (req, res) => {
//     // Clear the cookie named 'jwt'
//     res.cookie("jwt", "", {
//         httpOnly: true,
//         expires: new Date(0),
//     });

//     res.status(200).json({
//         success: true,
//         message: "User logged out successfully"
//     });
// });














// import User from "../models/User.model.js";
// import bcrypt from "bcryptjs";
// import { generateTokens, setTokenCookies, clearTokenCookies } from "../utils/generateToken.js";
// import { catchAsync, ValidationError, AuthError } from "../middlewares/error.middleware.js";
// import jwt from "jsonwebtoken";

// // Register
// export const register = catchAsync(async (req, res) => {
//     const { userName, email, password } = req.body;
//     if (!userName || !email || !password) {
//         throw new ValidationError("Please provide name, email, and password");
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//         throw new ValidationError("User with this email already exists");
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({ userName, email, password: hashedPassword });

//     // Generate both access and refresh tokens
//     const { accessToken, refreshToken } = generateTokens(user._id, user.userName);

//     // Set tokens as cookies
//     setTokenCookies(res, accessToken, refreshToken);

//     // Update user with refresh token and last login
//     user.setRefreshToken(refreshToken);
//     user.updateLastLogin();
//     await user.save();

//     res.status(201).json({
//         success: true,
//         message: "User registered successfully",
//         _id: user._id,
//         userName: user.userName,
//         email: user.email,
//     });
// });

// // Login
// export const login = catchAsync(async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         throw new ValidationError("Please provide email and password");
//     }

//     const user = await User.findOne({ email }).select('+password');
//     if (!user) {
//         throw new AuthError("User not found. Please register.");
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//         throw new AuthError("Invalid password");
//     }

//     // Generate both access and refresh tokens
//     const { accessToken, refreshToken } = generateTokens(user._id, user.userName);

//     // Set tokens as cookies
//     setTokenCookies(res, accessToken, refreshToken);

//     // Update user with refresh token and last login
//     user.setRefreshToken(refreshToken);
//     user.updateLastLogin();
//     await user.save();

//     // Return profile without password and refresh token
//     const safeUser = await User.findById(user._id).select("-password -refreshToken");

//     res.status(200).json({
//         success: true,
//         message: "User logged in successfully",
//         user: safeUser,
//     });
// });

// // Logout
// export const logout = catchAsync(async (req, res) => {
//     // Clear refresh token from database if user is authenticated
//     if (req.user) {
//         const user = await User.findById(req.user.id);
//         if (user) {
//             await user.clearRefreshToken();
//         }
//     }

//     // Clear token cookies
//     clearTokenCookies(res);

//     res.status(200).json({
//         success: true,
//         message: "User logged out successfully"
//     });
// });

// // Refresh token endpoint
// export const refreshToken = catchAsync(async (req, res) => {
//     // Get refresh token from cookie
//     const refreshToken = req.cookies.refreshToken;

//     if (!refreshToken) {
//         throw new AuthError("No refresh token provided");
//     }

//     try {
//         // Verify refresh token
//         const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);

//         // Find user with matching refresh token
//         const user = await User.findOne({
//             _id: decoded.id,
//         }).select('+refreshToken');

//         if (!user || user.refreshToken !== refreshToken) {
//             throw new AuthError("Invalid refresh token");
//         }

//         // Generate new tokens
//         const { accessToken, refreshToken: newRefreshToken } = generateTokens(
//             user._id,
//             user.userName
//         );

//         // Update refresh token in database
//         user.setRefreshToken(newRefreshToken);
//         await user.save();

//         // Set new cookies
//         setTokenCookies(res, accessToken, newRefreshToken);

//         res.json({
//             success: true,
//             message: "Token refreshed successfully"
//         });
//     } catch (err) {
//         // Clear invalid refresh token
//         clearTokenCookies(res);
//         throw new AuthError("Invalid refresh token");
//     }
// });















import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { generateTokens, setTokenCookies, clearTokenCookies } from "../utils/generateToken.js";
import { catchAsync, ValidationError, AuthError } from "../middlewares/error.middleware.js";
import jwt from "jsonwebtoken";

// Register
export const register = catchAsync(async (req, res) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
        throw new ValidationError("Please provide name, email, and password");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ValidationError("User with this email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ userName, email, password: hashedPassword });

    // Generate both access and refresh tokens
    const { accessToken, refreshToken } = generateTokens(user._id, user.userName);

    // Set tokens as cookies
    setTokenCookies(res, accessToken, refreshToken);

    // Update user with refresh token and last login in a single operation
    await user.updateAuthTokens(refreshToken);

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        _id: user._id,
        userName: user.userName,
        email: user.email,
    });
});

// Login
export const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ValidationError("Please provide email and password");
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new AuthError("User not found. Please register.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AuthError("Invalid password");
    }

    // Generate both access and refresh tokens
    const { accessToken, refreshToken } = generateTokens(user._id, user.userName);

    // Set tokens as cookies
    setTokenCookies(res, accessToken, refreshToken);

    // Update user with refresh token and last login in a single operation
    await user.updateAuthTokens(refreshToken);

    // Return profile without password and refresh token
    const safeUser = await User.findById(user._id).select("-password -refreshToken");

    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: safeUser,
    });
});

// Logout
export const logout = catchAsync(async (req, res) => {
    // Clear refresh token from database if user is authenticated
    if (req.user) {
        const user = await User.findById(req.user.id);
        if (user) {
            await user.clearRefreshToken();
        }
    }

    // Clear token cookies
    clearTokenCookies(res);

    res.status(200).json({
        success: true,
        message: "User logged out successfully"
    });
});

// Refresh token endpoint
export const refreshToken = catchAsync(async (req, res) => {
    // Get refresh token from cookie
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        throw new AuthError("No refresh token provided");
    }

    try {
        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);

        // Find user with matching refresh token
        const user = await User.findOne({
            _id: decoded.id,
        }).select('+refreshToken');

        if (!user || user.refreshToken !== refreshToken) {
            throw new AuthError("Invalid refresh token");
        }

        // Generate new tokens
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(
            user._id,
            user.userName
        );

        // Update user with new refresh token and last login in a single operation
        await user.updateAuthTokens(newRefreshToken);

        // Set new cookies
        setTokenCookies(res, accessToken, newRefreshToken);

        res.json({
            success: true,
            message: "Token refreshed successfully"
        });
    } catch (err) {
        // Clear invalid refresh token
        clearTokenCookies(res);
        throw new AuthError("Invalid refresh token");
    }
});
