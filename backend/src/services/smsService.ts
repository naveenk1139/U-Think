import twilio from 'twilio';

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER
} = process.env;

const isConfigured = 
  TWILIO_ACCOUNT_SID && 
  TWILIO_AUTH_TOKEN && 
  TWILIO_PHONE_NUMBER && 
  TWILIO_ACCOUNT_SID !== 'your_twilio_account_sid';

let twilioClient: twilio.Twilio | null = null;

if (isConfigured) {
  twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
}

export async function sendOtpSms(to: string, otp: string, type: 'login' | 'register' | 'forgot_password'): Promise<void> {
  const messageBody = `Your U-THINK ${type} verification code is: ${otp}. It will expire in 10 minutes.`;

  // ── Dev fallback ────────────────────────────────────────────────
  if (!isConfigured || !twilioClient) {
    console.log('\n' + '─'.repeat(50));
    console.log(`📱 [OTP SMS - DEV MODE]`);
    console.log(`   To   : ${to}`);
    console.log(`   Type : ${type}`);
    console.log(`   Code : ${otp}`);
    console.log('─'.repeat(50) + '\n');
    return;
  }
  // ────────────────────────────────────────────────────────────────

  try {
    console.log('SMS send request started');
    await twilioClient.messages.create({
      body: messageBody,
      from: TWILIO_PHONE_NUMBER,
      to,
    });
    console.log('✅ OTP SMS sent successfully!');
  } catch (err: any) {
    console.log('SMS send failed');
    console.error('❌ Failed to send OTP SMS:', err?.message || err);
    throw new Error("We couldn't send the verification SMS. Please try again.");
  }
}

export async function sendDeadlineReminderSms(to: string, message: string): Promise<void> {
  // ── Dev fallback ────────────────────────────────────────────────
  if (!isConfigured || !twilioClient) {
    console.log('\n' + '─'.repeat(50));
    console.log(`📱 [DEADLINE SMS - DEV MODE]`);
    console.log(`   To      : ${to}`);
    console.log(`   Message : ${message}`);
    console.log('─'.repeat(50) + '\n');
    return;
  }
  // ────────────────────────────────────────────────────────────────

  try {
    await twilioClient.messages.create({
      body: message,
      from: TWILIO_PHONE_NUMBER,
      to,
    });
    console.log(`✅ Deadline SMS sent successfully to ${to}`);
  } catch (err: any) {
    console.error('❌ Failed to send Deadline SMS:', err?.message || err);
    throw new Error("Unable to send deadline reminder SMS.");
  }
}
