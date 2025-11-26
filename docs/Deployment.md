# Deployment — Frontend on Netlify & Backend on Render

This guide shows how to deploy the **frontend** to **Netlify** and the **backend** to **Render**.

---

## Environment variables (placeholders)
Set these values in the Render / Netlify UI (do not commit them):
```
# Backend (.env on Render - set as environment vars via Render dashboard)
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
PORT=5000
FRONTEND_URL=https://your-netlify-site.netlify.app

# Frontend (Netlify build environment)
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## Frontend — Netlify (Static site)
1. Ensure `package.json` has build script:
   ```
   "build": "vite build"
   ```
2. Push the frontend directory to GitHub (or use monorepo config).
3. In Netlify:
   - Site → Add new site → Import from Git
   - Choose repository / branch
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Set environment variable:
     - `VITE_API_URL` = `https://<your-backend-service>.onrender.com/api`
   - Deploy site.

**Optional: Netlify CLI**
```
npm i -g netlify-cli
netlify login
npm run build
netlify deploy --prod --dir=dist
```

**Redirects / SPA support**
If using client-side routing, create a `_redirects` file in `public/` with:
```
/*    /index.html   200
```
Or configure `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Backend — Render (Node service)
Render supports direct GitHub deployments.

### Steps
1. Push the backend to GitHub (or ensure monorepo structure exposes backend folder).
2. Create a new **Web Service** on Render:
   - Environment: `Node`
   - Build command: `npm install`
   - Start command: `npm run start` (or `node server.js` / `npm run dev` for tests)
   - Branch: choose repo branch
3. Add environment variables in Render dashboard:
   - `MONGO_URI`, `JWT_SECRET`, `PORT` (Render assigns a dynamic port via `PORT` env var)
4. **Procfile / start script**
   - Ensure `package.json` has:
     ```
     "start": "node server.js"
     ```
   - Or add a `Procfile` (not required on Render, but accepted).

5. Deployment:
   - Render will build and deploy; use the service URL like `https://your-backend.onrender.com`.

### Notes
- Configure CORS to accept requests from your Netlify domain.
- If using file uploads, consider Render persistent disks or S3-compatible storage.
