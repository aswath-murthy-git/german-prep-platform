"use client";

import React, { useState, useEffect } from "react";
import { B1_LISTENING_PARTS } from "@/data/b1_listening_data";
import { ListeningExamPart } from "@/types";
import { useUser } from "@/context/UserContext";
import { 
  Headphones, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Sparkles, 
  Languages, 
  FileText, 
  Volume2, 
  VolumeX, 
  Gauge, 
  HelpCircle,
  Eye,
  EyeOff
} from "lucide-react";
import confetti from "canvas-confetti";

export const B1ListeningLab: React.FC = () => {
  const { profile, updateProfile, showEnglish: globalShowEnglish } = useUser();
  const [activeSet, setActiveSet] = useState<number>(1);
  const [selectedPart, setSelectedPart] = useState<ListeningExamPart>(B1_LISTENING_PARTS[0]);

  // Audio Player State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(0.85); // 0.85 for clear learner comprehension
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const [localShowEnglishTranscript, setShowEnglishTranscript] = useState<boolean>(false);
  const showEnglishTranscript = localShowEnglishTranscript || globalShowEnglish;

  // Question Answer State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  const isPartCompleted = profile.completedListeningIds?.includes(selectedPart.id);

  const sets = [
    { num: 1, title: "Exam Set 1: Goethe / TELC Standard", count: 4 },
    { num: 2, title: "Exam Set 2: Housing, Shopping & City", count: 4 },
    { num: 3, title: "Exam Set 3: Work, Health & DTZ", count: 4 },
    { num: 4, title: "Exam Set 4: Transit, Doctor & Energy", count: 4 },
    { num: 5, title: "Exam Set 5: Travel, Real Estate & Contracts", count: 4 }
  ];

  const currentSetParts = B1_LISTENING_PARTS.filter(p => (p.setNumber || 1) === activeSet);

  const handleSelectSet = (setNum: number) => {
    setActiveSet(setNum);
    const firstInSet = B1_LISTENING_PARTS.find(p => (p.setNumber || 1) === setNum);
    if (firstInSet) {
      setSelectedPart(firstInSet);
    }
  };

  // Stop speech when switching parts
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
    setSelectedAnswers({});
    setShowExplanation({});
    setShowTranscript(false);
    setShowEnglishTranscript(false);
  }, [selectedPart]);

  // Audio Playback Handler using Web Speech API with clean German voices
  const handleTogglePlay = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Audio speech synthesis is not supported by your browser.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean audio transcript text before speaking (remove text label headers)
    const cleanText = selectedPart.audioTranscript_de
      .replace(/Text \d+ \(.*?\):/g, "")
      .replace(/Julia:/g, "Julia:")
      .replace(/Jan:/g, "Jan:")
      .replace(/Moderator:/g, "Moderator:")
      .replace(/Frau Vogel:/g, "Frau Vogel:")
      .replace(/Herr Krüger:/g, "Herr Krüger:")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "de-DE";
    utterance.rate = playbackRate;

    // Pick a natural German voice if available
    const voices = window.speechSynthesis.getVoices();
    const deVoice = voices.find(v => v.lang.startsWith("de") || v.lang.includes("DE"));
    if (deVoice) {
      utterance.voice = deVoice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const handlePickOption = (qId: string, optIdx: number, correctIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIdx }));
    setShowExplanation(prev => ({ ...prev, [qId]: true }));

    const updated = { ...selectedAnswers, [qId]: optIdx };
    const allAnswered = selectedPart.questions.every(q => updated[q.id] !== undefined);
    const allCorrect = selectedPart.questions.every(q => updated[q.id] === q.correct);

    if (allAnswered && allCorrect && !isPartCompleted) {
      const newCompleted = [...(profile.completedListeningIds || []), selectedPart.id];
      updateProfile({ completedListeningIds: newCompleted });
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-300 mb-2">
              <Headphones className="w-3.5 h-3.5 text-amber-400" />
              <span>B1 Hörverstehen (Audio Listening Comprehension Lab)</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              B1 Listening <span className="text-amber-400">3 Complete Model Exam Sets (12 Audio Tasks)</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Real-world German audio simulation with speed control. Master how to spot the &quot;Correction Trap&quot; and the &quot;Distractor Trap&quot; without needing to catch every single word.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Mastered Listening Parts:</span>
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-bold rounded-lg border border-amber-500/40 text-sm">
              {(profile.completedListeningIds || []).length} / {B1_LISTENING_PARTS.length} Tasks Mastered
            </span>
          </div>
        </div>

        {/* Exam Set Switcher */}
        <div className="mt-5 pt-4 border-t border-slate-800">
          <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Select Model Exam Set:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sets.map((s) => {
              const isSetSelected = activeSet === s.num;
              const completedCount = B1_LISTENING_PARTS.filter(p => (p.setNumber || 1) === s.num && profile.completedListeningIds?.includes(p.id)).length;
              return (
                <button
                  key={s.num}
                  onClick={() => handleSelectSet(s.num)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
                    isSetSelected
                      ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20"
                      : "bg-slate-950/70 hover:bg-slate-800 text-slate-300 border-slate-800"
                  }`}
                >
                  <span>{s.title}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSetSelected ? "bg-slate-950/20 text-slate-950 font-black" : "bg-slate-800 text-amber-300"}`}>
                    {completedCount}/{s.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Part Tabs Selector */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-800/60">
          {currentSetParts.map((part) => {
            const isDone = profile.completedListeningIds?.includes(part.id);
            const isSelected = selectedPart.id === part.id;

            return (
              <button
                key={part.id}
                onClick={() => setSelectedPart(part)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  isSelected
                    ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-black"
                    : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
                }`}
              >
                <span>Hören Teil {part.partNumber}</span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Part Info & Audio Player Console */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-slate-800 text-amber-400 text-xs font-bold rounded-md border border-slate-700">
                {selectedPart.examSource}
              </span>
              <span className="text-xs text-slate-400">{selectedPart.scenarioType}</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1.5">{selectedPart.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{selectedPart.description}</p>
          </div>
        </div>

        {/* Pass Hack Notification */}
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300 space-y-0.5">
          <strong>💡 Exam Trap Elimination Hack: </strong>
          <span>{selectedPart.passHack}</span>
        </div>

        {/* Interactive Audio Player Console Card */}
        <div className="bg-slate-950 p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Play Button & Wave Status */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleTogglePlay}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-slate-950 shadow-lg transition transform active:scale-95 ${
                  isPlaying
                    ? "bg-amber-400 hover:bg-amber-300 animate-pulse ring-4 ring-amber-500/30"
                    : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500"
                }`}
                title={isPlaying ? "Pause Audio" : "Play German Audio Track"}
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-slate-950" /> : <Play className="w-6 h-6 fill-slate-950 ml-0.5" />}
              </button>

              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{isPlaying ? "Playing German Audio..." : "German Audio Dialogue"}</span>
                  {isPlaying && (
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-3 bg-amber-400 rounded-full animate-bounce" />
                      <span className="w-1.5 h-5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                      <span className="w-1.5 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400">
                  {isPlaying ? "Listen attentively for keywords" : "Click to start audio simulation"}
                </div>
              </div>
            </div>

            {/* Playback Speed Switcher */}
            <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 font-semibold px-2">Speed:</span>
              <button
                onClick={() => setPlaybackRate(0.8)}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  playbackRate === 0.8
                    ? "bg-amber-500 text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
                title="0.8x: Clear learner pace"
              >
                0.8x (Learner)
              </button>
              <button
                onClick={() => setPlaybackRate(0.9)}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  playbackRate === 0.9
                    ? "bg-amber-500 text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
                title="0.9x: Balanced pace"
              >
                0.9x (Recommended)
              </button>
              <button
                onClick={() => setPlaybackRate(1.0)}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  playbackRate === 1.0
                    ? "bg-amber-500 text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
                title="1.0x: Official exam speed"
              >
                1.0x (Exam)
              </button>
            </div>
          </div>

          {/* Transcript Toggles (Optional reveal for learners) */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-800/80">
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                showTranscript
                  ? "bg-slate-800 text-amber-300 border-amber-500/40"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{showTranscript ? "Hide Transcript" : "Show German Transcript"}</span>
            </button>

            {showTranscript && (
              <button
                onClick={() => setShowEnglishTranscript(!localShowEnglishTranscript)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                  showEnglishTranscript
                    ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/40"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                }`}
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{showEnglishTranscript ? "Hide English" : "Show English Translation"}</span>
              </button>
            )}

            <span className="text-[11px] text-slate-500 ml-auto">
              Tip: In the real exam you only hear the audio, but you can read the transcript here while practicing.
            </span>
          </div>

          {/* Transcript View when expanded */}
          {showTranscript && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 animate-fadeIn">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-sans text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  German Spoken Script:
                </span>
                {selectedPart.audioTranscript_de}
              </div>

              {showEnglishTranscript && (
                <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 font-sans text-xs sm:text-sm text-slate-400 leading-relaxed whitespace-pre-wrap">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                    English Translation Script:
                  </span>
                  {selectedPart.audioTranscript_en}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Listening Comprehension Questions */}
        <div className="space-y-5 pt-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Listening Tasks for Teil {selectedPart.partNumber} ({selectedPart.questions.length})</span>
            </h4>
            <span className="text-xs text-slate-400">Select the correct answer based on what you heard</span>
          </div>

          <div className="space-y-6">
            {selectedPart.questions.map((q, idx) => {
              const userChoice = selectedAnswers[q.id];
              const isAnswered = userChoice !== undefined;
              const isCorrect = userChoice === q.correct;

              return (
                <div key={q.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-slate-900 text-amber-400 text-xs font-bold flex items-center justify-center border border-slate-700">
                        Q{idx + 1}
                      </span>
                      <h5 className="text-sm sm:text-base font-bold text-white">
                        {q.question_de}
                      </h5>
                    </div>
                    <p className="text-xs text-amber-300/80 pl-8">{q.question_en}</p>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-2.5 pl-8">
                    {q.options.map((opt, optIdx) => {
                      const isPicked = userChoice === optIdx;
                      const isThisCorrect = optIdx === q.correct;

                      let optStyle = "bg-slate-900 hover:bg-slate-800/80 border-slate-800 text-slate-200";

                      if (isAnswered) {
                        if (isThisCorrect) {
                          optStyle = "bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold";
                        } else if (isPicked && !isThisCorrect) {
                          optStyle = "bg-rose-950/70 border-rose-500 text-rose-200 font-semibold";
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handlePickOption(q.id, optIdx, q.correct)}
                          className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm flex items-start gap-3 transition ${optStyle}`}
                        >
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 border ${
                            isAnswered && isThisCorrect
                              ? "bg-emerald-500 text-slate-950 border-emerald-400"
                              : isAnswered && isPicked && !isThisCorrect
                              ? "bg-rose-500 text-white border-rose-400"
                              : "bg-slate-950 border-slate-700 text-slate-400"
                          }`}>
                            {["A", "B", "C"][optIdx]}
                          </span>
                          <div>
                            <div>{opt.de}</div>
                            <div className="text-[11px] text-slate-400 mt-0.5">{opt.en}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation & Trap Alert */}
                  {isAnswered && (
                    <div className="pl-8 pt-1 space-y-1.5 animate-fadeIn">
                      <div className={`p-3 rounded-xl border text-xs space-y-1 ${
                        isCorrect ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200" : "bg-rose-950/40 border-rose-500/40 text-rose-200"
                      }`}>
                        <div className="flex items-center gap-1.5 font-bold">
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-400" />
                          )}
                          <span>{isCorrect ? "Richtig gehört! (Correctly heard!)" : "Falsch! (Listen for the trap)"}</span>
                        </div>
                        <p className="text-slate-200 font-medium">🎧 {q.keywordHint}</p>
                        <p className="text-slate-400 text-[11px]">{q.keywordHint_en}</p>
                      </div>

                      {q.distractorTrap && (
                        <div className="p-2.5 bg-amber-950/30 border border-amber-500/30 rounded-xl text-[11px] text-amber-300 flex items-start gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <strong className="block text-amber-400">Exam Distractor Alert:</strong>
                            <span>{q.distractorTrap}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mastered Status */}
          {selectedPart.questions.every(q => selectedAnswers[q.id] === q.correct) && (
            <div className="p-4 bg-emerald-950/60 border border-emerald-500/60 rounded-xl text-center space-y-1">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
              <h5 className="font-extrabold text-white text-sm">Hören Teil {selectedPart.partNumber} Mastered!</h5>
              <p className="text-xs text-emerald-300">
                You correctly understood the dialogue and eliminated all distractor traps.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
