import React from 'react';
import { X, UserPlus, LogIn, Compass } from 'lucide-react';

interface AuthReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

export const AuthReminderModal: React.FC<AuthReminderModalProps> = ({
  isOpen,
  onClose,
  onNavigateToLogin,
  onNavigateToSignup
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-card rounded-3xl border border-border shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-primary p-6 flex flex-col items-center relative text-center">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-blue-100 hover:text-white transition-colors p-1 rounded-full hover:bg-primary-hover cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="bg-card p-3 rounded-2xl shadow-md mb-4 mt-2">
            <Compass className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Join U THINK</h2>
          <p className="text-blue-100 text-sm font-medium">Unlock your full career potential</p>
        </div>
        
        {/* Body */}
        <div className="p-8 space-y-6">
          <p className="text-text-secondary text-[15px] text-center leading-relaxed">
            Create a free account to save your aptitude results, track favorite careers, and connect with industry mentors.
          </p>
          
          <div className="space-y-3">
            <button 
              onClick={() => {
                onClose();
                onNavigateToSignup();
              }}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold py-3.5 rounded-xl transition-colors shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              Sign Up for Free
            </button>
            <button 
              onClick={() => {
                onClose();
                onNavigateToLogin();
              }}
              className="w-full flex items-center justify-center gap-2 bg-background hover:bg-background-secondary text-text-primary font-semibold border border-border py-3.5 rounded-xl transition-colors cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              Sign In to Your Account
            </button>
          </div>
          
          <div className="text-center">
            <button 
              onClick={onClose}
              className="text-xs font-semibold text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
            >
              Maybe later, continue exploring
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
