import { Router } from 'express';
import { sendOtpEmail } from '../services/emailService.js';
import {
  registerUser,
  loginUser,
  verifyOtp,
  resendOtp,
  getMe,
  forgotPassword,
  resetPassword,
  changePassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many authentication attempts, please try again later.' }
});

const otpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many OTP requests, please try again later.' }
});

const router = Router();

// ── Step 1: Credentials (returns { pending: true, email }) ─────────
// @route   POST /api/auth/register
router.post('/register', authLimiter, registerUser);

// @route   POST /api/auth/login
router.post('/login', authLimiter, loginUser);

// ── Step 2: OTP verification ───────────────────────────────────────
// @route   POST /api/auth/verify-otp
router.post('/verify-otp', authLimiter, verifyOtp);

// @route   POST /api/auth/resend-otp
router.post('/resend-otp', otpLimiter, resendOtp);

// ── Step 3: Forgot Password ──────────────────────────────────────────
// @route   POST /api/auth/forgot-password
router.post('/forgot-password', otpLimiter, forgotPassword);

// @route   POST /api/auth/reset-password
router.post('/reset-password', authLimiter, resetPassword);

// ── TEST ENDPOINT ──────────────────────────────────────────────────
router.post('/test-email', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });
    
    // Using sendOtpEmail with a fake OTP
    await sendOtpEmail(email, '123456', 'register');
    
    res.json({ message: 'Test email successfully sent to ' + email });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ── Protected ─────────────────────────────────────────────────────
// @route   GET /api/auth/me
router.get('/me', protect, getMe);

// @route   POST /api/auth/change-password
router.post('/change-password', protect, changePassword);

export default router;
