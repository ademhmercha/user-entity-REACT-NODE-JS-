const nodemailer = require('nodemailer');

/**
 * Creates a reusable transporter using Gmail SMTP.
 * For production, consider using a dedicated email service (SendGrid, Resend, etc.)
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use an App Password if 2FA is enabled on Gmail
    },
  });
};

/**
 * Sends an email using Nodemailer.
 * @param {Object} options
 * @param {string} options.to      - Recipient email address
 * @param {string} options.subject - Email subject line
 * @param {string} options.html    - HTML body content
 */
const sendEmail = async ({ to, subject, html }) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"User Auth App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

/**
 * Builds and sends the email verification message.
 * @param {string} to    - Recipient email
 * @param {string} token - The verification token stored in the DB
 */
const sendVerificationEmail = async (to, token) => {
  const verificationUrl = `${process.env.SERVER_URL || 'http://localhost:5000'}/api/auth/verify-email?token=${token}`;

  await sendEmail({
    to,
    subject: 'Verify your email address',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Verify Your Email</h2>
        <p>Thank you for registering! Please click the button below to verify your email address.</p>
        <a
          href="${verificationUrl}"
          style="display:inline-block;padding:12px 24px;background:#4F46E5;color:#fff;text-decoration:none;border-radius:6px;margin:16px 0;"
        >
          Verify Email
        </a>
        <p style="color:#666;font-size:14px;">Or copy and paste this link in your browser:</p>
        <p style="color:#4F46E5;font-size:14px;">${verificationUrl}</p>
        <p style="color:#999;font-size:12px;">This link will expire in 24 hours.</p>
      </div>
    `,
  });
};

/**
 * Builds and sends the password reset email.
 * The link points to the React frontend route /reset-password.
 * @param {string} to    - Recipient email
 * @param {string} token - The reset token stored in the DB
 */
const sendPasswordResetEmail = async (to, token) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

  await sendEmail({
    to,
    subject: 'Reset your password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Reset Your Password</h2>
        <p>You requested a password reset. Click the button below to choose a new password.</p>
        <a
          href="${resetUrl}"
          style="display:inline-block;padding:12px 24px;background:#EF4444;color:#fff;text-decoration:none;border-radius:6px;margin:16px 0;"
        >
          Reset Password
        </a>
        <p style="color:#666;font-size:14px;">Or copy and paste this link in your browser:</p>
        <p style="color:#EF4444;font-size:14px;">${resetUrl}</p>
        <p style="color:#999;font-size:12px;">This link will expire in 1 hour. If you did not request this, ignore this email.</p>
      </div>
    `,
  });
};

module.exports = { sendEmail, sendVerificationEmail, sendPasswordResetEmail };
