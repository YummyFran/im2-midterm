const db = require("../config/db");
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs')
require("dotenv").config();

const createUser = async (uuid, name, email, passwordHash = "") => {
  const result = await db.query(
    "INSERT INTO users (uid, name, email, password) VALUES (?, ?, ?, ?)",
    [uuid, name, email, passwordHash]
  );

  console.log(result);

  return { uid: uuid, name, email };
};

const getUserByEmail = async (email) => {
  const rows = await db.query("SELECT * FROM users WHERE email = ?", [email]);

  if (rows.length == 0) return false;

  return rows[0];
};

const getUserById = async (uid) => {
  if (!uid) return null;

  const [rows] = await db.query("SELECT * FROM users WHERE uid = ?", [uid]);
  return rows[0];
};

const getUsers = async ({ limit, offset }) => {
  const [users] = await db.query(
    "SELECT *, COUNT(*) OVER() AS total_count FROM users ORDER BY status LIMIT ? OFFSET ?",
    [Number(limit), Number(offset)]
  );

  return users;
};

const saveToken = async ({ token, expires, uid }) => {
  await db.query(
    "UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE uid = ?",
    [token, expires, uid]
  );

  return;
};

const generateResetLink = async ({ token, uid }) => {
  const base_url = "http://localhost:3000";
  const path = "reset-password";
  const query = `token=${token}&uid=${uid}`;

  return `${base_url}/${path}?${query}`;
};

const sendEmail = async ({ email, resetLink }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yumpalomares@gmail.com",
      pass: "absr jhtq utly tjbr",
    },
  });
  const mailOptions = {
    from: "yumpalomares@gmail.com",
    to: email,
    subject: "Reset Your Password - BlogApp",
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        
        <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
        
        <p style="font-size: 15px; color: #555;">
          Hi there, <br><br>
          We received a request to reset your password for your <b>BlogApp</b> account.
        </p>
        
        <p style="font-size: 15px; color: #555;">
          If you made this request, click the button below to reset your password:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" 
             style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            Reset Password
          </a>
        </div>
        
        <p style="font-size: 14px; color: #777;">
          Or copy and paste this link into your browser:<br>
          <a href="${resetLink}" style="color: #007bff;">${resetLink}</a>
        </p>
        
        <p style="font-size: 13px; color: #999;">
          This link will expire in 1 hour. If you did not request a password reset, you can safely ignore this email.
        </p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #aaa; text-align: center;">
          &copy; ${new Date().getFullYear()} BlogApp. All rights reserved.
        </p>
      </div>
    </div>
  `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email sent: " + info.response);
  });
};

const validateToken = async (uid, token) => {
    const tokenData = await db.query('SELECT uid, reset_token, reset_token_expires FROM users WHERE uid = ?', [
        uid
    ])

    if(tokenData.length == 0) return false

    const expiresAt = new Date(tokenData[0].reset_token_expires)
    const now = new Date()

    if (expiresAt < now) return false

    const hashedToken = tokenData[0].reset_token
    const ok = await bcrypt.compare(token, hashedToken)

    return ok
}

const updatePassword = async ({ uid, hashedPassword }) => {
    await db.query("UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE uid = ?", [
        hashedPassword, uid
    ])
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getUsers,
  saveToken,
  generateResetLink,
  sendEmail,
  validateToken,
  updatePassword
};
