"use client";

import React, { useState, useMemo } from "react";
import { 
  FOUNDATION_LEVELS_DATA, 
  VERB_CONJUGATIONS_DATA, 
  CONJUGATION_DRILL_ITEMS,
  ConjugationTable,
  ConjugationDrillItem
} from "@/data/zero_to_b1_curriculum";
import { AudioVoiceButton } from "./AudioVoiceButton";
import { useUser } from "@/context/UserContext";
import { 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  Flame, 
  RotateCcw, 
  Lightbulb, 
  BookOpen, 
  HelpCircle, 
  Zap, 
  ShieldCheck, 
  Check, 
  ChevronRight, 
  Award,
  Compass,
  Calendar,
  Eye,
  EyeOff,
  PenTool
} from "lucide-react";
import confetti from "canvas-confetti";
import { AdhdStudyPathway } from "./AdhdStudyPathway";

interface ZeroToB1AcademyProps {
  onNavigateToSection?: (section: "PATHWAY" | "ACADEMY" | "CASES" | "CITIZENSHIP" | "READING" | "LISTENING" | "WRITING" | "SPEAKING" | "GRAMMAR" | "KEYWORDS" | "STRATEGY" | "CONJUNCTIONS") => void;
}

export const ZeroToB1Academy: React.FC<ZeroToB1AcademyProps> = ({ onNavigateToSection }) => {
  const { profile, toggleSound, showEnglish, toggleShowEnglish } = useUser();
  const [revealedEnglishItems, setRevealedEnglishItems] = useState<Record<string, boolean>>({});

  // Primary Tab: PATHWAY | CONJUGATION_TRAINER | VERB_TABLES | PASS_GUARANTEE | WEEKLY_ROADMAP
  const [activeTab, setActiveTab] = useState<"PATHWAY" | "CONJUGATION_TRAINER" | "VERB_TABLES" | "PASS_GUARANTEE" | "WEEKLY_ROADMAP">("CONJUGATION_TRAINER");

  // Pathway level selector: A0 | A1 | A2 | B1
  const [selectedLevel, setSelectedLevel] = useState<"A0" | "A1" | "A2" | "B1">("A1");

  // Verb Tables filter: ALL | MODAL | AUXILIARY | STEM_CHANGE | REGULAR
  const [verbFilter, setVerbFilter] = useState<"ALL" | "MODAL" | "AUXILIARY" | "STEM_CHANGE" | "REGULAR">("MODAL");
  const [selectedVerb, setSelectedVerb] = useState<ConjugationTable>(VERB_CONJUGATIONS_DATA[0]);

  // Conjugation Trainer state (Supports Active Writing & Quick Select)
  const [drillCategory, setDrillCategory] = useState<"ALL" | "MODAL" | "AUXILIARY" | "STEM_CHANGE" | "REGULAR">("ALL");
  const [drillInputMode, setDrillInputMode] = useState<"WRITE" | "CHOICE">("WRITE");
  const [typedAnswer, setTypedAnswer] = useState<string>("");
  const [showConjugationHint, setShowConjugationHint] = useState<boolean>(false);
  const [drillIndex, setDrillIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isDrillCorrect, setIsDrillCorrect] = useState<boolean | null>(null);
  const [wasFullSentence, setWasFullSentence] = useState<boolean>(false);
  const [drillScore, setDrillScore] = useState<number>(0);
  const [drillAnsweredCount, setDrillAnsweredCount] = useState<number>(0);
  const [drillStreak, setDrillStreak] = useState<number>(0);

  // Filter drill items
  const filteredDrillItems = drillCategory === "ALL"
    ? CONJUGATION_DRILL_ITEMS
    : CONJUGATION_DRILL_ITEMS.filter(item => item.category === drillCategory);

  const curDrill: ConjugationDrillItem = filteredDrillItems[drillIndex % filteredDrillItems.length];

  // Stable shuffled options per drill item so correct answer is mixed up and never predictably first!
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

  const handleSelectDrillOption = (optionText: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionText);
    setDrillAnsweredCount(prev => prev + 1);

    const isCorrect = optionText.trim().toLowerCase() === curDrill.correctAnswer.trim().toLowerCase();
    setIsDrillCorrect(isCorrect);
    setWasFullSentence(false);

    if (isCorrect) {
      setDrillScore(prev => prev + 1);
      const newStreak = drillStreak + 1;
      setDrillStreak(newStreak);
      if (newStreak % 5 === 0) {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
      }
    } else {
      setDrillStreak(0);
    }
  };

  const handleSubmitTypedAnswer = () => {
    if (!typedAnswer.trim() || selectedOption !== null) return;

    // Normalizer: strips punctuation, quotes, multiple spaces, and lowercases
    const normalize = (str: string) =>
      str
        .toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()""„“»«!?]/g, "")
        .replace(/\s+/g, " ")
        .trim();

    const cleanInput = normalize(typedAnswer);
    const cleanCorrect = normalize(curDrill.correctAnswer);

    // 1. Exact verb match (e.g. "kann", "kann.")
    const isExactVerb = cleanInput === cleanCorrect;

    // 2. Pronoun + conjugated verb (e.g. "ich kann")
    const pronounPlusVerb = normalize(`${curDrill.pronoun} ${curDrill.correctAnswer}`);
    const isPronounPlusVerb = cleanInput === pronounPlusVerb;

    // 3. Full completed sentence (e.g. "Ich kann gut schwimmen", "Ich kann gut schwimmen.")
    const fullExpectedSentence = normalize(curDrill.sentenceTemplate_de.replace("___", curDrill.correctAnswer));
    const isFullSentence = cleanInput === fullExpectedSentence;

    // 4. Flexible match: check if template parts with blank filled match
    const templateParts = curDrill.sentenceTemplate_de.split("___").map(p => normalize(p));
    let isConstructedMatch = false;
    if (templateParts.length === 2) {
      const expectedConstructed = `${templateParts[0]} ${cleanCorrect} ${templateParts[1]}`.replace(/\s+/g, " ").trim();
      isConstructedMatch = cleanInput === expectedConstructed;
    }

    const isCorrect = isExactVerb || isPronounPlusVerb || isFullSentence || isConstructedMatch;

    setSelectedOption(typedAnswer.trim());
    setIsDrillCorrect(isCorrect);
    setWasFullSentence(isFullSentence || isConstructedMatch);
    setDrillAnsweredCount(prev => prev + 1);

    if (isCorrect) {
      setDrillScore(prev => prev + 1);
      const newStreak = drillStreak + 1;
      setDrillStreak(newStreak);
      if (newStreak % 5 === 0) {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
      }
    } else {
      setDrillStreak(0);
    }
  };

  const handleNextDrill = () => {
    setSelectedOption(null);
    setIsDrillCorrect(null);
    setWasFullSentence(false);
    setTypedAnswer("");
    setShowConjugationHint(false);
    setDrillIndex(prev => (prev + 1) % filteredDrillItems.length);
  };

  const handleResetDrill = () => {
    setSelectedOption(null);
    setIsDrillCorrect(null);
    setWasFullSentence(false);
    setTypedAnswer("");
    setShowConjugationHint(false);
    setDrillIndex(0);
    setDrillScore(0);
    setDrillAnsweredCount(0);
    setDrillStreak(0);
  };

  // Filtered Verb Tables
  const filteredVerbs = verbFilter === "ALL"
    ? VERB_CONJUGATIONS_DATA
    : VERB_CONJUGATIONS_DATA.filter(v => v.type === verbFilter);

  const curLevelData = FOUNDATION_LEVELS_DATA.find(lvl => lvl.level === selectedLevel) || FOUNDATION_LEVELS_DATA[1];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-300 mb-2">
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span>Complete Zero to B1 Fast-Track Engine</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              0 → B1 Foundation <span className="text-amber-400">& Verb Conjugation Academy</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Start from absolute zero (A0) and master the core grammar: <strong>Verb Conjugations</strong>, the <strong>6 Modal Verbs</strong>, <strong>Articles & Cases</strong>, and the <strong>Satzbau Formula</strong> required to pass B1.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={toggleShowEnglish}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                showEnglish
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/10"
                  : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
              }`}
              title="Toggle English Translations & Hints (Default: OFF for German immersion)"
            >
              {showEnglish ? (
                <>
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>English: ON</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                  <span>English: OFF</span>
                </>
              )}
            </button>
            <span className="px-3 py-1.5 bg-slate-950 text-amber-400 font-mono text-xs font-bold rounded-xl border border-slate-800">
              Exam Benchmark: 60% to Pass
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-800">
          {[
            { id: "CONJUGATION_TRAINER", label: "Interactive Conjugation Drill", icon: Zap },
            { id: "VERB_TABLES", label: "Modal & Verb Conjugation Tables", icon: BookOpen },
            { id: "WEEKLY_ROADMAP", label: "4-Week ADHD Pathway (3-4h/wk)", icon: Calendar },
            { id: "PATHWAY", label: "0 → B1 Step-by-Step Pathway", icon: Layers },
            { id: "PASS_GUARANTEE", label: "Will I Pass B1 from 0? (Guarantee)", icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isCur = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  isCur
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black"
                    : "bg-slate-950/80 hover:bg-slate-800 text-slate-300 border border-slate-800"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── TAB 1: INTERACTIVE CONJUGATION DRILL MACHINE ─── */}
      {activeTab === "CONJUGATION_TRAINER" && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-3 sm:p-4 rounded-2xl">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-400 font-bold mr-1">Filter Drill:</span>
              {[
                { id: "ALL", label: "All Verbs" },
                { id: "MODAL", label: "The 6 Modal Verbs" },
                { id: "AUXILIARY", label: "Auxiliary (sein/haben)" },
                { id: "STEM_CHANGE", label: "Stem-Changers" },
                { id: "REGULAR", label: "Regular Verbs" }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setDrillCategory(cat.id as any);
                    setDrillIndex(0);
                    setSelectedOption(null);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                    drillCategory === cat.id
                      ? "bg-amber-500 text-slate-950 shadow-sm"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs">
              {drillStreak > 1 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-orange-500/20 text-orange-400 font-black rounded-full border border-orange-500/30 animate-pulse">
                  <Flame className="w-3.5 h-3.5 fill-orange-400" />
                  {drillStreak} Streak!
                </span>
              )}
              <span className="text-slate-400">
                Score: <strong className="text-amber-400">{drillScore}</strong> / {drillAnsweredCount}
              </span>
              <button
                onClick={handleResetDrill}
                className="p-1 text-slate-500 hover:text-slate-300"
                title="Reset drill session"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Drill Interactive Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 font-bold rounded-lg border border-amber-500/20 font-mono">
                  Drill #{curDrill.id}
                </span>
                <span className="text-slate-400">
                  Verb: <strong className="text-white font-mono">{curDrill.verb}</strong> {showEnglish && `(${curDrill.verb_en})`}
                </span>
              </div>
              <span className="px-2 py-0.5 bg-slate-950 text-cyan-300 font-bold rounded-md border border-cyan-500/20 text-[10px]">
                {curDrill.category}
              </span>
            </div>

            {/* Target Pronoun & Question Prompt */}
            <div className="text-center space-y-3 py-2">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                Conjugate for the pronoun:
              </div>
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-2xl rounded-2xl shadow-lg shadow-amber-500/20">
                {curDrill.pronoun}
              </div>
              <div className="text-base sm:text-lg font-bold text-white pt-2">
                &ldquo;{curDrill.sentenceTemplate_de}&rdquo;
              </div>
              {showEnglish || revealedEnglishItems[`drill-${curDrill.id}`] ? (
                <div className="text-xs text-slate-400 animate-fadeIn">
                  &ldquo;{curDrill.sentenceTemplate_en}&rdquo;
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setRevealedEnglishItems(prev => ({ ...prev, [`drill-${curDrill.id}`]: true }))}
                  className="text-[11px] text-slate-500 hover:text-amber-400 inline-flex items-center gap-1 transition"
                >
                  <Eye className="w-3 h-3 text-slate-500" />
                  <span>Show English translation</span>
                </button>
              )}
            </div>

            {/* Mode Switcher: Active Writing vs Fast-Pick Choice */}
            <div className="flex items-center justify-center gap-2 pt-1 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setDrillInputMode("WRITE")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  drillInputMode === "WRITE"
                    ? "bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20"
                    : "bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800"
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Active Typing Mode (Recommended for Pass)</span>
              </button>

              <button
                type="button"
                onClick={() => setDrillInputMode("CHOICE")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  drillInputMode === "CHOICE"
                    ? "bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20"
                    : "bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800"
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Fast-Pick Options</span>
              </button>
            </div>

            {/* Active Writing Mode */}
            {drillInputMode === "WRITE" ? (
              <div className="space-y-3 pt-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Type conjugated verb for "${curDrill.pronoun}"...`}
                    value={typedAnswer}
                    disabled={selectedOption !== null}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSubmitTypedAnswer();
                    }}
                    className="flex-1 bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-2xl px-4 py-3.5 text-white font-mono font-bold text-base focus:outline-none transition"
                  />
                  <button
                    type="button"
                    disabled={!typedAnswer.trim() || selectedOption !== null}
                    onClick={handleSubmitTypedAnswer}
                    className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:hover:bg-amber-500 text-slate-950 font-black rounded-2xl text-sm transition shadow-md shadow-amber-500/20 active:scale-95 shrink-0"
                  >
                    Check ✦
                  </button>
                </div>

                {/* Grammar Hint Button */}
                <div className="flex items-center justify-between">
                  {!showConjugationHint ? (
                    <button
                      type="button"
                      onClick={() => setShowConjugationHint(true)}
                      className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      <span>Show Conjugation Hint</span>
                    </button>
                  ) : (
                    <div className="text-xs text-amber-300 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 animate-fadeIn">
                      💡 <strong>Hint:</strong> Pronoun <em>{curDrill.pronoun}</em> with verb <em>{curDrill.verb}</em> ({curDrill.category}). Look for irregular stem-change or modal endings!
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Fast-Pick Options */
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {shuffledOptions.map((optText, optIdx) => {
                  const isSelected = selectedOption === optText;
                  const isAnswered = selectedOption !== null;
                  const isCorrect = optText === curDrill.correctAnswer;

                  let btnStyle = "bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-200 active:scale-[0.98]";

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
                      onClick={() => handleSelectDrillOption(optText)}
                      className={`py-4 px-3 rounded-2xl border text-center font-bold text-base transition flex items-center justify-center gap-2 ${btnStyle}`}
                    >
                      <span>{optText}</span>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Immediate Rule Explanation */}
            {selectedOption !== null && (
              <div className="space-y-4 pt-2 animate-fadeIn">
                <div className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2.5 ${
                  isDrillCorrect
                    ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                    : "bg-rose-950/40 border-rose-500/40 text-rose-200"
                }`}>
                  <div className="font-extrabold flex items-center gap-1.5 text-sm sm:text-base">
                    {isDrillCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span>
                          {wasFullSentence
                            ? "Richtig! Ausgezeichnet! (Full sentence completed!)"
                            : "Richtig! (Correct!)"}
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        <span>
                          Falsch! Correct is: <strong className="underline text-white font-mono px-1">{curDrill.correctAnswer}</strong>
                        </span>
                      </>
                    )}
                  </div>

                  {wasFullSentence && isDrillCorrect && (
                    <div className="text-xs text-emerald-300 font-medium bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
                      Great practice! Typing the entire sentence strengthens active recall and sentence construction for the B1 exam.
                    </div>
                  )}

                  <p className="text-slate-300 leading-relaxed text-xs">
                    {curDrill.ruleExplanation}
                  </p>

                  {/* Completed Sentence Display */}
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono space-y-1">
                    <span className="text-slate-400 block text-[10px] uppercase font-sans font-bold">
                      Complete Sentence:
                    </span>
                    <span className="text-amber-300 font-bold text-sm block font-sans">
                      &ldquo;{curDrill.sentenceTemplate_de.replace("___", curDrill.correctAnswer)}&rdquo;
                    </span>
                    {showEnglish && (
                      <span className="text-slate-400 block text-[11px] font-sans">
                        &ldquo;{curDrill.sentenceTemplate_en}&rdquo;
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleNextDrill}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-2xl text-base shadow-lg shadow-amber-500/25 transition flex items-center justify-center gap-2"
                >
                  <span>Next Conjugation Drill</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── TAB 2: MODAL & VERB CONJUGATION REFERENCE TABLES ─── */}
      {activeTab === "VERB_TABLES" && (
        <div className="space-y-6">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "MODAL", label: "The 6 Modal Verbs" },
              { id: "AUXILIARY", label: "The 3 Auxiliaries (sein/haben/werden)" },
              { id: "STEM_CHANGE", label: "Stem-Changing Verbs" },
              { id: "REGULAR", label: "Regular Verbs" },
              { id: "ALL", label: "All Verbs Catalog" }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => {
                  setVerbFilter(f.id as any);
                  const list = f.id === "ALL" ? VERB_CONJUGATIONS_DATA : VERB_CONJUGATIONS_DATA.filter(v => v.type === f.id);
                  if (list.length > 0) setSelectedVerb(list[0]);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  verbFilter === f.id
                    ? "bg-amber-500 text-slate-950 shadow-md font-black"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Quick Select Verb Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {filteredVerbs.map((v) => {
              const isSelected = selectedVerb.verb === v.verb;
              return (
                <button
                  key={v.verb}
                  onClick={() => setSelectedVerb(v)}
                  className={`p-3 rounded-2xl border text-left transition ${
                    isSelected
                      ? "bg-amber-500/20 border-amber-500 text-amber-200 shadow-md shadow-amber-500/10 font-bold"
                      : "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300"
                  }`}
                >
                  <div className="text-[10px] text-slate-400 uppercase font-bold">{v.level} • {v.type}</div>
                  <div className="text-base sm:text-lg font-black text-white">{v.verb}</div>
                  <div className="text-[11px] text-slate-400 truncate">{v.infinitive_en}</div>
                </button>
              );
            })}
          </div>

          {/* Detailed Conjugation Card for Selected Verb */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-3xl font-black text-white">{selectedVerb.verb}</h3>
                  <AudioVoiceButton text={selectedVerb.verb} label="Listen" />
                </div>
                <p className="text-sm text-cyan-300 font-medium mt-0.5">{selectedVerb.infinitive_en}</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">{selectedVerb.ruleHighlight}</p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-2xl max-w-sm">
                <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4" />
                  <span>Exam Tip</span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                  {selectedVerb.type === "MODAL" 
                    ? "In main clauses, modal verb takes Position 2, while the action verb moves to the VERY END in infinitive."
                    : "Make sure you master 2nd person (du) and 3rd person singular (er/sie/es)."}
                </p>
              </div>
            </div>

            {/* 6-Person Conjugation Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Präsens (Present Tense) - Full 6-Person Conjugation
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { person: "ich", form: selectedVerb.conjugation.ich, label: "1st Person Singular (I)" },
                  { person: "du", form: selectedVerb.conjugation.du, label: "2nd Person Singular (you)" },
                  { person: "er / sie / es", form: selectedVerb.conjugation.er_sie_es, label: "3rd Person Singular (he/she/it)" },
                  { person: "wir", form: selectedVerb.conjugation.wir, label: "1st Person Plural (we)" },
                  { person: "ihr", form: selectedVerb.conjugation.ihr, label: "2nd Person Plural (you all)" },
                  { person: "sie / Sie", form: selectedVerb.conjugation.sie_Sie, label: "3rd Plural / Formal (they/You)" },
                ].map((row, rIdx) => (
                  <div key={rIdx} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                    <div className="text-[10px] text-slate-500 font-semibold">{row.label}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-xs font-bold">{row.person}:</span>
                      <strong className="text-white font-mono text-base font-black">{row.form}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Tense / Polite Subjunctive Form if available */}
            {selectedVerb.pastOrPolite && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  {selectedVerb.pastOrPolite.label}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-800/80 flex justify-between">
                    <span className="text-slate-400">ich:</span>
                    <strong className="text-white font-mono">{selectedVerb.pastOrPolite.ich}</strong>
                  </div>
                  <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-800/80 flex justify-between">
                    <span className="text-slate-400">du:</span>
                    <strong className="text-white font-mono">{selectedVerb.pastOrPolite.du}</strong>
                  </div>
                  <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-800/80 flex justify-between">
                    <span className="text-slate-400">er/sie/es:</span>
                    <strong className="text-white font-mono">{selectedVerb.pastOrPolite.er_sie_es}</strong>
                  </div>
                  <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-800/80 flex justify-between">
                    <span className="text-slate-400">wir:</span>
                    <strong className="text-white font-mono">{selectedVerb.pastOrPolite.wir}</strong>
                  </div>
                  <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-800/80 flex justify-between">
                    <span className="text-slate-400">ihr:</span>
                    <strong className="text-white font-mono">{selectedVerb.pastOrPolite.ihr}</strong>
                  </div>
                  <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-800/80 flex justify-between">
                    <span className="text-slate-400">sie/Sie:</span>
                    <strong className="text-white font-mono">{selectedVerb.pastOrPolite.sie_Sie}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Example Sentence with Audio */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-400 block tracking-wider">
                  Example B1 Sentence:
                </span>
                <div className="text-sm sm:text-base font-bold text-white">
                  {selectedVerb.exampleSentence.de}
                </div>
                {showEnglish || revealedEnglishItems[`verb-${selectedVerb.verb}`] ? (
                  <div className="text-xs text-slate-400 animate-fadeIn">
                    {selectedVerb.exampleSentence.en}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setRevealedEnglishItems(prev => ({ ...prev, [`verb-${selectedVerb.verb}`]: true }))}
                    className="text-[11px] text-slate-500 hover:text-amber-400 inline-flex items-center gap-1 transition"
                  >
                    <Eye className="w-3 h-3 text-slate-500" />
                    <span>Show English translation</span>
                  </button>
                )}
              </div>
              <AudioVoiceButton text={selectedVerb.exampleSentence.de} />
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 3: 0 → B1 LEVEL PATHWAY BROWSER ─── */}
      {activeTab === "PATHWAY" && (
        <div className="space-y-6">
          {/* Level Switcher (A0 -> A1 -> A2 -> B1) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {FOUNDATION_LEVELS_DATA.map((lvl) => {
              const isSelected = selectedLevel === lvl.level;
              return (
                <button
                  key={lvl.level}
                  onClick={() => setSelectedLevel(lvl.level)}
                  className={`p-4 rounded-2xl border text-left transition ${
                    isSelected
                      ? "bg-amber-500/20 border-amber-500 text-amber-200 shadow-md shadow-amber-500/10 font-bold"
                      : "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300"
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-wider text-amber-400 font-extrabold">{lvl.badge}</div>
                  <div className="text-base font-black text-white mt-0.5">{lvl.name}</div>
                  <div className="text-[11px] text-slate-400 truncate mt-1">{lvl.summary}</div>
                </button>
              );
            })}
          </div>

          {/* Level Detailed Topics */}
          <div className="space-y-6">
            {curLevelData.topics.map((topic) => (
              <div key={topic.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
                <div className="space-y-1.5 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-lg border border-amber-500/20">
                      {topic.level} Topic
                    </span>
                    <h3 className="text-xl font-black text-white">{topic.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {topic.description}
                  </p>

                  {/* Golden Key Rule Box */}
                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold flex items-start gap-2.5 mt-3">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">
                        Golden Rule:
                      </strong>
                      {topic.keyRule}
                    </div>
                  </div>
                </div>

                {/* Cheat Sheet Table */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Core Reference & Cheat Sheet:
                  </h4>
                  <div className="space-y-2">
                    {topic.cheatSheetItems.map((item, idx) => {
                      const itemKey = `${topic.id}-${idx}`;
                      const targetSec = item.targetSection;
                      const isNavigable = Boolean(targetSec && onNavigateToSection);
                      const isEnRevealed = showEnglish || revealedEnglishItems[itemKey] || targetSec === "CONJUNCTIONS";

                      return (
                        <div 
                          key={idx} 
                          onClick={() => {
                            if (targetSec && onNavigateToSection) {
                              onNavigateToSection(targetSec);
                            }
                          }}
                          className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            isNavigable
                              ? "bg-slate-950/90 hover:bg-slate-900 border-slate-800/90 hover:border-amber-500/80 cursor-pointer shadow-md hover:shadow-amber-500/10 group"
                              : "bg-slate-950 p-3.5 rounded-xl border border-slate-800/80"
                          }`}
                        >
                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="text-sm font-bold text-white flex items-center gap-2 flex-wrap">
                              <span>{item.de}</span>
                              {isNavigable && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
                                  Click to Open {targetSec === "WRITING" ? "Schreiben" : targetSec === "SPEAKING" ? "Sprechen" : targetSec === "READING" ? "Lesen" : targetSec} Lab ➔
                                </span>
                              )}
                            </div>

                            {/* English Translation: OFF by default */}
                            {isEnRevealed ? (
                              <div className="text-xs text-slate-400 animate-fadeIn leading-relaxed">
                                {item.en}
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setRevealedEnglishItems(prev => ({ ...prev, [itemKey]: true }));
                                }}
                                className="text-[11px] text-slate-500 hover:text-amber-400 flex items-center gap-1 transition mt-0.5"
                              >
                                <Eye className="w-3 h-3 text-slate-500" />
                                <span>English translation (Off - click to show)</span>
                              </button>
                            )}

                            {item.note && (
                              <span className="inline-block text-[10px] text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20 mt-1">
                                {item.note}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                            {isNavigable && (
                              <div className="flex items-center gap-1.5">
                                {item.secondaryTargetSection ? (
                                  <>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onNavigateToSection?.("READING");
                                      }}
                                      className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-bold text-xs border border-amber-500/30 transition flex items-center gap-1"
                                    >
                                      <span>Lesen Lab</span>
                                      <ArrowRight className="w-3 h-3" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onNavigateToSection?.("LISTENING");
                                      }}
                                      className="px-2.5 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-bold text-xs border border-cyan-500/30 transition flex items-center gap-1"
                                    >
                                      <span>Hören Lab</span>
                                      <ArrowRight className="w-3 h-3" />
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onNavigateToSection?.(targetSec!);
                                    }}
                                    className="px-3 py-1.5 rounded-xl bg-amber-500/15 group-hover:bg-amber-500 text-amber-300 group-hover:text-slate-950 font-bold text-xs border border-amber-500/30 transition flex items-center gap-1.5 shadow-sm"
                                  >
                                    <span>Practice in {targetSec === "WRITING" ? "Schreiben" : targetSec === "SPEAKING" ? "Sprechen" : targetSec === "READING" ? "Lesen" : targetSec === "CASES" ? "Cases & Articles" : targetSec} Lab</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                  </button>
                                )}
                              </div>
                            )}
                            <AudioVoiceButton text={item.de} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB 4: WILL I PASS B1 FROM ZERO? GUARANTEE ─── */}
      {activeTab === "PASS_GUARANTEE" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-300 rounded-full text-xs font-bold border border-amber-500/30">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Exam Pass Reality Check</span>
            </div>
            <h3 className="text-2xl font-black text-white">
              &ldquo;Can someone with zero German really pass B1 using this platform?&rdquo;
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              <strong>YES.</strong> German language exams (Goethe Zertifikat B1, TELC Deutsch B1, and DTZ) do not test whether you are a native speaker. They test whether you achieve the <strong>60% passing mark</strong> according to CEFR rubrics.
            </p>
          </div>

          {/* 4 Pillars of the 60% Passing Bar - Interactive Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              onClick={() => onNavigateToSection?.("WRITING")}
              className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-amber-500/80 hover:bg-slate-900 cursor-pointer transition shadow-md group space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-amber-400 font-extrabold uppercase">1. Schreiben (Writing)</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
              </div>
              <div className="text-lg font-black text-white">75%+ Guaranteed</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Examiners award points based on hitting 4 bullet points with polite greetings, connectors (weil, dass), and polite request formulas (&ldquo;Könnten Sie bitte...&rdquo;). Memorizing our 8 templates guarantees passing this module.
              </p>
              <div className="pt-1 text-[11px] font-bold text-amber-300 flex items-center gap-1">
                <span>Go to Schreiben Lab</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>

            <div 
              onClick={() => onNavigateToSection?.("SPEAKING")}
              className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-amber-500/80 hover:bg-slate-900 cursor-pointer transition shadow-md group space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-amber-400 font-extrabold uppercase">2. Sprechen (Speaking)</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
              </div>
              <div className="text-lg font-black text-white">70%+ Guaranteed</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                You do not need fancy vocabulary. Our 5-sentence picture description (&ldquo;Auf dem Bild sehe ich...&rdquo;) and joint planning formula (&ldquo;Wollen wir uns am Samstag treffen?&rdquo;) satisfies all examiner criteria.
              </p>
              <div className="pt-1 text-[11px] font-bold text-amber-300 flex items-center gap-1">
                <span>Go to Sprechen Sanctuary</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>

            <div 
              onClick={() => onNavigateToSection?.("GRAMMAR")}
              className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-amber-500/80 hover:bg-slate-900 cursor-pointer transition shadow-md group space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-amber-400 font-extrabold uppercase">3. Modal Verbs & Traps</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
              </div>
              <div className="text-lg font-black text-white">Zero Silly Traps</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                By mastering the &ldquo;nicht dürfen&rdquo; (strictly forbidden) vs &ldquo;nicht müssen&rdquo; (optional) distinction, you avoid the 4 to 6 trick questions that fail unprepared students in reading and listening.
              </p>
              <div className="pt-1 text-[11px] font-bold text-amber-300 flex items-center gap-1">
                <span>Go to Modal Verbs Lab</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>

            <div 
              onClick={() => onNavigateToSection?.("CITIZENSHIP")}
              className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-amber-500/80 hover:bg-slate-900 cursor-pointer transition shadow-md group space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-amber-400 font-extrabold uppercase">4. Citizenship Exam</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
              </div>
              <div className="text-lg font-black text-white">17 / 33 Pass Mark</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                You only need 17 out of 33 correct (51%). With our 10-question sprint batches and bilingual German/English cards, passing is virtually effortless.
              </p>
              <div className="pt-1 text-[11px] font-bold text-amber-300 flex items-center gap-1">
                <span>Go to Citizenship Section</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* Step-by-Step Study Guide for an A0 Learner */}
          <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl space-y-3">
            <div className="font-extrabold text-amber-300 text-sm flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Recommended Study Pathway for an Absolute Beginner:</span>
            </div>
            <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside">
              <li 
                onClick={() => setActiveTab("CONJUGATION_TRAINER")} 
                className="hover:text-amber-300 cursor-pointer transition"
              >
                <strong>Week 1 - Level 0 & 1 Foundations:</strong> Practice regular verb conjugations and the 3 auxiliary verbs (`sein`, `haben`, `werden`) using the interactive drill. ➔
              </li>
              <li 
                onClick={() => onNavigateToSection?.("GRAMMAR")} 
                className="hover:text-amber-300 cursor-pointer transition"
              >
                <strong>Week 2 - Level 2 Modal Verbs:</strong> Memorize the 6 modal verbs (`können`, `müssen`, `dürfen`, `sollen`, `wollen`, `möchten`) and practice the sentence bracket. ➔
              </li>
              <li 
                onClick={() => onNavigateToSection?.("WRITING")} 
                className="hover:text-amber-300 cursor-pointer transition"
              >
                <strong>Week 3 - B1 Writing & Speaking Blueprint:</strong> Memorize our 8 official letter templates in the Schreiben Lab and the 5-sentence picture presentation in the Sprechen Sanctuary. ➔
              </li>
              <li 
                onClick={() => onNavigateToSection?.("READING")} 
                className="hover:text-amber-300 cursor-pointer transition"
              >
                <strong>Week 4 - Exam Reading, Listening & Citizenship:</strong> Practice the 3 reading exam sets, listening audio tasks with speed control, and the 10-question citizenship sprints until you reach 100% mastery. ➔
              </li>
            </ol>

            <button
              onClick={() => setActiveTab("WEEKLY_ROADMAP")}
              className="mt-2 py-2 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center gap-2 shadow-md shadow-amber-500/20 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Open Interactive 4-Week ADHD Pathway (3-4h/wk)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ─── TAB 5: 4-WEEK ADHD PATHWAY (3-4 HOURS/WEEK) ─── */}
      {activeTab === "WEEKLY_ROADMAP" && (
        <AdhdStudyPathway onNavigateToSection={onNavigateToSection} />
      )}
    </div>
  );
};
