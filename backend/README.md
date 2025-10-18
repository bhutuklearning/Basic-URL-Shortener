# URL Shortener API

A robust and scalable URL shortening service backend built with Node.js, Express, and MongoDB.

## 🚀 Features

- **URL Shortening**: Create shortened URLs with custom or auto-generated aliases
- **User Authentication**: Secure registration and login system
- **User Dashboard**: Track and manage your shortened URLs
- **Analytics**: Basic click tracking and statistics
- **API Rate Limiting**: Prevent abuse with configurable rate limits
- **Secure Headers**: Enhanced security with Helmet.js
- **Comprehensive Logging**: Detailed logs for debugging and monitoring

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt for password hashing
- **Security**: Helmet.js, Express Rate Limit
- **Logging**: Morgan, Rotating File Stream
- **Development**: Nodemon for hot reloading

## 📁 Project Structure

```
backend/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── server.js              # Server entry point
│   ├── config/                # Configuration files
│   │   ├── db.js              # Database connection
│   │   ├── env.js             # Environment variables
│   │   └── logger.js          # Logging configuration
│   ├── controllers/           # Request handlers
│   │   ├── auth.controller.js # Authentication logic
│   │   └── url.controller.js  # URL shortening logic
│   ├── middlewares/           # Express middlewares
│   │   ├── auth.middleware.js # Authentication middleware
│   │   └── error.middleware.js# Error handling middleware
│   ├── models/                # Database models
│   │   ├── User.model.js      # User schema and model
│   │   └── url.model.js       # URL schema and model
│   ├── routes/                # API routes
│   │   ├── auth.route.js      # Authentication routes
│   │   └── url.route.js       # URL shortening routes
│   ├── utils/                 # Utility functions
│   │   └── generateToken.js   # JWT token generation
│   └── logs/                  # Application logs
└── .env                       # Environment variables
```

## 🔧 Installation & Setup

1. **Clone the repository**

2. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/url-shortener
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   # Development mode with hot reloading
   npm run backend
   
   # Production mode
   npm start
   ```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get access token
- `GET /api/auth/logout` - Logout and clear cookies
- `GET /api/auth/profile` - Get user profile (protected)

### URL Shortening
- `POST /api/urls` - Create a new short URL
- `GET /api/urls` - Get all URLs for authenticated user
- `GET /api/urls/:shortId` - Redirect to original URL
- `DELETE /api/urls/:id` - Delete a URL by ID (protected)
- `GET /api/urls/stats/:shortId` - Get URL statistics (protected)

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- HTTP security headers with Helmet.js
- Rate limiting to prevent abuse
- CORS configuration
- Cookie security

## 📊 Logging

The application uses a comprehensive logging system:
- Development logs with colorized output
- Production logs with rotation and compression
- Separate access and error logs
- Request ID tracking for debugging

## 🧪 Error Handling

Custom error handling middleware provides:
- Consistent error responses
- Detailed error information in development
- Sanitized error messages in production
- Proper HTTP status codes

## 🚀 Performance Considerations

- Database connection pooling
- Efficient URL lookup with indexed fields
- Caching opportunities for frequently accessed URLs
- Stateless authentication for horizontal scaling

## 📝 License

ISC

---

Developed with ❤️ by [Amritanshu Goutam]