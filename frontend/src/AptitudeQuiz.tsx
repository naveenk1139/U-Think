import React, { useState } from 'react';
import { APTITUDE_QUESTIONS } from './data';
import { StreamType } from './types';
import { Award, Compass, Sparkles, Loader2, RefreshCw, Check, AlertCircle, ArrowRight, BookOpen } from 'lucide-react';

interface EvaluationResult {
  recommendedStream: string;
  recommendedStreamId: string;
  whyThisFits: string;
  detailedAnalysis: string;
  suggestedCareers: string[];
  actionPlan: string[];
  motivationalMessage: string;
}

export default function AptitudeQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedScores, setSelectedScores] = useState<Record<number, { choiceText: string, weight: Record<string, number> }>>({});
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentIdx, evaluation]);

  // Quick offline backup logic in case of network discrepancies or mock scenarios
  const computeOfflineResult = () => {
    const totals: Record<StreamType, number> = {
      '12th_intermediate': 0,
      'diploma': 0,
      'paramedical': 0,
      'iti': 0,
      'vocational': 0
    };

    Object.values(selectedScores).forEach((scItem) => {
      const sc = scItem as { choiceText: string; weight: Record<string, number> };
      Object.entries(sc.weight).forEach(([streamKey, value]) => {
        const key = streamKey as StreamType;
        totals[key] = (totals[key] || 0) + ((value as number) || 0);
      });
    });

    // Find stream with maximum score
    let highestStream: StreamType = '12th_intermediate';
    let highestScore = -1;
    Object.entries(totals).forEach(([stream, score]) => {
      if (score > highestScore) {
        highestScore = score;
        highestStream = stream as StreamType;
      }
    });

    const streamTitles: Record<StreamType, string> = {
      '12th_intermediate': '12th / Intermediate Academic Pathway',
      'diploma': 'Polytechnic Diploma in Tech & Engineering',
      'paramedical': 'Paramedical Clinical Technician Track',
      'iti': 'ITI Industrial Craft Trades (Electrical/Mechanical Specialist)',
      'vocational': 'Vocational Commerce, Design & Travel Admin'
    };

    const streamBios: Record<StreamType, string> = {
      '12th_intermediate': 'You display a strong core in abstract thinking, deep academic curiosity, and desire to qualify for universities or premier medical examinations.',
      'diploma': 'You possess sharp technical, physical, or diagnostic logic, matching you directly with structured industrial mechanical processes.',
      'paramedical': 'You show high biological alignment, medical diagnostics skill, and a deep sense of patient duty and treatment setups.',
      'iti': 'Your scores show a great talent for direct physical craftsmanship, hands-on diagnostics, tools usage, and practical labor solutions.',
      'vocational': 'Your answers indicate high affinity for business coordination, boutique management, travel desk execution, or soft-skill sales.'
    };

    return {
      recommendedStream: streamTitles[highestStream],
      recommendedStreamId: highestStream,
      whyThisFits: streamBios[highestStream],
      detailedAnalysis: `Based on your selection of answers, we analyzed your cognitive patterns and vocational desires. You scored highest in fields related to ${streamTitles[highestStream]}, indicating you prefer applied projects and action-oriented challenges compared to traditional long-term theory classes.`,
      suggestedCareers: [
        'Junior Project Supervisor',
        'Certified Sector Analyst',
        'Technical Field Consultant'
      ],
      actionPlan: [
        'Research 3 local state colleges with matching courses that are recognized.',
        'Arrange a quick meeting with graduates in this specific domain.',
        'Review syllabus topics on the U THINK Streams page.'
      ],
      motivationalMessage: "Every great path begins with understanding your unique mental design. Pursue your choice with pride and consistency!"
    };
  };

  const handleSelectOption = (idx: number, choiceText: string, weight: Record<string, number>) => {
    setSelectedScores((prev) => ({
      ...prev,
      [currentIdx]: { choiceText, weight }
    }));
  };

  const handleNext = () => {
    if (currentIdx < APTITUDE_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    setIsEvaluating(true);
    setErrorText(null);

    // Prepare JSON payload
    const payload = APTITUDE_QUESTIONS.map((q, i) => ({
      question: q.question,
      category: q.category,
      choiceText: selectedScores[i]?.choiceText || ''
    }));

    try {
      const response = await fetch('/api/aptitude/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: payload })
      });

      if (!response.ok) {
        throw new Error("Server failed to generate custom evaluation.");
      }

      const data = await response.json();
      setEvaluation(data);
      localStorage.setItem('aptitude_test_result', JSON.stringify(data));
      window.dispatchEvent(new Event('profile_updated'));
    } catch (err: any) {
      console.warn("API evaluate error, falling back to offline parsing:", err);
      // Fallback
      const fallbackData = computeOfflineResult();
      setEvaluation(fallbackData);
      localStorage.setItem('aptitude_test_result', JSON.stringify(fallbackData));
      window.dispatchEvent(new Event('profile_updated'));
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleRestartQuiz = () => {
    setSelectedScores({});
    setCurrentIdx(0);
    setEvaluation(null);
    setErrorText(null);
  };

  const progressPct = ((currentIdx + 1) / APTITUDE_QUESTIONS.length) * 100;
  const currentQuestion = APTITUDE_QUESTIONS[currentIdx];
  const allAnswered = Object.keys(selectedScores).length === APTITUDE_QUESTIONS.length;

  return (
    <div id="quiz-page" className="space-y-8 animate-fade-in">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-teal-700 to-emerald-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Award className="w-64 h-64 -mr-16 -mt-16" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <span className="bg-emerald-500/30 text-emerald-100 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            Interactive AI Dossier
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 tracking-tight font-sans">
            Post-10th Aptitude Assessment
          </h1>
          <p className="mt-4 text-sm sm:text-base text-emerald-100 leading-relaxed font-sans">
            Answer 5 reflective scenario questions below. Our intelligent assessment algorithm maps your logical, biological, mechanical, or coordination traits to recommend the perfect match stream.
          </p>
        </div>
      </div>

      {!evaluation ? (
        <div className="max-w-3xl mx-auto bg-white border border-slate-100 shadow-sm rounded-3xl p-6 sm:p-10 space-y-8">
          {/* Progress Indication */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider">
                Assessment Progress
              </span>
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Question {currentIdx + 1} of {APTITUDE_QUESTIONS.length}
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Active Question Box */}
          <div className="space-y-5">
            <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2 py-1 rounded">
              Scenario Section: <span className="capitalize">{currentQuestion.category} Logic</span>
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 font-sans tracking-tight leading-relaxed">
              {currentQuestion.question}
            </h2>

            {/* Answer Options */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((option, oIdx) => {
                const isSelected = selectedScores[currentIdx]?.choiceText === option.text;
                return (
                  <button
                    id={`q-${currentIdx}-opt-${oIdx}`}
                    key={oIdx}
                    onClick={() => handleSelectOption(currentIdx, option.text, option.scoreWeight)}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm font-medium flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/50 text-emerald-950 font-semibold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border shrink-0 flex items-center justify-center transition-all ${
                      isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 text-white stroke-[3px]" />}
                    </div>
                    <span>{option.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error Prompt */}
          {errorText && (
            <div className="flex gap-2 bg-red-50 text-red-700 p-4 rounded-xl text-xs sm:text-sm items-center">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorText}</span>
            </div>
          )}

          {/* Buttons Controls */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <button
              onClick={handlePrevious}
              disabled={currentIdx === 0}
              className="text-xs sm:text-sm font-semibold text-slate-500 bg-slate-50 hover:bg-slate-100 px-4 py-2.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </button>

            {currentIdx < APTITUDE_QUESTIONS.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!selectedScores[currentIdx]}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
              >
                Next Question
              </button>
            ) : (
              <button
                id="btn-evaluate-quiz"
                onClick={handleSubmitQuiz}
                disabled={!allAnswered || isEvaluating}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center gap-2 shadow-md shadow-emerald-100"
              >
                {isEvaluating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Evaluating with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-200" /> Evaluate My Pathway
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Results Display Panel */
        <div className="max-w-3xl mx-auto space-y-8 animate-slide-up">
          <div className="bg-white border border-slate-100 shadow-xl rounded-3xl p-6 sm:p-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  AI Recommended Pathway
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
                  {evaluation.recommendedStream}
                </h2>
              </div>
              <button
                onClick={handleRestartQuiz}
                className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Restart Quiz
              </button>
            </div>

            {/* Why This Fits */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                🎯 Why This Matches Your Aptitude
              </h3>
              <p className="text-slate-800 text-sm sm:text-base leading-relaxed bg-emerald-50/40 p-5 rounded-2xl border border-emerald-50">
                {evaluation.whyThisFits}
              </p>
            </div>

            {/* Detailed Analysis Output */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                📊 Detailed Academic Analysis
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
                {evaluation.detailedAnalysis}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Recommended Jobs / Careers */}
              <div className="space-y-3 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                  💼 Potential High-Growth Job Roles
                </h4>
                <div className="space-y-1.5 pt-1">
                  {evaluation.suggestedCareers.map((car, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-900">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                      <span>{car}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Steps / Action Plan List */}
              <div className="space-y-3 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                  📅 Recommended Action Steps
                </h4>
                <ul className="space-y-2 pt-1 text-xs">
                  {evaluation.actionPlan.map((step, idx) => (
                    <li key={idx} className="flex gap-2 text-slate-600 font-sans leading-relaxed">
                      <span className="font-bold text-emerald-700 bg-emerald-50 w-5 h-5 rounded-md flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Inspirational Quote Callout */}
            <div className="pt-6 border-t border-slate-100 text-center">
              <p className="text-slate-500 italic text-sm font-sans max-w-xl mx-auto mb-6">
                "{evaluation.motivationalMessage}"
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    const ev = new CustomEvent('navigate-tab-with-search', { 
                      detail: { 
                        tab: 'streams',
                        streamPreset: evaluation.recommendedStreamId 
                      } 
                    });
                    window.dispatchEvent(ev);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto shadow-sm"
                >
                  Explore Recommended Streams
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleRestartQuiz}
                  className="bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 border border-slate-200 px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
