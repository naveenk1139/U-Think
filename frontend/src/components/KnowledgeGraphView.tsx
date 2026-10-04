import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { Network, X, Maximize, ZoomIn, ZoomOut, Search, Filter, ChevronRight, Info } from 'lucide-react';
import api from '../api/axios';
import ForceGraph2D from 'react-force-graph-2d';

interface Props {
  targetType: string;
  targetId: string;
  matchScore?: number;
  onClose: () => void;
}

const ALL_NODE_TYPES = [
  'Profile', 'Career', 'Career Stage', 'Pathway', 'Stream', 'Course',
  'Degree', 'Specialization', 'Exam', 'College', 'Skill',
  'Skill Gap', 'Certification', 'Project', 'Internship', 'Job', 'Scholarship'
];

export default function KnowledgeGraphView({ targetType, targetId, matchScore, onClose }: Props) {
  const [graphData, setGraphData] = useState<{nodes: any[], links: any[]}>({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const graphRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadNodeContext = useCallback(async (type: string, id: string, existingData: any, isInitial = false) => {
    try {
      const res = await api.get(`/api/education-paths/node/${type}/${id}`);
      if (res.data.success) {
        const { node, nodeType, prerequisites, downstream } = res.data;
        
        let newNodes = [...existingData.nodes];
        let newLinks = [...existingData.links];

        const addNode = (n: any, t: string) => {
          if (!n || !n._id) return;
          const nodeId = `${t}_${n._id}`;
          if (!newNodes.find(existing => existing.id === nodeId)) {
            newNodes.push({
              id: nodeId,
              name: n.name || n.title || 'Unknown',
              type: t,
              rawId: n._id,
              val: t === targetType && n._id === targetId ? 30 : 15,
              color: getNodeColor(t),
              data: n // Keep raw data for sidebar
            });
          }
        };

        const addLink = (sourceId: string, targetId: string, label: string) => {
          const linkId = `${sourceId}-${targetId}`;
          if (!newLinks.find(l => l.id === linkId || (l.source.id === sourceId && l.target.id === targetId) || (l.source === sourceId && l.target === targetId))) {
            newLinks.push({
              id: linkId,
              source: sourceId,
              target: targetId,
              name: label,
              color: '#cbd5e1'
            });
          }
        };

        // Add Core Node
        addNode(node, nodeType);
        const coreNodeId = `${nodeType}_${node._id}`;
        
        if (isInitial) {
           const initialNode = newNodes.find(n => n.id === coreNodeId);
           if (initialNode) setSelectedNode(initialNode);
        }

        // Add Parents (Prerequisites)
        prerequisites.forEach((p: any) => {
          addNode(p.resolvedNode, p.sourceType || 'Unknown');
          addLink(`${p.sourceType || 'Unknown'}_${p.resolvedNode._id}`, coreNodeId, p.relationType || 'REQUIRES');
        });

        // Add Children (Downstream)
        downstream.forEach((c: any) => {
          addNode(c.resolvedNode, c.targetType || 'Unknown');
          addLink(coreNodeId, `${c.targetType || 'Unknown'}_${c.resolvedNode._id}`, c.relationType || 'LEADS_TO');
        });

        setGraphData({ nodes: newNodes, links: newLinks });
        
        // Fit to screen after short delay
        setTimeout(() => {
           graphRef.current?.zoomToFit(600, 50);
        }, 100);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load graph nodes.');
    }
  }, [targetType, targetId]);

  useEffect(() => {
    setLoading(true);
    loadNodeContext(targetType, targetId, { nodes: [], links: [] }, true).then(() => setLoading(false));
  }, [targetType, targetId, loadNodeContext]);

  // Adjust forces on load
  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.d3Force('charge').strength(-400); // Repel nodes more
      graphRef.current.d3Force('link').distance(80); // Longer links
    }
  }, [graphData]);

  const handleNodeClick = (node: any) => {
    setSelectedNode(node);
    loadNodeContext(node.type, node.rawId, graphData);
    
    // Center on clicked node
    if (graphRef.current) {
      graphRef.current.centerAt(node.x, node.y, 600);
      graphRef.current.zoom(1.5, 600);
    }
  };

  const getNodeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Career': '#a855f7', // purple
      'Career Stage': '#c084fc',
      'Degree': '#10b981', // emerald
      'Course': '#14b8a6', // teal
      'Exam': '#ef4444', // red
      'Pathway': '#3b82f6', // blue
      'Stream': '#0ea5e9', // sky
      'College': '#f97316', // orange
      'Skill': '#0d9488', // teal-dark
      'Skill Gap': '#eab308', // yellow
      'Certification': '#eab308', // yellow
      'Project': '#4f46e5', // indigo
      'Internship': '#ec4899', // pink
      'Job': '#475569', // slate
      'Scholarship': '#fbbf24', // gold
      'Profile': '#6366f1', // indigo
    };
    return colors[type] || '#94a3b8';
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Filter and search logic
  const filteredGraphData = useMemo(() => {
    let nodes = graphData.nodes;
    let links = graphData.links;

    if (activeFilter !== 'All') {
       nodes = nodes.filter(n => n.type === activeFilter || n.val === 30); // keep root
    }

    if (searchQuery.trim()) {
       const q = searchQuery.toLowerCase();
       nodes = nodes.filter(n => n.name.toLowerCase().includes(q) || n.val === 30);
    }

    // Only keep links where both source and target exist
    const nodeIds = new Set(nodes.map(n => n.id));
    links = links.filter(l => {
       const sid = typeof l.source === 'object' ? l.source.id : l.source;
       const tid = typeof l.target === 'object' ? l.target.id : l.target;
       return nodeIds.has(sid) && nodeIds.has(tid);
    });

    return { nodes, links };
  }, [graphData, activeFilter, searchQuery]);

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        ref={containerRef}
        className={`bg-white shadow-2xl overflow-hidden flex flex-col relative ${isFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-7xl h-[90vh] rounded-2xl'}`}
      >
        {/* Header */}
        <div className="flex-none p-4 border-b border-gray-100 flex items-center justify-between bg-white z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Education Knowledge Graph</h2>
              <p className="text-xs font-bold text-slate-500">Interactive: Click on any node to expand its connections</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search nodes..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-48"
              />
            </div>
            
            <select 
              value={activeFilter}
              onChange={e => setActiveFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none"
            >
              <option value="All">All Types</option>
              {ALL_NODE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <div className="flex items-center gap-1 border-l border-slate-200 pl-4">
              <button onClick={() => graphRef.current?.zoom(graphRef.current.zoom() * 1.2, 400)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600" title="Zoom In">
                <ZoomIn className="w-4 h-4" />
              </button>
              <button onClick={() => graphRef.current?.zoom(graphRef.current.zoom() / 1.2, 400)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600" title="Zoom Out">
                <ZoomOut className="w-4 h-4" />
              </button>
              <button onClick={() => graphRef.current?.zoomToFit(400, 50)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600" title="Fit to Screen">
                <Maximize className="w-4 h-4" />
              </button>
              <button onClick={toggleFullscreen} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600" title="Fullscreen">
                <Network className="w-4 h-4" />
              </button>
              <button onClick={onClose} className="p-2 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-lg transition-colors ml-2" title="Close">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* Graph Container */}
          <div className="flex-1 bg-slate-50 relative">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                <p className="text-sm font-bold text-slate-500">Initializing Personalized Graph...</p>
              </div>
            ) : error ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 z-20">
                <p className="font-bold">{error}</p>
              </div>
            ) : filteredGraphData.nodes.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 z-20">
                <Info className="w-8 h-8 mb-2 opacity-50" />
                <p className="font-bold">No verified education pathway data is available for this recommendation yet.</p>
              </div>
            ) : (
              <ForceGraph2D
                ref={graphRef}
                graphData={filteredGraphData}
                nodeRelSize={6}
                linkColor={(link: any) => link.color || '#cbd5e1'}
                linkDirectionalArrowLength={4}
                linkDirectionalArrowRelPos={1}
                linkWidth={1.5}
                onNodeClick={handleNodeClick}
                
                // Draw relationship labels on edges
                linkCanvasObjectMode={() => 'after'}
                linkCanvasObject={(link: any, ctx, globalScale) => {
                  if (!link.name) return;
                  const MAX_FONT_SIZE = 4;
                  const LABEL_NODE_MARGIN = graphRef.current?.zoom() * 1.5;
                  
                  const start = link.source;
                  const end = link.target;
                  if (typeof start !== 'object' || typeof end !== 'object') return;
                  
                  const textPos = Object.assign({}, ...['x', 'y'].map(c => ({
                    [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
                  })));
                  
                  const relLink = { x: end.x - start.x, y: end.y - start.y };
                  let textAngle = Math.atan2(relLink.y, relLink.x);
                  if (textAngle > Math.PI / 2) textAngle = -(Math.PI - textAngle);
                  if (textAngle < -Math.PI / 2) textAngle = -(-Math.PI - textAngle);
                  
                  const fontSize = 10 / globalScale;
                  ctx.font = `${fontSize}px Sans-Serif`;
                  
                  ctx.save();
                  ctx.translate(textPos.x, textPos.y);
                  ctx.rotate(textAngle);
                  
                  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                  const padding = 2 / globalScale;
                  const textWidth = ctx.measureText(link.name).width;
                  ctx.fillRect(-textWidth / 2 - padding, -fontSize / 2 - padding, textWidth + padding * 2, fontSize + padding * 2);
                  
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  ctx.fillStyle = '#64748b';
                  ctx.fillText(link.name, 0, 0);
                  ctx.restore();
                }}

                // Custom node rendering to prevent huge label overlaps
                nodeCanvasObject={(node: any, ctx, globalScale) => {
                  const label = node.name.length > 20 ? node.name.substring(0, 17) + '...' : node.name;
                  const fontSize = 12/globalScale;
                  ctx.font = `${fontSize}px Sans-Serif`;
                  const textWidth = ctx.measureText(label).width;
                  const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); 

                  // Draw node circle
                  ctx.beginPath();
                  ctx.arc(node.x, node.y, node.val/2, 0, 2 * Math.PI, false);
                  ctx.fillStyle = node.color;
                  ctx.fill();
                  
                  // Highlight if selected
                  if(selectedNode && selectedNode.id === node.id) {
                     ctx.lineWidth = 3 / globalScale;
                     ctx.strokeStyle = '#3b82f6';
                     ctx.stroke();
                  } else if(node.val === 30) {
                     // Highlight root node
                     ctx.lineWidth = 2 / globalScale;
                     ctx.strokeStyle = '#000';
                     ctx.stroke();
                  }

                  // Draw label background
                  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                  ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y + (node.val/2 + 2), bckgDimensions[0], bckgDimensions[1]);
                  
                  // Draw label text
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  ctx.fillStyle = '#1e293b';
                  ctx.fillText(label, node.x, node.y + (node.val/2 + fontSize/2 + 2));
                  
                  // If it's the root node, draw match score
                  if(node.val === 30 && matchScore) {
                     const scoreText = `${matchScore}% Match`;
                     const scoreWidth = ctx.measureText(scoreText).width;
                     ctx.fillStyle = '#10b981';
                     ctx.fillText(scoreText, node.x, node.y - (node.val/2 + fontSize/2 + 2));
                  }
                }}
              />
            )}

            {/* Legend Overlay */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur shadow-lg rounded-xl p-4 z-10 border border-slate-100 max-h-64 overflow-y-auto custom-scrollbar">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Node Types</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {ALL_NODE_TYPES.map(type => {
                  const isActive = graphData.nodes.some(n => n.type === type);
                  if (!isActive && activeFilter === 'All') return null; // Only show active types in legend unless filtered
                  
                  return (
                    <div key={type} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: getNodeColor(type) }}></div>
                      <span className="text-[10px] font-medium text-slate-700 whitespace-nowrap">{type}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Details Panel */}
          {selectedNode && (
            <div className="w-80 bg-white border-l border-slate-100 shadow-xl flex flex-col z-20 transition-all duration-300 transform translate-x-0">
              <div className="p-4 border-b border-slate-100 flex items-start justify-between bg-slate-50">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold text-white mb-2" style={{ backgroundColor: selectedNode.color }}>
                    {selectedNode.type}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">{selectedNode.name}</h3>
                  {selectedNode.val === 30 && matchScore && (
                     <div className="text-sm font-bold text-emerald-600 mt-1">{matchScore}% Match</div>
                  )}
                </div>
                <button onClick={() => setSelectedNode(null)} className="p-1 hover:bg-slate-200 rounded text-slate-400">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-4 flex-1 overflow-y-auto">
                <div className="space-y-4">
                  {selectedNode.data?.description && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase mb-1">Description</h4>
                      <p className="text-sm text-slate-700 leading-relaxed">{selectedNode.data.description}</p>
                    </div>
                  )}
                  
                  {selectedNode.type === 'Career' && selectedNode.data?.skills && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase mb-1">Required Skills</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedNode.data.skills.map((s: string, i: number) => (
                           <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] rounded font-medium">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedNode.type === 'Degree' && selectedNode.data?.eligibility && (
                    <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                      <h4 className="text-xs font-bold text-orange-800 uppercase mb-2">Eligibility</h4>
                      {selectedNode.data.eligibility.minimum_marks && (
                         <p className="text-xs text-orange-900 mb-1"><span className="font-bold">Marks:</span> {selectedNode.data.eligibility.minimum_marks}</p>
                      )}
                      {selectedNode.data.eligibility.required_subjects?.length > 0 && (
                         <p className="text-xs text-orange-900"><span className="font-bold">Subjects:</span> {selectedNode.data.eligibility.required_subjects.join(', ')}</p>
                      )}
                    </div>
                  )}
                  
                  {selectedNode.type === 'Degree' && selectedNode.data?.career_options && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase mb-1">Career Opportunities</h4>
                      <ul className="text-sm text-slate-700 list-disc pl-4 space-y-1">
                        {selectedNode.data.career_options.map((c: string, i: number) => (
                           <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedNode.data?.duration && (
                     <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
                        <span className="text-xs font-bold text-slate-500 uppercase">Duration</span>
                        <span className="text-sm text-slate-800">{selectedNode.data.duration} {selectedNode.data.duration_unit || ''}</span>
                     </div>
                  )}

                  {selectedNode.data?.exam_mode && (
                     <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-1">Exam Mode</h4>
                        <div className="flex gap-2">
                           {selectedNode.data.exam_mode.map((m: string, i: number) => <span key={i} className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded border border-red-100">{m}</span>)}
                        </div>
                     </div>
                  )}

                  {selectedNode.type === 'Job' && selectedNode.data?.responsibilities && (
                     <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-1">Responsibilities</h4>
                        <ul className="text-sm text-slate-700 list-disc pl-4 space-y-1">
                           {selectedNode.data.responsibilities.map((r: string, i: number) => <li key={i}>{r}</li>)}
                        </ul>
                     </div>
                  )}

                  {selectedNode.type === 'Course' && selectedNode.data?.subjects && (
                     <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-1">Key Subjects</h4>
                        <div className="flex flex-wrap gap-1">
                           {selectedNode.data.subjects.map((s: string, i: number) => <span key={i} className="px-2 py-1 bg-teal-50 text-teal-700 text-[10px] rounded border border-teal-100">{s}</span>)}
                        </div>
                     </div>
                  )}

                  {!selectedNode.data?.description && !selectedNode.data?.skills && !selectedNode.data?.eligibility && !selectedNode.data?.career_options && !selectedNode.data?.duration && !selectedNode.data?.responsibilities && !selectedNode.data?.subjects && (
                     <div className="text-sm text-slate-500 italic text-center py-8">
                       Detailed information is not available for this node yet.
                     </div>
                  )}
                  
                  <div className="pt-4 border-t border-slate-100">
                    <button 
                      onClick={() => {
                        graphRef.current?.centerAt(selectedNode.x, selectedNode.y, 1000);
                        graphRef.current?.zoom(2, 1000);
                      }}
                      className="w-full py-2 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-colors"
                    >
                      Focus Node
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
