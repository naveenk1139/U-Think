import React, { useState, useEffect } from 'react';
import { Map, Navigation, Loader2, Target, AlertTriangle } from 'lucide-react';
import RoadmapVisualizer from '../../components/RoadmapVisualizer';
import api from '../../api/axios';

interface RoadmapStep {
  id: string;
  title: string;
  type: string;
  description: string;
}

interface SkillGap {
  skillName: string;
  currentLevel: string;
  requiredLevel: string;
  gapDescription: string;
}

interface GPSData {
  targetCareerName: string;
  currentPhase: string;
  steps: RoadmapStep[];
  skillGaps: SkillGap[];
}

export default function CareerGPS() {
  const [targetCareer, setTargetCareer] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [gpsData, setGpsData] = useState<GPSData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if we have an active route saved
    const fetchCurrentGPS = async () => {
      try {
        const response = await api.get('/api/gps/current');
        if (response.data.roadmap) {
          setGpsData(response.data.roadmap);
          setTargetCareer(response.data.roadmap.targetCareerName);
        }
      } catch (err) {
        console.error("Could not fetch current GPS route", err);
      }
    };
    fetchCurrentGPS();
  }, []);

  const calculateRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetCareer.trim()) return;

    setIsCalculating(true);
    setError(null);
    try {
      const response = await api.post('/api/gps/calculate', { targetCareer });
      if (response.data.success) {
        setGpsData(response.data.roadmap);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to calculate route. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in font-sans">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-primary/10 p-3 rounded-2xl">
          <Map className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Career GPS Engine</h1>
          <p className="text-gray-500 font-medium">Turn-by-turn navigation for your career goals</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Destination Input */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary" /> Set Destination
            </h2>
            <form onSubmit={calculateRoute}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Where do you want to go?
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none font-medium"
                  placeholder="e.g. AI Research Scientist, Marine Biologist..."
                  value={targetCareer}
                  onChange={(e) => setTargetCareer(e.target.value)}
                  disabled={isCalculating}
                />
              </div>
              <button
                type="submit"
                disabled={isCalculating || !targetCareer.trim()}
                className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Calculating Route...
                  </>
                ) : (
                  <>
                    <Navigation className="w-5 h-5" /> Start Navigation
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl flex items-start gap-2 text-sm font-medium">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}
          </div>

          {gpsData && gpsData.skillGaps && gpsData.skillGaps.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Skill Gaps to Bridge</h2>
              <div className="space-y-4">
                {gpsData.skillGaps.map((gap, idx) => (
                  <div key={idx} className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900">{gap.skillName}</h3>
                      <span className="text-xs font-black bg-white px-2 py-1 rounded text-amber-600 border border-amber-200 uppercase tracking-wider">
                        {gap.currentLevel} → {gap.requiredLevel}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{gap.gapDescription}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Visualizer */}
        <div className="lg:col-span-2">
          {gpsData ? (
            <div className="space-y-4">
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl flex items-center justify-between border border-emerald-100">
                <div className="font-medium">
                  Route established from <span className="font-bold">{gpsData.currentPhase}</span> to <span className="font-bold">{gpsData.targetCareerName}</span>
                </div>
              </div>
              <RoadmapVisualizer steps={gpsData.steps.map(s => ({ ...s, id: s.id || (s as any).stepId || Math.random().toString() }))} />
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Map className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Active Route</h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                Enter your target career on the left to calculate your personalized turn-by-turn academic navigation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
