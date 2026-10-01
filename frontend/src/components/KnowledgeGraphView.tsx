import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Network, X, Maximize, ZoomIn, ZoomOut } from 'lucide-react';
import api from '../api/axios';
import ForceGraph2D from 'react-force-graph-2d';

interface Props {
  targetType: string;
  targetId: string;
  onClose: () => void;
}

export default function KnowledgeGraphView({ targetType, targetId, onClose }: Props) {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const graphRef = useRef<any>();

  const loadNodeContext = useCallback(async (type: string, id: string, existingData: any) => {
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
              color: getNodeColor(t)
            });
          }
        };

        const addLink = (sourceId: string, targetId: string, label: string) => {
          const linkId = `${sourceId}-${targetId}`;
          if (!newLinks.find(l => l.id === linkId || (l.source.id === sourceId && l.target.id === targetId))) {
            newLinks.push({
              id: linkId,
              source: sourceId,
              target: targetId,
              name: label
            });
          }
        };

        // Add Core Node
        addNode(node, nodeType);
        const coreNodeId = `${nodeType}_${node._id}`;

        // Add Parents (Prerequisites)
        prerequisites.forEach((p: any) => {
          addNode(p.resolvedNode, p.sourceType || 'Unknown');
          addLink(`${p.sourceType || 'Unknown'}_${p.resolvedNode._id}`, coreNodeId, p.relationType || 'LEADS_TO');
        });

        // Add Children (Downstream)
        downstream.forEach((c: any) => {
          addNode(c.resolvedNode, c.targetType || 'Unknown');
          addLink(coreNodeId, `${c.targetType || 'Unknown'}_${c.resolvedNode._id}`, c.relationType || 'LEADS_TO');
        });

        setGraphData({ nodes: newNodes, links: newLinks });
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load graph nodes.');
    }
  }, [targetType, targetId]);

  useEffect(() => {
    setLoading(true);
    loadNodeContext(targetType, targetId, { nodes: [], links: [] }).then(() => setLoading(false));
  }, [targetType, targetId, loadNodeContext]);

  const handleNodeClick = (node: any) => {
    loadNodeContext(node.type, node.rawId, graphData);
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'Pathway': return '#3b82f6'; // blue-500
      case 'Degree': return '#10b981'; // emerald-500
      case 'College': return '#f97316'; // orange-500
      case 'Career': return '#a855f7'; // purple-500
      case 'Exam': return '#ef4444'; // red-500
      case 'Course': return '#14b8a6'; // teal-500
      default: return '#6b7280'; // gray-500
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-6xl h-[85vh] shadow-2xl overflow-hidden flex flex-col relative">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4 border-b border-gray-100 flex items-center justify-between bg-white/90 backdrop-blur z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Education Knowledge Graph</h2>
              <p className="text-xs font-bold text-slate-500">Interactive: Click on any node to expand its connections</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => graphRef.current?.zoomToFit(400)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors text-slate-600" title="Fit to Screen">
              <Maximize className="w-5 h-5" />
            </button>
            <button onClick={onClose} className="p-2 bg-slate-100 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors text-slate-500">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur shadow-lg rounded-xl p-4 z-10 border border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Node Types</h3>
          <div className="flex flex-col gap-2">
            {['Career', 'Degree', 'Exam', 'Pathway', 'College'].map(type => (
              <div key={type} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getNodeColor(type) }}></div>
                <span className="text-xs font-medium text-slate-700">{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Graph Container */}
        <div className="flex-1 bg-slate-50 relative w-full h-full">
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
              <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
              <p className="text-sm font-bold text-slate-500">Initializing Knowledge Graph...</p>
            </div>
          ) : error ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 z-20">
              <p className="font-bold">{error}</p>
            </div>
          ) : (
            <ForceGraph2D
              ref={graphRef}
              graphData={graphData}
              nodeLabel="name"
              nodeColor="color"
              nodeRelSize={6}
              linkColor={() => '#cbd5e1'}
              linkDirectionalArrowLength={3.5}
              linkDirectionalArrowRelPos={1}
              onNodeClick={handleNodeClick}
              nodeCanvasObject={(node: any, ctx, globalScale) => {
                const label = node.name;
                const fontSize = 12/globalScale;
                ctx.font = `${fontSize}px Sans-Serif`;
                const textWidth = ctx.measureText(label).width;
                const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); 

                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2 + (node.val/2 + 2), bckgDimensions[0], bckgDimensions[1]);
                
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.val/2, 0, 2 * Math.PI, false);
                ctx.fillStyle = node.color;
                ctx.fill();
                
                // Add border if it's the target node
                if(node.val === 30) {
                   ctx.lineWidth = 2 / globalScale;
                   ctx.strokeStyle = '#000';
                   ctx.stroke();
                }

                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#1e293b';
                ctx.fillText(label, node.x, node.y + (node.val/2 + fontSize/2 + 2));
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
