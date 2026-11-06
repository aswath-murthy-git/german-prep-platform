"use client";

import React, { useState, useMemo } from "react";
import { B1_WRITING_TEMPLATES, REDEMITTEL_LIBRARY } from "@/data/b1_writing_data";
import { WritingTemplate } from "@/types";
import { useUser } from "@/context/UserContext";
import { AudioVoiceButton } from "./AudioVoiceButton";
import { 
  PenTool, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  BookOpen, 
  Copy, 
  Check, 
  Award,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  RotateCcw,
  Eye,
  EyeOff,
  X,
  MousePointerClick
} from "lucide-react";
import confetti from "canvas-confetti";

export const B1WritingLab: React.FC = () => {
  const { profile, markWritingCompleted, toggleWritingCompleted, showEnglish, toggleShowEnglish } = useUser();
  const [selectedTemplate, setSelectedTemplate] = useState<WritingTemplate>(B1_WRITING_TEMPLATES[0]);
  const [activeMode, setActiveMode] = useState<"GUIDED" | "FREE_TYPING" | "MODEL">("GUIDED");
  const [revealedEnglish, setRevealedEnglish] = useState<Record<string, boolean>>({});

  const currentIndex = B1_WRITING_TEMPLATES.findIndex(t => t.id === selectedTemplate.id);
  const prevTemplate = currentIndex > 0 ? B1_WRITING_TEMPLATES[currentIndex - 1] : null;
  const nextTemplate = currentIndex < B1_WRITING_TEMPLATES.length - 1 ? B1_WRITING_TEMPLATES[currentIndex + 1] : null;
  const isCurrentTemplateCompleted = profile.completedWritingIds.includes(selectedTemplate.id);

  // Guided Mode state (drag & drop, tap to fill)
  const [userBlankAnswers, setUserBlankAnswers] = useState<Record<string, string>>({});
  const [blankFeedback, setBlankFeedback] = useState<Record<number, boolean | null>>({});
  const [activeBlankSlot, setActiveBlankSlot] = useState<number | null>(0);
  const [draggedWord, setDraggedWord] = useState<string | null>(null);

  const handleSwitchTemplate = (tmpl: WritingTemplate) => {
    setSelectedTemplate(tmpl);
    setUserBlankAnswers({});
    setBlankFeedback({});
    setActiveBlankSlot(0);
    setTypedText("");
  };

  // Jumbled word bank with distractors (never in 1-5 order)
  const jumbledWordBank = useMemo(() => {
    const rawList = [
      ...selectedTemplate.blankAnswers,
      ...(selectedTemplate.distractors || ["obwohl", "kann", "deshalb"])
    ];
    let seed = selectedTemplate.id.split("").reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 77);
    const shuffled = [...rawList];
    for (let i = shuffled.length - 1; i > 0; i--) {
      seed = (seed * 9301 + 49297) % 233280;
      const j = Math.floor((seed / 233280) * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [selectedTemplate]);

  // Track which words are placed in blank slots
  const usedWordsCount = useMemo(() => {
    const counts: Record<string, number> = {};
    Object.values(userBlankAnswers).forEach(w => {
      if (w) counts[w] = (counts[w] || 0) + 1;
    });
    return counts;
  }, [userBlankAnswers]);

  const handlePlaceWord = (slotIndex: number, word: string) => {
    setUserBlankAnswers(prev => ({ ...prev, [slotIndex]: word }));
    setBlankFeedback(prev => ({ ...prev, [slotIndex]: null }));

    // Auto-advance active slot to next empty slot
    const totalSlots = selectedTemplate.blankAnswers.length;
    let nextEmpty = -1;
    for (let i = 0; i < totalSlots; i++) {
      if (i !== slotIndex && !userBlankAnswers[i]) {
        nextEmpty = i;
        break;
      }
    }
    setActiveBlankSlot(nextEmpty !== -1 ? nextEmpty : null);
  };

  const handleTapChip = (word: string) => {
    if (activeBlankSlot !== null) {
      handlePlaceWord(activeBlankSlot, word);
      return;
    }
    const totalSlots = selectedTemplate.blankAnswers.length;
    let firstEmpty = -1;
    for (let i = 0; i < totalSlots; i++) {
      if (!userBlankAnswers[i]) {
        firstEmpty = i;
        break;
      }
    }
    if (firstEmpty !== -1) {
      handlePlaceWord(firstEmpty, word);
    }
  };

  const handleRemoveWord = (slotIndex: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setUserBlankAnswers(prev => {
      const copy = { ...prev };
      delete copy[slotIndex];
      return copy;
    });
    setBlankFeedback(prev => ({ ...prev, [slotIndex]: null }));
    setActiveBlankSlot(slotIndex);
  };

  const handleClearAllBlanks = () => {
    setUserBlankAnswers({});
    setBlankFeedback({});
    setActiveBlankSlot(0);
  };

  const handleWordClick = (rawWord: string) => {
    if (typeof window !== "undefined") {
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed && selection.toString().trim().length > 1) {
        return;
      }
    }
    const cleaned = rawWord.replace(/^[.,/#!$%^&*;:{}=\-_`~()""„“»«]+|[.,/#!$%^&*;:{}=\-_`~()""„“»«]+$/g, "").trim();
    if (cleaned.length >= 2 && typeof window !== "undefined" && window.__explainGermanText) {
      window.__explainGermanText(cleaned);
    }
  };

  // Free typing state
  const [typedText, setTypedText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  // Check blanks
  const handleCheckBlanks = () => {
    const feedback: Record<number, boolean> = {};
    let allCorrect = true;

    selectedTemplate.blankAnswers.forEach((ans, idx) => {
      const userVal = (userBlankAnswers[idx] || "").trim().toLowerCase();
      const expected = ans.toLowerCase();
      const isRight = userVal === expected;
      feedback[idx] = isRight;
      if (!isRight) allCorrect = false;
    });

    setBlankFeedback(feedback);

    if (allCorrect) {
      markWritingCompleted(selectedTemplate.id);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  // Real-time evaluation of free typing
  const wordCount = typedText.trim() ? typedText.trim().split(/\s+/).length : 0;
  const hasSalutation = /sehr geehrte|lieber|liebe/i.test(typedText);
  const hasReasonConnector = /weil|da|deshalb|obwohl|damit|wenn/i.test(typedText);
  const hasPoliteRequest = /könnten|können sie|bitte|wäre es möglich|würde mich freuen/i.test(typedText);
  const hasSignOff = /mit freundlichen grüßen|herzliche grüße|viele grüße|liebe grüße/i.test(typedText);

  const criteriaMetCount = [
    hasSalutation,
    hasReasonConnector,
    hasPoliteRequest,
    hasSignOff,
    wordCount >= 70
  ].filter(Boolean).length;

  const handleCopySolution = () => {
    navigator.clipboard.writeText(selectedTemplate.sampleSolution);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInsertRedemittel = (phrase: string) => {
    setTypedText(prev => prev + (prev.endsWith("\n") || prev === "" ? "" : " ") + phrase + " ");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-300 mb-2">
              <PenTool className="w-3.5 h-3.5 text-amber-400" />
              <span>B1 Schreiben & E-Mail Master Lab</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              B1 Writing <span className="text-amber-400">Formula & Exam Templates</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              In TELC and Goethe B1, examiners grade based on standard structure and connectors. Master these templates to pass the writing section with guaranteed points.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
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
            <span className="text-xs text-slate-400">Completed Templates:</span>
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-bold rounded-lg border border-amber-500/40 text-sm">
              {profile.completedWritingIds.length} / {B1_WRITING_TEMPLATES.length}
            </span>
          </div>
        </div>

        {/* Template Selector Pills in Header */}
        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-slate-800">
          {B1_WRITING_TEMPLATES.map((tmpl, idx) => {
            const isCompleted = profile.completedWritingIds.includes(tmpl.id);
            const isCurrent = selectedTemplate.id === tmpl.id;

            return (
              <button
                key={tmpl.id}
                onClick={() => handleSwitchTemplate(tmpl)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  isCurrent
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">{idx + 1}.</span>
                {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{tmpl.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── PERSISTENT STICKY TEMPLATE NAVIGATION & SWITCHER BAR ─── */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3 sticky top-16 sm:top-20 z-20 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: Template Counter & Quick Selector Dropdown */}
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="px-3 py-1 bg-amber-500/10 text-amber-400 font-mono font-black text-xs rounded-xl border border-amber-500/30 shrink-0">
              Letter {currentIndex + 1} of {B1_WRITING_TEMPLATES.length}
            </div>

            <div className="relative flex-1 min-w-0">
              <select
                value={selectedTemplate.id}
                onChange={(e) => {
                  const found = B1_WRITING_TEMPLATES.find(t => t.id === e.target.value);
                  if (found) handleSwitchTemplate(found);
                }}
                className="w-full bg-slate-950 border border-slate-700 hover:border-amber-500/60 text-slate-100 text-xs sm:text-sm font-bold rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500 transition cursor-pointer truncate"
              >
                {B1_WRITING_TEMPLATES.map((tmpl, idx) => {
                  const isCompleted = profile.completedWritingIds.includes(tmpl.id);
                  return (
                    <option key={tmpl.id} value={tmpl.id} className="bg-slate-950 text-slate-100">
                      {isCompleted ? "✓ [Mastered] " : `[Letter ${idx + 1}/${B1_WRITING_TEMPLATES.length}] `}
                      {tmpl.title} ({tmpl.examType})
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Right: Prev & Next Buttons */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <button
              type="button"
              disabled={!prevTemplate}
              onClick={() => prevTemplate && handleSwitchTemplate(prevTemplate)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-950 text-slate-300 text-xs font-bold transition flex items-center gap-1 border border-slate-800"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev Letter</span>
            </button>

            <button
              type="button"
              disabled={!nextTemplate}
              onClick={() => nextTemplate && handleSwitchTemplate(nextTemplate)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:hover:bg-slate-950 disabled:bg-slate-950 disabled:text-slate-500 text-slate-950 font-black text-xs transition flex items-center gap-1 shadow-md shadow-amber-500/20"
            >
              <span>Next Letter</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Horizontal Letter Pills with Mastered Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-slate-800/80">
          {B1_WRITING_TEMPLATES.map((tmpl, idx) => {
            const isCompleted = profile.completedWritingIds.includes(tmpl.id);
            const isCurrent = selectedTemplate.id === tmpl.id;
            return (
              <button
                key={tmpl.id}
                onClick={() => handleSwitchTemplate(tmpl)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
                  isCurrent
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black"
                    : isCompleted
                    ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-950"
                    : "bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                <span>{idx + 1}.</span>
                <span className="truncate max-w-[120px] sm:max-w-[160px]">{tmpl.title.split("(")[0].trim()}</span>
                {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Exam Prompt & Instructions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-slate-800 text-amber-400 text-xs font-bold rounded-md border border-slate-700">
                {selectedTemplate.examType}
              </span>
              <span className="text-xs text-slate-400 font-medium">Target: ~80 Wörter</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">{selectedTemplate.title}</h3>
              <p className="text-sm text-slate-200 font-medium bg-slate-950 p-3 rounded-xl border border-slate-800">
                {selectedTemplate.scenario}
              </p>
              {showEnglish || revealedEnglish[`scenario-${selectedTemplate.id}`] ? (
                <p className="text-xs text-amber-300/80 bg-amber-500/5 p-2 rounded-lg border border-amber-500/10 animate-fadeIn">
                  {selectedTemplate.scenario_en}
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => setRevealedEnglish(prev => ({ ...prev, [`scenario-${selectedTemplate.id}`]: true }))}
                  className="text-[11px] text-slate-500 hover:text-amber-400 flex items-center gap-1 transition"
                >
                  <Eye className="w-3 h-3 text-slate-500" />
                  <span>English scenario (Off - click to show)</span>
                </button>
              )}
            </div>

            {/* Bullet Points to Address */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Leitpunkte (Required Points):
              </h4>
              <ul className="space-y-2">
                {selectedTemplate.bulletPoints.map((bp, idx) => (
                  <li key={idx} className="text-xs bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300 space-y-0.5">
                    <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{bp}</span>
                    </div>
                    {showEnglish || revealedEnglish[`bp-${selectedTemplate.id}-${idx}`] ? (
                      <div className="text-[11px] text-slate-400 pl-5 animate-fadeIn">
                        {selectedTemplate.bulletPoints_en[idx]}
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setRevealedEnglish(prev => ({ ...prev, [`bp-${selectedTemplate.id}-${idx}`]: true }))}
                        className="text-[10px] text-slate-500 hover:text-amber-400 pl-5 flex items-center gap-1 transition"
                      >
                        <Eye className="w-2.5 h-2.5 text-slate-500" />
                        <span>English hint</span>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Vocabulary Hints */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                High-Yield Connectors & Vocabulary:
              </h4>
              <div className="grid grid-cols-1 gap-1.5">
                {selectedTemplate.keyVocab.map((kv, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                    <span className="font-semibold text-amber-300">{kv.de}</span>
                    <span className="text-slate-400 text-[11px]">{kv.en}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Redemittel Cheat Shelf */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>1-Click Redemittel Inserts (Tap to add):</span>
            </h4>
            
            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">Anrede (Salutation):</span>
                <div className="flex flex-wrap gap-1.5">
                  {REDEMITTEL_LIBRARY.salutations.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleInsertRedemittel(item.de)}
                      className="text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-amber-300 px-2.5 py-1 rounded-lg border border-slate-800 transition text-left"
                      title={item.en}
                    >
                      + {item.de}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">Grund / Einleitung (Opening):</span>
                <div className="flex flex-wrap gap-1.5">
                  {REDEMITTEL_LIBRARY.openings.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleInsertRedemittel(item.de)}
                      className="text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-amber-300 px-2.5 py-1 rounded-lg border border-slate-800 transition text-left"
                      title={item.en}
                    >
                      + {item.de}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">Höfliche Bitte (Request):</span>
                <div className="flex flex-wrap gap-1.5">
                  {REDEMITTEL_LIBRARY.politeRequests.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleInsertRedemittel(item.de)}
                      className="text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-amber-300 px-2.5 py-1 rounded-lg border border-slate-800 transition text-left"
                      title={item.en}
                    >
                      + {item.de}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">Schluss & Gruß (Sign-off):</span>
                <div className="flex flex-wrap gap-1.5">
                  {REDEMITTEL_LIBRARY.signOffs.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleInsertRedemittel(item.de)}
                      className="text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-amber-300 px-2.5 py-1 rounded-lg border border-slate-800 transition text-left"
                      title={item.en}
                    >
                      + {item.de}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Editor Modes */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            {/* Mode Switcher Tabs */}
            <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-800">
              <button
                onClick={() => setActiveMode("GUIDED")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeMode === "GUIDED"
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <span>Guided Fill-In-The-Blanks</span>
              </button>

              <button
                onClick={() => setActiveMode("FREE_TYPING")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeMode === "FREE_TYPING"
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <span>Free Typing Simulator</span>
              </button>

              <button
                onClick={() => setActiveMode("MODEL")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeMode === "MODEL"
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <span>Model Answer (Full Solution)</span>
              </button>
            </div>

            {/* MODE 1: GUIDED FILL-IN-THE-BLANKS */}
            {activeMode === "GUIDED" && (
              <div className="space-y-5">
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300 flex items-center justify-between gap-2">
                  <span>
                    <strong>Interactive Tap & Drag:</strong> Tap or drag words from the jumbled word bank into the slots. Distractors are included to test your grammar accuracy.
                  </span>
                  {Object.keys(userBlankAnswers).length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearAllBlanks}
                      className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-700 text-[11px] font-bold shrink-0 transition"
                    >
                      Reset Blanks ↺
                    </button>
                  )}
                </div>

                {/* Email Template Body with Interactive Slots */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-xs sm:text-sm leading-relaxed text-slate-200 whitespace-pre-wrap space-y-4">
                  {selectedTemplate.fillInTheBlankTemplate.split("\n\n").map((para, pIdx) => {
                    const parts = para.split(/\[BLANK_(\d+)\]/);
                    return (
                      <p key={pIdx} className="leading-loose">
                        {parts.map((segment, sIdx) => {
                          if (sIdx % 2 === 1) {
                            const blankIndex = parseInt(segment, 10) - 1;
                            const assignedWord = userBlankAnswers[blankIndex];
                            const isCorrect = blankFeedback[blankIndex];

                            if (assignedWord) {
                              return (
                                <span
                                  key={sIdx}
                                  onClick={() => handleRemoveWord(blankIndex)}
                                  className={`inline-flex items-center gap-1.5 mx-1 px-3 py-1 rounded-xl border text-xs font-bold transition shadow-sm cursor-pointer select-none ${
                                    isCorrect === true
                                      ? "bg-emerald-950/70 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/50"
                                      : isCorrect === false
                                      ? "bg-rose-950/70 border-rose-500 text-rose-200 ring-1 ring-rose-500/50"
                                      : "bg-amber-500/20 border-amber-500/70 text-amber-200 hover:bg-amber-500/30"
                                  }`}
                                  title="Click to remove word and return to Word Bank"
                                >
                                  <span>{assignedWord}</span>
                                  <X className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
                                </span>
                              );
                            }

                            // Empty slot target
                            const isActiveSlot = activeBlankSlot === blankIndex;
                            return (
                              <button
                                key={sIdx}
                                type="button"
                                onClick={() => setActiveBlankSlot(blankIndex)}
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  e.dataTransfer.dropEffect = "move";
                                }}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  const dropped = e.dataTransfer.getData("text/plain") || draggedWord;
                                  if (dropped) handlePlaceWord(blankIndex, dropped);
                                  setDraggedWord(null);
                                }}
                                className={`inline-flex items-center justify-center mx-1 px-3 py-1 rounded-xl border-2 border-dashed text-xs font-mono transition min-w-[110px] select-none ${
                                  isActiveSlot
                                    ? "border-amber-400 bg-amber-500/15 text-amber-300 ring-2 ring-amber-400/40 animate-pulse font-bold"
                                    : "border-slate-700 hover:border-slate-500 bg-slate-900/80 text-slate-400 hover:text-slate-200"
                                }`}
                                title="Click to select this slot, or drag a word here"
                              >
                                <span>[Slot {blankIndex + 1}]</span>
                              </button>
                            );
                          }
                          return <span key={sIdx}>{segment}</span>;
                        })}
                      </p>
                    );
                  })}
                </div>

                {/* Jumbled Word Bank with Distractor Traps */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Word Bank ({jumbledWordBank.length} jumbled options with traps):
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <MousePointerClick className="w-3.5 h-3.5 text-amber-400" />
                      <span>Tap word to place or drag onto slot</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {jumbledWordBank.map((word, wIdx) => {
                      const isPlaced = (usedWordsCount[word] || 0) > 0;
                      return (
                        <button
                          key={wIdx}
                          type="button"
                          draggable={!isPlaced}
                          onDragStart={(e) => {
                            e.dataTransfer.setData("text/plain", word);
                            setDraggedWord(word);
                          }}
                          onClick={() => handleTapChip(word)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition flex items-center gap-1.5 shadow-sm active:scale-95 ${
                            isPlaced
                              ? "bg-slate-900 text-slate-500 border border-slate-800 opacity-40 cursor-not-allowed line-through"
                              : "bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-slate-700 hover:border-amber-400 cursor-grab active:cursor-grabbing hover:shadow-amber-500/20"
                          }`}
                          title={isPlaced ? "Word already placed in a slot (click slot to remove)" : "Tap to fill active slot, or drag into slot"}
                        >
                          <span>{word}</span>
                          {isPlaced && <Check className="w-3 h-3 text-slate-500" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCheckBlanks}
                      className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm shadow-md transition active:scale-95"
                    >
                      Check My Answers ✦
                    </button>

                    <button
                      type="button"
                      onClick={handleClearAllBlanks}
                      className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-850 text-slate-300 rounded-xl border border-slate-700 text-xs font-bold transition"
                    >
                      Clear All
                    </button>
                  </div>

                  {Object.values(blankFeedback).some(v => v === false) && (
                    <span className="text-xs text-rose-400 font-semibold bg-rose-950/40 px-3 py-1.5 rounded-xl border border-rose-500/40">
                      Some words need correction. Check grammar connectors!
                    </span>
                  )}

                  {Object.keys(blankFeedback).length > 0 && Object.values(blankFeedback).every(v => v === true) && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-500/40">
                        <CheckCircle2 className="w-4 h-4" />
                        100% Correct!
                      </span>
                      {nextTemplate && (
                        <button
                          type="button"
                          onClick={() => handleSwitchTemplate(nextTemplate)}
                          className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center gap-1 shadow-md shadow-amber-500/20"
                        >
                          <span>Next Letter</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* MODE 2: FREE TYPING SIMULATOR */}
            {activeMode === "FREE_TYPING" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Type your email response below based on the scenario:</span>
                  <span className={`font-bold ${wordCount >= 70 ? "text-emerald-400" : "text-amber-400"}`}>
                    Word count: {wordCount} / 80 words
                  </span>
                </div>

                <textarea
                  rows={12}
                  placeholder={`Sehr geehrte Frau Müller,\n\nich schreibe Ihnen, weil...\n\nMit freundlichen Grüßen,\n[Ihr Name]`}
                  value={typedText}
                  onChange={(e) => setTypedText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm font-sans text-slate-200 focus:outline-none focus:border-amber-500/60 transition leading-relaxed resize-y"
                />

                {/* Real-time Examiner Checklist */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Examiner Auto-Checklist:
                    </h5>
                    <span className="text-xs font-bold text-amber-400">
                      {criteriaMetCount} / 5 Criteria Met
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className={`p-2 rounded-lg border flex items-center gap-2 ${
                      hasSalutation ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300" : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}>
                      {hasSalutation ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <div className="w-4 h-4 rounded-full border border-slate-700" />}
                      <span>Formal / Informal Salutation</span>
                    </div>

                    <div className={`p-2 rounded-lg border flex items-center gap-2 ${
                      hasReasonConnector ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300" : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}>
                      {hasReasonConnector ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <div className="w-4 h-4 rounded-full border border-slate-700" />}
                      <span>B1 Reason Connector (weil, deshalb...)</span>
                    </div>

                    <div className={`p-2 rounded-lg border flex items-center gap-2 ${
                      hasPoliteRequest ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300" : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}>
                      {hasPoliteRequest ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <div className="w-4 h-4 rounded-full border border-slate-700" />}
                      <span>Polite Request (Könnten Sie...)</span>
                    </div>

                    <div className={`p-2 rounded-lg border flex items-center gap-2 ${
                      hasSignOff ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300" : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}>
                      {hasSignOff ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <div className="w-4 h-4 rounded-full border border-slate-700" />}
                      <span>Closing Sign-off (Mit freundlichen Grüßen)</span>
                    </div>

                    <div className={`p-2 rounded-lg border flex items-center gap-2 sm:col-span-2 ${
                      wordCount >= 70 ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300" : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}>
                      {wordCount >= 70 ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <div className="w-4 h-4 rounded-full border border-slate-700" />}
                      <span>Word Count Threshold (70-100 words recommended)</span>
                    </div>
                  </div>
                </div>

                {criteriaMetCount >= 4 && (
                  <div className="space-y-2 pt-1">
                    {isCurrentTemplateCompleted ? (
                      <div className="p-3 bg-emerald-950/70 border border-emerald-500/50 rounded-xl flex items-center justify-between text-xs">
                        <div className="text-emerald-300 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Writing Scenario Mastered!</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleWritingCompleted(selectedTemplate.id)}
                          className="px-2.5 py-1 bg-slate-900 hover:bg-rose-950/60 hover:text-rose-300 text-slate-300 rounded-lg border border-slate-700 text-xs font-semibold transition flex items-center gap-1"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Undo / Mark Incomplete</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          toggleWritingCompleted(selectedTemplate.id);
                          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
                        }}
                        className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-md transition"
                      >
                        Mark This Writing Scenario as Mastered ✦
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* MODE 3: FULL MODEL SOLUTION */}
            {activeMode === "MODEL" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AudioVoiceButton text={selectedTemplate.sampleSolution} label="Listen to German Audio" />
                    <button
                      onClick={handleCopySolution}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-full border border-slate-700 transition"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied!" : "Copy Text"}</span>
                    </button>
                  </div>

                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    B1 Score: 100% Points Guarantee
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* German Original */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                        German Original (Musterlösung):
                      </span>
                      <span className="text-[10px] text-amber-300/80 font-mono">
                        Tap word or highlight sentence
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans space-y-2 select-text">
                      {selectedTemplate.sampleSolution.split("\n\n").map((para, pIdx) => (
                        <p key={pIdx}>
                          {para.split(/(\s+)/).map((token, tIdx) => {
                            if (/^\s+$/.test(token)) return <span key={tIdx}>{token}</span>;
                            return (
                              <span
                                key={tIdx}
                                onClick={() => handleWordClick(token)}
                                className="hover:text-amber-300 hover:bg-amber-500/20 rounded px-0.5 transition cursor-pointer"
                                title="Click to explain with AI Tutor"
                              >
                                {token}
                              </span>
                            );
                          })}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* English Translation: OFF by default */}
                  {showEnglish || revealedEnglish[`solution-${selectedTemplate.id}`] ? (
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 animate-fadeIn">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        English Translation:
                      </span>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                        {selectedTemplate.sampleSolution_en}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 flex flex-col justify-between gap-3">
                      <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                          English Translation:
                        </span>
                        <p className="text-xs text-slate-500 mt-1">
                          English is toggled OFF by default for German immersion.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setRevealedEnglish(prev => ({ ...prev, [`solution-${selectedTemplate.id}`]: true }))}
                        className="self-start px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-amber-300 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Reveal English Solution</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Memorized Mastered Toggle State */}
                <div className="pt-2">
                  {isCurrentTemplateCompleted ? (
                    <div className="p-3.5 bg-emerald-950/70 border border-emerald-500/60 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>Template Mastered & Saved in Your Profile!</span>
                          </div>
                          <div className="text-[11px] text-emerald-300/80">
                            Recorded in your B1 Exam Readiness score (20% weight).
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={() => toggleWritingCompleted(selectedTemplate.id)}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-950/60 hover:border-rose-500 text-slate-300 hover:text-rose-300 border border-slate-700 text-xs font-bold transition flex items-center gap-1.5"
                          title="Click to undo if marked accidentally"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Undo / Mark Incomplete</span>
                        </button>

                        {nextTemplate && (
                          <button
                            type="button"
                            onClick={() => handleSwitchTemplate(nextTemplate)}
                            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-1 shadow-md shadow-amber-500/20"
                          >
                            <span>Next Letter</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        toggleWritingCompleted(selectedTemplate.id);
                        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
                      }}
                      className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm transition shadow-md flex items-center justify-center gap-2 active:scale-95"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>I Have Memorized This Template ✦ Mark as Mastered</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── BOTTOM LETTER NAVIGATION FOOTER ─── */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {prevTemplate ? (
            <button
              type="button"
              onClick={() => handleSwitchTemplate(prevTemplate)}
              className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 text-xs font-bold transition flex items-center gap-2 border border-slate-800"
            >
              <ChevronLeft className="w-4 h-4 text-amber-400" />
              <span>← Letter {currentIndex}: {prevTemplate.title.split("(")[0].trim()}</span>
            </button>
          ) : (
            <span className="text-xs text-slate-500 font-medium">First Letter Template</span>
          )}
        </div>

        <div className="text-xs text-slate-400 font-mono text-center">
          Template {currentIndex + 1} of {B1_WRITING_TEMPLATES.length}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {nextTemplate ? (
            <button
              type="button"
              onClick={() => handleSwitchTemplate(nextTemplate)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-2 shadow-md shadow-amber-500/20"
            >
              <span>Letter {currentIndex + 2}: {nextTemplate.title.split("(")[0].trim()} →</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-xs text-emerald-400 font-bold">All 8 Letters Reached!</span>
          )}
        </div>
      </div>
    </div>
  );
};
