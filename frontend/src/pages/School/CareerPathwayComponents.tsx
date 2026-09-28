import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, ArrowRight, BookOpen, Star, Briefcase, Zap, Building } from 'lucide-react';

const API = '/api/career-pathway';

export function PgDegreeList() {
  const { specId } = useParams();
  const [degrees, setDegrees] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/specializations/${specId}/pg-degrees`).then(res => setDegrees(res.data));
  }, [specId]);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center text-sm text-slate-500 mb-6">
        <button onClick={() => window.history.back()} className="hover:text-blue-600">Back</button>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span>Postgraduate Degrees</span>
      </div>
      
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-indigo-500" />
        Postgraduate Options
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {degrees.map(d => (
          <div key={d._id} className="p-6 rounded-xl border border-indigo-100 bg-indigo-50/30">
            <h3 className="text-lg font-bold text-slate-800">{d.name}</h3>
            <span className="inline-block mt-2 bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded">
              {d.duration} {d.duration_unit}
            </span>
            <button 
              onClick={() => navigate(`/post-10th/pg-degree/${d._id}/super-specializations`)}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors"
            >
              Explore Super Specializations <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SuperSpecList() {
  const { pgId } = useParams();
  const [data, setData] = useState({ superSpecs: [], research: [] });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/pg-degrees/${pgId}/super-specializations`).then(res => setData(res.data));
  }, [pgId]);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center text-sm text-slate-500 mb-6">
        <button onClick={() => window.history.back()} className="hover:text-blue-600">Back</button>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span>Super Specialization / Research</span>
      </div>
      
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Star className="w-6 h-6 text-purple-500" />
        Super Specialization & Research
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {[...data.superSpecs, ...data.research].map((item: any) => (
          <div key={item._id} className="p-6 rounded-xl border border-purple-100 bg-purple-50/30">
            <h3 className="text-lg font-bold text-slate-800">{item.name}</h3>
            <p className="text-sm text-slate-600 mt-2">{item.description}</p>
            <button 
              onClick={() => navigate(`/post-10th/super-specialization/${item._id}/skills`)}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors"
            >
              Discover Required Skills <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkillList() {
  const { id } = useParams();
  const [skills, setSkills] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/super-specializations/${id}/skills`).then(res => setSkills(res.data));
  }, [id]);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center text-sm text-slate-500 mb-6">
        <button onClick={() => window.history.back()} className="hover:text-blue-600">Back</button>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span>Skills</span>
      </div>
      
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Zap className="w-6 h-6 text-yellow-500" />
        Core Skills Acquired
      </h2>
      
      <div className="flex flex-wrap gap-4">
        {skills.map(s => (
          <button 
            key={s._id}
            onClick={() => navigate(`/post-10th/skill/${s.name}/careers`)}
            className="px-6 py-4 rounded-xl border-2 border-yellow-200 bg-yellow-50 hover:bg-yellow-100 hover:border-yellow-400 text-yellow-800 font-bold transition-all"
          >
            {s.name}
          </button>
        ))}
      </div>
      <p className="mt-6 text-sm text-slate-500 italic">Click on a skill to discover career paths.</p>
    </div>
  );
}

export function CareerList() {
  const { skillName } = useParams();
  const [careers, setCareers] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/skills/${skillName}/careers`).then(res => setCareers(res.data));
  }, [skillName]);

  const handleSaveRoadmap = async (careerId: string, careerName: string) => {
    try {
      const res = await axios.post('/api/student-roadmap/generate', { careerId });
      alert(`Roadmap for ${careerName} generated successfully!`);
      navigate('/my-roadmap');
    } catch (err) {
      alert('Failed to generate roadmap. Please try again.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center text-sm text-slate-500 mb-6">
        <button onClick={() => window.history.back()} className="hover:text-blue-600">Back</button>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span>Careers</span>
      </div>
      
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Briefcase className="w-6 h-6 text-emerald-500" />
        Career Paths using "{skillName}"
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {careers.map(c => (
          <div key={c._id} className="p-6 rounded-xl border border-emerald-100 bg-emerald-50/30">
            <h3 className="text-xl font-bold text-slate-800">{c.name}</h3>
            <p className="text-sm text-slate-600 mt-2 line-clamp-2">{c.description}</p>
            <p className="mt-3 text-emerald-700 font-bold bg-emerald-100 px-3 py-1 rounded inline-block text-sm">
              Salary: {c.salaryRange}
            </p>
            <div className="mt-4 flex gap-2">
              <button 
                onClick={() => navigate(`/post-10th/career/${c._id}/jobs`)}
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors"
              >
                View Jobs <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleSaveRoadmap(c._id, c.name)}
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-white border border-emerald-600 hover:bg-emerald-50 text-emerald-700 rounded-xl font-semibold transition-colors"
              >
                Save Roadmap
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function JobList() {
  const { careerId } = useParams();
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${API}/careers/${careerId}/jobs`).then(res => setJobs(res.data));
  }, [careerId]);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center text-sm text-slate-500 mb-6">
        <button onClick={() => window.history.back()} className="hover:text-blue-600">Back</button>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span>Active Jobs</span>
      </div>
      
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Building className="w-6 h-6 text-blue-500" />
        Active Job Openings
      </h2>
      
      <div className="flex flex-col gap-4">
        {jobs.map(j => (
          <div key={j._id} className="p-6 rounded-xl border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h3 className="text-lg font-bold text-blue-900">{j.title}</h3>
              <p className="text-slate-600 text-sm mt-1">{j.company} • {j.location}</p>
              <div className="flex gap-2 mt-2">
                <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-semibold">{j.experienceLevel}</span>
                <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-semibold">{j.workMode}</span>
              </div>
            </div>
            
            <a href={j.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
              Apply on {j.source}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
