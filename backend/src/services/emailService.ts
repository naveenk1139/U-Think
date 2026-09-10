import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Read credentials, falling back to legacy SMTP_ vars for backwards compatibility if needed
// but strongly preferring the new EMAIL_ configuration standard.
const EMAIL_USER = process.env.EMAIL_USER || process.env.SMTP_USER || '';
const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD || process.env.SMTP_PASS || '';
const EMAIL_FROM = process.env.EMAIL_FROM || process.env.SMTP_FROM || EMAIL_USER;

// Strict validation: Do not start if no SMTP user/pass
if (!EMAIL_USER || !EMAIL_APP_PASSWORD) {
  console.error('\n❌ FATAL: EMAIL_USER and EMAIL_APP_PASSWORD must be provided in .env');
  console.error('Email functionality will fail until configured properly.\n');
}

/** Nodemailer transporter - Single Reusable Instance */
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_APP_PASSWORD.replace(/\s+/g, ''), // Automatically remove any accidental spaces
  },
});

// Verify connection configuration on startup
if (EMAIL_USER && EMAIL_APP_PASSWORD) {
  transporter.verify((error, success) => {
    if (error) {
      console.error('\n❌ SMTP Verification Failed:');
      console.error(error.message);
      console.error('Please check your EMAIL_USER and Google App Password in .env\n');
    } else {
      console.log('✅ SMTP Server verified and ready to send emails');
    }
  });
}

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
  // DO NOT log the OTP in production
  console.log(`Sending verification email to: ${to}`);

  const subject = 'U-THINK Password Reset OTP';

  // Minimal professional content as requested
  const textContent = `Hello,\n\nYour U-THINK email verification code is:\n\n${otp}\n\nThis OTP will expire in 10 minutes.\n\nSECURITY WARNING: Do not share this OTP with anyone.\nIf you did not request this code, please ignore this email.\n\nRegards,\nU-THINK Team`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
      <h2 style="color: #2563EB; border-bottom: 2px solid #2563EB; padding-bottom: 10px;">U-THINK Security</h2>
      <p>Hello,</p>
      <p>Your U-THINK email verification code is:</p>
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 4px; text-align: center; margin: 20px 0;">
        <h2 style="font-size: 32px; letter-spacing: 5px; color: #1e3a8a; margin: 0;">${otp}</h2>
      </div>
      <p><strong>This OTP will expire in 10 minutes.</strong></p>
      <p style="color: #dc2626; font-size: 14px; font-weight: bold;">SECURITY WARNING: Do not share this OTP with anyone.</p>
      <p style="color: #666; font-size: 14px;">If you did not request this code, please ignore this email and your account will remain secure.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #888;">Regards,<br/><strong>U-THINK Team</strong></p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"U-THINK Authentication" <${EMAIL_FROM}>`,
      to,
      subject,
      text: textContent,
      html: htmlContent,
    });
    console.log('✅ OTP email delivered successfully via Gmail SMTP');
  } catch (err: any) {
    console.error('\n❌ Failed to send OTP email:');
    console.error(err?.message || err);
    // Throw error so authController aborts the process
    throw new Error('Unable to send verification email. Please check your network or try again later.');
  }
}
