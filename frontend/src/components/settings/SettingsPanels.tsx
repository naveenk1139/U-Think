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

const ToggleSwitch = ({ label, desc, defaultChecked = false, storageKey }: { label: string, desc?: string, defaultChecked?: boolean, storageKey?: string }) => {
  const [checked, setChecked] = useState(() => {
    if (storageKey) {
      const stored = localStorage.getItem(storageKey);
      if (stored !== null) return stored === 'true';
    }
    return defaultChecked;
  });

  const handleToggle = () => {
    const newVal = !checked;
    setChecked(newVal);
    if (storageKey) localStorage.setItem(storageKey, String(newVal));
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
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <PanelSection title="Profile Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">Full Name</label>
            <input type="text" defaultValue={currentUser?.displayName || currentUser?.name || ''} className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">Email Address</label>
            <input type="email" disabled defaultValue={currentUser?.email || ''} className="w-full px-4 py-2.5 bg-background-secondary border border-border rounded-xl text-sm text-text-muted cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">Phone Number</label>
            <input type="tel" placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
        </div>
        <div className="mt-4">
          <button className="bg-primary hover:bg-primary-hover text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors">Save Changes</button>
        </div>
      </PanelSection>

      <PanelSection title="Password & Authentication">
        <button className="flex items-center gap-2 text-sm font-semibold text-text-primary bg-background hover:bg-background-secondary border border-border px-5 py-2.5 rounded-xl transition-colors">
          <Lock className="w-4 h-4" /> Change Password
        </button>
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
            <button className="text-sm font-bold text-red-600 hover:underline">Delete my account</button>
          </div>
        </div>
      </PanelSection>
    </div>
  );
};

export const EducationSettings = () => {
  return (
    <PanelSection title="Academic Profile">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1.5">Education Level</label>
          <select className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary">
            <option>Class 10th</option>
            <option>Class 11th</option>
            <option>Class 12th</option>
            <option>Undergraduate</option>
            <option>Postgraduate</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1.5">Stream</label>
          <select className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary">
            <option>Science (PCM)</option>
            <option>Science (PCB)</option>
            <option>Commerce</option>
            <option>Arts / Humanities</option>
            <option>Undecided</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1.5">Preferred Career</label>
          <input type="text" placeholder="e.g. Software Engineer" className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1.5">Preferred College</label>
          <input type="text" placeholder="e.g. IIT Bombay" className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary" />
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <button className="bg-primary hover:bg-primary-hover text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors">Save Education Profile</button>
      </div>
    </PanelSection>
  );
};

export const NotificationSettings = () => {
  return (
    <PanelSection title="Email & Push Notifications">
      <div className="space-y-4">
        <ToggleSwitch label="Exam Notifications" desc="Get alerted about upcoming exam dates and deadlines." storageKey="notif_exam" defaultChecked={true} />
        <div className="h-px bg-background-secondary" />
        <ToggleSwitch label="College Notifications" desc="Updates on college admissions and application processes." storageKey="notif_college" defaultChecked={true} />
        <div className="h-px bg-background-secondary" />
        <ToggleSwitch label="Job Alerts" desc="Notifications for internships and job opportunities." storageKey="notif_jobs" defaultChecked={false} />
        <div className="h-px bg-background-secondary" />
        <ToggleSwitch label="Career Recommendations" desc="Weekly insights on career paths matching your profile." storageKey="notif_career" defaultChecked={true} />
        <div className="h-px bg-background-secondary" />
        <ToggleSwitch label="Deadline Reminders" desc="Don't miss out on important submission dates." storageKey="notif_deadlines" defaultChecked={true} />
        <div className="h-px bg-background-secondary" />
        <ToggleSwitch label="AI Counselor Notifications" desc="Updates when your AI counselor has new insights." storageKey="notif_ai" defaultChecked={true} />
      </div>
    </PanelSection>
  );
};

export const AICounselorSettings = () => {
  return (
    <div>
      <PanelSection title="AI Counselor Preferences">
        <div className="space-y-4">
          <ToggleSwitch label="Personalized Recommendations" desc="Allow AI to use your profile data for better suggestions." storageKey="ai_pref_personal" defaultChecked={true} />
          <div className="h-px bg-background-secondary" />
          <ToggleSwitch label="Career Suggestions" storageKey="ai_pref_career" defaultChecked={true} />
          <ToggleSwitch label="College Suggestions" storageKey="ai_pref_college" defaultChecked={true} />
          <ToggleSwitch label="Exam Suggestions" storageKey="ai_pref_exam" defaultChecked={true} />
          <ToggleSwitch label="Job Suggestions" storageKey="ai_pref_job" defaultChecked={false} />
        </div>
      </PanelSection>
      <PanelSection title="Data & Privacy">
        <p className="text-sm text-text-secondary mb-4">Clear your conversation history with the AI Counselor. This action cannot be undone.</p>
        <button className="flex items-center gap-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-5 py-2.5 rounded-xl transition-colors cursor-pointer">
          <Trash2 className="w-4 h-4" /> Clear Chat History
        </button>
      </PanelSection>
    </div>
  );
};

export const PrivacySecuritySettings = () => {
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
            <button className="bg-background-secondary hover:border-border text-text-primary font-bold text-xs px-4 py-2 rounded-lg">Enable</button>
          </div>
          
          <div className="h-px bg-background-secondary" />

          <div>
            <h4 className="text-sm font-bold text-text-primary mb-3">Active Devices</h4>
            <div className="border border-border rounded-xl divide-y divide-border">
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Monitor className="w-4 h-4 text-text-muted" />
                  <div>
                    <div className="text-xs font-bold text-text-primary">Windows PC - Chrome <span className="text-[10px] text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded ml-2">Active Now</span></div>
                    <div className="text-[10px] text-text-muted mt-0.5">Bangalore, India</div>
                  </div>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-4 h-4 text-text-muted" />
                  <div>
                    <div className="text-xs font-bold text-text-primary">iPhone 13 - Safari</div>
                    <div className="text-[10px] text-text-muted mt-0.5">Last active 2 days ago</div>
                  </div>
                </div>
                <button className="text-[10px] font-bold text-red-500 hover:underline cursor-pointer">Log out</button>
              </div>
            </div>
            <button className="text-xs font-bold text-red-600 mt-3 hover:underline">Log out from all other devices</button>
          </div>
        </div>
      </PanelSection>
      <PanelSection title="Data Privacy">
        <div className="space-y-4">
          <ToggleSwitch label="Public Profile Visibility" desc="Allow colleges and recruiters to see your profile." storageKey="privacy_public" defaultChecked={true} />
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
  const [appLang, setAppLang] = useState(() => localStorage.getItem('settings_lang') || 'English');
  const [state, setState] = useState(() => localStorage.getItem('settings_state') || 'Karnataka');
  const [city, setCity] = useState(() => localStorage.getItem('settings_city') || 'Bangalore');
  const [studyLoc, setStudyLoc] = useState(() => localStorage.getItem('settings_study_loc') || '');

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAppLang(e.target.value);
    localStorage.setItem('settings_lang', e.target.value);
    setTimeout(() => window.location.reload(), 500);
  };

  const handleSaveLocation = () => {
    localStorage.setItem('settings_state', state);
    localStorage.setItem('settings_city', city);
    localStorage.setItem('settings_study_loc', studyLoc);
    alert('Location preferences saved successfully!');
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
        <div className="mt-4 pt-4 border-t border-border">
          <button 
            onClick={handleSaveLocation}
            className="bg-primary hover:bg-primary-hover text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Save Location
          </button>
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
