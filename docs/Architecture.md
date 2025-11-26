# Architecture — Client Management System

## Overview
This repository is a full‑stack **Client Management System**:
- **Frontend:** React + Vite (Single Page App)
- **Backend:** Node.js + Express REST API
- **Database:** MongoDB (Atlas or self-hosted)
- **Auth:** JWT-based authentication
- **Deployment targets:** Frontend → Netlify; Backend → Render

## High-level architecture
```
                         +-------------------+
                         |    End Users      |
                         | (Admin / Receptionist /
                         |   Doctor / Patient)|
                         +---------+---------+
                                   |
                                   | HTTPS (REST)
                                   |
                         +---------v---------+
                         |      Frontend      |  (React + Vite, hosted on Netlify)
                         | - Auth UI          |
                         | - Dashboard/pages  |
                         | - Calls Backend API|
                         +---------+---------+
                                   |
                                   | HTTPS (REST)
                                   |
                         +---------v---------+
                         |      Backend       |  (Node.js + Express, hosted on Render)
                         | - Auth controllers |
                         | - Patients, Billing|
                         | - Prescriptions,   |
                         | - Business logic   |
                         +---------+---------+
                                   |
                                   | MongoDB driver (TCP/URI)
                                   |
                         +---------v---------+
                         |      Database      |  (MongoDB Atlas / self-hosted)
                         +--------------------+
```

## Key components
- **Frontend**
  - `src/pages/*` and `src/components/*` render UI and call backend APIs (via `services/`).
  - `src/context/AuthContext.jsx` holds user auth state and token.
  - `PrivateRoute.jsx` protects routes.

- **Backend**
  - `routes/` define REST endpoints (`/api/auth`, `/api/patients`, `/api/billing`, `/api/prescriptions`, etc.).
  - `controllers/` implement request handlers and business flow.
  - `models/` (Mongoose) define data schema.
  - `config/db.js` connects to MongoDB.
  - `middleware/auth.js` checks JWT.

## Non-functional concerns
- Use HTTPS in production (Netlify and Render provide TLS by default).
- Keep secrets (JWT_SECRET, MONGO_URI) in Render/Netlify environment settings — never commit secrets.
- Add CORS policy on backend to restrict origins.
