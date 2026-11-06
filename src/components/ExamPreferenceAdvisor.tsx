"use client";

import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import { 
  COMPREHENSIVE_EXAM_PROFILES, 
  ComprehensiveExamProfile,
  ExamModuleDetail,
  ExamSubpart 
} from "@/data/b1_exam_info";
import { AudioVoiceButton } from "./AudioVoiceButton";
import { 
  Compass, 
  CheckCircle2, 
  Target, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Info, 
  ChevronDown, 
  ChevronUp,
  GraduationCap,
  Building2,
  FileCheck,
  Clock,
  Layers,
  HelpCircle,
  Lightbulb,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Calendar,
  Check
} from "lucide-react";
import confetti from "canvas-confetti";

interface ExamPreferenceAdvisorProps {
  onNavigateToSection?: (section: "STRATEGY" | "WRITING" | "SPEAKING" | "CITIZENSHIP" | "ACADEMY" | "CASES" | "READING" | "LISTENING" | "GRAMMAR") => void;
}

export const ExamPreferenceAdvisor: React.FC<ExamPreferenceAdvisorProps> = ({ onNavigateToSection }) => {
  const { profile, updateProfile, showEnglish } = useUser();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "DETAILED_STRUCTURE" | "PLATFORM_MAPPING">("OVERVIEW");
  const activeTargetKey: "DTZ" | "TELC_B1" | "GOETHE_B1" = 
    (profile.targetExam === "TELC_B1" || profile.targetExam === "GOETHE_B1") ? profile.targetExam : "DTZ";

  const [inspectedExamId, setInspectedExamId] = useState<"DTZ" | "TELC_B1" | "GOETHE_B1">(activeTargetKey);
  const [selectedModuleId, setSelectedModuleId] = useState<string>("LESEN");

  const curInspectedExam = COMPREHENSIVE_EXAM_PROFILES[inspectedExamId];

  const handleSelectExam = (examId: "DTZ" | "TELC_B1" | "GOETHE_B1") => {
    updateProfile({ targetExam: examId });
    setInspectedExamId(examId);
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
  };

  const getModuleIcon = (id: string) => {
    switch (id) {
      case "HOEREN":
        return <Headphones className="w-4 h-4 text-cyan-400" />;
      case "LESEN":
      case "HOEREN_LESEN":
        return <BookOpen className="w-4 h-4 text-amber-400" />;
      case "SCHREIBEN":
        return <PenTool className="w-4 h-4 text-emerald-400" />;
      case "SPRECHEN":
        return <Mic className="w-4 h-4 text-rose-400" />;
      case "SPRACHBAUSTEINE":
        return <Layers className="w-4 h-4 text-indigo-400" />;
      default:
        return <FileCheck className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black tracking-wide bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 font-mono">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>OFFICIAL EXAM COMPARISON & PASS BLUEPRINT</span>
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Goethe vs telc vs DTZ
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white mt-1.5 flex items-center gap-2">
            <span>Target German B1 Exam:</span>
            <span className="text-amber-400">{COMPREHENSIVE_EXAM_PROFILES[activeTargetKey].name}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            All three exams are <strong>100% officially accepted</strong> by German immigration authorities (Ausländerbehörde) for Permanent Residence (Niederlassungserlaubnis) and Citizenship (Einbürgerung). Compare their exact formats, duration, and passing criteria to pick the optimal strategy.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="self-start sm:self-center px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 font-bold transition flex items-center gap-1.5"
        >
          <span>{isExpanded ? "Collapse Guide" : "Expand Official Formats"}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-6 pt-2 animate-fadeIn">
          {/* 3-Way Top Selector Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {(["DTZ", "TELC_B1", "GOETHE_B1"] as const).map((examKey) => {
              const exam = COMPREHENSIVE_EXAM_PROFILES[examKey];
              const isTarget = profile.targetExam === exam.id;
              const isInspected = inspectedExamId === exam.id;

              return (
                <div
                  key={exam.id}
                  onClick={() => {
                    setInspectedExamId(exam.id);
                  }}
                  className={`rounded-2xl border p-4 transition cursor-pointer relative flex flex-col justify-between space-y-3 ${
                    isInspected
                      ? "bg-slate-950 border-amber-500 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/50"
                      : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950/80"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase font-mono border ${exam.badgeColor}`}>
                        {exam.badge}
                      </span>
                      {isTarget && (
                        <span className="flex items-center gap-1 text-[10px] font-black text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded-md border border-amber-500/30">
                          <CheckCircle2 className="w-3 h-3 text-amber-400" />
                          <span>Active Target</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-base sm:text-lg font-black text-white">{exam.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug line-clamp-2">
                        {exam.officialSubtitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-300 font-mono pt-1">
                      <div className="flex items-center gap-1 text-amber-300">
                        <Clock className="w-3 h-3" />
                        <span>{exam.totalDuration.split(" ")[0]} Min</span>
                      </div>
                      <div className="text-slate-500">•</div>
                      <div>{exam.scoringFormat.split("(")[0]}</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-400 font-bold">
                      {isInspected ? "Inspecting Details" : "Click to View Details"}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectExam(exam.id);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ${
                        isTarget
                          ? "bg-amber-500 text-slate-950 font-black shadow-sm"
                          : "bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700"
                      }`}
                    >
                      <span>{isTarget ? "Target Set" : "Set Target"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subtabs for Inspected Exam */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Inspecting:</span>
              <span className="text-xs font-black text-white px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700">
                {curInspectedExam.name}
              </span>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("OVERVIEW")}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                  activeTab === "OVERVIEW"
                    ? "bg-amber-500 text-slate-950 font-black shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>Overview & Rules</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("DETAILED_STRUCTURE")}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                  activeTab === "DETAILED_STRUCTURE"
                    ? "bg-amber-500 text-slate-950 font-black shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Die Module & Prüfungsteile</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("PLATFORM_MAPPING")}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                  activeTab === "PLATFORM_MAPPING"
                    ? "bg-amber-500 text-slate-950 font-black shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>How This Platform Trains You</span>
              </button>
            </div>
          </div>

          {/* TAB 1: OVERVIEW & PASS CRITERIA */}
          {activeTab === "OVERVIEW" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  <span>Passing Rule (Bestehensregelung)</span>
                </div>
                <div className="text-sm font-bold text-white bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                  {curInspectedExam.passingRule}
                </div>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold shrink-0">•</span>
                    <span><strong>Scoring Distribution:</strong> {curInspectedExam.writtenOralSplit}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold shrink-0">•</span>
                    <span><strong>Total Time:</strong> {curInspectedExam.totalDuration}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold shrink-0">•</span>
                    <span><strong>Oral Prep Time:</strong> {curInspectedExam.preparationTimeOral}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Why This Exam Is Strategic for PR / Citizenship</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {curInspectedExam.whyStrategicForPR}
                </p>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Accreditation:</strong> Developed by {curInspectedExam.developedBy} and officially accepted across all German federal states.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DETAILED MODULAR STRUCTURE (DIE MODULE & PRÜFUNGSTEILE) */}
          {activeTab === "DETAILED_STRUCTURE" && (
            <div className="space-y-4">
              {/* Module Selector Pill Bar */}
              <div className="flex flex-wrap items-center gap-2">
                {curInspectedExam.modules.map((m) => {
                  const isSelected = selectedModuleId === m.id || (curInspectedExam.modules.length > 0 && !curInspectedExam.modules.find(x => x.id === selectedModuleId) && m === curInspectedExam.modules[0]);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedModuleId(m.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                        isSelected
                          ? "bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20"
                          : "bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800"
                      }`}
                    >
                      {getModuleIcon(m.id)}
                      <span>{m.name}</span>
                      <span className="text-[10px] opacity-75 font-mono">({m.duration.split(" ")[0]} Min)</span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Module Detail Card */}
              {(() => {
                const mod = curInspectedExam.modules.find(m => m.id === selectedModuleId) || curInspectedExam.modules[0];
                if (!mod) return null;

                return (
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-5">
                    {/* Module Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
                            {getModuleIcon(mod.id)}
                          </span>
                          <h4 className="text-xl font-black text-white">
                            Modul: {mod.name}
                          </h4>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-900 border border-slate-700 text-amber-300 font-mono">
                            Dauer: {mod.duration}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
                          {mod.targetTasksSummary}
                        </p>
                      </div>

                      <AudioVoiceButton text={`${mod.name}. Dauer: ${mod.duration}. ${mod.targetTasksSummary}`} label="Hören" />
                    </div>

                    {/* Subparts Breakdown */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Prüfungsteile & Aufgabenformate ({mod.subparts.length} Teile)
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {mod.subparts.map((part, pIdx) => (
                          <div 
                            key={pIdx}
                            className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2 hover:border-slate-700 transition"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-[10px] font-black">
                                  {part.partIndex}
                                </span>
                                <h5 className="text-sm font-black text-white mt-1">
                                  {part.title}
                                </h5>
                              </div>
                              {part.durationOrTimeHint && (
                                <span className="text-[10px] text-slate-400 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800 shrink-0">
                                  {part.durationOrTimeHint}
                                </span>
                              )}
                            </div>

                            <div className="text-xs text-amber-300/90 font-semibold bg-amber-950/20 p-2 rounded-lg border border-amber-500/20">
                              Format: {part.taskFormat}
                            </div>

                            <p className="text-xs text-slate-300 leading-relaxed">
                              {part.description}
                            </p>

                            <div className="pt-1 text-[11px] text-slate-400 flex items-start gap-1.5 border-t border-slate-800/80 mt-2">
                              <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                              <span><strong>Passing Tip:</strong> {part.tips}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 3: PLATFORM TRAINING MAPPING */}
          {activeTab === "PLATFORM_MAPPING" && (
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4" />
                <span>How This Platform Trains You for {curInspectedExam.name}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div 
                  onClick={() => onNavigateToSection?.("WRITING")}
                  className="bg-slate-900 p-4 rounded-xl border border-slate-800 hover:border-amber-500/60 cursor-pointer transition space-y-1.5 group"
                >
                  <div className="flex items-center justify-between text-amber-400 font-bold">
                    <span className="flex items-center gap-1">
                      <PenTool className="w-3.5 h-3.5" />
                      <span>Schreiben Lab</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                  </div>
                  <div className="text-white font-bold">8 Exam Templates</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Personal and formal letters with exact 4-bullet point formulas and connector requirements (weil, dass, obwohl).
                  </p>
                </div>

                <div 
                  onClick={() => onNavigateToSection?.("SPEAKING")}
                  className="bg-slate-900 p-4 rounded-xl border border-slate-800 hover:border-amber-500/60 cursor-pointer transition space-y-1.5 group"
                >
                  <div className="flex items-center justify-between text-rose-400 font-bold">
                    <span className="flex items-center gap-1">
                      <Mic className="w-3.5 h-3.5" />
                      <span>Sprechen Sanctuary</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                  </div>
                  <div className="text-white font-bold">5-Sentence Formula</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Master picture descriptions, self-introductions, and partner planning dialogues without hesitation.
                  </p>
                </div>

                <div 
                  onClick={() => onNavigateToSection?.("READING")}
                  className="bg-slate-900 p-4 rounded-xl border border-slate-800 hover:border-amber-500/60 cursor-pointer transition space-y-1.5 group"
                >
                  <div className="flex items-center justify-between text-amber-400 font-bold">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Lesen & Hören</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                  </div>
                  <div className="text-white font-bold">Trap & Synonym Drills</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    25 reading tasks and 12 listening audio tasks with speed control (0.8x-1.2x) and keyword synonym matching.
                  </p>
                </div>

                <div 
                  onClick={() => onNavigateToSection?.("GRAMMAR")}
                  className="bg-slate-900 p-4 rounded-xl border border-slate-800 hover:border-amber-500/60 cursor-pointer transition space-y-1.5 group"
                >
                  <div className="flex items-center justify-between text-indigo-400 font-bold">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Cases & Grammar</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                  </div>
                  <div className="text-white font-bold">Sprachbausteine Pass</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    The 4 cases master matrix, prepositions, modal verbs, and ADUSO word order for guaranteed grammar points.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Selected Target Exam Action Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white text-sm">
              Current Target Exam: <span className="text-amber-400 font-black">{COMPREHENSIVE_EXAM_PROFILES[activeTargetKey].name}</span>
            </div>
            <div className="text-slate-400 text-[11px] mt-0.5">
              <strong>Passing formula:</strong> {COMPREHENSIVE_EXAM_PROFILES[activeTargetKey].passingRule}
            </div>
          </div>
        </div>

        {onNavigateToSection && (
          <button
            type="button"
            onClick={() => onNavigateToSection("STRATEGY")}
            className="shrink-0 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold border border-amber-500/40 transition flex items-center gap-1.5"
          >
            <span>Open Score Simulator</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        )}
      </div>
    </div>
  );
};
