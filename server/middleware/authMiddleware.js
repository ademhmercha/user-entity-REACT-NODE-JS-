const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware that protects routes requiring authentication.
 * Reads the JWT from the httpOnly cookie, verifies it, and attaches
 * the user payload to req.user so downstream handlers can use it.
 */
const protect = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authenticated. Please log in.' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user id to the request (avoid fetching full user here for performance)
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    // Token is invalid or expired
    return res.status(401).json({ success: false, message: 'Session expired. Please log in again.' });
  }
};

module.exports = { protect };
