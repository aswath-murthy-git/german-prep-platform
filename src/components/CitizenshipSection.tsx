"use client";

import React, { useState, useEffect, useMemo } from "react";
import rawData from "@/data/citizenship_data.json";
import { CitizenshipData, CitizenshipQuestion } from "@/types";
import { useUser } from "@/context/UserContext";
import { AudioVoiceButton } from "./AudioVoiceButton";
import { 
  CheckCircle2, 
  XCircle, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  RotateCcw, 
  Trophy, 
  HelpCircle, 
  Filter, 
  Languages, 
  Search,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Target,
  ShieldCheck,
  Award,
  ArrowRight,
  Calendar,
  Hash,
  BookOpen
} from "lucide-react";
import confetti from "canvas-confetti";

const citizenshipData = rawData as unknown as CitizenshipData;

export const CitizenshipSection: React.FC = () => {
  const { 
    profile, 
    updateProfile, 
    recordCitizenshipExamResult, 
    toggleBookmarkQuestion, 
    recordQuestionAnswer 
  } = useUser();

  const [activeTab, setActiveTab] = useState<"SIMULATION" | "PRACTICE" | "TOPICS" | "FAILS" | "STRATEGY" | "CLASSIFIER">("SIMULATION");
  const [bilingualMode, setBilingualMode] = useState<boolean>(false);

  // Simulation State
  const [examActive, setExamActive] = useState<boolean>(false);
  const [examQuestions, setExamQuestions] = useState<CitizenshipQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(3600); // 60 minutes
  const [examFinished, setExamFinished] = useState<boolean>(false);
  const [examStartTime, setExamStartTime] = useState<number>(0);

  // Practice / Browser State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [revealedEnglish, setRevealedEnglish] = useState<Record<number, boolean>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const PAGE_SIZE = 10;

  // Reset to first 10-question section whenever category, search, or tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, activeTab]);

  // 16 Federal States list
  const stateList = useMemo(() => {
    return Object.keys(citizenshipData.states).map(slug => ({
      slug,
      name_de: citizenshipData.states[slug].name_de,
      name_en: citizenshipData.states[slug].name_en
    }));
  }, []);

  // Timer countdown for exam
  useEffect(() => {
    if (!examActive || examFinished) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [examActive, examFinished]);

  // Start a new 33-question simulation
  const startExam = () => {
    const generalPool = [...citizenshipData.general];
    // Shuffle general
    const shuffledGeneral = generalPool.sort(() => 0.5 - Math.random()).slice(0, 30);

    // Pick 3 from user's selected state
    const curState = citizenshipData.states[profile.selectedState] || citizenshipData.states["berlin"];
    const statePool = [...(curState?.questions || [])];
    const shuffledState = statePool.sort(() => 0.5 - Math.random()).slice(0, 3);

    const fullExam = [...shuffledGeneral, ...shuffledState];
    setExamQuestions(fullExam);
    setSelectedAnswers({});
    setCurrentIdx(0);
    setTimeLeft(3600);
    setExamActive(true);
    setExamFinished(false);
    setExamStartTime(Date.now());
  };

  const handleSelectAnswer = (qId: number, optionIdx: number) => {
    if (examFinished && examActive) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    
    // In practice modes, record answer immediately for spaced repetition
    if (!examActive) {
      const q = allFederalQuestions.find(item => item.id === qId);
      if (q) {
        recordQuestionAnswer(qId, optionIdx === q.correct);
      }
    }
  };

  const finishExam = () => {
    let score = 0;
    examQuestions.forEach(q => {
      const userAns = selectedAnswers[q.id];
      const isCorrect = userAns === q.correct;
      if (isCorrect) score += 1;
      recordQuestionAnswer(q.id, isCorrect);
    });

    const timeSpent = Math.round((Date.now() - examStartTime) / 1000);
    recordCitizenshipExamResult(score, 33, profile.selectedState, timeSpent);
    setExamFinished(true);

    if (score >= 17) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // All 460 questions across all 16 states combined for universal lookup
  const allFederalQuestions = useMemo(() => {
    const list: CitizenshipQuestion[] = [...citizenshipData.general];
    for (const sSlug in citizenshipData.states) {
      list.push(...citizenshipData.states[sSlug].questions);
    }
    return list;
  }, []);

  // Targeted 310 questions strictly for the user's selected state (300 General + 10 State Questions)
  const targetedQuestions = useMemo(() => {
    const list: CitizenshipQuestion[] = [...citizenshipData.general];
    const curState = citizenshipData.states[profile.selectedState] || citizenshipData.states["brandenburg"] || citizenshipData.states["berlin"];
    if (curState && curState.questions) {
      list.push(...curState.questions);
    }
    return list;
  }, [profile.selectedState]);

  // Question Classifier Helpers
  const yearRegex = /\b(18\d{2}|19\d{2}|20\d{2})\b/;
  const numberRegex = /^(\d+|einer?|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|elf|zwölf|sechzehn|achtzehn)\b/i;

  const isYearQuestion = (q: CitizenshipQuestion) => {
    const correctOpt = q.options[q.correct]?.de || "";
    const isYearPrompt = /wann|in welchem jahr|an welchem tag/i.test(q.de);
    return yearRegex.test(correctOpt) || (isYearPrompt && q.options.some(o => yearRegex.test(o.de)));
  };

  const isNumberQuestion = (q: CitizenshipQuestion) => {
    if (isYearQuestion(q)) return false;
    const correctOpt = q.options[q.correct]?.de || "";
    const isNumberPrompt = /wie viele|wie lange|ab welchem alter|welches alter/i.test(q.de);
    return numberRegex.test(correctOpt.trim()) || /%|prozent|jahre|monate|wahlperiode/i.test(correctOpt) || isNumberPrompt;
  };

  // Filtered questions for Practice / Topics browser
  const filteredQuestions = useMemo(() => {
    return targetedQuestions.filter(q => {
      // Tab check
      if (activeTab === "FAILS") {
        if (!profile.failedQuestionIds.includes(q.id)) return false;
      }

      // Category check
      if (selectedCategory !== "ALL") {
        if (selectedCategory === "STATE") {
          if (!q.stateSlug) return false;
          if (q.stateSlug !== profile.selectedState) return false;
        } else if (selectedCategory === "YEARS") {
          if (!isYearQuestion(q)) return false;
        } else if (selectedCategory === "NUMBERS") {
          if (!isNumberQuestion(q)) return false;
        } else if (selectedCategory === "TEXT_PRINCIPLES") {
          if (isYearQuestion(q) || isNumberQuestion(q) || q.stateSlug) return false;
        } else if (q.category !== selectedCategory) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchDe = q.de.toLowerCase().includes(query);
        const matchEn = q.en.toLowerCase().includes(query);
        const matchOptions = q.options.some(o => o.de.toLowerCase().includes(query) || o.en.toLowerCase().includes(query));
        const matchId = String(q.id) === query;
        if (!matchDe && !matchEn && !matchOptions && !matchId) return false;
      }

      return true;
    });
  }, [targetedQuestions, activeTab, selectedCategory, searchQuery, profile.selectedState, profile.failedQuestionIds]);

  // 10-Question pagination calculations for Normal / Topics mode
  const totalQuestions = filteredQuestions.length;
  const totalPages = Math.max(1, Math.ceil(totalQuestions / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, totalQuestions);
  const pagedQuestions = useMemo(() => {
    return filteredQuestions.slice(startIndex, endIndex);
  }, [filteredQuestions, startIndex, endIndex]);

  const toggleEnglish = (id: number) => {
    setRevealedEnglish(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const curExamQ = examQuestions[currentIdx];
  const examScore = useMemo(() => {
    if (!examFinished) return 0;
    return examQuestions.filter(q => selectedAnswers[q.id] === q.correct).length;
  }, [examFinished, examQuestions, selectedAnswers]);

  return (
    <div className="space-y-6">
      {/* Top Banner & State Selector */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-300 mb-3">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Einbürgerungstest & Leben in Deutschland (BAMF)</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              German Citizenship Exam <span className="text-amber-400">Pass Engine</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Targeted catalog: 300 general questions + 10 state questions for{" "}
              <strong className="text-amber-300">
                {citizenshipData.states[profile.selectedState]?.name_de || "Brandenburg"}
              </strong>{" "}
              (310 total). On the official exam, you receive <strong>30 general + 3 state questions = 33 questions</strong>. You only need <strong>17 out of 33 correct</strong> to pass!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Federal State Selector */}
            <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-2 rounded-xl border border-slate-700">
              <label htmlFor="state-select" className="text-xs font-medium text-slate-400">Bundesland:</label>
              <select
                id="state-select"
                value={profile.selectedState}
                onChange={(e) => updateProfile({ selectedState: e.target.value })}
                className="bg-transparent text-sm font-semibold text-amber-300 focus:outline-none cursor-pointer"
              >
                {stateList.map(s => (
                  <option key={s.slug} value={s.slug} className="bg-slate-900 text-slate-200">
                    {s.name_de} ({s.name_en})
                  </option>
                ))}
              </select>
            </div>

            {/* Bilingual Toggle Button */}
            <button
              onClick={() => setBilingualMode(!bilingualMode)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                bilingualMode
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/10"
                  : "bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200"
              }`}
            >
              <Languages className="w-4 h-4 text-amber-400" />
              <span>{bilingualMode ? "Bilingual (DE + EN)" : "German Only (Tap for EN)"}</span>
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-slate-800">
          <button
            onClick={() => { setActiveTab("SIMULATION"); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "SIMULATION"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>33-Question Mock Simulation</span>
          </button>

          <button
            onClick={() => { setActiveTab("TOPICS"); setExamActive(false); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "TOPICS"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60"
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Targeted 310 Questions Catalog</span>
          </button>

          <button
            onClick={() => { setActiveTab("CLASSIFIER"); setExamActive(false); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "CLASSIFIER"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Dates, Numbers & Text Vault</span>
          </button>

          <button
            onClick={() => { setActiveTab("FAILS"); setExamActive(false); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "FAILS"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60"
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Review Mistakes ({profile.failedQuestionIds.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab("STRATEGY"); setExamActive(false); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "STRATEGY"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60"
            }`}
          >
            <Target className="w-4 h-4" />
            <span>17/33 Pass Blueprint & Strategy</span>
          </button>
        </div>
      </div>

      {/* TAB 1: 33-QUESTION MOCK SIMULATION */}
      {activeTab === "SIMULATION" && (
        <div className="space-y-6">
          {!examActive ? (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 text-center max-w-2xl mx-auto space-y-6 shadow-xl">
              <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-amber-400">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Official BAMF Exam Simulation</h3>
                <p className="text-slate-400 text-sm mt-2">
                  Standard format: 30 general questions + 3 questions for your chosen state (
                  <span className="text-amber-400 font-semibold">
                    {citizenshipData.states[profile.selectedState]?.name_de}
                  </span>
                  ). 60-minute timer.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-left">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-500 block">Questions</span>
                  <span className="text-lg font-bold text-white">33</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-500 block">Pass Criteria</span>
                  <span className="text-lg font-bold text-emerald-400">17 / 33</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-500 block">Time Limit</span>
                  <span className="text-lg font-bold text-amber-400">60 Min</span>
                </div>
              </div>

              <button
                onClick={startExam}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-amber-500/25 transition-all text-base"
              >
                Start Official Simulation Now ✦
              </button>

              {profile.citizenshipExamHistory.length > 0 && (
                <div className="pt-6 border-t border-slate-800 text-left">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Recent Mock Results:
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("Clear all citizenship mock test attempts and start fresh?")) {
                          updateProfile({ citizenshipExamHistory: [] });
                        }
                      }}
                      className="text-[11px] text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1 transition"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Clear Attempts ↺</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {profile.citizenshipExamHistory.slice(0, 3).map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          {item.passed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-400" />
                          )}
                          <span className="font-semibold text-slate-200">
                            {item.score} / {item.total} ({Math.round((item.score / item.total) * 100)}%)
                          </span>
                          <span className="text-slate-500">
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full font-bold ${
                          item.passed ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
                        }`}>
                          {item.passed ? "BESTANDEN (PASS)" : "NICHT BESTANDEN"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Active Simulation View */
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-2xl space-y-6">
              {/* Simulation Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-amber-500/10 text-amber-300 font-bold rounded-lg text-sm border border-amber-500/20">
                    Question {currentIdx + 1} of 33
                  </span>
                  <span className="text-xs text-slate-400">
                    {curExamQ?.stateSlug ? `State Question (${curExamQ.stateName})` : curExamQ?.category}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono font-bold text-sm ${
                    timeLeft < 300 ? "bg-rose-500/20 text-rose-400 animate-pulse" : "bg-slate-950 text-amber-400"
                  }`}>
                    <Clock className="w-4 h-4" />
                    <span>{formatTimer(timeLeft)}</span>
                  </div>

                  {!examFinished ? (
                    <button
                      onClick={finishExam}
                      className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition"
                    >
                      Finish Exam
                    </button>
                  ) : (
                    <button
                      onClick={startExam}
                      className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition"
                    >
                      New Exam
                    </button>
                  )}
                </div>
              </div>

              {/* Score Bar if Exam Finished */}
              {examFinished && (
                <div className={`p-5 rounded-2xl border ${
                  examScore >= 17 ? "bg-emerald-950/40 border-emerald-500/40" : "bg-rose-950/40 border-rose-500/40"
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-extrabold text-white flex items-center gap-2">
                        {examScore >= 17 ? (
                          <>
                            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                            <span>Congratulations! You Passed! (Bestanden)</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-6 h-6 text-rose-400" />
                            <span>Did Not Pass (Nicht bestanden)</span>
                          </>
                        )}
                      </h4>
                      <p className="text-sm text-slate-300 mt-1">
                        Your Score: <span className="font-bold text-white">{examScore} out of 33</span> (
                        {Math.round((examScore / 33) * 100)}%). Required to pass: 17 correct.
                      </p>
                    </div>
                    <button
                      onClick={startExam}
                      className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm"
                    >
                      Take Another Simulation ↻
                    </button>
                  </div>
                </div>
              )}

              {/* Current Question Body */}
              {curExamQ && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                        {curExamQ.de}
                      </h3>
                      <div className="flex items-center gap-2 shrink-0">
                        <AudioVoiceButton text={curExamQ.de} />
                        <button
                          onClick={() => toggleBookmarkQuestion(curExamQ.id)}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-amber-400"
                          title="Bookmark question"
                        >
                          {profile.bookmarkedQuestionIds.includes(curExamQ.id) ? (
                            <BookmarkCheck className="w-4 h-4 text-amber-400" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {(bilingualMode || revealedEnglish[curExamQ.id]) && (
                      <p className="text-sm font-medium text-amber-300/90 bg-amber-500/5 p-2.5 rounded-xl border border-amber-500/20">
                        {curExamQ.en}
                      </p>
                    )}

                    {!bilingualMode && !revealedEnglish[curExamQ.id] && (
                      <button
                        onClick={() => toggleEnglish(curExamQ.id)}
                        className="text-xs text-amber-400/80 hover:text-amber-300 underline font-medium"
                      >
                        Translate question to English 🇬🇧
                      </button>
                    )}
                  </div>

                  {/* Question Image if any */}
                  {curExamQ.image && (
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 inline-block">
                      <img
                        src={curExamQ.image}
                        alt="Question Diagram"
                        className="max-h-56 max-w-full rounded object-contain mx-auto"
                      />
                    </div>
                  )}

                  {/* Options List */}
                  <div className="grid grid-cols-1 gap-3">
                    {curExamQ.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[curExamQ.id] === optIdx;
                      const isCorrect = optIdx === curExamQ.correct;
                      
                      let btnStyle = "bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-200";

                      if (examFinished) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold";
                        } else if (isSelected && !isCorrect) {
                          btnStyle = "bg-rose-950/60 border-rose-500 text-rose-200 font-semibold";
                        }
                      } else if (isSelected) {
                        btnStyle = "bg-amber-500/15 border-amber-500 text-amber-200 font-semibold shadow-sm shadow-amber-500/10";
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={examFinished}
                          onClick={() => handleSelectAnswer(curExamQ.id, optIdx)}
                          className={`w-full p-4 rounded-xl border text-left transition flex items-start gap-3.5 ${btnStyle}`}
                        >
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                            isSelected
                              ? "bg-amber-500 text-slate-950 border-amber-400"
                              : "bg-slate-900 border-slate-700 text-slate-400"
                          }`}>
                            {["A", "B", "C", "D"][optIdx]}
                          </span>
                          <div className="space-y-1">
                            <div className="text-sm sm:text-base leading-relaxed">{opt.de}</div>
                            {(bilingualMode || revealedEnglish[curExamQ.id]) && (
                              <div className="text-xs text-slate-400">{opt.en}</div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation after finishing */}
                  {examFinished && (curExamQ.explanation_de || curExamQ.explanation_en) && (
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                      <strong className="text-amber-400 block font-semibold">Explanation / Hintergrund:</strong>
                      {curExamQ.explanation_de && <p>{curExamQ.explanation_de}</p>}
                      {curExamQ.explanation_en && <p className="text-slate-400">{curExamQ.explanation_en}</p>}
                    </div>
                  )}

                  {/* Navigation Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <button
                      onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                      disabled={currentIdx === 0}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    {/* Progress grid dots */}
                    <div className="hidden md:flex flex-wrap gap-1 max-w-md justify-center">
                      {examQuestions.map((q, idx) => {
                        const answered = selectedAnswers[q.id] !== undefined;
                        let dotClass = "bg-slate-800 text-slate-400";
                        if (examFinished) {
                          dotClass = selectedAnswers[q.id] === q.correct ? "bg-emerald-500 text-slate-950" : "bg-rose-500 text-white";
                        } else if (answered) {
                          dotClass = "bg-amber-500 text-slate-950";
                        }
                        if (idx === currentIdx) {
                          dotClass += " ring-2 ring-white";
                        }
                        return (
                          <button
                            key={idx}
                            onClick={() => setCurrentIdx(idx)}
                            className={`w-6 h-6 text-[10px] font-bold rounded-md flex items-center justify-center transition ${dotClass}`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentIdx(prev => Math.min(examQuestions.length - 1, prev + 1))}
                      disabled={currentIdx === examQuestions.length - 1}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2 & 3: COMPLETE 460 QUESTIONS CATALOG & MISTAKES REVIEW */}
      {(activeTab === "TOPICS" || activeTab === "FAILS") && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Search German or English keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Categories ({filteredQuestions.length})</option>
                <option value="YEARS">📅 Historical Years & Dates (15 Qs)</option>
                <option value="NUMBERS">🔢 Numbers, Ages & Quotas (31 Qs)</option>
                <option value="STATE">🏛️ State Specific ({citizenshipData.states[profile.selectedState]?.name_de})</option>
                <option value="TEXT_PRINCIPLES">📜 Core Principles & Concepts</option>
                <option value="Politik in der Demokratie">Politik in der Demokratie (Q1-100)</option>
                <option value="Geschichte und Verantwortung">Geschichte und Verantwortung (Q101-200)</option>
                <option value="Mensch und Gesellschaft">Mensch und Gesellschaft (Q201-300)</option>
              </select>

              {Object.keys(selectedAnswers).length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Reset all answered practice questions and start fresh?")) {
                      setSelectedAnswers({});
                    }
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-950 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-800 hover:border-rose-500/40 text-xs font-semibold transition flex items-center gap-1"
                  title="Clear all answered practice questions"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
                  <span>Reset All ({Object.keys(selectedAnswers).length}) ↺</span>
                </button>
              )}

              <span className="text-xs text-slate-500 ml-auto">
                Showing <strong>{filteredQuestions.length}</strong> questions
              </span>
            </div>
          </div>

          {filteredQuestions.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
              <HelpCircle className="w-8 h-8 mx-auto text-slate-600" />
              <p className="font-semibold text-slate-300">No questions found</p>
              <p className="text-xs">
                {activeTab === "FAILS"
                  ? "Great job! You currently have zero recorded mistakes."
                  : "Try adjusting your search query or category filter."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* TOP 10-QUESTION SECTION NAVIGATOR */}
              <div className="bg-slate-900 border border-slate-800 p-3 sm:p-4 rounded-2xl space-y-3 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-black text-xs border border-amber-500/20">
                      10
                    </span>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>Section {safePage} of {totalPages}</span>
                        <span className="text-[10px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                          Questions {startIndex + 1} - {endIndex}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        10 questions per section: bite-sized practice without 100-question fatigue
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {pagedQuestions.some(q => selectedAnswers[q.id] !== undefined) && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAnswers(prev => {
                            const next = { ...prev };
                            pagedQuestions.forEach(q => {
                              delete next[q.id];
                            });
                            return next;
                          });
                        }}
                        className="px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/40 hover:border-rose-500 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                        title="Clear answers for these 10 questions to redo them"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
                        <span>Redo Section ↺</span>
                      </button>
                    )}

                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={safePage === 1}
                      className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-950 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1 transition border border-slate-800"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Prev 10</span>
                    </button>
                    <span className="text-xs font-bold text-slate-400 px-2">
                      {safePage} / {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={safePage >= totalPages}
                      className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-950 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1 transition border border-slate-800"
                    >
                      <span>Next 10</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Horizontal Quick Jump Pills */}
                {totalPages > 1 && (
                  <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-800/80 pb-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((secNum) => {
                      const qStart = (secNum - 1) * PAGE_SIZE + 1;
                      const qEnd = Math.min(secNum * PAGE_SIZE, totalQuestions);
                      const isCur = secNum === safePage;
                      return (
                        <button
                          key={secNum}
                          onClick={() => setCurrentPage(secNum)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition flex items-center gap-1 shrink-0 ${
                            isCur
                              ? "bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/20 font-black"
                              : "bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800/80"
                          }`}
                        >
                          <span>Sec {secNum}</span>
                          <span className={`text-[10px] ${isCur ? "text-slate-950 font-bold" : "text-slate-500"}`}>
                            ({qStart}-{qEnd})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 10-QUESTION CARD GRID */}
              <div className="grid grid-cols-1 gap-4">
                {pagedQuestions.map((q) => {
                  const userChoice = selectedAnswers[q.id];
                  const hasAnswered = userChoice !== undefined;
                  const isCorrect = userChoice === q.correct;
                  const showEnglish = bilingualMode || revealedEnglish[q.id];

                  return (
                    <div
                      key={q.id}
                      className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 lg:p-6 shadow-md transition space-y-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-md border border-amber-500/20">
                              {q.stateSlug ? `${q.stateName} · Frage ${q.id}` : `Frage ${q.id}`}
                            </span>
                            <span className="text-xs text-slate-500">
                              {q.stateSlug ? "Landesfrage" : q.category}
                            </span>
                          </div>
                          <h4 className="text-base sm:text-lg font-bold text-white pt-1">
                            {q.de}
                          </h4>
                          {showEnglish && (
                            <p className="text-sm font-medium text-amber-300/80 bg-amber-500/5 p-2 rounded-lg border border-amber-500/10 mt-1">
                              {q.en}
                            </p>
                          )}
                          {!showEnglish && (
                            <button
                              onClick={() => toggleEnglish(q.id)}
                              className="text-xs text-amber-400 hover:underline pt-1"
                            >
                              Show English Translation 🇬🇧
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {hasAnswered && (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedAnswers(prev => {
                                  const next = { ...prev };
                                  delete next[q.id];
                                  return next;
                                });
                              }}
                              className="text-[11px] text-slate-400 hover:text-amber-300 font-semibold px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 flex items-center gap-1 transition"
                              title="Reset this question and try again"
                            >
                              <RotateCcw className="w-3 h-3 text-amber-400" />
                              <span>Redo ↺</span>
                            </button>
                          )}
                          <AudioVoiceButton text={q.de} />
                          <button
                            onClick={() => toggleBookmarkQuestion(q.id)}
                            className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-amber-400"
                          >
                            {profile.bookmarkedQuestionIds.includes(q.id) ? (
                              <BookmarkCheck className="w-4 h-4 text-amber-400" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {q.image && (
                        <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 inline-block">
                          <img
                            src={q.image}
                            alt="Question Visual"
                            className="max-h-48 rounded object-contain"
                          />
                        </div>
                      )}

                      {/* Options list */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {q.options.map((opt, optIdx) => {
                          const isPicked = userChoice === optIdx;
                          const isThisCorrect = optIdx === q.correct;
                          
                          let optStyle = "bg-slate-950 hover:bg-slate-800/60 border-slate-800/80 text-slate-200";

                          if (hasAnswered) {
                            if (isThisCorrect) {
                              optStyle = "bg-emerald-950/60 border-emerald-500/80 text-emerald-200 font-semibold";
                            } else if (isPicked && !isThisCorrect) {
                              optStyle = "bg-rose-950/60 border-rose-500/80 text-rose-200 font-semibold";
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectAnswer(q.id, optIdx)}
                              className={`p-3 rounded-xl border text-left text-xs sm:text-sm flex items-start gap-2.5 transition ${optStyle}`}
                            >
                              <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 border ${
                                hasAnswered && isThisCorrect
                                  ? "bg-emerald-500 text-slate-950 border-emerald-400"
                                  : hasAnswered && isPicked && !isThisCorrect
                                  ? "bg-rose-500 text-white border-rose-400"
                                  : "bg-slate-900 border-slate-700 text-slate-400"
                              }`}>
                                {["A", "B", "C", "D"][optIdx]}
                              </span>
                              <div>
                                <div>{opt.de}</div>
                                {showEnglish && (
                                  <div className="text-[11px] text-slate-400 mt-0.5">{opt.en}</div>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Quick Explanation if answered */}
                      {hasAnswered && (q.explanation_de || q.explanation_en) && (
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs text-slate-300">
                          <strong className="text-amber-400">Erklärung: </strong>
                          <span>{q.explanation_de || q.explanation_en}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* BOTTOM 10-QUESTION SECTION NAVIGATOR */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-lg mt-6">
                <button
                  onClick={() => {
                    setCurrentPage(prev => Math.max(1, prev - 1));
                    window.scrollTo({ top: 300, behavior: "smooth" });
                  }}
                  disabled={safePage === 1}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous 10 Questions</span>
                </button>

                <div className="flex items-center gap-3">
                  {pagedQuestions.some(q => selectedAnswers[q.id] !== undefined) && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAnswers(prev => {
                          const next = { ...prev };
                          pagedQuestions.forEach(q => {
                            delete next[q.id];
                          });
                          return next;
                        });
                        window.scrollTo({ top: 300, behavior: "smooth" });
                      }}
                      className="px-3 py-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/40 hover:border-rose-500 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                      title="Clear answers for these 10 questions to redo them"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
                      <span>Redo This Section ↺</span>
                    </button>
                  )}

                  <div className="text-xs font-bold text-slate-300 text-center">
                    <span className="text-amber-400">Section {safePage}</span> of {totalPages}
                    <span className="text-slate-500 block text-[11px] font-normal">
                      Showing questions {startIndex + 1} - {endIndex} of {totalQuestions}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCurrentPage(prev => Math.min(totalPages, prev + 1));
                    window.scrollTo({ top: 300, behavior: "smooth" });
                  }}
                  disabled={safePage >= totalPages}
                  className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-30 disabled:from-slate-800 disabled:to-slate-800 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 transition shadow-md shadow-amber-500/10"
                >
                  <span>Next 10 Questions</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: DATES, NUMBERS & TEXT MEMORY CLASSIFIER */}
      {activeTab === "CLASSIFIER" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
          {/* Header */}
          <div className="border-b border-slate-800 pb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-300 mb-2">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Pattern Recognition & Cognitive Chunking</span>
            </div>
            <h3 className="text-2xl font-black text-white">
              The Memory Vault: Classify by Years, Numbers & State Facts
            </h3>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              ADHD Superpower Hack: Instead of memorizing 300 random questions, group the answers by <strong>Historical Years</strong>, <strong>Critical Numbers/Ages</strong>, and <strong>State Facts</strong>. You eliminate confusion between similar numbers or dates and master 56+ high-frequency questions in under 45 minutes!
            </p>
          </div>

          {/* Classification Quick Filter Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">1. Years & Dates</span>
                <Calendar className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-black text-white">15 <span className="text-sm font-normal text-slate-400">Qs</span></div>
              <div className="text-xs text-slate-400">1933, 1945, 1949, 1961, 1989, 1990</div>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("YEARS");
                  setActiveTab("TOPICS");
                }}
                className="w-full mt-2 py-2 px-3 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <span>Drill 15 Year Questions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-blue-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400 font-bold">2. Numbers & Quotas</span>
                <Hash className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-3xl font-black text-white">31 <span className="text-sm font-normal text-slate-400">Qs</span></div>
              <div className="text-xs text-slate-400">16 states, 4 yrs, 5 yrs, 5%, 18 age</div>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("NUMBERS");
                  setActiveTab("TOPICS");
                }}
                className="w-full mt-2 py-2 px-3 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/40 text-blue-300 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <span>Drill 31 Number Questions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">3. {citizenshipData.states[profile.selectedState]?.name_de}</span>
                <Award className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-black text-white">10 <span className="text-sm font-normal text-slate-400">Qs</span></div>
              <div className="text-xs text-slate-400">Wappen, Potsdam, Roter Adler</div>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("STATE");
                  setActiveTab("TOPICS");
                }}
                className="w-full mt-2 py-2 px-3 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <span>Drill 10 State Questions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">4. Core Principles</span>
                <BookOpen className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-3xl font-black text-white">254 <span className="text-sm font-normal text-slate-400">Qs</span></div>
              <div className="text-xs text-slate-400">Grundrechte, Kanzler, Bundestag</div>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("TEXT_PRINCIPLES");
                  setActiveTab("TOPICS");
                }}
                className="w-full mt-2 py-2 px-3 bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/40 text-purple-300 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <span>Drill Core Principles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Section 1: The Chronological Timeline (1933 - 2002) */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  <span>The Master Historical Timeline (11 Key Dates to Memorize)</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Every historical year question in the BAMF exam centers around these 11 pivotal milestones.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("YEARS");
                  setActiveTab("TOPICS");
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition flex items-center gap-1.5 shrink-0"
              >
                <span>Practice 15 Year Questions ➔</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {[
                { year: "1933", title: "NS-Diktatur beginnt", desc: "Adolf Hitler wird Reichskanzler; die nationalsozialistische Diktatur wird errichtet." },
                { year: "1938 (9. Nov)", title: "Reichspogromnacht", desc: "Systematische Zerstörung jüdischer Synagogen, Geschäfte und Wohnungen durch das NS-Regime." },
                { year: "1945 (8. Mai)", title: "Ende des Zweiten Weltkriegs", desc: "Bedingungslose Kapitulation der deutschen Wehrmacht in Europa." },
                { year: "1948 - 1949", title: "Berliner Luftbrücke", desc: "West-Alliierte versorgen West-Berlin mit 'Rosinenbombern' während der sowjetischen Blockade." },
                { year: "1949 (23. Mai)", title: "Gründung der BRD (Grundgesetz)", desc: "Verkündung des Grundgesetzes in Bonn; am 7. Oktober 1949 folgt die Gründung der DDR." },
                { year: "1953 (17. Juni)", title: "Volksaufstand in der DDR", desc: "Arbeiter streiken gegen Normerhöhungen; sowjetische Panzer schlagen den Aufstand blutig nieder." },
                { year: "1961 (13. Aug)", title: "Bau der Berliner Mauer", desc: "Die DDR-Führung riegelt West-Berlin durch Mauer und Stacheldraht hermetisch ab." },
                { year: "1963", title: "Élysée-Vertrag", desc: "Deutsch-französischer Freundschaftsvertrag zwischen Charles de Gaulle und Konrad Adenauer." },
                { year: "1989 (9. Nov)", title: "Fall der Berliner Mauer", desc: "Die Friedliche Revolution in der DDR bringt die Mauer nach 28 Jahren zu Fall." },
                { year: "1990 (3. Okt)", title: "Deutsche Wiedervereinigung", desc: "Beitritt der fünf ostdeutschen Länder zur Bundesrepublik Deutschland; Tag der Deutschen Einheit." },
                { year: "2002", title: "Euro-Bargeldeinführung", desc: "Euro-Münzen und Geldscheine ersetzen die Deutsche Mark (DM) als offizielles Zahlungsmittel." }
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3 hover:border-amber-500/40 transition">
                  <div className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono font-black text-xs shrink-0">
                    {item.year}
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">{item.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Numbers, Ages & Quotas Cheat Sheet */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Hash className="w-5 h-5 text-blue-400" />
                  <span>The Critical Numbers, Ages & Quotas Cheat Sheet</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Learn these specific values to answer all numeric questions without doubt.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("NUMBERS");
                  setActiveTab("TOPICS");
                }}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-slate-950 font-black rounded-xl text-xs transition flex items-center gap-1.5 shrink-0"
              >
                <span>Practice 31 Number Questions ➔</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {[
                { number: "16", label: "Bundesländer", note: "Deutschland ist ein Bundesstaat aus 16 Bundesländern." },
                { number: "18", label: "Volljährigkeit & Wahlalter", note: "Wahlalter für den Deutschen Bundestag; uneingeschränkt geschäftsfähig." },
                { number: "16", label: "Kommunal-/Europawahl", note: "In Brandenburg und bei Europawahlen darf man ab 16 Jahren wählen." },
                { number: "4 Jahre", label: "Amtszeit Bundestag", note: "Der Deutsche Bundestag wird regelmäßig für 4 Jahre gewählt." },
                { number: "5 Jahre", label: "Amtszeit Bundespräsident", note: "Der Bundespräsident wird für 5 Jahre gewählt (max. 1 Wiederwahl = 10 Jahre)." },
                { number: "5 %", label: "Sperrklausel (5%-Hürde)", note: "Parteien müssen mindestens 5% der Zweitstimmen erreichen, um in den Bundestag einzuziehen." },
                { number: "3", label: "Gewaltenteilung", note: "Legislative (Parlament), Exekutive (Regierung), Judikative (Gerichte)." },
                { number: "2", label: "Stimmen bei Bundestagswahl", note: "Erststimme (Direktkandidat im Wahlkreis) + Zweitstimme (Parteiliste)." },
                { number: "17 / 33", label: "Bestehensgrenze", note: "17 von 33 richtigen Antworten genügen für das offizielle Zertifikat." }
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3 hover:border-blue-500/40 transition">
                  <div className="px-2.5 py-1 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-300 font-mono font-black text-xs shrink-0">
                    {item.number}
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">{item.label}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{item.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: State Identity: Brandenburg */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  <span>State Identity & Symbols: {citizenshipData.states[profile.selectedState]?.name_de}</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  All 10 state questions are drawn directly from these facts.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("STATE");
                  setActiveTab("TOPICS");
                }}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition flex items-center gap-1.5 shrink-0"
              >
                <span>Practice 10 {citizenshipData.states[profile.selectedState]?.name_de} Questions ➔</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold">Landeshauptstadt</span>
                <div className="text-base font-black text-white">Potsdam</div>
                <div className="text-[11px] text-slate-400">Sitz des Landtags im Potsdamer Stadtschloss.</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold">Wappentier</span>
                <div className="text-base font-black text-white">Roter Adler</div>
                <div className="text-[11px] text-slate-400">Der Märkische Rote Adler auf silbernem Schild.</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold">Landesfarben</span>
                <div className="text-base font-black text-white">Rot und Weiß</div>
                <div className="text-[11px] text-slate-400">Offizielle Flagge des Landes Brandenburg.</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold">Geografische Lage</span>
                <div className="text-base font-black text-white">Umschließt Berlin</div>
                <div className="text-[11px] text-slate-400">Die Bundeshauptstadt Berlin ist eine Enklave in Brandenburg.</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold">Nachbarländer</span>
                <div className="text-base font-black text-white">Berlin, SN, ST, MV, Polen</div>
                <div className="text-[11px] text-slate-400">Sachsen, Sachsen-Anhalt, Mecklenburg-Vorpommern und Polen.</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold">Wahlrecht</span>
                <div className="text-base font-black text-white">Wählen ab 16 Jahren</div>
                <div className="text-[11px] text-slate-400">Bei Landtagswahlen und Kommunalwahlen in Brandenburg.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: 17/33 PASS BLUEPRINT & EXAM STRATEGY */}
      {activeTab === "STRATEGY" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
          {/* Header */}
          <div className="border-b border-slate-800 pb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-300 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Official BAMF Exam Scoring Architecture</span>
            </div>
            <h3 className="text-2xl font-black text-white">
              The 17/33 Pass Blueprint: How to Guarantee Your Citizenship Test Pass
            </h3>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Understand the exact exam composition and discover why learning your state questions plus high-yield sections mathematically guarantees a safe pass with zero stress.
            </p>
          </div>

          {/* Exam Composition Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Total Questions</div>
              <div className="text-3xl font-black text-white">33</div>
              <div className="text-xs text-slate-400">Selected per test sheet</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400">Required to Pass</div>
              <div className="text-3xl font-black text-amber-400">17 <span className="text-sm font-normal text-slate-400">/ 33</span></div>
              <div className="text-xs text-slate-400">Only 51.5% needed to pass</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-blue-400">General Questions</div>
              <div className="text-3xl font-black text-blue-400">30</div>
              <div className="text-xs text-slate-400">Drawn from 300 federal pool</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">State Questions</div>
              <div className="text-3xl font-black text-emerald-400">3 <span className="text-sm font-normal text-slate-400">of 10</span></div>
              <div className="text-xs text-slate-400">Drawn from your 10 state Qs</div>
            </div>
          </div>

          {/* The 4-Pillar Winning Strategy */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-amber-400" />
              <span>The 4-Pillar Winning Strategy (Your Exact Formula)</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              You do not need to memorize all 460 questions. You only need your <strong>310 targeted questions</strong> (300 general + 10 for {citizenshipData.states[profile.selectedState]?.name_de}). Here is the breakdown:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Pillar 1 */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/20">
                    Pillar 1: 100% Guaranteed Points
                  </span>
                  <span className="text-xs font-black text-emerald-300 font-mono">3 / 3 Points</span>
                </div>
                <h5 className="text-base font-bold text-white">
                  All 10 {citizenshipData.states[profile.selectedState]?.name_de} Questions
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  There are only 10 state questions in total for {citizenshipData.states[profile.selectedState]?.name_de}, and the official exam ALWAYS picks exactly 3 of them. By learning all 10 perfectly (takes only 10-15 minutes), you enter the exam with <strong>3 guaranteed points out of 3</strong>!
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("STATE");
                      setActiveTab("TOPICS");
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <span>Drill 10 {citizenshipData.states[profile.selectedState]?.name_de} Questions (15 Min)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-blue-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-mono font-bold border border-blue-500/20">
                    Pillar 2: Easiest Common Sense
                  </span>
                  <span className="text-xs font-black text-blue-300 font-mono">9 - 10 / 10 Points</span>
                </div>
                <h5 className="text-base font-bold text-white">
                  Mensch und Gesellschaft (Society & Everyday Life: 100 Qs)
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Questions 201 to 300. Around 10 questions on the test come from this section. They cover daily life in Germany (schools, healthcare, family, equality, workplace rights). Most can be answered with common sense alone.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("Mensch und Gesellschaft");
                      setActiveTab("TOPICS");
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/40 text-blue-300 text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <span>Drill Society & Everyday Life (Q201-300)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-mono font-bold border border-amber-500/20">
                    Pillar 3: High-Yield Key Dates
                  </span>
                  <span className="text-xs font-black text-amber-300 font-mono">8 - 10 / 10 Points</span>
                </div>
                <h5 className="text-base font-bold text-white">
                  Geschichte und Verantwortung (History & Responsibility: 100 Qs)
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Questions 101 to 200. Around 10 questions on the test come from this section. They center around key predictable historical milestones: 1949 (Grundgesetz), 1961 (Mauerbau), 1989 (Mauerfall), 1990 (Wiedervereinigung), and Holocaust remembrance.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("Geschichte und Verantwortung");
                      setActiveTab("TOPICS");
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <span>Drill History & Responsibility (Q101-200)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-mono font-bold border border-indigo-500/20">
                    Pillar 4: Core Fundamentals
                  </span>
                  <span className="text-xs font-black text-indigo-300 font-mono">6 - 8 / 10 Points</span>
                </div>
                <h5 className="text-base font-bold text-white">
                  Politik in der Demokratie (Democracy & Politics: Core 40-50 Qs)
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Questions 1 to 100. Around 10 questions on the test come from this section. Focusing on the core 40-50 high-frequency questions (Bundestag, Bundesrat, Bundeskanzler, Grundgesetz Art. 1, 5%-Hürde, Wahlen) guarantees at least 6-8 correct answers.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("Politik in der Demokratie");
                      setActiveTab("TOPICS");
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/40 text-indigo-300 text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <span>Drill Democracy & Politics (Q1-100)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Math Summary Box */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h5 className="text-lg font-black text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Mathematical Result with This Strategy</span>
              </h5>
              <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold font-mono">
                Passing Buffer: +9 to +14 Safe Points
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-2 font-mono">Exam Component</th>
                    <th className="pb-2 font-mono">Exam Qs</th>
                    <th className="pb-2 font-mono">Your Preparation</th>
                    <th className="pb-2 font-mono text-right">Projected Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  <tr>
                    <td className="py-2.5 font-medium text-emerald-300">1. {citizenshipData.states[profile.selectedState]?.name_de} Questions</td>
                    <td className="py-2.5">3 Qs</td>
                    <td className="py-2.5 text-slate-400">All 10 mastered (100%)</td>
                    <td className="py-2.5 text-right font-bold text-emerald-400 font-mono">3 / 3</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-medium text-blue-300">2. Society & Everyday Life</td>
                    <td className="py-2.5">~10 Qs</td>
                    <td className="py-2.5 text-slate-400">All 100 mastered (Common sense)</td>
                    <td className="py-2.5 text-right font-bold text-blue-400 font-mono">9 - 10 / 10</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-medium text-amber-300">3. History & Responsibility</td>
                    <td className="py-2.5">~10 Qs</td>
                    <td className="py-2.5 text-slate-400">All 100 mastered (Key dates)</td>
                    <td className="py-2.5 text-right font-bold text-amber-400 font-mono">8 - 10 / 10</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-medium text-indigo-300">4. Democracy & Politics</td>
                    <td className="py-2.5">~10 Qs</td>
                    <td className="py-2.5 text-slate-400">Core 40-50 high frequency</td>
                    <td className="py-2.5 text-right font-bold text-indigo-400 font-mono">6 - 8 / 10</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-amber-500/5 font-bold">
                    <td className="py-3 text-white">Total Expected Score</td>
                    <td className="py-3 text-white">33 Qs</td>
                    <td className="py-3 text-amber-300">Targeted Strategy</td>
                    <td className="py-3 text-right text-base text-amber-400 font-mono">26 - 31 / 33</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300 border-t border-slate-800">
              <p>
                Required to pass: <strong className="text-white">17 / 33</strong>. With this strategy, even if you make several mistakes, you still score <strong>26+ points</strong>!
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("SIMULATION");
                  startExam();
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black transition flex items-center gap-2 shadow-lg shadow-amber-500/20 shrink-0"
              >
                <span>Test Strategy with 33Q Simulation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
