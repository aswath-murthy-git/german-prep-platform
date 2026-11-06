"use client";

import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import { 
  BookOpen, 
  Sparkles, 
  Headphones, 
  PenTool, 
  Mic, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  RotateCcw,
  Award,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Scale,
  ShieldCheck
} from "lucide-react";
import { OfficialTelcMockExam } from "./OfficialTelcMockExam";
import { GoethePruefungsordnungHub } from "./GoethePruefungsordnungHub";
import { FullMockExamArena } from "./FullMockExamArena";

interface ViobeanExamHubProps {
  onLaunchLab: (section: "READING" | "GRAMMAR" | "LISTENING" | "WRITING" | "SPEAKING", subpart?: string) => void;
  onOpenAiCoach?: () => void;
}

export const ViobeanExamHub: React.FC<ViobeanExamHubProps> = ({
  onLaunchLab,
  onOpenAiCoach
}) => {
  const { profile, theme } = useUser();
  const [activeTab, setActiveTab] = useState<"SECTION" | "FULL_MOCK_ARENA" | "TELC_MOCK" | "GOETHE_RULES">("FULL_MOCK_ARENA");

  const isDark = theme === "dark";

  const examName = profile.targetExam === "TELC_B1" 
    ? "telc Deutsch B1" 
    : profile.targetExam === "GOETHE_B1" 
    ? "Goethe-Zertifikat B1" 
    : "DTZ (Deutsch-Test für Zuwanderer)";

  // Subtest definitions for Section Practice
  const examSections = [
    {
      category: "Leseverstehen",
      icon: BookOpen,
      color: isDark ? "text-purple-400 bg-purple-950/60 border-purple-500/30" : "text-purple-600 bg-purple-50 border-purple-200",
      targetLab: "READING" as const,
      parts: [
        {
          id: "lese-1",
          teil: "Teil 1",
          title: "Globalverstehen (Blog & Überschriften)",
          desc: "Match 5 personal blog posts or letters to the best fitting headline.",
          questions: 5,
          time: "20 min",
          points: 25,
          completed: profile.completedReadingIds?.includes("reading-teil-1") || false,
          mastery: 80
        },
        {
          id: "lese-2",
          teil: "Teil 2",
          title: "Detailverstehen (Pressebericht & Fakten)",
          desc: "Read a factual newspaper report and answer 5 multiple-choice questions.",
          questions: 5,
          time: "25 min",
          points: 25,
          completed: profile.completedReadingIds?.includes("reading-teil-2") || false,
          mastery: 75
        },
        {
          id: "lese-3",
          teil: "Teil 3",
          title: "Selektives Verstehen (Anzeigen zuordnen)",
          desc: "Match 10 situational requests with appropriate classified advertisements.",
          questions: 10,
          time: "25 min",
          points: 25,
          completed: profile.completedReadingIds?.includes("reading-teil-3") || false,
          mastery: 60
        }
      ]
    },
    {
      category: "Sprachbausteine",
      icon: Sparkles,
      color: isDark ? "text-indigo-400 bg-indigo-950/60 border-indigo-500/30" : "text-indigo-600 bg-indigo-50 border-indigo-200",
      targetLab: "GRAMMAR" as const,
      parts: [
        {
          id: "sprach-1",
          teil: "Teil 1",
          title: "Grammatik (Präpositionen & Endungen)",
          desc: "Complete a formal letter by choosing the correct grammar forms (multiple-choice).",
          questions: 10,
          time: "10 min",
          points: 15,
          completed: true,
          mastery: 85
        },
        {
          id: "sprach-2",
          teil: "Teil 2",
          title: "Lexik & Wortschatz (Feste Nomen-Verb)",
          desc: "Assign matching words from a 15-word bank into a real-life text.",
          questions: 10,
          time: "10 min",
          points: 15,
          completed: false,
          mastery: 50
        }
      ]
    },
    {
      category: "Hörverstehen",
      icon: Headphones,
      color: isDark ? "text-blue-400 bg-blue-950/60 border-blue-500/30" : "text-blue-600 bg-blue-50 border-blue-200",
      targetLab: "LISTENING" as const,
      parts: [
        {
          id: "hoer-1",
          teil: "Teil 1",
          title: "Globalverstehen (Kurze Durchsagen)",
          desc: "Listen to 5 train announcements, public broadcasts, and messages. (Richtig/Falsch)",
          questions: 5,
          time: "10 min",
          points: 25,
          completed: profile.completedListeningIds?.includes("listen-1") || false,
          mastery: 70
        },
        {
          id: "hoer-2",
          teil: "Teil 2",
          title: "Detailverstehen (Radiointerview / Bericht)",
          desc: "Listen to an interview or report once and evaluate 10 detailed statements.",
          questions: 10,
          time: "12 min",
          points: 25,
          completed: false,
          mastery: 45
        },
        {
          id: "hoer-3",
          teil: "Teil 3",
          title: "Selektives Verstehen (Gespräche)",
          desc: "Listen to 5 short casual conversations and answer True/False questions.",
          questions: 5,
          time: "8 min",
          points: 25,
          completed: false,
          mastery: 60
        }
      ]
    },
    {
      category: "Schriftlicher Ausdruck",
      icon: PenTool,
      color: isDark ? "text-emerald-400 bg-emerald-950/60 border-emerald-500/30" : "text-emerald-600 bg-emerald-50 border-emerald-200",
      targetLab: "WRITING" as const,
      parts: [
        {
          id: "schreib-1",
          teil: "Aufgabe",
          title: "Halbformelle / Informelle E-Mail",
          desc: "Write an email addressing all 4 official bullet points (~80 words) with B1 connectors.",
          questions: 1,
          time: "30 min",
          points: 45,
          completed: (profile.completedWritingIds?.length || 0) > 0,
          mastery: 90
        }
      ]
    },
    {
      category: "Mündlicher Ausdruck",
      icon: Mic,
      color: isDark ? "text-rose-400 bg-rose-950/60 border-rose-500/30" : "text-rose-600 bg-rose-50 border-rose-200",
      targetLab: "SPEAKING" as const,
      parts: [
        {
          id: "sprech-1",
          teil: "Teil 1",
          title: "Einander kennenlernen (Self-Introduction)",
          desc: "Introduce yourself smoothly using 6 essential B1 personal details.",
          questions: 1,
          time: "3 min",
          points: 15,
          completed: profile.masteredSpeakingIds?.includes("intro") || false,
          mastery: 95
        },
        {
          id: "sprech-2",
          teil: "Teil 2",
          title: "Über ein Thema sprechen (Presentation)",
          desc: "Deliver a short presentation on an everyday topic and answer questions.",
          questions: 1,
          time: "5 min",
          points: 30,
          completed: false,
          mastery: 60
        },
        {
          id: "sprech-3",
          teil: "Teil 3",
          title: "Gemeinsam etwas planen (Interactive Dialogue)",
          desc: "Plan an event or resolve a scenario together with your partner / AI.",
          questions: 1,
          time: "5 min",
          points: 30,
          completed: false,
          mastery: 50
        }
      ]
    }
  ];

  // Past results list
  const pastResults = [
    {
      id: "res-1",
      section: "Leseverstehen Teil 1",
      score: "5/5",
      percentage: 100,
      date: "Today",
      status: "Excellent"
    },
    {
      id: "res-2",
      section: "Sprachbausteine Teil 1",
      score: "8/10",
      percentage: 80,
      date: "Yesterday",
      status: "Passed"
    },
    {
      id: "res-3",
      section: "Schreiben: Krankmeldung",
      score: "42/45",
      percentage: 93,
      date: "2 days ago",
      status: "Passed"
    },
    {
      id: "res-4",
      section: "Hörverstehen Teil 1",
      score: "3/5",
      percentage: 60,
      date: "3 days ago",
      status: "Review needed"
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* ─── TOP TOGGLE HEADER (Viobean Style) ─── */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b transition-colors duration-200 ${
        isDark ? "border-slate-800" : "border-slate-200"
      }`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
              isDark ? "bg-purple-950/60 text-purple-300 border border-purple-500/30" : "bg-purple-100 text-purple-700"
            }`}>
              Exam Simulation
            </span>
            <span className={`text-xs font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Official standard: {examName}
            </span>
          </div>
          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            {activeTab === "FULL_MOCK_ARENA"
              ? "Full Mock Exam Suite (telc & Goethe A1, A2, B1)"
              : activeTab === "SECTION"
              ? "Section Practice"
              : activeTab === "TELC_MOCK"
              ? "telc Deutsch B1 Mock Exam Simulator"
              : "Goethe-Institut Prüfungsordnung Compass"}
          </h1>
        </div>

        {/* Tab Switcher: Full Mock Arena vs Section Practice vs telc B1 vs Goethe Rules */}
        <div className={`inline-flex p-1.5 rounded-2xl border self-start sm:self-auto transition-colors duration-200 flex-wrap gap-1 ${
          isDark ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"
        }`}>
          <button
            type="button"
            onClick={() => setActiveTab("FULL_MOCK_ARENA")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
              activeTab === "FULL_MOCK_ARENA"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : isDark
                ? "text-slate-300 hover:text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Full Mock Arena (A1-B1)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("SECTION")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === "SECTION"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : isDark
                ? "text-slate-300 hover:text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Section practice
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("TELC_MOCK")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
              activeTab === "TELC_MOCK"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : isDark
                ? "text-slate-300 hover:text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Headphones className="w-3.5 h-3.5 text-rose-400" />
            <span>telc B1 Mock Test 1</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("GOETHE_RULES")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
              activeTab === "GOETHE_RULES"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : isDark
                ? "text-slate-300 hover:text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Goethe Rules & Retake</span>
          </button>
        </div>
      </div>

      {/* ─── SECTION PRACTICE MODE ─── */}
      {activeTab === "SECTION" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main 2-Column Section Cards */}
          <div className="lg:col-span-2 space-y-6">
            {examSections.map((sec) => {
              const Icon = sec.icon;
              return (
                <div key={sec.category} className={`rounded-3xl border p-5 sm:p-6 shadow-sm space-y-4 transition-colors duration-200 ${
                  isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
                }`}>
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-2xl border ${sec.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className={`text-base sm:text-lg font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                          {sec.category}
                        </h2>
                        <div className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                          {sec.parts.length} exam parts available
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onLaunchLab(sec.targetLab)}
                      className="text-xs font-bold text-purple-400 hover:text-purple-300 hover:underline flex items-center gap-1"
                    >
                      <span>Open full lab</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subparts Grid */}
                  <div className="grid grid-cols-1 gap-3">
                    {sec.parts.map((part) => (
                      <div
                        key={part.id}
                        className={`p-4 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 group ${
                          isDark
                            ? "bg-slate-950/60 border-slate-800 hover:border-purple-500/40"
                            : "bg-slate-50 border-slate-100 hover:border-purple-200 hover:bg-purple-50/20"
                        }`}
                      >
                        <div className="space-y-1 max-w-md">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                              isDark ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-700"
                            }`}>
                              {part.teil}
                            </span>
                            <span className={`text-sm font-bold group-hover:text-purple-400 transition ${
                              isDark ? "text-white" : "text-slate-900"
                            }`}>
                              {part.title}
                            </span>
                          </div>
                          <p className={`text-xs line-clamp-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                            {part.desc}
                          </p>
                          <div className={`flex items-center gap-3 text-[11px] pt-0.5 ${
                            isDark ? "text-slate-500" : "text-slate-400"
                          }`}>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {part.time}
                            </span>
                            <span>•</span>
                            <span>{part.questions} questions</span>
                            <span>•</span>
                            <span>{part.points} points</span>
                          </div>
                        </div>

                        {/* Action & Mastery Progress */}
                        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                          <div className="flex items-center gap-1.5 text-xs font-semibold">
                            {part.completed ? (
                              <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-bold">
                                <CheckCircle2 className="w-4 h-4" />
                                {part.mastery}%
                              </span>
                            ) : (
                              <span className={`text-xs font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                Not started
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => onLaunchLab(sec.targetLab, part.teil)}
                            className={`px-4 py-2 font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-sm active:scale-95 ${
                              isDark
                                ? "bg-purple-950/60 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30"
                                : "bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white"
                            }`}
                          >
                            <span>{part.completed ? "Practise again" : "Start"}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Sidebar: Your Results & Instant Review */}
          <div className="space-y-6">
            {/* Results Card */}
            <div className={`rounded-3xl border p-5 sm:p-6 shadow-sm space-y-4 transition-colors duration-200 ${
              isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-base font-bold flex items-center gap-2 ${
                  isDark ? "text-white" : "text-slate-900"
                }`}>
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <span>Your results</span>
                </h3>
                <span className={`text-xs font-semibold ${isDark ? "text-slate-400" : "text-slate-400"}`}>
                  Recent attempts
                </span>
              </div>

              <div className="space-y-3">
                {pastResults.map((res) => (
                  <div
                    key={res.id}
                    className={`p-3.5 rounded-2xl border transition space-y-1 ${
                      isDark 
                        ? "bg-slate-950/60 border-slate-800 hover:border-slate-700" 
                        : "bg-slate-50 border-slate-100 hover:border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                        {res.section}
                      </span>
                      <span className="text-xs font-extrabold text-purple-400">
                        {res.percentage}%
                      </span>
                    </div>

                    <div className={`flex items-center justify-between text-[11px] ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}>
                      <span>Score: {res.score}</span>
                      <span>{res.date}</span>
                    </div>

                    <div className={`w-full h-1.5 rounded-full overflow-hidden mt-1.5 ${
                      isDark ? "bg-slate-800" : "bg-slate-200"
                    }`}>
                      <div
                        className={`h-full rounded-full ${
                          res.percentage >= 70 ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                        style={{ width: `${res.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onLaunchLab("READING")}
                  className={`w-full py-2.5 rounded-2xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    isDark
                      ? "border-slate-800 hover:bg-slate-800 text-slate-300"
                      : "border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Redo lowest scoring part</span>
                </button>
              </div>
            </div>

            {/* Smart Exam Strategy Tip */}
            <div className={`rounded-3xl border p-5 space-y-2 ${
              isDark 
                ? "bg-gradient-to-br from-amber-950/40 via-slate-900 to-amber-900/20 border-amber-500/30 text-amber-200" 
                : "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 text-amber-900"
            }`}>
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Examiner Golden Rule</span>
              </div>
              <p className="text-xs leading-relaxed font-medium">
                In telc & Goethe B1, never leave any multiple-choice or True/False question empty. There is zero negative marking.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─── FULL MOCK EXAM ARENA (A1, A2, B1 for telc & Goethe - Sets 1 to 4) ─── */}
      {activeTab === "FULL_MOCK_ARENA" && (
        <div className="space-y-6">
          <FullMockExamArena 
            onBackToHub={() => setActiveTab("SECTION")} 
            initialBoard={profile.targetExam === "GOETHE_B1" ? "GOETHE" : "TELC"}
            initialLevel="B1"
            initialSet={1}
          />
        </div>
      )}

      {/* ─── TELC B1 MOCK EXAM SIMULATOR (Official Test 1) ─── */}
      {activeTab === "TELC_MOCK" && (
        <div className="space-y-6">
          <OfficialTelcMockExam onBackToHub={() => setActiveTab("SECTION")} />
        </div>
      )}

      {/* ─── GOETHE-INSTITUT PRÜFUNGSORDNUNG COMPASS & CALCULATOR ─── */}
      {activeTab === "GOETHE_RULES" && (
        <div className="space-y-6">
          <GoethePruefungsordnungHub />
        </div>
      )}
    </div>
  );
};
