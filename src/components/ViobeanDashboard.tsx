"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { 
  BookOpen, 
  PenTool, 
  Headphones, 
  Mic, 
  Sparkles, 
  Layers, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Award, 
  Zap, 
  Clock, 
  ChevronRight,
  Compass,
  Rocket 
} from "lucide-react";

interface ViobeanDashboardProps {
  onNavigateTo: (section: string, subpart?: string) => void;
  onOpenExamDateModal?: () => void;
}

export const ViobeanDashboard: React.FC<ViobeanDashboardProps> = ({ 
  onNavigateTo,
  onOpenExamDateModal 
}) => {
  const { profile, account, overallReadiness, theme } = useUser();
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [greeting, setGreeting] = useState<string>("Guten Tag");
  const [todayDayIdx, setTodayDayIdx] = useState<number>(0);

  const isDark = theme === "dark";

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Guten Morgen");
    else if (hour < 18) setGreeting("Guten Tag");
    else setGreeting("Guten Abend");

    setTodayDayIdx((new Date().getDay() + 6) % 7);
  }, []);

  const examLabel = profile.targetExam === "TELC_B1"
    ? "telc B1"
    : profile.targetExam === "GOETHE_B1"
    ? "Goethe B1"
    : "DTZ";

  // Calculate mastery percentages per skill from profile data
  const readingMastery = Math.min(100, Math.round(((profile.completedReadingIds?.length || 0) / 15) * 100));
  const grammarMastery = Math.min(100, Math.round(((profile.completedListeningIds?.length || 0) / 10) * 100 + 40));
  const listeningMastery = Math.min(100, Math.round(((profile.completedListeningIds?.length || 0) / 12) * 100));
  const writingMastery = Math.min(100, Math.round(((profile.completedWritingIds?.length || 0) / 8) * 100));
  const speakingMastery = Math.min(100, Math.round(((profile.masteredSpeakingIds?.length || 0) / 6) * 100));

  // Circular donut chart circumference calculation (radius = 36, circumference = 2 * PI * 36 ~= 226)
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallReadiness / 100) * circumference;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* ─── HEADER ROW: GREETING & EXAM DATE ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
          isDark ? "text-white" : "text-slate-900"
        }`}>
          {greeting}, {account.username || profile.name || "Student"} <span className="inline-block animate-bounce">👋</span>
        </h1>

        <button
          type="button"
          onClick={onOpenExamDateModal}
          className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-2xl border shadow-sm transition active:scale-95 self-start sm:self-auto ${
            isDark 
              ? "bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800" 
              : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200/80"
          }`}
        >
          <Calendar className="w-4 h-4 text-purple-500" />
          <span>{profile.targetDate ? `Target: ${profile.targetDate}` : "Set your exam date"}</span>
        </button>
      </div>

      {/* ─── ZERO TO B1 GUARANTEED PASS ENGINE HERO CARD ─── */}
      <div className={`p-6 sm:p-7 rounded-3xl border shadow-lg transition-all duration-300 relative overflow-hidden ${
        isDark 
          ? "bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950/50 border-purple-500/40 text-white" 
          : "bg-gradient-to-r from-purple-100 via-white to-indigo-50 border-purple-300 text-slate-900"
      }`}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`p-1.5 rounded-xl ${isDark ? "bg-purple-900/60 text-purple-300" : "bg-purple-100 text-purple-800"}`}>
                <Rocket className="w-4 h-4" />
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-purple-400">
                Zero to B1 Pass Guarantee Engine
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                isDark ? "bg-slate-900/80 border-slate-700 text-amber-300" : "bg-white border-slate-200 text-amber-700"
              }`}>
                From A0 to Official Certificate
              </span>
            </div>

            <h3 className="text-lg sm:text-2xl font-black tracking-tight">
              Start at Complete Zero (A0) • Pass B1 with Confidence
            </h3>

            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              Do not get lost in 500 pages of grammar. Master the <strong>5 high-yield stages</strong>, the <strong>45/45 Universal Email Template</strong>, the <strong>Verb Kicker rule</strong>, and the <strong>60% Pass Safety Net</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {["Stage 0: A0 Skeleton", "Stage 1: A1 Builder", "Stage 2: A2 Perfekt & Dativ", "Stage 3: B1 Architecture", "Stage 4: B1 Hacks"].map((stage, i) => (
                <span
                  key={i}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border ${
                    isDark ? "bg-slate-950/80 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-700"
                  }`}
                >
                  {stage}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 self-start lg:self-center">
            <button
              type="button"
              onClick={() => onNavigateTo("ZERO_TO_B1")}
              className="py-3 px-5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs sm:text-sm shadow-md shadow-purple-600/30 transition flex items-center gap-2 active:scale-95"
            >
              <Rocket className="w-4 h-4" />
              <span>A0 → B1 Flight Path</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>

            <button
              type="button"
              onClick={() => onNavigateTo("ZERO_TO_B1")}
              className={`py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm border transition flex items-center gap-1.5 ${
                isDark ? "bg-slate-950/80 border-slate-700 text-amber-300 hover:bg-slate-800" : "bg-white border-purple-200 text-purple-700 hover:bg-purple-50"
              }`}
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>115+ Practice Drills</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── 30-DAY FAST-TRACK & B1 DIAGNOSTIC HERO CARD ─── */}
      <div className={`p-6 sm:p-7 rounded-3xl border shadow-sm transition-all duration-300 relative overflow-hidden ${
        isDark 
          ? "bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/40 border-purple-500/30 text-white" 
          : "bg-gradient-to-r from-purple-100/80 via-white to-indigo-50 border-purple-200 text-slate-900"
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className={`p-1.5 rounded-xl ${isDark ? "bg-purple-900/60 text-purple-300" : "bg-purple-100 text-purple-800"}`}>
                <Compass className="w-4 h-4" />
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-purple-400">
                Strategic 30-Day Fast-Track & Diagnostic
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-black tracking-tight">
              30-Day B1 Preparation Roadmap & Daily Timetable
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              Goethe vs telc strategic comparison, 3h 20m daily focus schedule, best free practice materials, BAMF permanent residence compliance, and instant 4-skill diagnostic baseline.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigateTo("FAST_TRACK")}
              className="py-3 px-5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/30 transition flex items-center gap-2 active:scale-95"
            >
              <Compass className="w-4 h-4" />
              <span>Open 30-Day Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ─── HERO PROMO CAROUSEL CARD (Mint Green / Teal Accent) ─── */}
      <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-7 shadow-sm border transition-colors duration-200 ${
        isDark 
          ? "bg-gradient-to-r from-teal-950/40 via-slate-900 to-emerald-950/40 border-teal-500/30 text-teal-100" 
          : "bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-emerald-200/90 text-teal-900"
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
          <div className="space-y-1.5 max-w-xl">
            <div className={`flex items-center gap-2 font-bold text-base sm:text-lg ${
              isDark ? "text-teal-300" : "text-teal-900"
            }`}>
              <span className={`p-1.5 rounded-xl ${isDark ? "bg-teal-900/60 text-teal-300" : "bg-teal-100 text-teal-800"}`}>
                <PenTool className="w-4 h-4" />
              </span>
              <span>Practise writing with AI feedback</span>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed ${
              isDark ? "text-slate-300" : "text-teal-800/90"
            }`}>
              Get your text scored on the official {examLabel} criteria with instant corrections, B1 connectors, and examiner feedback.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigateTo("WRITING")}
                className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold rounded-full transition shadow-sm active:scale-95 ${
                  isDark
                    ? "bg-teal-500 hover:bg-teal-400 text-slate-950 font-black"
                    : "bg-teal-800 hover:bg-teal-900 text-white"
                }`}
              >
                <span>Try FREE Session</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Decorative Icon */}
          <div className="hidden sm:flex items-center justify-center p-4 rounded-3xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
            <Sparkles className="w-12 h-12 stroke-[1.5]" />
          </div>
        </div>
      </div>

      {/* ─── FULL MOCK EXAM SUITE LAUNCHER CARDS ─── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className={`text-base sm:text-xl font-black flex items-center gap-2 ${
              isDark ? "text-white" : "text-slate-900"
            }`}>
              <Award className="w-5 h-5 text-amber-400" />
              <span>Full Mock Exam Suite (telc & Goethe A1, A2, B1)</span>
            </h2>
            <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              24 full authentic examination papers with 4-subtest timers, audio dialogues, and automated Zeugnis scoring
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTo("EXAM")}
            className="text-xs font-bold text-purple-400 hover:text-purple-300 hover:underline flex items-center gap-1"
          >
            <span>View All 24 Mock Sets</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Quick-Launch Exam Track Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { board: "TELC", level: "A1", label: "telc A1 (4 Sets)" },
            { board: "GOETHE", level: "A1", label: "Goethe A1 (4 Sets)" },
            { board: "TELC", level: "A2", label: "telc A2 (4 Sets)" },
            { board: "GOETHE", level: "A2", label: "Goethe A2 (4 Sets)" },
            { board: "TELC", level: "B1", label: "telc B1 (4 Sets)" },
            { board: "GOETHE", level: "B1", label: "Goethe B1 (4 Sets)" }
          ].map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onNavigateTo("EXAM")}
              className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between space-y-2 group shadow-xs active:scale-95 ${
                isDark 
                  ? "bg-slate-900/90 border-slate-800 hover:border-purple-500/50 hover:bg-slate-900" 
                  : "bg-white border-slate-200 hover:border-purple-300 hover:bg-purple-50/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                  item.board === "TELC" ? "bg-blue-600 text-white" : "bg-purple-600 text-white"
                }`}>
                  {item.level}
                </span>
                <span className="text-[10px] font-bold text-slate-400">{item.board}</span>
              </div>
              <div className="text-xs font-bold group-hover:text-purple-400 transition">
                {item.label}
              </div>
              <div className="flex items-center gap-1 text-[11px] text-purple-400 font-semibold">
                <span>Start Mock</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ─── YOUR PLAN FOR TODAY (Quick 10-Minute Daily Sprint) ─── */}
      <div className={`rounded-3xl border p-5 sm:p-6 shadow-sm space-y-4 transition-colors duration-200 ${
        isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200/90 text-slate-900"
      }`}>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className={`text-base sm:text-lg font-bold flex items-center gap-2 ${
              isDark ? "text-white" : "text-slate-900"
            }`}>
              <span>Your plan for today</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                isDark ? "bg-purple-950/60 text-purple-300 border border-purple-500/30" : "bg-purple-100 text-purple-700"
              }`}>
                ~10 min
              </span>
            </h2>
            <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Recommended daily focus based on your target {examLabel} exam date.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTo("EXAM")}
            className="text-xs font-bold text-purple-400 hover:text-purple-300 hover:underline flex items-center gap-1"
          >
            <span>View all</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Sprint Task Item */}
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition ${
          isDark 
            ? "bg-slate-950/60 border-slate-800 hover:border-slate-700" 
            : "bg-slate-50 border-slate-100 hover:border-slate-200"
        }`}>
          <div className="flex items-start sm:items-center gap-3">
            <div className={`p-2.5 rounded-2xl border shrink-0 ${
              isDark ? "bg-purple-950/60 text-purple-400 border-purple-500/30" : "bg-purple-100 text-purple-700 border-purple-200"
            }`}>
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                  isDark ? "bg-slate-800 text-slate-300" : "bg-slate-200 text-slate-700"
                }`}>
                  Leseverstehen
                </span>
                <span className={`text-xs sm:text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  Teil 2: Pressebericht & Fakten
                </span>
              </div>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                5 Multiple-Choice Questions · 25 Minutes · Fact & Number scanning practice
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTo("READING", "Teil 2")}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold rounded-2xl transition shadow-sm active:scale-95 shrink-0"
          >
            <span>Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ─── TWO-COLUMN MAIN SECTION: EXPLORE EXAM FORMAT & OVERALL MASTERY ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Span 2): LET'S EXPLORE THE EXAM FORMAT */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className={`text-base sm:text-lg font-bold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}>
              Let&apos;s explore the exam format
            </h3>
            <span className={`text-xs font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              {examLabel} Subtests
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Leseverstehen */}
            <div
              onClick={() => onNavigateTo("READING")}
              className={`p-5 rounded-3xl border transition cursor-pointer flex flex-col justify-between space-y-3 group ${
                isDark 
                  ? "bg-slate-900/90 border-slate-800 hover:border-purple-500/40 hover:bg-slate-800/80" 
                  : "bg-white border-slate-200/90 hover:border-purple-200 hover:bg-purple-50/20 shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-2xl border ${
                    isDark ? "bg-purple-950/60 text-purple-400 border-purple-500/30" : "bg-purple-50 text-purple-600 border-purple-200"
                  }`}>
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold group-hover:text-purple-400 transition ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}>
                      Leseverstehen
                    </h4>
                    <span className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      3 parts · 20 questions
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-purple-400">
                  {readingMastery}%
                </span>
              </div>

              <p className={`text-xs leading-relaxed line-clamp-2 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Match headlines, analyze factual press reports, and scan situational advertisements.
              </p>

              <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
                <div 
                  className="bg-purple-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${readingMastery}%` }} 
                />
              </div>
            </div>

            {/* 2. Sprachbausteine */}
            <div
              onClick={() => onNavigateTo("GRAMMAR")}
              className={`p-5 rounded-3xl border transition cursor-pointer flex flex-col justify-between space-y-3 group ${
                isDark 
                  ? "bg-slate-900/90 border-slate-800 hover:border-indigo-500/40 hover:bg-slate-800/80" 
                  : "bg-white border-slate-200/90 hover:border-indigo-200 hover:bg-indigo-50/20 shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-2xl border ${
                    isDark ? "bg-indigo-950/60 text-indigo-400 border-indigo-500/30" : "bg-indigo-50 text-indigo-600 border-indigo-200"
                  }`}>
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold group-hover:text-indigo-400 transition ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}>
                      Sprachbausteine
                    </h4>
                    <span className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      2 parts · 20 questions
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-indigo-400">
                  {grammarMastery}%
                </span>
              </div>

              <p className={`text-xs leading-relaxed line-clamp-2 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Grammar multiple-choice traps and 15-word vocabulary banks in official correspondence.
              </p>

              <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${grammarMastery}%` }} 
                />
              </div>
            </div>

            {/* 3. Hörverstehen */}
            <div
              onClick={() => onNavigateTo("LISTENING")}
              className={`p-5 rounded-3xl border transition cursor-pointer flex flex-col justify-between space-y-3 group ${
                isDark 
                  ? "bg-slate-900/90 border-slate-800 hover:border-blue-500/40 hover:bg-slate-800/80" 
                  : "bg-white border-slate-200/90 hover:border-blue-200 hover:bg-blue-50/20 shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-2xl border ${
                    isDark ? "bg-blue-950/60 text-blue-400 border-blue-500/30" : "bg-blue-50 text-blue-600 border-blue-200"
                  }`}>
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold group-hover:text-blue-400 transition ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}>
                      Hörverstehen
                    </h4>
                    <span className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      3 parts · 20 questions
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-400">
                  {listeningMastery}%
                </span>
              </div>

              <p className={`text-xs leading-relaxed line-clamp-2 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Train announcements, radio reports, and everyday conversations with speed control.
              </p>

              <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${listeningMastery}%` }} 
                />
              </div>
            </div>

            {/* 4. Schriftlicher Ausdruck (Writing) */}
            <div
              onClick={() => onNavigateTo("WRITING")}
              className={`p-5 rounded-3xl border transition cursor-pointer flex flex-col justify-between space-y-3 group ${
                isDark 
                  ? "bg-slate-900/90 border-slate-800 hover:border-emerald-500/40 hover:bg-slate-800/80" 
                  : "bg-white border-slate-200/90 hover:border-emerald-200 hover:bg-emerald-50/20 shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-2xl border ${
                    isDark ? "bg-emerald-950/60 text-emerald-400 border-emerald-500/30" : "bg-emerald-50 text-emerald-600 border-emerald-200"
                  }`}>
                    <PenTool className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold group-hover:text-emerald-400 transition ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}>
                      Schriftlicher Ausdruck
                    </h4>
                    <span className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      1 task · 4 Leitpunkte
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400">
                  {writingMastery}%
                </span>
              </div>

              <p className={`text-xs leading-relaxed line-clamp-2 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                8 proven email blueprints, fill-in-the-blank drills, and free typing simulators.
              </p>

              <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
                <div 
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${writingMastery}%` }} 
                />
              </div>
            </div>

            {/* 5. Mündlicher Ausdruck (Speaking) */}
            <div
              onClick={() => onNavigateTo("SPEAKING")}
              className={`sm:col-span-2 p-5 rounded-3xl border transition cursor-pointer flex flex-col justify-between space-y-3 group ${
                isDark 
                  ? "bg-slate-900/90 border-slate-800 hover:border-rose-500/40 hover:bg-slate-800/80" 
                  : "bg-white border-slate-200/90 hover:border-rose-200 hover:bg-rose-50/20 shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-2xl border ${
                    isDark ? "bg-rose-950/60 text-rose-400 border-rose-500/30" : "bg-rose-50 text-rose-600 border-rose-200"
                  }`}>
                    <Mic className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold group-hover:text-rose-400 transition ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}>
                      Mündlicher Ausdruck (Paarprüfung)
                    </h4>
                    <span className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      Teil 1 (Vorstellen) · Teil 2 (Präsentation) · Teil 3 (Planung)
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-rose-400">
                  {speakingMastery}%
                </span>
              </div>

              <p className={`text-xs leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Exam rounds paired mode + Ollama conversational voice partner with instant B1 grammar corrections.
              </p>

              <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
                <div 
                  className="bg-rose-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${speakingMastery}%` }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: OVERALL MASTERY GAUGE & ACTIVITY TRACKER */}
        <div className="space-y-6">
          {/* 1. CIRCULAR OVERALL MASTERY CARD */}
          <div className={`rounded-3xl border p-6 shadow-sm space-y-4 text-center transition-colors duration-200 ${
            isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200/90 text-slate-900"
          }`}>
            <h4 className={`text-xs font-bold uppercase tracking-wider text-left ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}>
              Overall mastery
            </h4>

            {/* Circular Gauge */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center my-2">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 88 88">
                {/* Background Ring */}
                <circle
                  cx="44"
                  cy="44"
                  r={radius}
                  className={`stroke-current ${isDark ? "text-slate-800" : "text-slate-100"}`}
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Progress Ring */}
                <circle
                  cx="44"
                  cy="44"
                  r={radius}
                  className="text-purple-600 stroke-current transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* Percentage in Center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-3xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                  {overallReadiness}%
                </span>
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-400"}`}>
                  Pass ready
                </span>
              </div>
            </div>

            {/* Mini Skill Legend */}
            <div className={`grid grid-cols-2 gap-2 text-left text-xs pt-2 border-t ${
              isDark ? "border-slate-800" : "border-slate-100"
            }`}>
              <div>
                <span className={`text-[10px] block ${isDark ? "text-slate-400" : "text-slate-400"}`}>Reading</span>
                <span className={`font-bold ${isDark ? "text-slate-200" : "text-slate-800"}`}>{readingMastery}%</span>
              </div>
              <div>
                <span className={`text-[10px] block ${isDark ? "text-slate-400" : "text-slate-400"}`}>Grammar</span>
                <span className={`font-bold ${isDark ? "text-slate-200" : "text-slate-800"}`}>{grammarMastery}%</span>
              </div>
              <div>
                <span className={`text-[10px] block ${isDark ? "text-slate-400" : "text-slate-400"}`}>Listening</span>
                <span className={`font-bold ${isDark ? "text-slate-200" : "text-slate-800"}`}>{listeningMastery}%</span>
              </div>
              <div>
                <span className={`text-[10px] block ${isDark ? "text-slate-400" : "text-slate-400"}`}>Writing</span>
                <span className={`font-bold ${isDark ? "text-slate-200" : "text-slate-800"}`}>{writingMastery}%</span>
              </div>
            </div>
          </div>

          {/* 2. THIS WEEK DAILY ACTIVITY CARD */}
          <div className={`rounded-3xl border p-6 shadow-sm space-y-3 transition-colors duration-200 ${
            isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200/90 text-slate-900"
          }`}>
            <h4 className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}>
              This week
            </h4>
            <div className="flex items-center justify-between gap-1.5 pt-1">
              {["M", "D", "M", "D", "F", "S", "S"].map((day, dIdx) => {
                const isToday = dIdx === todayDayIdx;
                return (
                  <div key={dIdx} className="flex-1 flex flex-col items-center gap-1.5">
                    <div 
                      className={`w-full h-2 rounded-full transition-all ${
                        isToday 
                          ? "bg-purple-600 shadow-sm shadow-purple-600/30" 
                          : dIdx < todayDayIdx 
                          ? isDark ? "bg-slate-700" : "bg-slate-300" 
                          : isDark ? "bg-slate-800" : "bg-slate-100"
                      }`} 
                    />
                    <span className={`text-[10px] font-bold ${
                      isToday ? "text-purple-400" : isDark ? "text-slate-400" : "text-slate-500"
                    }`}>
                      {day}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className={`text-[11px] pt-1 text-center font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              {account.username} is on a <strong>{profile.currentStreak || 1}-day active streak!</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
