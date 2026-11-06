"use client";

import React, { useState, useMemo } from "react";
import { 
  CONJUNCTION_FAMILIES_DATA, 
  CONJUNCTION_DRILL_QUESTIONS, 
  ConjunctionFamily, 
  ConjunctionDrillQuestion 
} from "@/data/b1_conjunctions_data";
import { AudioVoiceButton } from "./AudioVoiceButton";
import { useUser } from "@/context/UserContext";
import { 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  HelpCircle, 
  Zap, 
  BookOpen, 
  ShieldCheck, 
  AlertTriangle,
  Lightbulb,
  Award,
  ChevronRight,
  Target
} from "lucide-react";
import confetti from "canvas-confetti";

export const B1ConjunctionsLab: React.FC = () => {
  const { showEnglish } = useUser();
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "TRAINER" | "CHEATSHEET">("OVERVIEW");
  const [selectedFamily, setSelectedFamily] = useState<ConjunctionFamily>(CONJUNCTION_FAMILIES_DATA[0]);

  // Trainer state
  const [drillIdx, setDrillIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [answeredCount, setAnsweredCount] = useState<number>(0);

  const curDrill: ConjunctionDrillQuestion = CONJUNCTION_DRILL_QUESTIONS[drillIdx % CONJUNCTION_DRILL_QUESTIONS.length];

  // Stable shuffled options per drill question so options are randomized across A, B, C
  const shuffledOptions = useMemo(() => {
    if (!curDrill || !curDrill.options) return [];
    const copy = [...curDrill.options];
    let seed = ((curDrill.id * 16807 + 1013904223) >>> 0);
    for (let i = copy.length - 1; i > 0; i--) {
      seed = ((seed * 1664525 + 1013904223) >>> 0);
      const j = seed % (i + 1);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }, [curDrill]);

  const handleSelectOption = (optText: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(optText);
    setAnsweredCount(prev => prev + 1);

    const isCorrect = optText === curDrill.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak % 4 === 0) {
        confetti({ particleCount: 45, spread: 55, origin: { y: 0.7 } });
      }
    } else {
      setStreak(0);
    }
  };

  const handleNextDrill = () => {
    setSelectedOption(null);
    setDrillIdx(prev => (prev + 1) % CONJUNCTION_DRILL_QUESTIONS.length);
  };

  const handleResetTrainer = () => {
    setSelectedOption(null);
    setDrillIdx(0);
    setScore(0);
    setStreak(0);
    setAnsweredCount(0);
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/15 border border-indigo-500/40 rounded-full text-xs font-bold text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>B1 High-Score Differentiator: Satzverbindungen</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              B1 Conjunctions & <span className="text-indigo-400">Word Order Lab</span>
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Connectors are the #1 grading criteria in B1 writing and speaking. Master the <strong>4 Conjunction Families</strong>: ADUSO (Pos 0), Verb-Kickers (Verb am Ende), Inversion Connectors (Pos 1/2), and Two-Part Double Connectors.
            </p>
          </div>

          {/* Quick Benchmark Stats */}
          <div className="flex items-center gap-3 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 shrink-0">
            <div className="text-center px-3">
              <div className="text-[10px] text-slate-400 font-bold uppercase">4 Families</div>
              <div className="text-base font-black text-indigo-300">ADUSO & KATI</div>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div className="text-center px-3">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Exam Score Impact</div>
              <div className="text-base font-black text-emerald-400">+25% Points</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveTab("OVERVIEW")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "OVERVIEW"
                ? "bg-indigo-500 text-slate-950 shadow-md shadow-indigo-500/20 font-black"
                : "bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>The 4 Conjunction Families</span>
          </button>

          <button
            onClick={() => setActiveTab("TRAINER")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "TRAINER"
                ? "bg-indigo-500 text-slate-950 shadow-md shadow-indigo-500/20 font-black"
                : "bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Connector Trainer</span>
          </button>

          <button
            onClick={() => setActiveTab("CHEATSHEET")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "CHEATSHEET"
                ? "bg-indigo-500 text-slate-950 shadow-md shadow-indigo-500/20 font-black"
                : "bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Quick Cheat-Sheet & Traps</span>
          </button>
        </div>
      </div>

      {/* ── TAB 1: OVERVIEW OF THE 4 FAMILIES ── */}
      {activeTab === "OVERVIEW" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Family Selector Column */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Conjunction Families
            </div>
            {CONJUNCTION_FAMILIES_DATA.map((fam) => {
              const isSelected = fam.id === selectedFamily.id;
              return (
                <button
                  key={fam.id}
                  onClick={() => setSelectedFamily(fam)}
                  className={`w-full p-4 rounded-2xl border text-left transition flex flex-col gap-1.5 ${
                    isSelected
                      ? "bg-indigo-500/20 border-indigo-500 text-white shadow-md shadow-indigo-500/15"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-indigo-400 uppercase tracking-wider">
                      {fam.positionRule}
                    </span>
                    {isSelected && <ChevronRight className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <div className="text-sm font-bold text-slate-200">{fam.name}</div>
                </button>
              );
            })}
          </div>

          {/* Family Detailed Card */}
          <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xl">
            {/* Header */}
            <div className="space-y-2 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-500/15 text-indigo-300 font-mono text-xs font-bold border border-indigo-500/30">
                  {selectedFamily.positionRule}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {selectedFamily.name}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedFamily.explanation}
              </p>
            </div>

            {/* Word Order Formula Box */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-indigo-500/30 space-y-1.5">
              <div className="text-[11px] font-black uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>Word Order Formula</span>
              </div>
              <div className="font-mono text-sm sm:text-base text-amber-300 font-bold">
                {selectedFamily.wordOrderFormula}
              </div>
            </div>

            {/* Conjunctions List in this family */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider">
                Key Conjunctions in this Family:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedFamily.conjunctionsList.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-sm text-indigo-300 font-mono">{item.word}</span>
                      {showEnglish && <span className="text-xs text-slate-400 italic">{item.meaning_en}</span>}
                    </div>
                    <div className="text-[11px] text-slate-400">{item.note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real Exam Examples with Breakdown */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider">
                Exam Sentences & Word Breakdown:
              </h4>
              <div className="space-y-3">
                {selectedFamily.examples.map((ex, idx) => (
                  <div key={idx} className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-white">{ex.de}</div>
                        {showEnglish && <div className="text-xs text-slate-400">{ex.en}</div>}
                      </div>
                      <AudioVoiceButton text={ex.de} className="shrink-0" />
                    </div>
                    <div className="text-[11px] font-mono text-emerald-400/90 bg-emerald-950/30 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                      Structure: {ex.breakdown}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exam Warning Alert */}
            <div className="p-4 bg-amber-950/30 border border-amber-500/30 rounded-2xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-200/90 leading-relaxed">
                <strong>Crucial B1 Rule:</strong> {selectedFamily.examWarning}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: INTERACTIVE CONNECTOR TRAINER (SHUFFLED OPTIONS) ── */}
      {activeTab === "TRAINER" && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Trainer Stats Bar */}
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-md">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Question</span>
                <div className="text-sm font-black text-white font-mono">
                  {(drillIdx % CONJUNCTION_DRILL_QUESTIONS.length) + 1} / {CONJUNCTION_DRILL_QUESTIONS.length}
                </div>
              </div>
              <div className="w-px h-7 bg-slate-800" />
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Score</span>
                <div className="text-sm font-black text-emerald-400 font-mono">{score} / {answeredCount}</div>
              </div>
              <div className="w-px h-7 bg-slate-800" />
              <div className="flex items-center gap-1.5 text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-black font-mono">{streak} streak</span>
              </div>
            </div>

            <button
              onClick={handleResetTrainer}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition"
            >
              Reset
            </button>
          </div>

          {/* Drill Question Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-6 shadow-2xl">
            {/* Family Badge */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                Family: {curDrill.family}
              </span>
              <span className="text-xs text-slate-500">Pick the correct word order</span>
            </div>

            {/* Prompt */}
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                  {curDrill.prompt_de}
                </h3>
                <AudioVoiceButton text={curDrill.prompt_de} className="shrink-0" />
              </div>
              <p className="text-xs sm:text-sm text-indigo-200/80 bg-indigo-950/30 p-2.5 rounded-xl border border-indigo-500/20">
                {curDrill.prompt_en}
              </p>
            </div>

            {/* Shuffled Options */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              {shuffledOptions.map((optText, optIdx) => {
                const isSelected = selectedOption === optText;
                const isAnswered = selectedOption !== null;
                const isCorrect = optText === curDrill.correctAnswer;

                let btnStyle = "bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-200 active:scale-[0.99]";

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-950/70 border-emerald-500 text-emerald-200 font-black shadow-md shadow-emerald-500/20";
                  } else if (isSelected && !isCorrect) {
                    btnStyle = "bg-rose-950/70 border-rose-500 text-rose-200 font-black shadow-md shadow-rose-500/20";
                  }
                }

                return (
                  <button
                    key={optIdx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(optText)}
                    className={`p-4 rounded-2xl border text-left font-bold text-sm sm:text-base transition flex items-start gap-3.5 ${btnStyle}`}
                  >
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 mt-0.5 border ${
                      isAnswered && isCorrect
                        ? "bg-emerald-500 text-slate-950 border-emerald-400"
                        : isAnswered && isSelected && !isCorrect
                        ? "bg-rose-500 text-white border-rose-400"
                        : "bg-slate-900 border-slate-700 text-slate-400"
                    }`}>
                      {["A", "B", "C"][optIdx]}
                    </span>
                    <span className="leading-snug pt-0.5">{optText}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation Feedback on Selection */}
            {selectedOption !== null && (
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 animate-fadeIn">
                <div className="flex items-center gap-2">
                  {selectedOption === curDrill.correctAnswer ? (
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Richtig! Well done!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                      <XCircle className="w-5 h-5" />
                      <span>Falsch! Notice the word order rule below.</span>
                    </div>
                  )}
                </div>

                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {curDrill.explanation_de}
                  <div className="text-slate-400 text-xs mt-1">{curDrill.explanation_en}</div>
                </div>

                {/* Word order diagram */}
                <div className="p-3 bg-slate-900 rounded-xl border border-indigo-500/30 text-xs font-mono text-indigo-300 font-bold">
                  Rule Diagram: {curDrill.wordOrderSchematic}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextDrill}
                    className="py-2.5 px-6 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black text-xs transition flex items-center gap-2 shadow-lg shadow-indigo-500/20"
                  >
                    <span>Next Connector Drill</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TAB 3: QUICK CHEAT-SHEET ── */}
      {activeTab === "CHEATSHEET" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-white">The Ultimate B1 Conjunction Matrix</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Keep this matrix in mind for every German sentence you speak or write.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Family</th>
                  <th className="py-3 px-4">Connectors</th>
                  <th className="py-3 px-4">Position of Verb</th>
                  <th className="py-3 px-4">B1 Golden Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-bold text-amber-400">1. ADUSO (Pos 0)</td>
                  <td className="py-3.5 px-4 font-mono">aber, denn, und, sondern, oder</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">Position 2 (Normal)</td>
                  <td className="py-3.5 px-4 font-medium">Ich lerne, denn ich <strong>brauche</strong> das B1-Zeugnis.</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-bold text-indigo-400">2. Subordinating (KATI)</td>
                  <td className="py-3.5 px-4 font-mono">weil, dass, obwohl, wenn, als, damit, ob, da</td>
                  <td className="py-3.5 px-4 text-rose-400 font-bold">Absolute Satzende!</td>
                  <td className="py-3.5 px-4 font-medium">Ich bleibe daheim, weil ich krank <strong>bin</strong>.</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-bold text-cyan-400">3. Inversion (Pos 1)</td>
                  <td className="py-3.5 px-4 font-mono">deshalb, deswegen, trotzdem, sonst, außerdem, danach</td>
                  <td className="py-3.5 px-4 text-amber-400 font-bold">Position 2 (vor Subjekt)</td>
                  <td className="py-3.5 px-4 font-medium">Ich habe geübt, deshalb <strong>bestehe</strong> ich.</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-bold text-emerald-400">4. Double Paired</td>
                  <td className="py-3.5 px-4 font-mono">nicht nur... sondern auch, entweder... oder, weder... noch</td>
                  <td className="py-3.5 px-4 text-slate-300">Variiert je nach Teilsatz</td>
                  <td className="py-3.5 px-4 font-medium">Er spricht <strong>nicht nur</strong> Englisch, <strong>sondern auch</strong> Deutsch.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
