# 🔐 Backend – Authentication API

This is the backend authentication service for the **Fullstack Auth Starter** project.

It provides a **secure, production-ready REST API** handling user authentication flows such as registration, login, and password recovery. The backend is designed to be **reusable**, **well-structured**, and **framework-agnostic** with respect to the frontend.

---

## 🧰 Tech Stack

- Node.js
- Express.js
- MySQL
- JWT (JSON Web Tokens)
- bcrypt

---

## 🎯 Responsibilities

The backend is responsible for:

- User registration
- User login
- Password hashing and verification
- Token-based authentication
- Password reset (forgot / reset flow)
- Database interaction and validation

---

## 🏗 Architecture Overview

The backend follows a layered architecture with clear separation of concerns:

- **Routes** – Define API endpoints and map requests to controllers
- **Controllers** – Handle request/response logic
- **Services** – Contain core business logic
- **Models** – Handle database queries and persistence
- **Middleware** – Authentication and request validation
- **Validators** – Input validation schemas
- **Utils** – Shared helper functions
- **DB** – Database connection and configuration

This structure improves maintainability, testability, and reusability.

---

## 📁 Folder Structure
```
backend/
├── src/
│ ├── controllers/ # Request handling logic
│ ├── routes/ # API route definitions
│ ├── services/ # Business logic
│ ├── models/ # Database queries
│ ├── middleware/ # Auth & validation middlewares
│ ├── db/ # Database connection & config
│ ├── validators/ # Request validation schemas
│ ├── utils/ # Helpers and utilities
│ └── app.js # Express app setup
│
├── server.js # Application entry point
├── .env.example # Environment variable template
├── package.json
└── README.md
```
---

## 🔐 Authentication Flow

### 1. Registration
- User submits registration details
- Password is hashed using bcrypt
- User record is stored in the database

### 2. Login
- User credentials are validated
- Password hash is compared
- JWT is issued on successful authentication

### 3. Protected Routes
- Client sends JWT in the `Authorization` header
- Token is verified via middleware
- Access is granted or denied accordingly

### 4. Password Reset
- User requests password reset
- Reset token is generated and stored
- User resets password using valid token
- Token is invalidated after use

---

## 🔑 Environment Variables

Create a `.env` file using `.env.example` as a reference.

Typical variables include:
- Database credentials
- JWT secrets
- Token expiration values
- Server port

⚠️ Never commit your `.env` file.

---

## 🗄 Database Schema

The database schema is provided in:

- `src/db/schema.sql`

This file is generated using `mysqldump` and contains tables, indexes, and constraints only (no data).

---

## 🚀 Running the Backend

1. Install dependencies:
   npm install

2. Start the development server:
   npm install

---

## 📡 API Endpoints

### Authentication
All routes are prefixed with `/auth`.

| Method | Endpoint                | Description |
|--------|-------------------------|------------|
| POST   | /auth/register          | Register a new user |
| POST   | /auth/login             | Authenticate a user |
| GET    | /auth/user              | Get current user |
| POST   | /auth/password/forgot   | Request password reset |
| POST   | /auth/password/reset    | Reset user password |

### Profile
All routes are prefixed with `/profile`.

| Method | Endpoint        | Description |
|--------|-----------------|------------|
| GET    | /profile        | Get authenticated user profile |
| PUT    | /profile        | Update authenticated user profile |

---

## 🧪 Postman Collection

All API endpoints are documented and testable via Postman.

👉 **Postman Collection:**
https://www.postman.com/natashamaingi/my-workspace/collection/27984211-9c21d450-0564-4363-b222-a90ae0d9c843/?action=share&creator=27984211&active-environment=27984211-a3483cb7-b307-4533-9550-5518a8bd2a7f

Import the collection into Postman to:
- Test authentication flows
- Explore available endpoints
- View request/response examples

> The collection includes authentication and profile endpoints.

---

## 🔒 Security Considerations

- Passwords are never stored in plain text

- bcrypt is used for password hashing

- JWT secrets are stored securely in environment variables

- Protected routes require valid tokens

- Password reset tokens are time-limited

---

## 🧩 Reusability

This backend is designed as a standalone authentication module and can be reused across different applications and architectures.
