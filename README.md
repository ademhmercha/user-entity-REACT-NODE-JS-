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
