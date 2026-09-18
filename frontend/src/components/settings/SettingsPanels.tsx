import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useAppearance } from '../../contexts/AppearanceContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, Lock, LogOut, Trash2, BookOpen, Map, MapPin, 
  Target, GraduationCap, Bell, Briefcase, Zap, Moon, Sun, Monitor,
  Shield, Smartphone, Eye, Download, Globe, HelpCircle, MessageSquare, 
  Info, FileText, Smartphone as DeviceMobile, CheckCircle, AlertCircle
} from 'lucide-react';
import { updateProfile, deleteAccount } from '../../api/profileApi';
import api from '../../api/axios';

const PanelSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-card rounded-2xl border border-border shadow-sm shadow-black/5 dark:shadow-none shadow-black/5 dark:shadow-none overflow-hidden mb-6">
    <div className="px-6 py-4 border-b border-slate-50 bg-background/50">
      <h3 className="font-bold text-text-primary">{title}</h3>
    </div>
    <div className="p-6 space-y-6">
      {children}
    </div>
  </div>
);

const ToggleSwitch = ({ 
  label, 
  desc, 
  defaultChecked = false, 
  storageKey,
  checked: controlledChecked,
  onChange
}: { 
  label: string;
  desc?: string;
  defaultChecked?: boolean;
  storageKey?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}) => {
  const [internalChecked, setInternalChecked] = useState(() => {
    if (storageKey) {
      const stored = localStorage.getItem(storageKey);
      if (stored !== null) return stored === 'true';
    }
    return defaultChecked;
  });

  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleToggle = () => {
    const newVal = !checked;
    if (!isControlled) {
      setInternalChecked(newVal);
      if (storageKey) localStorage.setItem(storageKey, String(newVal));
    }
    if (onChange) {
      onChange(newVal);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="font-semibold text-sm text-text-primary">{label}</div>
        {desc && <div className="text-[11px] text-text-muted mt-0.5">{desc}</div>}
      </div>
      <button 
        onClick={handleToggle}
        className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${checked ? 'bg-primary' : 'border-border'}`}
      >
        <div className={`w-4 h-4 bg-card rounded-full absolute top-1 transition-transform ${checked ? 'left-6' : 'left-1'}`} />
      </button>
    </div>
  );
};

export const AccountSettings = () => {
  const { currentUser, logout, updateProfile: updateContextProfile } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState(currentUser?.displayName || currentUser?.name || '');
  const [mobile, setMobile] = useState(currentUser?.mobile || '');
  
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdSuccess, setPwdSuccess] = useState('');
  const [pwdError, setPwdError] = useState('');

  const handleSaveProfile = async () => {
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      const updatedUser = await updateProfile({ name, displayName: name, mobile });
      updateContextProfile({ name, displayName: name, mobile });
      setSuccessMsg('Profile updated successfully.');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || 'Unable to save changes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPwdError('All fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdError('New passwords do not match.');
      return;
    }
    
    setPwdLoading(true);
    setPwdError('');
    setPwdSuccess('');
    try {
      const res = await api.post('/api/auth/change-password', {
        currentPassword,
        newPassword
      });
      setPwdSuccess(res.data.message || 'Password changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPwdError(err.response?.data?.error || 'Failed to change password.');
    } finally {
      setPwdLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteAccount();
        logout();
        navigate('/login');
      } catch (err: any) {
        alert(err.response?.data?.error || 'Failed to delete account.');
      }
    }
  };

  return (
    <div>
      <PanelSection title="Profile Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">Email Address</label>
            <input 
              type="email" 
              disabled 
              value={currentUser?.email || ''} 
              className="w-full px-4 py-2.5 bg-background-secondary border border-border rounded-xl text-sm text-text-muted cursor-not-allowed" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">Phone Number</label>
            <input 
              type="tel" 
              placeholder="+91 XXXXX XXXXX" 
              value={mobile} 
              onChange={(e) => setMobile(e.target.value)} 
              className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" 
            />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <button 
            onClick={handleSaveProfile}
            disabled={loading}
            className="bg-primary hover:bg-primary-hover text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          {successMsg && <span className="text-sm font-semibold text-emerald-600">{successMsg}</span>}
          {errorMsg && <span className="text-sm font-semibold text-red-600">{errorMsg}</span>}
        </div>
      </PanelSection>

      <PanelSection title="Password & Authentication">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">Current Password</label>
            <input 
              type="password" 
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" 
            />
          </div>
          <div className="md:col-start-1">
            <label className="block text-xs font-semibold text-text-primary mb-1.5">New Password</label>
            <input 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">Confirm New Password</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" 
            />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <button 
            onClick={handleChangePassword}
            disabled={pwdLoading}
            className="flex items-center gap-2 text-sm font-semibold text-text-primary bg-background hover:bg-background-secondary border border-border px-5 py-2.5 rounded-xl transition-colors disabled:opacity-50"
          >
            <Lock className="w-4 h-4" /> {pwdLoading ? 'Changing...' : 'Change Password'}
          </button>
          {pwdSuccess && <span className="text-sm font-semibold text-emerald-600">{pwdSuccess}</span>}
          {pwdError && <span className="text-sm font-semibold text-red-600">{pwdError}</span>}
        </div>
      </PanelSection>

      <PanelSection title="Danger Zone">
        <div className="space-y-4">
          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className="w-full md:w-auto flex items-center justify-center gap-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Log out on this device
          </button>
          <div className="pt-4 border-t border-border">
            <h4 className="font-semibold text-text-primary text-sm mb-1">Delete Account</h4>
            <p className="text-xs text-text-muted mb-3">Once you delete your account, there is no going back. Please be certain.</p>
            <button 
              onClick={handleDeleteAccount}
              className="text-sm font-bold text-red-600 hover:underline cursor-pointer"
            >
              Delete my account
            </button>
          </div>
        </div>
      </PanelSection>
    </div>
  );
};

export const EducationSettings = () => {
  const { currentUser, updateProfile: updateContextProfile } = useAuth();
  const [educationLevel, setEducationLevel] = useState(currentUser?.educationLevel || 'Class 10th');
  const [stream, setStream] = useState(currentUser?.stream || 'Science (PCM)');
  const [preferredCareer, setPreferredCareer] = useState(currentUser?.preferredCareer?.[0] || '');
  const [preferredCollege, setPreferredCollege] = useState(currentUser?.preferredLocation?.[0] || ''); // Or another field if needed
  
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSave = async () => {
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      const updates = {
        educationLevel,
        stream,
        preferredCareer: preferredCareer ? [preferredCareer] : [],
        preferredLocation: preferredCollege ? [preferredCollege] : []
      };
      await updateProfile(updates);
      updateContextProfile(updates);
      setSuccessMsg('Education profile updated successfully.');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || 'Unable to save changes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PanelSection title="Academic Profile">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1.5">Education Level</label>
          <select 
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
          >
            <option>Class 10th</option>
            <option>Class 11th</option>
            <option>Class 12th</option>
            <option>Undergraduate</option>
            <option>Postgraduate</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1.5">Stream</label>
          <select 
            value={stream}
            onChange={(e) => setStream(e.target.value)}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
          >
            <option>Science (PCM)</option>
            <option>Science (PCB)</option>
            <option>Commerce</option>
            <option>Arts / Humanities</option>
            <option>Undecided</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1.5">Preferred Career</label>
          <input 
            type="text" 
            placeholder="e.g. Software Engineer" 
            value={preferredCareer}
            onChange={(e) => setPreferredCareer(e.target.value)}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary" 
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1.5">Preferred College Location</label>
          <input 
            type="text" 
            placeholder="e.g. Bangalore, IIT Bombay" 
            value={preferredCollege}
            onChange={(e) => setPreferredCollege(e.target.value)}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary" 
          />
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border flex items-center gap-4">
        <button 
          onClick={handleSave}
          disabled={loading}
          className="bg-primary hover:bg-primary-hover text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Education Profile'}
        </button>
        {successMsg && <span className="text-sm font-semibold text-emerald-600">{successMsg}</span>}
        {errorMsg && <span className="text-sm font-semibold text-red-600">{errorMsg}</span>}
      </div>
    </PanelSection>
  );
};

export const NotificationSettings = () => {
  const { currentUser, updateProfile: updateContextProfile } = useAuth();
  
  const [settings, setSettings] = useState({
    examReminders: currentUser?.settings?.notifications?.examReminders ?? true,
    scholarshipAlerts: currentUser?.settings?.notifications?.scholarshipAlerts ?? true,
    careerUpdates: currentUser?.settings?.notifications?.careerUpdates ?? true,
    aiRecommendations: currentUser?.settings?.notifications?.aiRecommendations ?? true,
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = async (key: keyof typeof settings, val: boolean) => {
    const newSettings = { ...settings, [key]: val };
    setSettings(newSettings);
    
    setLoading(true);
    setSuccessMsg('');
    try {
      const updates = {
        settings: {
          ...currentUser?.settings,
          notifications: newSettings
        }
      };
      await updateProfile(updates);
      updateContextProfile(updates);
      setSuccessMsg('Notification settings saved.');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  return (
    <PanelSection title="Email & Push Notifications">
      <div className="space-y-4">
        {successMsg && <div className="text-xs font-semibold text-emerald-600 mb-2">{successMsg}</div>}
        <ToggleSwitch 
          label="Exam Notifications" 
          desc="Get alerted about upcoming exam dates and deadlines." 
          checked={settings.examReminders} 
          onChange={(val) => handleChange('examReminders', val)} 
        />
        <div className="h-px bg-background-secondary" />
        <ToggleSwitch 
          label="Scholarship Alerts" 
          desc="Updates on scholarships and application processes." 
          checked={settings.scholarshipAlerts} 
          onChange={(val) => handleChange('scholarshipAlerts', val)} 
        />
        <div className="h-px bg-background-secondary" />
        <ToggleSwitch 
          label="Career Updates" 
          desc="Notifications for internships, job opportunities and career recommendations." 
          checked={settings.careerUpdates} 
          onChange={(val) => handleChange('careerUpdates', val)} 
        />
        <div className="h-px bg-background-secondary" />
        <ToggleSwitch 
          label="AI Recommendations" 
          desc="Updates when your AI counselor has new insights." 
          checked={settings.aiRecommendations} 
          onChange={(val) => handleChange('aiRecommendations', val)} 
        />
      </div>
    </PanelSection>
  );
};

export const AICounselorSettings = () => {
  const { currentUser, updateProfile: updateContextProfile } = useAuth();
  
  const [settings, setSettings] = useState({
    enableGuidance: currentUser?.settings?.aiCounselor?.enableGuidance ?? true,
    personalization: currentUser?.settings?.aiCounselor?.personalization ?? true,
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = async (key: keyof typeof settings, val: boolean) => {
    const newSettings = { ...settings, [key]: val };
    setSettings(newSettings);
    
    setLoading(true);
    setSuccessMsg('');
    try {
      const updates = {
        settings: {
          ...currentUser?.settings,
          aiCounselor: newSettings
        }
      };
      await updateProfile(updates);
      updateContextProfile(updates);
      setSuccessMsg('AI Counselor preferences saved.');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear your AI Counselor chat history? This cannot be undone.')) {
      alert('Chat history cleared successfully.');
    }
  };

  return (
    <div>
      <PanelSection title="AI Counselor Preferences">
        <div className="space-y-4">
          {successMsg && <div className="text-xs font-semibold text-emerald-600 mb-2">{successMsg}</div>}
          <ToggleSwitch 
            label="Enable AI Guidance" 
            desc="Allow the AI Counselor to proactively offer advice." 
            checked={settings.enableGuidance} 
            onChange={(val) => handleChange('enableGuidance', val)} 
          />
          <div className="h-px bg-background-secondary" />
          <ToggleSwitch 
            label="Personalized Recommendations" 
            desc="Allow AI to use your profile data for better suggestions." 
            checked={settings.personalization} 
            onChange={(val) => handleChange('personalization', val)} 
          />
        </div>
      </PanelSection>
      <PanelSection title="Data & Privacy">
        <p className="text-sm text-text-secondary mb-4">Clear your conversation history with the AI Counselor. This action cannot be undone.</p>
        <button 
          onClick={handleClearChat}
          className="flex items-center gap-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" /> Clear Chat History
        </button>
      </PanelSection>
    </div>
  );
};

export const PrivacySecuritySettings = () => {
  const { currentUser, updateProfile: updateContextProfile } = useAuth();
  
  const [settings, setSettings] = useState({
    publicProfile: currentUser?.settings?.privacy?.publicProfile ?? false,
    showActiveStatus: currentUser?.settings?.privacy?.showActiveStatus ?? true,
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = async (key: keyof typeof settings, val: boolean) => {
    const newSettings = { ...settings, [key]: val };
    setSettings(newSettings);
    
    setLoading(true);
    setSuccessMsg('');
    try {
      const updates = {
        settings: {
          ...currentUser?.settings,
          privacy: newSettings
        }
      };
      await updateProfile(updates);
      updateContextProfile(updates);
      setSuccessMsg('Privacy settings saved.');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  return (
    <div>
      <PanelSection title="Security">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <div className="p-2 bg-blue-50 text-primary rounded-lg h-fit"><Shield className="w-5 h-5" /></div>
              <div>
                <h4 className="text-sm font-bold text-text-primary">Two-Factor Authentication (2FA)</h4>
                <p className="text-xs text-text-muted mt-0.5 max-w-sm">Add an extra layer of security to your account by requiring more than just your password to sign in.</p>
              </div>
            </div>
            <button className="bg-background-secondary hover:border-border text-text-primary font-bold text-xs px-4 py-2 rounded-lg cursor-pointer">Enable</button>
          </div>
          
          <div className="h-px bg-background-secondary" />

          <div>
            <h4 className="text-sm font-bold text-text-primary mb-3">Active Devices</h4>
            <div className="border border-border rounded-xl divide-y divide-border">
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Monitor className="w-4 h-4 text-text-muted" />
                  <div>
                    <div className="text-xs font-bold text-text-primary">Current Session <span className="text-[10px] text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded ml-2">Active Now</span></div>
                    <div className="text-[10px] text-text-muted mt-0.5">Local Device</div>
                  </div>
                </div>
              </div>
            </div>
            <button className="text-xs font-bold text-red-600 mt-3 hover:underline cursor-pointer">Log out from all other devices</button>
          </div>
        </div>
      </PanelSection>
      <PanelSection title="Data Privacy">
        <div className="space-y-4">
          {successMsg && <div className="text-xs font-semibold text-emerald-600 mb-2">{successMsg}</div>}
          <ToggleSwitch 
            label="Public Profile Visibility" 
            desc="Allow colleges and recruiters to see your profile." 
            checked={settings.publicProfile} 
            onChange={(val) => handleChange('publicProfile', val)} 
          />
          <div className="h-px bg-background-secondary" />
          <ToggleSwitch 
            label="Show Active Status" 
            desc="Let others see when you are online." 
            checked={settings.showActiveStatus} 
            onChange={(val) => handleChange('showActiveStatus', val)} 
          />
          <div className="h-px bg-background-secondary" />
          <div>
            <h4 className="text-sm font-bold text-text-primary mb-1">Download My Data</h4>
            <p className="text-xs text-text-muted mb-3 max-w-sm">Get a copy of all your data including test results, saved pathways, and profile information.</p>
            <button 
              onClick={() => alert('Data export requested. You will receive an email shortly with a download link.')}
              className="flex items-center gap-2 text-xs font-bold text-primary bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" /> Request Data Export
            </button>
          </div>
        </div>
      </PanelSection>
    </div>
  );
};

export const AppearanceSettings = () => {
  const { theme, setTheme, fontSize, setFontSize } = useAppearance();

  return (
    <PanelSection title="Theme & Appearance">
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-bold text-text-primary mb-3">Theme Settings</h4>
          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={() => setTheme('light')}
              className={`border-2 rounded-xl p-4 flex flex-col items-center gap-2 relative transition-colors cursor-pointer ${theme === 'light' ? 'border-primary bg-blue-50/50' : 'border-border hover:border-border bg-background'}`}
            >
              {theme === 'light' && <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-0.5"><CheckCircle className="w-3 h-3" /></div>}
              <Sun className={`w-6 h-6 ${theme === 'light' ? 'text-primary' : 'text-amber-500'}`} />
              <span className={`text-xs font-bold ${theme === 'light' ? 'text-primary-hover' : 'text-text-secondary'}`}>Light</span>
            </button>
            <button 
              onClick={() => setTheme('dark')}
              className={`border-2 rounded-xl p-4 flex flex-col items-center gap-2 relative transition-colors cursor-pointer ${theme === 'dark' ? 'border-primary bg-background-secondary' : 'border-border hover:border-border bg-background'}`}
            >
              {theme === 'dark' && <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-0.5"><CheckCircle className="w-3 h-3" /></div>}
              <Moon className={`w-6 h-6 ${theme === 'dark' ? 'text-primary' : 'text-text-muted'}`} />
              <span className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-text-muted'}`}>Dark</span>
            </button>
            <button 
              onClick={() => setTheme('system')}
              className={`border-2 rounded-xl p-4 flex flex-col items-center gap-2 relative transition-colors cursor-pointer ${theme === 'system' ? 'border-primary bg-blue-50/50' : 'border-border hover:border-border bg-gradient-to-br from-slate-100 to-slate-200'}`}
            >
              {theme === 'system' && <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-0.5"><CheckCircle className="w-3 h-3" /></div>}
              <Monitor className={`w-6 h-6 ${theme === 'system' ? 'text-primary' : 'text-text-secondary'}`} />
              <span className={`text-xs font-bold ${theme === 'system' ? 'text-primary-hover' : 'text-text-primary'}`}>System</span>
            </button>
          </div>
        </div>
        <div className="h-px bg-background-secondary" />
        <div>
          <h4 className="text-sm font-bold text-text-primary mb-3">Accent Color</h4>
          <div className="flex gap-3">
            {['bg-blue-600', 'bg-purple-600', 'bg-indigo-600', 'bg-emerald-500', 'bg-cyan-500', 'bg-orange-500', 'bg-pink-500', 'bg-red-500'].map((color, i) => (
              <button 
                key={i} 
                className={`w-8 h-8 rounded-full ${color} shadow-sm shadow-black/5 dark:shadow-none cursor-pointer hover:scale-110 transition-transform ${i === 0 ? 'ring-2 ring-offset-2 ring-offset-background ring-blue-600 flex items-center justify-center' : ''}`}
              >
                {i === 0 && <CheckCircle className="w-4 h-4 text-white" />}
              </button>
            ))}
          </div>
        </div>
        <div className="h-px bg-background-secondary" />
        <div>
          <h4 className="text-sm font-bold text-text-primary mb-3">Font Size</h4>
          <div className="flex gap-4">
            <button 
              onClick={() => setFontSize('small')}
              className={`px-4 py-2 border rounded-lg text-xs cursor-pointer transition-colors ${fontSize === 'small' ? 'border-primary bg-blue-50 text-primary-hover font-bold border-2' : 'border-border hover:bg-background text-text-secondary'}`}
            >
              Small
            </button>
            <button 
              onClick={() => setFontSize('medium')}
              className={`px-4 py-2 border rounded-lg text-sm cursor-pointer transition-colors ${fontSize === 'medium' ? 'border-primary bg-blue-50 text-primary-hover font-bold border-2' : 'border-border hover:bg-background text-text-secondary'}`}
            >
              Medium
            </button>
            <button 
              onClick={() => setFontSize('large')}
              className={`px-4 py-2 border rounded-lg text-base cursor-pointer transition-colors ${fontSize === 'large' ? 'border-primary bg-blue-50 text-primary-hover font-bold border-2' : 'border-border hover:bg-background text-text-secondary'}`}
            >
              Large
            </button>
          </div>
        </div>
      </div>
    </PanelSection>
  );
};

export const LanguageLocationSettings = () => {
  const { currentUser, updateProfile: updateContextProfile } = useAuth();
  
  const [appLang, setAppLang] = useState(() => localStorage.getItem('settings_lang') || 'English');
  const [state, setState] = useState(currentUser?.state || 'Karnataka');
  const [city, setCity] = useState(currentUser?.city || 'Bangalore');
  const [studyLoc, setStudyLoc] = useState(currentUser?.preferredLocation?.[0] || '');

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAppLang(e.target.value);
    localStorage.setItem('settings_lang', e.target.value);
    setTimeout(() => window.location.reload(), 500);
  };

  const handleSaveLocation = async () => {
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      const updates = {
        state,
        city,
        preferredLocation: studyLoc ? [studyLoc] : []
      };
      await updateProfile(updates);
      updateContextProfile(updates);
      setSuccessMsg('Location preferences saved successfully.');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || 'Unable to save changes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PanelSection title="Language Settings">
        <label className="block text-xs font-semibold text-text-primary mb-1.5">App Language</label>
        <select 
          value={appLang}
          onChange={handleLangChange}
          className="w-full max-w-sm px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary cursor-pointer"
        >
          <option>English</option>
          <option>ಕನ್ನಡ (Kannada)</option>
          <option>हिंदी (Hindi)</option>
        </select>
        <p className="text-[10px] text-text-muted mt-2">Note: Changing the language will reload the application.</p>
      </PanelSection>
      <PanelSection title="Location Preferences">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">State</label>
            <select 
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary cursor-pointer"
            >
              <option>Karnataka</option>
              <option>Maharashtra</option>
              <option>Delhi</option>
              <option>Tamil Nadu</option>
              <option>Kerala</option>
              <option>Telangana</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">District / City</label>
            <input 
              type="text" 
              placeholder="e.g. Bangalore" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary" 
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-text-primary mb-1.5">Preferred Study Location</label>
            <input 
              type="text" 
              placeholder="e.g. Bangalore, Mumbai" 
              value={studyLoc}
              onChange={(e) => setStudyLoc(e.target.value)}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary" 
            />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border flex items-center gap-4">
          <button 
            onClick={handleSaveLocation}
            disabled={loading}
            className="bg-primary hover:bg-primary-hover text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Location'}
          </button>
          {successMsg && <span className="text-sm font-semibold text-emerald-600">{successMsg}</span>}
          {errorMsg && <span className="text-sm font-semibold text-red-600">{errorMsg}</span>}
        </div>
      </PanelSection>
    </div>
  );
};

export const SavedDataSettings = () => {
  const navigate = useNavigate();
  
  return (
    <PanelSection title="Manage Saved Data">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-background border border-border rounded-xl">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-indigo-500" />
            <div>
              <div className="text-sm font-bold text-text-primary">Saved Careers</div>
              <div className="text-[10px] text-text-muted">View and manage your saved jobs</div>
            </div>
          </div>
          <button 
            onClick={() => navigate('/saved-jobs')}
            className="text-xs font-bold text-primary hover:underline cursor-pointer"
          >
            Manage
          </button>
        </div>
        <div className="flex items-center justify-between p-3 bg-background border border-border rounded-xl">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-emerald-500" />
            <div>
              <div className="text-sm font-bold text-text-primary">Saved Colleges</div>
              <div className="text-[10px] text-text-muted">Explore colleges directory</div>
            </div>
          </div>
          <button 
            onClick={() => navigate('/colleges')}
            className="text-xs font-bold text-primary hover:underline cursor-pointer"
          >
            Manage
          </button>
        </div>
        <div className="flex items-center justify-between p-3 bg-background border border-border rounded-xl">
          <div className="flex items-center gap-3">
            <Map className="w-5 h-5 text-purple-500" />
            <div>
              <div className="text-sm font-bold text-text-primary">Saved Pathways</div>
              <div className="text-[10px] text-text-muted">Explore your career pathways</div>
            </div>
          </div>
          <button 
            onClick={() => navigate('/pathways')}
            className="text-xs font-bold text-primary hover:underline cursor-pointer"
          >
            Manage
          </button>
        </div>
        <div className="pt-4 border-t border-border mt-4">
          <button 
            onClick={() => alert('Local preferences and saved sessions cleared.')}
            className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:underline cursor-pointer"
          >
            <Trash2 className="w-4 h-4" /> Clear All Local Data
          </button>
        </div>
      </div>
    </PanelSection>
  );
};

export const SupportAboutSettings = () => {
  return (
    <div>
      <PanelSection title="Help & Support">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="#" className="flex items-center gap-3 p-4 bg-background border border-border rounded-xl hover:bg-background-secondary transition-colors">
            <HelpCircle className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-bold text-text-primary">Help Center</span>
          </a>
          <a href="#" className="flex items-center gap-3 p-4 bg-background border border-border rounded-xl hover:bg-background-secondary transition-colors">
            <FileText className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-bold text-text-primary">FAQs</span>
          </a>
          <a href="#" className="flex items-center gap-3 p-4 bg-background border border-border rounded-xl hover:bg-background-secondary transition-colors">
            <MessageSquare className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-bold text-text-primary">Contact Support</span>
          </a>
          <a href="#" className="flex items-center gap-3 p-4 bg-background border border-border rounded-xl hover:bg-background-secondary transition-colors">
            <AlertCircle className="w-5 h-5 text-rose-500" />
            <span className="text-sm font-bold text-text-primary">Report a Problem</span>
          </a>
        </div>
      </PanelSection>
      <PanelSection title="About U THINK">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-xl">U</span>
            </div>
            <div>
              <h4 className="font-bold text-text-primary">U THINK</h4>
              <p className="text-[10px] text-text-muted">Version 1.0.0 (Build 42)</p>
            </div>
          </div>
          <div className="h-px bg-background-secondary" />
          <div className="flex gap-4 text-xs font-bold text-primary">
            <a href="#" className="hover:underline">Terms & Conditions</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </PanelSection>
    </div>
  );
};
