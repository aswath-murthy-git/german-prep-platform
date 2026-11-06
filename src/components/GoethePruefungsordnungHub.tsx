"use client";

import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import { 
  GOETHE_PRUEFUNGSORDNUNG_DATA,
  GoetheRuleSection,
  GoetheVsTelcComparison
} from "@/data/goethe_pruefungsordnung_data";
import { 
  ShieldCheck, 
  Scale, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Award, 
  RotateCcw, 
  BookOpen, 
  FileText, 
  ChevronRight, 
  Laptop, 
  ExternalLink,
  HelpCircle
} from "lucide-react";

type HubSubTab = "CALCULATOR" | "RULES" | "RETAKE" | "COMPARISON";

export const GoethePruefungsordnungHub: React.FC = () => {
  const { theme } = useUser();
  const isDark = theme === "dark";

  const [activeTab, setActiveTab] = useState<HubSubTab>("CALCULATOR");

  // Modular Calculator State (Points out of 100 for each of the 4 independent modules)
  const [moduleScores, setModuleScores] = useState<{
    LESEN: number;
    HOEREN: number;
    SCHREIBEN: number;
    SPRECHEN: number;
  }>({
    LESEN: 75,
    HOEREN: 65,
    SCHREIBEN: 80,
    SPRECHEN: 70
  });

  const handleScoreChange = (mod: "LESEN" | "HOEREN" | "SCHREIBEN" | "SPRECHEN", val: number) => {
    const clamped = Math.max(0, Math.min(100, isNaN(val) ? 0 : val));
    setModuleScores((prev) => ({
      ...prev,
      [mod]: clamped
    }));
  };

  const data = GOETHE_PRUEFUNGSORDNUNG_DATA;

  // Evaluation of module scores
  const isLesenPass = moduleScores.LESEN >= 60;
  const isHoerenPass = moduleScores.HOEREN >= 60;
  const isSchreibenPass = moduleScores.SCHREIBEN >= 60;
  const isSprechenPass = moduleScores.SPRECHEN >= 60;

  const passedCount = [isLesenPass, isHoerenPass, isSchreibenPass, isSprechenPass].filter(Boolean).length;
  const hasGesamtzeugnis = passedCount === 4;

  const totalPoints = moduleScores.LESEN + moduleScores.HOEREN + moduleScores.SCHREIBEN + moduleScores.SPRECHEN;
  const averagePoints = Math.round(totalPoints / 4);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* ─── BANNER HEADER ─── */}
      <div className={`rounded-3xl border p-6 sm:p-8 shadow-xl relative overflow-hidden transition-colors duration-200 ${
        isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Official Exam Code
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                {data.meta.stand} | {data.meta.publisher}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Goethe-Institut Prüfungsordnung Compass
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {data.meta.coreTakeaway}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-xs text-slate-400 font-semibold">Bestehensgrenze</div>
              <div className="text-lg font-black text-amber-400">60% pro Modul</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-6 mt-6 border-t border-slate-800">
          {[
            { id: "CALCULATOR", label: "1. Modul-Rechner (§ 14.7)", icon: Award },
            { id: "RETAKE", label: "2. Wiederholungsregeln (§ 15)", icon: RotateCcw },
            { id: "RULES", label: "3. Disqualifikation & Regeln (§ 11)", icon: ShieldCheck },
            { id: "COMPARISON", label: "4. Goethe vs telc vs DTZ", icon: Scale }
          ].map((tab) => {
            const Icon = tab.icon;
            const isCur = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as HubSubTab)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                  isCur
                    ? "bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/30 font-black"
                    : isDark
                    ? "bg-slate-950 border-slate-800 text-slate-300 hover:text-white"
                    : "bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* ─── TAB 1: MODULAR SCORE CALCULATOR (§ 14.7) ─── */}
      {/* ────────────────────────────────────────────────────────── */}
      {activeTab === "CALCULATOR" && (
        <div className="space-y-6">
          {/* Certificate Status Box */}
          <div className={`p-6 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-6 ${
            hasGesamtzeugnis
              ? "bg-emerald-950/50 border-emerald-500/40 text-emerald-200"
              : "bg-amber-950/40 border-amber-500/30 text-amber-200"
          }`}>
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Goethe-Zertifikat B1 Zertifikatsstatus (§ 14.7 & § 18)
              </span>
              <h2 className="text-2xl font-black text-white">
                {hasGesamtzeugnis ? "Gesamtzeugnis garantiert!" : `${passedCount} von 4 Modulen bestanden`}
              </h2>
              <p className="text-xs leading-relaxed text-slate-200">
                {hasGesamtzeugnis
                  ? "Herzlichen Glückwunsch! Alle 4 Module haben die Mindestpunktzahl von 60 Punkten erreicht. Sie erhalten das einheitliche Goethe-Zertifikat B1 (Gesamtzeugnis)."
                  : `Sie haben ${passedCount} Module bestanden. Für die bestandenen Module erhalten Sie Einzelzeugnisse. Die noch fehlenden Module können Sie innerhalb von 12 Monaten nachholen.`}
              </p>
            </div>

            <div className="text-right">
              <div className="text-3xl font-black font-mono">
                {averagePoints} / 100
              </div>
              <div className="text-xs text-slate-400 font-semibold">
                Durchschnittsnote ({totalPoints} Pkt gesamt)
              </div>
            </div>
          </div>

          {/* 4 Modular Sliders & Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.modularB1System.modules.map((m) => {
              const score = moduleScores[m.id];
              const isPass = score >= 60;

              return (
                <div
                  key={m.id}
                  className={`p-5 rounded-3xl border space-y-4 transition ${
                    isDark ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-white">
                          Modul {m.name}
                        </span>
                        <span className="text-xs text-slate-400">({m.duration})</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{m.tasksSummary}</div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-xl text-xs font-black ${
                      isPass
                        ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                        : "bg-rose-950/80 text-rose-300 border border-rose-500/40"
                    }`}>
                      {isPass ? "✓ Bestanden" : "✕ Nicht bestanden"}
                    </span>
                  </div>

                  {/* Interactive Slider & Number Input */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Erreichte Punktzahl:</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={score}
                          onChange={(e) => handleScoreChange(m.id, parseInt(e.target.value))}
                          className={`w-16 px-2 py-1 rounded-xl font-mono font-bold text-center border text-sm ${
                            isDark
                              ? "bg-slate-950 border-slate-700 text-white"
                              : "bg-slate-100 border-slate-300 text-slate-900"
                          }`}
                        />
                        <span className="font-mono text-slate-400">/ 100</span>
                      </div>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={score}
                      onChange={(e) => handleScoreChange(m.id, parseInt(e.target.value))}
                      className="w-full accent-purple-600 cursor-pointer"
                    />

                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>0 Pkt</span>
                      <span className="text-amber-400 font-bold">Pass: 60 Pkt</span>
                      <span>100 Pkt</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2.5">
                    <strong>Wiederholungsregel:</strong> {m.retakeRule}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legal Notice */}
          <div className={`p-5 rounded-2xl border text-xs space-y-1.5 ${
            isDark ? "bg-slate-950/80 border-slate-800 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"
          }`}>
            <div className="font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Gesamtzeugnis-Regel (§ 14.7 & § 18 Prüfungsordnung):</span>
            </div>
            <p className="leading-relaxed">
              {data.modularB1System.gesamtzeugnisRule}
            </p>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* ─── TAB 2: RETAKE RULES & 1-YEAR TIMELINE (§ 15) ─── */}
      {/* ────────────────────────────────────────────────────────── */}
      {activeTab === "RETAKE" && (
        <div className="space-y-6">
          <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 shadow-sm ${
            isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            <div className="space-y-1">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                Wiederholung von Prüfungsteilen (§ 15 Prüfungsordnung)
              </span>
              <h2 className="text-xl sm:text-2xl font-black">
                Wie und wann darf man Module wiederholen?
              </h2>
              <p className="text-xs text-slate-400">
                Das modulare Goethe-B1-System bietet maximale Flexibilität bei Nichtbestehen einzelner Fertigkeiten.
              </p>
            </div>

            {/* 3 Step Practical Scenario Flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-5 rounded-2xl border space-y-2.5 ${
                isDark ? "bg-slate-950/70 border-slate-800" : "bg-slate-50 border-slate-200"
              }`}>
                <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center font-black text-xs">
                  1
                </div>
                <h3 className="font-bold text-sm text-white">
                  Einzele Modulwiederholung
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Haben Sie beispielsweise 3 Module bestanden und sind nur im Modul <strong>Schreiben</strong> durchgefallen, müssen Sie <strong>NUR Schreiben</strong> wiederholen. Die anderen 3 Module bleiben dauerhaft gültig!
                </p>
              </div>

              <div className={`p-5 rounded-2xl border space-y-2.5 ${
                isDark ? "bg-slate-950/70 border-slate-800" : "bg-slate-50 border-slate-200"
              }`}>
                <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center font-black text-xs">
                  2
                </div>
                <h3 className="font-bold text-sm text-white">
                  Beliebiges Prüfungszentrum
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Sie können das fehlende Modul an <strong>jedem lizenzierten Goethe-Institut oder Partnerzentrum weltweit</strong> wiederholen. Es muss nicht dasselbe Institut wie beim ersten Versuch sein.
                </p>
              </div>

              <div className={`p-5 rounded-2xl border space-y-2.5 ${
                isDark ? "bg-slate-950/70 border-slate-800" : "bg-slate-50 border-slate-200"
              }`}>
                <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center font-black text-xs">
                  3
                </div>
                <h3 className="font-bold text-sm text-white">
                  1-Jahres-Frist für Gesamtzeugnis
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Wenn alle 4 Module <strong>innerhalb von 12 Monaten (einem Kalenderjahr)</strong> bestanden werden, werden sie kostenfrei zu einem <strong>Gesamtzeugnis</strong> zusammengefasst.
                </p>
              </div>
            </div>

            {/* Fee Policy Note */}
            <div className={`p-4 rounded-2xl border space-y-1 ${
              isDark ? "bg-amber-950/30 border-amber-500/30 text-amber-200" : "bg-amber-50 border-amber-200 text-amber-950"
            }`}>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Kosten & Prüfungsgebühren bei Wiederholung:
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                Bei der Wiederholung zahlen Sie nur die anteilige Gebühr für das einzelne Modul (in Deutschland typischerweise ca. 50-70 EUR pro Einzelmodul statt der vollen Prüfungsgebühr von ca. 220-250 EUR).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* ─── TAB 3: DISQUALIFICATION & RULES (§ 11) ─── */}
      {/* ────────────────────────────────────────────────────────── */}
      {activeTab === "RULES" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.officialSections.map((rule) => (
              <div
                key={rule.sectionNumber}
                className={`p-6 rounded-3xl border space-y-3 ${
                  rule.sectionNumber === "§ 11"
                    ? "bg-rose-950/30 border-rose-500/40 text-rose-200"
                    : isDark
                    ? "bg-slate-900/90 border-slate-800 text-slate-200"
                    : "bg-white border-slate-200 text-slate-900"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-lg text-xs font-black font-mono ${
                    rule.sectionNumber === "§ 11"
                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                      : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  }`}>
                    {rule.sectionNumber}
                  </span>
                  <span className="text-xs text-slate-400">{rule.titleEn}</span>
                </div>

                <h3 className="text-base font-bold text-white">
                  {rule.titleDe}
                </h3>

                <p className="text-xs leading-relaxed text-slate-300">
                  {rule.summary}
                </p>

                <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pt-1">
                  {rule.bulletPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>

                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] text-amber-300">
                  <strong>Relevanz für Sie:</strong> {rule.examRelevance}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* ─── TAB 4: GOETHE VS TELC VS DTZ COMPARISON ─── */}
      {/* ────────────────────────────────────────────────────────── */}
      {activeTab === "COMPARISON" && (
        <div className="space-y-6">
          <div className={`rounded-3xl border p-6 shadow-sm space-y-4 ${
            isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            <div className="space-y-1">
              <h2 className="text-xl font-black">
                Prüfungsvergleich: Goethe B1 vs telc Deutsch B1 vs DTZ
              </h2>
              <p className="text-xs text-slate-400">
                Wählen Sie die Prüfungsform, die am besten zu Ihrem Lernstil, Ihrer Zeit und Ihren Stärken passt.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-xs text-left">
                <thead className={`font-bold border-b ${
                  isDark ? "bg-slate-950 text-slate-300 border-slate-800" : "bg-slate-50 text-slate-700 border-slate-200"
                }`}>
                  <tr>
                    <th className="p-3">Vergleichsmerkmal</th>
                    <th className="p-3 text-purple-400">Goethe-Zertifikat B1</th>
                    <th className="p-3 text-rose-400">telc Deutsch B1</th>
                    <th className="p-3 text-emerald-400">DTZ (Zuwanderer)</th>
                    <th className="p-3 text-amber-400">Empfehlung</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
                  {data.examComparison.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition">
                      <td className="p-3 font-bold text-white whitespace-nowrap">{row.dimension}</td>
                      <td className="p-3 text-purple-200">{row.goetheB1}</td>
                      <td className="p-3 text-rose-200">{row.telcB1}</td>
                      <td className="p-3 text-emerald-200">{row.dtz}</td>
                      <td className="p-3 text-amber-300 text-[11px]">{row.winnerRecommendation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
