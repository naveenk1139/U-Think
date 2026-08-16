import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER;

if (!SMTP_USER || !SMTP_PASS) {
  console.error('\n❌ SMTP_USER and SMTP_PASS are missing from .env');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

async function runTest() {
  const to = process.argv[2] || SMTP_USER; // send to self if no arg

  console.log(`Testing SMTP connection to ${SMTP_HOST}:${SMTP_PORT}...`);
  console.log(`Sending test email to: ${to}`);

  try {
    const info = await transporter.sendMail({
      from: `"U THINK Test" <${SMTP_FROM}>`,
      to,
      subject: 'U THINK Email Test',
      text: 'This is a test email from the U THINK backend. If you are reading this, your SMTP configuration is working perfectly!',
    });

    console.log('\n✅ SUCCESS: Email accepted by SMTP server');
    console.log(`Message ID: ${info.messageId}`);
  } catch (err: any) {
    console.error('\n❌ FAILED to send test email');
    console.error(err.message || err);
    process.exit(1);
  }
}

runTest();
