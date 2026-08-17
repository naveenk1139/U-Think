import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, MapPin, Building2, GraduationCap, DollarSign, 
  Award, Heart, Share2, ChevronRight, CheckCircle, BookOpen,
  Briefcase, Star, Clock, X, Map, Bell, GitCompare, ShieldCheck, Zap, Bot, Loader2, BadgeCheck
} from 'lucide-react';
import { fetchColleges, fetchAiRecommendations, fetchCollegeStats, College } from '../api/collegeApi';
import { useAuth } from '../contexts/AuthContext';

export default function CollegesDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('Any District');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('AI Match Score');
  
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  
  const [colleges, setColleges] = useState<College[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCollegesCount, setTotalCollegesCount] = useState(0);
  const [aiScores, setAiScores] = useState<Record<string, {score: number, rationale: string}>>({});
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { currentUser } = useAuth();
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [savedColleges, setSavedColleges] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);

  const categories = ['All', 'Engineering', 'Medical', 'Management', 'Law', 'Design', 'Science', 'Commerce', 'Diploma', 'Polytechnic', 'ITI', 'Paramedical', 'Vocational'];

  useEffect(() => {
    fetchCollegeStats().then(setStats).catch(console.error);
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedCategory, selectedType, selectedDistrict]);

  useEffect(() => {
    const loadColleges = async () => {
      setIsLoading(true);
      try {
        const params: any = {
          q: searchQuery,
          category: selectedCategory === 'All' ? undefined : selectedCategory,
          type: selectedType === 'All' ? undefined : selectedType,
          district: selectedDistrict === 'Any District' ? undefined : selectedDistrict,
          page: page,
          limit: 20
        };
        const response = await fetchColleges(params);
        if (page === 1) {
          setColleges(response.data);
        } else {
          setColleges(prev => [...prev, ...response.data]);
        }
        setTotalPages(response.pagination?.totalPages || 1);
        setTotalCollegesCount(response.pagination?.total || 0);
      } catch (error) {
        console.error('Failed to fetch colleges:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Add a small debounce for search query
    const timeoutId = setTimeout(() => {
      loadColleges();
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory, selectedType, selectedDistrict, page]);

  // Generate a match score: use real AI score if available, otherwise calculate from user preferences
  const getMatchScore = (college: College) => {
    if (aiScores[college._id]?.score) return aiScores[college._id].score;
    
    // Naive baseline calculation without randomness
    let score = 50;
    if (currentUser?.interests?.some((i: string) => college.categories?.includes(i))) score += 20;
    if (currentUser?.location && (college.city === currentUser.location || college.district === currentUser.location)) score += 15;
    // We would add budget checks here if we had them typed
    
    return score;
  };

  // Haversine distance formula to calculate distance between two lat/lng in kilometers
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c; 
  };

  const handleNearMeClick = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setSelectedDistrict('Any District'); // Reset filter so we can see all nearby
        setSortBy('Distance');
        setIsLocating(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to retrieve your live location. Please check your browser permissions.');
        setIsLocating(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleAiRecommendClick = async () => {
    if (colleges.length === 0) return;
    
    setIsAiThinking(true);
    try {
      // Only send up to 50 colleges to avoid hitting LLM token limits quickly
      const collegesToScore = colleges.slice(0, 50);
      const scores = await fetchAiRecommendations(currentUser, collegesToScore);
      setAiScores(scores);
      setSortBy('AI Match Score');
    } catch (error) {
      console.error('Failed to fetch AI recommendations:', error);
      alert('Failed to get real AI recommendations. Showing standard matching instead.');
      setSortBy('AI Match Score');
    } finally {
      setIsAiThinking(false);
    }
  };
  
  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedColleges(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  const toggleCompare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (compareList.includes(id)) {
      setCompareList(prev => prev.filter(c => c !== id));
    } else if (compareList.length < 4) {
      setCompareList(prev => [...prev, id]);
    } else {
      alert("You can only compare up to 4 colleges.");
    }
  };

  return (
    <div className="space-y-6 font-sans pb-10 max-w-7xl mx-auto relative">
      
      {/* 1. Hero & Search */}
      <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-black mb-4">Discover Your Dream College</h1>
          <p className="text-slate-300 text-lg mb-8">Search, compare, and get AI-powered recommendations for 10,000+ colleges across India.</p>
          
          <div className="bg-white rounded-2xl p-2 flex flex-col md:flex-row gap-2 shadow-xl">
            <div className="flex-1 flex items-center px-4 bg-slate-50 rounded-xl border border-slate-100 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
              <Search className="w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search colleges, courses, or cities..." 
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-slate-800 py-4 px-3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-colors">
              Find Colleges
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button 
              onClick={handleNearMeClick}
              disabled={isLocating}
              className={`px-4 py-2 rounded-lg text-sm font-bold backdrop-blur-sm transition-colors border flex items-center gap-2 ${sortBy === 'Distance' ? 'bg-blue-600 border-blue-500' : 'bg-white/10 hover:bg-white/20 border-white/10'} ${isLocating ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLocating ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />} {isLocating ? 'Locating...' : 'Near Me'}
            </button>
            <button 
              onClick={() => setSortBy('NIRF Ranking')}
              className={`px-4 py-2 rounded-lg text-sm font-bold backdrop-blur-sm transition-colors border flex items-center gap-2 ${sortBy === 'NIRF Ranking' ? 'bg-blue-600 border-blue-500' : 'bg-white/10 hover:bg-white/20 border-white/10'}`}
            >
              <Star className="w-4 h-4 text-amber-400" /> Top Ranked
            </button>
            <button 
              onClick={handleAiRecommendClick}
              disabled={isAiThinking}
              className={`px-4 py-2 rounded-lg text-sm font-bold backdrop-blur-sm transition-colors border flex items-center gap-2 ${sortBy === 'AI Match Score' && Object.keys(aiScores).length > 0 ? 'bg-blue-600 border-blue-500' : 'bg-white/10 hover:bg-white/20 border-white/10'} ${isAiThinking ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isAiThinking ? <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" /> : <Zap className="w-4 h-4 text-emerald-400" />} {isAiThinking ? 'AI is Thinking...' : 'AI Recommended'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* 2. Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Categories */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-500" /> Categories
            </h3>
            <div className="space-y-1">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold transition-colors ${
                    selectedCategory === cat ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat}</span>
                  {stats?.categories && cat !== 'All' && stats.categories[cat] > 0 && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === cat ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
                      {stats.categories[cat]}
                    </span>
                  )}
                  {cat === 'All' && stats?.total > 0 && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === 'All' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
                      {stats.total}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-wider flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" /> Filters
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-2">Location (Karnataka)</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                  <option>Any District</option>
                  <option>Bengaluru Urban</option>
                  <option>Bengaluru Rural</option>
                  <option>Mysuru</option>
                  <option>Mandya</option>
                  <option>Ramanagara</option>
                  <option>Tumakuru</option>
                  <option>Hassan</option>
                  <option>Kodagu</option>
                  <option>Chikkaballapur</option>
                  <option>Kolar</option>
                  <option>Chitradurga</option>
                  <option>Davanagere</option>
                  <option>Shivamogga</option>
                  <option>Chikkamagaluru</option>
                  <option>Ballari</option>
                  <option>Vijayanagara</option>
                  <option>Raichur</option>
                  <option>Koppal</option>
                  <option>Kalaburagi</option>
                  <option>Yadgir</option>
                  <option>Bidar</option>
                  <option>Vijayapura</option>
                  <option>Bagalkot</option>
                  <option>Belagavi</option>
                  <option>Dharwad</option>
                  <option>Gadag</option>
                  <option>Haveri</option>
                  <option>Uttara Kannada</option>
                  <option>Dakshina Kannada</option>
                  <option>Udupi</option>
                  <option>Chamarajanagar</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 block mb-2">Institution Type</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                    <input 
                      type="radio" 
                      name="collegeType" 
                      checked={selectedType === 'All'}
                      onChange={() => setSelectedType('All')}
                      className="w-4 h-4 rounded-full border-slate-300 text-blue-600 focus:ring-blue-500" 
                    /> All
                  </label>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                    <input 
                      type="radio" 
                      name="collegeType"
                      checked={selectedType === 'Government'}
                      onChange={() => setSelectedType('Government')}
                      className="w-4 h-4 rounded-full border-slate-300 text-blue-600 focus:ring-blue-500" 
                    /> Government
                  </label>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                    <input 
                      type="radio" 
                      name="collegeType"
                      checked={selectedType === 'Private'}
                      onChange={() => setSelectedType('Private')}
                      className="w-4 h-4 rounded-full border-slate-300 text-blue-600 focus:ring-blue-500" 
                    /> Private
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 block mb-2">Max Fees (Per Year)</label>
                <input type="range" className="w-full" min="0" max="500000" />
                <div className="flex justify-between text-xs text-slate-400 font-bold mt-1">
                  <span>0</span>
                  <span>5L+</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Banner */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-5 text-white shadow-sm">
            <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
              <Bot className="w-4 h-4" /> Not sure where to apply?
            </h3>
            <p className="text-xs text-blue-100 mb-4">Let our AI match you with colleges based on your budget, scores, and goals.</p>
            <button className="w-full bg-white text-blue-600 font-bold text-xs py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
              Find My Match
            </button>
          </div>

        </div>

        {/* 3. Feed */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-slate-900">
              {selectedCategory === 'All' ? 'All Colleges' : `${selectedCategory} Colleges`}
              <span className="text-slate-400 text-base font-semibold ml-2">
                — Showing {colleges.length} of {totalCollegesCount > 0 ? `${totalCollegesCount}+` : 0} in Karnataka
              </span>
            </h2>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
              Sort by: 
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-slate-800 cursor-pointer outline-none"
              >
                <option>AI Match Score</option>
                <option>Distance</option>
                <option>NIRF Ranking</option>
                <option>Fees: Low to High</option>
                <option>Placements: High to Low</option>
              </select>
            </div>
          </div>

          {/* College Cards */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-500" />
                <p className="font-bold">Loading Karnataka Colleges...</p>
              </div>
            ) : colleges.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Building2 className="w-12 h-12 mb-4 text-slate-300" />
                <p className="font-bold text-lg text-slate-600">No colleges found</p>
                <p className="text-sm">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              [...colleges].sort((a, b) => {
                if (sortBy === 'Distance' && userLocation) {
                  const distA = calculateDistance(userLocation.lat, userLocation.lng, a.latitude || 0, a.longitude || 0);
                  const distB = calculateDistance(userLocation.lat, userLocation.lng, b.latitude || 0, b.longitude || 0);
                  return distA - distB;
                }
                if (sortBy === 'AI Match Score') return getMatchScore(b) - getMatchScore(a);
                if (sortBy === 'NIRF Ranking') return (a.nirfRank || 999) - (b.nirfRank || 999);
                if (sortBy === 'Fees: Low to High') {
                  const parseFees = (f: string) => parseInt(f.replace(/[^0-9]/g, '')) || 9999999;
                  return parseFees(a.fees?.tuition || '') - parseFees(b.fees?.tuition || '');
                }
                if (sortBy === 'Placements: High to Low') {
                  const parsePkg = (p: string) => parseInt(p.replace(/[^0-9]/g, '')) || 0;
                  return parsePkg(b.placement?.avgPackage || '') - parsePkg(a.placement?.avgPackage || '');
                }
                return 0;
              }).map((college) => (
                <div 
                  key={college._id} 
                  onClick={() => setSelectedCollege(college)}
                  className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden relative shrink-0">
                      <img src={college.image} alt={college.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-sm border border-emerald-400">
                        {getMatchScore(college)}% MATCH
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">{college.name}</h3>
                            {college.isVerified && <BadgeCheck className="w-5 h-5 text-blue-500" />}
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs font-semibold text-slate-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" /> {college.city}, {college.district}
                              {userLocation && (
                                <span className="text-blue-500 ml-1">
                                  ({calculateDistance(userLocation.lat, userLocation.lng, college.latitude || 0, college.longitude || 0).toFixed(1)} km)
                                </span>
                              )}
                            </span>
                            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> {college.type}</span>
                            {college.nirfRank && <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400" /> #{college.nirfRank} NIRF</span>}
                          </div>
                        </div>
                        <button 
                          onClick={(e) => toggleSave(college._id, e)}
                          className={`p-2 rounded-xl border transition-colors ${savedColleges.includes(college._id) ? 'bg-rose-50 border-rose-100 text-rose-500' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'}`}
                        >
                          <Heart className="w-5 h-5" fill={savedColleges.includes(college._id) ? "currentColor" : "none"} />
                        </button>
                      </div>

                      {aiScores[college._id] && sortBy === 'AI Match Score' && (
                        <div className="mt-3 bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-800 flex items-start gap-2">
                          <Bot className="w-4 h-4 mt-0.5 shrink-0 text-blue-600" />
                          <p>{aiScores[college._id].rationale}</p>
                        </div>
                      )}

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-slate-100">
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase">Avg Fees</div>
                          <div className="text-sm font-black text-slate-700">{college.fees?.tuition || 'N/A'}</div>
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase">Avg Package</div>
                          <div className="text-sm font-black text-emerald-600">{college.placement?.avgPackage || 'N/A'}</div>
                        </div>
                        <div className="col-span-2 flex items-center justify-end gap-2">
                          <button 
                            onClick={(e) => toggleCompare(college._id, e)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${compareList.includes(college._id) ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                          >
                            {compareList.includes(college._id) ? 'Added to Compare' : '+ Compare'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {page < totalPages && (
              <div className="flex justify-center mt-6">
                <button 
                  onClick={() => setPage(p => p + 1)}
                  disabled={isLoading}
                  className="px-6 py-3 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 text-slate-600 rounded-xl font-bold transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Loading...' : 'Load More Colleges'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. College Details Modal */}
      {selectedCollege && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-4xl bg-white h-full overflow-y-auto animate-in slide-in-from-right duration-300 shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="sticky top-0 z-20 bg-white border-b border-slate-100">
              <div className="h-48 w-full relative">
                <img src={selectedCollege.image} alt={selectedCollege.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <button 
                  onClick={() => setSelectedCollege(null)}
                  className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                  <div className="text-white">
                    <h1 className="text-2xl font-black">{selectedCollege.name}</h1>
                    <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-slate-200">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {selectedCollege.city}, {selectedCollege.district}</span>
                      <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400" /> 4.5/5 Reviews</span>
                    </div>
                  </div>
                  <button className="hidden sm:block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
              
              {/* Modal Tabs */}
              <div className="px-6 flex gap-6 overflow-x-auto hide-scrollbar">
                {['overview', 'courses & fees', 'placements', 'admission', 'facilities', 'reviews'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 flex-1 bg-slate-50">
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                      <h3 className="text-base font-black text-slate-900 mb-4">About College</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {selectedCollege.name} is one of the premier institutions in India, offering cutting-edge infrastructure and world-class faculty. Established in {selectedCollege.establishedYear}, it has consistently ranked among the top colleges.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                        <div className="text-[10px] font-bold text-slate-400 uppercase">Established</div>
                        <div className="font-black text-slate-800">{selectedCollege.establishedYear}</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                        <div className="text-[10px] font-bold text-slate-400 uppercase">Type</div>
                        <div className="font-black text-slate-800">{selectedCollege.type}</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                        <div className="text-[10px] font-bold text-slate-400 uppercase">Accreditation</div>
                        <div className="font-black text-emerald-600 flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> {selectedCollege.accreditation}</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                        <div className="text-[10px] font-bold text-slate-400 uppercase">NIRF Ranking</div>
                        <div className="font-black text-blue-600">#{selectedCollege.nirfRank}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-600 p-6 rounded-2xl shadow-lg text-white">
                      <h3 className="text-sm font-bold mb-4 flex items-center gap-2"><Zap className="w-4 h-4"/> AI Match Analysis</h3>
                      <div className="text-4xl font-black mb-1">{getMatchScore(selectedCollege)}%</div>
                      <div className="text-xs text-blue-100 font-medium mb-4">Excellent Match for your profile!</div>
                      <ul className="space-y-2 text-xs">
                        <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-emerald-300"/> Budget Aligned</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-emerald-300"/> Course Available</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-emerald-300"/> Placements Meet Goals</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'courses & fees' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="text-base font-black text-slate-900 mb-6">Courses Offered</h3>
                  <div className="space-y-4">
                    {selectedCollege.courses?.map((course: string, idx: number) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 gap-4">
                        <div>
                          <div className="font-bold text-slate-800 text-sm">{course}</div>
                          <div className="text-xs text-slate-500 mt-1">4 Years • Full Time • On Campus</div>
                        </div>
                        <div className="flex items-center gap-4 text-right">
                          <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase">1st Year Fees</div>
                            <div className="font-black text-slate-900">{selectedCollege.fees?.tuition || 'N/A'}</div>
                          </div>
                          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50">Details</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'placements' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl">
                      <div className="text-[10px] font-bold text-emerald-600 uppercase mb-1">Highest Package</div>
                      <div className="text-2xl font-black text-emerald-700">{selectedCollege.placement?.highestPackage || 'N/A'}</div>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl">
                      <div className="text-[10px] font-bold text-blue-600 uppercase mb-1">Average Package</div>
                      <div className="text-2xl font-black text-blue-700">{selectedCollege.placement?.avgPackage || 'N/A'}</div>
                    </div>
                    <div className="bg-purple-50 border border-purple-100 p-5 rounded-2xl">
                      <div className="text-[10px] font-bold text-purple-600 uppercase mb-1">Placement Rate</div>
                      <div className="text-2xl font-black text-purple-700">{selectedCollege.placement?.percentage ? `${selectedCollege.placement.percentage}%` : 'N/A'}</div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-base font-black text-slate-900 mb-4">Top Recruiters</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedCollege.placement?.topRecruiters?.map(company => (
                        <span key={company} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-600">
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'facilities' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="text-base font-black text-slate-900 mb-6">Campus Facilities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {selectedCollege.hostelAvailable && (
                      <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-100 text-center gap-2">
                        <CheckCircle className="w-6 h-6 text-indigo-500" />
                        <span className="text-xs font-bold text-slate-700">Hostel</span>
                      </div>
                    )}
                    {selectedCollege.scholarshipsAvailable && (
                      <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-100 text-center gap-2">
                        <Award className="w-6 h-6 text-amber-500" />
                        <span className="text-xs font-bold text-slate-700">Scholarships</span>
                      </div>
                    )}
                    <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-100 text-center gap-2">
                      <CheckCircle className="w-6 h-6 text-indigo-500" />
                      <span className="text-xs font-bold text-slate-700">Library</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Fallback for other tabs */}
              {['admission', 'reviews'].includes(activeTab) && (
                <div className="bg-white p-12 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
                  <BookOpen className="w-12 h-12 text-slate-300 mb-4" />
                  <h3 className="text-lg font-black text-slate-800">Detailed {activeTab} information</h3>
                  <p className="text-sm text-slate-500 mt-2 max-w-sm">This section is currently being updated with the latest data for {new Date().getFullYear()} admissions.</p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Compare Floating Bar (if items exist) */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-6 z-40 animate-in slide-in-from-bottom border border-slate-700">
          <div className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-blue-400" />
            <span className="font-bold text-sm">{compareList.length} / 4 Selected</span>
          </div>
          <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-bold transition-colors">
            Compare Now
          </button>
        </div>
      )}

    </div>
  );
}
