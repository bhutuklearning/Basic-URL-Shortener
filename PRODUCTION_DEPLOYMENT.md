# Production Deployment Checklist

## ⚠️ CRITICAL: Required Environment Variables

**The app will NOT work in production without these environment variables set correctly!**

### Backend Environment Variables (Render/Railway/Heroku)

Set these in your backend hosting platform (e.g., Render):

```bash
# Required - Server Configuration
NODE_ENV=production
PORT=10000  # Or whatever port your hosting provider uses

# Required - Database
MONGO_URI=your_mongodb_connection_string
DB_NAME=your_database_name

# Required - JWT Secrets
JWT_SECRET=your-super-secret-jwt-key-here
JWT_ACCESS_SECRET=your-access-token-secret
JWT_REFRESH_SECRET=your-refresh-token-secret

# Required - Frontend URL (MUST match your frontend domain exactly)
FRONTEND_URL=https://url-shortener-basic.vercel.app

# Optional - Backend URL (for self-pinging)
BACKEND_URL=https://your-backend-app.onrender.com

# Optional - JWT Expiration
JWT_EXPIRES=7d
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

### Frontend Environment Variables (Vercel)

Set these in your Vercel dashboard:

```bash
# Required - Backend API URL
VITE_API_URL=https://your-backend-app.onrender.com/api/v1

# Optional - Frontend URL (will use window.location.origin if not set)
VITE_FRONTEND_URL=https://url-shortener-basic.vercel.app
```

## ✅ What Will Work

1. **If all environment variables are set correctly:**
   - ✅ URL shortening will work
   - ✅ Short URLs will point to frontend (e.g., `https://your-frontend.com/abc123`)
   - ✅ Redirects will work correctly
   - ✅ Click tracking will work
   - ✅ Authentication will work
   - ✅ Analytics will work

2. **Fallbacks that work:**
   - Frontend `getPublicUrl()` uses `window.location.origin` if `VITE_FRONTEND_URL` is not set
   - Backend will try to infer frontend URL from request headers if `FRONTEND_URL` is not set (not reliable in production)

## ❌ What Won't Work

1. **If `VITE_API_URL` is not set in frontend:**
   - ❌ All API calls will fail (login, register, create URL, etc.)
   - ❌ The app will be completely broken

2. **If `FRONTEND_URL` is not set in backend:**
   - ❌ Short URLs may point to backend domain instead of frontend
   - ❌ Click tracking may not work correctly
   - ❌ Redirects may fail

3. **If CORS is not configured correctly:**
   - ❌ Frontend won't be able to make API calls
   - ❌ Authentication will fail
   - ❌ Cookies won't work

## 🚀 Deployment Steps

### 1. Deploy Backend First

1. Push code to GitHub
2. Connect repository to Render/Railway/Heroku
3. **Set all environment variables in your hosting platform**
4. Deploy backend
5. Note your backend URL (e.g., `https://your-backend-app.onrender.com`)

### 2. Deploy Frontend

1. Push code to GitHub
2. Connect repository to Vercel
3. **Set `VITE_API_URL` to your backend URL** (e.g., `https://your-backend-app.onrender.com/api/v1`)
4. Optionally set `VITE_FRONTEND_URL` to your frontend URL
5. Deploy frontend
6. Note your frontend URL (e.g., `https://url-shortener-basic.vercel.app`)

### 3. Update Backend Environment Variables

1. Go back to your backend hosting platform
2. **Update `FRONTEND_URL` to match your frontend URL exactly** (e.g., `https://url-shortener-basic.vercel.app`)
3. Redeploy backend (or restart if it auto-restarts)

### 4. Verify Deployment

1. Test login/register
2. Test creating a short URL
3. Test clicking a short URL
4. Test analytics
5. Check browser console for errors
6. Check backend logs for errors

## 🔍 Troubleshooting

### Issue: API calls failing

**Solution:**
- Check if `VITE_API_URL` is set correctly in Vercel
- Check if backend URL is accessible (try visiting it in browser)
- Check browser console for CORS errors
- Verify backend CORS configuration includes your frontend domain

### Issue: Short URLs pointing to backend

**Solution:**
- Check if `FRONTEND_URL` is set correctly in backend
- Verify `FRONTEND_URL` matches your frontend domain exactly (no trailing slash)
- Restart backend after setting environment variable

### Issue: Redirects not working

**Solution:**
- Check if backend `/api/v1/url/:shortId/original` endpoint is working
- Check browser console for errors
- Verify frontend `RedirectPage` is making API call correctly
- Check backend logs for errors

### Issue: Authentication not working

**Solution:**
- Check if JWT secrets are set correctly
- Check if cookies are being set (check browser DevTools)
- Verify CORS is configured correctly
- Check if `credentials: true` is set in axios configuration
- Check backend logs for authentication errors

## 📝 Quick Checklist

Before pushing to production, verify:

- [ ] Backend `FRONTEND_URL` is set to your frontend domain
- [ ] Frontend `VITE_API_URL` is set to your backend API URL
- [ ] All JWT secrets are set in backend
- [ ] Database connection string is set correctly
- [ ] CORS is configured to allow your frontend domain
- [ ] Backend is accessible from frontend
- [ ] Frontend is accessible from browser
- [ ] All environment variables are set (no missing variables)

## 🎯 Current Status

**After the recent fixes:**

✅ Code is ready for production
✅ Error handling improved
✅ Fallbacks added for better reliability
⚠️ **MUST configure environment variables before deployment**
⚠️ **Test after deployment to ensure everything works**

## 💡 Recommendations

1. **Test locally first** (if possible) with production-like environment variables
2. **Set environment variables before first deployment**
3. **Monitor logs** after deployment for any errors
4. **Test all functionality** after deployment
5. **Keep environment variables secure** (don't commit them to GitHub)

## 🔐 Security Notes

1. Never commit `.env` files to GitHub
2. Use strong JWT secrets (random strings, at least 32 characters)
3. Use HTTPS in production (Vercel and Render provide this)
4. Keep database connection strings secure
5. Regularly rotate JWT secrets

