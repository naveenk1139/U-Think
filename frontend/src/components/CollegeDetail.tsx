import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Building2, MapPin, Star, Share2, Heart, GraduationCap, 
  Clock, DollarSign, CheckCircle, Award, Phone, Mail, Globe, ShieldCheck, ArrowLeft,
  ChevronRight, BookOpen, AlertCircle
} from 'lucide-react';
import { fetchCollegeByIdOrSlug, fetchCollegeCourses, fetchCollegeFees, College, CollegeCourse, FeeRecord } from '../api/collegeApi';
import { useAuth } from '../contexts/AuthContext';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';

export default function CollegeDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [college, setCollege] = useState<College | null>(null);
  const [courses, setCourses] = useState<CollegeCourse[]>([]);
  const [fees, setFees] = useState<FeeRecord[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { currentUser } = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  // Maps configuration
  const { isLoaded: isMapLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  useEffect(() => {
    const loadCollegeData = async () => {
      if (!slug) return;
      try {
        setIsLoading(true);
        setError(null);
        
        const collegeData = await fetchCollegeByIdOrSlug(slug);
        setCollege(collegeData);
        
        // Fetch relations
        const coursesData = await fetchCollegeCourses(slug);
        setCourses(coursesData);

        const feesData = await fetchCollegeFees(slug);
        setFees(feesData);

      } catch (err) {
        console.error('Error fetching college details:', err);
        setError('Failed to load college details. Please check the URL or try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCollegeData();
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-text-muted font-bold animate-pulse">Loading college data...</p>
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center px-4">
        <AlertCircle className="w-16 h-16 text-rose-500 mb-4" />
        <h2 className="text-2xl font-black text-text-primary mb-2">College Not Found</h2>
        <p className="text-text-secondary text-center mb-6">{error || 'The college you are looking for does not exist.'}</p>
        <Link to="/colleges" className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-xl transition-colors">
          Browse All Colleges
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'courses', label: 'Courses & Fees' },
    { id: 'admission', label: 'Admission' },
    { id: 'placements', label: 'Placements' },
    { id: 'facilities', label: 'Facilities' }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      
      {/* Breadcrumbs */}
      <div className="bg-card border-b border-border py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm font-semibold text-text-muted overflow-x-auto hide-scrollbar whitespace-nowrap">
            <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1"><ArrowLeft className="w-4 h-4"/> Home</Link>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <Link to="/colleges" className="hover:text-primary transition-colors">Colleges</Link>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <span className="text-text-primary truncate">{college.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="bg-card rounded-3xl overflow-hidden border border-border shadow-sm mb-8">
          <div className="h-48 md:h-64 lg:h-80 w-full relative">
            <img src={college.image || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80'} alt={college.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 right-6 lg:left-10 lg:right-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl p-2 shadow-xl shrink-0 hidden sm:block">
                  <img src={college.logo || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(college.name) + '&background=0D8ABC&color=fff'} alt={`${college.name} logo`} className="w-full h-full object-contain rounded-xl" />
                </div>
                <div className="text-white">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="bg-blue-500/20 text-blue-300 text-xs font-black px-2.5 py-1 rounded-md border border-blue-500/30 backdrop-blur-md">
                      {college.type || 'Private'}
                    </span>
                    {college.isVerified && (
                      <span className="bg-emerald-500/20 text-emerald-300 text-xs font-black px-2.5 py-1 rounded-md border border-emerald-500/30 backdrop-blur-md flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Verified by Gov Source
                      </span>
                    )}
                    {college.nirfRank && (
                      <span className="bg-amber-500/20 text-amber-300 text-xs font-black px-2.5 py-1 rounded-md border border-amber-500/30 backdrop-blur-md flex items-center gap-1">
                        <Star className="w-3 h-3" /> NIRF Rank #{college.nirfRank}
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 leading-tight text-white">{college.name}</h1>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-200 font-semibold">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-blue-400" /> {college.city ? `${college.city}, ` : ''}{college.district}, {college.state}</span>
                    <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-blue-400" /> Est. {college.establishedYear || 'N/A'}</span>
                    {college.universityAffiliation && (
                      <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-blue-400" /> Affiliated: {college.universityAffiliation.split('(')[0].trim()}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-row md:flex-col gap-3 shrink-0">
                <button className="flex-1 bg-white text-slate-900 font-bold py-3 px-6 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
                  Apply Now
                </button>
                <button 
                  onClick={() => setIsSaved(!isSaved)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold border transition-colors backdrop-blur-md ${isSaved ? 'bg-rose-500/20 border-rose-500 text-rose-300' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} /> 
                  {isSaved ? 'Saved' : 'Save College'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Tabs Navigation */}
          <div className="flex overflow-x-auto hide-scrollbar border-b border-border bg-card">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[120px] py-4 px-6 text-sm font-black whitespace-nowrap transition-colors text-center border-b-2 ${
                  activeTab === tab.id 
                    ? 'border-primary text-primary bg-blue-50/50 dark:bg-blue-900/10' 
                    : 'border-transparent text-text-muted hover:text-text-primary hover:bg-background'
                }`}
              >
                {tab.label.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm">
                  <h2 className="text-xl font-black text-text-primary mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-500"/> About College
                  </h2>
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6">
                    {college.description || `${college.name} is a renowned ${college.type?.toLowerCase() || 'educational'} institution situated in ${college.city ? college.city + ', ' : ''}${college.district}. Established in ${college.establishedYear || 'the past'}, the college is affiliated with ${college.universityAffiliation || 'a recognized university'} and provides exceptional education in various domains.`}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-background p-4 rounded-2xl border border-border">
                      <div className="text-[10px] font-bold text-text-muted uppercase mb-1">Status</div>
                      <div className="font-black text-text-primary text-sm truncate">{college.ownership || college.type}</div>
                    </div>
                    <div className="bg-background p-4 rounded-2xl border border-border">
                      <div className="text-[10px] font-bold text-text-muted uppercase mb-1">Campus Size</div>
                      <div className="font-black text-text-primary text-sm truncate">N/A</div>
                    </div>
                    <div className="bg-background p-4 rounded-2xl border border-border">
                      <div className="text-[10px] font-bold text-text-muted uppercase mb-1">Accreditation</div>
                      <div className="font-black text-emerald-600 flex items-center gap-1 text-sm truncate">
                        <ShieldCheck className="w-3.5 h-3.5"/> {college.accreditation || 'Recognized'}
                      </div>
                    </div>
                    <div className="bg-background p-4 rounded-2xl border border-border">
                      <div className="text-[10px] font-bold text-text-muted uppercase mb-1">AISHE Code</div>
                      <div className="font-black text-blue-600 text-sm truncate">{college.aisheCode || college.sourceId || 'N/A'}</div>
                    </div>
                  </div>
                </div>

                {/* Popular Courses Preview */}
                <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black text-text-primary flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-blue-500"/> Top Courses
                    </h2>
                    <button onClick={() => setActiveTab('courses')} className="text-sm font-bold text-primary hover:text-primary-hover">View All</button>
                  </div>
                  
                  <div className="grid gap-4">
                    {courses.slice(0, 3).map((course, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-background rounded-2xl border border-border gap-4 hover:border-blue-200 transition-colors">
                        <div>
                          <div className="font-black text-text-primary">{course.branchName || course.courseName || 'Course'}</div>
                          <div className="text-xs font-semibold text-text-muted mt-1 flex items-center gap-3">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {course.duration || 'N/A'}</span>
                            <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3"/> {course.mode || 'Full Time'}</span>
                            <span className="flex items-center gap-1"><Award className="w-3 h-3"/> {course.degreeName || 'Degree'}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <button className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 rounded-xl text-xs font-bold transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                    {courses.length === 0 && (
                      <div className="text-center p-6 bg-background rounded-2xl border border-border border-dashed text-text-muted">
                        No detailed course data available.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm">
                  <h2 className="text-xl font-black text-text-primary mb-6">All Courses ({courses.length})</h2>
                  <div className="space-y-4">
                    {courses.map((course) => {
                      // Find associated fee if any
                      const fee = fees.find(f => f.degree_id === course.courseId);
                      
                      return (
                        <div key={course._id} className="p-5 bg-background rounded-2xl border border-border hover:shadow-md transition-shadow">
                          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-black text-text-primary text-lg">{course.branchName || course.courseName}</h3>
                                <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-bold px-2.5 py-1 rounded border border-blue-200 dark:border-blue-800">
                                  {course.programType || 'UG'}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-text-secondary mb-4">
                                <span className="flex items-center gap-1 bg-card px-2 py-1 rounded-md border border-border"><Award className="w-3.5 h-3.5"/> {course.degreeName}</span>
                                <span className="flex items-center gap-1 bg-card px-2 py-1 rounded-md border border-border"><Clock className="w-3.5 h-3.5"/> {course.duration || 'N/A'}</span>
                                <span className="flex items-center gap-1 bg-card px-2 py-1 rounded-md border border-border"><CheckCircle className="w-3.5 h-3.5"/> {course.mode || 'Full Time'}</span>
                                {course.intake && <span className="flex items-center gap-1 bg-card px-2 py-1 rounded-md border border-border">Intake: {course.intake} Seats</span>}
                              </div>
                              
                              <div className="bg-card p-3 rounded-xl border border-border text-sm">
                                <span className="font-bold text-text-primary">Eligibility:</span> <span className="text-text-secondary">{course.eligibility || 'As per university norms.'}</span>
                              </div>
                            </div>
                            
                            <div className="w-full lg:w-64 shrink-0 bg-blue-50/50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-100 dark:border-blue-900/30 flex flex-col justify-center">
                              <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase mb-1 text-center">First Year Fee</div>
                              <div className="text-2xl font-black text-blue-700 dark:text-blue-300 text-center mb-4">
                                {fee ? `₹${fee.total_fee.toLocaleString('en-IN')}` : 'TBA'}
                              </div>
                              {fee?.fee_type && <div className="text-xs text-center text-blue-600/70 dark:text-blue-400/70 mb-4 font-semibold">{fee.fee_type}</div>}
                              <button className="w-full py-2.5 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-slate-700 rounded-xl font-bold hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors shadow-sm text-sm">
                                Fee Structure Breakdown
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                    {courses.length === 0 && (
                      <div className="text-center p-12 bg-background rounded-2xl border border-border border-dashed text-text-muted">
                        <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-black text-text-primary mb-2">No Courses Found</h3>
                        <p className="text-sm">Course data for this college is currently being updated.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Fallbacks for other tabs */}
            {['admission', 'placements', 'facilities'].includes(activeTab) && (
              <div className="bg-card p-12 rounded-3xl border border-border shadow-sm flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
                <BookOpen className="w-12 h-12 text-blue-200 mb-4" />
                <h3 className="text-xl font-black text-text-primary capitalize mb-2">{activeTab} Information</h3>
                <p className="text-sm text-text-muted max-w-md mx-auto leading-relaxed">
                  Detailed information regarding {activeTab} at {college.name} is currently being verified by our data team and will be updated soon.
                </p>
              </div>
            )}

          </div>
          
          {/* Sidebar Area */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Contact Info Card */}
            <div className="bg-card p-6 rounded-3xl border border-border shadow-sm">
              <h3 className="text-base font-black text-text-primary mb-6 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" /> Contact Details
              </h3>
              
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-text-muted uppercase mb-1">Address</div>
                    <div className="text-sm font-semibold text-text-primary leading-snug">
                      {college.address || `${college.city ? college.city + ', ' : ''}${college.district}\n${college.state} ${college.pincode ? `- ${college.pincode}` : ''}`}
                    </div>
                  </div>
                </li>
                
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold text-text-muted uppercase mb-1">Website</div>
                    {college.officialWebsiteUrl || college.website ? (
                      <a href={college.officialWebsiteUrl || college.website} target="_blank" rel="noopener noreferrer" className="text-sm font-black text-primary hover:underline truncate block">
                        {(college.officialWebsiteUrl || college.website)?.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                      </a>
                    ) : (
                      <div className="text-sm font-semibold text-text-secondary">Not Available</div>
                    )}
                  </div>
                </li>
                
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-text-muted uppercase mb-1">Phone</div>
                    <div className="text-sm font-semibold text-text-primary">
                      {college.phone || 'N/A'}
                    </div>
                  </div>
                </li>
                
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold text-text-muted uppercase mb-1">Email</div>
                    <div className="text-sm font-semibold text-text-primary truncate">
                      {college.email || 'N/A'}
                    </div>
                  </div>
                </li>
              </ul>
              
              {college.latitude && college.longitude && (
                <div className="mt-6 rounded-xl overflow-hidden h-48 relative border border-border shadow-inner">
                  {isMapLoaded ? (
                    <GoogleMap
                      mapContainerStyle={{ width: '100%', height: '100%' }}
                      center={{ lat: college.latitude, lng: college.longitude }}
                      zoom={14}
                      options={{ disableDefaultUI: true, zoomControl: true }}
                    >
                      <Marker position={{ lat: college.latitude, lng: college.longitude }} />
                    </GoogleMap>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-background text-text-muted">
                      <MapPin className="w-6 h-6 animate-pulse" />
                    </div>
                  )}
                </div>
              )}

              <button className="w-full mt-6 py-3 bg-background border border-border text-text-primary font-bold rounded-xl hover:bg-card transition-colors flex items-center justify-center gap-2 text-sm shadow-sm">
                <Share2 className="w-4 h-4" /> Share College
              </button>
            </div>

            {/* AI Advisor CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl shadow-lg text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <h3 className="text-lg font-black mb-2 relative z-10">Have questions about admission?</h3>
              <p className="text-sm text-blue-100 mb-6 font-medium leading-relaxed relative z-10">
                Chat with our AI counselor to know your chances of getting into {college.name} based on your scores.
              </p>
              <button className="w-full py-3 bg-white text-blue-700 font-black rounded-xl hover:bg-blue-50 transition-colors shadow-lg relative z-10">
                Ask AI Counselor
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
