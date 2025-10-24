# URL Shortener — Frontend

A modern, responsive frontend for a URL Shortener application built with React 19, Vite 5, Tailwind via the official Vite plugin, React Router v6, and Axios. It supports authenticated dashboards, URL creation, and analytics, and is deployable to Vercel as a static build.

## Features
- Authentication: register, login, logout with cookie-based sessions
- Protected routes using `AuthGuard` and shared `Layout`
- Dashboard to manage and list shortened URLs
- Analytics page with charts, referrer and click details
- Short ID redirect route (e.g., `/abc123`) to original URLs
- Toast notifications (`react-hot-toast`) and iconography (`react-icons`)
- Production-ready URL handling for cross-domain deployment

## Tech Stack
- React 19, React Router v6
- Vite 5, Tailwind (via `@tailwindcss/vite` plugin)
- Axios with `withCredentials` for cookie-based auth
- Deployed via Vercel (`@vercel/static-build`)

## Project Structure
```
frontend/
  ├─ src/
  │  ├─ components/    # Layout, AuthGuard, Footer
  │  ├─ pages/         # Landing, Home, Login, Register, Dashboard, Analytics, Redirect, NotFound
  │  ├─ api.js         # Axios instance and API wrappers
  │  ├─ App.jsx        # Routing
  │  ├─ main.jsx       # App bootstrap
  │  ├─ index.css      # Global styles
  │  └─ App.css        # App-scoped styles
  ├─ vercel.json       # Static build + SPA route handling
  ├─ vite.config.mjs   # Dev server, proxy, plugins
  └─ package.json      # Scripts and dependencies
```

## Routing
Defined in `src/App.jsx` using `BrowserRouter`:
- Public: `/`, `/login`, `/register`, `/:shortId` (redirect)
- Protected (wrapped by `Layout` + `AuthGuard`): `/home`, `/dashboard`, `/analytics`
- Fallback: `*` → `NotFoundPage`

## API and Environment Configuration
`src/api.js`:
- Creates an Axios instance with `withCredentials: true`
- Base URL resolution:
  - Development: `'/api'` (proxied to backend via Vite)
  - Production: `VITE_API_URL` normalized to include `/api/v1` exactly once
- Production URL handling: Uses backend URL for shortened links to ensure proper redirection
- Cross-domain support: Properly handles URLs in both development and production environments

Required env in production (Vercel):
```
VITE_API_URL=https://<your-render-backend>/api/v1
```

## Vite Dev Server & Proxy
`vite.config.mjs` sets a dev proxy so the frontend can call the backend without CORS pain:
- Incoming `'/api'` → rewrites to `'/api/v1'`
- Proxies to `http://localhost:9000`

## Scripts
- `npm run dev` — start Vite dev server at `http://localhost:5173`
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the built app locally

## Deployment (Vercel)
- `vercel.json` uses `@vercel/static-build` with `distDir: "dist"`
- SPA routing: all paths fallback to `/index.html`
- Set `VITE_API_URL` in Vercel project settings to your backend base (include `/api/v1`)

## Authentication Notes
- Cookies must be accepted in a cross-site context (backend domain differs)
- Ensure backend sets cookies with `SameSite: 'None'` and `Secure: true` in production
- Axios is configured with `withCredentials: true`

## Getting Started
1. Install: `npm install`
2. Dev: `npm run dev` (backend on `http://localhost:9000`)
3. Build: `npm run build`
4. Preview: `npm run preview`

## Useful Tips
- If login fails in production, verify `VITE_API_URL` and backend CORS/cookie settings
- Keep `vercel.json` for SPA rewrites intact
- Tailwind is enabled via `@tailwindcss/vite`; styles are in `index.css`/`App.css`
