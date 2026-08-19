import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Mail,
  Lock,
  BrainCircuit,
  User as UserIcon,
  AlertCircle,
  ShieldCheck,
  RefreshCw,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginProps {
  onNavigate: (tab: string) => void;
  initialMode?: 'login' | 'signup';
}

const OTP_LENGTH = 6;
const OTP_TTL = 10 * 60; // 10 minutes in seconds

export const Login: React.FC<LoginProps> = ({ onNavigate, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');

  // Step 1 state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 2 state
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [pendingEmail, setPendingEmail] = useState('');
  const [otpValues, setOtpValues] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [countdown, setCountdown] = useState(OTP_TTL);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpSuccess, setOtpSuccess] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login, register, verifyOtp, resendOtp, currentUser } = useAuth();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'employer') onNavigate('employer-dashboard');
      else if (currentUser.role === 'admin') onNavigate('admin-dashboard');
      else if (currentUser.role === 'college') onNavigate('college-dashboard');
      else onNavigate('dashboard');
    }
  }, [currentUser, onNavigate]);

  // OTP countdown timer
  useEffect(() => {
    if (step !== 'otp') return;
    setCountdown(OTP_TTL);
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(interval); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [step, pendingEmail]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // ── Step 1: credentials submit ──────────────────────────────────
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);
    if (!isLogin && password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      setSubmitting(false);
      return;
    }

    try {
      const result = isLogin
        ? await login(email, password)
        : await register({ name, email, password });

      if (result.pending) {
        setPendingEmail(result.email);
        setOtpValues(Array(OTP_LENGTH).fill(''));
        setStep('otp');
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.error ||
        err?.message ||
        'Authentication failed. Please try again.';
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Step 2: OTP box key handling ────────────────────────────────
  const handleOtpChange = (index: number, value: string) => {
    // Paste support — handle multi-char input
    const chars = value.replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (chars.length > 1) {
      const next = [...Array(OTP_LENGTH).fill('')];
      chars.split('').forEach((ch, i) => { if (i < OTP_LENGTH) next[i] = ch; });
      setOtpValues(next);
      const focusIdx = Math.min(chars.length, OTP_LENGTH - 1);
      setTimeout(() => inputRefs.current[focusIdx]?.focus(), 0);
      return;
    }

    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...otpValues];
    next[index] = digit;
    setOtpValues(next);
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (otpValues[index]) {
        const next = [...otpValues];
        next[index] = '';
        setOtpValues(next);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // ── Step 2: verify OTP ──────────────────────────────────────────
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otp = otpValues.join('');
    if (otp.length < OTP_LENGTH) {
      setErrorMsg('Please enter all 6 digits.');
      return;
    }
    setErrorMsg('');
    setSubmitting(true);
    try {
      await verifyOtp(pendingEmail, otp, isLogin ? 'login' : 'register');
      setOtpSuccess(true);
      setTimeout(() => onNavigate('dashboard'), 900);
    } catch (err: any) {
      const msg =
        err?.response?.data?.error ||
        err?.message ||
        'OTP verification failed.';
      setErrorMsg(msg);
      // Shake + clear OTP boxes on wrong code
      setOtpValues(Array(OTP_LENGTH).fill(''));
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Resend OTP ──────────────────────────────────────────────────
  const handleResend = useCallback(async () => {
    if (resendCooldown > 0 || countdown <= 0) return;
    setErrorMsg('');
    try {
      await resendOtp(pendingEmail, isLogin ? 'login' : 'register');
      setOtpValues(Array(OTP_LENGTH).fill(''));
      setResendCooldown(30);
      setCountdown(OTP_TTL);
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.error || 'Failed to resend OTP.');
    }
  }, [resendCooldown, countdown, pendingEmail, isLogin, resendOtp]);

  // ── Switch mode ─────────────────────────────────────────────────
  const switchMode = (toLogin: boolean) => {
    setIsLogin(toLogin);
    setStep('credentials');
    setErrorMsg('');
    setOtpValues(Array(OTP_LENGTH).fill(''));
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen bg-slate-50/70 flex flex-col justify-center items-center p-4">

      {/* Logo */}
      <div className="flex flex-col items-center mb-10">
        <div className="bg-blue-600 p-3.5 rounded-2xl mb-5 shadow-sm">
          <BrainCircuit className="w-9 h-9 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-blue-700 tracking-tight mb-2">U THINK</h1>
        <p className="text-[15px] text-slate-700 font-medium">Empowering Your Career Journey</p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] w-full max-w-[420px] p-5 sm:p-8">

        {/* ═══════════════ STEP 1: Credentials ═══════════════ */}
        {step === 'credentials' && (
          <>
            <h2 className="text-2xl font-bold text-slate-900 mb-1.5 tracking-tight">
              {isLogin ? 'Welcome Back' : 'Create an Account'}
            </h2>
            <p className="text-[15px] text-slate-600 mb-6 font-normal">
              {isLogin ? 'Sign in to continue your path' : 'Sign up to start your journey'}
            </p>

            {errorMsg && (
              <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-4 py-3 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-slate-700">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors text-slate-700 placeholder-slate-500"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors text-slate-700 placeholder-slate-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-11 pr-11 py-3 bg-white border border-slate-300 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors text-slate-700 font-medium placeholder-slate-500 ${!showPassword && 'tracking-widest'}`}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full pl-11 pr-11 py-3 bg-white border border-slate-300 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors text-slate-700 font-medium placeholder-slate-500 ${!showConfirmPassword && 'tracking-widest'}`}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between mt-2 mb-4">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-[13px] text-slate-700">
                      Remember me
                    </label>
                  </div>
                  <div className="text-[13px]">
                    <button type="button" onClick={() => onNavigate('forgot-password')} className="font-semibold text-blue-600 hover:text-blue-500 cursor-pointer">
                      Forgot password?
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors shadow-sm text-[16px] mt-3 cursor-pointer disabled:opacity-50"
              >
                {submitting ? 'Sending OTP...' : isLogin ? 'Continue' : 'Continue'}
              </button>
            </form>

            <p className="mt-8 text-center text-sm font-medium text-slate-600">
              {isLogin ? (
                <>Don't have an account? <button type="button" onClick={() => switchMode(false)} className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer font-bold">Sign up for free</button></>
              ) : (
                <>Already have an account? <button type="button" onClick={() => switchMode(true)} className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer font-bold">Sign in</button></>
              )}
            </p>
          </>
        )}

        {/* ═══════════════ STEP 2: OTP ═══════════════ */}
        {step === 'otp' && (
          <>
            {/* Back button */}
            <button
              type="button"
              onClick={() => { setStep('credentials'); setErrorMsg(''); setOtpValues(Array(OTP_LENGTH).fill('')); }}
              className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-[13px] font-medium mb-6 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            {/* Icon + heading */}
            <div className="flex flex-col items-center mb-6">
              {otpSuccess ? (
                <div className="bg-emerald-50 p-4 rounded-2xl mb-4">
                  <CheckCircle2 className="w-9 h-9 text-emerald-500" />
                </div>
              ) : (
                <div className="bg-blue-50 p-4 rounded-2xl mb-4">
                  <ShieldCheck className="w-9 h-9 text-blue-600" />
                </div>
              )}
              <h2 className="text-xl font-bold text-slate-900 mb-1 tracking-tight text-center">
                {otpSuccess ? 'Verified!' : 'Check your email'}
              </h2>
              <p className="text-[14px] text-slate-500 text-center leading-relaxed">
                {otpSuccess
                  ? 'Taking you to your dashboard…'
                  : <>We sent a 6-digit code to<br /><span className="font-semibold text-slate-700">{pendingEmail}</span></>}
              </p>
            </div>

            {!otpSuccess && (
              <>
                {errorMsg && (
                  <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-4 py-3 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleVerifyOtp}>
                  {/* 6 OTP digit boxes */}
                  <div className="flex gap-1.5 sm:gap-2.5 justify-center mb-6">
                    {otpValues.map((val, i) => (
                      <input
                        key={i}
                        ref={(el) => { inputRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={val}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        onFocus={(e) => e.target.select()}
                        className={`w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold rounded-xl border-2 transition-all outline-none
                          ${val
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-slate-300 bg-white text-slate-900'}
                          focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20`}
                        aria-label={`OTP digit ${i + 1}`}
                      />
                    ))}
                  </div>

                  {/* Countdown */}
                  <div className="text-center mb-4">
                    {countdown > 0 ? (
                      <p className="text-[13px] text-slate-500">
                        Code expires in <span className="font-bold text-slate-700 tabular-nums">{formatTime(countdown)}</span>
                      </p>
                    ) : (
                      <p className="text-[13px] text-red-500 font-semibold">Code expired. Please resend.</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || countdown <= 0 || otpValues.join('').length < OTP_LENGTH}
                    className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors shadow-sm text-[16px] cursor-pointer disabled:opacity-40"
                  >
                    {submitting ? 'Verifying…' : 'Verify & Continue'}
                  </button>
                </form>

                {/* Resend */}
                <div className="mt-5 text-center">
                  <p className="text-[13px] text-slate-500">
                    Didn't receive it?{' '}
                    {resendCooldown > 0 ? (
                      <span className="text-slate-400 font-medium">Resend in {resendCooldown}s</span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResend}
                        disabled={countdown <= 0 && resendCooldown > 0}
                        className="inline-flex items-center gap-1 text-blue-600 hover:underline font-bold cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Resend OTP
                      </button>
                    )}
                  </p>
                </div>
              </>
            )}
          </>
        )}
      </div>

      <div className="mt-10 flex gap-6 text-xs font-semibold text-slate-500">
        <a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-slate-800 transition-colors">Terms of Service</a>
      </div>
    </div>
  );
};
