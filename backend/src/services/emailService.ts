import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER;

// Strict validation: Do not start if no SMTP user/pass
if (!SMTP_USER || !SMTP_PASS) {
  console.error('\n❌ FATAL: SMTP_USER and SMTP_PASS must be provided in .env');
  console.error('Email functionality will fail until configured properly.\n');
}

/** Nodemailer transporter */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

/** Generate a cryptographically random 6-digit OTP */
export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/** Send OTP email to the user (strict real email delivery) */
export async function sendOtpEmail(
  to: string,
  otp: string,
  type: 'login' | 'register' | 'forgot_password'
): Promise<void> {
  console.log('OTP generation started');
  console.log(`Destination: ${to}`);
  console.log('Sending verification email...');

  const subject = 'U THINK - Email Verification OTP';

  // Minimal professional content as requested
  const textContent = `Hello,\n\nYour U THINK email verification code is:\n\n${otp}\n\nThis OTP will expire in 10 minutes.\n\nIf you did not request this code, please ignore this email.\n\nRegards,\nU THINK Team`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <p>Hello,</p>
      <p>Your U THINK email verification code is:</p>
      <h2 style="font-size: 24px; color: #2563EB;">${otp}</h2>
      <p>This OTP will expire in 10 minutes.</p>
      <p style="color: #666; font-size: 14px;">If you did not request this code, please ignore this email.</p>
      <p>Regards,<br/>U THINK Team</p>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"U THINK" <${SMTP_FROM}>`,
      to,
      subject,
      text: textContent,
      html: htmlContent,
    });
    console.log('Email accepted by SMTP server');
    console.log('OTP email sent successfully');
  } catch (err: any) {
    console.error('\n❌ Failed to send OTP email:');
    console.error(err?.message || err);
    throw new Error('Unable to send verification email. Please try again.');
  }
}
