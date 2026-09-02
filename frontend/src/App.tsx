import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { LegalModal } from './components/LegalModal';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Home from './components/Home';
import AptitudeQuiz from './AptitudeQuiz';
import JobFinder from './components/JobFinder';
import SavedJobs from './components/SavedJobs';
import PathwaysExplorer from './components/PathwaysExplorer';
import MentorshipProgram from './components/MentorshipProgram';
import AICounselorModal from './components/AICounselorModal';
import ExamsDirectory from './components/ExamsDirectory';
import ExamDetail from './components/ExamDetail';
import DegreeDetail from './components/DegreeDetail';
import BranchDetail from './components/BranchDetail';
import CourseDetail from './components/CourseDetail';

import CollegesDirectory from './components/CollegesDirectory';
import CollegeDetail from './components/CollegeDetail';
import StudentDashboard from './components/StudentDashboard';
import SpecializationDetailView from './components/SpecializationDetailView';
import { Login } from './components/Login';
import { ForgotPassword } from './components/ForgotPassword';
import { EmployerDashboard, AdminDashboard, CollegeDashboard } from './components/Dashboards';
import ApplicationTracker from './components/ApplicationTracker';
import AdminJobPanel from './components/AdminJobPanel';
import { AuthReminderModal } from './components/AuthReminderModal';
import Settings from './components/Settings';
import { useAuth } from './contexts/AuthContext';
import { Compass, Sparkles } from 'lucide-react';

// ─── Route-aware layout shell ────────────────────────────────────
function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  const [isCounselorOpen, setIsCounselorOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'terms' | 'privacy' | null }>({ isOpen: false, type: null });
  const [selectedSpecId, setSelectedSpecId] = useState<string | null>(null);
  const [selectedJobRole, setSelectedJobRole] = useState<string | null>(null);
  const [showAuthReminder, setShowAuthReminder] = useState(false);

  // Derive activeTab from URL pathname for Header highlight
  const activeTab = location.pathname.replace('/', '') || 'home';

  // Auth reminder after 60s if not logged in
  React.useEffect(() => {
    if (!currentUser && !location.pathname.startsWith('/login') && !location.pathname.startsWith('/signup') && !showAuthReminder) {
      const timer = setTimeout(() => setShowAuthReminder(true), 60000);
      return () => clearTimeout(timer);
    }
  }, [currentUser, location.pathname, showAuthReminder]);

  // Listen for custom navigation events fired by child components
  React.useEffect(() => {
    const handleOpenCounselor = () => setIsCounselorOpen(true);

    const handleNavWithSearch = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.tab) {
        const { tab, search, streamPreset, coursePreset, examPreset, degreePreset, degreePresetToSpec, specType, specPreset } = customEvent.detail;
        if (streamPreset) localStorage.setItem('stream_preset', streamPreset);
        if (coursePreset) localStorage.setItem('course_preset', coursePreset);
        const examVal = examPreset || (tab === 'exams' && search);
        if (examVal) { localStorage.setItem('exam_preset', examVal); localStorage.setItem('exam_preset_search', examVal); }
        const degVal = degreePreset || (tab === 'degrees' && search);
        if (degVal) { localStorage.setItem('degree_preset', degVal); localStorage.setItem('degree_preset_search', degVal); }
        if (degreePresetToSpec) localStorage.setItem('degree_preset_to_spec', 'true');
        if (specType) localStorage.setItem('spec_type_preset', specType);
        const specVal = specPreset || (tab === 'specializations' && search);
        if (specVal) localStorage.setItem('spec_preset_search', specVal);
        navigate(`/${tab}`);
      }
    };

    window.addEventListener('open-counselor-with-context', handleOpenCounselor);
    window.addEventListener('navigate-tab-with-search', handleNavWithSearch);
    return () => {
      window.removeEventListener('open-counselor-with-context', handleOpenCounselor);
      window.removeEventListener('navigate-tab-with-search', handleNavWithSearch);
    };
  }, [navigate]);

  // Scroll to top on route change; clear job role if leaving jobs
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!location.pathname.startsWith('/jobs')) setSelectedJobRole(null);
  }, [location.pathname]);

  const navigateToSpecializationDetail = (specId: string) => {
    setSelectedSpecId(specId);
    navigate('/specialization_detail');
  };

  const navigateToJobExplorer = (role?: string) => {
    setSelectedJobRole(role || null);
    navigate('/jobs');
  };

  return (
    <div className="min-h-screen bg-background text-text-primary flex selection:bg-blue-100 selection:text-blue-800">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Workspace Wrapper */}
      <div className="flex-1 flex flex-col ml-64 min-w-0 min-h-screen">
        
        {/* Top Navigation Bar */}
        <TopBar />

        {/* Main Content */}
        <main className="flex-1 w-full px-4 sm:px-8 py-8">

        {/* System Live Banner */}
        {location.pathname !== '/' && (
          <div className="mb-6 bg-slate-900 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <span className="bg-emerald-500 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
                System Live
              </span>
              <p className="text-slate-200">
                Welcome to <strong>U THINK</strong>. Easily explore and map 12th/Intermediate, Diploma, Paramedical, ITI, and Vocational tracks.
              </p>
            </div>
            <button
              onClick={() => navigate('/quiz')}
              className="text-amber-300 font-bold hover:underline flex items-center gap-1 shrink-0 cursor-pointer text-xs"
            >
              <Sparkles className="w-3.5 h-3.5" /> Take Aptitude Test
            </button>
          </div>
        )}

        {/* Routed Pages */}
        <div className="bg-card/40 rounded-3xl min-h-[500px]">
          <Routes>
            <Route path="/" element={<Home onNavigate={(tab) => navigate(`/${tab === 'home' ? '' : tab}`)} onOpenCounselor={() => setIsCounselorOpen(true)} />} />
            <Route path="/streams" element={<PathwaysExplorer />} />
            <Route path="/colleges" element={<CollegesDirectory />} />
            <Route path="/colleges/:slug" element={<CollegeDetail />} />
            <Route path="/branches/:slug" element={<BranchDetail />} />
            <Route path="/exams" element={<ExamsDirectory key="exams-tab" initialTab="exams" />} />
            <Route path="/exams/:examId" element={<ExamDetail />} />
            <Route path="/degrees" element={<ExamsDirectory key="degrees-tab" initialTab="degrees" />} />
            <Route path="/degrees/:degreeId" element={<DegreeDetail />} />
            <Route path="/specializations" element={<ExamsDirectory key="specializations-tab" initialTab="specializations" />} />
            <Route
              path="/specialization_detail"
              element={
                selectedSpecId ? (
                  <SpecializationDetailView
                    specId={selectedSpecId}
                    onBack={() => navigate('/specializations')}
                    onNavigateToJobExplorer={navigateToJobExplorer}
                    onNavigateToSpec={navigateToSpecializationDetail}
                  />
                ) : (
                  <Navigate to="/specializations" replace />
                )
              }
            />
            <Route path="/quiz" element={<AptitudeQuiz />} />
            <Route path="/jobs" element={<JobFinder initialRole={selectedJobRole} />} />
            <Route path="/saved-jobs" element={<SavedJobs />} />
            <Route path="/pathways" element={<PathwaysExplorer />} />
            <Route path="/pathways/:levelSlug" element={<PathwaysExplorer />} />
            <Route path="/pathways/:levelSlug/:pathwaySlug" element={<PathwaysExplorer />} />
            <Route path="/pathways/:levelSlug/:pathwaySlug/:streamSlug" element={<PathwaysExplorer />} />
            <Route path="/pathways/:levelSlug/:pathwaySlug/:streamSlug/:comboSlug" element={<PathwaysExplorer />} />
            <Route path="/courses/:courseSlug" element={<CourseDetail />} />
            <Route path="/applications" element={<ApplicationTracker />} />
            <Route path="/admin/jobs" element={<AdminJobPanel />} />
            <Route path="/mentorship" element={<MentorshipProgram />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/employer-dashboard" element={<EmployerDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/college-dashboard" element={<CollegeDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4 col-span-1 md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="bg-primary text-white p-2 rounded-xl">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-base font-extrabold text-text-primary tracking-tight">U THINK India</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed max-w-sm">
                A modern technical platform assisting students and young graduates with verified options, career analysis, simulated industry professionals, and aptitude tools after passing their 10th-grade secondary certifications.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">Platform modules</h4>
              <ul className="space-y-2 text-xs font-medium text-text-secondary font-sans">
                <li><button onClick={() => navigate('/')} className="hover:text-primary cursor-pointer font-bold">🏠 Home & Mission</button></li>
                <li><button onClick={() => navigate('/streams')} className="hover:text-primary cursor-pointer">Academic Streams</button></li>
                <li><button onClick={() => navigate('/quiz')} className="hover:text-primary cursor-pointer">Aptitude Assessment</button></li>
                <li><button onClick={() => navigate('/jobs')} className="hover:text-primary cursor-pointer">Job Explorer</button></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">Counselor Channels</h4>
              <ul className="space-y-2 text-xs font-medium text-text-secondary">
                <li><button onClick={() => setIsCounselorOpen(true)} className="hover:text-primary cursor-pointer text-left">💬 Chat with AI Advisor (NEET/JEE info)</button></li>
                <li><button onClick={() => navigate('/mentorship')} className="hover:text-primary cursor-pointer text-left">🤝 Connect with Industry Mentors</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-text-muted font-medium">
            <p>© {new Date().getFullYear()} U THINK. All rights reserved. Empowering post-10th student careers.</p>
            <div className="flex gap-4">
              <button onClick={() => setLegalModal({ isOpen: true, type: 'terms' })} className="hover:underline">Terms of Guidance</button>
              <button onClick={() => setLegalModal({ isOpen: true, type: 'privacy' })} className="hover:underline">Privacy Charter</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <AICounselorModal isOpen={isCounselorOpen} onClose={() => setIsCounselorOpen(false)} />
      <LegalModal
        isOpen={legalModal.isOpen}
        onClose={() => setLegalModal({ isOpen: false, type: null })}
        title={legalModal.type === 'terms' ? 'Terms of Guidance' : 'Privacy Charter'}
      >
        {legalModal.type === 'terms' ? (
          <div className="space-y-4">
            <h3 className="font-bold text-lg">1. Introduction</h3>
            <p>Welcome to U THINK. By accessing or using our platform, you agree to be bound by these Terms of Guidance.</p>
            <h3 className="font-bold text-lg">2. Purpose of Guidance</h3>
            <p>U THINK provides information, tools, and assessments to support career exploration. Our content is for educational and guidance purposes only.</p>
            <h3 className="font-bold text-lg">3. User Obligations</h3>
            <p>You agree to provide accurate information when using our assessment tools and are responsible for maintaining the confidentiality of your account information.</p>
            <h3 className="font-bold text-lg">4. Limitation of Liability</h3>
            <p>U THINK shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from your use of the platform.</p>
            <h3 className="font-bold text-lg">5. Modification of Terms</h3>
            <p>We reserve the right to modify these terms at any time. Continued use constitutes acceptance of the new terms.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="font-bold text-lg">1. Data Collection</h3>
            <p>We collect essential information to provide personalized career recommendations including name, contact details, educational background, and assessment responses.</p>
            <h3 className="font-bold text-lg">2. How We Use Data</h3>
            <p>Your data is used solely to enhance your experience, provide tailored guidance, and improve our services. We do not sell your personal data to third-party marketers.</p>
            <h3 className="font-bold text-lg">3. Data Security</h3>
            <p>We implement industry-standard security measures to protect your personal information from unauthorized access or disclosure.</p>
            <h3 className="font-bold text-lg">4. Cookies and Tracking</h3>
            <p>Our platform may use cookies to improve functionality. You can disable cookies in your browser settings.</p>
            <h3 className="font-bold text-lg">5. Contact Us</h3>
            <p>Questions about this Privacy Charter? Contact us at support@uthink.com.</p>
          </div>
        )}
      </LegalModal>

      <AuthReminderModal
        isOpen={showAuthReminder}
        onClose={() => setShowAuthReminder(false)}
        onNavigateToLogin={() => navigate('/login')}
        onNavigateToSignup={() => navigate('/signup')}
      />
      </div>
    </div>
  );
}

// ─── Root App with Router-aware Login handling ────────────────────
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<LoginPage mode="signup" />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/*" element={<AppShell />} />
    </Routes>
  );
}

function LoginPage({ mode = 'login' }: { mode?: 'login' | 'signup' }) {
  const navigate = useNavigate();
  return <Login onNavigate={(tab) => navigate(`/${tab === 'home' ? '' : tab}`)} initialMode={mode} />;
}

function ForgotPasswordPage() {
  const navigate = useNavigate();
  return <ForgotPassword onNavigate={(tab) => navigate(`/${tab === 'home' ? '' : tab}`)} />;
}
