# Advance URL Shortener API Backend

<p align="center">
  <img src="../frontend/public/Logo.png" alt="Advance URL Shortener Logo" width="300"/>
</p>

<p align="center">
  A production-ready Express 5 REST API powering the Advance URL Shortener service. Handles user authentication, secure session cookies, click analytics tracking, database schemas, rate limiting, and administrative APIs.
</p>

---

## 📋 Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Database Models (Mongoose Schemas)](#database-models-mongoose-schemas)
- [REST API Reference](#rest-api-reference)
  - [Authentication Endpoints](#authentication-endpoints)
  - [URL Shortener Endpoints](#url-shortener-endpoints)
  - [Administrative Endpoints](#administrative-endpoints)
- [Security & Authentication Strategy](#security--authentication-strategy)
- [Error Handling Structure](#error-handling-structure)
- [Logging & Observability](#logging--observability)
- [Quick Start for Developers](#quick-start-for-developers)

---

## 🔍 Overview

The backend service is structured following a layered architectural pattern separating routing, middleware filtration, controller logic, and data mapping. The server exposes a RESTful JSON interface for the client and records visitor device and click metadata during redirection.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js (ES Modules syntax support)
- **Framework**: Express.js (v5.1.0)
- **Database**: MongoDB (via Mongoose v8.19.0)
- **Security & Session**: JWT (Access + Refresh tokens), bcryptjs password hashing, Helmet headers, express-rate-limit.
- **Logging**: Morgan HTTP logger integrated with dynamic daily rotating file streams.

---

## 🗄️ Database Models (Mongoose Schemas)

The MongoDB database maintains two primary collections: `users` and `urls`.

### 👤 User Model (`backend/src/models/User.model.js`)
Stores user profiles, access authorization roles, and session refresh tokens.

| Field | MongoDB Type | Validation / Constraints | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `userName` | `String` | Trimmed, Length: 3 - 50, Required | None | User display name |
| `email` | `String` | Unique, Trimmed, Lowercase, Regex validated | None | Account login email address |
| `password` | `String` | Min length: 6, Required | None | Bcrypt hashed password |
| `role` | `String` | Enum: `["user", "admin"]` | `"user"` | Application control clearance level |
| `refreshToken`| `String` | `select: false` (hidden in queries by default) | `undefined`| Valid refresh token string |
| `lastLogin` | `Date` | Date timestamp | `null` | Record of last session login time |
| `createdAt` | `Date` | Auto-generated timestamp | System | Document generation time |
| `updatedAt` | `Date` | Auto-generated timestamp | System | Document modification time |

### 🔗 URL Model (`backend/src/models/url.model.js`)
Maps short identifiers to original web targets and maintains a log of visitor interactions.

| Field | MongoDB Type | Validation / Constraints | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `originalUrl` | `String` | Required | None | Target destination web URL |
| `shortId` | `String` | Unique, Required | auto-generated | Unique identifier string (via `shortid`) |
| `customShortId`| `String` | Unique, Sparse index | `undefined` | Custom user-defined short identifier |
| `user` | `ObjectId` | Refers to `User` collection, Required | None | The owning user's database ID |
| `clicks` | `Array` | List of click subdocuments | `[]` | Click tracking data array (defined below) |
| `createdAt` | `Date` | Auto-generated timestamp | System | Document creation timestamp |
| `updatedAt` | `Date` | Auto-generated timestamp | System | Document update timestamp |

#### `clicks` Subdocument Structure:
- `timestamp` (`Date`): Timestamp of redirect click. Defaults to `Date.now`.
- `referrer` (`String`): HTTP Referer header identifying the source traffic domain.
- `ip` (`String`): Visitor IP address.

---

## 📡 REST API Reference

### Authentication Endpoints
All API routes are prefixed by `/api/v1/auth`.

#### 1. Register User
- **URL**: `/register`
- **Method**: `POST`
- **Body (`application/json`)**:
  ```json
  {
    "userName": "johndoe",
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "userName": "johndoe",
      "email": "john@example.com",
      "role": "user",
      "_id": "603dcbf1df7b69324888cf32"
    }
  }
  ```

#### 2. Login User
- **URL**: `/login`
- **Method**: `POST`
- **Body (`application/json`)**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Cookies Set**:
  - `accessToken` (Access Token JWT)
  - `refreshToken` (Refresh Token JWT)
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Logged in successfully",
    "data": {
      "userName": "johndoe",
      "email": "john@example.com",
      "role": "user"
    }
  }
  ```

#### 3. Refresh Access Token
- **URL**: `/refresh-token`
- **Method**: `POST`
- **Cookies Required**: `refreshToken` cookie.
- **Cookies Set**: `accessToken` cookie updated with a new validation token.
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Token refreshed successfully"
  }
  ```

#### 4. Get User Profile
- **URL**: `/profile`
- **Method**: `GET`
- **Headers Required**: `Authorization: Bearer <access_token>`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "603dcbf1df7b69324888cf32",
      "userName": "johndoe",
      "email": "john@example.com",
      "role": "user",
      "lastLogin": "2026-06-21T09:00:00.000Z"
    }
  }
  ```

#### 5. User Logout
- **URL**: `/logout`
- **Method**: `POST`
- **Headers Required**: `Authorization: Bearer <access_token>`
- **Cookies Cleared**: `accessToken` and `refreshToken`.
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```

---

### URL Shortener Endpoints
All API routes are prefixed by `/api/v1/url`.

#### 1. Shorten Link
- **URL**: `/`
- **Method**: `POST`
- **Headers Required**: `Authorization: Bearer <access_token>`
- **Body (`application/json`)**:
  ```json
  {
    "originalUrl": "https://example.com/long-url-path",
    "customShortId": "custom-alias"
  }
  ```
- **Response (210 Created)**:
  ```json
  {
    "success": true,
    "message": "URL shortened successfully",
    "data": {
      "originalUrl": "https://example.com/long-url-path",
      "shortId": "custom-alias",
      "customShortId": "custom-alias",
      "shortUrl": "http://localhost:5173/custom-alias"
    }
  }
  ```

#### 2. Get User URL Lists
- **URL**: `/myurls/direct`
- **Method**: `GET`
- **Headers Required**: `Authorization: Bearer <access_token>`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "603dcd75df7b69324888cf3c",
        "originalUrl": "https://example.com/long-url-path",
        "shortId": "custom-alias",
        "clickCount": 14
      }
    ]
  }
  ```

#### 3. Fetch URL Target (JSON)
- **URL**: `/:shortId/original`
- **Method**: `GET`
- **Description**: Returns redirect address as JSON. Records visitor IP and referrer headers into database analytics.
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "originalUrl": "https://example.com/long-url-path"
    }
  }
  ```

#### 4. Fetch Link Specific Analytics
- **URL**: `/:shortId/analytics`
- **Method**: `GET`
- **Headers Required**: `Authorization: Bearer <access_token>`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "originalUrl": "https://example.com/long-url-path",
      "totalClicks": 3,
      "uniqueClicks": 2,
      "clicks": [
        { "timestamp": "2026-06-21T09:12:00.000Z", "referrer": "Direct", "ip": "127.0.0.1" }
      ],
      "referrers": { "Direct": 1, "https://github.com": 2 }
    }
  }
  ```

#### 5. Direct HTTP Redirect
- **URL**: `/:shortId`
- **Method**: `GET`
- **Description**: Standard direct redirect. Logs analytics and returns HTTP 302 redirect directly to the target original URL.

---

### Administrative Endpoints
All API routes are prefixed by `/api/v1/admin` and require JWT user session authentication with `role: "admin"`.

#### 1. Get All System URLs
- **URL**: `/urls`
- **Method**: `GET`
- **Response (200 OK)**: Returns full array list of all created URL configurations across all users.

#### 2. Get All Registered Users
- **URL**: `/users`
- **Method**: `GET`
- **Response (200 OK)**: Returns list of user profiles (excluding passwords and tokens) including signup time and login history.

#### 3. Get Global Analytics
- **URL**: `/urls/analytics`
- **Method**: `GET`
- **Response (200 OK)**: Returns system-wide performance details (total clicks, unique visitors, total shortened links).

#### 4. Basic Auth endpoint
- **URL**: `/basic/urls`
- **Method**: `GET`
- **Headers Required**: `Authorization: Basic <base64_encoded_credentials>`
- **Description**: Serves all created short URLs to automated administrative client software scripts.

---

## 🔒 Security & Authentication Strategy

### JWT Token Verification
Authentication uses double token rotation:
1. **Access Token**: Short life (15 minutes). Decrypted to evaluate permissions.
2. **Refresh Token**: Long life (7 days) saved in secure database logs and client cookies. Exposes `/refresh-token` endpoint to automatically request new access tokens if expired.

### SameSite Cookies Configuration
We implemented cookie settings to handle local environments and cross-site production hosting:
- **Local Settings (`NODE_ENV !== 'production'`)**:
  - `httpOnly: true`, `secure: false`, `sameSite: 'Lax'`
- **Production Settings (`NODE_ENV === 'production'`)**:
  - `httpOnly: true`, `secure: true`, `sameSite: 'None'`
  - Allows secure cookies to cross domain bounds between frontend (Vercel) and backend (Render).

---

## 🛑 Error Handling Structure

The API server returns standardized JSON structures for all errors caught by the middleware stack:

```json
{
  "success": false,
  "error": "Error message description details",
  "stack": "Stack trace detail text (Only visible in development environment)"
}
```

---

## 📊 Logging & Observability

- **Standard HTTP Logs**: Morgan prints runtime HTTP traffic directly to development consoles.
- **Log Rotation File Streams**: Server implements daily rotating logs using `rotating-file-stream` writing to `src/logs/development` or `src/logs/production`. These are split automatically once they reach 10MB in size.

---

## 🚀 Quick Start for Developers

1. Install dependencies: `npm install`
2. Duplicate `.env.example` to `.env` and fill out your local MongoDB path and cryptographic secrets.
3. Start the Nodemon hot-reload engine:
   ```bash
   npm run backend
   ```
4. Access backend verification endpoint: `http://localhost:9000/health`.
