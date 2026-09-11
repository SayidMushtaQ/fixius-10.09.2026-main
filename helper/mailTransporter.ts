import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  pool: true, // Enable connection pooling
  host: "smtp.gmail.com", // Gmail SMTP server
  port: 465, // Use 465 for SSL (highly compatible and fast on cPanel/live)
  secure: true, // Set to true for SSL (port 465)
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL, // Your Gmail email
    pass: process.env.NEXT_PUBLIC_PASS, // Your App Password
  },
  maxConnections: 3, // Keep concurrent SMTP connections low for Gmail SMTP guidelines
  maxMessages: 100,  // Reconnect after 100 messages
  rateLimit: 1,      // Rate limit to 1 message per second to avoid Gmail spam/rate-limit blocks
});
