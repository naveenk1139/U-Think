import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, GraduationCap, Briefcase, Target, BookOpen } from 'lucide-react';
import { PgDegreeList, SuperSpecList, SkillList, CareerList, JobList } from './CareerPathwayComponents';

const API_BASE = '/api/after-10th';

export default function Post10thExplorer() {
  return (
    <div className="p-6 bg-[#F7F9FC] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Post-10th Education Explorer</h1>
        <p className="text-slate-600 mb-6">Discover your paths: 11th/12th, Diploma, ITI and their degrees.</p>
        
        <Routes>
          <Route path="/" element={<PathwayList />} />
          <Route path="/pathway/:pathwayId" element={<StreamList />} />
          <Route path="/stream/:streamId" element={<CombinationList />} />
          <Route path="/combination/:combinationId/degrees" element={<DegreeList />} />
          <Route path="/degree/:degreeId/branches" element={<BranchList />} />
          <Route path="/branch/:branchId/specializations" element={<SpecializationList />} />
          <Route path="/specialization/:specId/pg-degrees" element={<PgDegreeList />} />
          <Route path="/pg-degree/:pgId/super-specializations" element={<SuperSpecList />} />
          <Route path="/super-specialization/:id/skills" element={<SkillList />} />
          <Route path="/skill/:skillName/careers" element={<CareerList />} />
          <Route path="/career/:careerId/jobs" element={<JobList />} />
        </Routes>
      </div>
    </div>
  );
}

function PathwayList() {
  const [pathways, setPathways] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE}/pathways`).then(res => setPathways(res.data));
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pathways.map(p => (
        <div key={p._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mr-4">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">{p.name}</h3>
          </div>
          <button 
            onClick={() => navigate(`/post-10th/pathway/${p._id}`)}
            className="w-full flex items-center justify-center gap-2 py-3 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 rounded-xl font-semibold transition-colors"
          >
            Explore Streams <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

function StreamList() {
  const { pathwayId } = useParams();
  const [streams, setStreams] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE}/pathways/${pathwayId}/streams`).then(res => setStreams(res.data));
  }, [pathwayId]);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center text-sm text-slate-500 mb-6">
        <Link to="/post-10th" className="hover:text-blue-600">Pathways</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span>Streams</span>
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Select a Stream</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {streams.map(s => (
          <button 
            key={s._id}
            onClick={() => navigate(`/post-10th/stream/${s._id}`)}
            className="text-left p-6 rounded-xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-700">{s.name}</h3>
            <p className="text-slate-500 mt-2 text-sm">{s.description || 'Explore subject combinations and eligible degrees.'}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function CombinationList() {
  const { streamId } = useParams();
  const [combinations, setCombinations] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE}/streams/${streamId}/combinations`).then(res => setCombinations(res.data));
  }, [streamId]);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center text-sm text-slate-500 mb-6">
        <button onClick={() => window.history.back()} className="hover:text-blue-600">Back</button>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span>Subject Combinations</span>
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Select Subject Combination</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {combinations.map(c => (
          <div key={c._id} className="p-6 rounded-xl border-2 border-slate-100 flex flex-col">
            <h3 className="text-xl font-bold text-slate-800">{c.name}</h3>
            <div className="mt-3 flex flex-wrap gap-2 mb-6">
              {c.subjects.map((sub: any) => (
                <span key={sub._id} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
                  {sub.name}
                </span>
              ))}
            </div>
            <button 
              onClick={() => navigate(`/post-10th/combination/${c._id}/degrees`)}
              className="mt-auto w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
            >
              View Eligible Degrees <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function DegreeList() {
  const { combinationId } = useParams();
  const [degrees, setDegrees] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE}/combinations/${combinationId}/degrees`).then(res => setDegrees(res.data));
  }, [combinationId]);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center text-sm text-slate-500 mb-6">
        <button onClick={() => window.history.back()} className="hover:text-blue-600">Back</button>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span>Eligible Degrees</span>
      </div>
      
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Target className="w-6 h-6 text-emerald-500" />
        Degrees You Are Eligible For
      </h2>
      
      {degrees.length === 0 ? (
        <p className="text-slate-500">No degrees mapped yet for this combination.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {degrees.map(d => (
            <div key={d._id} className="p-6 rounded-xl border border-emerald-100 bg-emerald-50/30">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-800">{d.name}</h3>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded">
                  {d.duration} {d.duration_unit}
                </span>
              </div>
              
              {d.eligibilityRule && (
                <div className="mt-4 pt-4 border-t border-emerald-100 space-y-2 text-sm text-slate-600">
                  {d.eligibilityRule.minScoreRequired && (
                    <p><strong>Min Score:</strong> {d.eligibilityRule.minScoreRequired}%</p>
                  )}
                  {d.eligibilityRule.entranceExamRequired && (
                    <p className="text-orange-600 font-semibold flex items-center gap-1">
                      <BookOpen className="w-4 h-4" /> Entrance Exam Required
                    </p>
                  )}
                  {d.eligibilityRule.description && (
                    <p className="italic text-slate-500 text-xs mt-2">{d.eligibilityRule.description}</p>
                  )}
                </div>
              )}
              
              <button 
                onClick={() => navigate(`/post-10th/degree/${d._id}/branches`)}
                className="mt-4 w-full flex items-center justify-center gap-2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors"
              >
                Explore Branches <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BranchList() {
  const { degreeId } = useParams();
  const [branches, setBranches] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/undergrad/degrees/${degreeId}/branches`).then(res => setBranches(res.data));
    axios.get(`/api/undergrad/degrees/${degreeId}/exams`).then(res => setExams(res.data));
  }, [degreeId]);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center text-sm text-slate-500 mb-6">
        <button onClick={() => window.history.back()} className="hover:text-blue-600">Back</button>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span>Branches</span>
      </div>
      
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Briefcase className="w-6 h-6 text-indigo-500" />
        Available Branches
      </h2>

      {exams.length > 0 && (
        <div className="mb-8 bg-orange-50 border border-orange-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-orange-800 flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5" />
            Required Entrance & Eligibility Exams
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {exams.map((e, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-orange-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-800">{e.exam?.name || 'Unknown Exam'}</h4>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${e.mandatoryOrOptional === 'Mandatory' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                      {e.mandatoryOrOptional}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{e.exam?.description}</p>
                  <p className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded inline-block">
                    Role: {e.admissionRole}
                  </p>
                </div>
                {e.eligibilityCondition && (
                  <p className="text-xs text-orange-700 mt-3 italic bg-orange-100/50 p-2 rounded">
                    <strong>Note:</strong> {e.eligibilityCondition}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {branches.length === 0 ? (
        <p className="text-slate-500">No branches mapped yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {branches.map(b => (
            <div key={b._id} className="p-6 rounded-xl border border-indigo-100 bg-indigo-50/30 flex flex-col">
              <h3 className="text-lg font-bold text-slate-800">{b.name}</h3>
              <p className="text-sm text-slate-600 mt-2 line-clamp-2">{b.description}</p>
              
              <button 
                onClick={() => navigate(`/post-10th/branch/${b._id}/specializations`)}
                className="mt-4 w-full flex items-center justify-center gap-2 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors mt-auto"
              >
                View Specializations & Colleges <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SpecializationList() {
  const { branchId } = useParams();
  const [specializations, setSpecializations] = useState<any[]>([]);
  const [colleges, setColleges] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/undergrad/branches/${branchId}/specializations`).then(res => setSpecializations(res.data));
    axios.get(`/api/undergrad/branches/${branchId}/colleges`).then(res => setColleges(res.data));
  }, [branchId]);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center text-sm text-slate-500 mb-6">
        <button onClick={() => window.history.back()} className="hover:text-blue-600">Back</button>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span>Specializations & Colleges</span>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-purple-500" />
            Specializations
          </h2>
          {specializations.length === 0 ? (
            <p className="text-slate-500">No specializations found.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {specializations.map(s => (
                <div key={s._id} className="p-4 rounded-xl border border-purple-100 bg-purple-50/30">
                  <h3 className="font-bold text-slate-800">{s.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{s.description}</p>
                  
                  <button 
                    onClick={() => navigate(`/post-10th/specialization/${s._id}/pg-degrees`)}
                    className="mt-3 w-full flex items-center justify-center gap-2 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors text-sm"
                  >
                    View Postgraduate Options <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-500" />
            Top Colleges
          </h2>
          {colleges.length === 0 ? (
            <p className="text-slate-500">No colleges mapped yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {colleges.map((c: any) => (
                <div key={c[0]} className="p-4 rounded-xl border border-blue-100 bg-blue-50/30">
                  <h3 className="font-bold text-slate-800">{c[1].name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{c[1].city}, {c[1].state}</p>
                  
                  {c[1].courseOffered && (
                    <div className="mt-3 pt-3 border-t border-blue-100 text-xs text-slate-500 space-y-1">
                      <p><strong>Fees:</strong> {c[1].courseOffered.fees}</p>
                      <p><strong>Duration:</strong> {c[1].courseOffered.duration}</p>
                      {c[1].courseOffered.entranceExamRequired && (
                        <p className="text-orange-600 font-semibold mt-1">Entrance Exam Required</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
