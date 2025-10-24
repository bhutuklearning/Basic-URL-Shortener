# Cookie Authentication Fix - Deployment Guide

## Problem Identified
The login issue was caused by **SameSite cookie rejection** in cross-site contexts. The browser was rejecting cookies with `SameSite: 'Lax'` when the frontend (Vercel) and backend (Render) are on different domains.

## Fixes Applied

### 1. Cookie Configuration Fix
Updated `backend/src/utils/generateToken.js`:
- Fixed production detection logic
- Ensured `SameSite: 'None'` and `Secure: true` for cross-site contexts
- Kept `SameSite: 'Lax'` and `Secure: false` for local development

### 2. CORS Configuration Enhancement
Updated `backend/src/app.js`:
- Added URL normalization to handle trailing slashes
- Improved origin matching logic
- Maintained `.vercel.app` domain flexibility

## Required Environment Variables on Render

Set these environment variables in your Render dashboard:

```bash
NODE_ENV=production
FRONTEND_URL=https://url-shortener-basic.vercel.app
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
```

## Required Environment Variables on Vercel

Set this environment variable in your Vercel dashboard:

```bash
VITE_API_URL=https://your-backend-app.onrender.com/api/v1
```

## Deployment Steps

1. **Deploy Backend to Render:**
   ```bash
   git add .
   git commit -m "Fix: Cross-site cookie authentication for production"
   git push origin main
   ```

2. **Verify Render Environment:**
   - Ensure `NODE_ENV=production` is set
   - Verify `FRONTEND_URL` matches your Vercel URL exactly
   - Check all JWT secrets are configured

3. **Deploy Frontend to Vercel:**
   - Ensure `VITE_API_URL` points to your Render backend
   - Redeploy if environment variables changed

## Testing Checklist

After deployment, test these scenarios:

- [ ] Login with valid credentials
- [ ] Check browser console for cookie errors
- [ ] Verify redirect to dashboard after login
- [ ] Test logout functionality
- [ ] Verify token refresh works
- [ ] Test protected routes access

## Cookie Settings Summary

| Environment | SameSite | Secure | HttpOnly | Domain |
|-------------|----------|--------|----------|---------|
| Development | `Lax` | `false` | `true` | localhost |
| Production | `None` | `true` | `true` | cross-site |

## Troubleshooting

If issues persist:

1. **Check Browser Console:** Look for specific cookie rejection messages
2. **Verify CORS:** Ensure your frontend URL is in allowed origins
3. **Check Network Tab:** Verify cookies are being set in response headers
4. **Environment Variables:** Double-check all environment variables are set correctly

## Security Notes

- Cookies use `HttpOnly: true` to prevent XSS attacks
- `Secure: true` in production ensures HTTPS-only transmission
- `SameSite: 'None'` allows cross-site usage but requires `Secure: true`
- All JWT tokens are properly signed and have appropriate expiration times