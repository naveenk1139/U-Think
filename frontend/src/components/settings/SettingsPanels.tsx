import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, Lock, LogOut, Trash2, BookOpen, Map, MapPin, 
  Target, GraduationCap, Bell, Briefcase, Zap, Moon, Sun, Monitor,
  Shield, Smartphone, Eye, Download, Globe, HelpCircle, MessageSquare, 
  Info, FileText, Smartphone as DeviceMobile, CheckCircle, AlertCircle
} from 'lucide-react';

const PanelSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6">
    <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
      <h3 className="font-bold text-slate-900">{title}</h3>
    </div>
    <div className="p-6 space-y-6">
      {children}
    </div>
  </div>
);

const ToggleSwitch = ({ label, desc, defaultChecked = false }: { label: string, desc?: string, defaultChecked?: boolean }) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="font-semibold text-sm text-slate-800">{label}</div>
        {desc && <div className="text-[11px] text-slate-500 mt-0.5">{desc}</div>}
      </div>
      <button 
        onClick={() => setChecked(!checked)}
        className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${checked ? 'bg-blue-600' : 'bg-slate-200'}`}
      >
        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${checked ? 'left-6' : 'left-1'}`} />
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
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name</label>
            <input type="text" defaultValue={currentUser?.displayName || currentUser?.name || ''} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
            <input type="email" disabled defaultValue={currentUser?.email || ''} className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone Number</label>
            <input type="tel" placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600" />
          </div>
        </div>
        <div className="mt-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors">Save Changes</button>
        </div>
      </PanelSection>

      <PanelSection title="Password & Authentication">
        <button className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-5 py-2.5 rounded-xl transition-colors">
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
          <div className="pt-4 border-t border-slate-100">
            <h4 className="font-semibold text-slate-800 text-sm mb-1">Delete Account</h4>
            <p className="text-xs text-slate-500 mb-3">Once you delete your account, there is no going back. Please be certain.</p>
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
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Education Level</label>
          <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600">
            <option>Class 10th</option>
            <option>Class 11th</option>
            <option>Class 12th</option>
            <option>Undergraduate</option>
            <option>Postgraduate</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Stream</label>
          <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600">
            <option>Science (PCM)</option>
            <option>Science (PCB)</option>
            <option>Commerce</option>
            <option>Arts / Humanities</option>
            <option>Undecided</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Preferred Career</label>
          <input type="text" placeholder="e.g. Software Engineer" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Preferred College</label>
          <input type="text" placeholder="e.g. IIT Bombay" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600" />
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-100">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors">Save Education Profile</button>
      </div>
    </PanelSection>
  );
};

export const NotificationSettings = () => {
  return (
    <PanelSection title="Email & Push Notifications">
      <div className="space-y-4">
        <ToggleSwitch label="Exam Notifications" desc="Get alerted about upcoming exam dates and deadlines." defaultChecked={true} />
        <div className="h-px bg-slate-100" />
        <ToggleSwitch label="College Notifications" desc="Updates on college admissions and application processes." defaultChecked={true} />
        <div className="h-px bg-slate-100" />
        <ToggleSwitch label="Job Alerts" desc="Notifications for internships and job opportunities." defaultChecked={false} />
        <div className="h-px bg-slate-100" />
        <ToggleSwitch label="Career Recommendations" desc="Weekly insights on career paths matching your profile." defaultChecked={true} />
        <div className="h-px bg-slate-100" />
        <ToggleSwitch label="Deadline Reminders" desc="Don't miss out on important submission dates." defaultChecked={true} />
        <div className="h-px bg-slate-100" />
        <ToggleSwitch label="AI Counselor Notifications" desc="Updates when your AI counselor has new insights." defaultChecked={true} />
      </div>
    </PanelSection>
  );
};

export const AICounselorSettings = () => {
  return (
    <div>
      <PanelSection title="AI Counselor Preferences">
        <div className="space-y-4">
          <ToggleSwitch label="Personalized Recommendations" desc="Allow AI to use your profile data for better suggestions." defaultChecked={true} />
          <div className="h-px bg-slate-100" />
          <ToggleSwitch label="Career Suggestions" defaultChecked={true} />
          <ToggleSwitch label="College Suggestions" defaultChecked={true} />
          <ToggleSwitch label="Exam Suggestions" defaultChecked={true} />
          <ToggleSwitch label="Job Suggestions" defaultChecked={false} />
        </div>
      </PanelSection>
      <PanelSection title="Data & Privacy">
        <p className="text-sm text-slate-600 mb-4">Clear your conversation history with the AI Counselor. This action cannot be undone.</p>
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
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg h-fit"><Shield className="w-5 h-5" /></div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Two-Factor Authentication (2FA)</h4>
                <p className="text-xs text-slate-500 mt-0.5 max-w-sm">Add an extra layer of security to your account by requiring more than just your password to sign in.</p>
              </div>
            </div>
            <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-lg">Enable</button>
          </div>
          
          <div className="h-px bg-slate-100" />

          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-3">Active Devices</h4>
            <div className="border border-slate-100 rounded-xl divide-y divide-slate-100">
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Monitor className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="text-xs font-bold text-slate-700">Windows PC - Chrome <span className="text-[10px] text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded ml-2">Active Now</span></div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Bangalore, India</div>
                  </div>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="text-xs font-bold text-slate-700">iPhone 13 - Safari</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Last active 2 days ago</div>
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
          <ToggleSwitch label="Public Profile Visibility" desc="Allow colleges and recruiters to see your profile." defaultChecked={true} />
          <div className="h-px bg-slate-100" />
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">Download My Data</h4>
            <p className="text-xs text-slate-500 mb-3 max-w-sm">Get a copy of all your data including test results, saved pathways, and profile information.</p>
            <button className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
              <Download className="w-4 h-4" /> Request Data Export
            </button>
          </div>
        </div>
      </PanelSection>
    </div>
  );
};

export const AppearanceSettings = () => {
  return (
    <PanelSection title="Theme & Appearance">
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-bold text-slate-800 mb-3">Theme Settings</h4>
          <div className="grid grid-cols-3 gap-4">
            <button className="border-2 border-blue-600 rounded-xl p-4 flex flex-col items-center gap-2 bg-slate-50 relative">
              <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-0.5"><CheckCircle className="w-3 h-3" /></div>
              <Sun className="w-6 h-6 text-amber-500" />
              <span className="text-xs font-bold text-blue-700">Light</span>
            </button>
            <button className="border-2 border-slate-100 hover:border-slate-300 rounded-xl p-4 flex flex-col items-center gap-2 bg-slate-900 transition-colors">
              <Moon className="w-6 h-6 text-blue-300" />
              <span className="text-xs font-bold text-white">Dark</span>
            </button>
            <button className="border-2 border-slate-100 hover:border-slate-300 rounded-xl p-4 flex flex-col items-center gap-2 bg-gradient-to-br from-slate-100 to-slate-200 transition-colors">
              <Monitor className="w-6 h-6 text-slate-600" />
              <span className="text-xs font-bold text-slate-700">System</span>
            </button>
          </div>
        </div>
        <div className="h-px bg-slate-100" />
        <div>
          <h4 className="text-sm font-bold text-slate-800 mb-3">Font Size</h4>
          <div className="flex gap-4">
            <button className="px-4 py-2 border border-slate-200 rounded-lg text-xs hover:bg-slate-50">Small</button>
            <button className="px-4 py-2 border-2 border-blue-600 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold">Medium</button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg text-base hover:bg-slate-50">Large</button>
          </div>
        </div>
      </div>
    </PanelSection>
  );
};

export const LanguageLocationSettings = () => {
  return (
    <div>
      <PanelSection title="Language Settings">
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">App Language</label>
        <select className="w-full max-w-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600">
          <option>English</option>
          <option>ಕನ್ನಡ (Kannada)</option>
          <option>हिंदी (Hindi)</option>
        </select>
        <p className="text-[10px] text-slate-500 mt-2">Note: Changing the language will reload the application.</p>
      </PanelSection>
      <PanelSection title="Location Preferences">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">State</label>
            <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600">
              <option>Karnataka</option>
              <option>Maharashtra</option>
              <option>Delhi</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">District / City</label>
            <input type="text" placeholder="e.g. Bangalore" defaultValue="Bangalore" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Preferred Study Location</label>
            <input type="text" placeholder="e.g. Bangalore, Mumbai" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600" />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors">Save Location</button>
        </div>
      </PanelSection>
    </div>
  );
};

export const SavedDataSettings = () => {
  return (
    <PanelSection title="Manage Saved Data">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-indigo-500" />
            <div>
              <div className="text-sm font-bold text-slate-800">Saved Careers</div>
              <div className="text-[10px] text-slate-500">12 items saved</div>
            </div>
          </div>
          <button className="text-xs font-bold text-blue-600 hover:underline">Manage</button>
        </div>
        <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-emerald-500" />
            <div>
              <div className="text-sm font-bold text-slate-800">Saved Colleges</div>
              <div className="text-[10px] text-slate-500">5 items saved</div>
            </div>
          </div>
          <button className="text-xs font-bold text-blue-600 hover:underline">Manage</button>
        </div>
        <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
          <div className="flex items-center gap-3">
            <Map className="w-5 h-5 text-purple-500" />
            <div>
              <div className="text-sm font-bold text-slate-800">Saved Pathways</div>
              <div className="text-[10px] text-slate-500">2 items saved</div>
            </div>
          </div>
          <button className="text-xs font-bold text-blue-600 hover:underline">Manage</button>
        </div>
        <div className="pt-4 border-t border-slate-100 mt-4">
          <button className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:underline cursor-pointer">
            <Trash2 className="w-4 h-4" /> Clear All Saved Data
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
          <a href="#" className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors">
            <HelpCircle className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-bold text-slate-800">Help Center</span>
          </a>
          <a href="#" className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors">
            <FileText className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-bold text-slate-800">FAQs</span>
          </a>
          <a href="#" className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors">
            <MessageSquare className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-bold text-slate-800">Contact Support</span>
          </a>
          <a href="#" className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors">
            <AlertCircle className="w-5 h-5 text-rose-500" />
            <span className="text-sm font-bold text-slate-800">Report a Problem</span>
          </a>
        </div>
      </PanelSection>
      <PanelSection title="About U THINK">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-xl">U</span>
            </div>
            <div>
              <h4 className="font-bold text-slate-900">U THINK</h4>
              <p className="text-[10px] text-slate-500">Version 1.0.0 (Build 42)</p>
            </div>
          </div>
          <div className="h-px bg-slate-100" />
          <div className="flex gap-4 text-xs font-bold text-blue-600">
            <a href="#" className="hover:underline">Terms & Conditions</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </PanelSection>
    </div>
  );
};
