"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { 
  EXAM_FIGHT_PATHS, 
  ExamFightPath, 
  FightPathStep 
} from "@/data/exam_fight_paths";
import { AudioVoiceButton } from "./AudioVoiceButton";
import { AiExamCoachModal } from "./AiExamCoachModal";
import { 
  Compass, 
  CheckCircle2, 
  Circle, 
  Target, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Play, 
  Clock, 
  Check, 
  Layers, 
  Lightbulb, 
  Bot, 
  ChevronRight, 
  ChevronDown, 
  RotateCcw,
  Zap,
  BookOpen,
  PenTool,
  Mic,
  Headphones,
  Eye,
  EyeOff
} from "lucide-react";
import confetti from "canvas-confetti";

interface ExamGuidedFightPathProps {
  onNavigateToSection: (section: "PATHWAY" | "ACADEMY" | "CASES" | "CITIZENSHIP" | "READING" | "LISTENING" | "WRITING" | "SPEAKING" | "GRAMMAR" | "KEYWORDS" | "STRATEGY" | "CONJUNCTIONS") => void;
  onOpenAiCoach?: () => void;
}

export const ExamGuidedFightPath: React.FC<ExamGuidedFightPathProps> = ({ 
  onNavigateToSection,
  onOpenAiCoach 
}) => {
  const { profile, updateProfile } = useUser();
  const [completedStepIds, setCompletedStepIds] = useState<string[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [focusSingleStep, setFocusSingleStep] = useState<boolean>(false);

  // Normalize target exam key
  const targetExamKey: "DTZ" | "TELC_B1" | "GOETHE_B1" | "CITIZENSHIP_ONLY" = 
    profile.targetExam === "TELC_B1" || profile.targetExam === "GOETHE_B1" || profile.targetExam === "CITIZENSHIP_ONLY"
      ? profile.targetExam
      : "DTZ";

  const currentPath: ExamFightPath = EXAM_FIGHT_PATHS[targetExamKey] || EXAM_FIGHT_PATHS.DTZ;

  // Load completed step IDs from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`german_prep_fight_path_${targetExamKey}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setCompletedStepIds(parsed);
        // Find first incomplete step
        const firstIncompleteIdx = currentPath.steps.findIndex(s => !parsed.includes(s.id));
        if (firstIncompleteIdx !== -1) {
          setCurrentStepIndex(firstIncompleteIdx);
        }
      }
    } catch (e) {
      console.warn("Could not load fight path progress", e);
    }

    const handleGlobalReset = () => {
      setCompletedStepIds([]);
      setCurrentStepIndex(0);
    };
    window.addEventListener("german_prep_reset_progress", handleGlobalReset);
    return () => window.removeEventListener("german_prep_reset_progress", handleGlobalReset);
  }, [targetExamKey, currentPath.steps]);

  const handleSelectExam = (examKey: "DTZ" | "TELC_B1" | "GOETHE_B1" | "CITIZENSHIP_ONLY") => {
    updateProfile({ targetExam: examKey });
    setCurrentStepIndex(0);
    confetti({ particleCount: 30, spread: 45, origin: { y: 0.7 } });
  };

  const handleToggleStepCompleted = (stepId: string) => {
    const isCompleted = completedStepIds.includes(stepId);
    let updated: string[];

    if (isCompleted) {
      updated = completedStepIds.filter(id => id !== stepId);
    } else {
      updated = [...completedStepIds, stepId];
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
      // If we completed the current step, auto-advance to next incomplete
      if (currentStepIndex < currentPath.steps.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
      }
    }

    setCompletedStepIds(updated);
    try {
      localStorage.setItem(`german_prep_fight_path_${targetExamKey}`, JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save progress", e);
    }
  };

  const activeStep: FightPathStep = currentPath.steps[currentStepIndex] || currentPath.steps[0];
  const percentComplete = Math.round((completedStepIds.length / currentPath.steps.length) * 100);

  // Group steps by Phase for structured roadmap
  const phasesMap = currentPath.steps.reduce((acc, step) => {
    if (!acc[step.phaseTitle]) {
      acc[step.phaseTitle] = [];
    }
    acc[step.phaseTitle].push(step);
    return acc;
  }, {} as Record<string, FightPathStep[]>);

  return (
    <div className="space-y-6">
      {/* ─── 1. TARGET EXAM SELECTOR BAR ─── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-300 rounded-full text-xs font-bold border border-amber-500/30">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>STEP 1: SELECT YOUR TARGET EXAM</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5">
              The Guided Pass Pathway: <span className="text-amber-400">{currentPath.examName}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Select your exam and your training roadmap is automatically structured step-by-step. Follow each 15-minute training drill in order to reach the 60% passing mark.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAiModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-500/40 text-amber-300 font-bold text-xs transition flex items-center gap-1.5 shadow-md shadow-amber-500/10"
            >
              <Bot className="w-4 h-4 text-amber-400" />
              <span>AI Exam Tutor</span>
            </button>
          </div>
        </div>

        {/* 4-Way Target Exam Switcher Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          {[
            { id: "DTZ" as const, label: "DTZ (Recommended)", desc: "Speaking + Writing Pass Bar", badge: "PR & Citizenship" },
            { id: "TELC_B1" as const, label: "telc Deutsch B1", desc: "Pooled Written + Oral", badge: "General B1" },
            { id: "GOETHE_B1" as const, label: "Goethe-Zertifikat B1", desc: "4 Independent Modules", badge: "Modular Retakes" },
            { id: "CITIZENSHIP_ONLY" as const, label: "Citizenship Only", desc: "17/33 Pass Benchmark", badge: "310 Questions" }
          ].map((exam) => {
            const isSelected = targetExamKey === exam.id;
            return (
              <button
                key={exam.id}
                type="button"
                onClick={() => handleSelectExam(exam.id)}
                className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between space-y-1.5 ${
                  isSelected
                    ? "bg-slate-950 border-amber-500 shadow-xl shadow-amber-500/15 ring-1 ring-amber-500/50"
                    : "bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-950/80 text-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase font-mono px-2 py-0.5 rounded-md ${
                    isSelected ? "bg-amber-500 text-slate-950" : "bg-slate-900 text-slate-400 border border-slate-800"
                  }`}>
                    {exam.badge}
                  </span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                </div>
                <div>
                  <div className="text-sm font-black text-white">{exam.label}</div>
                  <div className="text-[11px] text-slate-400 leading-snug">{exam.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Passing Rule Summary Box */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300">
              <strong className="text-white">Exam Pass Formula:</strong> {currentPath.passingRuleSummary}
            </span>
          </div>
          <div className="text-[11px] text-amber-300 font-mono shrink-0 flex items-center gap-2">
            <span>{completedStepIds.length} of {currentPath.steps.length} Steps Completed ({percentComplete}%)</span>
            {completedStepIds.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Reset ${targetExamKey} fight path progress to start fresh?`)) {
                    setCompletedStepIds([]);
                    setCurrentStepIndex(0);
                    localStorage.removeItem(`german_prep_fight_path_${targetExamKey}`);
                  }
                }}
                className="text-[10px] text-slate-400 hover:text-rose-300 font-medium flex items-center gap-1 transition"
                title="Reset fight path steps"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset ↺</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ─── 2. THE CURRENT STEP FOCUS HERO (THE SINGLE ACTION) ─── */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-500/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase font-mono bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20">
                ACTIVE STEP {activeStep.stepNumber} OF {currentPath.steps.length}
              </span>
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-slate-950 border border-slate-700 text-cyan-300 font-mono">
                {activeStep.moduleBadge}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>{activeStep.durationMinutes} Minutes</span>
              </span>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {activeStep.phaseTitle}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                {activeStep.title}
              </h3>
              <p className="text-sm text-amber-300/90 font-medium mt-0.5">
                {activeStep.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setFocusSingleStep(!focusSingleStep)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 font-bold transition flex items-center gap-1.5"
            >
              {focusSingleStep ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{focusSingleStep ? "Exit Single Focus" : "ADHD Single Focus Mode"}</span>
            </button>
          </div>
        </div>

        {/* Why this guarantees your pass */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-4 text-xs text-slate-200 space-y-1.5">
          <div className="flex items-center gap-1.5 text-amber-400 font-black uppercase tracking-wider text-[11px]">
            <Lightbulb className="w-4 h-4" />
            <span>Why This Step Guarantees Your B1 Pass:</span>
          </div>
          <p className="leading-relaxed">
            {activeStep.whyThisGuaranteesPass}
          </p>
        </div>

        {/* Checklist */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Action Items for this 15-Minute Session:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {activeStep.checklist.map((item, idx) => (
              <div key={idx} className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-4 h-4 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800">
          <button
            type="button"
            onClick={() => {
              onNavigateToSection(activeStep.targetSection);
            }}
            className="py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm sm:text-base transition flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 active:scale-95"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            <span>{activeStep.actionButtonText}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleToggleStepCompleted(activeStep.id)}
              className={`py-3 px-4 rounded-2xl border font-bold text-xs transition flex items-center justify-center gap-2 ${
                completedStepIds.includes(activeStep.id)
                  ? "bg-emerald-950/80 border-emerald-500 text-emerald-200"
                  : "bg-slate-950 hover:bg-slate-850 border-slate-800 text-slate-300 hover:border-amber-400"
              }`}
            >
              {completedStepIds.includes(activeStep.id) ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Step Completed!</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 text-amber-400" />
                  <span>Mark Step Completed ➔</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsAiModalOpen(true)}
              className="py-3 px-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-amber-300 text-xs font-bold transition flex items-center gap-1.5"
              title="Ask Local AI Tutor for advice"
            >
              <Bot className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Ask AI Tutor</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── 3. THE COMPLETE STEP-BY-STEP ROADMAP (ALL 16 STEPS) ─── */}
      {!focusSingleStep && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <h4 className="text-lg font-black text-white flex items-center gap-2">
                <span>Complete {currentPath.examName} Training Roadmap</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 font-mono font-bold">
                  {currentPath.steps.length} Steps
                </span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Click any step to set it as your active training focus.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Total Estimated Time:</span>
              <strong className="text-amber-400 font-mono">{currentPath.estimatedTotalHours}</strong>
            </div>
          </div>

          {/* Render Phases */}
          <div className="space-y-6">
            {Object.entries(phasesMap).map(([phaseTitle, stepsInPhase], pIdx) => (
              <div key={pIdx} className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span>{phaseTitle}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {stepsInPhase.map((step) => {
                    const isDone = completedStepIds.includes(step.id);
                    const isActive = activeStep.id === step.id;

                    return (
                      <div
                        key={step.id}
                        onClick={() => {
                          const idx = currentPath.steps.findIndex(s => s.id === step.id);
                          if (idx !== -1) setCurrentStepIndex(idx);
                        }}
                        className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-3 ${
                          isActive
                            ? "bg-slate-950 border-amber-500 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/40"
                            : isDone
                            ? "bg-slate-950/40 border-emerald-950 hover:border-emerald-800"
                            : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700"
                        }`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleStepCompleted(step.id);
                                }}
                                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition ${
                                  isDone
                                    ? "bg-emerald-500 text-slate-950 font-bold"
                                    : "border border-slate-700 hover:border-amber-400"
                                }`}
                              >
                                {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </button>
                              <span className="text-[10px] font-mono font-bold text-slate-400">
                                Step {step.stepNumber}
                              </span>
                            </div>

                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 border border-slate-800 text-cyan-300">
                              {step.moduleBadge}
                            </span>
                          </div>

                          <div className="font-bold text-white text-sm">
                            {step.title}
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                            {step.passingObjective}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                          <span className="text-[10px] text-slate-500 font-mono">
                            ⏱️ {step.durationMinutes} Min
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigateToSection(step.targetSection);
                            }}
                            className="text-amber-400 hover:text-amber-300 font-bold text-[11px] flex items-center gap-1 group"
                          >
                            <span>Open Exercise</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Exam Coach Modal */}
      <AiExamCoachModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
    </div>
  );
};
