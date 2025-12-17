# Server-Frontend Communication Setup

## Overview
This document explains how the backend server (`server.js`) communicates with the frontend React component (`Video.jsx`).

---

## Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌──────────────┐
│   Video.jsx     │ ──────> │  Vite Dev Server │ ──────> │  server.js   │
│  (Frontend)     │         │   (Proxy: /api)  │         │  (Backend)   │
└─────────────────┘         └──────────────────┘         └──────────────┘
                                                                    │
                                                                    ▼
                                                            ┌──────────────┐
                                                            │ Pexels API   │
                                                            └──────────────┘
```

---

## How It Works

### 1. **Development Mode** (Recommended)
- Frontend runs on: `http://localhost:5173` (Vite default)
- Backend runs on: `http://localhost:5000`
- **Vite Proxy** automatically forwards `/api/*` requests to `http://localhost:5000`
- Frontend uses relative URL: `/api/videos`
- **No CORS issues** - handled by Vite proxy

### 2. **Production Mode**
- Frontend uses direct URL: `http://localhost:5000/api/videos`
- Requires CORS configuration (already set up in `server.js`)

---

## Setup Instructions

### Step 1: Start the Backend Server
```bash
npm run server
# or
node server.js
```

You should see:
```
🚀 Server running on port 5000
✅ PEXELS_API_KEY configured
```

### Step 2: Start the Frontend Dev Server
```bash
npm run dev
```

The frontend will start on `http://localhost:5173` (or another port if 5173 is busy).

### Step 3: Access the Video Gallery
Navigate to: `http://localhost:5173/Vedio-gallery`

---

## Configuration Files

### `vite.config.js`
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    },
  },
}
```
This tells Vite to proxy all `/api/*` requests to `http://localhost:5000`.

### `server.js`
- Express server listening on port 5000
- CORS enabled for cross-origin requests
- Endpoint: `GET /api/videos`
- Proxies requests to Pexels API

### `Video.jsx`
- Automatically detects development vs production mode
- Uses proxy URL (`/api/videos`) in development
- Uses direct URL (`http://localhost:5000/api/videos`) in production

---

## API Endpoint

### Request
```
GET /api/videos?query=nature&per_page=20&page=1
```

### Response
```json
{
  "page": 1,
  "per_page": 20,
  "videos": [...],
  "total_results": 8000
}
```

---

## Error Handling

The `Video.jsx` component now includes comprehensive error handling:

1. **Connection Errors**: Shows message if server is not running
2. **API Errors**: Displays server error messages
3. **Empty Results**: Shows friendly message when no videos found
4. **Timeout**: 10-second timeout to prevent hanging requests

---

## Troubleshooting

### Problem: "Cannot connect to server"
**Solution**: Make sure the backend server is running:
```bash
npm run server
```

### Problem: CORS errors
**Solution**: 
- In development: Use Vite proxy (already configured)
- In production: CORS is enabled in `server.js`

### Problem: "PEXELS_API_KEY not configured"
**Solution**: Create a `.env` file in the project root:
```bash
PEXELS_API_KEY=your_api_key_here
```

Get your API key from: https://www.pexels.com/api/

### Problem: Videos not loading
**Check**:
1. Is the server running? (`npm run server`)
2. Is the API key configured? (check `.env` file)
3. Check browser console for errors
4. Check server console for errors

---

## Testing the Connection

### Test Server Directly
```bash
curl "http://localhost:5000/api/videos?query=nature&per_page=5&page=1"
```

### Test Through Vite Proxy (when dev server is running)
```bash
curl "http://localhost:5173/api/videos?query=nature&per_page=5&page=1"
```

Both should return the same JSON response.

---

## Key Improvements Made

1. ✅ **Vite Proxy Configuration**: Eliminates CORS issues in development
2. ✅ **Smart URL Detection**: Automatically uses proxy in dev, direct URL in production
3. ✅ **Better Error Handling**: User-friendly error messages
4. ✅ **Video File Selection**: Automatically selects best quality video
5. ✅ **Timeout Protection**: Prevents hanging requests
6. ✅ **Empty State Handling**: Shows message when no videos found

---

## Summary

The communication between `server.js` and `Video.jsx` is now fully configured and working:

- ✅ **Development**: Uses Vite proxy (no CORS issues)
- ✅ **Production**: Uses direct connection (CORS enabled)
- ✅ **Error Handling**: Comprehensive error messages
- ✅ **User Experience**: Clear feedback on connection status

Just make sure both servers are running:
1. Backend: `npm run server`
2. Frontend: `npm run dev`

Then navigate to `/Vedio-gallery` in your browser!

