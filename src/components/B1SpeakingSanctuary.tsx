"use client";

import React, { useState } from "react";
import { B1_SPEAKING_PARTS } from "@/data/b1_speaking_data";
import { SpeakingPart } from "@/types";
import { useUser } from "@/context/UserContext";
import { AudioVoiceButton } from "./AudioVoiceButton";
import { 
  Mic, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Volume2, 
  Image as ImageIcon, 
  Users, 
  User, 
  Award,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Eye,
  EyeOff
} from "lucide-react";
import confetti from "canvas-confetti";

export const B1SpeakingSanctuary: React.FC = () => {
  const { profile, markSpeakingMastered, toggleSpeakingMastered, showEnglish, toggleShowEnglish } = useUser();
  const [selectedPart, setSelectedPart] = useState<SpeakingPart>(B1_SPEAKING_PARTS[0]);
  const [revealedEnglish, setRevealedEnglish] = useState<Record<string, boolean>>({});

  const currentIndex = B1_SPEAKING_PARTS.findIndex(p => p.id === selectedPart.id);
  const prevPart = currentIndex > 0 ? B1_SPEAKING_PARTS[currentIndex - 1] : null;
  const nextPart = currentIndex < B1_SPEAKING_PARTS.length - 1 ? B1_SPEAKING_PARTS[currentIndex + 1] : null;
  const isCurrentPartMastered = profile.masteredSpeakingIds.includes(selectedPart.id);

  // Personalized Script Generator for Teil 1
  const [customName, setCustomName] = useState<string>("Alex");
  const [customCountry, setCustomCountry] = useState<string>("Indien");
  const [customCity, setCustomCity] = useState<string>("Frankfurt am Main");
  const [customJob, setCustomJob] = useState<string>("Software-Entwickler");
  const [customLanguage, setCustomLanguage] = useState<string>("Tamil");
  const [customYears, setCustomYears] = useState<string>("zwei");
  const [customHobby, setCustomHobby] = useState<string>("Sport treiben und kochen");

  const generatedTeil1Script = `Guten Tag! Mein Name ist ${customName} und ich komme ursprünglich aus ${customCountry}. Seit ${customYears} Jahren lebe ich hier in ${customCity}, weil ich als ${customJob} arbeite und neue berufliche Perspektiven suche. Meine Muttersprache ist ${customLanguage}, außerdem spreche ich fließend Englisch und lerne intensiv Deutsch auf B1-Niveau. Obwohl die deutsche Grammatik anspruchsvoll ist, lerne ich sehr gerne, um mich problemlos mit Nachbarn und Kollegen zu verständigen. In meiner Freizeit mag ich besonders gerne ${customHobby}.`;

  const generatedTeil1ScriptEn = `Good day! My name is ${customName} and I originally come from ${customCountry}. For ${customYears} years I have lived here in ${customCity} because I work as a ${customJob} and seek new career prospects. My native language is ${customLanguage}, I also speak fluent English and am intensively learning German at B1 level. Although German grammar is demanding, I enjoy learning in order to communicate effortlessly with neighbors and colleagues. In my free time, I particularly like ${customHobby}.`;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-300 mb-2">
              <Mic className="w-3.5 h-3.5 text-amber-400" />
              <span>B1 Sprechen Oral Exam Passing Sanctum</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              B1 Speaking <span className="text-amber-400">Cheat Scripts & Formulas</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Speaking is the single most important part in DTZ and TELC. Using formulaic chunks guarantees a passing score even with basic vocabulary.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={toggleShowEnglish}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                showEnglish
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/10"
                  : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
              }`}
              title="Toggle English Translations & Hints (Default: OFF for German immersion)"
            >
              {showEnglish ? (
                <>
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>English: ON</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                  <span>English: OFF</span>
                </>
              )}
            </button>
            <span className="text-xs text-slate-400">Mastered Parts:</span>
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-bold rounded-lg border border-amber-500/40 text-sm">
              {profile.masteredSpeakingIds.length} / 3 Parts
            </span>
          </div>
        </div>

        {/* Part Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-slate-800">
          {B1_SPEAKING_PARTS.map((part) => {
            const isMastered = profile.masteredSpeakingIds.includes(part.id);
            const isCurrent = selectedPart.id === part.id;

            return (
              <button
                key={part.id}
                onClick={() => setSelectedPart(part)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                  isCurrent
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
                }`}
              >
                {part.partNumber === 1 && <User className="w-4 h-4" />}
                {part.partNumber === 2 && <ImageIcon className="w-4 h-4" />}
                {part.partNumber === 3 && <Users className="w-4 h-4" />}
                <span>Teil {part.partNumber}</span>
                {isMastered && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-1" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── PERSISTENT STICKY SPEAKING PART SWITCHER ─── */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3 sticky top-16 sm:top-20 z-20 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="px-3 py-1 bg-amber-500/10 text-amber-400 font-mono font-black text-xs rounded-xl border border-amber-500/30 shrink-0">
              Part {currentIndex + 1} of {B1_SPEAKING_PARTS.length}
            </div>

            <div className="flex items-center gap-1.5 flex-1 min-w-0 overflow-x-auto">
              {B1_SPEAKING_PARTS.map((part) => {
                const isMastered = profile.masteredSpeakingIds.includes(part.id);
                const isCurrent = selectedPart.id === part.id;
                return (
                  <button
                    key={part.id}
                    onClick={() => setSelectedPart(part)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                      isCurrent
                        ? "bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20"
                        : isMastered
                        ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40"
                        : "bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800"
                    }`}
                  >
                    <span>Teil {part.partNumber}: {part.title.split("(")[0].trim()}</span>
                    {isMastered && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <button
              type="button"
              disabled={!prevPart}
              onClick={() => prevPart && setSelectedPart(prevPart)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-950 text-slate-300 text-xs font-bold transition flex items-center gap-1 border border-slate-800"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev Part</span>
            </button>

            <button
              type="button"
              disabled={!nextPart}
              onClick={() => nextPart && setSelectedPart(nextPart)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:hover:bg-slate-950 disabled:bg-slate-950 disabled:text-slate-500 text-slate-950 font-black text-xs transition flex items-center gap-1 shadow-md shadow-amber-500/20"
            >
              <span>Next Part</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Part Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Minimum Criteria Formula */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
            <div>
              <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-md border border-amber-500/20">
                Teil {selectedPart.partNumber} Formula
              </span>
              <h3 className="text-lg font-bold text-white mt-1">{selectedPart.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{selectedPart.description}</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Minimum Passing Criteria (Memorize This Formula):
              </h4>
              <div className="space-y-2">
                {selectedPart.minPassFormula.map((step, idx) => (
                  <div key={idx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs space-y-1">
                    <div className="font-semibold text-amber-300">{step}</div>
                    {showEnglish || revealedEnglish[`formula-${selectedPart.id}-${idx}`] ? (
                      <div className="text-[11px] text-slate-400 animate-fadeIn">{selectedPart.minPassFormula_en[idx]}</div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setRevealedEnglish(prev => ({ ...prev, [`formula-${selectedPart.id}-${idx}`]: true }))}
                        className="text-[10px] text-slate-500 hover:text-amber-400 flex items-center gap-1 transition"
                      >
                        <Eye className="w-2.5 h-2.5" />
                        <span>English hint</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                markSpeakingMastered(selectedPart.id);
                confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
              }}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded-xl text-xs border border-amber-500/30 transition flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Mark Teil {selectedPart.partNumber} as Mastered ✦</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Practice & Generator */}
        <div className="lg:col-span-7 space-y-6">
          {/* TEIL 1: PERSONAL SCRIPT GENERATOR */}
          {selectedPart.partNumber === 1 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Personalized B1 Cheat Script Generator</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Customize with your details to produce a ready-to-memorize introduction meeting all B1 criteria.
                  </p>
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Ihr Name (Your Name):</label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Herkunftsland (Country of Origin):</label>
                  <input
                    type="text"
                    value={customCountry}
                    onChange={(e) => setCustomCountry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Wohnort (City in Germany):</label>
                  <input
                    type="text"
                    value={customCity}
                    onChange={(e) => setCustomCity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Beruf (Profession / Job):</label>
                  <input
                    type="text"
                    value={customJob}
                    onChange={(e) => setCustomJob(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Muttersprache (Native Language):</label>
                  <input
                    type="text"
                    value={customLanguage}
                    onChange={(e) => setCustomLanguage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Dauer in Deutschland (Years in DE):</label>
                  <input
                    type="text"
                    value={customYears}
                    onChange={(e) => setCustomYears(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-slate-400 font-medium block mb-1">Hobbys (Hobbies in German):</label>
                  <input
                    type="text"
                    value={customHobby}
                    onChange={(e) => setCustomHobby(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Generated Script Display */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Your Personalized B1 Script:
                  </span>
                  <AudioVoiceButton text={generatedTeil1Script} label="Listen to German Audio" />
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {generatedTeil1Script}
                </p>
                {showEnglish || revealedEnglish["t1-script"] ? (
                  <p className="text-xs text-slate-400 pt-2 border-t border-slate-800 animate-fadeIn">
                    {generatedTeil1ScriptEn}
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={() => setRevealedEnglish(prev => ({ ...prev, "t1-script": true }))}
                    className="text-[11px] text-slate-500 hover:text-amber-400 flex items-center gap-1 pt-2 border-t border-slate-800 w-full transition"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Show English translation</span>
                  </button>
                )}
              </div>

              {/* Follow-up Questions Drill */}
              {selectedPart.samplePrompts[0]?.followUpQuestions && (
                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Guaranteed Examiner Follow-Up Questions:
                  </h5>
                  <div className="space-y-2">
                    {selectedPart.samplePrompts[0].followUpQuestions.map((item, idx) => (
                      <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5">
                        <div className="font-semibold text-rose-300 flex items-center justify-between">
                          <span>{item.q}</span>
                          <AudioVoiceButton text={item.a} label="Hören" />
                        </div>
                        {(showEnglish || revealedEnglish[`fu-${idx}`]) ? (
                          <div className="text-[11px] text-slate-400 animate-fadeIn">{item.q_en}</div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setRevealedEnglish(prev => ({ ...prev, [`fu-${idx}`]: true }))}
                            className="text-[10px] text-slate-500 hover:text-amber-400 flex items-center gap-1 transition"
                          >
                            <Eye className="w-2.5 h-2.5" />
                            <span>English hint</span>
                          </button>
                        )}
                        <div className="p-2 bg-slate-900 rounded-lg text-emerald-300 font-medium">
                          <strong>Empfohlene Antwort: </strong>{item.a}
                        </div>
                        {(showEnglish || revealedEnglish[`fu-${idx}`]) ? (
                          <div className="text-[11px] text-slate-400 pl-2 animate-fadeIn">{item.a_en}</div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TEIL 2: PICTURE DESCRIPTION SAMPLES */}
          {selectedPart.partNumber === 2 && (
            <div className="space-y-4">
              {selectedPart.samplePrompts.map((sample, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{sample.prompt}</h4>
                      {(showEnglish || revealedEnglish[`t2-ans-${idx}`]) && (
                        <span className="text-xs text-slate-400 animate-fadeIn">{sample.prompt_en}</span>
                      )}
                    </div>
                    <AudioVoiceButton text={sample.modelAnswer} label="Audio hören" />
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                      {sample.modelAnswer}
                    </p>
                    {showEnglish || revealedEnglish[`t2-ans-${idx}`] ? (
                      <p className="text-xs text-slate-400 pt-2 border-t border-slate-800 animate-fadeIn">
                        {sample.modelAnswer_en}
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setRevealedEnglish(prev => ({ ...prev, [`t2-ans-${idx}`]: true }))}
                        className="text-[11px] text-slate-500 hover:text-amber-400 flex items-center gap-1 pt-2 border-t border-slate-800 w-full transition"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Show English translation</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TEIL 3: PLANNING TOGETHER DIALOGUE */}
          {selectedPart.partNumber === 3 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-base font-bold text-white">Partner Dialogue: Complete Roleplay</h4>
                  <p className="text-xs text-slate-400">
                    {selectedPart.samplePrompts[0]?.prompt}
                  </p>
                </div>
                {selectedPart.samplePrompts[0] && (
                  <AudioVoiceButton text={selectedPart.samplePrompts[0].modelAnswer} label="Play Dialogue" />
                )}
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-sans text-xs sm:text-sm">
                {selectedPart.samplePrompts[0]?.modelAnswer.split("\n\n").map((turn, tIdx) => {
                  const isA = turn.startsWith("Kandidat A");
                  return (
                    <div
                      key={tIdx}
                      className={`p-3 rounded-xl border ${
                        isA
                          ? "bg-slate-900/90 border-amber-500/30 text-amber-100"
                          : "bg-slate-900/50 border-slate-800 text-slate-200"
                      }`}
                    >
                      <span className={`text-xs font-bold block mb-1 ${isA ? "text-amber-400" : "text-emerald-400"}`}>
                        {isA ? "Kandidat A (You / Vorschlag & Organisation):" : "Kandidat B (Partner / Zustimmung & Details):"}
                      </span>
                      <p className="leading-relaxed whitespace-pre-wrap">{turn.replace(/^Kandidat [AB]: /, "")}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── MASTERED BLUEPRINT TOGGLE CARD ─── */}
          <div className="pt-2">
            {isCurrentPartMastered ? (
              <div className="p-4 bg-emerald-950/70 border border-emerald-500/60 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>Teil {selectedPart.partNumber} Blueprint Mastered!</span>
                    </div>
                    <div className="text-xs text-emerald-300/80">
                      Saved to your profile and added to your B1 readiness score (20% weight).
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => toggleSpeakingMastered(selectedPart.id)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-950/60 hover:border-rose-500 text-slate-300 hover:text-rose-300 border border-slate-700 text-xs font-bold transition flex items-center gap-1.5"
                    title="Click to undo if marked accidentally"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Undo / Mark Incomplete</span>
                  </button>

                  {nextPart && (
                    <button
                      type="button"
                      onClick={() => setSelectedPart(nextPart)}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-1 shadow-md shadow-amber-500/20"
                    >
                      <span>Next Part</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  toggleSpeakingMastered(selectedPart.id);
                  confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
                }}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm transition shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>I Have Memorized This Speaking Blueprint ✦ Mark as Mastered</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ─── BOTTOM SPEAKING PART NAVIGATION FOOTER ─── */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {prevPart ? (
            <button
              type="button"
              onClick={() => setSelectedPart(prevPart)}
              className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 text-xs font-bold transition flex items-center gap-2 border border-slate-800"
            >
              <ChevronLeft className="w-4 h-4 text-amber-400" />
              <span>← Teil {prevPart.partNumber}: {prevPart.title.split("(")[0].trim()}</span>
            </button>
          ) : (
            <span className="text-xs text-slate-500 font-medium">First Speaking Part</span>
          )}
        </div>

        <div className="text-xs text-slate-400 font-mono text-center">
          Speaking Part {currentIndex + 1} of {B1_SPEAKING_PARTS.length}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {nextPart ? (
            <button
              type="button"
              onClick={() => setSelectedPart(nextPart)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-2 shadow-md shadow-amber-500/20"
            >
              <span>Teil {nextPart.partNumber}: {nextPart.title.split("(")[0].trim()} →</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-xs text-emerald-400 font-bold">All 3 Parts Mastered!</span>
          )}
        </div>
      </div>
    </div>
  );
};
