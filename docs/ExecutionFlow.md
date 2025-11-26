# Execution Flow — Key User Flows

This document describes the major execution flows (startup, auth, CRUD operations).

## 1. App startup
- User opens frontend (Netlify-served SPA).
- `main.jsx` initializes React, sets up `AuthContext`.
- If a JWT token exists in localStorage, AuthContext validates it (optionally calls `/api/auth/validate`).

## 2. Authentication flow (login)
1. User submits credentials on `/login`.
2. Frontend calls `POST /api/auth/login` with `{ email, password }`.
3. Backend `authController.login`:
   - Validates credentials using `User` model.
   - Issues JWT token signed with `JWT_SECRET`.
   - Responds with `{ token, user }`.
4. Frontend stores token (localStorage) and sets `AuthContext` user.
5. Protected requests include `Authorization: Bearer <token>`.

## 3. Get patients (dashboard)
1. Frontend calls `GET /api/patients` with auth header.
2. Backend `patientController.getAll`:
   - Verifies JWT from header.
   - Queries MongoDB (e.g., `Patient.find({})`).
   - Returns patient list.
3. Frontend renders `PatientCard` components.

## 4. Create / Update / Delete patient
- `POST /api/patients` — create (body: patient data)
- `PUT /api/patients/:id` — update
- `DELETE /api/patients/:id` — delete
Flow: Frontend sends request → Backend validates auth & payload → DB write → Responds with updated resource.

## 5. Billing & Prescription flow
- Billing endpoints: `/api/billing` manage invoices, payments.
- Prescription endpoints: `/api/prescriptions` create/view prescriptions.
- Backend controllers perform business validation (e.g., patient exists, invoice totals).

## 6. Error handling & retries
- Backend returns standard HTTP status codes and JSON errors:
  - `401 Unauthorized` for auth failures
  - `400 Bad Request` for validation errors
  - `500 Internal Server Error` for unexpected errors
- Frontend shows toast/alerts on error and uses retry logic where appropriate.
