"use client";

import React, { useState, useMemo } from "react";
import { useUser } from "@/context/UserContext";
import confetti from "canvas-confetti";
import { 
  Search, 
  Filter, 
  Volume2, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle2, 
  AlertCircle, 
  Keyboard, 
  MousePointerClick, 
  Flame, 
  Sparkles,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Check
} from "lucide-react";
import { 
  GERMAN_VERBS_MASTER_DATA, 
  VerbMasterTopic, 
  VerbMasterExample, 
  VerbMasterPracticeItem 
} from "@/data/german_verbs_master_data";

interface VerbMasterLibraryProps {
  onSelectTopicForLesson?: (topicId: string) => void;
}

export const VerbMasterLibrary: React.FC<VerbMasterLibraryProps> = ({
  onSelectTopicForLesson
}) => {
  const { theme } = useUser();
  const isDark = theme === "dark";

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<"ALL" | "A1" | "A2" | "B1">("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>("v-kennen-wissen");

  // Per-topic inline drill workout state
  const [drillStates, setDrillStates] = useState<Record<string, {
    index: number;
    typedInput: string;
    submitted: boolean;
    isCorrect: boolean | null;
    wasFullSentence: boolean;
    streak: number;
    mode: "type" | "click";
    showHint: boolean;
  }>>({});

  // Audio speech player
  const handlePlayAudio = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Text normalization for typing input
  const normalizeText = (str: string) =>
    str
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()""„“»«!?]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  // Categories list
  const categoryOptions = [
    { id: "ALL", label: "All Verbs (26 Topics)" },
    { id: "PRESENT", label: "Präsens & Vokalwechsel" },
    { id: "PAST", label: "Perfekt & Präteritum" },
    { id: "MODAL", label: "Modalverben" },
    { id: "FUTURE", label: "Zukunft (Futur)" },
    { id: "SUBJUNCTIVE", label: "Konjunktiv II" },
    { id: "SPECIAL", label: "Spezial (Kennen/Wissen, Imperativ, Wenn)" }
  ];

  // Filtered topics list
  const filteredTopics = useMemo(() => {
    return GERMAN_VERBS_MASTER_DATA.filter((topic) => {
      // Level filter
      if (selectedLevel !== "ALL" && topic.level !== selectedLevel) return false;
      // Category filter
      if (selectedCategory !== "ALL" && topic.category !== selectedCategory) return false;
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = topic.title.toLowerCase().includes(query);
        const inDesc = topic.description.toLowerCase().includes(query);
        const inFormula = topic.shortFormula.toLowerCase().includes(query);
        const inExamples = topic.examples.some(
          (e) => e.de.toLowerCase().includes(query) || e.en.toLowerCase().includes(query)
        );
        return inTitle || inDesc || inFormula || inExamples;
      }
      return true;
    });
  }, [searchQuery, selectedLevel, selectedCategory]);

  // Total examples count
  const totalExamplesCount = useMemo(() => {
    return GERMAN_VERBS_MASTER_DATA.reduce((acc, t) => acc + t.examples.length, 0);
  }, []);

  // Drill state getter
  const getTopicDrillState = (topicId: string) => {
    return drillStates[topicId] || {
      index: 0,
      typedInput: "",
      submitted: false,
      isCorrect: null,
      wasFullSentence: false,
      streak: 0,
      mode: "type",
      showHint: false
    };
  };

  // Check inline drill answer
  const handleCheckDrill = (topic: VerbMasterTopic) => {
    const curState = getTopicDrillState(topic.id);
    const item = topic.practiceDrill[curState.index % topic.practiceDrill.length];
    if (!curState.typedInput.trim()) return;

    const cleanInput = normalizeText(curState.typedInput);
    let isMatch = false;
    let isFull = false;

    // 1. Check acceptable answers
    for (const acc of item.acceptableAnswers) {
      if (cleanInput === normalizeText(acc)) {
        isMatch = true;
        break;
      }
    }

    // 2. Check full reconstructed sentence
    if (!isMatch) {
      for (const acc of item.acceptableAnswers) {
        const fullExpected = normalizeText(`${item.sentenceBefore} ${acc} ${item.sentenceAfter}`);
        if (cleanInput === fullExpected) {
          isMatch = true;
          isFull = true;
          break;
        }
      }
    }

    const newStreak = isMatch ? curState.streak + 1 : 0;
    if (isMatch && newStreak % 3 === 0) {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    }

    setDrillStates((prev) => ({
      ...prev,
      [topic.id]: {
        ...curState,
        submitted: true,
        isCorrect: isMatch,
        wasFullSentence: isFull,
        streak: newStreak
      }
    }));

    if (isMatch) {
      const fullSentenceToSpeak = `${item.sentenceBefore} ${item.correct} ${item.sentenceAfter}`
        .replace(/\s+/g, " ")
        .trim();
      handlePlayAudio(fullSentenceToSpeak);
    }
  };

  // Next inline drill item
  const handleNextDrill = (topic: VerbMasterTopic) => {
    const curState = getTopicDrillState(topic.id);
    const nextIdx = (curState.index + 1) % topic.practiceDrill.length;
    setDrillStates((prev) => ({
      ...prev,
      [topic.id]: {
        ...curState,
        index: nextIdx,
        typedInput: "",
        submitted: false,
        isCorrect: null,
        wasFullSentence: false,
        showHint: false
      }
    }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* ─── BANNER & SEARCH HEADER ─── */}
      <div className={`p-6 sm:p-7 rounded-3xl border shadow-sm space-y-5 transition-colors duration-200 ${
        isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Complete Reference & Example Bank
              </span>
              <span className={`text-xs font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                A1 to B1 Exam Verbs
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              German Verb Master Library
            </h2>
            <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              Explore all <strong>26 essential German verb rules</strong> with <strong>{totalExamplesCount}+ authentic audio example sentences</strong>, full conjugation matrices, exam traps to avoid, and interactive sentence typing workouts.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className={`p-3 rounded-2xl border text-center ${
              isDark ? "bg-slate-950 border-slate-800" : "bg-purple-50 border-purple-200"
            }`}>
              <div className="text-lg font-black text-purple-400">26</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Verb Rules</div>
            </div>
            <div className={`p-3 rounded-2xl border text-center ${
              isDark ? "bg-slate-950 border-slate-800" : "bg-purple-50 border-purple-200"
            }`}>
              <div className="text-lg font-black text-amber-400">{totalExamplesCount}+</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Examples</div>
            </div>
            <div className={`p-3 rounded-2xl border text-center ${
              isDark ? "bg-slate-950 border-slate-800" : "bg-purple-50 border-purple-200"
            }`}>
              <div className="text-lg font-black text-emerald-400">78</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Drills</div>
            </div>
          </div>
        </div>

        {/* Live Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across 26 verb rules, German keywords, or English concepts (e.g. kennen, -ieren, modal, future, sein, wenn)..."
            className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-xs sm:text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-purple-500 transition ${
              isDark
                ? "bg-slate-950 border-slate-800 text-white placeholder-slate-500"
                : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400"
            }`}
          />
        </div>

        {/* Level & Category Filters */}
        <div className="space-y-3 pt-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Level Filters */}
            <div className={`inline-flex p-1 rounded-2xl border ${
              isDark ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"
            }`}>
              {(["ALL", "A1", "A2", "B1"] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                    selectedLevel === lvl
                      ? "bg-purple-600 text-white shadow-xs"
                      : isDark
                      ? "text-slate-400 hover:text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <span className="text-xs font-semibold text-slate-400">
              Showing <strong>{filteredTopics.length}</strong> of 26 Topics
            </span>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categoryOptions.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition ${
                  selectedCategory === cat.id
                    ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                    : isDark
                    ? "bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                    : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── TOPICS ACCORDION CARDS ─── */}
      <div className="space-y-4">
        {filteredTopics.length === 0 ? (
          <div className={`p-10 rounded-3xl border text-center space-y-3 ${
            isDark ? "bg-slate-900/60 border-slate-800 text-slate-400" : "bg-white border-slate-200 text-slate-600"
          }`}>
            <AlertCircle className="w-8 h-8 mx-auto text-amber-400" />
            <div className="text-base font-bold">No matching verb topics found</div>
            <p className="text-xs">Try searching for keywords like &ldquo;kennen&rdquo;, &ldquo;haben&rdquo;, &ldquo;modal&rdquo;, or &ldquo;past&rdquo;.</p>
            <button
              type="button"
              onClick={() => { setSearchQuery(""); setSelectedLevel("ALL"); setSelectedCategory("ALL"); }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredTopics.map((topic) => {
            const isExpanded = expandedTopicId === topic.id;
            const drillState = getTopicDrillState(topic.id);
            const curDrillItem = topic.practiceDrill[drillState.index % topic.practiceDrill.length];

            return (
              <div
                key={topic.id}
                className={`rounded-3xl border transition-all duration-200 shadow-xs ${
                  isExpanded
                    ? isDark
                      ? "bg-slate-900 border-purple-500/50 shadow-lg shadow-purple-950/20"
                      : "bg-white border-purple-300 shadow-md shadow-purple-100"
                    : isDark
                    ? "bg-slate-900/80 border-slate-800 hover:border-slate-700"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* ── Card Header ── */}
                <div
                  onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-lg text-[11px] font-black uppercase tracking-wider ${
                        topic.level === "A1"
                          ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/30"
                          : topic.level === "A2"
                          ? "bg-blue-950/60 text-blue-300 border border-blue-500/30"
                          : "bg-purple-950/60 text-purple-300 border border-purple-500/30"
                      }`}>
                        {topic.level}
                      </span>

                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                        isDark ? "bg-slate-950 text-slate-400 border border-slate-800" : "bg-slate-100 text-slate-600"
                      }`}>
                        {topic.category}
                      </span>

                      <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {topic.examples.length} Audio Examples
                      </span>
                    </div>

                    <h3 className={`text-lg sm:text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                      {topic.title}
                    </h3>

                    {/* Formula Pill */}
                    <div className={`font-mono text-xs px-3 py-1.5 rounded-xl border inline-block max-w-full truncate ${
                      isDark ? "bg-slate-950 border-slate-800 text-purple-300" : "bg-purple-50/60 border-purple-200 text-purple-800"
                    }`}>
                      {topic.shortFormula}
                    </div>
                  </div>

                  {/* Header Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayAudio(`${topic.title}. ${topic.description}`);
                      }}
                      className={`p-2.5 rounded-xl border transition ${
                        isDark ? "bg-slate-950 border-slate-800 hover:bg-slate-800 text-purple-400" : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-purple-600"
                      }`}
                      title="Listen to topic summary"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <div className={`p-2.5 rounded-xl border flex items-center gap-1 text-xs font-bold transition ${
                      isExpanded
                        ? "bg-purple-600 text-white border-purple-600"
                        : isDark
                        ? "bg-slate-950 border-slate-800 text-slate-300"
                        : "bg-slate-100 border-slate-200 text-slate-700"
                    }`}>
                      <span>{isExpanded ? "Collapse" : "Explore"}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* ── Expanded Content ── */}
                {isExpanded && (
                  <div className={`p-5 sm:p-7 border-t space-y-6 animate-fadeIn ${
                    isDark ? "border-slate-800/80 bg-slate-950/40" : "border-slate-100 bg-slate-50/30"
                  }`}>
                    {/* Concept Description */}
                    <div className="space-y-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-purple-400">Concept Overview</div>
                      <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                        {topic.description}
                      </p>
                    </div>

                    {/* Golden Rule & Trap Box */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Golden Rule */}
                      <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                        isDark ? "bg-amber-950/30 border-amber-500/30 text-amber-200" : "bg-amber-50 border-amber-200 text-amber-900"
                      }`}>
                        <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <div className="text-xs font-bold uppercase tracking-wider text-amber-400">Golden Rule</div>
                          <div className="text-xs leading-relaxed">{topic.goldenRule}</div>
                        </div>
                      </div>

                      {/* Trap to Avoid */}
                      <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                        isDark ? "bg-rose-950/30 border-rose-500/30 text-rose-200" : "bg-rose-50 border-rose-200 text-rose-900"
                      }`}>
                        <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <div className="text-xs font-bold uppercase tracking-wider text-rose-400">Exam Trap to Avoid</div>
                          <div className="text-xs leading-relaxed">{topic.trapToAvoid}</div>
                        </div>
                      </div>
                    </div>

                    {/* Conjugation Table (if available) */}
                    {topic.conjugationTable && (
                      <div className="space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-purple-400">Conjugation Blueprint Matrix</div>
                        <div className={`overflow-x-auto rounded-2xl border ${isDark ? "border-slate-800" : "border-slate-200"}`}>
                          <table className="w-full text-xs sm:text-sm text-left">
                            <thead className={`font-bold border-b ${
                              isDark ? "bg-slate-950 text-slate-300 border-slate-800" : "bg-slate-100 text-slate-700 border-slate-200"
                            }`}>
                              <tr>
                                {topic.conjugationTable.headers.map((h, idx) => (
                                  <th key={idx} className="p-3">{h}</th>
                                ))}
                                <th className="p-3">Listen</th>
                              </tr>
                            </thead>
                            <tbody className={`divide-y font-medium ${
                              isDark ? "divide-slate-800 text-slate-300" : "divide-slate-100 text-slate-800"
                            }`}>
                              {topic.conjugationTable.rows.map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-purple-500/5 transition">
                                  <td className="p-3 font-bold text-purple-400">{row.pronoun}</td>
                                  <td className="p-3 font-mono font-black text-purple-300">{row.form1}</td>
                                  <td className="p-3">{row.example}</td>
                                  <td className="p-3 text-[11px] text-slate-400">{row.tip}</td>
                                  <td className="p-3">
                                    <button
                                      type="button"
                                      onClick={() => handlePlayAudio(`${row.pronoun}: ${row.form1}. ${row.example}`)}
                                      className="p-1 hover:text-purple-400 transition"
                                      title="Listen to row"
                                    >
                                      <Volume2 className="w-3.5 h-3.5" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* ── Extensive Example Bank (8-10 Sentences) ── */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Authentic Example Bank ({topic.examples.length} Sentences)</span>
                        </div>
                        <span className="text-[11px] text-slate-400">Click speaker icon to hear native pronunciation</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {topic.examples.map((ex, eIdx) => (
                          <div
                            key={eIdx}
                            className={`p-3.5 rounded-2xl border space-y-1.5 transition hover:shadow-sm ${
                              isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className={`text-xs sm:text-sm font-black leading-relaxed ${isDark ? "text-white" : "text-slate-900"}`}>
                                &ldquo;{ex.de}&rdquo;
                              </div>
                              <button
                                type="button"
                                onClick={() => handlePlayAudio(ex.de)}
                                className="p-1 text-purple-400 hover:text-purple-300 transition shrink-0"
                                title="Listen to example"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="text-xs text-slate-400">
                              {ex.en}
                            </div>

                            <div className="pt-1 flex items-center justify-between text-[10px]">
                              <span className="px-2 py-0.5 rounded-md font-bold bg-purple-950/60 text-purple-300 border border-purple-500/30">
                                {ex.highlight}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ── Interactive Practice Workout (3 Sentences) ── */}
                    {topic.practiceDrill.length > 0 && curDrillItem && (
                      <div className={`p-5 rounded-2xl border space-y-4 ${
                        isDark ? "bg-slate-900/90 border-slate-800" : "bg-purple-50/50 border-purple-200"
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                            <Keyboard className="w-3.5 h-3.5" />
                            <span>Active Sentence Workout ({drillState.index + 1} of {topic.practiceDrill.length})</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {drillState.streak > 1 && (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-500/30 animate-pulse">
                                <Flame className="w-3 h-3" />
                                {drillState.streak} Streak
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Sentence display with fill blank */}
                        <div className={`p-4 rounded-xl border text-center text-sm sm:text-base font-black leading-relaxed ${
                          isDark ? "bg-slate-950 border-slate-800 text-white" : "bg-white border-purple-200 text-slate-900"
                        }`}>
                          &ldquo;{curDrillItem.sentenceBefore}
                          <span className={`inline-block mx-2 px-3 py-1 border-2 border-dashed rounded-xl min-w-[70px] ${
                            isDark ? "bg-slate-900 border-purple-400 text-purple-300" : "bg-purple-50 border-purple-400 text-purple-700"
                          }`}>
                            {drillState.typedInput || "___"}
                          </span>
                          {curDrillItem.sentenceAfter}&rdquo;
                        </div>

                        {/* Mode Toggle & Input */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setDrillStates((prev) => ({
                                  ...prev,
                                  [topic.id]: { ...drillState, mode: "type" }
                                }));
                              }}
                              className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 border transition ${
                                drillState.mode === "type"
                                  ? "bg-purple-600 text-white border-purple-600"
                                  : isDark
                                  ? "bg-slate-950 border-slate-800 text-slate-400"
                                  : "bg-white border-slate-200 text-slate-600"
                              }`}
                            >
                              <Keyboard className="w-3 h-3" />
                              <span>Type Answer</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setDrillStates((prev) => ({
                                  ...prev,
                                  [topic.id]: { ...drillState, mode: "click" }
                                }));
                              }}
                              className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 border transition ${
                                drillState.mode === "click"
                                  ? "bg-purple-600 text-white border-purple-600"
                                  : isDark
                                  ? "bg-slate-950 border-slate-800 text-slate-400"
                                  : "bg-white border-slate-200 text-slate-600"
                              }`}
                            >
                              <MousePointerClick className="w-3 h-3" />
                              <span>Fast-Pick Chips</span>
                            </button>
                          </div>

                          {drillState.mode === "type" ? (
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={drillState.typedInput}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setDrillStates((prev) => ({
                                    ...prev,
                                    [topic.id]: { ...drillState, typedInput: val }
                                  }));
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleCheckDrill(topic);
                                  }
                                }}
                                placeholder="Type the missing verb form or the full sentence..."
                                className={`flex-1 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-purple-500 transition ${
                                  isDark
                                    ? "bg-slate-950 border-slate-700 text-white placeholder-slate-500"
                                    : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                                }`}
                              />
                              <button
                                type="button"
                                onClick={() => handleCheckDrill(topic)}
                                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition shadow-xs active:scale-95"
                              >
                                Check ✦
                              </button>
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {curDrillItem.options.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => {
                                    setDrillStates((prev) => ({
                                      ...prev,
                                      [topic.id]: { ...drillState, typedInput: opt }
                                    }));
                                  }}
                                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
                                    drillState.typedInput === opt
                                      ? "bg-purple-600 text-white border-purple-600"
                                      : isDark
                                      ? "bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-800"
                                      : "bg-white hover:bg-purple-50 text-slate-800 border-slate-200"
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                              {drillState.typedInput && !drillState.submitted && (
                                <button
                                  type="button"
                                  onClick={() => handleCheckDrill(topic)}
                                  className="px-4 py-2 bg-purple-600 text-white font-bold text-xs rounded-xl"
                                >
                                  Verify ✦
                                </button>
                              )}
                            </div>
                          )}

                          {/* Feedback Banner */}
                          {drillState.submitted && drillState.isCorrect && (
                            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500 text-emerald-200 text-xs font-bold space-y-1 animate-fadeIn">
                              <div className="flex items-center gap-1.5 text-emerald-300 font-extrabold">
                                <CheckCircle2 className="w-4 h-4" />
                                {drillState.wasFullSentence
                                  ? "🎉 Ausgezeichnet! Perfekter vollständiger Satz getippt!"
                                  : "✓ Richtig!"}
                              </div>
                              <p className="font-normal text-emerald-100">{curDrillItem.explanation}</p>
                            </div>
                          )}

                          {drillState.submitted && drillState.isCorrect === false && (
                            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500 text-rose-200 text-xs font-bold space-y-1 animate-fadeIn">
                              <div className="flex items-center gap-1.5 text-rose-300 font-extrabold">
                                <AlertCircle className="w-4 h-4" />
                                ✕ Falsch! Erwartet: &ldquo;{curDrillItem.correct}&rdquo;
                              </div>
                              <p className="font-normal text-rose-100">{curDrillItem.explanation}</p>
                            </div>
                          )}

                          {/* Next Drill Sentence */}
                          {drillState.submitted && (
                            <div className="text-center pt-2">
                              <button
                                type="button"
                                onClick={() => handleNextDrill(topic)}
                                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
                              >
                                Next Practice Sentence ({((drillState.index + 1) % topic.practiceDrill.length) + 1} of {topic.practiceDrill.length}) →
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

