import os

output_path = "/Users/testy/Desktop/code/german-prep-platform/src/components/FullMockExamArena.tsx"

content = '''"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useUser } from "@/context/UserContext";
import confetti from "canvas-confetti";
import { 
  Award, 
  Clock, 
  BookOpen, 
  Volume2, 
  PenTool, 
  Mic, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Play, 
  Pause, 
  Check, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  ChevronRight,
  Eye,
  EyeOff
} from "lucide-react";
import { 
  ALL_MULTI_LEVEL_MOCK_EXAMS, 
  FullMockExamData, 
  MockExamBoard, 
  MockExamLevel 
} from "@/data/mock_exams_multi_level_data";

interface FullMockExamArenaProps {
  onBackToHub?: () => void;
  initialBoard?: MockExamBoard;
  initialLevel?: MockExamLevel;
  initialSet?: number;
}

type ArenaTab = "READING" | "LISTENING" | "WRITING" | "SPEAKING" | "REPORT";

export const FullMockExamArena: React.FC<FullMockExamArenaProps> = ({
  onBackToHub,
  initialBoard = "TELC",
  initialLevel = "B1",
  initialSet = 1
}) => {
  const { theme } = useUser();
  const isDark = theme === "dark";

  // Selectors
  const [selectedBoard, setSelectedBoard] = useState<MockExamBoard>(initialBoard);
  const [selectedLevel, setSelectedLevel] = useState<MockExamLevel>(initialLevel);
  const [selectedSet, setSelectedSet] = useState<number>(initialSet);

  // Active exam object
  const currentExam: FullMockExamData = useMemo(() => {
    const found = ALL_MULTI_LEVEL_MOCK_EXAMS.find(
      e => e.board === selectedBoard && e.level === selectedLevel && e.setNumber === selectedSet
    );
    return found || ALL_MULTI_LEVEL_MOCK_EXAMS[0];
  }, [selectedBoard, selectedLevel, selectedSet]);

  // Tab & Mode
  const [activeTab, setActiveTab] = useState<ArenaTab>("READING");
  const [examMode, setExamMode] = useState<"TIMED" | "PRACTICE">("TIMED");

  // Timer state
  const totalSecondsAllocated = currentExam.durationMinutes.total * 60;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(totalSecondsAllocated);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  useEffect(() => {
    setSecondsRemaining(currentExam.durationMinutes.total * 60);
    setIsTimerActive(examMode === "TIMED");
  }, [currentExam, examMode]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isTimerActive && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isTimerActive) {
      setIsTimerActive(false);
      alert("Exam time has expired! Generating your official score report.");
      setActiveTab("REPORT");
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerActive, secondsRemaining]);

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const remainingSeconds = secs % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}s`;
    }
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // User Answers
  const [readingAnswers, setReadingAnswers] = useState<Record<string, string>>({});
  const [listeningAnswers, setListeningAnswers] = useState<Record<string, string>>({});
  const [showListeningTranscripts, setShowListeningTranscripts] = useState<Record<string, boolean>>({});
  const [userWritingText, setUserWritingText] = useState<string>("");
  const [showModelWriting, setShowModelWriting] = useState<boolean>(false);
  const [speakingSelfScore, setSpeakingSelfScore] = useState<boolean>(false);

  // Reset answers when exam changes
  const handleExamChange = (board: MockExamBoard, level: MockExamLevel, setNum: number) => {
    setSelectedBoard(board);
    setSelectedLevel(level);
    setSelectedSet(setNum);
    setReadingAnswers({});
    setListeningAnswers({});
    setShowListeningTranscripts({});
    setUserWritingText("");
    setShowModelWriting(false);
    setSpeakingSelfScore(false);
    setActiveTab("READING");
  };

  // Audio speech synthesis
  const handlePlayAudio = (text: string, rate: number = 0.95) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Writing word count
  const writingWordCount = useMemo(() => {
    return userWritingText.trim() ? userWritingText.trim().split(/\\s+/).length : 0;
  }, [userWritingText]);

  // Scoring Calculation
  const scoreReport = useMemo(() => {
    // 1. Reading Score
    let readingEarned = 0;
    currentExam.readingSections.forEach(section => {
      section.questions.forEach(q => {
        const correctOpt = q.options.find(o => o.isCorrect);
        if (correctOpt && readingAnswers[q.id] === correctOpt.key) {
          readingEarned += q.points;
        }
      });
    });

    // 2. Listening Score
    let listeningEarned = 0;
    currentExam.listeningSections.forEach(section => {
      section.questions.forEach(q => {
        const correctOpt = q.options.find(o => o.isCorrect);
        if (correctOpt && listeningAnswers[q.id] === correctOpt.key) {
          listeningEarned += q.points;
        }
      });
    });

    // 3. Writing Score
    const targetWords = currentExam.writingTasks[0]?.minWords || 80;
    const writingMax = currentExam.scoringRules.writingMax;
    let writingEarned = 0;
    if (writingWordCount >= targetWords) {
      writingEarned = writingMax * 0.9; // Base 90% for meeting length
      if (userWritingText.toLowerCase().includes("weil") || userWritingText.toLowerCase().includes("dass")) {
        writingEarned = writingMax; // 100% with connectors
      }
    } else if (writingWordCount >= targetWords * 0.6) {
      writingEarned = writingMax * 0.65;
    } else if (writingWordCount > 10) {
      writingEarned = writingMax * 0.35;
    }

    // 4. Speaking Score
    const speakingMax = currentExam.scoringRules.speakingMax;
    const speakingEarned = speakingSelfScore ? speakingMax : 0;

    const totalEarned = readingEarned + listeningEarned + writingEarned + speakingEarned;
    const totalMax = currentExam.scoringRules.totalMax;
    const percentage = Math.round((totalEarned / totalMax) * 100);

    // Pass Determination
    let isPassed = false;
    if (currentExam.board === "GOETHE" && currentExam.level === "B1") {
      // Goethe B1: 60 points in each module
      const readPass = (readingEarned / currentExam.scoringRules.readingMax) >= 0.6;
      const listenPass = (listeningEarned / currentExam.scoringRules.listeningMax) >= 0.6;
      const writePass = (writingEarned / currentExam.scoringRules.writingMax) >= 0.6;
      const speakPass = (speakingEarned / currentExam.scoringRules.speakingMax) >= 0.6;
      isPassed = readPass && listenPass && writePass && speakPass;
    } else if (currentExam.board === "TELC" && currentExam.level === "B1") {
      // telc B1: 135 in Written (Reading+Listening+Writing) + 45 in Oral
      const writtenTotal = readingEarned + listeningEarned + writingEarned;
      isPassed = writtenTotal >= 135 && speakingEarned >= 45;
    } else {
      isPassed = percentage >= 60;
    }

    // Grade assignment
    let gradeLabel = "Nicht bestanden";
    if (isPassed) {
      if (percentage >= 90) gradeLabel = "Sehr gut (1)";
      else if (percentage >= 80) gradeLabel = "Gut (2)";
      else if (percentage >= 70) gradeLabel = "Befriedigend (3)";
      else gradeLabel = "Ausreichend (4)";
    }

    return {
      readingEarned,
      listeningEarned,
      writingEarned,
      speakingEarned,
      totalEarned,
      totalMax,
      percentage,
      isPassed,
      gradeLabel
    };
  }, [currentExam, readingAnswers, listeningAnswers, userWritingText, writingWordCount, speakingSelfScore]);

  const handleFinishExam = () => {
    setActiveTab("REPORT");
    setIsTimerActive(false);
    if (scoreReport.isPassed) {
      try {
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-16 animate-fadeIn">
      {/* ─── ARENA HEADER & CONTROLS ─── */}
      <div className={`p-6 rounded-3xl border shadow-xl relative overflow-hidden transition-all duration-300 ${
        isDark 
          ? "bg-slate-900/90 border-slate-800 text-white" 
          : "bg-white border-slate-200 text-slate-900"
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-black uppercase tracking-wider bg-purple-600 text-white">
                {currentExam.board} {currentExam.level}
              </span>
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-black uppercase tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/30">
                Mock Exam Set {currentExam.setNumber} of 4
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                • {currentExam.officialStandard}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {currentExam.title}
            </h1>

            <p className={`text-xs sm:text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              {currentExam.scoringRules.passRuleDescription}
            </p>
          </div>

          {/* Exam Timer & Mode Controls */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Countdown Clock */}
            <div className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
              secondsRemaining < 600
                ? "bg-rose-950/60 border-rose-500/40 text-rose-300"
                : isDark
                ? "bg-slate-950 border-slate-800 text-purple-300"
                : "bg-purple-50 border-purple-200 text-purple-900"
            }`}>
              <Clock className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {isTimerActive ? "Exam Clock (Active)" : "Exam Clock (Paused)"}
                </div>
                <div className="text-lg font-black font-mono">
                  {formatTime(secondsRemaining)}
                </div>
              </div>
              <button
                onClick={() => setIsTimerActive(!isTimerActive)}
                className="p-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition active:scale-95"
                title={isTimerActive ? "Pause Timer" : "Resume Timer"}
              >
                {isTimerActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Back Button */}
            {onBackToHub && (
              <button
                onClick={onBackToHub}
                className={`py-3 px-4 rounded-2xl font-bold text-xs border transition flex items-center gap-1.5 ${
                  isDark ? "bg-slate-950 border-slate-800 text-slate-300 hover:text-white" : "bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900"
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return</span>
              </button>
            )}
          </div>
        </div>

        {/* ─── 3-TIER SELECTOR MATRIX: Board, Level, Set ─── */}
        <div className="pt-6 border-t mt-6 border-slate-800/40 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Exam Board */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              1. Exam Board Format
            </span>
            <div className={`p-1 rounded-xl border flex items-center gap-1 ${
              isDark ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"
            }`}>
              {(["TELC", "GOETHE"] as const).map(b => (
                <button
                  key={b}
                  onClick={() => handleExamChange(b, selectedLevel, selectedSet)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                    selectedBoard === b
                      ? "bg-purple-600 text-white shadow-xs"
                      : isDark
                      ? "text-slate-400 hover:text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {b === "TELC" ? "telc Deutsch" : "Goethe-Zertifikat"}
                </button>
              ))}
            </div>
          </div>

          {/* 2. CEFR Level */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              2. CEFR Level
            </span>
            <div className={`p-1 rounded-xl border flex items-center gap-1 ${
              isDark ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"
            }`}>
              {(["A1", "A2", "B1"] as const).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => handleExamChange(selectedBoard, lvl, selectedSet)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
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
          </div>

          {/* 3. Mock Set 1-4 */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              3. Mock Exam Set (4 Full Tests)
            </span>
            <div className={`p-1 rounded-xl border flex items-center gap-1 ${
              isDark ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"
            }`}>
              {[1, 2, 3, 4].map(sNum => (
                <button
                  key={sNum}
                  onClick={() => handleExamChange(selectedBoard, selectedLevel, sNum)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                    selectedSet === sNum
                      ? "bg-purple-600 text-white shadow-xs"
                      : isDark
                      ? "text-slate-400 hover:text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Set {sNum}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── SUBTEST TABS BAR ─── */}
      <div className={`p-1.5 rounded-2xl border flex items-center gap-2 overflow-x-auto no-scrollbar ${
        isDark ? "bg-slate-900/90 border-slate-800" : "bg-slate-100 border-slate-200"
      }`}>
        {[
          { id: "READING" as const, label: `1. Lesen (${currentExam.durationMinutes.reading} min)`, icon: BookOpen },
          { id: "LISTENING" as const, label: `2. Hören (${currentExam.durationMinutes.listening} min)`, icon: Volume2 },
          { id: "WRITING" as const, label: `3. Schreiben (${currentExam.durationMinutes.writing} min)`, icon: PenTool },
          { id: "SPEAKING" as const, label: `4. Sprechen (${currentExam.durationMinutes.speaking} min)`, icon: Mic },
          { id: "REPORT" as const, label: "5. Official Score Report", icon: Award }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition flex items-center gap-2 shrink-0 ${
                isActive
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : isDark
                  ? "text-slate-300 hover:text-white hover:bg-slate-800"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════════
          SUBTEST 1: LESEN (READING)
      ════════════════════════════════════════════════════════════ */}
      {activeTab === "READING" && (
        <div className="space-y-6">
          <div className={`p-6 rounded-3xl border space-y-6 ${
            isDark ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200"
          }`}>
            <div className="flex items-center justify-between border-b pb-4 border-slate-800/40">
              <div>
                <span className="text-xs font-black uppercase text-purple-400 tracking-wider">
                  Subtest 1 • Leseverstehen
                </span>
                <h2 className={`text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                  Reading Passages & Question Tasks
                </h2>
              </div>
              <span className="text-xs font-bold text-slate-400">
                Recommended: {currentExam.durationMinutes.reading} Minutes
              </span>
            </div>

            <div className="space-y-8">
              {currentExam.readingSections.map((sec) => (
                <div key={sec.teilId} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {sec.teilTitle}
                    </span>
                    <span className="text-xs text-slate-400">
                      {sec.timeRecommendedMinutes} min
                    </span>
                  </div>

                  <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    {sec.instructions}
                  </p>

                  {/* Reading Passage Box */}
                  <div className={`p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed whitespace-pre-line font-serif ${
                    isDark ? "bg-slate-950/80 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-800"
                  }`}>
                    {sec.readingPassage}
                  </div>

                  {/* Questions */}
                  <div className="space-y-4 pt-2">
                    {sec.questions.map((q) => (
                      <div 
                        key={q.id}
                        className={`p-4 rounded-2xl border space-y-3 ${
                          isDark ? "bg-slate-950/40 border-slate-800/80" : "bg-white border-slate-200"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h4 className={`text-xs sm:text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                            {q.questionNumber}. {q.questionText}
                          </h4>
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 shrink-0">
                            {q.points} Pkt
                          </span>
                        </div>

                        <div className="space-y-2">
                          {q.options.map((opt) => {
                            const isSelected = readingAnswers[q.id] === opt.key;
                            return (
                              <button
                                key={opt.key}
                                onClick={() => setReadingAnswers(prev => ({ ...prev, [q.id]: opt.key }))}
                                className={`w-full p-3 rounded-xl text-xs font-medium text-left transition flex items-center justify-between border ${
                                  isSelected
                                    ? "bg-purple-600 text-white border-purple-500 shadow-sm"
                                    : isDark
                                    ? "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800"
                                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  <span className="font-bold uppercase">{opt.key})</span>
                                  <span>{opt.text}</span>
                                </span>
                                {isSelected && <Check className="w-4 h-4 shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-800/40">
              <span className="text-xs text-slate-400">
                {Object.keys(readingAnswers).length} questions answered
              </span>
              <button
                onClick={() => setActiveTab("LISTENING")}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/30 flex items-center gap-1.5 transition active:scale-95"
              >
                <span>Proceed to Hören (Listening)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          SUBTEST 2: HOEREN (LISTENING)
      ════════════════════════════════════════════════════════════ */}
      {activeTab === "LISTENING" && (
        <div className="space-y-6">
          <div className={`p-6 rounded-3xl border space-y-6 ${
            isDark ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200"
          }`}>
            <div className="flex items-center justify-between border-b pb-4 border-slate-800/40">
              <div>
                <span className="text-xs font-black uppercase text-purple-400 tracking-wider">
                  Subtest 2 • Hörverstehen
                </span>
                <h2 className={`text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                  German Audio Dialogues & Announcements
                </h2>
              </div>
              <span className="text-xs font-bold text-slate-400">
                Recommended: {currentExam.durationMinutes.listening} Minutes
              </span>
            </div>

            <div className="space-y-8">
              {currentExam.listeningSections.map((sec) => (
                <div key={sec.teilId} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {sec.teilTitle}
                    </span>
                    <span className="text-xs text-slate-400">
                      {sec.timeRecommendedMinutes} min
                    </span>
                  </div>

                  <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    {sec.instructions}
                  </p>

                  <div className="space-y-5 pt-2">
                    {sec.questions.map((q) => (
                      <div 
                        key={q.id}
                        className={`p-5 rounded-2xl border space-y-3 ${
                          isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-400">
                            {q.speaker}
                          </span>
                          <button
                            onClick={() => handlePlayAudio(q.audioScript)}
                            className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Play German Audio</span>
                          </button>
                        </div>

                        <h4 className={`text-xs sm:text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                          {q.questionNumber}. {q.questionText}
                        </h4>

                        <div className="space-y-2">
                          {q.options.map((opt) => {
                            const isSelected = listeningAnswers[q.id] === opt.key;
                            return (
                              <button
                                key={opt.key}
                                onClick={() => setListeningAnswers(prev => ({ ...prev, [q.id]: opt.key }))}
                                className={`w-full p-3 rounded-xl text-xs font-medium text-left transition flex items-center justify-between border ${
                                  isSelected
                                    ? "bg-purple-600 text-white border-purple-500 shadow-sm"
                                    : isDark
                                    ? "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800"
                                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  <span className="font-bold uppercase">{opt.key})</span>
                                  <span>{opt.text}</span>
                                </span>
                                {isSelected && <Check className="w-4 h-4 shrink-0" />}
                              </button>
                            );
                          })}
                        </div>

                        {/* Transcript Toggle */}
                        <div className="pt-2">
                          <button
                            onClick={() => setShowListeningTranscripts(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                            className="text-[11px] text-slate-400 hover:text-slate-300 underline flex items-center gap-1"
                          >
                            {showListeningTranscripts[q.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            <span>{showListeningTranscripts[q.id] ? "Hide Audio Transcript" : "Show Audio Transcript"}</span>
                          </button>
                          {showListeningTranscripts[q.id] && (
                            <div className={`mt-2 p-3 rounded-xl border text-xs italic ${
                              isDark ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-700"
                            }`}>
                              "{q.audioScript}"
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-800/40">
              <button
                onClick={() => setActiveTab("READING")}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Lesen</span>
              </button>
              <button
                onClick={() => setActiveTab("WRITING")}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/30 flex items-center gap-1.5 transition active:scale-95"
              >
                <span>Proceed to Schreiben (Writing)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          SUBTEST 3: SCHREIBEN (WRITING)
      ════════════════════════════════════════════════════════════ */}
      {activeTab === "WRITING" && (
        <div className="space-y-6">
          <div className={`p-6 rounded-3xl border space-y-6 ${
            isDark ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200"
          }`}>
            <div className="flex items-center justify-between border-b pb-4 border-slate-800/40">
              <div>
                <span className="text-xs font-black uppercase text-purple-400 tracking-wider">
                  Subtest 3 • Schriftlicher Ausdruck
                </span>
                <h2 className={`text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                  Official Letter / Email Writing Workout
                </h2>
              </div>
              <span className="text-xs font-bold text-purple-400">
                Target: {currentExam.writingTasks[0]?.minWords || 80}+ Words
              </span>
            </div>

            {currentExam.writingTasks.map((task) => (
              <div key={task.taskId} className="space-y-4">
                <div className={`p-5 rounded-2xl border space-y-3 ${
                  isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                }`}>
                  <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                    {task.taskTitle}
                  </h3>
                  <p className={`text-xs ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                    <strong>Situation: </strong>{task.situation}
                  </p>
                  <p className={`text-xs ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                    <strong>Prompt: </strong>{task.prompt}
                  </p>

                  <div className="space-y-1 text-xs pt-1">
                    <strong className="text-slate-400">Address all required Leitpunkte:</strong>
                    {task.leitpunkte.map((lp, lpidx) => (
                      <div key={lpidx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                        <span className={isDark ? "text-slate-300" : "text-slate-700"}>{lp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Textarea */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-400">Your Official Examination Draft:</span>
                    <span className={`font-mono font-bold ${
                      writingWordCount >= task.minWords ? "text-emerald-400" : "text-amber-400"
                    }`}>
                      {writingWordCount} words {writingWordCount >= task.minWords ? "(Target Achieved)" : `(Need ~${task.minWords} words)`}
                    </span>
                  </div>

                  <textarea
                    value={userWritingText}
                    onChange={(e) => setUserWritingText(e.target.value)}
                    placeholder="Sehr geehrte Damen und Herren, / Liebe(r)..."
                    rows={10}
                    className={`w-full p-4 rounded-2xl text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-purple-500 border transition ${
                      isDark ? "bg-slate-950 border-slate-800 text-white placeholder-slate-600" : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                    }`}
                  />
                </div>

                {/* Certified Model Solution Toggle */}
                <div className="pt-2">
                  <button
                    onClick={() => setShowModelWriting(!showModelWriting)}
                    className="text-xs text-purple-400 hover:text-purple-300 font-bold underline"
                  >
                    {showModelWriting ? "Hide Model Examination Solution" : "Inspect Certified Model Solution"}
                  </button>
                  {showModelWriting && (
                    <div className={`mt-3 p-4 rounded-2xl border text-xs whitespace-pre-line leading-relaxed ${
                      isDark ? "bg-slate-950 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-800"
                    }`}>
                      {task.modelAnswer}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-4 border-t border-slate-800/40">
              <button
                onClick={() => setActiveTab("LISTENING")}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Hören</span>
              </button>
              <button
                onClick={() => setActiveTab("SPEAKING")}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/30 flex items-center gap-1.5 transition active:scale-95"
              >
                <span>Proceed to Sprechen (Speaking)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          SUBTEST 4: SPRECHEN (SPEAKING)
      ════════════════════════════════════════════════════════════ */}
      {activeTab === "SPEAKING" && (
        <div className="space-y-6">
          <div className={`p-6 rounded-3xl border space-y-6 ${
            isDark ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200"
          }`}>
            <div className="flex items-center justify-between border-b pb-4 border-slate-800/40">
              <div>
                <span className="text-xs font-black uppercase text-purple-400 tracking-wider">
                  Subtest 4 • Mündlicher Ausdruck
                </span>
                <h2 className={`text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                  Oral Examination Simulation
                </h2>
              </div>
              <span className="text-xs font-bold text-slate-400">
                Recommended: {currentExam.durationMinutes.speaking} Minutes
              </span>
            </div>

            {currentExam.speakingTasks.map((task) => (
              <div 
                key={task.taskId}
                className={`p-5 rounded-2xl border space-y-4 ${
                  isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className={`text-base font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                    {task.taskTitle}
                  </h3>
                  <button
                    onClick={() => handlePlayAudio(task.modelResponse)}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen to Model German</span>
                  </button>
                </div>

                <p className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  <strong>Examiner Prompt: </strong>{task.prompt}
                </p>

                {/* Structure / Cards */}
                <div className="space-y-1.5 text-xs">
                  <strong className="text-purple-400">Examination Content Cards:</strong>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {task.cardsOrQuestions.map((cq, cqidx) => (
                      <div 
                        key={cqidx} 
                        className={`p-2.5 rounded-xl border text-xs font-medium ${
                          isDark ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-700"
                        }`}
                      >
                        {cq}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Model Transcript Box */}
                <div className={`p-4 rounded-xl border text-xs leading-relaxed italic ${
                  isDark ? "bg-slate-900/80 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-700"
                }`}>
                  <strong className="not-italic block text-purple-400 font-bold mb-1">Model Candidate Response:</strong>
                  "{task.modelResponse}"
                </div>

                {/* Self-Score Confirmation */}
                <div className="pt-2">
                  <button
                    onClick={() => setSpeakingSelfScore(!speakingSelfScore)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 border ${
                      speakingSelfScore
                        ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
                        : isDark
                        ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                        : "bg-white border-slate-300 text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {speakingSelfScore ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <div className="w-4 h-4 rounded border border-slate-500" />}
                    <span>{speakingSelfScore ? "Speaking Task Completed Confidently" : "Confirm Speaking Practice Completed"}</span>
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-4 border-t border-slate-800/40">
              <button
                onClick={() => setActiveTab("WRITING")}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Schreiben</span>
              </button>
              <button
                onClick={handleFinishExam}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center gap-1.5 transition active:scale-95"
              >
                <span>Complete Exam & View Score Report</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          TAB 5: OFFICIAL SCORE REPORT & CERTIFICATE
      ════════════════════════════════════════════════════════════ */}
      {activeTab === "REPORT" && (
        <div className="space-y-6">
          <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
            isDark ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200"
          }`}>
            <div className="text-center space-y-2 border-b pb-6 border-slate-800/40">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Offizieller Prüfungsbericht</span>
              </div>
              <h2 className={`text-2xl sm:text-3xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                {currentExam.title} Result
              </h2>
              <p className={`text-xs sm:text-sm max-w-xl mx-auto ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                Evaluation according to {currentExam.officialStandard}
              </p>
            </div>

            {/* Pass / Fail Banner */}
            <div className={`p-6 rounded-2xl border text-center space-y-2 ${
              scoreReport.isPassed
                ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                : "bg-rose-950/40 border-rose-500/40 text-rose-200"
            }`}>
              <span className="text-xs font-black uppercase tracking-wider">
                Exam Board Status
              </span>
              <div className="text-3xl sm:text-4xl font-black tracking-tight">
                {scoreReport.isPassed ? "BESTANDEN (PASSED)" : "NICHT BESTANDEN (FAILED)"}
              </div>
              <div className="text-sm font-bold">
                Official Grade: {scoreReport.gradeLabel} • Total: {scoreReport.totalEarned} / {scoreReport.totalMax} Points ({scoreReport.percentage}%)
              </div>
            </div>

            {/* Module Breakdown Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "Lesen", score: scoreReport.readingEarned, max: currentExam.scoringRules.readingMax },
                { title: "Hören", score: scoreReport.listeningEarned, max: currentExam.scoringRules.listeningMax },
                { title: "Schreiben", score: scoreReport.writingEarned, max: currentExam.scoringRules.writingMax },
                { title: "Sprechen", score: scoreReport.speakingEarned, max: currentExam.scoringRules.speakingMax }
              ].map((m, idx) => {
                const pct = Math.round((m.score / m.max) * 100);
                const isModulePass = pct >= 60;
                return (
                  <div 
                    key={idx}
                    className={`p-4 rounded-2xl border text-center space-y-2 ${
                      isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-400">{m.title}</span>
                    <div className={`text-2xl font-black ${isModulePass ? "text-emerald-400" : "text-rose-400"}`}>
                      {m.score} / {m.max}
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div 
                        className={`h-full ${isModulePass ? "bg-emerald-500" : "bg-rose-500"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {pct}% ({isModulePass ? "Passed" : "Below 60%"})
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800/40">
              <button
                onClick={() => {
                  setReadingAnswers({});
                  setListeningAnswers({});
                  setUserWritingText("");
                  setSpeakingSelfScore(false);
                  setActiveTab("READING");
                  setSecondsRemaining(currentExam.durationMinutes.total * 60);
                }}
                className={`flex-1 py-3 rounded-2xl font-bold text-xs border transition flex items-center justify-center gap-2 ${
                  isDark ? "bg-slate-950 border-slate-800 text-slate-300 hover:text-white" : "bg-white border-slate-200 text-slate-700 hover:text-slate-900"
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake This Mock Exam</span>
              </button>

              <button
                onClick={() => {
                  const nextSet = selectedSet < 4 ? selectedSet + 1 : 1;
                  handleExamChange(selectedBoard, selectedLevel, nextSet);
                }}
                className="flex-1 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/30 flex items-center justify-center gap-2 transition active:scale-95"
              >
                <span>Load Next Mock Exam (Set {selectedSet < 4 ? selectedSet + 1 : 1})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
'''

with open(output_path, "w", encoding="utf-8") as f:
    f.write(content.strip() + "\n")

print(f"Successfully generated {output_path}")
