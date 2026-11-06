"use client";

import React, { useState } from "react";
import { Navbar, NavSectionType } from "@/components/Navbar";
import { ViobeanDashboard } from "@/components/ViobeanDashboard";
import { ViobeanExamHub } from "@/components/ViobeanExamHub";
import { PracticeWorkbench } from "@/components/PracticeWorkbench";
import { ViobeanLearnAcademy } from "@/components/ViobeanLearnAcademy";
import { ViobeanSpeakingPartner } from "@/components/ViobeanSpeakingPartner";
import { CitizenshipSection } from "@/components/CitizenshipSection";
import { FastTrack30DayHub } from "@/components/FastTrack30DayHub";
import { B1ReadingLab } from "@/components/B1ReadingLab";
import { B1ListeningLab } from "@/components/B1ListeningLab";
import { B1WritingLab } from "@/components/B1WritingLab";
import { B1SpeakingSanctuary } from "@/components/B1SpeakingSanctuary";
import { B1ReadingKeywordDrills } from "@/components/B1ReadingKeywordDrills";
import { B1PassingStrategy } from "@/components/B1PassingStrategy";
import { B1GrammarPassLab } from "@/components/B1GrammarPassLab";
import { ZeroToB1MasterFlight } from "@/components/ZeroToB1MasterFlight";
import { ZeroToB1Academy } from "@/components/ZeroToB1Academy";
import { CommuteSprintDrill } from "@/components/CommuteSprintDrill";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { LoginModal } from "@/components/LoginModal";
import { B1ConjunctionsLab } from "@/components/B1ConjunctionsLab";
import { ArticlesAndCasesLab } from "@/components/ArticlesAndCasesLab";
import { AiExamCoachModal } from "@/components/AiExamCoachModal";
import { SelectionAiExplainer } from "@/components/SelectionAiExplainer";
import { useUser } from "@/context/UserContext";
import { 
  ArrowLeft,
  Calendar,
  Eye,
  Target
} from "lucide-react";

export default function Home() {
  const { profile, toggleAdhdFocusMode, updateProfile, theme } = useUser();
  const [activeSection, setActiveSection] = useState<NavSectionType>("DASHBOARD");

  const [showSprintModal, setShowSprintModal] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isAiCoachOpen, setIsAiCoachOpen] = useState<boolean>(false);
  const [showExamDateModal, setShowExamDateModal] = useState<boolean>(false);
  const [tempExamDate, setTempExamDate] = useState<string>(profile.targetDate || "");

  const isDark = theme === "dark";

  // Helper to determine parent hub for dedicated sub-labs
  const getParentHub = (section: NavSectionType): NavSectionType => {
    if (["READING", "LISTENING", "WRITING", "GRAMMAR"].includes(section)) {
      return "PRACTICE";
    }
    if (["STRATEGY"].includes(section)) {
      return "EXAM";
    }
    if (["ACADEMY", "CASES", "CONJUNCTIONS", "KEYWORDS"].includes(section)) {
      return "LEARN";
    }
    return "DASHBOARD";
  };

  const isSubLab = ![
    "DASHBOARD", 
    "ZERO_TO_B1",
    "FAST_TRACK",
    "EXAM", 
    "PRACTICE",
    "LEARN", 
    "SPEAKING", 
    "CITIZENSHIP"
  ].includes(activeSection);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 pb-20 lg:pb-0 ${
      isDark 
        ? "bg-[#090d16] text-slate-100 selection:bg-purple-500/30 selection:text-purple-200" 
        : "bg-[#faf9f6] text-slate-900 selection:bg-purple-100 selection:text-purple-900"
    }`}>
      {/* Sticky Global Navigation */}
      <Navbar
        activeSection={activeSection}
        onSelectSection={(sec) => setActiveSection(sec)}
        onOpenSprint={() => setShowSprintModal(true)}
        onOpenAiCoach={() => setIsAiCoachOpen(true)}
        isProfileModalOpen={isProfileModalOpen}
        setIsProfileModalOpen={setIsProfileModalOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* ADHD FOCUS ZEN MODE VIEW */}
        {profile.adhdFocusMode ? (
          <div className="space-y-6 max-w-3xl mx-auto animate-fadeIn">
            <div className={`flex items-center justify-between p-4 border rounded-2xl text-xs shadow-xs ${
              isDark ? "bg-purple-950/40 border-purple-500/30 text-purple-200" : "bg-purple-50 border-purple-200 text-purple-900"
            }`}>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-purple-400" />
                <span className="font-bold">ADHD Focus Mode Active:</span>
                <span className="hidden sm:inline">All distractions removed. Focus on one drill at a time.</span>
              </div>
              <button
                onClick={toggleAdhdFocusMode}
                className={`px-3 py-1.5 rounded-xl border font-bold transition shadow-xs ${
                  isDark ? "bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700" : "bg-white hover:bg-slate-50 text-slate-800 border-slate-200"
                }`}
              >
                Exit Focus Mode
              </button>
            </div>

            <CommuteSprintDrill />
          </div>
        ) : (
          /* STANDARD VIOBEAN 5-HUB INTERFACE */
          <>
            {/* If user navigated into a dedicated sub-lab, show clean breadcrumb banner */}
            {isSubLab && (
              <div className={`flex items-center justify-between p-4 border rounded-2xl text-xs backdrop-blur-md sticky top-18 z-30 shadow-sm animate-fadeIn ${
                isDark ? "bg-slate-900/95 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
              }`}>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    isDark ? "bg-purple-950/60 text-purple-300 border border-purple-500/30" : "bg-purple-100 text-purple-700"
                  }`}>
                    {profile.targetExam}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className={`font-semibold ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                    Current Lab: <strong className={isDark ? "text-white" : "text-slate-900"}>{activeSection}</strong>
                  </span>
                </div>

                <button
                  onClick={() => setActiveSection(getParentHub(activeSection))}
                  className={`px-4 py-2 font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs active:scale-95 ${
                    isDark
                      ? "bg-purple-950/60 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30"
                      : "bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white"
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Return to {getParentHub(activeSection)}</span>
                </button>
              </div>
            )}

            {/* 1. DASHBOARD HUB */}
            {activeSection === "DASHBOARD" && (
              <div className="space-y-6 animate-fadeIn">
                <ViobeanDashboard
                  onNavigateTo={(sec) => setActiveSection(sec as NavSectionType)}
                  onOpenExamDateModal={() => setShowExamDateModal(true)}
                />
              </div>
            )}

            {/* ZERO TO B1 PASS GUARANTEE FLIGHT COCKPIT */}
            {(activeSection === "ZERO_TO_B1" || activeSection === "PATHWAY") && (
              <div className="space-y-6 animate-fadeIn">
                <ZeroToB1MasterFlight
                  onNavigateToSection={(sec) => setActiveSection(sec as NavSectionType)}
                  onOpenAiCoach={() => setIsAiCoachOpen(true)}
                />
              </div>
            )}

            {/* FAST-TRACK 30-DAY MASTER PLAN & DIAGNOSTIC HUB */}
            {activeSection === "FAST_TRACK" && (
              <div className="space-y-6 animate-fadeIn">
                <FastTrack30DayHub
                  onNavigateToSection={(sec) => setActiveSection(sec as NavSectionType)}
                  onOpenAiCoach={() => setIsAiCoachOpen(true)}
                />
              </div>
            )}

            {/* 2. EXAM HUB */}
            {activeSection === "EXAM" && (
              <div className="space-y-6 animate-fadeIn">
                <ViobeanExamHub
                  onLaunchLab={(sec) => setActiveSection(sec as NavSectionType)}
                  onOpenAiCoach={() => setIsAiCoachOpen(true)}
                />
              </div>
            )}

            {/* PRACTICE WORKBENCH HUB */}
            {activeSection === "PRACTICE" && (
              <div className="space-y-6 animate-fadeIn">
                <PracticeWorkbench />
              </div>
            )}

            {/* 3. LEARN ACADEMY HUB */}
            {activeSection === "LEARN" && (
              <div className="space-y-6 animate-fadeIn">
                <ViobeanLearnAcademy
                  onNavigateToSection={(sec) => setActiveSection(sec as NavSectionType)}
                  onOpenAiCoach={() => setIsAiCoachOpen(true)}
                />
              </div>
            )}

            {/* 4. SPEAKING PARTNER HUB */}
            {activeSection === "SPEAKING" && (
              <div className="space-y-6 animate-fadeIn">
                <ViobeanSpeakingPartner
                  onOpenAiCoach={() => setIsAiCoachOpen(true)}
                />
              </div>
            )}

            {/* 5. CITIZENSHIP HUB */}
            {activeSection === "CITIZENSHIP" && (
              <div className="space-y-6 animate-fadeIn">
                <CitizenshipSection />
              </div>
            )}

            {/* DEDICATED SUB-LAB RENDERING */}
            {isSubLab && (
              <section className="space-y-6 animate-fadeIn">
                {activeSection === "READING" && <B1ReadingLab />}
                {activeSection === "WRITING" && <B1WritingLab />}
                {activeSection === "LISTENING" && <B1ListeningLab />}
                {activeSection === "GRAMMAR" && <B1GrammarPassLab />}
                {activeSection === "ACADEMY" && <ZeroToB1Academy onNavigateToSection={(sec) => setActiveSection(sec as NavSectionType)} />}
                {activeSection === "CASES" && <ArticlesAndCasesLab onNavigateToSection={(sec) => setActiveSection(sec as NavSectionType)} />}
                {activeSection === "CONJUNCTIONS" && <B1ConjunctionsLab />}
                {activeSection === "KEYWORDS" && <B1ReadingKeywordDrills />}
                {activeSection === "STRATEGY" && <B1PassingStrategy />}
              </section>
            )}
          </>
        )}
      </main>

      {/* Global AI Text Selection Explainer */}
      <SelectionAiExplainer onOpenAiCoach={() => setIsAiCoachOpen(true)} />

      {/* AI Exam Coach Modal (Ollama Powered) */}
      <AiExamCoachModal
        isOpen={isAiCoachOpen}
        onClose={() => setIsAiCoachOpen(false)}
      />

      {/* Commute Sprint Modal */}
      {showSprintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-2xl rounded-3xl p-6 shadow-2xl border ${
            isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            <CommuteSprintDrill onClose={() => setShowSprintModal(false)} />
          </div>
        </div>
      )}

      {/* Set Exam Date Modal */}
      {showExamDateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-md rounded-3xl p-6 shadow-2xl border space-y-4 ${
            isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            <div className="flex items-center gap-2.5">
              <span className={`p-2 rounded-xl ${isDark ? "bg-purple-950/60 text-purple-300" : "bg-purple-50 text-purple-700"}`}>
                <Calendar className="w-5 h-5" />
              </span>
              <div>
                <h3 className={`text-base font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Set Your German Exam Date</h3>
                <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>Your daily plan and countdown will adjust automatically.</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={`text-xs font-bold ${isDark ? "text-slate-300" : "text-slate-700"}`}>Target Exam Date</label>
              <input
                type="date"
                value={tempExamDate}
                onChange={(e) => setTempExamDate(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold focus:outline-none focus:border-purple-600 transition ${
                  isDark ? "bg-slate-950 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-900"
                }`}
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowExamDateModal(false)}
                className={`px-4 py-2 rounded-xl border text-xs font-bold transition ${
                  isDark ? "border-slate-800 text-slate-400 hover:bg-slate-800" : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  updateProfile({ targetDate: tempExamDate });
                  setShowExamDateModal(false);
                }}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Save Date
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile & Account Modal */}
      <LoginModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* Mobile Bottom Navigation Dock */}
      <MobileBottomNav
        activeSection={activeSection}
        onSelectSection={(sec) => setActiveSection(sec)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Footer */}
      <footer className={`mt-16 border-t py-8 text-center text-xs transition-colors duration-200 space-y-2 ${
        isDark ? "border-slate-900 bg-slate-950 text-slate-500" : "border-slate-200 bg-white text-slate-500"
      }`}>
        <div className={`flex items-center justify-center gap-2 font-semibold ${
          isDark ? "text-slate-300" : "text-slate-700"
        }`}>
          <span>GermanPrep Platform</span>
          <span>•</span>
          <span className="text-purple-500 font-bold">Viobean Architecture & Dual-Theme Engine</span>
        </div>
        <p className={`max-w-xl mx-auto px-4 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
          Covering Lesen (Reading), Hören (Listening), Schreiben (Writing), Sprechen (Speaking), and the official 310-question citizenship test catalog (300 general + 10 state questions).
        </p>
      </footer>
    </div>
  );
}
