"use client";

import React, { useState, useMemo } from "react";
import rawData from "@/data/citizenship_data.json";
import { CitizenshipData, CitizenshipQuestion } from "@/types";
import { useUser } from "@/context/UserContext";
import { AudioVoiceButton } from "./AudioVoiceButton";
import { 
  Zap, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Languages, 
  Trophy, 
  Sparkles,
  Flame,
  ArrowRight,
  Eye,
  EyeOff
} from "lucide-react";
import confetti from "canvas-confetti";

const citizenshipData = rawData as unknown as CitizenshipData;

interface CommuteSprintDrillProps {
  onClose?: () => void;
}

export const CommuteSprintDrill: React.FC<CommuteSprintDrillProps> = ({ onClose }) => {
  const { 
    profile, 
    recordQuestionAnswer, 
    toggleSound, 
    masteredQuestionsCount 
  } = useUser();

  // Freeze questions for the current drill session so answers NEVER cause array re-sorting
  const [sessionQuestions] = useState<CitizenshipQuestion[]>(() => {
    const list: CitizenshipQuestion[] = [...citizenshipData.general];
    const curState = citizenshipData.states[profile.selectedState] || citizenshipData.states["berlin"];
    if (curState && curState.questions) {
      list.push(...curState.questions);
    }

    // Prioritize at session start: failed questions first, then unmastered (<2), then mastered
    return list.sort((a, b) => {
      const aFailed = profile.failedQuestionIds.includes(a.id) ? -2 : 0;
      const bFailed = profile.failedQuestionIds.includes(b.id) ? -2 : 0;
      const aMastery = (profile.questionMastery[a.id] || 0) < 2 ? -1 : 1;
      const bMastery = (profile.questionMastery[b.id] || 0) < 2 ? -1 : 1;
      return (aFailed + aMastery) - (bFailed + bMastery);
    });
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showEnglish, setShowEnglish] = useState<boolean>(false);
  const [sessionCount, setSessionCount] = useState<number>(0);
  const [sessionCorrect, setSessionCorrect] = useState<number>(0);

  const curQ = sessionQuestions[currentIndex % sessionQuestions.length];
  const isMastered = (profile.questionMastery[curQ?.id] || 0) >= 2;
  const isAnswered = selectedOption !== null;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    const isCorrect = idx === curQ.correct;

    setSessionCount(prev => prev + 1);
    if (isCorrect) {
      setSessionCorrect(prev => prev + 1);
    }
    recordQuestionAnswer(curQ.id, isCorrect);

    if (isCorrect && (profile.currentStreak + 1) % 5 === 0) {
      confetti({ particleCount: 40, spread: 45, origin: { y: 0.7 } });
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setCurrentIndex(prev => prev + 1);
  };

  if (!curQ) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 max-w-2xl mx-auto shadow-2xl space-y-6">
      {/* Top Travel & ADHD Bar */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Zap className="w-4 h-4" />
          </span>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Commute Zen Sprint</span>
              {profile.currentStreak > 1 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.2 bg-orange-500/20 text-orange-400 rounded-full text-[10px] font-extrabold animate-pulse">
                  <Flame className="w-3 h-3 fill-orange-400" />
                  {profile.currentStreak} Streak!
                </span>
              )}
            </div>
            <div className="text-[10px] text-slate-400">One question at a time • Zero distraction</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl border text-xs transition ${
              profile.soundEnabled
                ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                : "bg-slate-950 text-slate-500 border-slate-800"
            }`}
            title="Toggle micro-reward sound chimes"
          >
            {profile.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Bilingual English toggle */}
          <button
            onClick={() => setShowEnglish(!showEnglish)}
            className={`p-2 rounded-xl border text-xs transition ${
              showEnglish
                ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
                : "bg-slate-950 text-slate-500 border-slate-800"
            }`}
            title="Toggle English Translation"
          >
            <Languages className="w-4 h-4" />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="text-xs font-bold px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
            >
              Exit
            </button>
          )}
        </div>
      </div>

      {/* Progress Mini Badge */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-slate-950 text-amber-400 font-mono font-bold rounded-md border border-slate-800">
            Q#{curQ.id}
          </span>
          <span className="text-[11px]">
            {curQ.stateSlug ? `State: ${curQ.stateName}` : curQ.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-300">
            Session: <strong className="text-white">{sessionCorrect}</strong> / {sessionCount}
          </span>
          {isMastered && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3" />
              Exam Ready (2x)
            </span>
          )}
        </div>
      </div>

      {/* The Single Question Display (High Contrast, Large Typography) */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
              {curQ.de}
            </h3>
            <AudioVoiceButton text={curQ.de} label="" className="shrink-0 mt-0.5" />
          </div>

          {showEnglish && (
            <p className="text-xs sm:text-sm font-semibold text-cyan-300/90 bg-cyan-950/30 p-2.5 rounded-xl border border-cyan-500/20 leading-relaxed">
              {curQ.en}
            </p>
          )}
        </div>

        {/* Diagram image if applicable */}
        {curQ.image && (
          <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 inline-block">
            <img
              src={curQ.image}
              alt="Question Diagram"
              className="max-h-44 rounded object-contain mx-auto"
            />
          </div>
        )}

        {/* Big Tap Target Options */}
        <div className="grid grid-cols-1 gap-3">
          {curQ.options.map((opt, idx) => {
            const isPicked = selectedOption === idx;
            const isCorrect = idx === curQ.correct;

            let cardStyle = "bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-200 active:scale-[0.99]";

            if (isAnswered) {
              if (isCorrect) {
                cardStyle = "bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold shadow-md shadow-emerald-500/20";
              } else if (isPicked && !isCorrect) {
                cardStyle = "bg-rose-950/70 border-rose-500 text-rose-200 font-bold shadow-md shadow-rose-500/20";
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelect(idx)}
                className={`w-full p-4 rounded-2xl border text-left transition flex items-start gap-3.5 min-h-[58px] ${cardStyle}`}
              >
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 mt-0.5 border ${
                  isAnswered && isCorrect
                    ? "bg-emerald-500 text-slate-950 border-emerald-400"
                    : isAnswered && isPicked && !isCorrect
                    ? "bg-rose-500 text-white border-rose-400"
                    : "bg-slate-900 border-slate-700 text-slate-400"
                }`}>
                  {["A", "B", "C", "D"][idx]}
                </span>
                <div className="space-y-0.5 flex-1">
                  <div className="text-sm sm:text-base leading-snug">{opt.de}</div>
                  {showEnglish && (
                    <div className="text-xs text-slate-400 font-medium">{opt.en}</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback Card & Next Button */}
        {isAnswered && (
          <div className="pt-2 space-y-3 animate-fadeIn">
            <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
              selectedOption === curQ.correct
                ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                : "bg-rose-950/40 border-rose-500/40 text-rose-200"
            }`}>
              {selectedOption === curQ.correct ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="text-xs space-y-1">
                <div className="font-extrabold text-sm">
                  {selectedOption === curQ.correct ? "Richtig! (Correct!)" : "Falsch! (Incorrect)"}
                </div>
                {(curQ.explanation_de || curQ.explanation_en) && (
                  <p className="text-slate-300 leading-relaxed">
                    {curQ.explanation_de || curQ.explanation_en}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-2xl text-base shadow-lg shadow-amber-500/25 transition flex items-center justify-center gap-2"
            >
              <span>Next Question</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
