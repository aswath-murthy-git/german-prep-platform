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
  EyeOff,
  Filter,
  Layers,
  GraduationCap
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

type ArenaView = "CATALOG" | "EXAM_PLAYER";
type SubtestTab = "READING" | "LISTENING" | "WRITING" | "SPEAKING" | "REPORT";

export const FullMockExamArena: React.FC<FullMockExamArenaProps> = ({
  onBackToHub,
  initialBoard = "TELC",
  initialLevel = "B1",
  initialSet = 1
}) => {
  const { theme } = useUser();
  const isDark = theme === "dark";

  // Navigation View: Catalog of all mocks vs Active Exam Player
  const [currentView, setCurrentView] = useState<ArenaView>("CATALOG");

  // Filter in Catalog
  const [catalogBoardFilter, setCatalogBoardFilter] = useState<"ALL" | MockExamBoard>("ALL");
  const [catalogLevelFilter, setCatalogLevelFilter] = useState<"ALL" | MockExamLevel>("ALL");

  // Selected Exam
  const [selectedBoard, setSelectedBoard] = useState<MockExamBoard>(initialBoard);
  const [selectedLevel, setSelectedLevel] = useState<MockExamLevel>(initialLevel);
  const [selectedSet, setSelectedSet] = useState<number>(initialSet);

  // Active Exam Object
  const currentExam: FullMockExamData = useMemo(() => {
    const found = ALL_MULTI_LEVEL_MOCK_EXAMS.find(
      e => e.board === selectedBoard && e.level === selectedLevel && e.setNumber === selectedSet
    );
    return found || ALL_MULTI_LEVEL_MOCK_EXAMS[0];
  }, [selectedBoard, selectedLevel, selectedSet]);

  // Exam Player State
  const [activeTab, setActiveTab] = useState<SubtestTab>("READING");
  const [examMode, setExamMode] = useState<"TIMED" | "PRACTICE">("TIMED");

  // Countdown timer
  const [secondsRemaining, setSecondsRemaining] = useState<number>(currentExam.durationMinutes.total * 60);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  useEffect(() => {
    setSecondsRemaining(currentExam.durationMinutes.total * 60);
    setIsTimerActive(examMode === "TIMED" && currentView === "EXAM_PLAYER");
  }, [currentExam, examMode, currentView]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isTimerActive && secondsRemaining > 0 && currentView === "EXAM_PLAYER") {
      timer = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isTimerActive && currentView === "EXAM_PLAYER") {
      setIsTimerActive(false);
      alert("Exam time has expired! Generating your official score report.");
      setActiveTab("REPORT");
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerActive, secondsRemaining, currentView]);

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const remainingSeconds = secs % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}s`;
    }
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // User Responses
  const [readingAnswers, setReadingAnswers] = useState<Record<string, string>>({});
  const [listeningAnswers, setListeningAnswers] = useState<Record<string, string>>({});
  const [showListeningTranscripts, setShowListeningTranscripts] = useState<Record<string, boolean>>({});
  const [userWritingText, setUserWritingText] = useState<string>("");
  const [showModelWriting, setShowModelWriting] = useState<boolean>(false);
  const [speakingSelfScore, setSpeakingSelfScore] = useState<boolean>(false);

  // Launch a specific mock
  const handleLaunchExam = (board: MockExamBoard, level: MockExamLevel, setNum: number) => {
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
    setCurrentView("EXAM_PLAYER");
    setSecondsRemaining(currentExam.durationMinutes.total * 60);
    setIsTimerActive(examMode === "TIMED");
  };

  // Audio speech synthesis helper
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

  // Scoring
  const scoreReport = useMemo(() => {
    let readingEarned = 0;
    currentExam.readingSections.forEach(section => {
      section.questions.forEach(q => {
        const correctOpt = q.options.find(o => o.isCorrect);
        if (correctOpt && readingAnswers[q.id] === correctOpt.key) {
          readingEarned += q.points;
        }
      });
    });

    let listeningEarned = 0;
    currentExam.listeningSections.forEach(section => {
      section.questions.forEach(q => {
        const correctOpt = q.options.find(o => o.isCorrect);
        if (correctOpt && listeningAnswers[q.id] === correctOpt.key) {
          listeningEarned += q.points;
        }
      });
    });

    const targetWords = currentExam.writingTasks[0]?.minWords || 30;
    const writingMax = currentExam.scoringRules.writingMax;
    let writingEarned = 0;
    if (writingWordCount >= targetWords) {
      writingEarned = writingMax * 0.9;
      if (userWritingText.toLowerCase().includes("weil") || userWritingText.toLowerCase().includes("dass") || userWritingText.toLowerCase().includes("bitte")) {
        writingEarned = writingMax;
      }
    } else if (writingWordCount >= targetWords * 0.5) {
      writingEarned = writingMax * 0.6;
    } else if (writingWordCount > 5) {
      writingEarned = writingMax * 0.3;
    }

    const speakingMax = currentExam.scoringRules.speakingMax;
    const speakingEarned = speakingSelfScore ? speakingMax : 0;

    const totalEarned = readingEarned + listeningEarned + writingEarned + speakingEarned;
    const totalMax = currentExam.scoringRules.totalMax;
    const percentage = Math.round((totalEarned / totalMax) * 100);

    let isPassed = false;
    if (currentExam.board === "GOETHE" && currentExam.level === "B1") {
      const readPass = (readingEarned / currentExam.scoringRules.readingMax) >= 0.6;
      const listenPass = (listeningEarned / currentExam.scoringRules.listeningMax) >= 0.6;
      const writePass = (writingEarned / currentExam.scoringRules.writingMax) >= 0.6;
      const speakPass = (speakingEarned / currentExam.scoringRules.speakingMax) >= 0.6;
      isPassed = readPass && listenPass && writePass && speakPass;
    } else if (currentExam.board === "TELC" && currentExam.level === "B1") {
      const writtenTotal = readingEarned + listeningEarned + writingEarned;
      isPassed = writtenTotal >= 135 && speakingEarned >= 45;
    } else {
      isPassed = percentage >= 60;
    }

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

  // 6 Primary Exam Tracks for the Catalog Grid
  const examTracks = [
    {
      board: "TELC" as const,
      level: "A1" as const,
      name: "telc Deutsch A1",
      subtitle: "Start Deutsch 1 standard for spousal visa & basic residency",
      duration: "80 min",
      passRule: "60% minimum (60/100 points)",
      badgeColor: "bg-blue-600 text-white",
      setsAvailable: [1, 2, 3, 4]
    },
    {
      board: "GOETHE" as const,
      level: "A1" as const,
      name: "Goethe-Zertifikat A1",
      subtitle: "Start Deutsch 1 official exam by Goethe-Institut worldwide",
      duration: "80 min",
      passRule: "60% minimum (60/100 points)",
      badgeColor: "bg-purple-600 text-white",
      setsAvailable: [1, 2, 3, 4]
    },
    {
      board: "TELC" as const,
      level: "A2" as const,
      name: "telc Deutsch A2",
      subtitle: "Elementary German for work, everyday life and early settlement",
      duration: "105 min",
      passRule: "60% minimum (60/100 points)",
      badgeColor: "bg-blue-600 text-white",
      setsAvailable: [1, 2, 3, 4]
    },
    {
      board: "GOETHE" as const,
      level: "A2" as const,
      name: "Goethe-Zertifikat A2",
      subtitle: "Elementary proficiency testing reading, listening, writing, speaking",
      duration: "105 min",
      passRule: "60% minimum (60/100 points)",
      badgeColor: "bg-purple-600 text-white",
      setsAvailable: [1, 2, 3, 4]
    },
    {
      board: "TELC" as const,
      level: "B1" as const,
      name: "telc Deutsch B1",
      subtitle: "Zertifikat Deutsch / BAMF standard for permanent residence (Niederlassung)",
      duration: "150 min",
      passRule: "135/225 Written + 45/75 Oral (60% each)",
      badgeColor: "bg-blue-600 text-white",
      setsAvailable: [1, 2, 3, 4]
    },
    {
      board: "GOETHE" as const,
      level: "B1" as const,
      name: "Goethe-Zertifikat B1",
      subtitle: "Independent 4-module modular certificate (60% per module)",
      duration: "180 min",
      passRule: "60/100 points in each independent module",
      badgeColor: "bg-purple-600 text-white",
      setsAvailable: [1, 2, 3, 4]
    }
  ];

  const filteredTracks = examTracks.filter(t => {
    if (catalogBoardFilter !== "ALL" && t.board !== catalogBoardFilter) return false;
    if (catalogLevelFilter !== "ALL" && t.level !== catalogLevelFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-16 animate-fadeIn">
      {/* ═══════════════════════════════════════════════════════════
          VIEW 1: FULL MOCK EXAMS CATALOG (A1, A2, B1 for TELC & GOETHE)
      ════════════════════════════════════════════════════════════ */}
      {currentView === "CATALOG" && (
        <div className="space-y-6">
          {/* Catalog Hero Banner */}
          <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl relative overflow-hidden transition-all duration-300 ${
            isDark 
              ? "bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 border-purple-500/30 text-white" 
              : "bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-purple-200 text-slate-900"
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  <Award className="w-3.5 h-3.5" />
                  <span>Official Mock Examination Suite (24 Full Papers)</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
                  telc & Goethe Mock Exams (A1, A2, B1)
                </h1>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  Choose your target examination board and level. Every exam features full 4-subtest coverage (Lesen, Hören, Schreiben, Sprechen), audio speech simulation, live word counting, certified model solutions, and automated official Zeugnis scoring.
                </p>
              </div>

              {/* Quick Summary Pill */}
              <div className={`p-4 rounded-2xl border flex flex-col items-center justify-center text-center space-y-1 min-w-[200px] ${
                isDark ? "bg-slate-950/80 border-slate-800" : "bg-white border-slate-200"
              }`}>
                <span className="text-xs font-semibold text-slate-400">Total Practice Sets</span>
                <span className="text-3xl font-black text-purple-400">24 Full Mocks</span>
                <span className="text-[11px] text-slate-400">4 Sets per Board & Level</span>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="pt-6 border-t mt-6 border-slate-800/40 flex flex-wrap items-center justify-between gap-4">
              {/* Board Filters */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Format:</span>
                </span>
                {(["ALL", "TELC", "GOETHE"] as const).map(b => (
                  <button
                    key={b}
                    onClick={() => setCatalogBoardFilter(b)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                      catalogBoardFilter === b
                        ? "bg-purple-600 text-white border-purple-500 shadow-sm"
                        : isDark
                        ? "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                        : "bg-white border-slate-200 text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {b === "ALL" ? "All Boards" : b === "TELC" ? "telc Deutsch" : "Goethe-Zertifikat"}
                  </button>
                ))}
              </div>

              {/* Level Filters */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 mr-1">Level:</span>
                {(["ALL", "A1", "A2", "B1"] as const).map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setCatalogLevelFilter(lvl)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                      catalogLevelFilter === lvl
                        ? "bg-purple-600 text-white border-purple-500 shadow-sm"
                        : isDark
                        ? "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                        : "bg-white border-slate-200 text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 6 Mock Exam Track Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTracks.map((track) => (
              <div
                key={`${track.board}_${track.level}`}
                className={`p-6 rounded-3xl border shadow-sm flex flex-col justify-between space-y-5 transition-all duration-300 hover:shadow-xl ${
                  isDark 
                    ? "bg-slate-900/90 border-slate-800 hover:border-purple-500/50" 
                    : "bg-white border-slate-200 hover:border-purple-300 hover:bg-purple-50/10"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-lg text-xs font-black uppercase tracking-wider ${track.badgeColor}`}>
                        {track.board}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {track.level}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-purple-400" />
                      <span>{track.duration}</span>
                    </span>
                  </div>

                  <h3 className={`text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                    {track.name}
                  </h3>

                  <p className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                    {track.subtitle}
                  </p>

                  <div className={`p-3 rounded-xl border text-[11px] font-medium leading-relaxed ${
                    isDark ? "bg-slate-950 border-slate-800 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"
                  }`}>
                    <strong>Passing Criteria: </strong>{track.passRule}
                  </div>
                </div>

                {/* 4 Sets Selector Buttons */}
                <div className="space-y-2 pt-2 border-t border-slate-800/40">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Select & Launch Mock Set:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {track.setsAvailable.map(setNum => (
                      <button
                        key={setNum}
                        onClick={() => handleLaunchExam(track.board, track.level, setNum)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-between border ${
                          isDark
                            ? "bg-slate-950 hover:bg-purple-600 hover:text-white border-slate-800 text-slate-300"
                            : "bg-slate-100 hover:bg-purple-600 hover:text-white border-slate-200 text-slate-700"
                        }`}
                      >
                        <span>Set {setNum}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-70" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          VIEW 2: ACTIVE EXAM PLAYER (TIMED OR PRACTICE)
      ════════════════════════════════════════════════════════════ */}
      {currentView === "EXAM_PLAYER" && (
        <div className="space-y-6">
          {/* Header Bar */}
          <div className={`p-5 rounded-3xl border shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView("CATALOG")}
                  className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 mr-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>All Mock Exams</span>
                </button>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-purple-600 text-white">
                  {currentExam.board} {currentExam.level}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Set {currentExam.setNumber}
                </span>
              </div>
              <h2 className="text-xl font-black">
                {currentExam.title}
              </h2>
            </div>

            {/* Timer and Controls */}
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl border flex items-center gap-2.5 ${
                secondsRemaining < 600
                  ? "bg-rose-950/60 border-rose-500/40 text-rose-300"
                  : isDark
                  ? "bg-slate-950 border-slate-800 text-purple-300"
                  : "bg-purple-50 border-purple-200 text-purple-900"
              }`}>
                <Clock className="w-4 h-4 text-purple-400" />
                <div className="text-base font-black font-mono">
                  {formatTime(secondsRemaining)}
                </div>
                <button
                  onClick={() => setIsTimerActive(!isTimerActive)}
                  className="p-1 rounded-lg bg-purple-600 text-white"
                >
                  {isTimerActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>
              </div>

              {/* Set Switcher */}
              <div className={`p-1 rounded-xl border flex items-center gap-1 ${
                isDark ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"
              }`}>
                {[1, 2, 3, 4].map(sNum => (
                  <button
                    key={sNum}
                    onClick={() => handleLaunchExam(selectedBoard, selectedLevel, sNum)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      selectedSet === sNum
                        ? "bg-purple-600 text-white"
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

          {/* Subtest Tabs */}
          <div className={`p-1.5 rounded-2xl border flex items-center gap-2 overflow-x-auto no-scrollbar ${
            isDark ? "bg-slate-900/90 border-slate-800" : "bg-slate-100 border-slate-200"
          }`}>
            {[
              { id: "READING" as const, label: `1. Lesen (${currentExam.durationMinutes.reading}m)`, icon: BookOpen },
              { id: "LISTENING" as const, label: `2. Hören (${currentExam.durationMinutes.listening}m)`, icon: Volume2 },
              { id: "WRITING" as const, label: `3. Schreiben (${currentExam.durationMinutes.writing}m)`, icon: PenTool },
              { id: "SPEAKING" as const, label: `4. Sprechen (${currentExam.durationMinutes.speaking}m)`, icon: Mic },
              { id: "REPORT" as const, label: "5. Prüfungsbericht (Zeugnis)", icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition flex items-center gap-2 shrink-0 ${
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

          {/* ─── TAB 1: LESEN ─── */}
          {activeTab === "READING" && (
            <div className={`p-6 rounded-3xl border space-y-6 ${
              isDark ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <div className="flex items-center justify-between border-b pb-4 border-slate-800/40">
                <h3 className="text-lg font-bold">Leseverstehen (Reading Comprehension)</h3>
                <span className="text-xs text-slate-400">
                  {Object.keys(readingAnswers).length} Answered
                </span>
              </div>

              <div className="space-y-6">
                {currentExam.readingSections.map((sec) => (
                  <div key={sec.teilId} className="space-y-4">
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-purple-500/20 text-purple-300">
                      {sec.teilTitle}
                    </span>
                    <p className="text-xs text-slate-400">{sec.instructions}</p>
                    <div className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed whitespace-pre-line font-serif ${
                      isDark ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-800"
                    }`}>
                      {sec.readingPassage}
                    </div>

                    <div className="space-y-3">
                      {sec.questions.map((q) => (
                        <div key={q.id} className={`p-4 rounded-2xl border space-y-3 ${
                          isDark ? "bg-slate-950/60 border-slate-800" : "bg-white border-slate-200"
                        }`}>
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs sm:text-sm font-bold">{q.questionNumber}. {q.questionText}</h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
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
                                      ? "bg-purple-600 text-white border-purple-500"
                                      : isDark
                                      ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                                  }`}
                                >
                                  <span><strong className="uppercase">{opt.key})</strong> {opt.text}</span>
                                  {isSelected && <Check className="w-4 h-4" />}
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

              <div className="flex justify-end pt-4 border-t border-slate-800/40">
                <button
                  onClick={() => setActiveTab("LISTENING")}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center gap-2"
                >
                  <span>Proceed to Hören</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ─── TAB 2: HOEREN ─── */}
          {activeTab === "LISTENING" && (
            <div className={`p-6 rounded-3xl border space-y-6 ${
              isDark ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <div className="flex items-center justify-between border-b pb-4 border-slate-800/40">
                <h3 className="text-lg font-bold">Hörverstehen (Listening Comprehension)</h3>
                <span className="text-xs text-slate-400">
                  {Object.keys(listeningAnswers).length} Answered
                </span>
              </div>

              <div className="space-y-6">
                {currentExam.listeningSections.map((sec) => (
                  <div key={sec.teilId} className="space-y-4">
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-purple-500/20 text-purple-300">
                      {sec.teilTitle}
                    </span>
                    <p className="text-xs text-slate-400">{sec.instructions}</p>

                    <div className="space-y-4">
                      {sec.questions.map((q) => (
                        <div key={q.id} className={`p-4 rounded-2xl border space-y-3 ${
                          isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                        }`}>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400">{q.speaker}</span>
                            <button
                              onClick={() => handlePlayAudio(q.audioScript)}
                              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Play German Audio</span>
                            </button>
                          </div>

                          <h4 className="text-xs sm:text-sm font-bold">{q.questionNumber}. {q.questionText}</h4>

                          <div className="space-y-2">
                            {q.options.map((opt) => {
                              const isSelected = listeningAnswers[q.id] === opt.key;
                              return (
                                <button
                                  key={opt.key}
                                  onClick={() => setListeningAnswers(prev => ({ ...prev, [q.id]: opt.key }))}
                                  className={`w-full p-3 rounded-xl text-xs font-medium text-left transition flex items-center justify-between border ${
                                    isSelected
                                      ? "bg-purple-600 text-white border-purple-500"
                                      : isDark
                                      ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                                  }`}
                                >
                                  <span><strong className="uppercase">{opt.key})</strong> {opt.text}</span>
                                  {isSelected && <Check className="w-4 h-4" />}
                                </button>
                              );
                            })}
                          </div>

                          <div className="pt-1">
                            <button
                              onClick={() => setShowListeningTranscripts(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                              className="text-[11px] text-slate-400 hover:text-slate-300 underline"
                            >
                              {showListeningTranscripts[q.id] ? "Hide Transcript" : "Show German Transcript"}
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
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
                >
                  Back to Lesen
                </button>
                <button
                  onClick={() => setActiveTab("WRITING")}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center gap-2"
                >
                  <span>Proceed to Schreiben</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ─── TAB 3: SCHREIBEN ─── */}
          {activeTab === "WRITING" && (
            <div className={`p-6 rounded-3xl border space-y-6 ${
              isDark ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <div className="flex items-center justify-between border-b pb-4 border-slate-800/40">
                <h3 className="text-lg font-bold">Schriftlicher Ausdruck (Writing)</h3>
                <span className="text-xs font-bold text-purple-400">
                  Target: {currentExam.writingTasks[0]?.minWords || 30}+ Words
                </span>
              </div>

              {currentExam.writingTasks.map((task) => (
                <div key={task.taskId} className="space-y-4">
                  <div className={`p-4 rounded-2xl border space-y-2 ${
                    isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}>
                    <h4 className="text-sm font-bold">{task.taskTitle}</h4>
                    <p className="text-xs"><strong>Situation: </strong>{task.situation}</p>
                    <p className="text-xs"><strong>Prompt: </strong>{task.prompt}</p>
                    <div className="text-xs space-y-1 pt-1 text-slate-400">
                      <strong>Leitpunkte to address:</strong>
                      {task.leitpunkte.map((lp, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          <span>{lp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400 font-bold">Your Examination Text:</span>
                      <span className={`font-mono font-bold ${writingWordCount >= task.minWords ? "text-emerald-400" : "text-amber-400"}`}>
                        {writingWordCount} words {writingWordCount >= task.minWords ? "(Target Achieved)" : `(Need ~${task.minWords} words)`}
                      </span>
                    </div>

                    <textarea
                      value={userWritingText}
                      onChange={(e) => setUserWritingText(e.target.value)}
                      placeholder="Sehr geehrte Damen und Herren, / Lieber Alex,..."
                      rows={8}
                      className={`w-full p-4 rounded-2xl text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-purple-500 border transition ${
                        isDark ? "bg-slate-950 border-slate-800 text-white placeholder-slate-600" : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                      }`}
                    />
                  </div>

                  <div>
                    <button
                      onClick={() => setShowModelWriting(!showModelWriting)}
                      className="text-xs text-purple-400 hover:text-purple-300 font-bold underline"
                    >
                      {showModelWriting ? "Hide Model Answer" : "Inspect Certified Model Solution"}
                    </button>
                    {showModelWriting && (
                      <div className={`mt-2 p-4 rounded-2xl border text-xs whitespace-pre-line leading-relaxed ${
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
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
                >
                  Back to Hören
                </button>
                <button
                  onClick={() => setActiveTab("SPEAKING")}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center gap-2"
                >
                  <span>Proceed to Sprechen</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ─── TAB 4: SPRECHEN ─── */}
          {activeTab === "SPEAKING" && (
            <div className={`p-6 rounded-3xl border space-y-6 ${
              isDark ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <div className="flex items-center justify-between border-b pb-4 border-slate-800/40">
                <h3 className="text-lg font-bold">Mündlicher Ausdruck (Speaking)</h3>
                <span className="text-xs text-purple-400">Oral Tasks Simulation</span>
              </div>

              {currentExam.speakingTasks.map((task) => (
                <div key={task.taskId} className={`p-5 rounded-2xl border space-y-4 ${
                  isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold">{task.taskTitle}</h4>
                    <button
                      onClick={() => handlePlayAudio(task.modelResponse)}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen to Model</span>
                    </button>
                  </div>

                  <p className="text-xs leading-relaxed"><strong>Prompt: </strong>{task.prompt}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {task.cardsOrQuestions.map((cq, idx) => (
                      <div key={idx} className={`p-2 rounded-lg border text-xs text-center font-medium ${
                        isDark ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-700"
                      }`}>
                        {cq}
                      </div>
                    ))}
                  </div>

                  <div className={`p-3.5 rounded-xl border text-xs italic ${
                    isDark ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-700"
                  }`}>
                    <strong className="not-italic block text-purple-400 font-bold mb-1">Model Candidate Answer:</strong>
                    "{task.modelResponse}"
                  </div>

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
              ))}

              <div className="flex justify-between items-center pt-4 border-t border-slate-800/40">
                <button
                  onClick={() => setActiveTab("WRITING")}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
                >
                  Back to Schreiben
                </button>
                <button
                  onClick={handleFinishExam}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center gap-1.5 active:scale-95"
                >
                  <span>Finish & View Official Report</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ─── TAB 5: REPORT ─── */}
          {activeTab === "REPORT" && (
            <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
              isDark ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <div className="text-center space-y-2 border-b pb-6 border-slate-800/40">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  Official Scorecard & Zeugnis
                </span>
                <h3 className="text-2xl sm:text-3xl font-black">{currentExam.title}</h3>
                <p className="text-xs text-slate-400">{currentExam.officialStandard}</p>
              </div>

              {/* Result Banner */}
              <div className={`p-6 rounded-2xl border text-center space-y-2 ${
                scoreReport.isPassed
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                  : "bg-rose-950/40 border-rose-500/40 text-rose-200"
              }`}>
                <div className="text-3xl sm:text-4xl font-black">
                  {scoreReport.isPassed ? "BESTANDEN (PASSED)" : "NICHT BESTANDEN (FAILED)"}
                </div>
                <div className="text-sm font-bold">
                  Grade: {scoreReport.gradeLabel} • Total: {scoreReport.totalEarned} / {scoreReport.totalMax} Points ({scoreReport.percentage}%)
                </div>
              </div>

              {/* Subtest Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: "Lesen", score: scoreReport.readingEarned, max: currentExam.scoringRules.readingMax },
                  { title: "Hören", score: scoreReport.listeningEarned, max: currentExam.scoringRules.listeningMax },
                  { title: "Schreiben", score: scoreReport.writingEarned, max: currentExam.scoringRules.writingMax },
                  { title: "Sprechen", score: scoreReport.speakingEarned, max: currentExam.scoringRules.speakingMax }
                ].map((m, idx) => {
                  const pct = Math.round((m.score / m.max) * 100);
                  const isPass = pct >= 60;
                  return (
                    <div key={idx} className={`p-4 rounded-2xl border text-center space-y-2 ${
                      isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                    }`}>
                      <span className="text-xs font-bold text-slate-400">{m.title}</span>
                      <div className={`text-2xl font-black ${isPass ? "text-emerald-400" : "text-rose-400"}`}>
                        {m.score} / {m.max}
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className={`h-full ${isPass ? "bg-emerald-500" : "bg-rose-500"}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[10px] text-slate-400">{pct}% ({isPass ? "Passed" : "Below 60%"})</span>
                    </div>
                  );
                })}
              </div>

              {/* Retake or Switch */}
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
                  onClick={() => setCurrentView("CATALOG")}
                  className="flex-1 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/30 flex items-center justify-center gap-2 transition active:scale-95"
                >
                  <Layers className="w-4 h-4" />
                  <span>Return to All 24 Mock Exams</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
'''

# Verify 0 em-dashes
assert "\u2014" not in content, "Found em dash!"
banned = ['🍷', '🍸', '🍺', '🍻', '🍾', '🥂', '🥃', '🍹', '🚬', '🚭']
for b in banned:
    assert b not in content, f"Found banned emoji {b}!"

with open(output_path, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Successfully generated {output_path}")
