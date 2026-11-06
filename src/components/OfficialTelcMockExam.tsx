"use client";

import React, { useState, useEffect, useRef } from "react";
import { useUser } from "@/context/UserContext";
import { 
  TELC_B1_MOCK_EXAM_DATA,
  TelcLesenTeil2Question,
  TelcLesenTeil3Situation,
  TelcSprachbausteineTeil1Gap,
  TelcSprachbausteineTeil2Gap,
  TelcHoerenTask
} from "@/data/telc_b1_mock_exam_data";
import { 
  BookOpen, 
  Sparkles, 
  Headphones, 
  PenTool, 
  Mic, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Award, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  FileText, 
  Volume2, 
  Eye, 
  EyeOff, 
  HelpCircle,
  ShieldCheck,
  Check
} from "lucide-react";
import confetti from "canvas-confetti";

type ExamSubTab = "LESEN" | "SPRACHBAUSTEINE" | "HOEREN" | "SCHREIBEN" | "SPRECHEN" | "SCORE_REPORT";

interface OfficialTelcMockExamProps {
  onBackToHub?: () => void;
}

export const OfficialTelcMockExam: React.FC<OfficialTelcMockExamProps> = ({ onBackToHub }) => {
  const { theme } = useUser();
  const isDark = theme === "dark";

  const [activeTab, setActiveTab] = useState<ExamSubTab>("LESEN");
  const [lesenPart, setLesenPart] = useState<1 | 2 | 3>(1);
  const [bausteinePart, setBausteinePart] = useState<1 | 2>(1);
  const [hoerenPart, setHoerenPart] = useState<1 | 2 | 3>(1);

  // Timer states (150 minutes = 9000 seconds)
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(150 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [isUntimedMode, setIsUntimedMode] = useState<boolean>(false);

  // User answers map
  // Questions 1 to 5: Lesen 1 (letters a to j)
  // Questions 6 to 10: Lesen 2 (letters a, b, c)
  // Questions 11 to 20: Lesen 3 (letters a to l, or x)
  // Questions 21 to 30: Sprachbausteine 1 (letters a, b, c)
  // Questions 31 to 40: Sprachbausteine 2 (letters a to o)
  // Questions 41 to 60: Hören (boolean: true = +, false = -)
  const [answers, setAnswers] = useState<Record<number, string | boolean>>({});

  // Writing state
  const [writingContent, setWritingContent] = useState<string>("");
  const [showModelSolution, setShowModelSolution] = useState<boolean>(false);

  // Audio player state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [showTranscripts, setShowTranscripts] = useState<boolean>(false);

  // Exam submission and scoring state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Countdown timer effect
  useEffect(() => {
    if (!isTimerRunning || isUntimedMode || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitted(true);
          setActiveTab("SCORE_REPORT");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, isUntimedMode, isSubmitted]);

  // Audio time listener
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setAudioCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setAudioDuration(audio.duration);
    const handleEnded = () => setIsAudioPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsAudioPlaying(true);
      }).catch((err) => {
        console.error("Audio playback error:", err);
      });
    }
  };

  const seekAudio = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = seconds;
    if (!isAudioPlaying) {
      audioRef.current.play();
      setIsAudioPlaying(true);
    }
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatAudioTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectAnswer = (qNum: number, value: string | boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [qNum]: value
    }));
  };

  // Score Calculation
  const calculateScores = () => {
    const data = TELC_B1_MOCK_EXAM_DATA;

    // 1. Lesen Teil 1: 5 questions (1 to 5), 5 pts each = 25 pts
    let lesen1Correct = 0;
    for (let q = 1; q <= 5; q++) {
      if (answers[q] === data.lesen.teil1.answerKey[q]) {
        lesen1Correct++;
      }
    }
    const lesen1Score = lesen1Correct * 5;

    // 2. Lesen Teil 2: 5 questions (6 to 10), 5 pts each = 25 pts
    let lesen2Correct = 0;
    data.lesen.teil2.questions.forEach((item) => {
      if (answers[item.questionNumber] === item.correct) {
        lesen2Correct++;
      }
    });
    const lesen2Score = lesen2Correct * 5;

    // 3. Lesen Teil 3: 10 situations (11 to 20), 2.5 pts each = 25 pts
    let lesen3Correct = 0;
    data.lesen.teil3.situations.forEach((item) => {
      if (answers[item.situationNumber] === item.correct) {
        lesen3Correct++;
      }
    });
    const lesen3Score = lesen3Correct * 2.5;

    const totalLesenScore = lesen1Score + lesen2Score + lesen3Score; // out of 75

    // 4. Sprachbausteine Teil 1: 10 gaps (21 to 30), 1.5 pts each = 15 pts
    let bausteine1Correct = 0;
    data.sprachbausteine.teil1.gaps.forEach((g) => {
      if (answers[g.gapNumber] === g.correct) {
        bausteine1Correct++;
      }
    });
    const bausteine1Score = bausteine1Correct * 1.5;

    // 5. Sprachbausteine Teil 2: 10 gaps (31 to 40), 1.5 pts each = 15 pts
    let bausteine2Correct = 0;
    data.sprachbausteine.teil2.gaps.forEach((g) => {
      if (answers[g.gapNumber] === g.correctWordKey) {
        bausteine2Correct++;
      }
    });
    const bausteine2Score = bausteine2Correct * 1.5;

    const totalSprachbausteineScore = bausteine1Score + bausteine2Score; // out of 30

    // 6. Hörverstehen Teil 1: 5 tasks (41 to 45), 5 pts each = 25 pts
    let hoeren1Correct = 0;
    data.hoeren.teil1.tasks.forEach((t) => {
      if (answers[t.taskNumber] === t.correct) {
        hoeren1Correct++;
      }
    });
    const hoeren1Score = hoeren1Correct * 5;

    // 7. Hörverstehen Teil 2: 10 tasks (46 to 55), 2.5 pts each = 25 pts
    let hoeren2Correct = 0;
    data.hoeren.teil2.tasks.forEach((t) => {
      if (answers[t.taskNumber] === t.correct) {
        hoeren2Correct++;
      }
    });
    const hoeren2Score = hoeren2Correct * 2.5;

    // 8. Hörverstehen Teil 3: 5 tasks (56 to 60), 5 pts each = 25 pts
    let hoeren3Correct = 0;
    data.hoeren.teil3.tasks.forEach((t) => {
      if (answers[t.taskNumber] === t.correct) {
        hoeren3Correct++;
      }
    });
    const hoeren3Score = hoeren3Correct * 5;

    const totalHoerenScore = hoeren1Score + hoeren2Score + hoeren3Score; // out of 75

    // Writing estimate based on word count & structure
    const wordsCount = writingContent.trim() ? writingContent.trim().split(/\s+/).length : 0;
    let estimatedWritingScore = 0;
    if (wordsCount >= 100) estimatedWritingScore = 40;
    else if (wordsCount >= 70) estimatedWritingScore = 32;
    else if (wordsCount >= 40) estimatedWritingScore = 22;
    else if (wordsCount >= 10) estimatedWritingScore = 12;

    const totalWrittenScore = totalLesenScore + totalSprachbausteineScore + totalHoerenScore + estimatedWritingScore; // out of 225

    // Default oral estimate for full test simulation (Pass standard = 60/75)
    const oralEstimate = 60; // out of 75

    const grandTotal = totalWrittenScore + oralEstimate; // out of 300

    const isWrittenPassed = totalWrittenScore >= data.meta.writtenPassThreshold;
    const isOralPassed = oralEstimate >= data.meta.oralPassThreshold;
    const isOverallPassed = isWrittenPassed && isOralPassed;

    // Determine telc grade
    let grade = "Nicht bestanden";
    if (isOverallPassed) {
      if (grandTotal >= 270) grade = "Sehr gut (1)";
      else if (grandTotal >= 240) grade = "Gut (2)";
      else if (grandTotal >= 210) grade = "Befriedigend (3)";
      else grade = "Ausreichend (4)";
    }

    return {
      lesen1Score,
      lesen2Score,
      lesen3Score,
      totalLesenScore,
      bausteine1Score,
      bausteine2Score,
      totalSprachbausteineScore,
      hoeren1Score,
      hoeren2Score,
      hoeren3Score,
      totalHoerenScore,
      estimatedWritingScore,
      wordsCount,
      totalWrittenScore,
      oralEstimate,
      grandTotal,
      isWrittenPassed,
      isOralPassed,
      isOverallPassed,
      grade,
      writtenCorrectCount: lesen1Correct + lesen2Correct + lesen3Correct + bausteine1Correct + bausteine2Correct + hoeren1Correct + hoeren2Correct + hoeren3Correct,
      totalAutoQuestions: 60
    };
  };

  const results = calculateScores();

  const handleFinishExam = () => {
    setIsSubmitted(true);
    setIsTimerRunning(false);
    setActiveTab("SCORE_REPORT");
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
  };

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const data = TELC_B1_MOCK_EXAM_DATA;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* ─── AUDIO ELEMENT (OFFICIAL TEST AUDIO) ─── */}
      <audio ref={audioRef} src={data.hoeren.audioUrl} preload="metadata" />

      {/* ─── TOP EXAM CONTROLLER BAR ─── */}
      <div className={`rounded-3xl border p-4 sm:p-5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 transition-colors duration-200 ${
        isDark ? "bg-slate-900/95 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
      }`}>
        <div className="flex items-center gap-3">
          {onBackToHub && (
            <button
              type="button"
              onClick={onBackToHub}
              className={`p-2 rounded-xl border text-xs font-bold transition flex items-center gap-1 ${
                isDark ? "border-slate-800 hover:bg-slate-800 text-slate-300" : "border-slate-200 hover:bg-slate-100 text-slate-700"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Official Mock Exam
              </span>
              <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
                telc Deutsch B1 / Zertifikat Deutsch
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-white">
              Übungstest 1 Simulator
            </h1>
          </div>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2">
            {!isUntimedMode ? (
              <div className={`px-4 py-2 rounded-2xl border font-mono font-black text-sm sm:text-base flex items-center gap-2 ${
                timeRemainingSeconds < 600
                  ? "bg-rose-950/80 border-rose-500/50 text-rose-300 animate-pulse"
                  : isDark
                  ? "bg-slate-950 border-slate-800 text-amber-300"
                  : "bg-slate-100 border-slate-300 text-slate-900"
              }`}>
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{formatTime(timeRemainingSeconds)}</span>
              </div>
            ) : (
              <span className="px-3 py-1.5 rounded-xl bg-purple-950/60 text-purple-300 border border-purple-500/30 text-xs font-bold">
                Untimed Practice Mode
              </span>
            )}

            <button
              type="button"
              onClick={() => setIsUntimedMode(!isUntimedMode)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition ${
                isDark ? "border-slate-800 text-slate-400 hover:text-white" : "border-slate-200 text-slate-600 hover:text-slate-900"
              }`}
            >
              {isUntimedMode ? "Switch to 150m Timer" : "Untimed"}
            </button>
          </div>

          {!isSubmitted ? (
            <button
              type="button"
              onClick={handleFinishExam}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold rounded-xl transition shadow-md shadow-rose-600/30 flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Submit & Grade S30</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setActiveTab("SCORE_REPORT")}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-xl transition flex items-center gap-1.5 shadow-md shadow-emerald-600/30"
            >
              <Award className="w-4 h-4" />
              <span>View S30 Report</span>
            </button>
          )}
        </div>
      </div>

      {/* ─── PRIMARY SUBTEST NAVIGATION TABS ─── */}
      <div className="flex flex-wrap items-center gap-2 pb-1">
        {[
          { id: "LESEN", label: "1. Leseverstehen", pts: "75 Pkt", icon: BookOpen },
          { id: "SPRACHBAUSTEINE", label: "2. Sprachbausteine", pts: "30 Pkt", icon: Sparkles },
          { id: "HOEREN", label: "3. Hörverstehen", pts: "75 Pkt", icon: Headphones },
          { id: "SCHREIBEN", label: "4. Schreiben", pts: "45 Pkt", icon: PenTool },
          { id: "SPRECHEN", label: "5. Sprechen", pts: "75 Pkt", icon: Mic },
          { id: "SCORE_REPORT", label: "6. S30 Score Report", pts: isSubmitted ? `${results.grandTotal}/300` : "Evaluation", icon: Award }
        ].map((tab) => {
          const Icon = tab.icon;
          const isCur = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as ExamSubTab)}
              className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 border ${
                isCur
                  ? "bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/30 font-black"
                  : isDark
                  ? "bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800"
                  : "bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                isCur
                  ? "bg-white/20 text-white"
                  : isDark
                  ? "bg-slate-800 text-slate-400"
                  : "bg-slate-100 text-slate-600"
              }`}>
                {tab.pts}
              </span>
            </button>
          );
        })}
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* ─── TAB 1: LESEVERSTEHEN (TEIL 1, 2, 3) ─── */}
      {/* ────────────────────────────────────────────────────────── */}
      {activeTab === "LESEN" && (
        <div className="space-y-6">
          {/* Sub-Part Switcher */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setLesenPart(p as 1 | 2 | 3)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                  lesenPart === p
                    ? "bg-purple-600 text-white border-purple-500 shadow-sm"
                    : isDark
                    ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    : "bg-white border-slate-200 text-slate-700 hover:text-slate-900"
                }`}
              >
                Teil {p} ({p === 1 ? "Überschriften" : p === 2 ? "Pressebericht" : "Anzeigen"})
              </button>
            ))}
          </div>

          {/* Teil 1: 5 Texts + 10 Headlines */}
          {lesenPart === 1 && (
            <div className={`rounded-3xl border p-6 space-y-6 shadow-sm ${
              isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}>
              <div className="space-y-1">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  Leseverstehen Teil 1 (Aufgaben 1-5, 25 Punkte)
                </span>
                <h2 className="text-xl font-black">
                  Globalverstehen: 5 Texte und 10 Überschriften
                </h2>
                <p className="text-xs text-slate-400">
                  {data.lesen.teil1.instructions}
                </p>
              </div>

              {/* Headlines Master Pool */}
              <div className={`p-4 rounded-2xl border space-y-2.5 ${
                isDark ? "bg-slate-950/70 border-slate-800" : "bg-purple-50/40 border-purple-200"
              }`}>
                <div className="text-xs font-bold uppercase tracking-wider text-purple-400">
                  Mögliche Überschriften (a - j):
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  {data.lesen.teil1.headlines.map((hl) => (
                    <div
                      key={hl.key}
                      className={`p-2.5 rounded-xl border flex items-start gap-2 ${
                        isDark ? "bg-slate-900/80 border-slate-800" : "bg-white border-slate-200"
                      }`}
                    >
                      <span className="font-mono font-black text-purple-400 px-1.5 py-0.5 rounded bg-purple-500/10 shrink-0">
                        {hl.key}
                      </span>
                      <span className="font-medium text-slate-200 leading-snug">{hl.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5 Texts */}
              <div className="space-y-4">
                {data.lesen.teil1.texts.map((item) => {
                  const qNum = item.id;
                  const selectedVal = answers[qNum] as string || "";
                  const correctVal = data.lesen.teil1.answerKey[qNum];
                  const isCorrect = selectedVal === correctVal;

                  return (
                    <div
                      key={item.id}
                      className={`p-5 rounded-2xl border space-y-4 ${
                        isDark ? "bg-slate-950/50 border-slate-800" : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          Text {item.id} ({item.sourceOrCategory})
                        </span>

                        <button
                          type="button"
                          onClick={() => speakText(item.text)}
                          className="p-1 hover:text-purple-400 text-slate-400 transition"
                          title="Vorlesen"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm leading-relaxed text-slate-200 whitespace-pre-line">
                        {item.text}
                      </p>

                      {/* Headline Chooser */}
                      <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-400">
                          Passende Überschrift für Text {item.id}:
                        </span>
                        {data.lesen.teil1.headlines.map((hl) => (
                          <button
                            key={hl.key}
                            type="button"
                            onClick={() => handleSelectAnswer(qNum, hl.key)}
                            className={`w-8 h-8 rounded-xl font-mono text-xs font-black transition border ${
                              selectedVal === hl.key
                                ? isSubmitted
                                  ? isCorrect
                                    ? "bg-emerald-600 text-white border-emerald-500"
                                    : "bg-rose-600 text-white border-rose-500"
                                  : "bg-purple-600 text-white border-purple-500"
                                : isDark
                                ? "bg-slate-900 border-slate-700 text-slate-300 hover:border-purple-400"
                                : "bg-white border-slate-300 text-slate-800 hover:border-purple-400"
                            }`}
                          >
                            {hl.key}
                          </button>
                        ))}
                      </div>

                      {isSubmitted && (
                        <div className={`p-3 rounded-xl text-xs font-bold flex items-center justify-between ${
                          isCorrect ? "bg-emerald-950/60 text-emerald-200 border border-emerald-500/50" : "bg-rose-950/60 text-rose-200 border border-rose-500/50"
                        }`}>
                          <span>
                            {isCorrect ? "✓ Richtig gelöst!" : `✕ Falsch! Richtige Überschrift: (${correctVal})`}
                          </span>
                          <span className="text-[11px] font-normal text-slate-300">
                            {data.lesen.teil1.headlines.find(h => h.key === correctVal)?.text}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Teil 2: Long Newspaper Report & 5 Multiple-Choice Questions */}
          {lesenPart === 2 && (
            <div className={`rounded-3xl border p-6 space-y-6 shadow-sm ${
              isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}>
              <div className="space-y-1">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  Leseverstehen Teil 2 (Aufgaben 6-10, 25 Punkte)
                </span>
                <h2 className="text-xl font-black">
                  Detailverstehen: Pressebericht &ldquo;{data.lesen.teil2.articleTitle}&rdquo;
                </h2>
                <p className="text-xs text-slate-400">
                  {data.lesen.teil2.instructions}
                </p>
              </div>

              {/* Newspaper Article Box */}
              <div className={`p-6 rounded-2xl border space-y-4 ${
                isDark ? "bg-slate-950/80 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-900"
              }`}>
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-black text-amber-300">
                    {data.lesen.teil2.articleTitle}
                  </h3>
                  <div className="text-xs text-slate-400 italic mt-0.5">
                    {data.lesen.teil2.articleSubtitle}
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm leading-relaxed">
                  {data.lesen.teil2.articleBody.map((par, pIdx) => (
                    <p key={pIdx}>{par}</p>
                  ))}
                </div>
              </div>

              {/* Questions 6-10 */}
              <div className="space-y-4">
                {data.lesen.teil2.questions.map((q) => {
                  const selectedVal = answers[q.questionNumber] as string || "";
                  const isCorrect = selectedVal === q.correct;

                  return (
                    <div
                      key={q.questionNumber}
                      className={`p-5 rounded-2xl border space-y-3 ${
                        isDark ? "bg-slate-950/50 border-slate-800" : "bg-white border-slate-200"
                      }`}
                    >
                      <div className="text-sm font-black text-white flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-xs">
                          {q.questionNumber}
                        </span>
                        <span>{q.prompt}</span>
                      </div>

                      <div className="grid grid-cols-1 gap-2 pt-1">
                        {q.options.map((opt) => (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => handleSelectAnswer(q.questionNumber, opt.key)}
                            className={`p-3 rounded-xl text-xs sm:text-sm font-medium border text-left transition flex items-start gap-3 ${
                              selectedVal === opt.key
                                ? isSubmitted
                                  ? opt.key === q.correct
                                    ? "bg-emerald-600 text-white border-emerald-500 font-bold"
                                    : "bg-rose-600 text-white border-rose-500 font-bold"
                                  : "bg-purple-600 text-white border-purple-500 font-bold"
                                : isDark
                                ? "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                                : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100"
                            }`}
                          >
                            <span className="font-mono font-bold">{opt.key})</span>
                            <span>{opt.text}</span>
                          </button>
                        ))}
                      </div>

                      {isSubmitted && (
                        <div className={`p-3 rounded-xl text-xs font-bold space-y-1 ${
                          isCorrect ? "bg-emerald-950/60 text-emerald-200 border border-emerald-500/50" : "bg-rose-950/60 text-rose-200 border border-rose-500/50"
                        }`}>
                          <div>{isCorrect ? "✓ Richtig!" : `✕ Falsch! Richtige Antwort: (${q.correct})`}</div>
                          <div className="text-[11px] font-normal text-slate-300">{q.explanation}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Teil 3: 10 Situations & 12 Classified Ads */}
          {lesenPart === 3 && (
            <div className={`rounded-3xl border p-6 space-y-6 shadow-sm ${
              isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}>
              <div className="space-y-1">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  Leseverstehen Teil 3 (Aufgaben 11-20, 25 Punkte)
                </span>
                <h2 className="text-xl font-black">
                  Selektives Verstehen: 10 Situationen und Kleinanzeigen (a-l)
                </h2>
                <p className="text-xs text-slate-400">
                  {data.lesen.teil3.instructions}
                </p>
              </div>

              {/* Classified Ads Showcase */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Kleinanzeigen (Anzeigen a - l):
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {data.lesen.teil3.ads.map((ad) => (
                    <div
                      key={ad.key}
                      className={`p-3.5 rounded-2xl border space-y-1 text-xs ${
                        isDark ? "bg-slate-950/80 border-slate-800" : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-1">
                        <span className="font-mono font-black text-amber-300 px-1.5 py-0.5 rounded bg-amber-500/10">
                          Anzeige {ad.key}
                        </span>
                        <span className="font-bold text-white truncate max-w-[150px]">{ad.title}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-300 pt-1">
                        {ad.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Situations 11 to 20 */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  Zu lösende Situationen (Aufgaben 11 - 20):
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.lesen.teil3.situations.map((sit) => {
                    const selectedVal = answers[sit.situationNumber] as string || "";
                    const isCorrect = selectedVal === sit.correct;

                    return (
                      <div
                        key={sit.situationNumber}
                        className={`p-4 rounded-2xl border space-y-3 ${
                          isDark ? "bg-slate-950/60 border-slate-800" : "bg-white border-slate-200"
                        }`}
                      >
                        <div className="text-xs sm:text-sm font-semibold text-slate-200 leading-snug">
                          <span className="font-mono font-bold text-purple-400 mr-1.5">
                            {sit.situationNumber}.
                          </span>
                          {sit.text}
                        </div>

                        {/* Ad buttons a to l and x */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "x"].map((adKey) => (
                            <button
                              key={adKey}
                              type="button"
                              onClick={() => handleSelectAnswer(sit.situationNumber, adKey)}
                              className={`w-7 h-7 rounded-lg font-mono text-xs font-black transition border ${
                                selectedVal === adKey
                                  ? isSubmitted
                                    ? isCorrect
                                      ? "bg-emerald-600 text-white border-emerald-500"
                                      : "bg-rose-600 text-white border-rose-500"
                                    : "bg-purple-600 text-white border-purple-500"
                                  : adKey === "x"
                                  ? isDark
                                    ? "bg-amber-950/40 border-amber-500/30 text-amber-300 hover:border-amber-400"
                                    : "bg-amber-50 border-amber-300 text-amber-900"
                                  : isDark
                                  ? "bg-slate-900 border-slate-700 text-slate-300 hover:border-purple-400"
                                  : "bg-white border-slate-300 text-slate-800 hover:border-purple-400"
                              }`}
                              title={adKey === "x" ? "Keine Anzeige passt (x)" : `Anzeige ${adKey}`}
                            >
                              {adKey}
                            </button>
                          ))}
                        </div>

                        {isSubmitted && (
                          <div className={`p-2.5 rounded-xl text-xs font-bold space-y-0.5 ${
                            isCorrect ? "bg-emerald-950/60 text-emerald-200 border border-emerald-500/50" : "bg-rose-950/60 text-rose-200 border border-rose-500/50"
                          }`}>
                            <div>{isCorrect ? "✓ Richtig!" : `✕ Falsch! Richtige Anzeige: (${sit.correct})`}</div>
                            <div className="text-[10px] font-normal text-slate-300">{sit.explanation}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* ─── TAB 2: SPRACHBAUSTEINE (TEIL 1 & 2) ─── */}
      {/* ────────────────────────────────────────────────────────── */}
      {activeTab === "SPRACHBAUSTEINE" && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            {[1, 2].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setBausteinePart(p as 1 | 2)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                  bausteinePart === p
                    ? "bg-purple-600 text-white border-purple-500 shadow-sm"
                    : isDark
                    ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    : "bg-white border-slate-200 text-slate-700 hover:text-slate-900"
                }`}
              >
                Teil {p} ({p === 1 ? "Brief aus Straßburg (a/b/c)" : "Word Bank Janosch (a-o)"})
              </button>
            ))}
          </div>

          {/* Teil 1: Multiple Choice Gaps 21-30 */}
          {bausteinePart === 1 && (
            <div className={`rounded-3xl border p-6 space-y-6 shadow-sm ${
              isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}>
              <div className="space-y-1">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Sprachbausteine Teil 1 (Aufgaben 21-30, 15 Punkte)
                </span>
                <h2 className="text-xl font-black">
                  Brief: {data.sprachbausteine.teil1.sender} an {data.sprachbausteine.teil1.recipient}
                </h2>
                <p className="text-xs text-slate-400">
                  {data.sprachbausteine.teil1.instructions}
                </p>
              </div>

              {/* The Letter with inline gaps */}
              <div className={`p-6 rounded-2xl border text-xs sm:text-sm leading-relaxed space-y-3 ${
                isDark ? "bg-slate-950/70 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-900"
              }`}>
                <div className="font-bold text-indigo-300">
                  Liebe Claudia,
                </div>
                <p>
                  {data.sprachbausteine.teil1.letterSegments.map((seg, idx) => {
                    if (seg.type === "text") {
                      return <span key={idx}>{seg.content}</span>;
                    }
                    const qNum = seg.gapNumber!;
                    const selectedVal = answers[qNum] as string || "";
                    return (
                      <span
                        key={idx}
                        className={`inline-block mx-1 px-2.5 py-0.5 rounded-lg font-mono font-bold text-xs border ${
                          selectedVal
                            ? "bg-indigo-600 text-white border-indigo-500"
                            : isDark
                            ? "bg-slate-900 border-indigo-400 text-indigo-300"
                            : "bg-white border-indigo-300 text-indigo-700"
                        }`}
                      >
                        [{qNum}: {selectedVal || "___"}]
                      </span>
                    );
                  })}
                </p>
                <div className="pt-2 text-slate-300 font-bold">
                  Bis bald, Deine Brigitte
                </div>
              </div>

              {/* 10 Gaps Multiple Choice */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.sprachbausteine.teil1.gaps.map((gap) => {
                  const selectedVal = answers[gap.gapNumber] as string || "";
                  const isCorrect = selectedVal === gap.correct;

                  return (
                    <div
                      key={gap.gapNumber}
                      className={`p-3.5 rounded-2xl border space-y-2 ${
                        isDark ? "bg-slate-950/60 border-slate-800" : "bg-white border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-black text-xs text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10">
                          Lücke {gap.gapNumber}
                        </span>
                        {isSubmitted && (
                          <span className={`text-[11px] font-bold ${isCorrect ? "text-emerald-400" : "text-rose-400"}`}>
                            {isCorrect ? "✓ Richtig" : `✕ Richtige Form: (${gap.correct})`}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {gap.options.map((opt) => (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => handleSelectAnswer(gap.gapNumber, opt.key)}
                            className={`p-2 rounded-xl text-xs font-bold border transition text-center ${
                              selectedVal === opt.key
                                ? isSubmitted
                                  ? opt.key === gap.correct
                                    ? "bg-emerald-600 text-white border-emerald-500"
                                    : "bg-rose-600 text-white border-rose-500"
                                  : "bg-indigo-600 text-white border-indigo-500"
                                : isDark
                                ? "bg-slate-900 border-slate-800 text-slate-300 hover:border-indigo-400"
                                : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100"
                            }`}
                          >
                            <span className="font-mono mr-1">{opt.key})</span>
                            <span>{opt.text}</span>
                          </button>
                        ))}
                      </div>

                      {isSubmitted && (
                        <div className="text-[10px] text-slate-400 pt-0.5">
                          {gap.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Teil 2: Word Bank Gaps 31-40 */}
          {bausteinePart === 2 && (
            <div className={`rounded-3xl border p-6 space-y-6 shadow-sm ${
              isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}>
              <div className="space-y-1">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Sprachbausteine Teil 2 (Aufgaben 31-40, 15 Punkte)
                </span>
                <h2 className="text-xl font-black">
                  Reservierungsbrief: Hotel-Pension Janosch
                </h2>
                <p className="text-xs text-slate-400">
                  {data.sprachbausteine.teil2.instructions}
                </p>
              </div>

              {/* Word Bank Pool */}
              <div className={`p-4 rounded-2xl border space-y-2 ${
                isDark ? "bg-slate-950/70 border-slate-800" : "bg-indigo-50/40 border-indigo-200"
              }`}>
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Wortkasten (a - o): Jedes Wort darf nur EINMAL verwendet werden!
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {data.sprachbausteine.teil2.wordBank.map((wb) => (
                    <div
                      key={wb.key}
                      className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 ${
                        isDark ? "bg-slate-900 border-slate-800 text-slate-200" : "bg-white border-slate-200 text-slate-900"
                      }`}
                    >
                      <span className="font-mono font-black text-indigo-400">{wb.key}</span>
                      <span className="font-semibold">{wb.word}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Letter Display */}
              <div className={`p-6 rounded-2xl border text-xs sm:text-sm leading-relaxed space-y-3 ${
                isDark ? "bg-slate-950/70 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-900"
              }`}>
                <div className="text-slate-400">
                  Sehr geehrte Damen und Herren,
                </div>
                <p>
                  {data.sprachbausteine.teil2.letterSegments.map((seg, idx) => {
                    if (seg.type === "text") {
                      return <span key={idx}>{seg.content}</span>;
                    }
                    const qNum = seg.gapNumber!;
                    const selectedVal = answers[qNum] as string || "";
                    const chosenWord = data.sprachbausteine.teil2.wordBank.find(w => w.key === selectedVal)?.word;

                    return (
                      <span
                        key={idx}
                        className={`inline-block mx-1 px-2.5 py-0.5 rounded-lg font-mono font-bold text-xs border ${
                          selectedVal
                            ? "bg-indigo-600 text-white border-indigo-500"
                            : isDark
                            ? "bg-slate-900 border-indigo-400 text-indigo-300"
                            : "bg-white border-indigo-300 text-indigo-700"
                        }`}
                      >
                        [{qNum}: {chosenWord ? `${selectedVal} (${chosenWord})` : "___"}]
                      </span>
                    );
                  })}
                </p>
                <div className="pt-2 text-slate-400">
                  Mit freundlichen Grüßen, Susanne Kettner
                </div>
              </div>

              {/* Gaps 31-40 Pickers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.sprachbausteine.teil2.gaps.map((gap) => {
                  const selectedVal = answers[gap.gapNumber] as string || "";
                  const isCorrect = selectedVal === gap.correctWordKey;

                  return (
                    <div
                      key={gap.gapNumber}
                      className={`p-3.5 rounded-2xl border space-y-2 ${
                        isDark ? "bg-slate-950/60 border-slate-800" : "bg-white border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-black text-xs text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10">
                          Lücke {gap.gapNumber}
                        </span>
                        {isSubmitted && (
                          <span className={`text-[11px] font-bold ${isCorrect ? "text-emerald-400" : "text-rose-400"}`}>
                            {isCorrect ? "✓ Richtig" : `✕ Richtige Antwort: (${gap.correctWordKey} = ${gap.correctWord})`}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {data.sprachbausteine.teil2.wordBank.map((wb) => (
                          <button
                            key={wb.key}
                            type="button"
                            onClick={() => handleSelectAnswer(gap.gapNumber, wb.key)}
                            className={`px-2 py-1 rounded-lg text-xs font-mono font-black border transition ${
                              selectedVal === wb.key
                                ? isSubmitted
                                  ? wb.key === gap.correctWordKey
                                    ? "bg-emerald-600 text-white border-emerald-500"
                                    : "bg-rose-600 text-white border-rose-500"
                                  : "bg-indigo-600 text-white border-indigo-500"
                                : isDark
                                ? "bg-slate-900 border-slate-700 text-slate-300 hover:border-indigo-400"
                                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                            }`}
                            title={`${wb.key}: ${wb.word}`}
                          >
                            {wb.key}
                          </button>
                        ))}
                      </div>

                      {isSubmitted && (
                        <div className="text-[10px] text-slate-400 pt-0.5">
                          {gap.explanation}
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

      {/* ────────────────────────────────────────────────────────── */}
      {/* ─── TAB 3: HÖRVERSTEHEN (TEIL 1, 2, 3) ─── */}
      {/* ────────────────────────────────────────────────────────── */}
      {activeTab === "HOEREN" && (
        <div className="space-y-6">
          {/* Integrated Real Audio Player Controller */}
          <div className={`rounded-3xl border p-5 shadow-lg space-y-4 ${
            isDark ? "bg-blue-950/40 border-blue-500/30 text-white" : "bg-blue-50/70 border-blue-200 text-blue-950"
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleAudio}
                  className="w-12 h-12 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition shadow-md shadow-blue-600/30 active:scale-95"
                  title={isAudioPlaying ? "Pause Audio" : "Play Official Exam Audio"}
                >
                  {isAudioPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                    <Headphones className="w-3.5 h-3.5" />
                    <span>Official telc B1 Audio Stream</span>
                  </div>
                  <div className="text-sm font-black text-white">
                    {formatAudioTime(audioCurrentTime)} / {formatAudioTime(audioDuration || 1774)}
                  </div>
                </div>
              </div>

              {/* Fast Jump Markers */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-slate-400 font-semibold mr-1">Direct jump:</span>
                <button
                  type="button"
                  onClick={() => seekAudio(20)}
                  className="px-2.5 py-1 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-bold border border-blue-500/30 transition"
                >
                  Teil 1 (0:20)
                </button>
                <button
                  type="button"
                  onClick={() => seekAudio(540)}
                  className="px-2.5 py-1 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-bold border border-blue-500/30 transition"
                >
                  Teil 2 (9:00)
                </button>
                <button
                  type="button"
                  onClick={() => seekAudio(1200)}
                  className="px-2.5 py-1 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-bold border border-blue-500/30 transition"
                >
                  Teil 3 (20:00)
                </button>
                <button
                  type="button"
                  onClick={() => setShowTranscripts(!showTranscripts)}
                  className="px-2.5 py-1 rounded-xl border border-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1"
                >
                  {showTranscripts ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showTranscripts ? "Hide Transcript" : "Show Transcript"}</span>
                </button>
              </div>
            </div>

            {/* Audio Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2 cursor-pointer relative overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(audioCurrentTime / (audioDuration || 1774)) * 100}%` }}
              />
            </div>
          </div>

          {/* Subpart Tabs */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setHoerenPart(p as 1 | 2 | 3)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                  hoerenPart === p
                    ? "bg-blue-600 text-white border-blue-500 shadow-sm"
                    : isDark
                    ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    : "bg-white border-slate-200 text-slate-700 hover:text-slate-900"
                }`}
              >
                Teil {p} ({p === 1 ? "5 Nachrichten (+/-)" : p === 2 ? "10 Interview (+/-)" : "5 Durchsagen (+/-)"})
              </button>
            ))}
          </div>

          {/* Hörverstehen Tasks Container */}
          <div className={`rounded-3xl border p-6 space-y-6 shadow-sm ${
            isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Hörverstehen Teil {hoerenPart} ({hoerenPart === 2 ? "Aufgaben 46-55 (25 Pkt)" : hoerenPart === 1 ? "Aufgaben 41-45 (25 Pkt)" : "Aufgaben 56-60 (25 Pkt)"})
              </span>
              <h2 className="text-xl font-black">
                {hoerenPart === 1 ? data.hoeren.teil1.theme : hoerenPart === 2 ? data.hoeren.teil2.theme : "Durchsagen an öffentlichen Orten"}
              </h2>
              <p className="text-xs text-slate-400">
                {hoerenPart === 1 ? data.hoeren.teil1.instructions : hoerenPart === 2 ? data.hoeren.teil2.instructions : data.hoeren.teil3.instructions}
              </p>
            </div>

            {/* Tasks List */}
            {(() => {
              const currentTasks: TelcHoerenTask[] = hoerenPart === 1 
                ? data.hoeren.teil1.tasks 
                : hoerenPart === 2 
                ? data.hoeren.teil2.tasks 
                : data.hoeren.teil3.tasks;

              return (
                <div className="space-y-4">
                  {currentTasks.map((t) => {
                    const selectedVal = answers[t.taskNumber];
                    const isSelected = selectedVal !== undefined;
                    const isCorrect = selectedVal === t.correct;

                    return (
                      <div
                        key={t.taskNumber}
                        className={`p-4 rounded-2xl border space-y-3 ${
                          isDark ? "bg-slate-950/60 border-slate-800" : "bg-white border-slate-200"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="text-xs sm:text-sm font-bold text-slate-200 leading-snug">
                            <span className="font-mono text-blue-400 mr-2">
                              {t.taskNumber}.
                            </span>
                            {t.statement}
                          </div>

                          {/* + and - buttons matching official telc S30 sheet */}
                          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                            <button
                              type="button"
                              onClick={() => handleSelectAnswer(t.taskNumber, true)}
                              className={`px-3.5 py-1.5 rounded-xl font-bold font-mono text-xs border transition ${
                                selectedVal === true
                                  ? isSubmitted
                                    ? t.correct === true
                                      ? "bg-emerald-600 text-white border-emerald-500"
                                      : "bg-rose-600 text-white border-rose-500"
                                    : "bg-blue-600 text-white border-blue-500"
                                  : isDark
                                  ? "bg-slate-900 border-slate-700 text-slate-300 hover:border-blue-400"
                                  : "bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200"
                              }`}
                            >
                              + Richtig
                            </button>

                            <button
                              type="button"
                              onClick={() => handleSelectAnswer(t.taskNumber, false)}
                              className={`px-3.5 py-1.5 rounded-xl font-bold font-mono text-xs border transition ${
                                selectedVal === false
                                  ? isSubmitted
                                    ? t.correct === false
                                      ? "bg-emerald-600 text-white border-emerald-500"
                                      : "bg-rose-600 text-white border-rose-500"
                                    : "bg-blue-600 text-white border-blue-500"
                                  : isDark
                                  ? "bg-slate-900 border-slate-700 text-slate-300 hover:border-blue-400"
                                  : "bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200"
                              }`}
                            >
                              - Falsch
                            </button>
                          </div>
                        </div>

                        {/* Transcript view when enabled */}
                        {showTranscripts && (
                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 leading-relaxed font-mono">
                            <div className="text-[10px] font-bold text-blue-400 uppercase mb-0.5">Audioskript:</div>
                            {t.transcriptExcerpt}
                          </div>
                        )}

                        {isSubmitted && (
                          <div className={`p-2.5 rounded-xl text-xs font-bold ${
                            isCorrect ? "bg-emerald-950/60 text-emerald-200 border border-emerald-500/50" : "bg-rose-950/60 text-rose-200 border border-rose-500/50"
                          }`}>
                            {isCorrect
                              ? "✓ Richtig gelöst!"
                              : `✕ Falsch! Offizielle Antwort: ${t.correct ? "+ (Richtig)" : "- (Falsch)"}`}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* ─── TAB 4: SCHRIFTLICHER AUSDRUCK (45 PKT) ─── */}
      {/* ────────────────────────────────────────────────────────── */}
      {activeTab === "SCHREIBEN" && (
        <div className="space-y-6">
          <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 shadow-sm ${
            isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Schriftlicher Ausdruck (Brief / E-Mail, 45 Punkte, 30 Minuten)
              </span>
              <h2 className="text-xl font-black">
                Antwort auf die E-Mail eines Freundes
              </h2>
              <p className="text-xs text-slate-400">
                {data.schreiben.instructions}
              </p>
            </div>

            {/* Incoming Email Prompt */}
            <div className={`p-5 rounded-2xl border space-y-3 ${
              isDark ? "bg-slate-950/80 border-slate-800" : "bg-emerald-50/40 border-emerald-200"
            }`}>
              <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                <span className="font-bold text-emerald-300">
                  Von: {data.schreiben.incomingEmail.sender}
                </span>
                <span className="text-slate-400">
                  Betreff: {data.schreiben.incomingEmail.subject}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                {data.schreiben.incomingEmail.body}
              </p>
            </div>

            {/* Guiding Points Checklist */}
            <div className={`p-4 rounded-2xl border space-y-2 ${
              isDark ? "bg-slate-950/60 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Pflicht: Bearbeiten Sie mindestens 3 dieser 4 Leitpunkte:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {data.schreiben.guidingPoints.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Candidate Writing Text Area */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-300">
                  Ihr Antwortbrief (Anrede, Einleitung, Leitpunkte, Schluss, Grußformel):
                </label>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-emerald-400">
                    {writingContent.trim() ? writingContent.trim().split(/\s+/).length : 0} Wörter
                  </span>
                  <span className="text-slate-500">(Ziel: 80-120 Wörter)</span>
                </div>
              </div>

              <textarea
                value={writingContent}
                onChange={(e) => setWritingContent(e.target.value)}
                placeholder="Lieber Fabian, vielen Dank für deine E-Mail! Ich habe mich riesig gefreut zu hören, dass du mich besuchen kommst..."
                rows={10}
                className={`w-full p-4 rounded-2xl border text-sm leading-relaxed font-sans focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition ${
                  isDark
                    ? "bg-slate-950 border-slate-800 text-white placeholder-slate-600"
                    : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                }`}
              />
            </div>

            {/* Model Solution & Grading Criteria Toggle */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowModelSolution(!showModelSolution)}
                className={`px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                  isDark ? "border-slate-800 text-emerald-300 hover:bg-slate-800" : "border-slate-200 text-emerald-700 hover:bg-slate-50"
                }`}
              >
                <Award className="w-4 h-4" />
                <span>{showModelSolution ? "Musterbrief verbergen" : "Offiziellen 45/45 Punkte Musterbrief ansehen"}</span>
              </button>

              <span className="text-xs text-slate-500">
                Bewertung: Aufgabenbewältigung (15) + Kommunikativ (15) + Formal (15) = 45 Pkt
              </span>
            </div>

            {showModelSolution && (
              <div className={`p-5 rounded-2xl border space-y-4 animate-fadeIn ${
                isDark ? "bg-slate-950 border-emerald-500/40 text-slate-200" : "bg-emerald-50 border-emerald-300 text-emerald-950"
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                    Offizielle Musterlösung (Note: 45/45 Punkte)
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {data.schreiben.certifiedModelSolution.wordCount} Wörter
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-line">
                  {data.schreiben.certifiedModelSolution.text}
                </p>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300">
                  <strong>Examiner Breakdown:</strong> {data.schreiben.certifiedModelSolution.breakdown}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* ─── TAB 5: MÜNDLICHER AUSDRUCK (75 PKT) ─── */}
      {/* ────────────────────────────────────────────────────────── */}
      {activeTab === "SPRECHEN" && (
        <div className="space-y-6">
          <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 shadow-sm ${
            isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            <div className="space-y-1">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Mündliche Prüfung (Paarprüfung mit Partner, 75 Punkte, 15 Minuten)
              </span>
              <h2 className="text-xl font-black">
                Mündlicher Ausdruck: 3 Prüfungsteile
              </h2>
              <p className="text-xs text-slate-400">
                {data.sprechen.instructions}
              </p>
            </div>

            {/* Teil 1: Kennenlernen */}
            <div className={`p-5 rounded-2xl border space-y-3 ${
              isDark ? "bg-slate-950/70 border-slate-800" : "bg-slate-50 border-slate-200"
            }`}>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {data.sprechen.teil1.title} ({data.sprechen.teil1.points} Punkte)
                </span>
                <span className="text-xs text-slate-400">ca. 3 Minuten</span>
              </div>
              <p className="text-xs text-slate-300">
                Sprechen Sie über sich anhand folgender Stichpunkte:
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                {data.sprechen.teil1.prompts.map((p, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-rose-300 font-semibold">
                    {p}
                  </span>
                ))}
              </div>
              <div className="pt-2 text-xs text-slate-400">
                <strong>Typische Prüfer-Anschlussfragen:</strong> {data.sprechen.teil1.examinerQuestions.join(" | ")}
              </div>
            </div>

            {/* Teil 2: Ein Thema besprechen (Gruppenreisen) */}
            <div className={`p-5 rounded-2xl border space-y-4 ${
              isDark ? "bg-slate-950/70 border-slate-800" : "bg-slate-50 border-slate-200"
            }`}>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {data.sprechen.teil2.title} ({data.sprechen.teil2.points} Punkte)
                </span>
                <span className="text-xs text-slate-400">ca. 5 Minuten</span>
              </div>

              <h4 className="text-sm font-bold text-amber-300">
                Thema: {data.sprechen.teil2.topic}
              </h4>
              <p className="text-xs text-slate-400">
                {data.sprechen.teil2.instructions}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="font-bold text-rose-400 block">Meinung Teilnehmer A:</span>
                  <p className="text-slate-300 italic">{data.sprechen.teil2.participantAOpinion}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="font-bold text-cyan-400 block">Meinung Teilnehmer B:</span>
                  <p className="text-slate-300 italic">{data.sprechen.teil2.participantBOpinion}</p>
                </div>
              </div>
            </div>

            {/* Teil 3: Gemeinsam eine Aufgabe lösen (Abschiedsparty) */}
            <div className={`p-5 rounded-2xl border space-y-3 ${
              isDark ? "bg-slate-950/70 border-slate-800" : "bg-slate-50 border-slate-200"
            }`}>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {data.sprechen.teil3.title} ({data.sprechen.teil3.points} Punkte)
                </span>
                <span className="text-xs text-slate-400">ca. 5 Minuten</span>
              </div>

              <h4 className="text-sm font-bold text-amber-300">
                Szenario: {data.sprechen.teil3.scenario}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                {data.sprechen.teil3.planningPoints.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-2 text-slate-300">
                    <Check className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* ─── TAB 6: S30 SCORE REPORT & OFFICIAL EVALUATION ─── */}
      {/* ────────────────────────────────────────────────────────── */}
      {activeTab === "SCORE_REPORT" && (
        <div className="space-y-6 animate-fadeIn">
          <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 shadow-xl ${
            isDark ? "bg-slate-900/95 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            {/* Header Result Certificate Banner */}
            <div className={`p-6 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-6 ${
              results.isOverallPassed
                ? "bg-emerald-950/50 border-emerald-500/40 text-emerald-200"
                : "bg-rose-950/50 border-rose-500/40 text-rose-200"
            }`}>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Award className={`w-6 h-6 ${results.isOverallPassed ? "text-emerald-400" : "text-rose-400"}`} />
                  <span className="text-xs font-black uppercase tracking-wider">
                    Offizieller telc B1 Prüfungsbericht (Antwortbogen S30)
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Gesamtergebnis: {results.isOverallPassed ? "BESTANDEN" : "NICHT BESTANDEN"}
                </h2>
                <div className="text-sm font-bold">
                  Prüfungsnote: <strong className="text-amber-300">{results.grade}</strong> (Insgesamt {results.grandTotal} von 300 Punkten)
                </div>
              </div>

              <div className="text-right">
                <div className="text-3xl sm:text-4xl font-black font-mono">
                  {Math.round((results.grandTotal / 300) * 100)}%
                </div>
                <div className="text-xs text-slate-400 font-semibold">
                  telc Bestehensgrenze: 60%
                </div>
              </div>
            </div>

            {/* Score Breakdown Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className={`font-bold border-b ${
                  isDark ? "bg-slate-950 text-slate-300 border-slate-800" : "bg-slate-50 text-slate-700 border-slate-200"
                }`}>
                  <tr>
                    <th className="p-3">Prüfungsteil</th>
                    <th className="p-3">Aufgaben</th>
                    <th className="p-3">Ihre Punkte</th>
                    <th className="p-3">Max. Punkte</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
                  <tr>
                    <td className="p-3 font-bold text-purple-400">1. Leseverstehen</td>
                    <td className="p-3">Teil 1, 2, 3 (1-20)</td>
                    <td className="p-3 font-mono font-bold text-white">{results.totalLesenScore}</td>
                    <td className="p-3 font-mono">75</td>
                    <td className="p-3 text-emerald-400">{results.totalLesenScore >= 45 ? "Bestanden" : "Teilnote"}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-indigo-400">2. Sprachbausteine</td>
                    <td className="p-3">Teil 1, 2 (21-40)</td>
                    <td className="p-3 font-mono font-bold text-white">{results.totalSprachbausteineScore}</td>
                    <td className="p-3 font-mono">30</td>
                    <td className="p-3 text-emerald-400">{results.totalSprachbausteineScore >= 18 ? "Bestanden" : "Teilnote"}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-blue-400">3. Hörverstehen</td>
                    <td className="p-3">Teil 1, 2, 3 (41-60)</td>
                    <td className="p-3 font-mono font-bold text-white">{results.totalHoerenScore}</td>
                    <td className="p-3 font-mono">75</td>
                    <td className="p-3 text-emerald-400">{results.totalHoerenScore >= 45 ? "Bestanden" : "Teilnote"}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-emerald-400">4. Schriftlicher Ausdruck</td>
                    <td className="p-3">E-Mail ({results.wordsCount} Wörter)</td>
                    <td className="p-3 font-mono font-bold text-white">{results.estimatedWritingScore}</td>
                    <td className="p-3 font-mono">45</td>
                    <td className="p-3 text-emerald-400">{results.estimatedWritingScore >= 27 ? "Bestanden" : "Teilnote"}</td>
                  </tr>
                  <tr className="bg-slate-950/80 font-bold border-t-2 border-slate-700">
                    <td className="p-3 text-white">SCHRIFTLICHE PRÜFUNG GESAMT</td>
                    <td className="p-3">Lesen + Bausteine + Hören + Brief</td>
                    <td className="p-3 font-mono text-amber-300 text-base">{results.totalWrittenScore}</td>
                    <td className="p-3 font-mono text-base">225</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-black ${
                        results.isWrittenPassed ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30" : "bg-rose-950 text-rose-300 border border-rose-500/30"
                      }`}>
                        {results.isWrittenPassed ? "✓ BESTANDEN (min. 135)" : "✕ NICHT BESTANDEN (<135)"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-rose-400">5. Mündlicher Ausdruck</td>
                    <td className="p-3">Teil 1, 2, 3 (Paarprüfung)</td>
                    <td className="p-3 font-mono font-bold text-white">{results.oralEstimate}</td>
                    <td className="p-3 font-mono">75</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-black ${
                        results.isOralPassed ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30" : "bg-rose-950 text-rose-300 border border-rose-500/30"
                      }`}>
                        {results.isOralPassed ? "✓ BESTANDEN (min. 45)" : "✕ NICHT BESTANDEN (<45)"}
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-purple-950/40 font-black text-sm border-t-2 border-purple-500/40">
                    <td className="p-3 text-purple-200">GESAMTPUNKTE & ZERTIFIKAT</td>
                    <td className="p-3">Schriftlich + Mündlich</td>
                    <td className="p-3 font-mono text-purple-300 text-lg">{results.grandTotal}</td>
                    <td className="p-3 font-mono text-lg">300</td>
                    <td className="p-3 text-amber-300 font-extrabold">{results.grade}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Official telc Pass Rules Explainer */}
            <div className={`p-5 rounded-2xl border space-y-2 text-xs ${
              isDark ? "bg-slate-950/80 border-slate-800 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"
            }`}>
              <div className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Offizielle telc B1 Prüfungsregeln (Bestehensbedingungen):</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 leading-relaxed">
                <li>
                  Um das Zertifikat Deutsch / telc Deutsch B1 zu erhalten, müssen Sie <strong>sowohl die schriftliche Prüfung (mindestens 135 Punkte) als auch die mündliche Prüfung (mindestens 45 Punkte)</strong> bestehen.
                </li>
                <li>
                  Haben Sie nur einen Teil (schriftlich oder mündlich) bestanden, kann der andere Teil <strong>bis zum Ablauf des folgenden Kalenderjahres</strong> wiederholt werden.
                </li>
                <li>
                  Es gibt <strong>keinen Punktabzug für falsche Antworten</strong>. Bei Multiple-Choice und Richtig/Falsch Aufgaben empfiehlt sich immer eine Antwortauswahl.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
