import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ChevronRight, BookOpen, Layers, Layout, Target, ArrowRight } from 'lucide-react';

const API_BASE = '/api/school';

export default function SchoolExplorer() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">School Education Explorer</h1>
        <p className="text-slate-600 mb-6">Explore syllabus, subjects, and topics from Class 1 to 10.</p>
        
        <Routes>
          <Route path="/" element={<BoardClassSelector />} />
          <Route path="/board/:boardId/class/:classId" element={<SyllabusList />} />
          <Route path="/syllabus/:syllabusId" element={<SyllabusHierarchy />} />
        </Routes>
      </div>
    </div>
  );
}

function BoardClassSelector() {
  const [boards, setBoards] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE}/boards`).then(res => setBoards(res.data));
    axios.get(`${API_BASE}/classes`).then(res => setClasses(res.data));
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold mb-4 flex items-center"><Layout className="w-5 h-5 mr-2" /> Select Board</h2>
        <div className="space-y-3">
          {boards.map(board => (
            <div key={board._id} className="p-4 rounded-lg border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
              <h3 className="font-semibold text-slate-800">{board.name}</h3>
              <p className="text-sm text-slate-500">{board.type} Board</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold mb-4 flex items-center"><Layers className="w-5 h-5 mr-2" /> Select Class</h2>
        <div className="grid grid-cols-2 gap-3">
          {classes.map(cls => (
            <button 
              key={cls._id}
              onClick={() => {
                if(boards.length > 0) {
                  navigate(`/school/board/${boards[0]._id}/class/${cls._id}`);
                }
              }}
              className="p-3 text-left rounded-lg border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors font-medium text-slate-700"
            >
              {cls.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SyllabusList() {
  const { boardId, classId } = useParams();
  const [syllabi, setSyllabi] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE}/syllabus?boardId=${boardId}&classId=${classId}`)
      .then(res => setSyllabi(res.data));
  }, [boardId, classId]);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center text-sm text-slate-500 mb-6">
        <Link to="/school" className="hover:text-indigo-600">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span>Subjects</span>
      </div>
      <h2 className="text-2xl font-bold mb-6">Select Subject</h2>
      
      {syllabi.length === 0 ? (
        <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-lg">No syllabus found for this selection.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {syllabi.map(syllabus => (
            <button 
              key={syllabus._id}
              onClick={() => navigate(`/school/syllabus/${syllabus._id}`)}
              className="p-6 rounded-xl border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all text-left bg-gradient-to-br from-white to-slate-50"
            >
              <BookOpen className="w-8 h-8 text-indigo-500 mb-3" />
              <h3 className="text-xl font-bold text-slate-800">{syllabus.subjectId.name}</h3>
              <p className="text-sm text-slate-500 mt-2">View complete curriculum</p>
            </button>
          ))}
        </div>
      )}

      {/* Bridge to Post-10th */}
      <div className="mt-12 pt-8 border-t border-slate-200 bg-gradient-to-r from-indigo-50 to-purple-50 -mx-6 -mb-6 p-6 rounded-b-xl flex flex-col md:flex-row items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Ready for the next step?</h3>
          <p className="text-slate-600 mt-1">Explore what comes after 10th Grade: PUC, Diplomas, and ITI.</p>
        </div>
        <button 
          onClick={() => navigate('/post-10th')}
          className="mt-4 md:mt-0 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow flex items-center transition-all"
        >
          Explore Post-10th Pathways <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
}

function SyllabusHierarchy() {
  const { syllabusId } = useParams();
  const [units, setUnits] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${API_BASE}/syllabus/${syllabusId}/hierarchy`)
      .then(res => setUnits(res.data));
  }, [syllabusId]);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center text-sm text-slate-500 mb-6">
        <button onClick={() => window.history.back()} className="hover:text-indigo-600">Back</button>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span>Curriculum</span>
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
      
      <div className="space-y-6">
        {units.map((unit, uIdx) => (
          <div key={unit._id} className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 font-bold text-slate-800">
              Unit {uIdx + 1}: {unit.name}
            </div>
            <div className="p-4 space-y-4">
              {unit.chapters.map((chapter: any, cIdx: number) => (
                <div key={chapter._id} className="pl-4 border-l-2 border-indigo-100">
                  <h4 className="font-semibold text-slate-700 mb-2">Chapter {cIdx + 1}: {chapter.name}</h4>
                  <div className="space-y-2 pl-4">
                    {chapter.topics.map((topic: any) => (
                      <div key={topic._id} className="text-sm text-slate-600 flex items-start">
                        <Target className="w-4 h-4 mr-2 text-indigo-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium">{topic.name}</span>
                          {topic.learningOutcomes?.length > 0 && (
                            <ul className="list-disc pl-5 mt-1 text-xs text-slate-500">
                              {topic.learningOutcomes.map((lo: string, i: number) => <li key={i}>{lo}</li>)}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
