import React, { useState, useEffect } from 'react';
import { 
  User, GraduationCap, Bell, Bot, Shield, Palette, 
  Globe, MapPin, Bookmark, HelpCircle
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AccountSettings,
  EducationSettings,
  NotificationSettings,
  AICounselorSettings,
  PrivacySecuritySettings,
  AppearanceSettings,
  LanguageLocationSettings,
  SavedDataSettings,
  SupportAboutSettings
} from './settings/SettingsPanels';

export default function Settings() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Try to grab initial tab from query param e.g. /settings?tab=privacy
  const searchParams = new URLSearchParams(location.search);
  const initialTab = searchParams.get('tab') || 'account';

  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    // Update URL if activeTab changes
    navigate(`/settings?tab=${activeTab}`, { replace: true });
  }, [activeTab, navigate]);

  const SETTINGS_CATEGORIES = [
    { id: 'account', label: 'Account', icon: User, component: AccountSettings },
    { id: 'education', label: 'Education Preferences', icon: GraduationCap, component: EducationSettings },
    { id: 'notifications', label: 'Notification Settings', icon: Bell, component: NotificationSettings },
    { id: 'ai-counselor', label: 'AI Counselor', icon: Bot, component: AICounselorSettings },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield, component: PrivacySecuritySettings },
    { id: 'appearance', label: 'Appearance', icon: Palette, component: AppearanceSettings },
    { id: 'language-location', label: 'Language & Location', icon: Globe, component: LanguageLocationSettings },
    { id: 'saved-data', label: 'Saved Data', icon: Bookmark, component: SavedDataSettings },
    { id: 'support-about', label: 'Help & About', icon: HelpCircle, component: SupportAboutSettings },
  ];

  const ActiveComponent = SETTINGS_CATEGORIES.find(c => c.id === activeTab)?.component || AccountSettings;

  return (
    <div className="font-sans pb-10 max-w-6xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 mt-2 text-sm">Manage your account, preferences, and personalized experience.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Settings Navigation Sidebar */}
        <div className="w-full md:w-64 shrink-0 bg-white border border-slate-100 rounded-2xl p-3 shadow-sm sticky top-28">
          <nav className="flex flex-col space-y-1">
            {SETTINGS_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  activeTab === cat.id 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <cat.icon className={`w-4 h-4 ${activeTab === cat.id ? 'text-white' : 'text-slate-400'}`} />
                <span className="text-[13px] font-bold">{cat.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 w-full min-w-0">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}
