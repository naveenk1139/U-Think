import React, { useState, useEffect } from 'react';
import { GitMerge, ArrowRight, Loader2, BookOpen, GraduationCap, Briefcase } from 'lucide-react';
import api from '../../api/axios';

interface GraphNode {
  _id: string;
  name: string;
  slug?: string;
}

interface Edge {
  relationType: string;
  minScoreRequired?: number;
  resolvedNode: GraphNode;
}

interface NodeDetails {
  node: GraphNode;
  nodeType: string;
  prerequisites: Edge[];
  downstream: Edge[];
}

export default function DependencyEngine() {
  const [currentNodeType, setCurrentNodeType] = useState('Pathway');
  // Hardcoded ID of 12th/PUC for demonstration since we lack a true visual graph entry point in this snippet
  const [currentNodeId, setCurrentNodeId] = useState(''); 
  const [nodeDetails, setNodeDetails] = useState<NodeDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Fetch a root node on load (e.g. 10th / SSLC pathway)
  useEffect(() => {
    const fetchRoot = async () => {
      try {
        // Just fetch the catalog to get the 10th Grade ID
        const res = await api.get('/api/education-catalog');
        if (Array.isArray(res.data) && res.data.length > 0) {
          // Response is an array of EducationLevels, each with a pathways array
          const firstLevel = res.data[0];
          if (firstLevel.pathways && firstLevel.pathways.length > 0) {
            const firstPathway = firstLevel.pathways[0];
            setCurrentNodeId(firstPathway._id);
            setCurrentNodeType('Pathway');
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchRoot();
  }, []);

  useEffect(() => {
    if (!currentNodeId) return;

    const fetchNodeDetails = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(`/api/education-paths/node/${currentNodeType}/${currentNodeId}`);
        if (res.data.success) {
          setNodeDetails(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNodeDetails();
  }, [currentNodeId, currentNodeType]);

  const handleNodeClick = (type: string, id: string) => {
    setCurrentNodeType(type);
    setCurrentNodeId(id);
  };

  if (initialLoading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in font-sans">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-indigo-100 p-3 rounded-2xl">
          <GitMerge className="w-8 h-8 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Education Path Dependency Engine</h1>
          <p className="text-slate-500 font-medium">Explore how one education decision enables future pathways.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Prerequisites (Looking Back) */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Required Prerequisites</h2>
          {isLoading ? (
             <div className="h-32 bg-slate-50 animate-pulse rounded-2xl"></div>
          ) : nodeDetails?.prerequisites.length === 0 ? (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
              <p className="text-slate-500 text-sm">No specific prerequisites found.</p>
            </div>
          ) : (
            nodeDetails?.prerequisites.map((edge, idx) => (
              <div 
                key={idx} 
                onClick={() => handleNodeClick(edge.resolvedNode.name ? edge.resolvedNode.name /* Should pass type but fallback */ : 'Unknown', edge.resolvedNode._id)}
                className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:border-indigo-400 transition-colors flex items-center justify-between group"
              >
                <div>
                  <span className="text-[10px] font-black uppercase text-indigo-500 bg-indigo-50 px-2 py-1 rounded">
                    {edge.relationType}
                  </span>
                  <h3 className="font-bold text-slate-900 mt-2">{edge.resolvedNode?.name}</h3>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transform rotate-180" />
              </div>
            ))
          )}
        </div>

        {/* Current Node (Center) */}
        <div className="lg:col-span-1 flex flex-col items-center justify-center min-h-[200px]">
           {isLoading ? (
             <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
           ) : nodeDetails ? (
             <div className="bg-indigo-600 p-8 rounded-3xl shadow-xl shadow-indigo-200 text-center w-full transform scale-105 z-10 border-4 border-white">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {nodeDetails.nodeType === 'Stream' ? <BookOpen className="w-8 h-8 text-white" /> : 
                   nodeDetails.nodeType === 'Degree' ? <GraduationCap className="w-8 h-8 text-white" /> : 
                   <Briefcase className="w-8 h-8 text-white" />}
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-indigo-200 block mb-1">Current Node: {nodeDetails.nodeType}</span>
                <h2 className="text-2xl font-black text-white">{nodeDetails.node.name}</h2>
             </div>
           ) : (
             <div className="text-center p-6 border-2 border-dashed border-slate-300 rounded-3xl bg-slate-50 w-full">
               <p className="text-slate-500 font-bold">No path data available.</p>
               <p className="text-xs text-slate-400 mt-2">The graph database might be empty.</p>
             </div>
           )}
        </div>

        {/* Downstream (Looking Forward) */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Enables / Leads To</h2>
          {isLoading ? (
             <div className="h-32 bg-slate-50 animate-pulse rounded-2xl"></div>
          ) : nodeDetails?.downstream.length === 0 ? (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
              <p className="text-slate-500 text-sm">End of simulated path or missing data.</p>
            </div>
          ) : (
            nodeDetails?.downstream.map((edge, idx) => (
              <div 
                key={idx} 
                onClick={() => handleNodeClick(edge.resolvedNode.name ? edge.resolvedNode.name /* Needs proper type resolution in reality */ : 'Unknown', edge.resolvedNode._id)}
                className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:border-emerald-400 transition-colors flex items-center justify-between group"
              >
                <div>
                  <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                    {edge.relationType}
                  </span>
                  <h3 className="font-bold text-slate-900 mt-2">{edge.resolvedNode?.name}</h3>
                  {edge.minScoreRequired && <p className="text-xs text-slate-500 mt-1">Min {edge.minScoreRequired}% required</p>}
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500" />
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
