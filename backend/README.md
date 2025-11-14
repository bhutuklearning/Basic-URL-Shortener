# URL Shortener API

A robust REST API for URL shortening, user management, and click analytics. Built with Node.js, Express, and MongoDB.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Error Responses](#error-responses)
- [Security](#security)
- [Performance](#performance)
- [Deployment](#deployment)
- [Monitoring and Logging](#monitoring-and-logging)
- [Health Checks](#health-checks)

## Overview

This backend service powers a production-ready URL shortener. It provides secure authentication, configurable rate limiting, detailed click capture, and deployment-friendly observability. The codebase is built with Express 5 and MongoDB (via Mongoose) and follows a layered architecture separating routing, controllers, and data access concerns.

Key capabilities include:
- RESTful API for URL shortening operations
- JWT-based authentication with refresh tokens
- Click tracking and analytics
- Rate limiting and security measures
- Comprehensive error handling
- Structured logging and monitoring

## Features

### Core API Features

- **URL Shortening**: Create short URLs with auto-generated or custom IDs
- **URL Redirection**: Efficient redirect handling with click tracking
- **User Authentication**: JWT-based authentication with refresh tokens
- **Click Capture**: Persist timestamp, referrer, IP, and user agent metadata for each redirect
- **Rate Limiting**: Configurable API rate limits to prevent abuse
- **Error Handling**: Centralized error management with detailed error responses

### Authentication and Authorization

- **JWT Tokens**: Secure token-based authentication with access and refresh tokens
- **Refresh Tokens**: Automatic token renewal system for seamless user experience
- **Password Security**: bcrypt hashing with configurable salt rounds (default: 12)
- **Session Management**: Secure logout and token cleanup
- **Protected Routes**: Middleware-based route protection for authenticated endpoints
- **Cookie-based Authentication**: HttpOnly cookies with environment-aware SameSite settings

### Analytics and Reporting

- **Click History**: Access full click records per URL, including timestamp, IP, referrer, and user agent
- **Unique Clicks**: Derive unique visitor counts based on captured IP addresses
- **Referrer Tracking**: Monitor traffic sources and referrers
- **User-Level Views**: Retrieve URL lists and analytics scoped to the authenticated user
- **Time-based Analytics**: Track performance metrics over time periods

### Security Features

- **Helmet.js**: Security headers implementation to protect against common vulnerabilities
- **CORS Protection**: Configurable cross-origin policies with restrictive allowed origins
- **Input Validation**: Comprehensive request validation to prevent malicious input
- **Rate Limiting**: DDoS and abuse prevention through configurable rate limits
- **Cookie Management**: HttpOnly cookies with environment-aware SameSite and Secure flags
- **Error Handling**: Centralized error handler that avoids leaking stack traces in production

## Tech Stack

| Category           | Technology         | Version | Purpose                   |
| ------------------ | ------------------ | ------- | ------------------------- |
| **Runtime**        | Node.js            | Latest  | JavaScript runtime        |
| **Framework**      | Express.js         | 5.1.0   | Web application framework |
| **Database**       | MongoDB            | Latest  | NoSQL database            |
| **ODM**            | Mongoose           | 8.19.0  | MongoDB object modeling   |
| **Authentication** | JWT                | 9.0.2   | JSON Web Tokens           |
| **Security**       | bcryptjs           | 3.0.2   | Password hashing          |
| **Security**       | Helmet             | 8.1.0   | Security headers          |
| **Logging**        | Morgan             | 1.10.1  | HTTP request logger       |
| **Rate Limiting**  | express-rate-limit | 8.1.0   | API rate limiting         |
| **Development**    | Nodemon            | 3.1.10  | Development hot reload    |

## Architecture

The application follows a layered architecture pattern:

```
API Layer (Express.js Server)
    ↓
Middleware Stack (Auth, Rate Limiting, CORS)
    ↓
Route Handlers
    ↓
Business Logic (Controllers)
    ↓
Data Access (Mongoose Models)
    ↓
Data Store (MongoDB)
```

### Request Flow

1. **Request Reception**: Express.js server receives HTTP request
2. **Middleware Processing**: Request passes through middleware stack (CORS, rate limiting, authentication)
3. **Route Handling**: Request is routed to appropriate handler
4. **Controller Processing**: Business logic is executed in controller
5. **Data Access**: Database operations are performed via Mongoose models
6. **Response**: JSON response is sent back to client

## Project Structure

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
│       ├── development/       # Dev environment logs
│       └── production/        # Production environment logs
├── package.json               # Dependencies and scripts
├── .env.example               # Environment variables template
└── README.md                  # Documentation
```

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### Installation

1. **Clone and navigate to backend**

   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**

   Copy the sample environment file and update it with your configuration:

   ```bash
   # macOS / Linux
   cp .env.example .env
   ```

   ```powershell
   # Windows PowerShell
   Copy-Item .env.example .env
   ```

   Edit `.env` in your preferred editor (VS Code, Notepad, nano, etc.).

4. **Start the server**

   ```bash
   # Development mode with hot reloading
   npm run backend

   # Production mode
   npm start
   ```

   The server will start on the port specified in your `.env` file (default: 9000).

## Environment Variables

Create a `.env` file in the backend root directory:

```env
# Server Configuration
PORT=9000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/url-shortener
DB_NAME=url-shortener

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES=7d
JWT_ACCESS_SECRET=your-access-token-secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_REFRESH_EXPIRES_IN=7d

# Security Configuration
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS Configuration
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:9000

# Logging Configuration
LOG_LEVEL=info
LOG_FILE_MAX_SIZE=10m
LOG_FILE_MAX_FILES=5
```

### Required Environment Variables

- **PORT**: Server port (default: 9000)
- **NODE_ENV**: Environment mode (development or production)
- **MONGO_URI**: MongoDB connection string
- **JWT_SECRET**: Secret key for JWT token signing
- **FRONTEND_URL**: Frontend URL for CORS and short URL generation

### Optional Environment Variables

- **DB_NAME**: Database name (default: url-shortener)
- **JWT_ACCESS_SECRET**: Access token secret (defaults to JWT_SECRET)
- **JWT_REFRESH_SECRET**: Refresh token secret (defaults to JWT_SECRET)
- **BACKEND_URL**: Backend URL for self-pinging (optional)

## API Documentation

### Base URL

- Development: `http://localhost:9000/api/v1`
- Production: `https://your-backend-domain.com/api/v1`

### Authentication Endpoints

#### Register User

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "userName": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "userName": "johndoe",
      "email": "john@example.com"
    },
    "accessToken": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  }
}
```

#### Login User

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "userName": "johndoe",
      "email": "john@example.com"
    },
    "accessToken": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  }
}
```

#### Refresh Token

```http
POST /api/v1/auth/refresh-token
Content-Type: application/json
```

**Response:**

```json
{
  "success": true,
  "data": {
    "accessToken": "new_jwt_access_token",
    "refreshToken": "new_jwt_refresh_token"
  }
}
```

#### Get User Profile

```http
GET /api/v1/auth/profile
Authorization: Bearer jwt_access_token
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "userName": "johndoe",
      "email": "john@example.com"
    }
  }
}
```

#### Logout

```http
POST /api/v1/auth/logout
Authorization: Bearer jwt_access_token
```

**Response:**

```json
{
  "success": true,
  "message": "Logout successful"
}
```

### URL Shortening Endpoints

#### Create Short URL

```http
POST /api/v1/url
Authorization: Bearer jwt_access_token
Content-Type: application/json

{
  "originalUrl": "https://example.com/very-long-url",
  "customShortId": "my-custom-link"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "shortId": "my-custom-link",
    "shortUrl": "http://localhost:5173/my-custom-link",
    "originalUrl": "https://example.com/very-long-url"
  }
}
```

#### Get User's URLs

```http
GET /api/v1/url/myurls/direct
Authorization: Bearer jwt_access_token
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "shortId": "abc123",
      "shortUrl": "http://localhost:5173/abc123",
      "originalUrl": "https://example.com/long-url",
      "clicks": 42,
      "createdAt": "2024-01-20T10:30:00.000Z"
    }
  ]
}
```

#### Get Original URL (for frontend redirect)

```http
GET /api/v1/url/:shortId/original
```

**Response:**

```json
{
  "success": true,
  "data": {
    "originalUrl": "https://example.com/very-long-url",
    "shortId": "abc123"
  }
}
```

#### Redirect to Original URL

```http
GET /api/v1/url/:shortId
```

**Response:** HTTP 301 Redirect to original URL

#### Get URL Analytics

```http
GET /api/v1/url/:shortId/analytics
Authorization: Bearer jwt_access_token
```

**Response:**

```json
{
  "success": true,
  "data": {
    "clicks": 42,
    "uniqueClicks": 38,
    "referrers": ["google.com", "Direct"],
    "details": [
      {
        "timestamp": "2024-01-20T10:30:00.000Z",
        "referrer": "google.com",
        "ip": "192.168.1.1",
        "userAgent": "Mozilla/5.0..."
      }
    ],
    "shortUrl": "http://localhost:5173/abc123",
    "originalUrl": "https://example.com/very-long-url",
    "shortId": "abc123"
  }
}
```

## Error Responses

All endpoints return a consistent structure on error:

```json
{
  "success": false,
  "error": "Error message here"
}
```

When `NODE_ENV` is `development`, the response may also include a stack trace and additional metadata to help with debugging.

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

### Error Types

- **ValidationError**: Invalid input data
- **NotFoundError**: Resource not found
- **AuthError**: Authentication or authorization error
- **AppError**: Generic application error

## Security

### Authentication Security

- **JWT Tokens**: Secure token-based authentication with access and refresh tokens
- **Refresh Tokens**: Automatic token renewal system for seamless user experience
- **Password Hashing**: bcrypt with configurable salt rounds (default: 12)
- **Token Expiration**: Configurable token lifetimes (access: 15m, refresh: 7d)
- **Secure Cookies**: HttpOnly cookies with environment-aware SameSite and Secure flags

### API Security

- **Rate Limiting**: Configurable per-IP rate limits to prevent abuse and DDoS attacks
- **CORS Protection**: Restrictive cross-origin policies with configurable allowed origins
- **Helmet.js**: Security headers implementation to protect against common vulnerabilities
- **Input Validation**: Comprehensive request validation to prevent malicious input
- **Error Handling**: Centralized error handler that avoids leaking stack traces in production

### Data Protection

- **Environment Variables**: Sensitive configuration kept out of version control
- **Secure Cookies**: HttpOnly cookies with SameSite and Secure flags based on environment
- **HTTPS Recommended**: Deploy behind TLS to encrypt transport-level communication
- **Error Handling**: Centralized handler avoids leaking stack traces in production
- **Password Security**: bcrypt hashing with configurable salt rounds

## Performance

### Database

- **Connection Pooling**: Managed by Mongoose to reuse sockets efficiently
- **Unique Indexes**: Enforced on `shortId` and `customShortId` for fast lookups and integrity
- **Query Optimization**: Efficient queries with proper indexes
- **Data Modeling**: Optimized schema design for performance

### API Safeguards

- **Rate Limiting**: Multiple limiters to guard hot endpoints against bursts
- **Lightweight Controllers**: Async route handlers minimize blocking operations
- **Structured Logging**: Request and error logs assist with latency analysis
- **Error Handling**: Efficient error handling to minimize performance impact

### Optimization Strategies

- **Database Indexing**: Proper indexes on frequently accessed fields
- **Query Optimization**: Efficient database queries
- **Caching**: Consider implementing caching for frequently accessed data
- **Connection Pooling**: Efficient database connection management

## Deployment

### Environment Setup

- **Production Database**: MongoDB Atlas or other cloud database service
- **Environment Variables**: Secure configuration in hosting platform
- **SSL Certificates**: HTTPS configuration for secure communication
- **Domain Configuration**: Custom domain setup (optional)

### Deployment Platforms

#### Render

1. Connect GitHub repository to Render
2. Set environment variables in Render dashboard
3. Configure build command: `npm install`
4. Configure start command: `npm start`
5. Deploy automatically on push to main branch

#### Railway

1. Install Railway CLI: `npm install -g @railway/cli`
2. Login to Railway: `railway login`
3. Deploy: `railway deploy`
4. Set environment variables in Railway dashboard

#### Heroku

1. Install Heroku CLI
2. Create Heroku app: `heroku create your-app-name`
3. Set environment variables: `heroku config:set NODE_ENV=production`
4. Deploy: `git push heroku main`

### Production Checklist

- [ ] Environment variables configured
- [ ] Database connection established
- [ ] SSL certificates installed (HTTPS)
- [ ] Rate limiting configured
- [ ] Logging configured
- [ ] Error monitoring setup
- [ ] Health checks implemented
- [ ] CORS configured correctly
- [ ] Frontend URL configured
- [ ] All secrets and keys secured

## Monitoring and Logging

### Logging Configuration

- **Development**: Colorized console output for easier debugging
- **Production**: Structured JSON logs for log aggregation and analysis
- **Log Rotation**: Automatic log file rotation to manage disk space
- **Log Levels**: Configurable log levels (info, error, debug, etc.)

### Error Tracking

- **Error Logging**: Comprehensive error logging with stack traces
- **Stack Traces**: Detailed error information for debugging
- **Error Classification**: Categorized error types for better analysis
- **Log Files**: Separate log files for access and error logs

### Log Files

Log files are stored in the `src/logs` directory:
- `development/access.log`: Development access logs
- `development/error.log`: Development error logs
- `production/access.log`: Production access logs
- `production/error.log`: Production error logs

## Health Checks

### Health Endpoint

```http
GET /health
```

**Response:**

```json
{
  "status": "OK"
}
```

The health endpoint is lightweight and suitable for load balancers or uptime monitors.

### Ping Endpoint

```http
GET /ping
```

**Response:**

```
Pong!
```

The ping endpoint is used for server keep-alive functionality.

---

Built with Node.js and Express.
