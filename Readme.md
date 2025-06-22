# Clinic Management System

A full-stack web application for managing clinic operations, including user authentication, patient management, prescriptions, and billing.  
Built with **React + Vite** (frontend) and **Node.js + Express + MongoDB** (backend).

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [License](#license)

---

## Features

- **User Authentication**: Login and registration for doctors and receptionists.
- **Role-based Access**: Doctors and receptionists have different dashboards and permissions.
- **Patient Management**: Add, view, and manage patient records.
- **Prescription Management**: Doctors can add prescriptions for patients.
- **Billing Management**: Receptionists can generate and view bills for patients.
- **Responsive UI**: Built with Tailwind CSS for modern, responsive design.

---

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- **Other**: dotenv, cors, morgan

---

## Project Structure

```
Client ManagementSystem/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── config/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
└── README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (local or cloud)

---

### Environment Variables

#### Backend (`backend/.env`)

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

#### Frontend (`frontend/.env`)

```
REACT_APP_API_URL=http://localhost:5000
```

---

### Installation

#### 1. Clone the repository

```sh
git clone <repo-url>
cd Client\ ManagementSystem
```

#### 2. Install backend dependencies

```sh
cd backend
npm install
```

#### 3. Install frontend dependencies

```sh
cd ../frontend
npm install
```

---

### Running the App

#### 1. Start MongoDB

Make sure MongoDB is running locally or use a cloud MongoDB URI.

#### 2. Start the backend server

```sh
cd backend
npm start
```
The backend will run on [http://localhost:5000](http://localhost:5000).

#### 3. Start the frontend dev server

```sh
cd frontend
npm run dev
```
The frontend will run on [http://localhost:5173](http://localhost:5173).

---

## Usage

- **Login/Register**: Use the login page to sign in or create a new account (doctor or receptionist).
- **Receptionist Dashboard**: Add patients, view today's patients, and manage billing.
- **Doctor Dashboard**: View patients, add prescriptions, and view patient history.
- **Billing**: Receptionists can generate and view bills for patients.

---

## API Endpoints

### Auth

- `POST /api/auth/register` — Register a new user (doctor/receptionist)
- `POST /api/auth/login` — Login

### Patients

- `POST /api/patients` — Add a new patient (receptionist only)
- `GET /api/patients` — Get all patients
- `GET /api/patients/:id/history` — Get a patient's history

### Prescriptions

- `POST /api/prescriptions` — Add a prescription (doctor only)
- `GET /api/prescriptions/:id` — Get prescriptions for a patient

### Billing

- `POST /api/billing` — Create a bill (receptionist only)
- `GET /api/billing/:id` — Get bills for a patient

---

## Folder Structure

See [Project Structure](#project-structure) above for details.

---

## License

This project is licensed under the MIT License.

---