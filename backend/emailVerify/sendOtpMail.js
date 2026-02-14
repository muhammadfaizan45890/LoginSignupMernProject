import nodemailer from "nodemailer";
import "dotenv/config";

/**
 * Send an OTP email to a user
 * @param {string} email - Recipient email address
 * @param {string|number} otp - OTP code to send
 * @param {Object} options - Optional config
 * @param {string} options.subject - Email subject
 * @param {number} options.expiryMinutes - OTP expiry in minutes
 */
export const sendOtpMail = async (
  email,
  otp,
  { subject = "Your OTP Code", expiryMinutes = 10 } = {}
) => {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    throw new Error("MAIL_USER or MAIL_PASS not defined in environment variables");
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Define email HTML
    const htmlContent = `
      <div style="font-family: 'Arial', sans-serif; color:#111; line-height:1.6;">
        <h2 style="color:#4CAF50;">${subject}</h2>
        <p>Hello,</p>
        <p>Your OTP code is:</p>
        <p style="font-size: 24px; font-weight: bold; color: #333; margin:10px 0;">${otp}</p>
        <p>This code is valid for <b>${expiryMinutes} minutes</b>.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <hr style="border:none; border-top:1px solid #eee; margin:20px 0;">
        <p style="font-size: 12px; color: #888;">Your App Team</p>
      </div>
    `;

    // Define plain text fallback
    const textContent = `Your OTP code is: ${otp}. It is valid for ${expiryMinutes} minutes. If you didn't request this, please ignore this email.`;

    // Email options
    const mailOptions = {
      from: `"Your App" <${process.env.MAIL_USER}>`,
      to: email,
      subject,
      html: htmlContent,
      text: textContent,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent to ${email}: ${info.response}`);
    return info;
  } catch (err) {
    console.error(`❌ Failed to send OTP email to ${email}:`, err.message);
    throw err;
  }
};
