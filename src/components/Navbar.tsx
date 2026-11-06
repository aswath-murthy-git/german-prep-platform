"use client";

import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import { LoginModal } from "./LoginModal";
import { 
  LayoutDashboard,
  Target,
  GraduationCap,
  Mic,
  Building2,
  Bot,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Menu,
  X,
  ChevronDown,
  RotateCcw,
  Sparkles,
  Zap,
  Check,
  Moon,
  Sun,
  BookOpen,
  Compass,
  Rocket
} from "lucide-react";

export type NavSectionType = 
  | "DASHBOARD" 
  | "ZERO_TO_B1"
  | "FAST_TRACK"
  | "EXAM" 
  | "PRACTICE"
  | "LEARN" 
  | "SPEAKING" 
  | "CITIZENSHIP" 
  | "READING" 
  | "WRITING" 
  | "LISTENING" 
  | "GRAMMAR" 
  | "CASES" 
  | "CONJUNCTIONS" 
  | "KEYWORDS" 
  | "STRATEGY" 
  | "ACADEMY" 
  | "PATHWAY";

interface NavbarProps {
  activeSection: NavSectionType;
  onSelectSection: (section: NavSectionType) => void;
  onOpenSprint: () => void;
  onOpenAiCoach?: () => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeSection, 
  onSelectSection, 
  onOpenSprint,
  onOpenAiCoach,
  isProfileModalOpen,
  setIsProfileModalOpen
}) => {
  const { 
    account, 
    profile, 
    updateProfile,
    overallReadiness, 
    toggleAdhdFocusMode,
    toggleSound,
    showEnglish,
    toggleShowEnglish,
    resetProgress,
    theme,
    toggleTheme
  } = useUser();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [examDropdownOpen, setExamDropdownOpen] = useState(false);

  const isDark = theme === "dark";

  // Clean Viobean Primary Hubs
  const primaryTabs = [
    { 
      id: "DASHBOARD" as const, 
      label: "Dashboard", 
      icon: LayoutDashboard,
      isActive: activeSection === "DASHBOARD"
    },
    { 
      id: "ZERO_TO_B1" as const, 
      label: "A0 -> B1", 
      icon: Rocket,
      isActive: activeSection === "ZERO_TO_B1" || activeSection === "PATHWAY"
    },
    { 
      id: "FAST_TRACK" as const, 
      label: "30-Day Plan", 
      icon: Compass,
      isActive: activeSection === "FAST_TRACK"
    },
    { 
      id: "EXAM" as const, 
      label: "Exam", 
      icon: Target,
      isActive: ["EXAM", "STRATEGY"].includes(activeSection)
    },
    { 
      id: "PRACTICE" as const, 
      label: "Practice", 
      icon: BookOpen,
      isActive: ["PRACTICE", "READING", "LISTENING", "WRITING", "GRAMMAR"].includes(activeSection)
    },
    { 
      id: "LEARN" as const, 
      label: "Learn", 
      icon: GraduationCap,
      isActive: ["LEARN", "ACADEMY", "CASES", "CONJUNCTIONS", "KEYWORDS"].includes(activeSection)
    },
    { 
      id: "SPEAKING" as const, 
      label: "Speaking", 
      icon: Mic,
      isActive: activeSection === "SPEAKING"
    },
    { 
      id: "CITIZENSHIP" as const, 
      label: "Citizenship", 
      icon: Building2,
      isActive: activeSection === "CITIZENSHIP"
    }
  ];

  // Target Exam Options
  const examOptions: Array<{ id: "TELC_B1" | "GOETHE_B1" | "DTZ" | "CITIZENSHIP_ONLY"; label: string; short: string }> = [
    { id: "TELC_B1", label: "telc Deutsch B1", short: "telc B1" },
    { id: "GOETHE_B1", label: "Goethe-Zertifikat B1", short: "Goethe B1" },
    { id: "DTZ", label: "DTZ (Deutsch-Test für Zuwanderer)", short: "DTZ" },
    { id: "CITIZENSHIP_ONLY", label: "Einbürgerungstest (310 Qs Only)", short: "Citizenship Only" }
  ];

  const currentExam = examOptions.find(e => e.id === profile.targetExam) || examOptions[0];

  return (
    <>
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-200 ${
        isDark 
          ? "bg-slate-950/90 border-slate-800 text-white shadow-lg shadow-black/20" 
          : "bg-white/95 border-slate-200 text-slate-900 shadow-xs"
      }`}>
        <div className="max-w-[1600px] w-full mx-auto px-3 sm:px-5 lg:px-6">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-3">
            {/* Logo */}
            <div 
              onClick={() => onSelectSection("DASHBOARD")}
              className="flex items-center gap-2.5 shrink-0 cursor-pointer select-none"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-purple-600 flex items-center justify-center shadow-md shadow-purple-600/30 text-white font-black text-lg sm:text-xl shrink-0">
                DE
              </div>
              <div className="shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className={`text-base sm:text-lg font-black tracking-tight whitespace-nowrap ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}>
                    GermanPrep<span className="text-purple-500">.Pass</span>
                  </span>
                  <span className={`hidden xl:inline-flex px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full shrink-0 ${
                    isDark ? "bg-purple-950/60 text-purple-300 border border-purple-500/30" : "bg-purple-100 text-purple-700"
                  }`}>
                    B1 & LiD
                  </span>
                </div>
                <div className={`text-[10px] hidden sm:block whitespace-nowrap ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}>
                  Fast-Track Exam Engine
                </div>
              </div>
            </div>

            {/* Desktop 5-Hub Navigation Bar */}
            <nav className={`hidden lg:flex items-center gap-1 p-1.5 rounded-2xl border mx-2 transition-colors duration-200 ${
              isDark ? "bg-slate-900/90 border-slate-800" : "bg-slate-100/80 border-slate-200"
            }`}>
              {primaryTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onSelectSection(tab.id)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 shrink-0 ${
                      tab.isActive
                        ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 font-extrabold"
                        : isDark
                        ? "text-slate-300 hover:text-white hover:bg-slate-800"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Target Exam Dropdown Selector */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setExamDropdownOpen(!examDropdownOpen)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 shadow-xs ${
                  isDark
                    ? "bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-200"
                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-800"
                }`}
                title="Switch Target Exam"
              >
                <Target className="w-3.5 h-3.5 text-purple-500" />
                <span>{currentExam.short}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {examDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-64 rounded-2xl border shadow-2xl p-1.5 z-50 space-y-1 animate-fadeIn ${
                  isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
                }`}>
                  <div className={`px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider border-b ${
                    isDark ? "text-slate-400 border-slate-800" : "text-slate-400 border-slate-100"
                  }`}>
                    Select Target German Exam
                  </div>
                  {examOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        updateProfile({ targetExam: opt.id });
                        setExamDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition text-left ${
                        profile.targetExam === opt.id
                          ? isDark
                            ? "bg-purple-950/60 text-purple-300 font-bold border border-purple-500/30"
                            : "bg-purple-50 text-purple-800 font-bold"
                          : isDark
                          ? "text-slate-300 hover:bg-slate-800"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {profile.targetExam === opt.id && (
                        <Check className="w-4 h-4 text-purple-500 stroke-[3]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Theme Toggle Button: Dark Mode (Default) vs Light Mode */}
              <button
                type="button"
                onClick={toggleTheme}
                className={`p-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                  isDark
                    ? "bg-slate-900 border-slate-800 text-amber-400 hover:text-amber-300 hover:border-slate-700"
                    : "bg-white border-slate-200 text-amber-600 hover:bg-slate-50"
                }`}
                title={isDark ? "Dark Mode Active (Click to switch to Light)" : "Light Mode Active (Click to switch to Dark)"}
              >
                {isDark ? (
                  <Moon className="w-4 h-4 text-amber-400" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
                <span className="hidden sm:inline font-mono text-[11px] font-bold">
                  {isDark ? "Dark" : "Light"}
                </span>
              </button>

              {/* AI Exam Tutor Quick Launch (Ollama) */}
              {onOpenAiCoach && (
                <button
                  onClick={onOpenAiCoach}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-xl text-xs font-bold transition shadow-xs shrink-0 ${
                    isDark
                      ? "bg-slate-900 hover:bg-slate-800 text-purple-300 border-purple-500/40"
                      : "bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
                  }`}
                  title="Open AI German Exam Coach (Ollama Powered)"
                >
                  <Bot className="w-3.5 h-3.5 text-purple-500" />
                  <span className="hidden sm:inline">AI Tutor</span>
                </button>
              )}

              {/* Global English Translations Toggle */}
              <button
                onClick={toggleShowEnglish}
                className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                  showEnglish
                    ? isDark
                      ? "bg-purple-950/60 text-purple-300 border-purple-500/40 shadow-xs"
                      : "bg-purple-50 text-purple-700 border-purple-300 shadow-xs"
                    : isDark
                    ? "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                    : "bg-white text-slate-500 border-slate-200 hover:text-slate-800"
                }`}
                title="Toggle English Translations & Hints (Default: OFF for German immersion)"
              >
                {showEnglish ? <Eye className="w-4 h-4 text-purple-500" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                <span className="font-mono text-[11px]">{showEnglish ? "EN: ON" : "EN: OFF"}</span>
              </button>

              {/* Audio Sound Toggle */}
              <button
                onClick={toggleSound}
                className={`p-2 rounded-xl border text-xs transition shrink-0 ${
                  profile.soundEnabled
                    ? isDark
                      ? "bg-slate-900 text-purple-400 border-slate-800 hover:border-slate-700"
                      : "bg-white text-purple-600 border-slate-200"
                    : isDark
                    ? "bg-slate-950 text-slate-600 border-slate-800"
                    : "bg-slate-50 text-slate-400 border-slate-200"
                }`}
                title={profile.soundEnabled ? "Audio Chimes Enabled" : "Audio Chimes Muted"}
              >
                {profile.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Overall Readiness Pill */}
              <div className={`hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold shrink-0 ${
                isDark ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-600"
              }`}>
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                <span>Pass-Ready:</span>
                <span className="font-mono font-black text-purple-400">{overallReadiness}%</span>
              </div>

              {/* Fresh Start Button */}
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Are you sure you want to reset all progress, mock attempts, and scores to start completely fresh? This cannot be undone.")) {
                    resetProgress();
                  }
                }}
                className={`hidden 2xl:flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition shrink-0 ${
                  isDark
                    ? "bg-slate-900 hover:bg-rose-950/40 border-slate-800 hover:border-rose-500/40 text-slate-400 hover:text-rose-300"
                    : "bg-white hover:bg-rose-50 border-slate-200 hover:border-rose-300 text-slate-500 hover:text-rose-600"
                }`}
                title="Clear all attempts and make a fresh start"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Fresh Start ↺</span>
              </button>

              {/* Profile Avatar */}
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className={`flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border transition text-left shrink-0 shadow-xs ${
                  isDark
                    ? "bg-slate-900 hover:bg-slate-800 border-slate-800 text-white"
                    : "bg-white hover:bg-slate-50 border-slate-200 text-slate-900"
                }`}
                title="Account Settings & Progress Sync"
              >
                <div className={`w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-xs shrink-0 ${
                  isDark 
                    ? "bg-purple-950/80 border-purple-500/40 text-purple-300" 
                    : "bg-purple-100 border-purple-200 text-purple-700"
                }`}>
                  {account.username.charAt(0).toUpperCase()}
                </div>
                <div className="hidden lg:block leading-tight">
                  <div className="text-xs font-bold truncate max-w-[80px]">{account.username}</div>
                  <div className="text-[10px] text-purple-400 font-semibold">{currentExam.short}</div>
                </div>
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-xl border shrink-0 ${
                  isDark
                    ? "bg-slate-900 text-slate-300 border-slate-800 hover:text-white"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-b px-4 py-4 space-y-2 animate-fadeIn shadow-lg ${
            isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            {/* Theme Toggle Mobile */}
            <div className="flex items-center justify-between p-2.5 rounded-xl border mb-3 bg-slate-950/40 border-slate-800">
              <span className="text-xs font-bold text-slate-300">Theme Preference:</span>
              <button
                type="button"
                onClick={toggleTheme}
                className="px-3 py-1 bg-purple-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                <span>{isDark ? "Dark (Default)" : "Light"}</span>
              </button>
            </div>

            {/* Target Exam Mobile Selector */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {examOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    updateProfile({ targetExam: opt.id });
                  }}
                  className={`p-2 rounded-xl text-xs font-bold border transition ${
                    profile.targetExam === opt.id
                      ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                      : isDark
                      ? "bg-slate-950 text-slate-300 border-slate-800"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  {opt.short}
                </button>
              ))}
            </div>

            {primaryTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onSelectSection(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-3 text-left ${
                    tab.isActive
                      ? "bg-purple-600 text-white font-extrabold shadow-md shadow-purple-600/30"
                      : isDark
                      ? "text-slate-200 hover:bg-slate-800"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <button
                onClick={() => {
                  toggleShowEnglish();
                }}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 border ${
                  showEnglish 
                    ? "bg-purple-950/60 text-purple-300 border-purple-500/40" 
                    : isDark
                    ? "bg-slate-950 text-slate-400 border-slate-800"
                    : "bg-slate-50 text-slate-600 border-slate-200"
                }`}
              >
                {showEnglish ? <Eye className="w-4 h-4 text-purple-400" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                <span>{showEnglish ? "English Translations: ON" : "English Translations: OFF (Tap to Enable)"}</span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to reset all progress, mock attempts, and scores to start completely fresh? This cannot be undone.")) {
                    resetProgress();
                    setMobileMenuOpen(false);
                  }
                }}
                className="w-full py-2 px-3 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/40 text-rose-300 text-xs font-semibold transition flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
                <span>Fresh Start: Clear All Attempts & Scores ↺</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
