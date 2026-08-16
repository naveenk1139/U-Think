import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import OtpStore from '../models/OtpStore.js';
import { AuthRequest } from '../middleware/authMiddleware.js';
import { generateOtp, sendOtpEmail } from '../services/emailService.js';
import { sendOtpSms } from '../services/smsService.js';

const JWT_SECRET = process.env.JWT_SECRET || 'uthink_jwt_secret_key_2026_super_secure';

/**
 * Generate JWT Token helper
 */
const generateToken = (id: string, email: string, name: string): string => {
  return jwt.sign({ id, email, name }, JWT_SECRET, {
    expiresIn: '7d',
  });
};

// ─── Shared OTP sender ─────────────────────────────────────────────
async function issueOtp(
  email: string,
  mobileNumber: string | undefined,
  type: 'login' | 'register' | 'forgot_password',
  extras?: { pendingPayload?: any }
): Promise<void> {
  console.log(`\nOTP generation started`);
  console.log(`Destination: ${mobileNumber ? mobileNumber + ' (SMS)' : email + ' (Email)'}`);
  
  const otp = generateOtp();
  const emailLower = email.toLowerCase();

  // Load configs
  const RATE_LIMIT_ENABLED = process.env.OTP_RATE_LIMIT_ENABLED !== 'false';
  const MAX_REQUESTS = parseInt(process.env.OTP_MAX_REQUESTS || '5', 10);
  const WINDOW_MINUTES = parseInt(process.env.OTP_RATE_LIMIT_WINDOW || '15', 10);

  // Check rate limiting
  const existing = await OtpStore.findOne({ email: emailLower, type });
  if (RATE_LIMIT_ENABLED && existing) {
    if (existing.lockUntil && existing.lockUntil > new Date()) {
      const waitMins = Math.ceil((existing.lockUntil.getTime() - Date.now()) / 60000);
      throw new Error(`Too many OTP requests. Please try again after ${waitMins} minutes.`);
    }

    if (existing.attempts >= MAX_REQUESTS) {
      // Lock for WINDOW_MINUTES
      const lockUntil = new Date(Date.now() + WINDOW_MINUTES * 60 * 1000);
      await OtpStore.updateOne({ _id: existing._id }, { lockUntil, attempts: existing.attempts + 1 });
      throw new Error(`Too many OTP requests. Please wait before requesting another code.`);
    }
  }

  const salt = await bcrypt.genSalt(10);
  const hashedOtp = await bcrypt.hash(otp, salt);

  // Attempt to send SMS/Email BEFORE saving to database. 
  // This prevents delivery failures from counting towards the rate limit.
  if (mobileNumber) {
    await sendOtpSms(mobileNumber, otp, type as any);
  } else {
    await sendOtpEmail(email, otp, type as any);
  }

  // If we reach here, email was successful. Save to database.
  await OtpStore.findOneAndUpdate(
    { email: emailLower, type },
    {
      otp: hashedOtp,
      pendingPayload: extras?.pendingPayload,
      createdAt: new Date(),
      $inc: { attempts: 1 },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
}


/**
 * @desc    Register step 1 — validate & send OTP
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, photoURL } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: 'Name, email, and password are required.' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: 'Password must be at least 6 characters long.' });
      return;
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      res.status(400).json({ error: 'An account with this email already exists.' });
      return;
    }

    // Hash password now — store in OTP record; create user only after OTP verified
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const pendingPayload = {
      name, email, passwordHash, photoURL
    };

    await issueOtp(email, undefined, 'register', { pendingPayload });

    res.status(200).json({
      pending: true,
      message: 'OTP sent to your email. Please verify to complete registration.',
      email: email.toLowerCase(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login step 1 — validate credentials & send OTP
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email/Mobile and password are required.' });
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      res.status(400).json({ error: 'Invalid email or password.' });
      return;
    }

    // Check account lock
    if (user.isLocked()) {
      res.status(403).json({ error: 'Account locked due to too many failed attempts. Try again later.' });
      return;
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      user.failedLoginAttempts += 1;
      if (user.failedLoginAttempts >= 5) {
        user.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 mins lock
      }
      await user.save();
      res.status(400).json({ error: 'Invalid email or password.' });
      return;
    }

    // Reset lock counters on success
    user.failedLoginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    await issueOtp(user.email, undefined, 'login');

    res.status(200).json({
      pending: true,
      message: 'OTP sent to your email. Please verify to sign in.',
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Step 2 — verify OTP and complete login/register
 * @route   POST /api/auth/verify-otp
 * @access  Public
 */
export const verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, otp, type } = req.body as {
      email: string;
      otp: string;
      type: 'login' | 'register';
    };

    if (!email || !otp || !type) {
      res.status(400).json({ error: 'Email, OTP, and type are required.' });
      return;
    }

    const record = await OtpStore.findOne({ email: email.toLowerCase(), type });

    if (!record) {
      res.status(400).json({ error: 'This verification code has expired. Please request a new code.' });
      return;
    }

    const isMatch = await bcrypt.compare(otp.trim(), record.otp);
    if (!isMatch) {
      res.status(400).json({ error: 'Invalid verification code. Please check the code and try again.' });
      return;
    }

    // OTP is valid — delete it immediately (one-time use)
    await OtpStore.deleteOne({ _id: record._id });

    if (type === 'register') {
      // Create the user now
      const p = record.pendingPayload;
      const user = await User.create({
        name: p.name,
        email: p.email,
        password: p.passwordHash,
        role: 'student',
        photoURL: p.photoURL,
        isEmailVerified: true,
        lastLogin: new Date(),
      });

      const token = generateToken(user._id.toString(), user.email, user.name);

      res.status(201).json({
        token,
        user: {
          ...user.toJSON(),
          id: user._id,
        },
      });
    } else {
      // Login — find user and issue JWT
      const user = await User.findOne({ email: email.toLowerCase() });

      if (!user) {
        res.status(404).json({ error: 'User not found.' });
        return;
      }

      user.lastLogin = new Date();
      if (!user.isEmailVerified) user.isEmailVerified = true;
      await user.save();

      const token = generateToken(user._id.toString(), user.email, user.name);

      res.json({
        token,
        user: {
          ...user.toJSON(),
          id: user._id,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Resend OTP
 * @route   POST /api/auth/resend-otp
 * @access  Public
 */
export const resendOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, type } = req.body as { email: string; type: 'login' | 'register' };

    if (!email || !type) {
      res.status(400).json({ error: 'Email and type are required.' });
      return;
    }

    const existing = await OtpStore.findOne({ email: email.toLowerCase(), type });

    if (type === 'register' && !existing) {
      res.status(400).json({ error: 'Registration session not found. Please start over.' });
      return;
    }

    let mobileNumber: string | undefined;

    if (type === 'login') {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        res.status(400).json({ error: 'User not found.' });
        return;
      }
      mobileNumber = user.mobileNumber;
    } else {
      mobileNumber = undefined;
    }

    await issueOtp(email, mobileNumber, type, {
      pendingPayload: existing?.pendingPayload,
    });

    res.json({ message: 'A new OTP has been sent to your email.' });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get logged in user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ error: 'User profile not found.' });
      return;
    }

    res.json({
      ...user.toJSON(),
      id: user._id,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Step 1 — Forgot Password (Request OTP)
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: 'Email/Mobile is required.' });
      return;
    }
    
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // To prevent email enumeration, we pretend it succeeded even if not found
      res.status(200).json({ message: 'If an account with that email/mobile exists, an OTP has been sent.', email: email.toLowerCase() });
      return;
    }

    await issueOtp(user.email, undefined, 'forgot_password');
    res.status(200).json({ message: 'OTP sent to your email.', email: user.email });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Step 2 — Reset Password (Verify OTP + Set new password)
 * @route   POST /api/auth/reset-password
 * @access  Public
 */
export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, otp, newPassword } = req.body;
    
    if (!email || !otp || !newPassword) {
      res.status(400).json({ error: 'Email, OTP, and new password are required.' });
      return;
    }

    if (newPassword.length < 6) {
      res.status(400).json({ error: 'Password must be at least 6 characters long.' });
      return;
    }

    const record = await OtpStore.findOne({ email: email.toLowerCase(), type: 'forgot_password' });
    if (!record) {
      res.status(400).json({ error: 'This verification code has expired. Please request a new code.' });
      return;
    }

    const isMatch = await bcrypt.compare(otp.trim(), record.otp);
    if (!isMatch) {
      res.status(400).json({ error: 'Invalid verification code. Please check the code and try again.' });
      return;
    }

    // OTP verified
    await OtpStore.deleteOne({ _id: record._id });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    // Hash and update password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    // Reset any lockout
    user.failedLoginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    res.status(200).json({ message: 'Password has been successfully reset. You can now login.' });
  } catch (error) {
    next(error);
  }
};
