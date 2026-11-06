"use client";

import React, { useState } from "react";
import { B1_READING_PARTS } from "@/data/b1_reading_data";
import { ReadingExamPart } from "@/types";
import { useUser } from "@/context/UserContext";
import { AudioVoiceButton } from "./AudioVoiceButton";
import { 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Sparkles, 
  Award, 
  Languages, 
  Eye, 
  EyeOff,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  HelpCircle
} from "lucide-react";
import confetti from "canvas-confetti";
import { ViobeanExplanationCard, ExplanationPassageItem } from "./ViobeanExplanationCard";

export const B1ReadingLab: React.FC = () => {
  const { profile, updateProfile, showEnglish: globalShowEnglish } = useUser();
  const [activeSet, setActiveSet] = useState<number>(1);
  const [selectedPart, setSelectedPart] = useState<ReadingExamPart>(B1_READING_PARTS[0]);

  // Answer state for current part
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [localShowEnglish, setShowEnglishText] = useState<boolean>(false);
  const showEnglishText = localShowEnglish || globalShowEnglish;
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [showDetailedViobeanCard, setShowDetailedViobeanCard] = useState<boolean>(false);

  const isPartCompleted = profile.completedReadingIds?.includes(selectedPart.id);

  const sets = [
    { num: 1, title: "Exam Set 1: Goethe / TELC Standard", count: 5 },
    { num: 2, title: "Exam Set 2: Housing & City Life", count: 5 },
    { num: 3, title: "Exam Set 3: Work, Health & DTZ", count: 5 },
    { num: 4, title: "Exam Set 4: Job Center & Contracts", count: 5 },
    { num: 5, title: "Exam Set 5: Tenancy & House Rules", count: 5 }
  ];

  const currentSetParts = B1_READING_PARTS.filter(p => (p.setNumber || 1) === activeSet);

  const curReadingIndex = currentSetParts.findIndex(p => p.id === selectedPart.id);
  const prevReadingPart = curReadingIndex > 0 ? currentSetParts[curReadingIndex - 1] : null;
  const nextReadingPart = curReadingIndex < currentSetParts.length - 1 ? currentSetParts[curReadingIndex + 1] : null;

  const handleSelectSet = (setNum: number) => {
    setActiveSet(setNum);
    const firstInSet = B1_READING_PARTS.find(p => (p.setNumber || 1) === setNum);
    if (firstInSet) {
      setSelectedPart(firstInSet);
      setSelectedAnswers({});
      setShowExplanation({});
    }
  };

  const handlePickOption = (qId: string, optIdx: number, correctIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIdx }));
    setShowExplanation(prev => ({ ...prev, [qId]: true }));

    // Check if all questions in this part are answered correctly
    const updated = { ...selectedAnswers, [qId]: optIdx };
    const allAnswered = selectedPart.questions.every(q => updated[q.id] !== undefined);
    const allCorrect = selectedPart.questions.every(q => updated[q.id] === q.correct);

    if (allAnswered && allCorrect && !isPartCompleted) {
      const newCompleted = [...(profile.completedReadingIds || []), selectedPart.id];
      updateProfile({ completedReadingIds: newCompleted });
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  };

  const resetCurrentPart = () => {
    setSelectedAnswers({});
    setShowExplanation({});
  };

  const explanationPassages: ExplanationPassageItem[] = selectedPart.questions.map((q, idx) => {
    const letters: Array<"A" | "B" | "C"> = ["A", "B", "C"];
    const correctLetter = letters[q.correct] || "A";
    return {
      questionNumber: idx + 1,
      questionText: q.question_de,
      options: q.options.map((opt, oIdx) => ({
        key: letters[oIdx],
        text: opt.de,
        isCorrect: oIdx === q.correct
      })),
      userAnswer: selectedAnswers[q.id] !== undefined ? letters[selectedAnswers[q.id]] : undefined,
      whyNot: q.options
        .map((opt, oIdx) => ({
          option: letters[oIdx],
          reason: oIdx !== q.correct 
            ? `Text contradiction: The passage does not support '${opt.de}'.` 
            : ""
        }))
        .filter(w => w.option !== correctLetter),
      whyCorrect: {
        option: correctLetter,
        explanation: q.keywordHint || `Direct text correspondence: matches '${q.options[q.correct]?.de}'.`
      },
      keyPassage: {
        inText: selectedPart.text_de.split("\n\n")[0]?.slice(0, 120) || selectedPart.text_de.slice(0, 120),
        inOption: q.options[q.correct]?.de || "",
        synonymPair: q.keywordHint || "Signal vocabulary alignment"
      },
      examinerTip: q.trapAlert || "Watch out for subtle negative words (kein, nicht, kaum) and frequency adverbs."
    };
  });

  const handleWordClick = (rawWord: string) => {
    // If the user was dragging to select multiple words, don't trigger single-word click
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

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-300 mb-2">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>B1 Leseverstehen (Reading Comprehension Master Lab)</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              B1 Reading <span className="text-amber-400">3 Complete Model Exam Sets (15 Tasks)</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Covers 3 full mock exams across all 5 official parts (Blog, Press Article, Classified Ads Matching, Opinions Ja/Nein, and Regulations). Learn the exact signal-word matching method to pass with 60%+ points.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Mastered Reading Parts:</span>
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-bold rounded-lg border border-amber-500/40 text-sm">
              {(profile.completedReadingIds || []).length} / {B1_READING_PARTS.length} Tasks Mastered
            </span>
          </div>
        </div>

        {/* Exam Set Switcher */}
        <div className="mt-5 pt-4 border-t border-slate-800">
          <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Select Model Exam Set:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sets.map((s) => {
              const isSetSelected = activeSet === s.num;
              const completedCount = B1_READING_PARTS.filter(p => (p.setNumber || 1) === s.num && profile.completedReadingIds?.includes(p.id)).length;
              return (
                <button
                  key={s.num}
                  onClick={() => handleSelectSet(s.num)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
                    isSetSelected
                      ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20"
                      : "bg-slate-950/70 hover:bg-slate-800 text-slate-300 border-slate-800"
                  }`}
                >
                  <span>{s.title}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSetSelected ? "bg-slate-950/20 text-slate-950 font-black" : "bg-slate-800 text-amber-300"}`}>
                    {completedCount}/{s.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Part Tabs Selector */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-800/60">
          {currentSetParts.map((part) => {
            const isDone = profile.completedReadingIds?.includes(part.id);
            const isSelected = selectedPart.id === part.id;

            return (
              <button
                key={part.id}
                onClick={() => {
                  setSelectedPart(part);
                  setSelectedAnswers({});
                  setShowExplanation({});
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  isSelected
                    ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-black"
                    : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
                }`}
              >
                <span>Teil {part.partNumber}</span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── PERSISTENT STICKY READING TASK SWITCHER ─── */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3 sticky top-16 sm:top-20 z-20 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="px-3 py-1 bg-amber-500/10 text-amber-400 font-mono font-black text-xs rounded-xl border border-amber-500/30 shrink-0">
              Task {curReadingIndex + 1} of {currentSetParts.length}
            </div>

            <div className="flex items-center gap-1.5 flex-1 min-w-0 overflow-x-auto">
              {currentSetParts.map((part) => {
                const isDone = profile.completedReadingIds?.includes(part.id);
                const isSelected = selectedPart.id === part.id;
                return (
                  <button
                    key={part.id}
                    onClick={() => {
                      setSelectedPart(part);
                      setSelectedAnswers({});
                      setShowExplanation({});
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                      isSelected
                        ? "bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20"
                        : isDone
                        ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40"
                        : "bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800"
                    }`}
                  >
                    <span>Teil {part.partNumber}: {part.title.split("(")[0].trim()}</span>
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <button
              type="button"
              disabled={!prevReadingPart}
              onClick={() => {
                if (prevReadingPart) {
                  setSelectedPart(prevReadingPart);
                  setSelectedAnswers({});
                  setShowExplanation({});
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-950 text-slate-300 text-xs font-bold transition flex items-center gap-1 border border-slate-800"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev Task</span>
            </button>

            <button
              type="button"
              disabled={!nextReadingPart}
              onClick={() => {
                if (nextReadingPart) {
                  setSelectedPart(nextReadingPart);
                  setSelectedAnswers({});
                  setShowExplanation({});
                }
              }}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:hover:bg-slate-950 disabled:bg-slate-950 disabled:text-slate-500 text-slate-950 font-black text-xs transition flex items-center gap-1 shadow-md shadow-amber-500/20"
            >
              <span>Next Task</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Part Header & Pass Hack Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-slate-800 text-amber-400 text-xs font-bold rounded-md border border-slate-700">
                {selectedPart.examSource}
              </span>
              <span className="text-xs text-slate-400 font-medium">{selectedPart.textType}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-1.5">{selectedPart.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{selectedPart.description}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <AudioVoiceButton text={selectedPart.text_de} label="Text anhören" />
            <button
              onClick={() => setShowEnglishText(!localShowEnglish)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                showEnglishText
                  ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/40"
                  : "bg-slate-950 text-slate-400 border-slate-800"
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{showEnglishText ? "English Translation ON" : "Show English"}</span>
            </button>
          </div>
        </div>

        {/* Pass Hack Box */}
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300 space-y-0.5">
          <strong>💡 Minimum Passing Criteria Hack: </strong>
          <span>{selectedPart.passHack}</span>
        </div>
      </div>

      {/* ─── PERSISTENT STICKY READING TASK SWITCHER ─── */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3 sticky top-16 sm:top-20 z-20 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="px-3 py-1 bg-amber-500/10 text-amber-400 font-mono font-black text-xs rounded-xl border border-amber-500/30 shrink-0">
              Task {curReadingIndex + 1} of {currentSetParts.length}
            </div>

            <div className="flex items-center gap-1.5 flex-1 min-w-0 overflow-x-auto">
              {currentSetParts.map((part) => {
                const isDone = profile.completedReadingIds?.includes(part.id);
                const isSelected = selectedPart.id === part.id;
                return (
                  <button
                    key={part.id}
                    onClick={() => {
                      setSelectedPart(part);
                      setSelectedAnswers({});
                      setShowExplanation({});
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                      isSelected
                        ? "bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20"
                        : isDone
                        ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40"
                        : "bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800"
                    }`}
                  >
                    <span>Teil {part.partNumber}: {part.title.split("(")[0].trim()}</span>
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <button
              type="button"
              disabled={!prevReadingPart}
              onClick={() => {
                if (prevReadingPart) {
                  setSelectedPart(prevReadingPart);
                  setSelectedAnswers({});
                  setShowExplanation({});
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-950 text-slate-300 text-xs font-bold transition flex items-center gap-1 border border-slate-800"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev Task</span>
            </button>

            <button
              type="button"
              disabled={!nextReadingPart}
              onClick={() => {
                if (nextReadingPart) {
                  setSelectedPart(nextReadingPart);
                  setSelectedAnswers({});
                  setShowExplanation({});
                }
              }}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:hover:bg-slate-950 disabled:bg-slate-950 disabled:text-slate-500 text-slate-950 font-black text-xs transition flex items-center gap-1 shadow-md shadow-amber-500/20"
            >
              <span>Next Task</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Reading Text & Questions Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: The Reading Text */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Original Lesetext (German):
              </span>
              <span className="text-[11px] text-slate-500">Scan for matching keywords</span>
            </div>

            {/* Interactive Reading Instruction Banner */}
            <div className="flex items-center justify-between text-xs text-amber-300 bg-amber-500/10 px-3 py-2 rounded-xl border border-amber-500/20">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Tap any word (e.g. <strong>Arbeitszeitmodelle</strong>) or select a sentence for instant AI Tutor explanation & audio.</span>
              </span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-sans text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap select-text space-y-3">
              {selectedPart.text_de.split("\n\n").map((paragraph, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {paragraph.split(/(\s+)/).map((token, tIdx) => {
                    if (/^\s+$/.test(token)) {
                      return <span key={tIdx}>{token}</span>;
                    }
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

            {showEnglishText && (
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 font-sans text-xs sm:text-sm text-slate-400 leading-relaxed whitespace-pre-wrap">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                  English Side-by-Side Reference:
                </span>
                {selectedPart.text_en}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Comprehension Questions */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Exam Comprehension Questions ({selectedPart.questions.length})
              </span>
              <button
                onClick={resetCurrentPart}
                className="text-xs text-amber-400 hover:underline font-medium"
              >
                Reset Answers
              </button>
            </div>

            <div className="space-y-6">
              {selectedPart.questions.map((q, idx) => {
                const userChoice = selectedAnswers[q.id];
                const isAnswered = userChoice !== undefined;
                const isCorrect = userChoice === q.correct;

                return (
                  <div key={q.id} className="space-y-3 pb-5 border-b border-slate-800/80 last:border-b-0">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 text-xs font-bold flex items-center justify-center border border-slate-700">
                          {idx + 1}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-white">
                          {q.question_de}
                        </h4>
                      </div>
                      <p className="text-xs text-amber-300/80 pl-7">{q.question_en}</p>
                    </div>

                    {/* Options list */}
                    <div className="grid grid-cols-1 gap-2 pl-7">
                      {q.options.map((opt, optIdx) => {
                        const isPicked = userChoice === optIdx;
                        const isThisCorrect = optIdx === q.correct;

                        let optStyle = "bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-200";

                        if (isAnswered) {
                          if (isThisCorrect) {
                            optStyle = "bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold";
                          } else if (isPicked && !isThisCorrect) {
                            optStyle = "bg-rose-950/70 border-rose-500 text-rose-200 font-semibold";
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handlePickOption(q.id, optIdx, q.correct)}
                            className={`p-3 rounded-xl border text-left text-xs sm:text-sm flex items-start gap-2.5 transition ${optStyle}`}
                          >
                            <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 border ${
                              isAnswered && isThisCorrect
                                ? "bg-emerald-500 text-slate-950 border-emerald-400"
                                : isAnswered && isPicked && !isThisCorrect
                                ? "bg-rose-500 text-white border-rose-400"
                                : "bg-slate-900 border-slate-700 text-slate-400"
                            }`}>
                              {["A", "B", "C"][optIdx]}
                            </span>
                            <div>
                              <div>{opt.de}</div>
                              {showEnglishText && (
                                <div className="text-[11px] text-slate-400 mt-0.5">{opt.en}</div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback & Keyword Signal Explanation */}
                    {isAnswered && (
                      <div className="pl-7 pt-1 space-y-1.5 animate-fadeIn">
                        <div className={`p-3 rounded-xl border text-xs space-y-1 ${
                          isCorrect ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200" : "bg-rose-950/40 border-rose-500/40 text-rose-200"
                        }`}>
                          <div className="flex items-center gap-1.5 font-bold">
                            {isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-400" />
                            )}
                            <span>{isCorrect ? "Richtig! (Correct!)" : "Falsch! (Check the signal words)"}</span>
                          </div>
                          <p className="text-slate-200 font-medium">{q.keywordHint}</p>
                          <p className="text-slate-400 text-[11px]">{q.keywordHint_en}</p>
                        </div>

                        {q.trapAlert && (
                          <div className="p-2.5 bg-amber-950/30 border border-amber-500/30 rounded-xl text-[11px] text-amber-300 flex items-start gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span>{q.trapAlert}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Viobean Detailed Breakdown Trigger */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowDetailedViobeanCard(!showDetailedViobeanCard)}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 border shadow-xs ${
                  showDetailedViobeanCard
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{showDetailedViobeanCard ? "Hide Key Passage Table" : "Show Viobean Key Passage & Distractor Analysis ✦"}</span>
              </button>
            </div>

            {/* Viobean Detailed Explanation Card View */}
            {showDetailedViobeanCard && (
              <div className="pt-2 animate-fadeIn">
                <ViobeanExplanationCard
                  readingText={selectedPart.text_de}
                  passageItems={explanationPassages}
                  onClose={() => setShowDetailedViobeanCard(false)}
                />
              </div>
            )}

            {/* Completion Status */}
            {selectedPart.questions.every(q => selectedAnswers[q.id] === q.correct) && (
              <div className="p-4 bg-emerald-950/60 border border-emerald-500/60 rounded-xl text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                <h5 className="font-extrabold text-white text-sm">Teil {selectedPart.partNumber} Mastered!</h5>
                <p className="text-xs text-emerald-300">
                  All questions answered correctly. You scored 100% on this reading module.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── PERSISTENT STICKY READING TASK SWITCHER ─── */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3 sticky top-16 sm:top-20 z-20 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="px-3 py-1 bg-amber-500/10 text-amber-400 font-mono font-black text-xs rounded-xl border border-amber-500/30 shrink-0">
              Task {curReadingIndex + 1} of {currentSetParts.length}
            </div>

            <div className="flex items-center gap-1.5 flex-1 min-w-0 overflow-x-auto">
              {currentSetParts.map((part) => {
                const isDone = profile.completedReadingIds?.includes(part.id);
                const isSelected = selectedPart.id === part.id;
                return (
                  <button
                    key={part.id}
                    onClick={() => {
                      setSelectedPart(part);
                      setSelectedAnswers({});
                      setShowExplanation({});
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                      isSelected
                        ? "bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20"
                        : isDone
                        ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40"
                        : "bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800"
                    }`}
                  >
                    <span>Teil {part.partNumber}: {part.title.split("(")[0].trim()}</span>
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <button
              type="button"
              disabled={!prevReadingPart}
              onClick={() => {
                if (prevReadingPart) {
                  setSelectedPart(prevReadingPart);
                  setSelectedAnswers({});
                  setShowExplanation({});
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-950 text-slate-300 text-xs font-bold transition flex items-center gap-1 border border-slate-800"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev Task</span>
            </button>

            <button
              type="button"
              disabled={!nextReadingPart}
              onClick={() => {
                if (nextReadingPart) {
                  setSelectedPart(nextReadingPart);
                  setSelectedAnswers({});
                  setShowExplanation({});
                }
              }}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:hover:bg-slate-950 disabled:bg-slate-950 disabled:text-slate-500 text-slate-950 font-black text-xs transition flex items-center gap-1 shadow-md shadow-amber-500/20"
            >
              <span>Next Task</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
