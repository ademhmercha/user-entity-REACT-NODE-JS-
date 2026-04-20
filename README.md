# User Authentication System

Full-stack authentication system built with **Node.js + Express**, **React (Vite)**, and **MongoDB**.

## Features

- Register with email confirmation
- Login with JWT stored in httpOnly cookie
- Forgot / Reset password via email link
- Protected route (`/me`) requiring authentication
- Input validation on all endpoints
- CORS configured for the frontend URL

---

## Project Structure

```
user-entity/
├── server/                     # Node.js + Express API
│   ├── controllers/
│   │   └── authController.js   # Register, login, forgot/reset password, logout, getMe
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT cookie verification
│   ├── models/
│   │   └── User.js             # Mongoose schema
│   ├── routes/
│   │   └── auth.js             # All /api/auth/* routes
│   ├── utils/
│   │   └── sendEmail.js        # Nodemailer email templates
│   ├── server.js               # Entry point
│   ├── package.json
│   └── .env                    # ← YOU MUST CREATE THIS (see below)
│
└── client/                     # React + Vite frontend
    └── src/
        ├── api/
        │   └── auth.js         # Axios instance (withCredentials)
        ├── pages/
        │   ├── Register.jsx
        │   ├── Login.jsx
        │   ├── ForgotPassword.jsx
        │   ├── ResetPassword.jsx
        │   ├── VerifyEmail.jsx
        │   └── Me.jsx          # Protected profile page
        ├── App.jsx             # React Router v6 routes
        └── main.jsx
```

---

## Environment Variables

Create a file called `.env` inside the `server/` folder:

```
server/.env
```

Copy the template below and fill in your values:

```env
# Server port (default: 5000)
PORT=5000

# MongoDB connection string
# Local:   mongodb://localhost:27017/user-auth
# Atlas:   mongodb+srv://<user>:<password>@cluster.mongodb.net/user-auth
MONGO_URI=mongodb://localhost:27017/user-auth

# Secret key used to sign JWT tokens — use a long random string
# Generate one: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=replace_this_with_a_long_random_secret

# Gmail address used to send emails
EMAIL_USER=your_email@gmail.com

# Gmail App Password (NOT your normal Gmail password)
# How to get one → see section below
EMAIL_PASS=your_16_character_app_password

# URL of the React frontend (used in email links and CORS)
CLIENT_URL=http://localhost:5173
```

### How to get a Gmail App Password

> Required if your Gmail account has 2-Step Verification enabled (recommended).

1. Go to your Google Account → **Security**
2. Under "How you sign in to Google", click **2-Step Verification**
3. Scroll to the bottom → **App passwords**
4. Select app: **Mail** — Select device: **Other** → type a name (e.g. `NodeMailer`)
5. Click **Generate** — copy the 16-character password into `EMAIL_PASS`

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18+
- [MongoDB](https://www.mongodb.com/try/download/community) running locally, **or** a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Clone the repo

```bash
git clone https://github.com/ademhmercha/user-entity-REACT-NODE-JS-.git
cd user-entity-REACT-NODE-JS-
```

### 2. Set up the server

```bash
cd server
npm install
```

Create your `.env` file as shown above, then:

```bash
npm run dev
```

Server runs at `http://localhost:5000`

### 3. Set up the client

```bash
cd client
npm install
npm run dev
```

Client runs at `http://localhost:5173`

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Register a new user |
| GET | `/api/auth/verify-email?token=…` | Public | Confirm email address |
| POST | `/api/auth/login` | Public | Login and receive JWT cookie |
| POST | `/api/auth/logout` | Public | Clear JWT cookie |
| POST | `/api/auth/forgot-password` | Public | Send password reset email |
| POST | `/api/auth/reset-password` | Public | Set new password with reset token |
| GET | `/api/auth/me` | **Protected** | Get current user profile |

All responses follow the format:
```json
{ "success": true, "message": "...", "data": {} }
```

---

## Frontend Routes

| Route | Page |
|-------|------|
| `/register` | Sign up form |
| `/login` | Login form |
| `/forgot-password` | Request reset link |
| `/reset-password?token=…` | Set new password |
| `/verify-email?status=success\|error` | Email verification result |
| `/me` | Protected profile page |

---

## Security Notes

- Passwords hashed with **bcrypt** (12 salt rounds)
- JWT stored in **httpOnly cookie** — not accessible via JavaScript
- Email verification required before login is allowed
- Password reset tokens expire after **1 hour**
- CORS restricted to `CLIENT_URL` only
- Input validation on every endpoint via `express-validator`
