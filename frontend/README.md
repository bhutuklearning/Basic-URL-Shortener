# Advance URL Shortener Frontend Client

<p align="center">
  <img src="./public/Logo.png" alt="Advance URL Shortener Logo" width="300"/>
</p>

<p align="center">
  A premium single-page web client built on React 19, Vite, and Tailwind CSS. Provides a user dashboard, visual analytics graphs, administrative panels, and a class-based light/dark theme switcher.
</p>

---

## 📋 Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Client-Side Routing & Page Guards](#client-side-routing--page-guards)
- [Page & Component Reference](#page--component-reference)
- [Theme System (Light/Dark Switcher)](#theme-system-lightdark-switcher)
- [Axios API Client & Token Interceptors](#axios-api-client--token-interceptors)
- [Development Setup](#development-setup)

---

## 🔍 Overview

The frontend application serves as the interactive dashboard for short link generation, analytics analysis, and system administration. It is a completely decoupled Single Page Application (SPA) communicating with the backend API server over secure HTTP protocols.

---

## 🛠️ Tech Stack

- **UI Library**: React 19 (Hooks, Contexts, Suspense)
- **Build Pipeline**: Vite (v7.1.7)
- **Styling**: Tailwind CSS (v4.1.14) with custom variants
- **Routing**: React Router (v7.9.4)
- **HTTP Client**: Axios (with custom token recovery interceptors)
- **Feedback**: React Hot Toast for notification alerts, React Icons for visual iconography.

---

## 🚦 Client-Side Routing & Page Guards

Client routes are defined in `frontend/src/router.jsx` and render components wrapped dynamically inside route protection wrappers.

```
                  [ Visitor Request ]
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
      [ Public Route ]           [ Protected Route ]
      (e.g., /, /login)                  │
             │                           ▼
             │                  [ Auth / Admin Guard ]
             │                     Checks credentials
             │                           │
             │           ┌───────────────┴───────────────┐
             │           ▼ (Denied)                      ▼ (Approved)
             │      Redirect to Login            Render Target View
             │           │                               │
             ▼           ▼                               ▼
      [───────────── Render React Component ────────────────]
```

### Route Definitions:

| URL Path | Target View Component | Guard Wrapper | Page Access Level |
| :--- | :--- | :--- | :--- |
| `/` | `LandingPage` | None | Public pitch page |
| `/login` | `LoginPage` | None | Public login gateway |
| `/register` | `RegisterPage` | None | Public signup form |
| `/home` | `HomePage` | `AuthGuard` | Protected URL creation |
| `/dashboard` | `DashboardPage` | `AuthGuard` | Protected URL management |
| `/analytics` | `AnalyticsPage` | `AuthGuard` | Protected click reports |
| `/admin/dashboard` | `AdminDashboardPage` | `AdminGuard` | Administrative panel |
| `/:shortId` | `RedirectPage` | None | Public redirection portal |
| `*` | `NotFoundPage` | None | Fallback 404 handler |

---

## 📂 Page & Component Reference

The application divides UI layout concerns into reusable blocks:

### View Pages (`frontend/src/pages/`)
- **LandingPage.jsx**: Core landing portal. Highlights system features and leads users to authenticate.
- **LoginPage.jsx** / **RegisterPage.jsx**: Form views handling registration validation and login credentials verification.
- **HomePage.jsx**: Interactive short link generator tool. Includes custom alias entry controls.
- **DashboardPage.jsx**: Direct link manager list. Features pagination, search filtering, fast copying, and deletion controls.
- **AnalyticsPage.jsx**: Generates interactive charts representing link usage telemetry over days, browsers, referrers, and unique visitors.
- **AdminDashboardPage.jsx**: Full interface for system admins. Displays global link lists, user roles, system metrics, and configuration options.
- **RedirectPage.jsx**: Clean interface that fetches target redirect destinations from the backend, updates click counters, and redirects visitors.

### Reusable Layout Components (`frontend/src/components/`)
- **Layout.jsx**: Core shell wrapper adding navigation headers, user profiles, logout controls, and sidebar navigation to pages.
- **ThemeToggle.jsx**: Button nested in Headers enabling transitions between Light and Dark styles.
- **AuthGuard.jsx**: Validates authentication profile. Redirects unauthenticated traffic back to `/login`.
- **AdminGuard.jsx**: Restricts view routes to accounts possessing `role: "admin"`.
- **Footer.jsx**: Bottom information footer.

---

## 🌓 Theme System (Light/Dark Switcher)

The client uses class-based Tailwind v4 utility settings controlled via a React Context Provider.

### How it Works:
1. **Context Initialization (`frontend/src/context/ThemeContext.jsx`)**:
   Creates a `ThemeContext` tracking state values (`'light'` or `'dark'`). It loads existing selections from `localStorage` on bootstrap.
2. **Document Manipulation**:
   Changing themes updates state and modifies the document element class list:
   - When `'dark'`, runs `document.documentElement.classList.add('dark')`.
   - When `'light'`, runs `document.documentElement.classList.remove('dark')`.
3. **Tailwind Styling**:
   `index.css` defines the custom dark variant:
   ```css
   @custom-variant dark (&:is(.dark *));
   ```
   Prefixing classes with `dark:` (e.g. `bg-white dark:bg-gray-900`) activates corresponding styles when `.dark` is set on the root `<html>` element.

---

## 🔄 Axios API Client & Token Interceptors

To support secure sessions without exposing tokens to local scripts, authentication utilizes access and refresh tokens. The client is configured in `frontend/src/api.js`.

### Access Controls:
- **`withCredentials: true`**: Configured globally in Axios. Tells the browser to include session cookies (`accessToken` and `refreshToken`) in all cross-origin backend queries.
- **Refresh Interceptor**:
  Axios binds a response interceptor catching HTTP failures. If a query fails with `401 Unauthorized` (indicating the short-lived `accessToken` has expired):
  1. It pauses the user request queue.
  2. Makes a POST call to `/auth/refresh-token` to retrieve a new token.
  3. On success, it retries the original user request.
  4. On failure (e.g., refresh token expired), it clears active sessions and redirects the browser to `/login`.

---

## 🚀 Development Setup

1. Make sure backend service is running on `http://localhost:9000`.
2. Install frontend packages:
   ```bash
   npm install
   ```
3. Start the Vite server:
   ```bash
   npm run dev
   ```
4. Build client assets for production deployment:
   ```bash
   npm run build
   ```
