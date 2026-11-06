"use client";

import React, { useState } from "react";
import { EXAM_CRITERIA_DATA } from "@/data/b1_exam_info";
import { useUser } from "@/context/UserContext";
import { 
  Calculator, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Target, 
  Compass, 
  Sparkles,
  ChevronRight
} from "lucide-react";

export const B1PassingStrategy: React.FC = () => {
  const { profile, updateProfile, overallReadiness } = useUser();
  const [selectedExamKey, setSelectedExamKey] = useState<"DTZ" | "TELC_B1" | "GOETHE_B1">("DTZ");

  // Interactive Simulator Sliders (0 - 100%)
  const [speakingScore, setSpeakingScore] = useState<number>(75);
  const [writingScore, setWritingScore] = useState<number>(70);
  const [readingScore, setReadingScore] = useState<number>(55);
  const [listeningScore, setListeningScore] = useState<number>(50);

  const curExam = EXAM_CRITERIA_DATA[selectedExamKey];

  // Pass evaluation logic
  let isPass = false;
  let passDetails = "";

  if (selectedExamKey === "DTZ") {
    // DTZ rule: Sprechen B1 (>= 60) AND either (Schreiben >= 60 OR Hören/Lesen >= 60)
    const speakingPass = speakingScore >= 60;
    const writingPass = writingScore >= 60;
    const combinedReceptive = (readingScore + listeningScore) / 2 >= 60;

    isPass = speakingPass && (writingPass || combinedReceptive);
    if (isPass) {
      passDetails = "BESTANDEN (B1): You meet the DTZ criteria for German Citizenship and Settlement Permit (Niederlassungserlaubnis)!";
    } else {
      if (!speakingPass) {
        passDetails = "NICHT BESTANDEN (B1): Speaking is below 60%. In DTZ, B1 in Speaking is mandatory for the overall B1 certificate.";
      } else {
        passDetails = "NICHT BESTANDEN (B1): Speaking is passed, but neither Writing nor Reading/Listening reached 60%. Focus on Writing to pass easily.";
      }
    }
  } else if (selectedExamKey === "TELC_B1") {
    // TELC: Written >= 60% (135/225) AND Oral >= 60% (45/75)
    // Approximate written as weighted average of writing (45pts) + reading (75pts) + listening (75pts) + language elements (30pts)
    const writtenPercent = Math.round((writingScore * 45 + readingScore * 75 + listeningScore * 75 + 60 * 30) / 225);
    const oralPercent = speakingScore;

    isPass = writtenPercent >= 60 && oralPercent >= 60;
    if (isPass) {
      passDetails = `BESTANDEN: Written score ~${writtenPercent}% (min 60%), Oral score ${oralPercent}% (min 60%). You receive the TELC B1 certificate!`;
    } else {
      passDetails = `NICHT BESTANDEN: Written score ~${writtenPercent}% (need 60%), Oral score ${oralPercent}% (need 60%). Both must be at least 60%.`;
    }
  } else if (selectedExamKey === "GOETHE_B1") {
    // Goethe: each module >= 60 points
    const passedModules = [
      speakingScore >= 60,
      writingScore >= 60,
      readingScore >= 60,
      listeningScore >= 60
    ].filter(Boolean).length;

    isPass = passedModules === 4;
    passDetails = `Goethe B1 Modules Passed: ${passedModules} of 4. (Lesen: ${readingScore >= 60 ? "Pass" : "Fail"}, Hören: ${listeningScore >= 60 ? "Pass" : "Fail"}, Schreiben: ${writingScore >= 60 ? "Pass" : "Fail"}, Sprechen: ${speakingScore >= 60 ? "Pass" : "Fail"}). Passed modules are permanently valid!`;
  }

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-300 mb-2">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Exam Passing Thresholds & Minimum Strategy</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              B1 Exam <span className="text-amber-400">Passing Criteria & Simulator</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Understand exactly how points are calculated across DTZ, TELC B1, and Goethe B1, and where to invest minimal effort for maximum passing probability.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Your Target Exam:</span>
            <select
              value={profile.targetExam}
              onChange={(e) => updateProfile({ targetExam: e.target.value as any })}
              className="bg-slate-950 border border-amber-500/40 text-amber-300 font-bold text-xs rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
            >
              <option value="DTZ">DTZ (Deutsch-Test für Zuwanderer)</option>
              <option value="TELC_B1">TELC Deutsch B1</option>
              <option value="GOETHE_B1">Goethe-Zertifikat B1</option>
            </select>
          </div>
        </div>

        {/* Exam Type Selector Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-slate-800">
          {(["DTZ", "TELC_B1", "GOETHE_B1"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedExamKey(key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                selectedExamKey === key
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
              }`}
            >
              <Target className="w-4 h-4" />
              <span>{EXAM_CRITERIA_DATA[key].examName}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Exam Structure & Passing Hacks */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div>
              <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-md border border-amber-500/20">
                Official Passing Standard
              </span>
              <h3 className="text-lg font-bold text-white mt-1.5">{curExam.examName}</h3>
              <p className="text-xs text-slate-400 mt-1">
                Pass Threshold: <strong>{curExam.passPercentage}%</strong> of total marks.
              </p>
            </div>

            {/* Sections Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Section Scoring & Minimum Pass Hacks:
              </h4>
              <div className="space-y-2.5">
                {curExam.sections.map((sec, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{sec.name}</span>
                      <span className="text-amber-400 font-semibold">{sec.passRequirement}</span>
                    </div>
                    <p className="text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 text-[11px] leading-relaxed">
                      💡 <strong className="text-amber-300">Pass Hack: </strong>{sec.passHack}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Master Pass Strategy List */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Master Strategy for A1 Learners:
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {curExam.masterPassStrategy.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Score Simulator */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Calculator className="w-4 h-4" />
                <span>Passing Probability Simulator</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">Simulate Your Expected Scores</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Adjust sliders to see if your combination of skills satisfies the pass criteria.
              </p>
            </div>

            {/* Sliders */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">1. Sprechen (Speaking):</span>
                  <span className={`font-mono font-bold ${speakingScore >= 60 ? "text-emerald-400" : "text-rose-400"}`}>
                    {speakingScore}% {speakingScore >= 60 ? "(B1 Pass)" : "(Below B1)"}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={speakingScore}
                  onChange={(e) => setSpeakingScore(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">2. Schreiben (Writing):</span>
                  <span className={`font-mono font-bold ${writingScore >= 60 ? "text-emerald-400" : "text-rose-400"}`}>
                    {writingScore}% {writingScore >= 60 ? "(B1 Pass)" : "(Below B1)"}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={writingScore}
                  onChange={(e) => setWritingScore(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">3. Lesen (Reading):</span>
                  <span className={`font-mono font-bold ${readingScore >= 60 ? "text-emerald-400" : "text-rose-400"}`}>
                    {readingScore}% {readingScore >= 60 ? "(B1 Pass)" : "(Below B1)"}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={readingScore}
                  onChange={(e) => setReadingScore(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">4. Hören (Listening):</span>
                  <span className={`font-mono font-bold ${listeningScore >= 60 ? "text-emerald-400" : "text-rose-400"}`}>
                    {listeningScore}% {listeningScore >= 60 ? "(B1 Pass)" : "(Below B1)"}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={listeningScore}
                  onChange={(e) => setListeningScore(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Simulation Result Box */}
            <div className={`p-5 rounded-2xl border ${
              isPass
                ? "bg-emerald-950/40 border-emerald-500/50 shadow-md shadow-emerald-500/10"
                : "bg-rose-950/40 border-rose-500/50 shadow-md shadow-rose-500/10"
            }`}>
              <div className="flex items-start gap-3">
                {isPass ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <h4 className="text-base font-extrabold text-white">
                    {isPass ? "Result: BESTANDEN (PASS)" : "Result: NICHT BESTANDEN (FAIL)"}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {passDetails}
                  </p>
                </div>
              </div>
            </div>

            {/* Golden Rule Callout */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
              <strong className="text-amber-400 block font-semibold">
                ⭐ The Golden A1-to-B1 Rule:
              </strong>
              <p>
                Notice how even if Listening or Reading is only 50-55%, mastering Sprechen (Speaking) and Schreiben (Writing) pushes you over the passing line in DTZ! This is why 70% of your practice should be on Writing templates and Speaking scripts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
