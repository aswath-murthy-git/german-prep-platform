"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useUser } from "@/context/UserContext";
import confetti from "canvas-confetti";
import { 
  Compass, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  BookOpen, 
  Award, 
  AlertTriangle, 
  ShieldCheck, 
  Volume2, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Play, 
  RotateCcw, 
  ExternalLink, 
  FileText, 
  Check, 
  X, 
  Mic, 
  Send, 
  Flame, 
  ChevronRight, 
  HelpCircle,
  Square,
  CheckSquare
} from "lucide-react";
import { 
  EXAM_SITUATION_STRATEGY, 
  ROADMAP_30_DAYS, 
  DAILY_TIMETABLE_DATA, 
  FREE_RESOURCES_DATA, 
  BAMF_RESIDENCY_COMPASS,
  DIAGNOSTIC_READING_QUESTIONS,
  DIAGNOSTIC_LISTENING_QUESTIONS,
  DIAGNOSTIC_WRITING_TASK,
  DIAGNOSTIC_SPEAKING_TASKS,
  TimetableSlot
} from "@/data/fast_track_b1_plan_data";

interface FastTrack30DayHubProps {
  onNavigateToSection?: (section: string) => void;
  onOpenAiCoach?: () => void;
}

type FastTrackTab = "STRATEGY" | "ROADMAP" | "TIMETABLE" | "RESOURCES" | "BAMF" | "DIAGNOSTIC";

export const FastTrack30DayHub: React.FC<FastTrack30DayHubProps> = ({
  onNavigateToSection,
  onOpenAiCoach
}) => {
  const { profile, theme } = useUser();
  const isDark = theme === "dark";

  const [activeTab, setActiveTab] = useState<FastTrackTab>("STRATEGY");

  // ─── 30-DAY CHECKLIST STATE (with LocalStorage) ───
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("b1_fasttrack_completed_days");
      if (saved) {
        setCompletedDays(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleDayCompletion = (dayNum: number) => {
    setCompletedDays(prev => {
      const next = prev.includes(dayNum) ? prev.filter(d => d !== dayNum) : [...prev, dayNum];
      try {
        localStorage.setItem("b1_fasttrack_completed_days", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // ─── TIMETABLE FOCUS TIMER ───
  const [activeTimerSlot, setActiveTimerSlot] = useState<TimetableSlot | null>(null);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (timerSecondsLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch {
        // ignore
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSecondsLeft]);

  const handleStartTimer = (slot: TimetableSlot) => {
    setActiveTimerSlot(slot);
    setTimerSecondsLeft(slot.durationMinutes * 60);
    setIsTimerRunning(true);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // ─── SPEECH SYNTHESIS HELPER ───
  const playGermanAudio = (text: string, rate: number = 0.95) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    }
  };

  // ─── DIAGNOSTIC TEST RUNNER STATE ───
  type DiagnosticStage = "INTRO" | "LESEN" | "HOEREN" | "SCHREIBEN" | "SPRECHEN" | "RESULTS";
  const [diagStage, setDiagStage] = useState<DiagnosticStage>("INTRO");

  // Reading answers
  const [readingAnswers, setReadingAnswers] = useState<Record<string, string>>({});
  // Listening answers
  const [listeningAnswers, setListeningAnswers] = useState<Record<string, string>>({});
  const [showTranscript, setShowTranscript] = useState<Record<string, boolean>>({});

  // Writing state
  const [userEmailText, setUserEmailText] = useState<string>("");
  const [showSampleWriting, setShowSampleWriting] = useState<boolean>(false);

  // Speaking state
  const [speakingSelfScores, setSpeakingSelfScores] = useState<Record<string, boolean>>({});
  const [activeSpeakingTab, setActiveSpeakingTab] = useState<number>(0);

  // Email analysis helpers
  const emailWordsCount = useMemo(() => {
    return userEmailText.trim() ? userEmailText.trim().split(/\s+/).length : 0;
  }, [userEmailText]);

  const detectedConnectors = useMemo(() => {
    const textLower = userEmailText.toLowerCase();
    const targets = ["weil", "dass", "obwohl", "wenn", "deshalb", "damit", "könnten sie", "könnte"];
    return targets.filter(t => textLower.includes(t));
  }, [userEmailText]);

  const hasSalutation = useMemo(() => {
    const lower = userEmailText.toLowerCase();
    return lower.includes("sehr geehrte") || lower.includes("liebe") || lower.includes("hallo");
  }, [userEmailText]);

  const hasClosing = useMemo(() => {
    const lower = userEmailText.toLowerCase();
    return lower.includes("mit freundlichen grüßen") || lower.includes("viele grüße") || lower.includes("herzliche grüße");
  }, [userEmailText]);

  // Scoring Diagnostic
  const diagnosticScore = useMemo(() => {
    // Reading score (out of 5)
    let readCorrect = 0;
    DIAGNOSTIC_READING_QUESTIONS.forEach(q => {
      const correctOpt = q.options.find(o => o.isCorrect);
      if (correctOpt && readingAnswers[q.id] === correctOpt.key) {
        readCorrect++;
      }
    });

    // Listening score (out of 5)
    let listenCorrect = 0;
    DIAGNOSTIC_LISTENING_QUESTIONS.forEach(q => {
      const correctOpt = q.options.find(o => o.isCorrect);
      if (correctOpt && listeningAnswers[q.id] === correctOpt.key) {
        listenCorrect++;
      }
    });

    // Writing score (out of 100%)
    let writeScore = 0;
    if (hasSalutation) writeScore += 20;
    if (hasClosing) writeScore += 20;
    if (emailWordsCount >= 80) writeScore += 30;
    else if (emailWordsCount >= 50) writeScore += 20;
    else if (emailWordsCount > 20) writeScore += 10;
    if (detectedConnectors.length >= 3) writeScore += 30;
    else if (detectedConnectors.length >= 1) writeScore += 15;

    // Speaking self-assessment (out of 3)
    let speakTasksPassed = 0;
    DIAGNOSTIC_SPEAKING_TASKS.forEach(t => {
      if (speakingSelfScores[t.id]) speakTasksPassed++;
    });

    const readPct = Math.round((readCorrect / DIAGNOSTIC_READING_QUESTIONS.length) * 100);
    const listenPct = Math.round((listenCorrect / DIAGNOSTIC_LISTENING_QUESTIONS.length) * 100);
    const writePct = Math.min(100, writeScore);
    const speakPct = Math.round((speakTasksPassed / DIAGNOSTIC_SPEAKING_TASKS.length) * 100);

    const overallPct = Math.round((readPct + listenPct + writePct + speakPct) / 4);

    return {
      readCorrect,
      readPct,
      listenCorrect,
      listenPct,
      writePct,
      speakTasksPassed,
      speakPct,
      overallPct
    };
  }, [readingAnswers, listeningAnswers, hasSalutation, hasClosing, emailWordsCount, detectedConnectors, speakingSelfScores]);

  const handleFinishDiagnostic = () => {
    setDiagStage("RESULTS");
    try {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-[1400px] mx-auto pb-16">
      {/* ─── HERO HEADER ─── */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl relative overflow-hidden transition-all duration-300 ${
        isDark 
          ? "bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 border-purple-500/30" 
          : "bg-gradient-to-br from-purple-50 via-white to-indigo-50/50 border-purple-200"
      }`}>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Compass className="w-3.5 h-3.5" />
              <span>Fast-Track B1 Master Blueprint</span>
            </div>
            <h1 className={`text-2xl sm:text-4xl font-black tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}>
              Your 30-Day B1 Pass Sanctuary
            </h1>
            <p className={`text-sm sm:text-base leading-relaxed ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}>
              Strategic comparison between Goethe B1 and telc B1, structured 30-day roadmap (3h 20m daily), free high-yield learning resources, BAMF permanent residence compliance, and interactive 4-skill diagnostic test.
            </p>
          </div>

          {/* Quick Stats / Action Pill */}
          <div className={`shrink-0 p-5 rounded-2xl border flex flex-col items-center justify-center text-center space-y-2 min-w-[220px] ${
            isDark ? "bg-slate-950/80 border-slate-800" : "bg-white/90 border-slate-200"
          }`}>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Diagnostic Assessment
            </span>
            <button
              onClick={() => {
                setActiveTab("DIAGNOSTIC");
                setDiagStage("INTRO");
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/30 transition flex items-center justify-center gap-2 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Diagnostic Test</span>
            </button>
            <span className="text-[11px] text-slate-400">
              Identify weaknesses before 30 days
            </span>
          </div>
        </div>
      </div>

      {/* ─── 6 PILLAR NAVIGATION TABS ─── */}
      <div className={`p-1.5 rounded-2xl border flex items-center gap-1.5 overflow-x-auto no-scrollbar ${
        isDark ? "bg-slate-900/90 border-slate-800" : "bg-slate-100 border-slate-200"
      }`}>
        {[
          { id: "STRATEGY" as const, label: "1. Goethe vs telc Strategy", icon: ShieldCheck },
          { id: "ROADMAP" as const, label: "2. 30-Day Roadmap", icon: Calendar },
          { id: "TIMETABLE" as const, label: "3. Daily Timetable (3h 20m)", icon: Clock },
          { id: "RESOURCES" as const, label: "4. Best Free Resources", icon: BookOpen },
          { id: "BAMF" as const, label: "5. BAMF & PR Compass", icon: Award },
          { id: "DIAGNOSTIC" as const, label: "6. B1 Diagnostic Test", icon: Sparkles }
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
          TAB 1: GOETHE VS TELC STRATEGY
      ════════════════════════════════════════════════════════════ */}
      {activeTab === "STRATEGY" && (
        <div className="space-y-6">
          <div className={`p-6 rounded-3xl border space-y-4 ${
            isDark ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200"
          }`}>
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                  {EXAM_SITUATION_STRATEGY.headline}
                </h2>
                <p className="text-xs text-purple-400 font-bold uppercase tracking-wider">
                  Recommended: {EXAM_SITUATION_STRATEGY.recommendation}
                </p>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border text-sm leading-relaxed ${
              isDark ? "bg-purple-950/20 border-purple-500/30 text-purple-200" : "bg-purple-50 border-purple-200 text-purple-900"
            }`}>
              <p className="font-semibold">{EXAM_SITUATION_STRATEGY.coreRationale}</p>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {EXAM_SITUATION_STRATEGY.comparisonTable.map((item) => (
                <div 
                  key={item.id} 
                  className={`p-5 rounded-2xl border space-y-3 flex flex-col justify-between ${
                    isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-wider text-purple-400">
                      {item.category}
                    </span>
                    <div className="space-y-2 text-xs">
                      <div>
                        <strong className={isDark ? "text-white" : "text-slate-900"}>Goethe B1: </strong>
                        <span className={isDark ? "text-slate-300" : "text-slate-700"}>{item.goethe}</span>
                      </div>
                      <div>
                        <strong className={isDark ? "text-white" : "text-slate-900"}>telc B1: </strong>
                        <span className={isDark ? "text-slate-300" : "text-slate-700"}>{item.telc}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border ${
                    isDark ? "bg-slate-900 text-emerald-400 border-emerald-500/30" : "bg-emerald-50 text-emerald-800 border-emerald-200"
                  }`}>
                    Key takeaway: {item.verdict}
                  </div>
                </div>
              ))}
            </div>

            {/* Actionable Strategy Points */}
            <div className="pt-4 space-y-3">
              <h3 className={`text-sm font-bold uppercase tracking-wider ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                Strategic Execution Checklist
              </h3>
              <div className="space-y-2">
                {EXAM_SITUATION_STRATEGY.practicalChecklist.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className={isDark ? "text-slate-300" : "text-slate-700"}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          TAB 2: 30-DAY ROADMAP
      ════════════════════════════════════════════════════════════ */}
      {activeTab === "ROADMAP" && (
        <div className="space-y-6">
          <div className={`p-6 rounded-3xl border space-y-4 ${
            isDark ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200"
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className={`text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                  {ROADMAP_30_DAYS.title}
                </h2>
                <p className="text-xs text-purple-400 font-bold uppercase tracking-wider">
                  {ROADMAP_30_DAYS.studyCommitment}
                </p>
              </div>

              {/* Progress Pill */}
              <div className={`px-4 py-2 rounded-2xl border flex items-center gap-3 ${
                isDark ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"
              }`}>
                <span className="text-xs font-semibold text-slate-400">Completed:</span>
                <span className="text-sm font-black text-purple-400">{completedDays.length} / 30 Days</span>
                <div className="w-20 h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-purple-600 transition-all duration-300"
                    style={{ width: `${(completedDays.length / 30) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 5 Phases */}
            <div className="space-y-5 pt-2">
              {ROADMAP_30_DAYS.phases.map((phase) => (
                <div 
                  key={phase.phaseId}
                  className={`p-5 rounded-2xl border space-y-3 transition-all ${
                    isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 border-slate-800/40">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-black uppercase tracking-wider bg-purple-600 text-white">
                        {phase.daysRange}
                      </span>
                      <h3 className={`text-base font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                        {phase.name}
                      </h3>
                    </div>
                    <span className="text-xs font-medium text-emerald-400">
                      Goal: {phase.weeklyGoal}
                    </span>
                  </div>

                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Priority Focus Topics:
                    </span>
                    <ul className="space-y-1.5">
                      {phase.keyTopics.map((topic, tidx) => (
                        <li key={tidx} className="flex items-start gap-2 text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                          <span className={isDark ? "text-slate-300" : "text-slate-700"}>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Day Checkboxes for this phase */}
                  <div className="pt-3 border-t border-slate-800/40 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400 mr-1">Check off days:</span>
                    {Array.from({ length: phase.phaseId === 1 ? 7 : phase.phaseId === 2 ? 7 : phase.phaseId === 3 ? 7 : phase.phaseId === 4 ? 5 : 4 }).map((_, i) => {
                      const startDay = phase.phaseId === 1 ? 1 : phase.phaseId === 2 ? 8 : phase.phaseId === 3 ? 15 : phase.phaseId === 4 ? 22 : 27;
                      const dayNumber = startDay + i;
                      const isDone = completedDays.includes(dayNumber);
                      return (
                        <button
                          key={dayNumber}
                          onClick={() => toggleDayCompletion(dayNumber)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border ${
                            isDone
                              ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                              : isDark
                              ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                              : "bg-white border-slate-300 text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          {isDone ? <CheckSquare className="w-3.5 h-3.5 text-emerald-400" /> : <Square className="w-3.5 h-3.5 text-slate-500" />}
                          <span>Day {dayNumber}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          TAB 3: DAILY TIMETABLE (3H 20M)
      ════════════════════════════════════════════════════════════ */}
      {activeTab === "TIMETABLE" && (
        <div className="space-y-6">
          <div className={`p-6 rounded-3xl border space-y-4 ${
            isDark ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200"
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className={`text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                  Your 6-Day Study Timetable (3 Hours 20 Minutes)
                </h2>
                <p className="text-xs text-purple-400 font-bold uppercase tracking-wider">
                  Morning (75m) + Afternoon (75m) + Evening (50m) = 200 min daily
                </p>
              </div>

              {/* Active Timer Pill if running */}
              {activeTimerSlot && (
                <div className={`p-3 rounded-2xl border flex items-center gap-3 ${
                  isDark ? "bg-purple-950/40 border-purple-500/40 text-purple-200" : "bg-purple-50 border-purple-200 text-purple-900"
                }`}>
                  <Clock className="w-4 h-4 text-purple-400 animate-spin" />
                  <div className="text-xs">
                    <div className="font-bold">{activeTimerSlot.activity}</div>
                    <div className="text-lg font-black">{formatTimer(timerSecondsLeft)}</div>
                  </div>
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="p-1.5 rounded-lg bg-purple-600 text-white font-bold text-xs"
                  >
                    {isTimerRunning ? "Pause" : "Resume"}
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {DAILY_TIMETABLE_DATA.map((slot) => (
                <div 
                  key={slot.id}
                  className={`p-5 rounded-2xl border space-y-3 flex flex-col justify-between ${
                    isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                        slot.timeOfDay === "Morning" 
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : slot.timeOfDay === "Afternoon"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                      }`}>
                        {slot.timeOfDay} • {slot.durationMinutes} min
                      </span>
                      <button
                        onClick={() => handleStartTimer(slot)}
                        className="text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1"
                      >
                        <Play className="w-3 h-3" />
                        <span>Timer</span>
                      </button>
                    </div>

                    <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                      {slot.activity}
                    </h3>

                    <p className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                      {slot.objective}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800/40">
                    <div className="text-[11px] text-amber-400 flex items-start gap-1.5">
                      <Sparkles className="w-3 h-3 shrink-0 mt-0.5" />
                      <span>{slot.adhdTip}</span>
                    </div>

                    {onNavigateToSection && (
                      <button
                        onClick={() => onNavigateToSection(slot.actionLab)}
                        className={`w-full py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                          isDark
                            ? "bg-purple-950/40 hover:bg-purple-600 border-purple-500/30 text-purple-300 hover:text-white"
                            : "bg-purple-50 hover:bg-purple-600 border-purple-200 text-purple-700 hover:text-white"
                        }`}
                      >
                        <span>Open {slot.actionLab} Lab</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Day 7 Light Revision Box */}
            <div className={`p-4 rounded-2xl border text-xs flex items-center gap-3 ${
              isDark ? "bg-slate-950 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-700"
            }`}>
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <strong className={isDark ? "text-white" : "text-slate-900"}>Day 7 Rest & Light Revision: </strong>
                Take 1 light day each week. Do not learn large amounts of new grammar. Review vocabulary flashcards for 30 minutes, watch an episode of Easy German or Nicos Weg, and allow your brain to consolidate patterns.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          TAB 4: BEST FREE RESOURCES
      ════════════════════════════════════════════════════════════ */}
      {activeTab === "RESOURCES" && (
        <div className="space-y-6">
          <div className={`p-6 rounded-3xl border space-y-4 ${
            isDark ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200"
          }`}>
            <div>
              <h2 className={`text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                Best Free B1 Exam Preparation Resources
              </h2>
              <p className="text-xs text-purple-400 font-bold uppercase tracking-wider">
                100% Free • Verified Official Practice Materials & Media
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              {FREE_RESOURCES_DATA.map((res) => (
                <div 
                  key={res.id}
                  className={`p-5 rounded-2xl border space-y-3 flex flex-col justify-between ${
                    isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-400">
                        {res.provider}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {res.freeBadge}
                      </span>
                    </div>

                    <h3 className={`text-base font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                      {res.title}
                    </h3>

                    <p className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                      {res.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-slate-800/40">
                    <div className="text-xs text-slate-400">
                      <strong>How to use in 30 days: </strong>
                      {res.examApplication}
                    </div>

                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <span>Open Resource</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          TAB 5: BAMF & PERMANENT RESIDENCE COMPASS
      ════════════════════════════════════════════════════════════ */}
      {activeTab === "BAMF" && (
        <div className="space-y-6">
          <div className={`p-6 rounded-3xl border space-y-4 ${
            isDark ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200"
          }`}>
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                  Permanent Residence (Niederlassungserlaubnis) & BAMF Compass
                </h2>
                <p className="text-xs text-purple-400 font-bold uppercase tracking-wider">
                  BAMF-Certified Recognition Criteria (§ 2 Abs. 11 AufenthG)
                </p>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
              isDark ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-200" : "bg-emerald-50 border-emerald-200 text-emerald-900"
            }`}>
              <strong className="block text-sm font-bold mb-1">Official BAMF Certificate Acceptance:</strong>
              Both <strong>Goethe-Zertifikat B1</strong> and <strong>telc Deutsch B1</strong> (along with DTZ Deutsch-Test für Zuwanderer) are fully recognized across all federal immigration authorities in Germany. However, verify your specific residency paragraph before paying examination fees.
            </div>

            {/* Residency Routes Table */}
            <div className="space-y-3 pt-2">
              <h3 className={`text-sm font-bold uppercase tracking-wider ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                Legal Pathways to Niederlassungserlaubnis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BAMF_RESIDENCY_COMPASS.map((route) => (
                  <div 
                    key={route.id}
                    className={`p-4 rounded-2xl border space-y-2.5 ${
                      isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-purple-400 uppercase">
                        {route.lawParagraph}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300">
                        {route.residenceMonths} Months Residence
                      </span>
                    </div>

                    <h4 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                      {route.routeTitle}
                    </h4>

                    <div className="text-xs space-y-1 text-slate-400">
                      <div><strong>German Requirement: </strong>{route.germanLevel}</div>
                      <div><strong>Pension Payments: </strong>{route.pensionMonths} months required</div>
                      <p className={`pt-1 text-[11px] leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                        {route.notes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          TAB 6: B1 DIAGNOSTIC TEST SIMULATOR
      ════════════════════════════════════════════════════════════ */}
      {activeTab === "DIAGNOSTIC" && (
        <div className="space-y-6">
          {/* STAGE INTRO */}
          {diagStage === "INTRO" && (
            <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 text-center max-w-2xl mx-auto ${
              isDark ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400 mx-auto flex items-center justify-center">
                <Sparkles className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className={`text-2xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                  Your B1 Diagnostic Assessment
                </h2>
                <p className={`text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  Four sections • Approximately 30 to 40 minutes. Rather than studying blindly for 30 days, we test your actual baseline across Reading, Listening, Writing, and Speaking to identify exact grammar traps.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                {[
                  { title: "Lesen", sub: "5 items", icon: BookOpen },
                  { title: "Hören", sub: "5 dialogues", icon: Volume2 },
                  { title: "Schreiben", sub: "Email workout", icon: FileText },
                  { title: "Sprechen", sub: "3 tasks", icon: Mic }
                ].map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <div key={idx} className={`p-3 rounded-xl border ${
                      isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
                    }`}>
                      <Icon className="w-4 h-4 text-purple-400 mb-1" />
                      <div className="text-xs font-bold">{s.title}</div>
                      <div className="text-[10px] text-slate-400">{s.sub}</div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setDiagStage("LESEN")}
                className="w-full py-3.5 px-6 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-sm shadow-lg shadow-purple-600/30 transition flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Begin Section 1: Lesen (Reading)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STAGE 1: LESEN */}
          {diagStage === "LESEN" && (
            <div className={`p-6 rounded-3xl border space-y-6 ${
              isDark ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <div className="flex items-center justify-between border-b pb-4 border-slate-800/40">
                <div>
                  <span className="text-xs font-black uppercase text-purple-400 tracking-wider">
                    Diagnostic Section 1 of 4
                  </span>
                  <h3 className={`text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                    Lesen (Reading Comprehension)
                  </h3>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  {Object.keys(readingAnswers).length} / {DIAGNOSTIC_READING_QUESTIONS.length} Answered
                </span>
              </div>

              <div className="space-y-6">
                {DIAGNOSTIC_READING_QUESTIONS.map((q, qidx) => (
                  <div 
                    key={q.id}
                    className={`p-5 rounded-2xl border space-y-3 ${
                      isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-purple-500/20 text-purple-300">
                        Item {qidx + 1}: {q.taskType}
                      </span>
                    </div>

                    {/* German Text Snippet */}
                    <div className={`p-3.5 rounded-xl border text-xs leading-relaxed italic ${
                      isDark ? "bg-slate-900 border-slate-800 text-slate-200" : "bg-white border-slate-200 text-slate-800"
                    }`}>
                      "{q.textSnippet}"
                    </div>

                    <h4 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                      {q.question}
                    </h4>

                    {/* Options */}
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

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setDiagStage("INTRO")}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setDiagStage("HOEREN")}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/30 flex items-center gap-1.5"
                >
                  <span>Proceed to Hören (Listening)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STAGE 2: HOEREN */}
          {diagStage === "HOEREN" && (
            <div className={`p-6 rounded-3xl border space-y-6 ${
              isDark ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <div className="flex items-center justify-between border-b pb-4 border-slate-800/40">
                <div>
                  <span className="text-xs font-black uppercase text-purple-400 tracking-wider">
                    Diagnostic Section 2 of 4
                  </span>
                  <h3 className={`text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                    Hören (Listening Comprehension)
                  </h3>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  {Object.keys(listeningAnswers).length} / {DIAGNOSTIC_LISTENING_QUESTIONS.length} Answered
                </span>
              </div>

              <div className="space-y-6">
                {DIAGNOSTIC_LISTENING_QUESTIONS.map((q, qidx) => (
                  <div 
                    key={q.id}
                    className={`p-5 rounded-2xl border space-y-3 ${
                      isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-purple-500/20 text-purple-300">
                        Item {qidx + 1}: {q.speaker}
                      </span>
                      <button
                        onClick={() => playGermanAudio(q.germanAudioScript)}
                        className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-xs hover:bg-purple-700 flex items-center gap-1.5 active:scale-95"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Play German Audio</span>
                      </button>
                    </div>

                    <h4 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                      {q.question}
                    </h4>

                    {/* Options */}
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
                        onClick={() => setShowTranscript(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                        className="text-[11px] text-slate-400 hover:text-slate-300 underline"
                      >
                        {showTranscript[q.id] ? "Hide German Transcript" : "Show German Transcript (Double-Check)"}
                      </button>
                      {showTranscript[q.id] && (
                        <div className={`mt-2 p-3 rounded-xl border text-xs italic ${
                          isDark ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-700"
                        }`}>
                          "{q.germanAudioScript}"
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setDiagStage("LESEN")}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Lesen</span>
                </button>
                <button
                  onClick={() => setDiagStage("SCHREIBEN")}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/30 flex items-center gap-1.5"
                >
                  <span>Proceed to Schreiben (Writing)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STAGE 3: SCHREIBEN */}
          {diagStage === "SCHREIBEN" && (
            <div className={`p-6 rounded-3xl border space-y-6 ${
              isDark ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <div className="flex items-center justify-between border-b pb-4 border-slate-800/40">
                <div>
                  <span className="text-xs font-black uppercase text-purple-400 tracking-wider">
                    Diagnostic Section 3 of 4
                  </span>
                  <h3 className={`text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                    Schreiben (Writing Assessment)
                  </h3>
                </div>
                <span className="text-xs font-bold text-purple-400">
                  Target: 80+ Words
                </span>
              </div>

              {/* Prompt Card */}
              <div className={`p-5 rounded-2xl border space-y-3 ${
                isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
              }`}>
                <h4 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  {DIAGNOSTIC_WRITING_TASK.prompt}
                </h4>
                <p className={`text-xs ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  <strong>Situation: </strong>{DIAGNOSTIC_WRITING_TASK.context}
                </p>
                <div className="space-y-1 text-xs">
                  <strong className="text-slate-400">Address all 3 content points:</strong>
                  {DIAGNOSTIC_WRITING_TASK.requirements.map((r, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                      <span className={isDark ? "text-slate-300" : "text-slate-700"}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-400">Your Email Draft:</span>
                  <span className={`font-mono font-bold ${emailWordsCount >= 80 ? "text-emerald-400" : "text-amber-400"}`}>
                    {emailWordsCount} words {emailWordsCount >= 80 ? "(Target Achieved)" : "(Need ~80 words)"}
                  </span>
                </div>
                <textarea
                  value={userEmailText}
                  onChange={(e) => setUserEmailText(e.target.value)}
                  placeholder="Sehr geehrter Herr Berg,..."
                  rows={8}
                  className={`w-full p-4 rounded-2xl text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-purple-500 border transition ${
                    isDark ? "bg-slate-950 border-slate-800 text-white placeholder-slate-600" : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                  }`}
                />
              </div>

              {/* Real-time Automated Analysis */}
              <div className={`p-4 rounded-2xl border space-y-2 text-xs ${
                isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
              }`}>
                <span className="font-bold uppercase tracking-wider text-purple-400 text-[10px]">
                  Real-time Formula & Connector Audit
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <div className={`p-2 rounded-lg border flex items-center gap-1.5 ${
                    hasSalutation ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300" : "bg-slate-900 border-slate-800 text-slate-500"
                  }`}>
                    {hasSalutation ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    <span>Salutation</span>
                  </div>
                  <div className={`p-2 rounded-lg border flex items-center gap-1.5 ${
                    hasClosing ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300" : "bg-slate-900 border-slate-800 text-slate-500"
                  }`}>
                    {hasClosing ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    <span>Sign-off Closing</span>
                  </div>
                  <div className={`p-2 rounded-lg border flex items-center gap-1.5 ${
                    emailWordsCount >= 80 ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300" : "bg-slate-900 border-slate-800 text-slate-500"
                  }`}>
                    {emailWordsCount >= 80 ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    <span>80+ Words</span>
                  </div>
                  <div className={`p-2 rounded-lg border flex items-center gap-1.5 ${
                    detectedConnectors.length >= 2 ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300" : "bg-slate-900 border-slate-800 text-slate-500"
                  }`}>
                    {detectedConnectors.length >= 2 ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    <span>B1 Connectors ({detectedConnectors.length})</span>
                  </div>
                </div>
              </div>

              {/* Sample Model Answer Toggle */}
              <div>
                <button
                  onClick={() => setShowSampleWriting(!showSampleWriting)}
                  className="text-xs text-purple-400 hover:text-purple-300 underline font-bold"
                >
                  {showSampleWriting ? "Hide Model B1 Email" : "Inspect Model B1 Answer"}
                </button>
                {showSampleWriting && (
                  <div className={`mt-3 p-4 rounded-2xl border text-xs whitespace-pre-line leading-relaxed ${
                    isDark ? "bg-slate-950 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-800"
                  }`}>
                    {DIAGNOSTIC_WRITING_TASK.sampleModelAnswer}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setDiagStage("HOEREN")}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Hören</span>
                </button>
                <button
                  onClick={() => setDiagStage("SPRECHEN")}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/30 flex items-center gap-1.5"
                >
                  <span>Proceed to Sprechen (Speaking)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STAGE 4: SPRECHEN */}
          {diagStage === "SPRECHEN" && (
            <div className={`p-6 rounded-3xl border space-y-6 ${
              isDark ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <div className="flex items-center justify-between border-b pb-4 border-slate-800/40">
                <div>
                  <span className="text-xs font-black uppercase text-purple-400 tracking-wider">
                    Diagnostic Section 4 of 4
                  </span>
                  <h3 className={`text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                    Sprechen (Oral Self-Assessment)
                  </h3>
                </div>
                <span className="text-xs font-bold text-purple-400">
                  3 Official Exam Tasks
                </span>
              </div>

              {/* Task Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {DIAGNOSTIC_SPEAKING_TASKS.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveSpeakingTab(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                      activeSpeakingTab === idx
                        ? "bg-purple-600 text-white border-purple-500"
                        : isDark
                        ? "bg-slate-950 border-slate-800 text-slate-400"
                        : "bg-slate-100 border-slate-200 text-slate-600"
                    }`}
                  >
                    Teil {t.teil}
                  </button>
                ))}
              </div>

              {/* Active Task Card */}
              {(() => {
                const task = DIAGNOSTIC_SPEAKING_TASKS[activeSpeakingTab];
                const isPassed = speakingSelfScores[task.id];
                return (
                  <div className={`p-5 rounded-2xl border space-y-4 ${
                    isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}>
                    <div className="flex items-center justify-between">
                      <h4 className={`text-base font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                        {task.title}
                      </h4>
                      <button
                        onClick={() => playGermanAudio(task.sampleTranscript)}
                        className="px-3 py-1 rounded-xl bg-purple-600 text-white text-xs font-bold flex items-center gap-1.5"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Listen to Model</span>
                      </button>
                    </div>

                    <p className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                      <strong>Task Prompt: </strong>{task.prompt}
                    </p>

                    <div className="space-y-1.5 text-xs">
                      <strong className="text-purple-400">Essential Formula Phrases:</strong>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {task.suggestedPhrases.map((phrase, pidx) => (
                          <div key={pidx} className={`p-2 rounded-lg border ${
                            isDark ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-700"
                          }`}>
                            "{phrase}"
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`p-3 rounded-xl border text-xs text-slate-400 ${
                      isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                    }`}>
                      <strong>Examiner Evaluation Tip: </strong>{task.evaluationTips}
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => setSpeakingSelfScores(prev => ({ ...prev, [task.id]: !prev[task.id] }))}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 border ${
                          isPassed
                            ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
                            : isDark
                            ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                            : "bg-white border-slate-300 text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {isPassed ? <CheckSquare className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4 text-slate-500" />}
                        <span>{isPassed ? "Marked as Confident (Task Passed)" : "Mark as Completed & Confident"}</span>
                      </button>
                    </div>
                  </div>
                );
              })()}

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setDiagStage("SCHREIBEN")}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Schreiben</span>
                </button>
                <button
                  onClick={handleFinishDiagnostic}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center gap-1.5 active:scale-95"
                >
                  <span>Finish & Generate Diagnostic Report</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STAGE 5: RESULTS & PRESCRIPTION */}
          {diagStage === "RESULTS" && (
            <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
              isDark ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <div className="text-center space-y-2 border-b pb-6 border-slate-800/40">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  Diagnostic Assessment Complete
                </span>
                <h3 className={`text-2xl sm:text-3xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                  Your Baseline Readiness & Prescription Report
                </h3>
                <p className={`text-xs sm:text-sm max-w-xl mx-auto ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  Here is your baseline across all 4 B1 skills, specific identified grammar traps, and your calibrated 30-day priorities.
                </p>
              </div>

              {/* 4 Skill Score Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: "Lesen (Reading)", score: `${diagnosticScore.readCorrect} / 5`, pct: diagnosticScore.readPct },
                  { title: "Hören (Listening)", score: `${diagnosticScore.listenCorrect} / 5`, pct: diagnosticScore.listenPct },
                  { title: "Schreiben (Writing)", score: `${diagnosticScore.writePct}%`, pct: diagnosticScore.writePct },
                  { title: "Sprechen (Speaking)", score: `${diagnosticScore.speakTasksPassed} / 3`, pct: diagnosticScore.speakPct }
                ].map((s, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-2xl border text-center space-y-2 ${
                      isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-400">{s.title}</span>
                    <div className={`text-2xl font-black ${
                      s.pct >= 60 ? "text-emerald-400" : "text-amber-400"
                    }`}>
                      {s.score}
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div 
                        className={`h-full ${s.pct >= 60 ? "bg-emerald-500" : "bg-amber-500"}`}
                        style={{ width: `${s.pct}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {s.pct >= 60 ? "Pass Threshold (60%) Met" : "Requires Targeted Drills"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Weakness Diagnosis & Prescriptions */}
              <div className={`p-5 rounded-2xl border space-y-4 ${
                isDark ? "bg-purple-950/20 border-purple-500/30" : "bg-purple-50 border-purple-200"
              }`}>
                <h4 className="text-sm font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Key Weaknesses Detected & 30-Day Adjustments:</span>
                </h4>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400 mt-1 shrink-0" />
                    <div>
                      <strong className={isDark ? "text-white" : "text-slate-900"}>Subordinate Clause Word Order (Verb Kicker): </strong>
                      Make sure conjugated verbs go to the absolute end after <em>weil</em>, <em>dass</em>, and <em>obwohl</em> (e.g. "...weil ich krank <strong>bin</strong>").
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400 mt-1 shrink-0" />
                    <div>
                      <strong className={isDark ? "text-white" : "text-slate-900"}>Dative Prepositions Mastery: </strong>
                      Reinforce the 7 fixed Dative prepositions (<em>aus, bei, mit, nach, seit, von, zu</em>). Do not confuse with accusative prepositions (<em>für, ohne, um, durch, gegen</em>).
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400 mt-1 shrink-0" />
                    <div>
                      <strong className={isDark ? "text-white" : "text-slate-900"}>Listening Speed & Distractor Traps: </strong>
                      Audio exam recordings often mention all 3 multiple choice options; train yourself to listen for negative indicators (<em>nicht</em>, <em>leider abgesagt</em>).
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => setActiveTab("ROADMAP")}
                  className="flex-1 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/30 flex items-center justify-center gap-2 active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Open Your 30-Day Plan</span>
                </button>
                <button
                  onClick={() => {
                    setDiagStage("INTRO");
                    setReadingAnswers({});
                    setListeningAnswers({});
                    setUserEmailText("");
                    setSpeakingSelfScores({});
                  }}
                  className={`py-3 px-5 rounded-2xl font-bold text-xs border transition flex items-center justify-center gap-1.5 ${
                    isDark ? "bg-slate-950 border-slate-800 text-slate-300 hover:text-white" : "bg-white border-slate-200 text-slate-700 hover:text-slate-900"
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Diagnostic</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
