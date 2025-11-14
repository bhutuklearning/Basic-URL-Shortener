# URL Shortener Frontend

A modern, responsive React frontend for the URL Shortener application with authentication, analytics, and intuitive user interface.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Pages and Components](#pages-and-components)
- [Styling](#styling)
- [Deployment](#deployment)
- [Performance](#performance)
- [Testing](#testing)

## Overview

This frontend application provides a modern, responsive interface for the URL Shortener service. Built with React 19, Vite, and Tailwind CSS, it offers a seamless user experience with comprehensive features for URL shortening, analytics, and user management.

Key capabilities include:
- Modern React-based user interface
- Secure authentication and session management
- Comprehensive analytics dashboard
- Responsive design for all devices
- Fast and efficient API communication
- Production-ready deployment configuration

## Features

### Core Functionality

- **URL Shortening**: Create short URLs with custom aliases
- **User Dashboard**: Manage all your shortened URLs from a centralized dashboard
- **Analytics Dashboard**: Track clicks and performance metrics with visual charts
- **Quick Access**: Fast and efficient URL redirection
- **URL Management**: View, copy, and manage all your shortened URLs

### Authentication and Security

- **Secure Login/Register**: JWT-based authentication with refresh tokens
- **Protected Routes**: Route guards for authenticated users
- **Session Management**: Automatic token refresh for seamless user experience
- **Secure Logout**: Complete session cleanup on logout
- **Password Validation**: Strong password requirements with real-time validation
- **Error Handling**: User-friendly error messages and handling

### Analytics and Tracking

- **Click Analytics**: Visual charts and metrics for click tracking
- **Referrer Tracking**: Monitor traffic sources and referrers
- **Time-based Stats**: Track performance metrics over time periods
- **Real-time Updates**: Live data refresh for analytics
- **Click History**: Detailed click history with timestamp, IP, and referrer data
- **Unique Visitors**: Identify unique visitors based on IP addresses

### User Experience

- **Responsive Design**: Works seamlessly on all device sizes
- **Toast Notifications**: User feedback system with toast notifications
- **Loading States**: Smooth loading animations and states
- **Error Handling**: User-friendly error messages and handling
- **Intuitive Interface**: Clean and intuitive user interface
- **Fast Performance**: Optimized for fast load times and smooth interactions

## Tech Stack

| Category          | Technology      | Version | Purpose                     |
| ----------------- | --------------- | ------- | --------------------------- |
| **Framework**     | React           | 19.1.1  | UI Framework                |
| **Build Tool**    | Vite            | 7.1.7   | Build tool and dev server   |
| **Styling**       | Tailwind CSS    | 4.1.14  | Utility-first CSS framework |
| **Routing**       | React Router    | 7.9.4   | Client-side routing         |
| **HTTP Client**   | Axios           | 1.12.2  | API communication           |
| **Notifications** | React Hot Toast | 2.6.0   | Toast notifications         |
| **Icons**         | React Icons     | 5.5.0   | Icon library                |

### Development Tools

| Tool                  | Version | Purpose                  |
| --------------------- | ------- | ------------------------ |
| **ESLint**            | 9.36.0  | Code linting             |
| **Prettier**          | Latest  | Code formatting          |
| **Vite Plugin React** | 5.0.4   | React support for Vite   |

## Architecture

The frontend follows a component-based architecture:

```
React App
    ↓
Router (React Router)
    ↓
Pages (Route Components)
    ↓
Components (Reusable UI Components)
    ↓
Services (API Client)
    ↓
Backend API
```

### Request Flow

1. **User Interaction**: User interacts with React components
2. **Component State**: Component state is updated
3. **API Call**: API client makes HTTP request to backend
4. **Response Handling**: Response is processed and state is updated
5. **UI Update**: UI is re-rendered with new data

## Project Structure

```
frontend/
├── public/                    # Static assets
│   ├── logo.svg              # App logo
│   └── vite.svg              # Vite logo
│
├── src/
│   ├── components/            # Reusable components
│   │   ├── AuthGuard.jsx      # Route protection
│   │   ├── Footer.jsx         # Footer component
│   │   └── Layout.jsx         # Main layout wrapper
│   │
│   ├── pages/                 # Page components
│   │   ├── AnalyticsPage.jsx  # Analytics dashboard
│   │   ├── DashboardPage.jsx  # User dashboard
│   │   ├── HomePage.jsx       # Home page
│   │   ├── LandingPage.jsx    # Landing page
│   │   ├── LoginPage.jsx      # Login form
│   │   ├── NotFoundPage.jsx   # 404 page
│   │   ├── RedirectPage.jsx   # URL redirect handler
│   │   └── RegisterPage.jsx   # Registration form
│   │
│   ├── api.js                 # API client configuration
│   ├── App.jsx                # Main app component
│   ├── App.css                # App-specific styles
│   ├── index.css              # Global styles
│   └── main.jsx               # App entry point
│
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind configuration
├── vercel.json                # Vercel deployment config
└── vite.config.mjs            # Vite configuration
```

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see backend README)

### Installation

1. **Clone and navigate to frontend**

   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**

   Create a `.env.local` file in the frontend root (optional for development):

   ```bash
   # Create environment file
   touch .env.local

   # Add environment variables
   echo "VITE_API_URL=http://localhost:9000/api/v1" >> .env.local
   ```

   Note: In development mode, the frontend uses Vite proxy to connect to the backend, so environment variables are optional.

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Access the application**

   - Frontend: http://localhost:5173
   - Backend: http://localhost:9000 (should be running)

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Production
npm run build        # Create production build
npm run preview      # Preview production build locally
```

## Configuration

### Environment Variables

Create a `.env.local` file in the frontend root:

```env
# API Configuration
VITE_API_URL=http://localhost:9000/api/v1

# Frontend URL (optional, defaults to window.location.origin)
VITE_FRONTEND_URL=http://localhost:5173

# App Configuration (optional)
VITE_APP_NAME=URL Shortener
VITE_APP_VERSION=1.0.0
```

### Vite Configuration

The Vite configuration (`vite.config.mjs`) includes:

- React plugin for React support
- Tailwind CSS plugin for Tailwind CSS support
- Development server proxy for API calls
- Build optimization settings

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      jsxRuntime: 'automatic',
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
```

### Tailwind Configuration

The Tailwind configuration (`tailwind.config.js`) includes:

- Content paths for Tailwind CSS scanning
- Theme customization
- Plugin configuration

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## Pages and Components

### Landing Page (`/`)

- **Hero Section**: Main call-to-action with URL shortening interface
- **Features Overview**: Key features showcase
- **Call-to-Action**: Sign up/login buttons

### Authentication Pages

#### Login Page (`/login`)

- **Email/Password Form**: Secure login form
- **Remember Me**: Optional session persistence
- **Error Handling**: User-friendly error messages
- **Redirect Logic**: Automatic redirect after successful login

#### Register Page (`/register`)

- **User Registration**: Username, email, and password registration
- **Password Strength**: Real-time password validation
- **Error Handling**: User-friendly error messages
- **Redirect Logic**: Automatic redirect after successful registration

### Dashboard Pages

#### Home Page (`/home`)

- **URL Shortener**: Main shortening interface
- **Quick Stats**: Basic usage statistics
- **Quick Actions**: Common operations
- **User Dashboard Link**: Link to full dashboard

#### Dashboard (`/dashboard`)

- **URL Management**: List all user URLs
- **Bulk Operations**: Select multiple URLs
- **URL Actions**: Copy, redirect, and analytics for each URL
- **Create URL**: Form to create new shortened URLs
- **Statistics**: Click counts and creation dates

#### Analytics (`/analytics`)

- **Click Charts**: Visual click statistics
- **Referrer Analysis**: Traffic source breakdown
- **Time-based Stats**: Performance over time
- **Click History**: Detailed click history table
- **URL Information**: Short URL and original URL display

### Utility Pages

#### Redirect Page (`/:shortId`)

- **URL Resolution**: Redirect to original URL
- **Loading State**: Smooth redirect experience
- **Error Handling**: Invalid URL handling
- **Analytics Tracking**: Click tracking via backend API

#### 404 Page (`*`)

- **Not Found**: Custom 404 page
- **Navigation**: Back to home options
- **User-Friendly**: Helpful error message

### Components

#### Layout Component

- **Header**: Navigation and user menu
- **Footer**: Links and information
- **Main Content**: Page content wrapper

#### AuthGuard Component

- **Route Protection**: Authentication check
- **Redirect Logic**: Unauthenticated user handling
- **Loading State**: Authentication verification
- **Error Handling**: Auth error management

#### Form Components

- **Input Fields**: Styled form inputs
- **Validation**: Real-time form validation
- **Error Messages**: User-friendly errors
- **Loading States**: Form submission feedback

## Styling

### Design System

The application uses Tailwind CSS for styling with a consistent design system:

- **Colors**: Primary, secondary, and status colors
- **Typography**: Consistent font families and sizes
- **Spacing**: Consistent spacing scale
- **Components**: Reusable component styles

### Responsive Design

The application is fully responsive with breakpoints for:

- Mobile: Default (320px+)
- Tablet: 768px+
- Desktop: 1024px+
- Large Desktop: 1280px+

### Component Styling

Components use Tailwind CSS utility classes for styling:

- **Buttons**: Consistent button styles with hover states
- **Forms**: Styled form inputs with focus states
- **Cards**: Card components with shadows and borders
- **Layout**: Flexbox and grid layouts for responsive design

## Deployment

### Vercel Deployment

1. **Connect Repository**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login to Vercel
   vercel login

   # Deploy
   vercel --prod
   ```

2. **Environment Variables**

   Set in Vercel dashboard:

   ```env
   VITE_API_URL=https://your-backend-url.com/api/v1
   VITE_FRONTEND_URL=https://your-frontend-url.com
   ```

3. **Custom Domain** (Optional)

   - Add domain in Vercel dashboard
   - Update DNS records
   - SSL automatically configured

### Netlify Deployment

1. **Build Configuration**

   ```toml
   # netlify.toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy**

   ```bash
   # Install Netlify CLI
   npm i -g netlify-cli

   # Deploy
   netlify deploy --prod --dir=dist
   ```

### GitHub Pages

1. **Build and Deploy**

   ```bash
   npm run build

   # Deploy to gh-pages branch
   npm install --save-dev gh-pages
   npm run deploy
   ```

2. **GitHub Actions** (Optional)

   Create `.github/workflows/deploy.yml`:

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
           with:
             node-version: "18"
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

## Performance

### Optimization Strategies

#### Code Splitting

- Lazy load components for reduced initial bundle size
- Split vendor code from application code
- Optimize route-based code splitting

#### Bundle Optimization

- Tree shaking to remove unused code
- Minification for production builds
- Source maps for debugging

#### API Optimization

- Efficient API calls with proper error handling
- Request caching where appropriate
- Optimistic UI updates

#### Image Optimization

- Lazy load images
- Use appropriate image formats
- Optimize image sizes

### Performance Monitoring

#### Web Vitals

- Monitor Core Web Vitals (LCP, FID, CLS)
- Track performance metrics
- Optimize for better scores

#### Bundle Analysis

- Analyze bundle size
- Identify large dependencies
- Optimize bundle composition

## Testing

### Testing Strategies

- **Unit Tests**: Test individual components and functions
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test user flows end-to-end
- **Accessibility Tests**: Test for accessibility compliance

### Testing Tools

- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Cypress**: E2E testing
- **ESLint**: Code quality and linting

---

Built with React, Vite, and Tailwind CSS.
