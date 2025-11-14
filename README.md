# URL Shortener

A modern, full-stack URL shortening service with comprehensive analytics, user management, and secure authentication. Built with React, Node.js, Express, and MongoDB.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Usage Guide](#usage-guide)
- [API Documentation](#api-documentation)
- [Security](#security)
- [Performance](#performance)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Author](#author)

## Overview

This URL shortener application provides a complete solution for creating, managing, and tracking shortened URLs. It features a modern React frontend with a robust Node.js backend API, comprehensive analytics, and secure user authentication.

Key capabilities include:
- Instant URL shortening with custom aliases
- User authentication and session management
- Click tracking and analytics
- Secure API endpoints
- Responsive web interface
- Production-ready deployment configuration

## Features

### Core Functionality

- **URL Shortening**: Create short, memorable links instantly
- **Custom Aliases**: Choose your own custom short URL identifiers
- **Bulk Management**: Efficiently manage multiple URLs from a centralized dashboard
- **Quick Access**: Fast redirect handling with minimal latency

### User Management

- **Secure Authentication**: JWT-based authentication with refresh tokens
- **User Dashboard**: Centralized management interface for all shortened URLs
- **Session Management**: Secure logout and automatic token refresh
- **Profile Management**: User profile access and management

### Analytics and Tracking

- **Click Analytics**: Comprehensive click tracking and visualization
- **Referrer Tracking**: Monitor traffic sources and referrers
- **Time-based Analytics**: Track performance metrics over time periods
- **Unique Visitors**: Identify unique visitors based on IP addresses
- **Click History**: Detailed click history with timestamp, IP, and referrer data

### Developer Features

- **RESTful API**: Complete REST API for integration with external applications
- **Rate Limiting**: Configurable rate limits to prevent abuse
- **API Documentation**: Comprehensive API documentation with examples
- **Error Handling**: Centralized error handling with detailed error responses
- **Logging**: Structured logging for debugging and monitoring

## Tech Stack

### Frontend

| Technology    | Version | Purpose                      |
| ------------- | ------- | ---------------------------- |
| React         | 19.1.1  | UI framework                 |
| Vite          | 7.1.7   | Build tool and dev server    |
| Tailwind CSS  | 4.1.14  | Utility-first CSS framework  |
| React Router  | 7.9.4   | Client-side routing          |
| Axios         | 1.12.2  | HTTP client for API calls    |
| React Hot Toast | 2.6.0 | Toast notifications          |
| React Icons   | 5.5.0   | Icon library                 |

### Backend

| Technology         | Version | Purpose                    |
| ------------------ | ------- | -------------------------- |
| Node.js            | Latest  | Runtime environment        |
| Express.js         | 5.1.0   | Web application framework  |
| MongoDB            | Latest  | NoSQL database             |
| Mongoose           | 8.19.0  | MongoDB object modeling    |
| JWT                | 9.0.2   | JSON Web Tokens            |
| bcryptjs           | 3.0.2   | Password hashing           |
| Helmet             | 8.1.0   | Security headers           |
| express-rate-limit | 8.1.0   | Rate limiting middleware   |
| Morgan             | 1.10.1  | HTTP request logging       |

### DevOps and Tools

| Tool         | Purpose                   |
| ------------ | ------------------------- |
| Vercel       | Frontend deployment       |
| Render       | Backend deployment        |
| GitHub       | Version control           |
| ESLint       | Code quality and linting  |
| Nodemon      | Development hot reload    |

## Architecture

The application follows a layered architecture pattern with clear separation of concerns:

```
Client Layer (React Frontend)
    ↓
API Gateway (Express.js Server)
    ↓
Business Logic Layer (Controllers)
    ↓
Data Access Layer (Mongoose Models)
    ↓
Data Store (MongoDB)
```

### Request Flow

1. **Client Request**: User interacts with React frontend
2. **API Gateway**: Request reaches Express.js server
3. **Middleware**: Authentication, rate limiting, CORS handling
4. **Controller**: Business logic processing
5. **Model**: Database operations via Mongoose
6. **Response**: JSON response sent back to client

## Project Structure

```
URL Shortener/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── AuthGuard.jsx  # Route protection component
│   │   │   ├── Footer.jsx     # Footer component
│   │   │   └── Layout.jsx     # Main layout wrapper
│   │   ├── pages/              # Page components
│   │   │   ├── AnalyticsPage.jsx    # Analytics dashboard
│   │   │   ├── DashboardPage.jsx    # User dashboard
│   │   │   ├── HomePage.jsx         # Home page
│   │   │   ├── LandingPage.jsx      # Landing page
│   │   │   ├── LoginPage.jsx        # Login form
│   │   │   ├── NotFoundPage.jsx     # 404 page
│   │   │   ├── RedirectPage.jsx     # URL redirect handler
│   │   │   └── RegisterPage.jsx     # Registration form
│   │   ├── api.js              # API client configuration
│   │   ├── App.jsx             # Main app component
│   │   ├── App.css             # App-specific styles
│   │   ├── index.css           # Global styles
│   │   └── main.jsx            # App entry point
│   ├── public/                 # Static assets
│   ├── index.html              # HTML template
│   ├── package.json            # Dependencies and scripts
│   ├── tailwind.config.js      # Tailwind configuration
│   ├── vercel.json             # Vercel deployment config
│   └── vite.config.mjs         # Vite configuration
│
├── backend/                     # Node.js backend API
│   ├── src/
│   │   ├── app.js              # Express app configuration
│   │   ├── server.js           # Server entry point
│   │   ├── config/             # Configuration files
│   │   │   ├── db.js           # Database connection
│   │   │   ├── env.js          # Environment variables
│   │   │   └── logger.js       # Logging configuration
│   │   ├── controllers/        # Request handlers
│   │   │   ├── auth.controller.js  # Authentication logic
│   │   │   └── url.controller.js   # URL shortening logic
│   │   ├── middlewares/        # Express middlewares
│   │   │   ├── auth.middleware.js  # Authentication middleware
│   │   │   └── error.middleware.js # Error handling middleware
│   │   ├── models/             # Database models
│   │   │   ├── User.model.js   # User schema and model
│   │   │   └── url.model.js    # URL schema and model
│   │   ├── routes/             # API routes
│   │   │   ├── auth.route.js   # Authentication routes
│   │   │   └── url.route.js    # URL shortening routes
│   │   ├── utils/              # Utility functions
│   │   │   └── generateToken.js    # JWT token generation
│   │   └── logs/               # Application logs
│   │       ├── development/    # Dev environment logs
│   │       └── production/     # Production environment logs
│   ├── package.json            # Dependencies and scripts
│   └── .env.example            # Environment variables template
│
└── README.md                   # This file
```

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```

2. **Set up the backend**

   ```bash
   cd backend
   npm install

   # Create environment file
   cp .env.example .env
   # Edit .env with your configuration

   # Start development server
   npm run backend
   ```

   The backend server will start on `http://localhost:9000` (or the port specified in your `.env` file).

3. **Set up the frontend**

   ```bash
   cd ../frontend
   npm install

   # Create environment file (optional for development)
   # The frontend uses Vite proxy in development mode

   # Start development server
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`.

4. **Access the application**

   - Frontend: http://localhost:5173
   - Backend API: http://localhost:9000/api/v1
   - Health Check: http://localhost:9000/health

## Environment Variables

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

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

### Frontend Environment Variables

Create a `.env.local` file in the `frontend` directory (optional for development):

```env
# API Configuration
VITE_API_URL=http://localhost:9000/api/v1

# Frontend URL (optional, defaults to window.location.origin)
VITE_FRONTEND_URL=http://localhost:5173
```

For production deployment, set these variables in your hosting platform (Vercel, Netlify, etc.).

## Usage Guide

### For End Users

1. **Create Account**: Register with email, username, and password
2. **Shorten URLs**: Paste long URLs to create short, shareable links
3. **Customize**: Create custom aliases for your shortened URLs
4. **Track Performance**: Monitor clicks, analytics, and performance metrics
5. **Manage URLs**: View, edit, and delete your shortened URLs from the dashboard

### For Developers

1. **API Integration**: Use the REST API to integrate URL shortening into your applications
2. **Authentication**: Obtain JWT tokens for authenticated API requests
3. **Rate Limits**: Be aware of API rate limits and implement appropriate error handling
4. **Error Handling**: Handle API errors appropriately in your application
5. **Documentation**: Refer to the API documentation for detailed endpoint information

### API Usage Example

```javascript
// Shorten a URL
const response = await fetch('http://localhost:9000/api/v1/url', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_JWT_TOKEN'
  },
  body: JSON.stringify({
    originalUrl: 'https://example.com/very-long-url',
    customShortId: 'my-custom-link' // Optional
  })
});

const data = await response.json();
console.log(data.data.shortUrl); // http://localhost:5173/my-custom-link
```

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

#### Login User

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Refresh Token

```http
POST /api/v1/auth/refresh-token
```

#### Get User Profile

```http
GET /api/v1/auth/profile
Authorization: Bearer jwt_access_token
```

#### Logout

```http
POST /api/v1/auth/logout
Authorization: Bearer jwt_access_token
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

#### Get User's URLs

```http
GET /api/v1/url/myurls/direct
Authorization: Bearer jwt_access_token
```

#### Get Original URL (for redirect)

```http
GET /api/v1/url/:shortId/original
```

#### Redirect to Original URL

```http
GET /api/v1/url/:shortId
```

#### Get URL Analytics

```http
GET /api/v1/url/:shortId/analytics
Authorization: Bearer jwt_access_token
```

For detailed API documentation, see the [backend README](./backend/README.md).

## Security

### Authentication and Authorization

- **JWT Tokens**: Secure token-based authentication with access and refresh tokens
- **Refresh Tokens**: Automatic token renewal system for seamless user experience
- **Password Hashing**: bcrypt with configurable salt rounds (default: 12)
- **Session Management**: Secure logout and token cleanup
- **Protected Routes**: Middleware-based route protection for authenticated endpoints

### API Security

- **Rate Limiting**: Configurable per-IP rate limits to prevent abuse and DDoS attacks
- **CORS Protection**: Restrictive cross-origin policies with configurable allowed origins
- **Helmet.js**: Security headers implementation to protect against common vulnerabilities
- **Input Validation**: Comprehensive request validation to prevent malicious input
- **Error Handling**: Centralized error handling that avoids leaking sensitive information

### Data Protection

- **HTTPS Only**: All communications encrypted in production
- **Environment Variables**: Sensitive configuration kept out of version control
- **Cookie Security**: HttpOnly and Secure flags with environment-aware SameSite settings
- **Data Sanitization**: XSS prevention through input sanitization
- **Secure Headers**: Security headers set via Helmet.js

## Performance

### Backend Optimizations

- **Connection Pooling**: Efficient database connections managed by Mongoose
- **Database Indexing**: Optimized queries with proper indexes on frequently accessed fields
- **Rate Limiting**: Prevents abuse and ensures fair resource usage
- **Error Handling**: Efficient error handling to minimize performance impact
- **Logging**: Structured logging for performance monitoring and debugging

### Frontend Optimizations

- **Code Splitting**: Lazy loading of components for reduced initial bundle size
- **Bundle Optimization**: Tree shaking and minification for production builds
- **API Optimization**: Efficient API calls with proper error handling
- **Caching**: Browser caching for static assets
- **Responsive Design**: Optimized for all device sizes

### Monitoring

- **Performance Metrics**: Response time tracking and monitoring
- **Error Monitoring**: Comprehensive error logging and tracking
- **Usage Analytics**: User behavior tracking and analytics
- **Health Checks**: Automated system monitoring via health check endpoints

## Deployment

### Frontend Deployment (Vercel)

1. **Connect Repository**: Connect your GitHub repository to Vercel
2. **Set Environment Variables**: Configure `VITE_API_URL` and other environment variables
3. **Deploy**: Vercel will automatically deploy on every push to the main branch
4. **Custom Domain**: Configure custom domain in Vercel dashboard (optional)

### Backend Deployment (Render/Railway)

1. **Connect Repository**: Connect your GitHub repository to your hosting platform
2. **Set Environment Variables**: Configure all required environment variables
3. **Set Build Command**: `npm install`
4. **Set Start Command**: `npm start`
5. **Deploy**: Platform will automatically deploy on every push to the main branch

### Production Checklist

- [ ] Environment variables configured
- [ ] Database connection established
- [ ] SSL certificates installed (HTTPS)
- [ ] Rate limiting configured
- [ ] Logging configured
- [ ] Error monitoring setup
- [ ] Health checks implemented
- [ ] CORS configured correctly
- [ ] Frontend and backend URLs configured
- [ ] All secrets and keys secured

## Contributing

### Development Workflow

1. **Fork the repository**: Create your own fork of the repository
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Implement your feature or fix
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**: Create a pull request with a detailed description

### Code Standards

- **ESLint**: Follow the configured linting rules
- **Code Formatting**: Use consistent code formatting
- **Documentation**: Update documentation for API changes
- **Testing**: Write tests for new features (when applicable)
- **Error Handling**: Implement proper error handling
- **Security**: Follow security best practices

### Pull Request Guidelines

- Provide a clear description of changes
- Include relevant documentation updates
- Ensure all tests pass (when applicable)
- Follow the existing code style
- Update README if necessary

## Author

**Amritanshu Goutam**

- LinkedIn: [Amritanshu Goutam](https://www.linkedin.com/in/amritanshu-goutam/)
- GitHub: [amritanshu-goutam](https://github.com/amritanshu-goutam)
- Twitter/X: [Amritanshutwt](https://x.com/Amritanshutwt)

## License

This project is licensed under the  GNU GENERAL PUBLIC LICENSE Version 3 License.

---

Built with heat and trial methodology.
