# Network Timeout Diagnosis and Solution

## Root Cause
**Your API calls are timing out** due to high latency (360ms) and packet loss (66.6%) to the Pexels API servers.

### Network Test Results
```
Ping to api.pexels.com (104.18.66.220): 
- Latency: ~360ms
- Packet Loss: 66.6%
```

This indicates either:
1. ISP network issues
2. Geographic distance to Pexels CDN
3. Network configuration/firewall issues

## Changes Made

### 1. **Server Timeout Increased** (`server.js`)
   - Changed timeout from default to **30 seconds**
   - This gives the network time to complete requests despite high latency

### 2. **Frontend Timeout Added** (`Video.jsx`)
   - Added axios timeout of **40 seconds** on the client
   - Added better error handling for timeout errors
   - Shows user-friendly alert for timeout errors

### 3. **API Endpoint Fixed** (`Video.jsx`)
   - Changed from hardcoded `http://localhost:5000/api/videos` 
   - Now uses relative path `/api/videos` (works with Vite proxy)

## How to Test

### Terminal 1: Start Backend
```bash
cd /home/amine/Documents/React-projects
npm run server
```

### Terminal 2: Start Frontend  
```bash
cd /home/amine/Documents/React-projects
npm run dev
```

Then navigate to the Video gallery and search for videos. **Be patient** - due to the high latency, responses may take 10-30 seconds.

## Expected Behavior
1. Server receives request
2. Server makes request to Pexels API (may take 10-20 seconds)
3. Frontend receives videos
4. Gallery displays videos

## If Still Timing Out

Try these solutions in order:

### Option A: Use a Video Caching Layer
Implement MongoDB/Redis caching to avoid repeated API calls

### Option B: Use a Different Video API
Consider: YouTube Data API, Vimeo, or local video files

### Option C: Increase Timeout Even More
Edit `server.js` line 19: `timeout: 60000` (60 seconds)

### Option D: Check Your Internet Connection
```bash
# Test connection quality
mtr -c 10 api.pexels.com
speedtest-cli
```

## Files Modified
- ✅ `/server.js` - Increased timeout to 30 seconds
- ✅ `/src/Projects/Gallery/Video.jsx` - Fixed API path + timeout + error handling
