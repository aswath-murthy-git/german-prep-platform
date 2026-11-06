"use client";

import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import { 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  BookOpen, 
  ArrowRight, 
  ArrowLeft,
  Search,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff
} from "lucide-react";

export interface ExplanationPassageItem {
  questionNumber: number;
  questionText: string;
  options: {
    key: "A" | "B" | "C";
    text: string;
    isCorrect: boolean;
  }[];
  userAnswer?: "A" | "B" | "C";
  whyNot: {
    option: "A" | "B" | "C";
    reason: string;
  }[];
  whyCorrect: {
    option: "A" | "B" | "C";
    explanation: string;
  };
  keyPassage: {
    inText: string;
    inOption: string;
    synonymPair: string;
  };
  examinerTip: string;
}

interface ViobeanExplanationCardProps {
  readingText: string;
  passageItems: ExplanationPassageItem[];
  currentQuestionIndex?: number;
  onClose?: () => void;
}

export const ViobeanExplanationCard: React.FC<ViobeanExplanationCardProps> = ({
  readingText,
  passageItems,
  currentQuestionIndex = 0,
  onClose
}) => {
  const { theme } = useUser();
  const [activeIdx, setActiveIdx] = useState(currentQuestionIndex);
  const [highlightKeywords, setHighlightKeywords] = useState(true);

  const isDark = theme === "dark";

  const item = passageItems[activeIdx] || passageItems[0];
  if (!item) return null;

  return (
    <div className={`rounded-3xl border shadow-sm overflow-hidden space-y-6 p-5 sm:p-7 transition-colors duration-200 ${
      isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
    }`}>
      {/* ─── HEADER BAR ─── */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${
        isDark ? "border-slate-800" : "border-slate-100"
      }`}>
        <div className="flex items-center gap-2.5">
          <span className={`p-2 rounded-xl border ${
            isDark ? "bg-purple-950/60 text-purple-300 border-purple-500/30" : "bg-purple-50 text-purple-700 border-purple-200"
          }`}>
            <BookOpen className="w-4 h-4" />
          </span>
          <div>
            <h3 className={`text-base sm:text-lg font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
              Detailed Explanation & Key Passage Analysis
            </h3>
            <div className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Viobean Smart Breakdown: Distractor Traps & Text Evidence
            </div>
          </div>
        </div>

        {/* Question Selector Dots */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {passageItems.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`w-8 h-8 rounded-xl font-bold text-xs transition flex items-center justify-center ${
                activeIdx === idx
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : isDark
                  ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* ─── TWO-COLUMN WORKBENCH: READING TEXT vs SMART BREAKDOWN ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: German Original Text */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Original Reading Passage (German)
            </div>
            <button
              type="button"
              onClick={() => setHighlightKeywords(!highlightKeywords)}
              className="text-[11px] font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1"
            >
              <Search className="w-3 h-3" />
              <span>{highlightKeywords ? "Hide highlights" : "Highlight passage"}</span>
            </button>
          </div>

          <div className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed max-h-[460px] overflow-y-auto space-y-3 ${
            isDark ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-800"
          }`}>
            <p className="whitespace-pre-line">
              {readingText}
            </p>
          </div>
        </div>

        {/* Right Column: Viobean Why Not / Why Correct Breakdown */}
        <div className="space-y-4">
          {/* Question & Options */}
          <div className={`p-4 rounded-2xl border space-y-3 shadow-xs ${
            isDark ? "bg-slate-950/60 border-slate-800" : "bg-white border-slate-200"
          }`}>
            <div className="text-xs font-bold text-purple-400">
              Question {item.questionNumber} of {passageItems.length}
            </div>
            <div className={`text-sm sm:text-base font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>
              {item.questionText}
            </div>

            <div className="space-y-2 pt-1">
              {item.options.map((opt) => {
                const isCorrect = opt.isCorrect;
                return (
                  <div
                    key={opt.key}
                    className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-between transition ${
                      isCorrect
                        ? isDark
                          ? "bg-emerald-950/60 border-emerald-500/80 text-emerald-200 font-bold"
                          : "bg-emerald-50/80 border-emerald-300 text-emerald-950 font-bold"
                        : isDark
                        ? "bg-slate-900/60 border-slate-800 text-slate-400 opacity-70"
                        : "bg-slate-50/60 border-slate-200 text-slate-700 opacity-80"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                        isCorrect 
                          ? "bg-emerald-600 text-white" 
                          : isDark ? "bg-slate-800 text-slate-400" : "bg-slate-200 text-slate-600"
                      }`}>
                        {opt.key}
                      </span>
                      <span>{opt.text}</span>
                    </div>

                    {isCorrect && (
                      <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-black shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Correct</span>
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 1. KEY PASSAGE TABLE (Side-by-Side Text Quote vs Option Quote) */}
          <div className={`rounded-2xl border p-4 space-y-2 ${
            isDark ? "bg-indigo-950/30 border-indigo-500/30" : "bg-indigo-50/50 border-indigo-200"
          }`}>
            <div className={`flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider ${
              isDark ? "text-indigo-300" : "text-indigo-900"
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Key Passage (Text Quote vs Answer Option)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className={`p-2.5 rounded-xl border space-y-1 ${
                isDark ? "bg-slate-900 border-slate-800" : "bg-white border-indigo-100"
              }`}>
                <span className="text-[10px] font-black uppercase text-slate-400">In the original text:</span>
                <p className={`font-semibold ${isDark ? "text-slate-200" : "text-slate-900"}`}>
                  &ldquo;{item.keyPassage.inText}&rdquo;
                </p>
              </div>

              <div className={`p-2.5 rounded-xl border space-y-1 ${
                isDark ? "bg-slate-900 border-slate-800" : "bg-white border-indigo-100"
              }`}>
                <span className="text-[10px] font-black uppercase text-slate-400">In the option:</span>
                <p className={`font-semibold ${isDark ? "text-indigo-300" : "text-indigo-900"}`}>
                  &ldquo;{item.keyPassage.inOption}&rdquo;
                </p>
              </div>
            </div>

            <div className={`text-[11px] font-medium pt-1 ${isDark ? "text-indigo-300" : "text-indigo-800"}`}>
              <strong>Synonym Mapping:</strong> {item.keyPassage.synonymPair}
            </div>
          </div>

          {/* 2. WHY CORRECT (Green Validation) */}
          <div className={`rounded-2xl border p-4 space-y-1.5 ${
            isDark ? "bg-emerald-950/30 border-emerald-500/30" : "bg-emerald-50/40 border-emerald-200"
          }`}>
            <div className={`flex items-center gap-1.5 font-bold text-xs ${isDark ? "text-emerald-300" : "text-emerald-900"}`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>✓ Why Option {item.whyCorrect.option} is Correct</span>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed font-medium ${isDark ? "text-slate-200" : "text-emerald-950"}`}>
              {item.whyCorrect.explanation}
            </p>
          </div>

          {/* 3. WHY NOT (Red Distractor Traps) */}
          <div className={`rounded-2xl border p-4 space-y-2 ${
            isDark ? "bg-rose-950/30 border-rose-500/30" : "bg-rose-50/40 border-rose-200"
          }`}>
            <div className={`flex items-center gap-1.5 font-bold text-xs ${isDark ? "text-rose-300" : "text-rose-900"}`}>
              <XCircle className="w-4 h-4 text-rose-400" />
              <span>✕ Why Distractors are Wrong</span>
            </div>
            <div className="space-y-1.5">
              {item.whyNot.map((wn) => (
                <div key={wn.option} className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-rose-950"}`}>
                  <strong className={isDark ? "text-rose-400" : "text-rose-800"}>Option {wn.option}:</strong> {wn.reason}
                </div>
              ))}
            </div>
          </div>

          {/* 4. EXAMINER TRAP ALERT */}
          <div className={`rounded-2xl border p-3.5 flex items-start gap-2.5 ${
            isDark ? "bg-amber-950/30 border-amber-500/30" : "bg-amber-50/50 border-amber-200"
          }`}>
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className={`text-xs font-bold ${isDark ? "text-amber-300" : "text-amber-900"}`}>Examiner Trap Hack</div>
              <p className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-amber-800"}`}>
                {item.examinerTip}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM NAVIGATION ROW ─── */}
      <div className={`flex items-center justify-between pt-4 border-t ${
        isDark ? "border-slate-800" : "border-slate-100"
      }`}>
        <button
          type="button"
          disabled={activeIdx === 0}
          onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
          className={`px-4 py-2 rounded-xl border text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition ${
            isDark ? "border-slate-800 text-slate-300 hover:bg-slate-800" : "border-slate-200 text-slate-700 hover:bg-slate-50"
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Previous Question</span>
        </button>

        <span className={`text-xs font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          Question {activeIdx + 1} of {passageItems.length}
        </span>

        <button
          type="button"
          disabled={activeIdx === passageItems.length - 1}
          onClick={() => setActiveIdx((prev) => Math.min(passageItems.length - 1, prev + 1))}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm"
        >
          <span>Next Question</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
