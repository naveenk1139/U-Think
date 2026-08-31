import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PathwayTreeProps {
  levelSlug?: string | null;
  pathwaySlug?: string | null;
  streamSlug?: string | null;
  comboSlug?: string | null;
  courseSlug?: string | null;
  branchSlug?: string | null;
  levelName?: string;
  pathwayName?: string;
  streamName?: string;
  comboName?: string;
}

const PathwayTree: React.FC<PathwayTreeProps> = ({
  levelSlug, pathwaySlug, streamSlug, comboSlug, courseSlug, branchSlug,
  levelName, pathwayName, streamName, comboName
}) => {
  const navigate = useNavigate();

  const steps = [
    { label: '10th / SSLC', active: true, clickable: false, route: null },
    { label: levelName || 'Education Level', active: !!levelSlug, clickable: !!levelSlug, route: levelSlug ? `/pathways/${levelSlug}` : null },
    { label: pathwayName || 'Pathway', active: !!pathwaySlug, clickable: !!pathwaySlug, route: pathwaySlug ? `/pathways/${levelSlug}/${pathwaySlug}` : null },
    { label: streamName || 'Stream', active: !!streamSlug, clickable: !!streamSlug, route: streamSlug ? `/pathways/${levelSlug}/${pathwaySlug}/${streamSlug}` : null },
    { label: comboName || 'Subject Combination', active: !!comboSlug, clickable: !!comboSlug, route: comboSlug ? `/pathways/${levelSlug}/${pathwaySlug}/${streamSlug}/${comboSlug}` : null },
    { label: 'Course', active: !!courseSlug, clickable: false, route: null },
    { label: 'Specialization', active: !!branchSlug, clickable: false, route: null },
    { label: 'Career / Higher Studies', active: false, clickable: false, route: null },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm mb-8 overflow-x-auto">
      <div className="flex items-center min-w-max space-x-2">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              onClick={() => step.clickable && step.route && navigate(step.route)}
              className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                step.clickable ? 'cursor-pointer hover:bg-blue-50' : ''
              } ${
                step.active
                  ? (index === steps.findIndex(s => !s.active) - 1 || index === steps.length - 1 || (steps.every(s => s.active) && index === steps.length - 1))
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-blue-600 bg-blue-50'
                  : 'text-gray-400 bg-gray-50'
              }`}
            >
              {step.label}
            </div>
            {index < steps.length - 1 && (
              <ChevronRight className={`w-4 h-4 ${step.active ? 'text-blue-400' : 'text-gray-300'}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PathwayTree;
