# Low Level Design — Client Management System

## Folder layout (detected)
```
backend/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middleware/
 ├── config/
 ├── server.js
frontend/
 ├── src/
 │   ├── components/
 │   ├── pages/
 │   ├── services/
 │   └── context/
```

## Backend — modules & responsibilities

### Models (Mongoose)
- **User**
  - fields: `name`, `email`, `passwordHash`, `role` (`admin|doctor|receptionist`)
- **Patient**
  - fields: `firstName`, `lastName`, `dob`, `gender`, `contact`, `address`, `medicalHistory`, `createdBy`
- **Prescription**
  - fields: `patientId`, `doctorId`, `medicines[]`, `notes`, `issuedAt`
- **Billing / Invoice**
  - fields: `patientId`, `items[{desc, qty, price}]`, `total`, `status`, `paidAt`

### Controllers
- `authController` — register, login, token refresh
- `patientController` — CRUD for patients
- `billingController` — manage invoices/payments
- `prescriptionController` — create/view prescriptions

### Middleware
- `authMiddleware` — verify JWT and attach `req.user`
- `errorMiddleware` — central error handler
- `validateMiddleware` — request body validation (optional)

### Routes (examples)
- `POST /api/auth/login`
- `POST /api/auth/register` (if present)
- `GET /api/patients`
- `POST /api/patients`
- `GET /api/patients/:id`
- `PUT /api/patients/:id`
- `DELETE /api/patients/:id`
- `POST /api/prescriptions`
- `GET /api/billing`
- `POST /api/billing`

## Frontend — key modules

### services/*.js
- `authService.js` — login, logout, token refresh
- `patientService.js` — API wrappers to patients endpoints
- `billingService.js` — API wrappers to billing endpoints

### context/AuthContext.jsx
- Stores `user` and `token`
- Provides `login()`, `logout()`, `isAuthenticated`

### pages/*
- `Dashboard.jsx` — fetches patients & summary cards
- `ReceptionistPage.jsx` — patient registration & appointment flows
- `DoctorPage.jsx` — view patients & prescriptions
- `BillingPage.jsx` — create invoice & show payments

## Sample request (pseudo)
```
POST /api/patients
Headers:
  Authorization: Bearer <token>
Body:
  {
    firstName: "John",
    lastName: "Doe",
    dob: "1990-01-01",
    contact: "9999999999"
  }
```

## Notes & Recommendations
- Add request validation using `express-validator` or `Joi`.
- Add rate-limiting and brute-force protection (e.g., login attempts).
- Add role-based access control (RBAC) middleware for restricted endpoints.
