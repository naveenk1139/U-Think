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
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// ── Step 1: Credentials (returns { pending: true, email }) ─────────
// @route   POST /api/auth/register
router.post('/register', registerUser);

// @route   POST /api/auth/login
router.post('/login', loginUser);

// ── Step 2: OTP verification ───────────────────────────────────────
// @route   POST /api/auth/verify-otp
router.post('/verify-otp', verifyOtp);

// @route   POST /api/auth/resend-otp
router.post('/resend-otp', resendOtp);

// ── Step 3: Forgot Password ──────────────────────────────────────────
// @route   POST /api/auth/forgot-password
router.post('/forgot-password', forgotPassword);

// @route   POST /api/auth/reset-password
router.post('/reset-password', resetPassword);

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

export default router;
