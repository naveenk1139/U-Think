import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAfter10thTree, After10thPathwayData } from '../../api/after10thApi';
import { ArrowLeft, Check, X, ShieldCheck } from 'lucide-react';

const PathwayCompare: React.FC = () => {
  const [pathways, setPathways] = useState<After10thPathwayData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const data = await getAfter10thTree();
        // Filter out 'apprenticeship' for main comparison if desired, but we'll show all
        setPathways(data);
      } catch (error) {
        console.error('Failed to load map data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTree();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20 min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B3B94]"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen font-sans pb-20">
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 pt-8">
        
        <button 
          onClick={() => navigate('/pathways/after-10th')}
          className="flex items-center gap-2 text-gray-500 hover:text-[#2B3B94] font-bold text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to After 10th Map
        </button>

        <div className="bg-white border border-gray-200 rounded-[24px] p-8 md:p-10 shadow-sm mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Compare Pathways After 10th</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Analyze the differences between 11th/12th, Diploma, ITI, and other tracks to make an informed decision for your future.
          </p>
        </div>

        <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-5 font-bold text-gray-500 uppercase tracking-wider text-sm w-48">Feature</th>
                  {pathways.map(p => (
                    <th key={p._id} className="p-5 border-l border-gray-200 text-center">
                      <div className="text-sm font-black text-[#2B3B94]">{p.name}</div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{p.type}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50/50">
                  <td className="p-5 font-semibold text-gray-700">Eligibility</td>
                  {pathways.map(p => (
                    <td key={p._id} className="p-5 border-l border-gray-100 text-sm text-gray-600 text-center">
                      {p.eligibility || <span className="text-gray-400 italic">Not verified</span>}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="p-5 font-semibold text-gray-700">Duration</td>
                  {pathways.map(p => (
                    <td key={p._id} className="p-5 border-l border-gray-100 text-sm font-bold text-gray-900 text-center">
                      {p.duration || <span className="text-gray-400 italic">Not verified</span>}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="p-5 font-semibold text-gray-700">Orientation</td>
                  {pathways.map(p => (
                    <td key={p._id} className="p-5 border-l border-gray-100 text-sm text-gray-600 text-center">
                      {p.type === 'Academic' ? 'Theoretical & Foundation' : 
                       p.type === 'Technical' ? 'Practical & Engineering Base' : 
                       p.type === 'Trade' ? 'Highly Practical Skill-based' : 
                       'Job-specific Practical'}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="p-5 font-semibold text-gray-700">Primary Goal</td>
                  {pathways.map(p => (
                    <td key={p._id} className="p-5 border-l border-gray-100 text-sm text-gray-600 text-center">
                      {p.type === 'Academic' ? 'Higher Education (Degrees)' : 
                       p.type === 'Technical' ? 'Junior Engg. Job or B.Tech' : 
                       p.type === 'Trade' ? 'Direct Industrial Employment' : 
                       'Direct Employment'}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="p-5 font-semibold text-gray-700">Categories / Streams</td>
                  {pathways.map(p => (
                    <td key={p._id} className="p-5 border-l border-gray-100 text-center align-top">
                      <div className="flex flex-wrap justify-center gap-1">
                        {p.categories?.slice(0, 4).map(c => (
                          <span key={c._id} className="bg-blue-50 text-blue-700 text-[10px] px-2 py-0.5 rounded font-medium border border-blue-100 whitespace-nowrap">
                            {c.name}
                          </span>
                        ))}
                        {p.categories && p.categories.length > 4 && (
                          <span className="text-[10px] font-bold text-gray-400">+{p.categories.length - 4}</span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-gray-50/50 bg-emerald-50/30">
                  <td className="p-5 font-bold text-emerald-800">Verification Status</td>
                  {pathways.map(p => (
                    <td key={p._id} className="p-5 border-l border-gray-100 text-center">
                      {p.status === 'active' ? (
                        <div className="flex items-center justify-center gap-1 text-emerald-600 font-bold text-xs">
                          <ShieldCheck className="w-4 h-4" /> Verified
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">Unverified</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PathwayCompare;
