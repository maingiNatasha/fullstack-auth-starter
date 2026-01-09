# 🔐 Fullstack Auth Starter

A reusable, production-ready authentication starter designed to be used across multiple full-stack projects.

This repository focuses on clean architecture, secure authentication flows, and clear documentation, making it easy to plug authentication into future applications without reinventing the wheel.

---

## 🎯 Project Goals

- Provide a reusable authentication module
- Implement secure, real-world auth flows
- Keep backend and frontend cleanly separated
- Serve as a starter template for future full-stack projects
- Be well-documented for long-term maintainability

---

## 🧰 Tech Stack

### Backend (Implemented)
- Node.js
- Express.js
- MySQL
- JWT authentication
- bcrypt for password hashing

### Frontend (Planned)
- React
- API-based authentication
- Token & session handling

---

## 🏗 Architecture Overview

- RESTful API backend responsible for:
  - User registration & login
  - Password reset (forgot / reset flow)
  - Token-based authentication
- Frontend (to be added) will consume the backend API
- Backend and frontend are maintained as separate, independent modules
