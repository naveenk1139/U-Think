import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

export interface User {
  id: string;
  name: string;
  displayName?: string;
  email: string;
  photoURL?: string;
  bio?: string;
  streamPreference?: string;
  role?: 'student' | 'employer' | 'admin' | 'college';
  mobile?: string;
  dateOfBirth?: string;
  gender?: string;
  location?: string;
  state?: string;
  city?: string;
  educationLevel?: string;
  classOrYear?: string;
  stream?: string;
  collegeOrSchool?: string;
  careerGoal?: string;
  careerAspiration?: string;
  targetExam?: string;
  interests?: string[];
  skills?: string[];
  preferredCareer?: string[];
  preferredCourse?: string[];
  preferredLocation?: string[];
  profileCompletion?: number;
  isEmailVerified?: boolean;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password?: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ pending: boolean; email: string }>;
  register: (payload: RegisterPayload) => Promise<{ pending: boolean; email: string }>;
  verifyOtp: (email: string, otp: string, type: 'login' | 'register') => Promise<void>;
  resendOtp: (email: string, type: 'login' | 'register') => Promise<void>;
  forgotPassword: (email: string) => Promise<{ message: string, email: string }>;
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<{ message: string }>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session from JWT token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('uthink_token');
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get<User>('/api/auth/me')
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch(() => {
        // Token invalid or expired
        localStorage.removeItem('uthink_token');
        setCurrentUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /** Step 1: Submit credentials — returns { pending: true, email } */
  const login = async (email: string, password: string) => {
    const res = await api.post<{ pending: boolean; email: string }>('/api/auth/login', {
      email,
      password,
    });
    return res.data;
  };

  /** Step 1: Submit registration form — returns { pending: true, email } */
  const register = async (payload: RegisterPayload) => {
    const res = await api.post<{ pending: boolean; email: string }>('/api/auth/register', payload);
    return res.data;
  };

  /** Step 2: Verify OTP — stores token and sets user on success */
  const verifyOtp = async (email: string, otp: string, type: 'login' | 'register') => {
    const res = await api.post<{ token: string; user: User }>('/api/auth/verify-otp', {
      email,
      otp,
      type,
    });
    localStorage.setItem('uthink_token', res.data.token);
    setCurrentUser(res.data.user);
  };

  /** Resend OTP */
  const resendOtp = async (email: string, type: 'login' | 'register') => {
    await api.post('/api/auth/resend-otp', { email, type });
  };

  /** Forgot Password */
  const forgotPassword = async (email: string) => {
    const res = await api.post('/api/auth/forgot-password', { email });
    return res.data;
  };

  /** Reset Password */
  const resetPassword = async (email: string, otp: string, newPassword: string) => {
    const res = await api.post('/api/auth/reset-password', { email, otp, newPassword });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('uthink_token');
    setCurrentUser(null);
  };

  const refreshProfile = async () => {
    try {
      const res = await api.get<User>('/api/auth/me');
      setCurrentUser(res.data);
    } catch (err) {
      console.error('Failed to refresh profile', err);
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<User> => {
    const res = await api.put<User>('/api/profile/me', updates);
    setCurrentUser(res.data);
    return res.data;
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    verifyOtp,
    resendOtp,
    forgotPassword,
    resetPassword,
    logout,
    refreshProfile,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
