import React from 'react';
import { CheckCircle2, ArrowRight, CircleDot } from 'lucide-react';

interface RoadmapStep {
  id: string;
  title: string;
  type: string;
  description: string;
}

interface RoadmapVisualizerProps {
  steps: RoadmapStep[];
}

export default function RoadmapVisualizer({ steps }: RoadmapVisualizerProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
      <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
        <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
          <CircleDot className="w-5 h-5" />
        </div> 
        Career Pathway Roadmap
      </h3>
      
      <div className="relative border-l-2 border-dashed border-gray-200 ml-4 space-y-8 pb-4">
        {steps.map((step, idx) => (
          <div key={step.id} className="relative pl-8">
            {/* Timeline Node */}
            <div className="absolute -left-[11px] top-1">
              {idx === steps.length - 1 ? (
                <div className="w-5 h-5 rounded-full bg-emerald-500 border-4 border-white shadow-sm flex items-center justify-center">
                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-[#2B3B94] border-4 border-white shadow-sm flex items-center justify-center">
                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              )}
            </div>

            {/* Content Box */}
            <div className={`bg-gray-50 border border-gray-100 p-5 rounded-xl transition-all hover:shadow-md hover:border-gray-200 ${idx === steps.length - 1 ? 'bg-emerald-50/50 border-emerald-100' : ''}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md ${
                  step.type === 'Foundation' ? 'bg-gray-200 text-gray-700' :
                  step.type === 'Eligibility' ? 'bg-blue-100 text-blue-700' :
                  step.type === 'Exam' ? 'bg-orange-100 text-orange-700' :
                  step.type === 'Degree' ? 'bg-purple-100 text-purple-700' :
                  'bg-emerald-100 text-emerald-700'
                }`}>
                  {step.type}
                </span>
                <h4 className="font-bold text-gray-900">{step.title}</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
            
            {/* Arrow connecting next except last */}
            {idx < steps.length - 1 && (
               <div className="absolute left-8 -bottom-6 flex items-center text-gray-300">
                  <ArrowRight className="w-4 h-4 rotate-90" />
               </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
