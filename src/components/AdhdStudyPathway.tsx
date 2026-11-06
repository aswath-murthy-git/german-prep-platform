"use client";

import React, { useState, useEffect } from "react";
import { 
  ADHD_STUDY_PATHWAY, 
  WeeklyStudyPlan, 
  DailyStudyTask 
} from "@/data/adhd_study_pathway";
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Flame, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Target, 
  Zap, 
  ChevronRight, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight,
  Brain,
  Timer
} from "lucide-react";
import confetti from "canvas-confetti";

interface AdhdStudyPathwayProps {
  onNavigateToSection?: (section: "PATHWAY" | "ACADEMY" | "CASES" | "CITIZENSHIP" | "WRITING" | "SPEAKING" | "READING" | "LISTENING" | "GRAMMAR" | "KEYWORDS" | "CONJUNCTIONS") => void;
}

export const AdhdStudyPathway: React.FC<AdhdStudyPathwayProps> = ({ onNavigateToSection }) => {
  const [selectedWeek, setSelectedWeek] = useState<1 | 2 | 3 | 4>(1);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);

  // ADHD Focus Timer State
  const [timerMode, setTimerMode] = useState<15 | 25>(15);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(15 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Load completed tasks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("german_prep_adhd_pathway_progress");
      if (saved) {
        setCompletedTaskIds(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage read errors
    }

    const handleGlobalReset = () => {
      setCompletedTaskIds([]);
    };
    window.addEventListener("german_prep_reset_progress", handleGlobalReset);
    return () => window.removeEventListener("german_prep_reset_progress", handleGlobalReset);
  }, []);

  // Timer interval effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timeLeftSeconds > 0) {
      interval = setInterval(() => {
        setTimeLeftSeconds(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeftSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeLeftSeconds]);

  const handleToggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleResetTimer = (minutes: 15 | 25) => {
    setIsTimerRunning(false);
    setTimerMode(minutes);
    setTimeLeftSeconds(minutes * 60);
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleToggleTask = (taskId: string) => {
    let next: string[];
    if (completedTaskIds.includes(taskId)) {
      next = completedTaskIds.filter(id => id !== taskId);
    } else {
      next = [...completedTaskIds, taskId];
      confetti({ particleCount: 30, spread: 45, origin: { y: 0.7 } });
    }
    setCompletedTaskIds(next);
    try {
      localStorage.setItem("german_prep_adhd_pathway_progress", JSON.stringify(next));
    } catch {
      // Ignore write errors
    }
  };

  const curWeekPlan = ADHD_STUDY_PATHWAY.find(w => w.week === selectedWeek) || ADHD_STUDY_PATHWAY[0];

  const totalTasks = 24; // 6 days x 4 weeks
  const completedCount = completedTaskIds.length;
  const overallPercentage = Math.round((completedCount / totalTasks) * 100);

  // Week-specific completion
  const weekTasks = curWeekPlan.days.map(d => d.id);
  const weekCompletedCount = weekTasks.filter(id => completedTaskIds.includes(id)).length;
  const weekPercentage = Math.round((weekCompletedCount / weekTasks.length) * 100);

  return (
    <div className="space-y-6">
      {/* Hero Header with 3-4 Hours Target & ADHD Accommodations */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-amber-500/30 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/15 border border-amber-500/40 rounded-full text-xs font-bold text-amber-300">
              <Brain className="w-3.5 h-3.5 text-amber-400" />
              <span>Recommended Study Pathway for Absolute Beginners (A0 → B1)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              4-Week ADHD Exam Pathway: <span className="text-amber-400">3-4 Hours / Week</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Designed specifically for busy and neurodivergent learners. No overwhelming textbook chapters: just <strong>30 to 35 minutes per day, 6 days per week</strong> of high-yield practice drills to guarantee a passing score on Goethe B1, TELC B1, and DTZ.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 shrink-0">
            <div className="text-center px-3">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Weekly Time</div>
              <div className="text-xl font-black text-amber-400">3 - 4 Hours</div>
              <div className="text-[10px] text-slate-500">30 min / 6 days</div>
            </div>
            <div className="w-px h-10 bg-slate-800 hidden sm:block" />
            <div className="text-center px-3">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Completed</div>
              <div className="text-xl font-black text-emerald-400">{completedCount} / {totalTasks} Days</div>
              <div className="text-[10px] text-slate-500">{overallPercentage}% Complete</div>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-300">
            <span>Overall B1 Pass Readiness: 4-Week Journey</span>
            <div className="flex items-center gap-3">
              {completedCount > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Reset 4-week pathway checklist to start fresh?")) {
                      setCompletedTaskIds([]);
                      localStorage.removeItem("german_prep_adhd_pathway_progress");
                    }
                  }}
                  className="text-[11px] text-slate-400 hover:text-rose-300 font-medium flex items-center gap-1 transition"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Pathway ↺</span>
                </button>
              )}
              <span className="text-amber-400 font-mono">{overallPercentage}%</span>
            </div>
          </div>
          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 transition-all duration-500 rounded-full"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Interactive ADHD Focus Timer & Week Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Built-in Focus Timer */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Timer className="w-4 h-4 text-amber-400" />
              <span>ADHD Micro-Sprint Timer</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleResetTimer(15)}
                className={`px-2 py-0.5 rounded-lg text-xs font-bold transition ${
                  timerMode === 15 ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                15m
              </button>
              <button
                onClick={() => handleResetTimer(25)}
                className={`px-2 py-0.5 rounded-lg text-xs font-bold transition ${
                  timerMode === 25 ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                25m
              </button>
            </div>
          </div>

          <div className="py-3 text-center">
            <div className="text-4xl sm:text-5xl font-mono font-black text-amber-300 tracking-tight drop-shadow-md">
              {formatTimer(timeLeftSeconds)}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {isTimerRunning ? "Focus Sprint Active: Stay on this single drill!" : "Ready for today's 30-min drill"}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
            <button
              onClick={handleToggleTimer}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                isTimerRunning 
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30" 
                  : "bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-md shadow-amber-500/20 font-black"
              }`}
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isTimerRunning ? "Pause Sprint" : "Start Focus Timer"}</span>
            </button>
            <button
              onClick={() => handleResetTimer(timerMode)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4-Week Navigation Pills */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Select Practice Week
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {ADHD_STUDY_PATHWAY.map(w => {
              const isSelected = w.week === selectedWeek;
              const wTaskIds = w.days.map(d => d.id);
              const doneCount = wTaskIds.filter(id => completedTaskIds.includes(id)).length;
              const isWeekDone = doneCount === wTaskIds.length;

              return (
                <button
                  key={w.week}
                  onClick={() => setSelectedWeek(w.week)}
                  className={`p-3 rounded-xl border text-left transition flex flex-col justify-between gap-1.5 ${
                    isSelected
                      ? "bg-amber-500/20 border-amber-500 text-white shadow-md shadow-amber-500/15"
                      : "bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-black text-amber-400">Week {w.week}</span>
                    {isWeekDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <div className="text-xs font-bold line-clamp-1 text-slate-200">
                    {w.week === 1 && "Foundations"}
                    {w.week === 2 && "Modal Verbs"}
                    {w.week === 3 && "Writing & Speaking"}
                    {w.week === 4 && "Exam & Citizenship"}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {doneCount} / 6 Days
                  </div>
                </button>
              );
            })}
          </div>

          {/* Current Week Header */}
          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <div>
              <strong className="text-white">{curWeekPlan.title}:</strong> {curWeekPlan.subtitle}
            </div>
            <div className="text-amber-400 font-mono font-bold shrink-0">
              {curWeekPlan.weeklyTargetHours}
            </div>
          </div>
        </div>
      </div>

      {/* Week Overview Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Week {curWeekPlan.week} Milestone Goal</div>
            <h3 className="text-lg font-black text-white">{curWeekPlan.milestoneGoal}</h3>
          </div>
          <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 font-bold shrink-0">
            Week Progress: {weekCompletedCount} of 6 Days ({weekPercentage}%)
          </div>
        </div>

        {/* Core Concepts Badges */}
        <div className="space-y-1.5">
          <div className="text-xs font-bold text-slate-400">Core Concepts Covered in Week {curWeekPlan.week}:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {curWeekPlan.coreConcepts.map((concept, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{concept}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Micro-Task Cards (Days 1 to 6) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-black text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Daily 30-Minute Micro-Routines (6 Days / Week)</span>
          </h4>
          <span className="text-xs text-slate-500">Day 7 is optional recovery / review</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {curWeekPlan.days.map((day) => {
            const isCompleted = completedTaskIds.includes(day.id);

            return (
              <div
                key={day.id}
                className={`p-5 rounded-2xl border transition shadow-lg flex flex-col justify-between gap-4 ${
                  isCompleted 
                    ? "bg-slate-900/60 border-emerald-500/40 shadow-emerald-500/5" 
                    : "bg-slate-900 border-slate-800 hover:border-slate-700"
                }`}
              >
                {/* Card Top: Day title, duration, checkbox */}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-500/20">
                          {day.focusModule}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {day.durationMinutes} mins
                        </span>
                      </div>
                      <h5 className="text-base font-black text-white leading-snug">
                        {day.dayTitle}
                      </h5>
                    </div>

                    {/* Completion Checkbox */}
                    <button
                      onClick={() => handleToggleTask(day.id)}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition shrink-0 ${
                        isCompleted
                          ? "bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20"
                          : "bg-slate-950 border border-slate-700 text-slate-500 hover:border-amber-400 hover:text-white"
                      }`}
                      title={isCompleted ? "Mark incomplete" : "Mark completed"}
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Objective */}
                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                    <strong className="text-amber-300">Goal:</strong> {day.objective}
                  </p>

                  {/* ADHD Focus Hack */}
                  <div className="mt-2 text-[11px] text-amber-300/90 bg-amber-950/30 p-2 rounded-lg border border-amber-500/20 flex items-start gap-1.5">
                    <Zap className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>ADHD Tip:</strong> {day.adhdFocusTip}</span>
                  </div>

                  {/* Actionable Task Checklist */}
                  <div className="mt-3 space-y-1.5">
                    {day.tasks.map((task, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                        <span className="text-amber-500/80 font-mono text-[11px] shrink-0">•</span>
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom: Direct Launch Action Button */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>{day.badgeReward}</span>
                  </div>

                  <button
                    onClick={() => {
                      if (onNavigateToSection) {
                        onNavigateToSection(day.targetSection);
                      }
                    }}
                    className="py-1.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1 shadow-sm active:scale-95"
                  >
                    <span>{day.actionLabel}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
