"use client";

import React from "react";
import { useUser } from "@/context/UserContext";
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Trophy, 
  Sparkles, 
  Zap, 
  ArrowRight,
  Flame,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Building2
} from "lucide-react";

interface MasteryCertificateBannerProps {
  onStartSprint: () => void;
}

export const MasteryCertificateBanner: React.FC<MasteryCertificateBannerProps> = ({ onStartSprint }) => {
  const { 
    account, 
    profile, 
    overallReadiness, 
    masteredQuestionsCount 
  } = useUser();

  const targetQuestions = 310;
  const is100Percent = overallReadiness >= 100;
  const completedReadingCount = (profile.completedReadingIds || []).length;
  const completedListeningCount = (profile.completedListeningIds || []).length;

  return (
    <div className={`rounded-3xl border p-5 sm:p-7 relative overflow-hidden transition-all duration-300 ${
      is100Percent
        ? "bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950/40 border-emerald-500/60 shadow-2xl shadow-emerald-500/10"
        : "bg-slate-900/90 border-slate-800 shadow-xl"
    }`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-black tracking-wide border flex items-center gap-1.5 ${
              is100Percent
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "bg-amber-500/10 text-amber-300 border-amber-500/30"
            }`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{is100Percent ? "100% EXAM-READY CERTIFIED" : "PRACTICE-UNTIL-YOU-PASS SYSTEM"}</span>
            </span>

            {profile.currentStreak > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30 flex items-center gap-1">
                <Flame className="w-3 h-3 fill-orange-400" />
                <span>{profile.currentStreak} Answer Streak</span>
              </span>
            )}
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {is100Percent ? (
                <span>You Have Reached 100% Practice Mastery! 🏆</span>
              ) : (
                <span>Practice Until You <span className="text-amber-400">Pass</span> (No Fake Faith)</span>
              )}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              {is100Percent ? (
                "You have drilled all 310 required questions twice, completed the writing templates, speaking cheat scripts, and all reading & listening exam parts. You are guaranteed to pass."
              ) : (
                "You do not need native German grammar to pass. Complete 100% of these practice drills across all 4 exam skills and you are mathematically guaranteed to score above the passing threshold."
              )}
            </p>
          </div>

          {/* 5 Pillars Status */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1 text-xs">
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold flex items-center gap-1">
                <Building2 className="w-3 h-3 text-amber-400" />
                <span>Citizenship (2x)</span>
              </span>
              <span className={`font-mono font-bold text-sm ${masteredQuestionsCount >= targetQuestions ? "text-emerald-400" : "text-amber-400"}`}>
                {masteredQuestionsCount} / {targetQuestions}
              </span>
            </div>

            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-amber-400" />
                <span>Lesen (Reading)</span>
              </span>
              <span className={`font-mono font-bold text-sm ${completedReadingCount >= 15 ? "text-emerald-400" : "text-amber-400"}`}>
                {completedReadingCount} / 15
              </span>
            </div>

            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold flex items-center gap-1">
                <Headphones className="w-3 h-3 text-amber-400" />
                <span>Hören (Listening)</span>
              </span>
              <span className={`font-mono font-bold text-sm ${completedListeningCount >= 12 ? "text-emerald-400" : "text-amber-400"}`}>
                {completedListeningCount} / 12
              </span>
            </div>

            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold flex items-center gap-1">
                <PenTool className="w-3 h-3 text-amber-400" />
                <span>Schreiben (Write)</span>
              </span>
              <span className={`font-mono font-bold text-sm ${profile.completedWritingIds.length >= 8 ? "text-emerald-400" : "text-amber-400"}`}>
                {profile.completedWritingIds.length} / 8
              </span>
            </div>

            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 block font-semibold flex items-center gap-1">
                <Mic className="w-3 h-3 text-amber-400" />
                <span>Sprechen (Oral)</span>
              </span>
              <span className={`font-mono font-bold text-sm ${profile.masteredSpeakingIds.length >= 3 ? "text-emerald-400" : "text-amber-400"}`}>
                {profile.masteredSpeakingIds.length} / 3
              </span>
            </div>
          </div>
        </div>

        {/* Action Button & Gauge */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-3 shrink-0">
          <div className="text-center">
            <div className="text-3xl font-black font-mono text-amber-400">
              {overallReadiness}%
            </div>
            <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
              Exam Pass Readiness
            </div>
          </div>

          <button
            onClick={onStartSprint}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-2xl text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 text-slate-950" />
            <span>Drill Weakest Questions (5 Min)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
