import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { 
  Search, ChevronRight, BookOpen, Brain, Briefcase, 
  GraduationCap, Settings, Wrench, PlusSquare, Palette, 
  Users, Factory, Award, CheckCircle, ArrowRight, 
  ArrowLeft
} from 'lucide-react';

interface Pathway {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

interface Stream {
  _id: string;
  name: string;
  slug: string;
  pathwayId: string;
}

interface Course {
  _id: string;
  name: string;
  slug: string;
  type?: string;
  streamId?: string;
  parentId?: string;
  duration?: string;
  eligibility?: string;
  subjects?: string[];
  careers?: string[];
}

const PATHWAY_ICONS: Record<string, any> = {
  'puc': GraduationCap,
  'diploma': Settings,
  'iti': Wrench,
  'paramedical': PlusSquare,
  'vocational': Palette,
  'apprenticeship': Users,
  'industry-training': Factory,
  'certificate': Award,
  'undergraduate': BookOpen,
  'postgraduate': Brain
};

export default function PathwaysExplorer() {
  const navigate = useNavigate();
  
  const [pathways, setPathways] = useState<Pathway[]>([]);
  const [currentOptions, setCurrentOptions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selection history represents the path taken
  const [selectedPathway, setSelectedPathway] = useState<Pathway | null>(null);
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const [coursePath, setCoursePath] = useState<Course[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [isLeaf, setIsLeaf] = useState(false);
  const [nodeType, setNodeType] = useState('Pathway');
  const [currentNode, setCurrentNode] = useState<any>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const pRes = await api.get('/api/pathways');
      const data = pRes.data?.data || pRes.data || [];
      setPathways(data);
      setCurrentOptions(data);
      setNodeType('Pathway');
    } catch (err) {
      console.error('Failed to load pathways', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (option: any) => {
    setLoading(true);
    setSearchQuery('');
    try {
      if (!selectedPathway) {
        setSelectedPathway(option);
        setCurrentNode(option);
        const res = await api.get(`/api/streams?pathwayId=${option._id}`);
        const data = res.data?.data || [];
        setCurrentOptions(data);
        setNodeType('Stream / Category');
        setIsLeaf(data.length === 0);
      } else if (!selectedStream) {
        setSelectedStream(option);
        setCurrentNode(option);
        const res = await api.get(`/api/courses?streamId=${option._id}&parentId=null`);
        const data = res.data?.data || [];
        setCurrentOptions(data);
        setNodeType('Course');
        setIsLeaf(data.length === 0);
      } else {
        const newPath = [...coursePath, option];
        setCoursePath(newPath);
        setCurrentNode(option);
        const res = await api.get(`/api/courses?parentId=${option._id}`);
        const data = res.data?.data || [];
        setCurrentOptions(data);
        setIsLeaf(data.length === 0);
        if (data.length > 0) {
          setNodeType(data[0].type || 'Specialization');
        }
      }
    } catch (err) {
      console.error('Failed to load next options', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = async () => {
    setSearchQuery('');
    setLoading(true);
    try {
      if (coursePath.length > 0) {
        const newPath = coursePath.slice(0, -1);
        setCoursePath(newPath);
        setIsLeaf(false);
        if (newPath.length > 0) {
          const lastCourse = newPath[newPath.length - 1];
          setCurrentNode(lastCourse);
          const res = await api.get(`/api/courses?parentId=${lastCourse._id}`);
          const data = res.data?.data || [];
          setCurrentOptions(data);
          setNodeType(data[0]?.type || 'Specialization');
        } else {
          setCurrentNode(selectedStream);
          const res = await api.get(`/api/courses?streamId=${selectedStream?._id}&parentId=null`);
          const data = res.data?.data || [];
          setCurrentOptions(data);
          setNodeType('Course');
        }
      } else if (selectedStream) {
        setSelectedStream(null);
        setCurrentNode(selectedPathway);
        setIsLeaf(false);
        const res = await api.get(`/api/streams?pathwayId=${selectedPathway?._id}`);
        const data = res.data?.data || [];
        setCurrentOptions(data);
        setNodeType('Stream / Category');
      } else if (selectedPathway) {
        setSelectedPathway(null);
        setCurrentNode(null);
        setIsLeaf(false);
        setCurrentOptions(pathways);
        setNodeType('Pathway');
      }
    } catch (err) {
      console.error('Failed to navigate back', err);
    } finally {
      setLoading(false);
    }
  };

  const jumpToStep = async (level: number) => {
    if (level === 0) {
      setSelectedPathway(null);
      setSelectedStream(null);
      setCoursePath([]);
      setCurrentNode(null);
      setIsLeaf(false);
      setCurrentOptions(pathways);
      setNodeType('Pathway');
    } else if (level === 1 && selectedPathway) {
      setSelectedStream(null);
      setCoursePath([]);
      setIsLeaf(false);
      setCurrentNode(selectedPathway);
      const res = await api.get(`/api/streams?pathwayId=${selectedPathway._id}`);
      const data = res.data?.data || [];
      setCurrentOptions(data);
      setNodeType('Stream / Category');
    } else if (level === 2 && selectedStream) {
      setCoursePath([]);
      setIsLeaf(false);
      setCurrentNode(selectedStream);
      const res = await api.get(`/api/courses?streamId=${selectedStream._id}&parentId=null`);
      const data = res.data?.data || [];
      setCurrentOptions(data);
      setNodeType('Course');
    } else if (level > 2 && coursePath.length >= level - 2) {
      const newPath = coursePath.slice(0, level - 2);
      setCoursePath(newPath);
      setIsLeaf(false);
      const lastCourse = newPath[newPath.length - 1];
      setCurrentNode(lastCourse);
      const res = await api.get(`/api/courses?parentId=${lastCourse._id}`);
      const data = res.data?.data || [];
      setCurrentOptions(data);
      setNodeType(data[0]?.type || 'Specialization');
    }
  };

  // Filtered options based on search query
  const filteredOptions = searchQuery 
    ? currentOptions.filter(o => 
        o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (o.subjects && o.subjects.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase())))
      )
    : currentOptions;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'All Pathways', level: 0 },
    ...(selectedPathway ? [{ label: selectedPathway.name, level: 1 }] : []),
    ...(selectedStream ? [{ label: selectedStream.name, level: 2 }] : []),
    ...coursePath.map((c, i) => ({ label: c.name, level: 3 + i }))
  ];

  return (
    <div className="text-slate-900 font-sans pb-24">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white rounded-3xl shadow-xl relative overflow-hidden mb-8 w-full p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">
          Education Pathways <span className="text-yellow-400">Explorer</span>
        </h1>
        <p className="text-blue-100 max-w-2xl">
          Navigate through our hierarchical database of educational pathways, streams, courses, combinations, and specializations.
        </p>
      </div>

      {/* Dynamic Breadcrumbs & Progress */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8 flex flex-wrap items-center gap-2">
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            <button 
              onClick={() => jumpToStep(crumb.level)}
              className={`text-sm font-bold px-3 py-1.5 rounded-lg transition-colors ${
                idx === breadcrumbs.length - 1 && !isLeaf
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {crumb.label}
            </button>
            {idx < breadcrumbs.length - 1 && <ChevronRight className="w-4 h-4 text-slate-300" />}
          </React.Fragment>
        ))}
        {isLeaf && (
          <>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className="text-sm font-bold px-3 py-1.5 rounded-lg bg-green-100 text-green-700">
              Details
            </span>
          </>
        )}
      </div>

      {/* Main Content Area */}
      {!isLeaf ? (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Choose {nodeType}</h2>
              <p className="text-slate-500 text-sm">
                Select an option below to proceed to the next step.
              </p>
            </div>
            {selectedPathway && (
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder={`Search ${nodeType}s...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm transition-all"
                  />
                </div>
              </div>
            )}
          </div>

          {filteredOptions.length === 0 ? (
            <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border-2 border-dashed border-slate-200">
              <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-slate-700 mb-1">No options found</h3>
              <p className="text-sm">Database is being updated for this pathway.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredOptions.map(opt => {
                const Icon = PATHWAY_ICONS[opt.slug] || BookOpen;
                return (
                  <button 
                    key={opt._id}
                    onClick={() => handleSelect(opt)}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col text-left group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">{opt.name}</h3>
                    
                    {opt.type && (
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 block">
                        {opt.type}
                      </span>
                    )}

                    {opt.optionCount !== undefined && opt.optionCount > 0 && (
                      <div className="text-xs font-bold inline-flex items-center px-2.5 py-1 rounded-full w-max mb-2 bg-blue-50 text-blue-700">
                        {opt.optionCount} option{opt.optionCount !== 1 ? 's' : ''}
                      </div>
                    )}

                    {opt.duration && (
                      <p className="text-sm text-slate-600 mb-1"><span className="font-semibold">Duration:</span> {opt.duration}</p>
                    )}
                    {opt.eligibility && (
                      <p className="text-sm text-slate-600 mb-2"><span className="font-semibold">Eligibility:</span> {opt.eligibility}</p>
                    )}
                    
                    {opt.subjects && opt.subjects.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <p className="text-xs font-semibold text-slate-500 mb-1">Key Subjects:</p>
                        <p className="text-sm text-slate-700 line-clamp-2">
                          {opt.subjects.join(', ')}
                        </p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* STEP: COURSE DETAILS FULL VIEW */
        <div className="animate-in slide-in-from-right-8 fade-in">
          <button 
            onClick={handleBack}
            className="mb-6 flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {currentNode && (
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 sm:p-12 text-white">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                  {currentNode.type || 'Course Details'}
                </span>
                <h1 className="text-3xl md:text-5xl font-black mb-4">{currentNode.name}</h1>
                <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-300">
                  {currentNode.duration && <span>⏱️ Duration: {currentNode.duration}</span>}
                  {currentNode.eligibility && <span>🎓 Eligibility: {currentNode.eligibility}</span>}
                </div>
              </div>
              
              <div className="p-8 sm:p-12 space-y-12">
                {currentNode.subjects && currentNode.subjects.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" /> Core Subjects
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {currentNode.subjects.map((sub: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="font-semibold text-slate-700">{sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Additional details sections can go here */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600" /> Career Opportunities
                  </h3>
                  <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
                    <p className="text-slate-600">
                      More career data and institution availability will be loaded dynamically for {currentNode.name}.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
