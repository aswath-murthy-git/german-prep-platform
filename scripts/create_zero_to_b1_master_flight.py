import os

content = '''"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import confetti from "canvas-confetti";
import { 
  Rocket, 
  Target, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  Mic, 
  PenTool, 
  Award, 
  RotateCcw, 
  Volume2, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  AlertTriangle, 
  Clock, 
  Zap, 
  Calculator, 
  FileText, 
  Headphones,
  Compass,
  ArrowUpRight
} from "lucide-react";
import { 
  ZERO_TO_B1_FLIGHT_STAGES, 
  B1_CHEAT_CODES_DATA, 
  FlightStage, 
  B1CheatCode 
} from "@/data/a0_to_b1_master_data";

interface ZeroToB1MasterFlightProps {
  onNavigateToSection?: (section: string) => void;
  onOpenAiCoach?: () => void;
}

export const ZeroToB1MasterFlight: React.FC<ZeroToB1MasterFlightProps> = ({
  onNavigateToSection,
  onOpenAiCoach
}) => {
  const { profile, theme } = useUser();
  const isDark = theme === "dark";

  // Selected starting level filter
  const [selectedLevel, setSelectedLevel] = useState<"A0" | "A1" | "A2" | "B1" | "ALL">("A0");
  
  // Expanded stage ID
  const [expandedStageId, setExpandedStageId] = useState<string>("stage-a0");
  
  // Active Cheat Code Tab
  const [activeCheatTab, setActiveCheatTab] = useState<string>("code-1-suffixes");

  // Daily 3-Step Guided Mission State (persisted in localStorage)
  const [dailyMissionProgress, setDailyMissionProgress] = useState<{
    step1Done: boolean;
    step2Done: boolean;
    step3Done: boolean;
  }>({
    step1Done: false,
    step2Done: false,
    step3Done: false
  });

  // Load mission progress from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("germanprep_zero_to_b1_mission");
        if (saved) {
          setDailyMissionProgress(JSON.parse(saved));
        }
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const toggleMissionStep = (stepKey: "step1Done" | "step2Done" | "step3Done") => {
    setDailyMissionProgress(prev => {
      const updated = { ...prev, [stepKey]: !prev[stepKey] };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("germanprep_zero_to_b1_mission", JSON.stringify(updated));
        } catch (e) {}
      }
      if (updated.step1Done && updated.step2Done && updated.step3Done) {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      }
      return updated;
    });
  };

  // Quick Drill answer states per question
  const [drillAnswers, setDrillAnswers] = useState<Record<string, string>>({});
  const [drillFeedback, setDrillFeedback] = useState<Record<string, "CORRECT" | "INCORRECT">>({});

  const handleSelectDrillAnswer = (drillId: string, selectedOption: string, correctOption: string) => {
    setDrillAnswers(prev => ({ ...prev, [drillId]: selectedOption }));
    const isCorrect = selectedOption === correctOption;
    setDrillFeedback(prev => ({ ...prev, [drillId]: isCorrect ? "CORRECT" : "INCORRECT" }));
    if (isCorrect) {
      confetti({ particleCount: 30, spread: 45, origin: { y: 0.7 } });
    }
  };

  // ─── CHEAT CODE 1: SUFFIX SORTER TEST STATE ───
  const [suffixFilter, setSuffixFilter] = useState<"ALL" | "DIE" | "DAS" | "DER">("ALL");

  // ─── CHEAT CODE 2: VERB KICKER CONNECTOR STATE ───
  const [selectedConnector, setSelectedConnector] = useState<"weil" | "dass" | "obwohl" | "wenn" | "deshalb">("weil");

  // ─── CHEAT CODE 3: EMAIL TEMPLATE COPY STATE ───
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const EMAIL_TEMPLATE_TEXT = `Sehr geehrte Damen und Herren,

ich schreibe Ihnen, weil ich eine wichtige Frage zu meiner Anmeldung habe. Ich hoffe, es geht Ihnen gut.

Da ich letzte Woche krank war, konnte ich den Termin leider nicht wahrnehmen. Aus diesem Grund möchte ich mich herzlich dafür entschuldigen.

Könnten Sie mir bitte mitteilen, wann ein neuer Termin möglich wäre? Außerdem wäre ich Ihnen sehr dankbar, wenn Sie mir die erforderlichen Unterlagen per E-Mail zusenden könnten.

Vielen Dank im Voraus für Ihre Unterstützung und Ihr Verständnis.

Mit freundlichen Grüßen,
[Ihr Vorname und Nachname]`;

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(EMAIL_TEMPLATE_TEXT);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  // ─── CHEAT CODE 4: AUDIO SPEECH PLAYER ───
  const playSpeech = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // ─── CHEAT CODE 5: 60% EXAM MATH CALCULATOR STATE ───
  const [calcScores, setCalcScores] = useState<{
    lesen: number;
    hoeren: number;
    schreiben: number;
    sprechen: number;
  }>({
    lesen: 18,
    hoeren: 16,
    schreiben: 36,
    sprechen: 55
  });

  // Goethe Pass: each module >= 60%
  const goetheLesenPass = calcScores.lesen >= 15; // 15/25 = 60%
  const goetheHoerenPass = calcScores.hoeren >= 15; // 15/25 = 60%
  const goetheSchreibenPass = calcScores.schreiben >= 60; // 60/100
  const goetheSprechenPass = calcScores.sprechen >= 60; // 60/100
  const goetheAllPass = goetheLesenPass && goetheHoerenPass && goetheSchreibenPass && goetheSprechenPass;

  // telc Pass: Written (Lesen + Sprachbausteine + Hoeren + Schreiben) >= 135/225 (60%) AND Oral (Sprechen) >= 45/75 (60%)
  const telcWrittenTotal = Math.round((calcScores.lesen / 25) * 75 + (calcScores.hoeren / 25) * 75 + (calcScores.schreiben / 100) * 45 + 15);
  const telcOralTotal = Math.round((calcScores.sprechen / 100) * 75);
  const telcWrittenPass = telcWrittenTotal >= 135;
  const telcOralPass = telcOralTotal >= 45;
  const telcAllPass = telcWrittenPass && telcOralPass;

  // Filtered Stages based on selected level
  const displayedStages = selectedLevel === "ALL" 
    ? ZERO_TO_B1_FLIGHT_STAGES 
    : ZERO_TO_B1_FLIGHT_STAGES.filter(s => s.level === selectedLevel || s.level === "EXAM_HACKS");

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-fadeIn">
      {/* ─── 1. HERO COACH COCKPIT HEADER ─── */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl relative overflow-hidden transition-colors duration-200 ${
        isDark 
          ? "bg-gradient-to-br from-purple-950/70 via-slate-900 to-indigo-950/50 border-purple-500/30 text-white" 
          : "bg-gradient-to-br from-purple-50 via-white to-indigo-50/50 border-purple-200 text-slate-900"
      }`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-600 text-white shadow-sm flex items-center gap-1.5">
                <Rocket className="w-3.5 h-3.5" />
                <span>Zero to B1 Pass Guarantee Engine</span>
              </span>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                isDark ? "bg-slate-900/80 border-slate-700 text-purple-300" : "bg-white border-slate-200 text-purple-700"
              }`}>
                Designed for Complete Beginners (A0)
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              From Complete Zero (A0) to <span className="text-purple-400">Guaranteed B1 Pass</span>
            </h1>

            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              Do not memorize 500 isolated grammar rules. Master the <strong>5 high-yield milestones</strong> that guarantee your <strong>60% passing threshold</strong> in Goethe-Zertifikat B1 and telc Deutsch B1.
            </p>
          </div>

          {/* Quick Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
            <div className={`p-3.5 rounded-2xl border text-center ${
              isDark ? "bg-slate-950/80 border-slate-800" : "bg-white border-purple-100 shadow-xs"
            }`}>
              <div className="text-xl sm:text-2xl font-black text-purple-400">60%</div>
              <div className="text-[11px] font-bold text-slate-400">Pass Threshold</div>
            </div>
            <div className={`p-3.5 rounded-2xl border text-center ${
              isDark ? "bg-slate-950/80 border-slate-800" : "bg-white border-purple-100 shadow-xs"
            }`}>
              <div className="text-xl sm:text-2xl font-black text-emerald-400">5 Stages</div>
              <div className="text-[11px] font-bold text-slate-400">Structured Path</div>
            </div>
            <div className={`p-3.5 rounded-2xl border text-center col-span-2 sm:col-span-1 ${
              isDark ? "bg-slate-950/80 border-slate-800" : "bg-white border-purple-100 shadow-xs"
            }`}>
              <div className="text-xl sm:text-2xl font-black text-amber-400">24 Mocks</div>
              <div className="text-[11px] font-bold text-slate-400">A1 to B1 Sets 1-4</div>
            </div>
          </div>
        </div>

        {/* Level Switcher Pills */}
        <div className="mt-6 pt-5 border-t border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs font-bold text-purple-300 flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-400" />
            <span>Select Your Starting Point:</span>
          </div>

          <div className={`inline-flex p-1 rounded-2xl border flex-wrap gap-1 ${
            isDark ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"
          }`}>
            {[
              { id: "A0", label: "A0: Complete Beginner" },
              { id: "A1", label: "A1: Basic Words" },
              { id: "A2", label: "A2: Past Tense" },
              { id: "B1", label: "B1: Complex Sentences" },
              { id: "ALL", label: "Show All 5 Stages" }
            ].map(lvl => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => setSelectedLevel(lvl.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedLevel === lvl.id
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── 2. TODAY'S GUIDED 3-STEP MISSION (1-CLICK ROUTINE) ─── */}
      <div className={`p-5 sm:p-6 rounded-3xl border shadow-sm space-y-4 ${
        isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-amber-500/20 text-amber-300">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                Today&apos;s Guided 40-Minute Mission
              </h2>
            </div>
            <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              The proven 3-step formula: 10 minutes input, 15 minutes drill, 15 minutes output. Complete daily to pass B1.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-xl border ${
              dailyMissionProgress.step1Done && dailyMissionProgress.step2Done && dailyMissionProgress.step3Done
                ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
                : isDark ? "bg-slate-950 border-slate-800 text-slate-400" : "bg-slate-100 border-slate-200 text-slate-600"
            }`}>
              {dailyMissionProgress.step1Done && dailyMissionProgress.step2Done && dailyMissionProgress.step3Done
                ? "✓ Today's Mission Completed!"
                : "Active Today"}
            </span>
          </div>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {/* Step 1 */}
          <div className={`p-4 rounded-2xl border transition space-y-3 flex flex-col justify-between ${
            dailyMissionProgress.step1Done
              ? isDark ? "bg-emerald-950/20 border-emerald-500/40" : "bg-emerald-50/50 border-emerald-200"
              : isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
          }`}>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-300">
                  Step 1 • 10 Min
                </span>
                <button
                  type="button"
                  onClick={() => toggleMissionStep("step1Done")}
                  className={`p-1 rounded-lg border transition ${
                    dailyMissionProgress.step1Done
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : isDark ? "border-slate-700 text-slate-500" : "border-slate-300 text-slate-400"
                  }`}
                  title="Mark as done"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>
              <h4 className="text-sm font-black">Learn 1 Core Formula</h4>
              <p className={`text-xs leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Inspect the formula below: Verb Kicker or 4 verb endings (-e, -st, -t, -en). Never memorize without rules.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToSection?.("LEARN")}
              className="w-full py-2 bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <span>Open Blueprint Lessons</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Step 2 */}
          <div className={`p-4 rounded-2xl border transition space-y-3 flex flex-col justify-between ${
            dailyMissionProgress.step2Done
              ? isDark ? "bg-emerald-950/20 border-emerald-500/40" : "bg-emerald-50/50 border-emerald-200"
              : isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
          }`}>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-300">
                  Step 2 • 15 Min
                </span>
                <button
                  type="button"
                  onClick={() => toggleMissionStep("step2Done")}
                  className={`p-1 rounded-lg border transition ${
                    dailyMissionProgress.step2Done
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : isDark ? "border-slate-700 text-slate-500" : "border-slate-300 text-slate-400"
                  }`}
                  title="Mark as done"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>
              <h4 className="text-sm font-black">Active Recall Drill</h4>
              <p className={`text-xs leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Solve 10 sentence fill-in-the-blank typing drills in Practice or Grammar Pass Lab. Build muscle memory.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToSection?.("PRACTICE")}
              className="w-full py-2 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <span>Launch Practice Lab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Step 3 */}
          <div className={`p-4 rounded-2xl border transition space-y-3 flex flex-col justify-between ${
            dailyMissionProgress.step3Done
              ? isDark ? "bg-emerald-950/20 border-emerald-500/40" : "bg-emerald-50/50 border-emerald-200"
              : isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
          }`}>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300">
                  Step 3 • 15 Min
                </span>
                <button
                  type="button"
                  onClick={() => toggleMissionStep("step3Done")}
                  className={`p-1 rounded-lg border transition ${
                    dailyMissionProgress.step3Done
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : isDark ? "border-slate-700 text-slate-500" : "border-slate-300 text-slate-400"
                  }`}
                  title="Mark as done"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>
              <h4 className="text-sm font-black">Speaking / Writing Sprint</h4>
              <p className={`text-xs leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Speak out loud: deliver 1 presentation slide or write 1 email draft addressing all 4 official bullet points.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToSection?.("SPEAKING")}
              className="w-full py-2 bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <span>Open Speaking Sanctuary</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ─── 3. THE 5 B1 EXAM CHEAT CODES TOOLKIT ─── */}
      <div className={`p-6 sm:p-7 rounded-3xl border shadow-sm space-y-6 ${
        isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-slate-800/40">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Exam Hacks & Safe Points
              </span>
              <h2 className="text-lg sm:text-xl font-black tracking-tight">
                The 5 B1 Cheat Codes (Pass Without Memorizing the Dictionary)
              </h2>
            </div>
            <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Examiners look for specific patterns. Use these 5 formulas to guarantee points even if your vocabulary is limited.
            </p>
          </div>
        </div>

        {/* Cheat Code Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {B1_CHEAT_CODES_DATA.map(code => (
            <button
              key={code.id}
              type="button"
              onClick={() => setActiveCheatTab(code.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeCheatTab === code.id
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black"
                  : isDark ? "bg-slate-950 border border-slate-800 text-slate-300 hover:text-white" : "bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{code.title}</span>
            </button>
          ))}
        </div>

        {/* ACTIVE CHEAT CODE TOOL RENDERING */}
        {(() => {
          const curCode = B1_CHEAT_CODES_DATA.find(c => c.id === activeCheatTab) || B1_CHEAT_CODES_DATA[0];

          return (
            <div className={`p-5 rounded-2xl border space-y-5 ${
              isDark ? "bg-slate-950/70 border-slate-800" : "bg-purple-50/30 border-purple-200"
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                    {curCode.badge}
                  </span>
                  <h3 className="text-base sm:text-lg font-black">{curCode.title}</h3>
                  <p className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                    <strong>The Problem:</strong> {curCode.problem}
                  </p>
                  <p className="text-xs text-amber-400 font-semibold">
                    <strong>The Secret Hack:</strong> {curCode.secretHack}
                  </p>
                </div>
              </div>

              {/* TOOL 1: SUFFIX SORTER */}
              {curCode.interactiveToolType === "SUFFIX_SORTER" && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">Filter Suffix Rules:</span>
                    {(["ALL", "DIE", "DAS", "DER"] as const).map(f => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setSuffixFilter(f)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                          suffixFilter === f
                            ? "bg-purple-600 text-white"
                            : isDark ? "bg-slate-900 text-slate-400" : "bg-white text-slate-600 border border-slate-200"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {curCode.contentItems
                      .filter(item => {
                        if (suffixFilter === "DIE") return item.label.includes("DIE");
                        if (suffixFilter === "DAS") return item.label.includes("DAS");
                        if (suffixFilter === "DER") return item.label.includes("DER");
                        return true;
                      })
                      .map((item, idx) => (
                        <div
                          key={idx}
                          className={`p-3.5 rounded-xl border space-y-1.5 ${
                            item.label.includes("DIE")
                              ? isDark ? "bg-rose-950/30 border-rose-500/30 text-rose-200" : "bg-rose-50 border-rose-200 text-rose-900"
                              : item.label.includes("DAS")
                              ? isDark ? "bg-amber-950/30 border-amber-500/30 text-amber-200" : "bg-amber-50 border-amber-200 text-amber-900"
                              : isDark ? "bg-blue-950/30 border-blue-500/30 text-blue-200" : "bg-blue-50 border-blue-200 text-blue-900"
                          }`}
                        >
                          <div className="text-xs font-black">{item.label}</div>
                          <div className="text-xs font-semibold">{item.detail}</div>
                          {item.example && (
                            <div className="text-[11px] opacity-80 font-mono">
                              Examples: {item.example}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* TOOL 2: VERB KICKER VISUALIZER */}
              {curCode.interactiveToolType === "VERB_KICKER" && (
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">Choose Subordinate Connector:</span>
                    {(["weil", "dass", "obwohl", "wenn", "deshalb"] as const).map(conn => (
                      <button
                        key={conn}
                        type="button"
                        onClick={() => setSelectedConnector(conn)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition font-mono ${
                          selectedConnector === conn
                            ? "bg-purple-600 text-white"
                            : isDark ? "bg-slate-900 text-slate-400 border border-slate-800" : "bg-white text-slate-600 border border-slate-200"
                        }`}
                      >
                        {conn}
                      </button>
                    ))}
                  </div>

                  {/* Visual Satzbau Box */}
                  <div className={`p-5 rounded-2xl border space-y-3 ${
                    isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                  }`}>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Live Sentence Structure Comparison:
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs text-slate-400">Standard Main Clause (Verb in Position 2):</div>
                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm">
                        <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-200">Ich</span>
                        <span className="px-2.5 py-1 rounded bg-amber-500/30 text-amber-300 border border-amber-500/50 font-bold">
                          [POS 2: lerne]
                        </span>
                        <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-200">jeden Tag Deutsch.</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <div className="text-xs text-purple-400 font-bold">
                        With Subordinate Connector &ldquo;{selectedConnector}&rdquo; (Verb Kicked to Absolute End!):
                      </div>
                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm">
                        <span className="px-2.5 py-1 rounded bg-purple-600 text-white font-bold">
                          ..., {selectedConnector}
                        </span>
                        <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-200">ich</span>
                        <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-200">in Deutschland</span>
                        <span className="px-2.5 py-1 rounded bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 font-black">
                          [ENDE: lebe / arbeiten möchte].
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TOOL 3: UNIVERSAL 45/45 EMAIL TEMPLATE */}
              {curCode.interactiveToolType === "EMAIL_TEMPLATE" && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">
                      Standard B1 Formal/Semi-formal Master Email Template (~85 words)
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-xs"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedEmail ? "Copied to Clipboard!" : "Copy Template"}</span>
                    </button>
                  </div>

                  <pre className={`p-4 rounded-2xl border font-mono text-xs leading-relaxed whitespace-pre-wrap ${
                    isDark ? "bg-slate-900 border-slate-800 text-slate-200" : "bg-white border-slate-200 text-slate-800"
                  }`}>
                    {EMAIL_TEMPLATE_TEXT}
                  </pre>
                </div>
              )}

              {/* TOOL 4: SPEAKING SAFETY PHRASES */}
              {curCode.interactiveToolType === "SAFETY_PHRASES" && (
                <div className="space-y-3 pt-2">
                  <div className="text-xs text-slate-400">
                    Click the speaker icon to hear the exact natural pronunciation for your oral exam:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {curCode.contentItems.map((phrase, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 ${
                          isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="text-xs font-black text-rose-400 font-mono">
                            &ldquo;{phrase.label}&rdquo;
                          </div>
                          <div className={`text-xs ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                            {phrase.detail}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => playSpeech(phrase.label)}
                          className={`p-2 rounded-xl border text-rose-400 hover:text-white hover:bg-rose-600 transition shrink-0 ${
                            isDark ? "border-slate-700 bg-slate-950" : "border-slate-200 bg-slate-50"
                          }`}
                          title="Listen to pronunciation"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TOOL 5: 60% EXAM MATH CALCULATOR */}
              {curCode.interactiveToolType === "CALCULATOR_60" && (
                <div className="space-y-5 pt-2">
                  <div className="text-xs text-slate-400">
                    Adjust the sliders below to simulate your points across all 4 exam skills:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Lesen */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span>Lesen (Reading): {calcScores.lesen} / 25 Pkt</span>
                        <span className={goetheLesenPass ? "text-emerald-400" : "text-rose-400"}>
                          {Math.round((calcScores.lesen / 25) * 100)}% ({goetheLesenPass ? "Pass" : "Fail"})
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="25"
                        value={calcScores.lesen}
                        onChange={e => setCalcScores(prev => ({ ...prev, lesen: Number(e.target.value) }))}
                        className="w-full accent-purple-600"
                      />
                    </div>

                    {/* Hören */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span>Hören (Listening): {calcScores.hoeren} / 25 Pkt</span>
                        <span className={goetheHoerenPass ? "text-emerald-400" : "text-rose-400"}>
                          {Math.round((calcScores.hoeren / 25) * 100)}% ({goetheHoerenPass ? "Pass" : "Fail"})
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="25"
                        value={calcScores.hoeren}
                        onChange={e => setCalcScores(prev => ({ ...prev, hoeren: Number(e.target.value) }))}
                        className="w-full accent-purple-600"
                      />
                    </div>

                    {/* Schreiben */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span>Schreiben (Writing): {calcScores.schreiben} / 100%</span>
                        <span className={goetheSchreibenPass ? "text-emerald-400" : "text-rose-400"}>
                          {calcScores.schreiben}% ({goetheSchreibenPass ? "Pass" : "Fail"})
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={calcScores.schreiben}
                        onChange={e => setCalcScores(prev => ({ ...prev, schreiben: Number(e.target.value) }))}
                        className="w-full accent-emerald-600"
                      />
                    </div>

                    {/* Sprechen */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span>Sprechen (Oral): {calcScores.sprechen} / 100%</span>
                        <span className={goetheSprechenPass ? "text-emerald-400" : "text-rose-400"}>
                          {calcScores.sprechen}% ({goetheSprechenPass ? "Pass" : "Fail"})
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={calcScores.sprechen}
                        onChange={e => setCalcScores(prev => ({ ...prev, sprechen: Number(e.target.value) }))}
                        className="w-full accent-rose-600"
                      />
                    </div>
                  </div>

                  {/* Calculated Results Status Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                    {/* Goethe Status */}
                    <div className={`p-4 rounded-2xl border space-y-2 ${
                      goetheAllPass
                        ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                        : "bg-rose-950/40 border-rose-500/40 text-rose-200"
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="font-black text-sm">Goethe-Zertifikat B1:</span>
                        <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded bg-black/40">
                          {goetheAllPass ? "PASSED (BESTANDEN)" : "RETAKE NEEDED"}
                        </span>
                      </div>
                      <p className="text-xs opacity-90 leading-relaxed">
                        {goetheAllPass 
                          ? "Congratulations! You score >= 60% in all 4 independent modules."
                          : "Note: In Goethe, you only need to repeat the specific module that fell below 60%!"}
                      </p>
                    </div>

                    {/* telc Status */}
                    <div className={`p-4 rounded-2xl border space-y-2 ${
                      telcAllPass
                        ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                        : "bg-rose-950/40 border-rose-500/40 text-rose-200"
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="font-black text-sm">telc Deutsch B1:</span>
                        <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded bg-black/40">
                          {telcAllPass ? "PASSED (BESTANDEN)" : "NOT PASSED"}
                        </span>
                      </div>
                      <p className="text-xs opacity-90 leading-relaxed">
                        Written: {telcWrittenTotal} / 225 ({telcWrittenPass ? "Pass" : "Need 135"}) • Oral: {telcOralTotal} / 75 ({telcOralPass ? "Pass" : "Need 45"}).
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* ─── 4. THE 5-STAGE PROGRESSION LADDER ─── */}
      <div className="space-y-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-purple-500/20 text-purple-300">
              <Compass className="w-4 h-4" />
            </span>
            <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              The 5-Stage Flight Progression
            </h2>
          </div>
          <p className={`text-xs sm:text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Work through each milestone sequentially. Master the rule formulas and quick drills to level up.
          </p>
        </div>

        {/* Stages Accordion */}
        <div className="space-y-4">
          {displayedStages.map((stage, sIdx) => {
            const isExpanded = expandedStageId === stage.stageId;

            return (
              <div
                key={stage.stageId}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden shadow-sm ${
                  isExpanded
                    ? isDark ? "bg-slate-900/95 border-purple-500/40 ring-1 ring-purple-500/20" : "bg-white border-purple-300 ring-1 ring-purple-200"
                    : isDark ? "bg-slate-900/60 border-slate-800 hover:border-slate-700" : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* Stage Header Accordion Toggle */}
                <button
                  type="button"
                  onClick={() => setExpandedStageId(isExpanded ? "" : stage.stageId)}
                  className="w-full p-5 sm:p-6 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className={`px-2.5 py-0.5 rounded-lg text-xs font-black uppercase tracking-wider ${
                        stage.level === "A0"
                          ? "bg-slate-800 text-slate-300 border border-slate-700"
                          : stage.level === "A1"
                          ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/30"
                          : stage.level === "A2"
                          ? "bg-blue-950/60 text-blue-300 border border-blue-500/30"
                          : stage.level === "B1"
                          ? "bg-purple-950/60 text-purple-300 border border-purple-500/30"
                          : "bg-amber-950/60 text-amber-300 border border-amber-500/30"
                      }`}>
                        {stage.level}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
                        <Clock className="w-3 h-3" />
                        {stage.timeEstimate}
                      </span>
                    </div>
                    <h3 className={`text-base sm:text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                      {stage.title}
                    </h3>
                    <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                      {stage.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <span className="text-xs font-bold text-purple-400 hidden sm:inline">
                      {stage.coreMilestones.length} Milestones
                    </span>
                    <div className={`p-2 rounded-xl border transition ${
                      isExpanded
                        ? "bg-purple-600 border-purple-600 text-white"
                        : isDark ? "border-slate-800 bg-slate-950 text-slate-400" : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Expanded Stage Content */}
                {isExpanded && (
                  <div className={`p-5 sm:p-6 border-t space-y-6 ${
                    isDark ? "border-slate-800 bg-slate-950/40" : "border-slate-100 bg-purple-50/10"
                  }`}>
                    {/* Coach Philosophy Banner */}
                    <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                      isDark ? "bg-purple-950/30 border-purple-500/30 text-purple-200" : "bg-purple-50 border-purple-200 text-purple-900"
                    }`}>
                      <Lightbulb className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                      <div className="space-y-1 text-xs">
                        <span className="font-extrabold uppercase tracking-wider block">Coach Mindset:</span>
                        <p className="leading-relaxed">{stage.coachPhilosophy}</p>
                      </div>
                    </div>

                    {/* Core Milestones Grid */}
                    <div className="space-y-4">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Stage Milestones & Formulas:
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {stage.coreMilestones.map((ms, mIdx) => (
                          <div
                            key={ms.id}
                            className={`p-4 rounded-2xl border space-y-3 flex flex-col justify-between ${
                              isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-xs"
                            }`}
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-purple-400">
                                  Milestone {mIdx + 1}: {ms.title}
                                </span>
                                <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-purple-500/10 text-purple-300">
                                  {ms.recommendedLab}
                                </span>
                              </div>

                              <p className={`text-xs ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                                {ms.description}
                              </p>

                              {/* Rule Formula Box */}
                              <div className={`p-2.5 rounded-xl font-mono text-xs font-bold ${
                                isDark ? "bg-slate-950 text-amber-300 border border-slate-800" : "bg-amber-50 text-amber-900 border border-amber-200"
                              }`}>
                                📐 {ms.ruleFormula}
                              </div>

                              {/* Contrast Examples */}
                              <div className="text-xs space-y-1 pt-1">
                                <div className="text-emerald-400 font-semibold font-mono">
                                  ✓ DE: &ldquo;{ms.exampleDe}&rdquo;
                                </div>
                                <div className="text-slate-400 text-[11px]">
                                  EN: {ms.exampleEn}
                                </div>
                              </div>

                              {/* Trap to Avoid Callout */}
                              <div className={`p-2 rounded-xl text-[11px] flex items-start gap-1.5 ${
                                isDark ? "bg-rose-950/30 text-rose-300 border border-rose-500/20" : "bg-rose-50 text-rose-800 border border-rose-200"
                              }`}>
                                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-400" />
                                <div>
                                  <strong>Trap to Avoid:</strong> {ms.trapToAvoid}
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => onNavigateToSection?.(ms.recommendedLab)}
                              className="mt-2 w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs"
                            >
                              <span>Launch {ms.recommendedLab} Lab</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Interactive Stage Drills */}
                    {stage.quickDrills.length > 0 && (
                      <div className="space-y-3 pt-3 border-t border-slate-800">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-amber-400" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                            Instant Active Recall Drill for {stage.level}:
                          </h4>
                        </div>

                        <div className="space-y-3">
                          {stage.quickDrills.map((drill) => {
                            const userAnswer = drillAnswers[drill.id];
                            const feedback = drillFeedback[drill.id];

                            return (
                              <div
                                key={drill.id}
                                className={`p-4 rounded-2xl border space-y-3 ${
                                  isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                                }`}
                              >
                                <div className="space-y-1">
                                  <div className="text-xs font-semibold text-purple-400">{drill.prompt}</div>
                                  <div className="text-sm font-bold font-mono text-slate-100">
                                    {drill.sentence}
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                  {drill.options.map((opt) => {
                                    const isSelected = userAnswer === opt;
                                    const isCorrectOpt = opt === drill.correct;

                                    return (
                                      <button
                                        key={opt}
                                        type="button"
                                        onClick={() => handleSelectDrillAnswer(drill.id, opt, drill.correct)}
                                        className={`p-2.5 rounded-xl text-xs font-bold font-mono border transition ${
                                          userAnswer
                                            ? isCorrectOpt
                                              ? "bg-emerald-600 text-white border-emerald-600"
                                              : isSelected
                                              ? "bg-rose-600 text-white border-rose-600"
                                              : isDark ? "bg-slate-950 text-slate-500 border-slate-800" : "bg-slate-50 text-slate-400 border-slate-200"
                                            : isDark
                                            ? "bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-700 hover:border-purple-400"
                                            : "bg-white hover:bg-purple-50 text-slate-700 border-slate-200 hover:border-purple-300"
                                        }`}
                                      >
                                        {opt}
                                      </button>
                                    );
                                  })}
                                </div>

                                {feedback && (
                                  <div className={`p-2.5 rounded-xl text-xs font-semibold ${
                                    feedback === "CORRECT"
                                      ? "bg-emerald-950/40 border border-emerald-500/40 text-emerald-300"
                                      : "bg-rose-950/40 border border-rose-500/40 text-rose-300"
                                  }`}>
                                    {feedback === "CORRECT" ? "✓ Richtig! " : "✕ Falsch! "}
                                    {drill.explanation}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── 5. BOTTOM LAUNCHPAD: DIRECT ENTRY TO MOCKS & ACADEMY ─── */}
      <div className={`p-6 sm:p-8 rounded-3xl border text-center space-y-4 ${
        isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
      }`}>
        <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center mx-auto border border-purple-500/30">
          <Award className="w-6 h-6" />
        </div>

        <div className="space-y-1.5 max-w-lg mx-auto">
          <h3 className="text-xl sm:text-2xl font-black">Ready to Test Your Exam Readiness?</h3>
          <p className={`text-xs sm:text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Take authentic telc and Goethe mock exams across A1, A2, and B1 (Sets 1 to 4) under realistic exam timing and grading.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onNavigateToSection?.("EXAM")}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm rounded-2xl transition flex items-center gap-2 shadow-md shadow-purple-600/30 active:scale-95"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Launch Full Mock Arena (24 Exams)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onNavigateToSection?.("LEARN")}
            className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm border transition flex items-center gap-2 ${
              isDark ? "bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span>Open All 15 Lesson Blueprints</span>
          </button>
        </div>
      </div>
    </div>
  );
};
'''

with open('src/components/ZeroToB1MasterFlight.tsx', 'w') as f:
    f.write(content)

print("Created src/components/ZeroToB1MasterFlight.tsx successfully!")
