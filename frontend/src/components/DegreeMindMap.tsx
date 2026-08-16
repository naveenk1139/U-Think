import React, { useState, useEffect, useRef } from 'react';

export interface MindMapCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  orbit: number;
  angle: number;
}

export const CATEGORIES: MindMapCategory[] = [
  // Orbit 1 (Inner, 11 items) - spaced beautifully around the hub
  { id: 'pharm', name: 'Pharmacy', icon: '💊', color: '#F43F5E', orbit: 1, angle: 0 },
  { id: 'edu', name: 'Education', icon: '🎓', color: '#A78BFA', orbit: 1, angle: 32.7 },
  { id: 'comp', name: 'Computing & IT', icon: '💻', color: '#38BDF8', orbit: 1, angle: 65.4 },
  { id: 'eng', name: 'Engineering/ BE/ B Tech', icon: '⚙️', color: '#3B82F6', orbit: 1, angle: 98.2 },
  { id: 'com', name: 'Commerce', icon: '💰', color: '#FBBF24', orbit: 1, angle: 130.9 },
  { id: 'arts', name: 'Arts', icon: '🎭', color: '#EC4899', orbit: 1, angle: 163.6 },
  { id: 'law', name: 'Law', icon: '⚖️', color: '#10B981', orbit: 1, angle: 196.4 },
  { id: 'mgmt', name: 'Management', icon: '💼', color: '#F59E0B', orbit: 1, angle: 229.1 },
  { id: 'med', name: 'Medical', icon: '🩺', color: '#3B82F6', orbit: 1, angle: 261.8 },
  { id: 'dent', name: 'Dental', icon: '🦷', color: '#14B8A6', orbit: 1, angle: 294.5 },
  { id: 'vet', name: 'Veterinary', icon: '🐾', color: '#8B5CF6', orbit: 1, angle: 327.3 },

  // Orbit 2 (Outer, 12 items) - interleaved and spaced perfectly at exactly 30 degrees interval
  { id: 'voc', name: 'Vocational courses', icon: '🛠️', color: '#8B5CF6', orbit: 2, angle: 15 },
  { id: 'def', name: 'Defence and Physical Education', icon: '🛡️', color: '#10B981', orbit: 2, angle: 45 },
  { id: 'rel', name: 'Religious and language studies', icon: '📖', color: '#6366F1', orbit: 2, angle: 75 },
  { id: 'bsc', name: 'BSc', icon: '🧪', color: '#10B981', orbit: 2, angle: 105 },
  { id: 'para', name: 'Paramedical', icon: '🏥', color: '#EC4899', orbit: 2, angle: 135 },
  { id: 'anim', name: 'Animation', icon: '🎬', color: '#2563EB', orbit: 2, angle: 165 },
  { id: 'mass', name: 'Mass Communication', icon: '📸', color: '#14B8A6', orbit: 2, angle: 195 },
  { id: 'hm', name: 'Hotel Management', icon: '🏨', color: '#F97316', orbit: 2, angle: 225 },
  { id: 'avia', name: 'Aviation', icon: '✈️', color: '#3B82F6', orbit: 2, angle: 255 },
  { id: 'des', name: 'Design', icon: '🎨', color: '#F97316', orbit: 2, angle: 285 },
  { id: 'arch', name: 'Architecture', icon: '🏛️', color: '#14B8A6', orbit: 2, angle: 315 },
];

interface DegreeMindMapProps {
  activeNode: string | null;
  setActiveNode: (node: string | null) => void;
  searchQuery?: string;
  selectedSector?: string;
  sectorMapping?: Record<string, string[]>;
  degreesDb?: Array<{ id: string; name: string; fullName: string; category: string }>;
  onSelectDegree?: (degree: any) => void;
}

export default function DegreeMindMap({ 
  activeNode, 
  setActiveNode,
  searchQuery,
  selectedSector,
  sectorMapping,
  degreesDb,
  onSelectDegree
}: DegreeMindMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [offsets, setOffsets] = useState<Record<string, { x: number; y: number }>>({});
  const dragStart = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      setDimensions({
        width: containerRef.current?.offsetWidth || 0,
        height: containerRef.current?.offsetHeight || 0
      });
    };
    
    updateDimensions();
    const timer = setTimeout(updateDimensions, 100);
    
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;

  const getRadius = (orbit: number) => {
    // Dynamic, responsive sizing with excellent spacing bounds
    const base = Math.min(dimensions.width, dimensions.height);
    if (base === 0) return orbit === 1 ? 160 : 310;
    
    if (orbit === 1) {
      return Math.max(140, base * 0.22);
    }
    return Math.max(270, base * 0.40);
  };

  const getPosition = (cat: MindMapCategory) => {
    const radius = getRadius(cat.orbit);
    const angleRad = (cat.angle - 90) * (Math.PI / 180); // 0 deg is 12 o'clock

    // Apply smart layout adjustments: push nodes at extreme left/right outwards to make space for labels
    const cosAngle = Math.cos(angleRad);
    const sinAngle = Math.sin(angleRad);
    
    // Nodes on extreme sides (cos values near 1 or -1) get padded further out
    const sideFactor = Math.abs(cosAngle) > 0.7 ? 25 : 0;
    const finalRadius = radius + sideFactor;

    return {
      x: centerX + finalRadius * cosAngle,
      y: centerY + finalRadius * sinAngle
    };
  };

  // Draggable Node logic with Click and Touch integration
  const handleMouseDown = (id: string, e: React.MouseEvent) => {
    // Only track left clicks
    if (e.button !== 0) return;
    
    setDraggedNode(id);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const initialOffsetX = offsets[id]?.x || 0;
    const initialOffsetY = offsets[id]?.y || 0;
    
    let hasMoved = false;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 10) {
        hasMoved = true;
      }

      setOffsets(prev => ({
        ...prev,
        [id]: { x: initialOffsetX + dx, y: initialOffsetY + dy }
      }));
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      
      setDraggedNode(null);
      
      if (!hasMoved) {
        // Toggle active node on click
        setActiveNode(activeNode === id ? null : id);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleTouchStart = (id: string, e: React.TouchEvent) => {
    setDraggedNode(id);
    
    const touch = e.touches[0];
    const startX = touch.clientX;
    const startY = touch.clientY;
    const initialOffsetX = offsets[id]?.x || 0;
    const initialOffsetY = offsets[id]?.y || 0;
    
    let hasMoved = false;

    const onTouchMove = (moveEvent: TouchEvent) => {
      const moveTouch = moveEvent.touches[0];
      const dx = moveTouch.clientX - startX;
      const dy = moveTouch.clientY - startY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 12) {
        hasMoved = true;
      }

      setOffsets(prev => ({
        ...prev,
        [id]: { x: initialOffsetX + dx, y: initialOffsetY + dy }
      }));
    };

    const onTouchEnd = () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      
      setDraggedNode(null);
      
      if (!hasMoved) {
        setActiveNode(activeNode === id ? null : id);
      }
    };

    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
  };

  // Check if a node is matching the current search & sector filters
  const isNodeMatching = (catId: string) => {
    // 1. Sector Check
    if (selectedSector && selectedSector !== 'all') {
      const allowed = sectorMapping?.[selectedSector] || [];
      if (!allowed.includes(catId)) return false;
    }
    
    // 2. Search Query Check
    if (searchQuery) {
      const normQuery = searchQuery.toLowerCase();
      const node = CATEGORIES.find(c => c.id === catId);
      const nameMatch = node ? node.name.toLowerCase().includes(normQuery) : false;
      
      // Also check if any degree in this category matches the search query
      const degreeMatch = degreesDb?.some(d => {
        const normCat = d.category.toLowerCase();
        let matches = normCat.includes(catId.toLowerCase());
        
        // Custom precise mapping
        if (catId === 'eng') matches = normCat.includes('eng') || normCat.includes('tech');
        else if (catId === 'comp') matches = normCat.includes('computer') || normCat.includes('it') || normCat.includes('computing');
        else if (catId === 'bsc') matches = normCat.includes('science') || normCat.includes('bsc') || normCat.includes('natural') || normCat.includes('pure');
        else if (catId === 'pharm') matches = d.name.toLowerCase().includes('pharm') || d.fullName.toLowerCase().includes('pharmacy');
        else if (catId === 'dent') matches = d.name.toLowerCase().includes('bds') || d.fullName.toLowerCase().includes('dental');
        else if (catId === 'vet') matches = d.name.toLowerCase().includes('bvsc') || d.fullName.toLowerCase().includes('veterinary');
        else if (catId === 'para') matches = d.name.toLowerCase().includes('bpt') || d.name.toLowerCase().includes('nursing') || d.fullName.toLowerCase().includes('physiotherapy') || d.fullName.toLowerCase().includes('paramedical');
        
        const textMatch = d.name.toLowerCase().includes(normQuery) || d.fullName.toLowerCase().includes(normQuery);
        return matches && textMatch;
      });

      return nameMatch || degreeMatch;
    }
    
    return true;
  };

  const isFilterActive = (searchQuery && searchQuery !== '') || (selectedSector && selectedSector !== 'all');

  return (
    <div className="w-full h-[780px] bg-[#020617] rounded-[2.5rem] overflow-hidden relative border border-slate-900 shadow-2xl font-sans select-none" ref={containerRef}>
      {/* Background Grid - Exquisite modern layout */}
      <div 
        className="absolute inset-0 opacity-[0.06]"
        style={{ 
          backgroundImage: `
            radial-gradient(circle, rgba(255,255,255,0.15) 1.2px, transparent 1.2px),
            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 40px 40px, 40px 40px',
          backgroundPosition: 'center center'
        }}
      />
      
      {/* Instructions Overlay */}
      <div className="absolute top-6 left-8 z-20">
        <div className="inline-flex items-center px-3 py-1 bg-[#0F172A] text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full mb-3 border border-blue-500/20 shadow-sm">
          Interactive Sandbox
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">Concentric Degrees Mind Map</h2>
        <p className="text-slate-400 text-xs mt-1 max-w-md">Drag any node freely to reorganize your personal learning path. Click to filter.</p>
      </div>
      
      <div className="absolute top-8 right-8 z-20 text-xs text-slate-500 font-medium hidden sm:block">
        Orbiting Nodes: <span className="font-bold text-white">{CATEGORIES.length} Categories</span> <span className="text-slate-700">|</span> <span className="text-blue-400 font-bold">Draggable</span>
      </div>

      {dimensions.width > 0 && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {/* Orbit Rings (2 dashed circles) */}
          {[1, 2].map(orbit => (
            <circle
              key={`orbit-${orbit}`}
              cx={centerX}
              cy={centerY}
              r={getRadius(orbit)}
              fill="none"
              stroke="rgba(255,255,255,0.035)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
            />
          ))}

          {/* Connection Lines with colored lines corresponding to each category */}
          {CATEGORIES.map(cat => {
            const basePos = getPosition(cat);
            const offset = offsets[cat.id] || { x: 0, y: 0 };
            const nodeX = basePos.x + offset.x;
            const nodeY = basePos.y + offset.y;
            const isActive = activeNode === cat.id;
            const matching = isNodeMatching(cat.id);

            return (
              <g key={`connection-${cat.id}`}>
                {/* Glow layer when active */}
                {isActive && (
                  <line
                    x1={centerX}
                    y1={centerY}
                    x2={nodeX}
                    y2={nodeY}
                    stroke={cat.color}
                    strokeWidth="8"
                    opacity="0.35"
                    className="transition-all duration-300"
                    style={{ filter: 'blur(4px)' }}
                  />
                )}
                {/* Core connection line */}
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={nodeX}
                  y2={nodeY}
                  stroke={isActive ? cat.color : cat.color}
                  strokeWidth={isActive ? 3 : 1.2}
                  opacity={isActive ? 0.95 : (isFilterActive ? (matching ? 0.25 : 0.02) : 0.15)}
                  className="transition-all duration-300"
                />
              </g>
            );
          })}
        </svg>
      )}

      {/* Nodes */}
      {dimensions.width > 0 && (
        <div className="absolute inset-0 z-10">
          {CATEGORIES.map(cat => {
            const basePos = getPosition(cat);
            const offset = offsets[cat.id] || { x: 0, y: 0 };
            const nodeX = basePos.x + offset.x;
            const nodeY = basePos.y + offset.y;
            
            const isActive = activeNode === cat.id;
            const isThisDragged = draggedNode === cat.id;
            
            let fadeClass = '';
            if (activeNode !== null) {
              // A node is active! Only highlight the active node, make it GROW, and fade everything else!
              fadeClass = isActive 
                ? 'opacity-100 scale-125 z-30 ring-4 ring-white/10 rounded-full' 
                : 'opacity-20 scale-90 grayscale hover:opacity-80 transition-all duration-300 z-10';
            } else if (isFilterActive) {
              // No active node, but search/sector filter is active
              const matching = isNodeMatching(cat.id);
              fadeClass = matching ? 'opacity-100 scale-105 z-30' : 'opacity-20 scale-90 grayscale hover:opacity-80 transition-all duration-300 z-10';
            } else {
              // Default state: all nodes at normal opacity
              fadeClass = 'opacity-100';
            }
            
            return (
              <div
                key={cat.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-grab transition-all mindmap-node-wrapper ${
                  isThisDragged ? 'cursor-grabbing scale-105 z-40' : 'duration-300'
                } ${fadeClass}`}
                style={{ 
                  left: nodeX, 
                  top: nodeY,
                  touchAction: 'none',
                  '--glow-color-full': cat.color,
                  '--glow-color-half': `${cat.color}88`,
                  '--glow-color-quarter': `${cat.color}33`
                } as React.CSSProperties}
                onMouseDown={(e) => handleMouseDown(cat.id, e)}
                onTouchStart={(e) => handleTouchStart(cat.id, e)}
              >
                <div 
                  className={`
                    mindmap-node-inner select-none group
                    ${isActive ? 'mindmap-node-inner-active' : ''}
                  `}
                >
                  <span className="text-xs">{cat.icon}</span>
                  <span className={`text-[11px] font-extrabold whitespace-nowrap tracking-wide select-none ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-slate-100'}`}>
                    {cat.name}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Central Hub with glowing pulse ring */}
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
            style={{ left: centerX, top: centerY }}
            onClick={() => {
              setActiveNode(null);
              setOffsets({}); // Reset all drags!
            }}
          >
            <div className={`
              w-32 h-32 rounded-full bg-gradient-to-br from-[#1E293B] to-[#0B0F19] flex flex-col items-center justify-center border-2 
              shadow-[0_0_40px_rgba(0,0,0,0.7)] transition-all duration-500 relative group
              ${activeNode ? 'border-indigo-500/50' : 'border-slate-800 hover:border-slate-600'}
            `}>
              <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">🎓</span>
              <span className="text-slate-100 font-black text-[11px] tracking-widest">DEGREE</span>
              <span className="text-slate-500 text-[9px] font-bold tracking-wider mt-0.5">Central Hub</span>
              {Object.keys(offsets).length > 0 && (
                <span className="absolute bottom-2 text-[8px] text-blue-400 font-bold uppercase tracking-wider scale-90 group-hover:scale-100 transition-all">Reset Layout</span>
              )}

              {/* Orbiting blue ring inside the border */}
              <div className="absolute inset-1.5 rounded-full border border-dashed border-indigo-500/20 animate-[spin_40s_linear_infinite]" />
            </div>
            
            {/* Glowing effect behind hub */}
            <div className="absolute inset-0 -z-10 rounded-full bg-indigo-500/10 blur-2xl animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
}
