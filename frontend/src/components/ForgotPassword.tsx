import React, { useState, useRef } from 'react';
import { Mail, Lock, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ForgotPasswordProps {
  onNavigate: (tab: string) => void;
}

const OTP_LENGTH = 6;

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [otpValues, setOtpValues] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { forgotPassword, resetPassword } = useAuth();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Step 1: Request OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);
    try {
      await forgotPassword(email);
      setStep(2);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.error || 'Failed to send OTP.');
    } finally {
      setSubmitting(false);
    }
  };

  // Step 2: Enter OTP
  const handleOtpChange = (index: number, value: string) => {
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

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValues.join('').length < OTP_LENGTH) {
      setErrorMsg('Please enter all 6 digits.');
      return;
    }
    setErrorMsg('');
    setStep(3);
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setSubmitting(true);
    try {
      const otp = otpValues.join('');
      const result = await resetPassword(email, otp, newPassword);
      setSuccessMsg(result.message || 'Password reset successfully.');
      setTimeout(() => onNavigate('login'), 2000);
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.error || 'Failed to reset password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background/70 flex flex-col justify-center items-center p-4">
      <div className="bg-card rounded-2xl border border-border shadow-[0_2px_8px_rgba(0,0,0,0.04)] w-full max-w-[420px] p-5 sm:p-8">
        <button
          type="button"
          onClick={() => step > 1 ? setStep((s) => s - 1 as any) : onNavigate('login')}
          className="flex items-center gap-1.5 text-text-muted hover:text-text-primary text-[13px] font-medium mb-6 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h2 className="text-2xl font-bold text-text-primary mb-1.5 tracking-tight">
          Forgot Password
        </h2>
        <p className="text-[15px] text-text-secondary mb-6 font-normal">
          {step === 1 && "Enter your registered email or mobile number to reset your password."}
          {step === 2 && "Enter the 6-digit code sent to your email/mobile."}
          {step === 3 && "Create a new strong password."}
        </p>

        {errorMsg && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-4 py-3 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        
        {successMsg && (
          <div className="mb-5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-4 py-3 rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-text-primary">Email or Mobile Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-text-muted" />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com or +91..."
                  className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-text-primary"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting || !email}
              className="w-full bg-[#2563EB] hover:bg-primary-hover text-white font-medium py-3 rounded-xl transition-colors shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none text-[16px] cursor-pointer disabled:opacity-50"
            >
              {submitting ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
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
                    ${val ? 'border-primary bg-blue-50 text-primary-hover' : 'border-border bg-card text-text-primary'}
                    focus:border-primary focus:ring-2 focus:ring-primary/20`}
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={otpValues.join('').length < OTP_LENGTH}
              className="w-full bg-[#2563EB] hover:bg-primary-hover text-white font-medium py-3 rounded-xl transition-colors shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none text-[16px] cursor-pointer disabled:opacity-50"
            >
              Verify OTP
            </button>
          </form>
        )}

        {/* STEP 3 */}
        {step === 3 && !successMsg && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-text-primary">New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-text-muted" />
                </div>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-text-primary font-medium"
                  required
                  minLength={6}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-text-primary">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-text-muted" />
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-text-primary font-medium"
                  required
                  minLength={6}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#2563EB] hover:bg-primary-hover text-white font-medium py-3 rounded-xl transition-colors shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none text-[16px] mt-3 cursor-pointer disabled:opacity-50"
            >
              {submitting ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
