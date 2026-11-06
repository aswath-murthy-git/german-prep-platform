"use client";

import React, { useState, useMemo } from "react";
import { 
  GERMAN_CASES_DATA, 
  GENDER_SUFFIX_RULES, 
  WECHSELPRAEPOSITIONEN_DATA, 
  CASES_DRILL_QUESTIONS,
  ARTICLE_WRITING_EXERCISES,
  CaseDeclensionTable,
  CaseDrillQuestion,
  ArticleWritingExercise
} from "@/data/b1_cases_data";
import { AudioVoiceButton } from "./AudioVoiceButton";
import { useUser } from "@/context/UserContext";
import { 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft,
  RotateCw, 
  Layers, 
  Tag, 
  Award, 
  HelpCircle,
  Lightbulb,
  Compass,
  Eye,
  EyeOff,
  PenTool,
  Flame,
  Check
} from "lucide-react";
import confetti from "canvas-confetti";

interface ArticlesAndCasesLabProps {
  onNavigateToSection?: (section: "PATHWAY" | "ACADEMY" | "CASES" | "CITIZENSHIP" | "READING" | "LISTENING" | "WRITING" | "SPEAKING" | "GRAMMAR" | "KEYWORDS" | "STRATEGY" | "CONJUNCTIONS") => void;
}

export const ArticlesAndCasesLab: React.FC<ArticlesAndCasesLabProps> = ({ onNavigateToSection }) => {
  const { showEnglish, toggleShowEnglish } = useUser();
  const [activeTab, setActiveTab] = useState<"MATRIX" | "GENDER_DECODER" | "WECHSEL" | "CASES_QUIZ" | "ACTIVE_WRITER">("MATRIX");
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number>(0);
  const [revealedItems, setRevealedItems] = useState<Record<string, boolean>>({});

  // Quiz state (10 Questions per Sprint)
  const [quizRoundSeed, setQuizRoundSeed] = useState<number>(1);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [quizFilter, setQuizFilter] = useState<"ALL" | "NOMINATIV" | "AKKUSATIV" | "DATIV" | "GENITIV" | "WECHSELPRAEPOSITION" | "GENDER_RULE">("ALL");

  // Active Sentence Writer State
  const [writerCategory, setWriterCategory] = useState<"ALL" | "AKKUSATIV" | "DATIV" | "GENITIV" | "WECHSEL" | "NEGATION">("ALL");
  const [writerIndex, setWriterIndex] = useState<number>(0);
  const [writerInput, setWriterInput] = useState<string>("");
  const [writerSubmitted, setWriterSubmitted] = useState<boolean>(false);
  const [writerIsCorrect, setWriterIsCorrect] = useState<boolean | null>(null);
  const [writerStreak, setWriterStreak] = useState<number>(0);
  const [writerShowHint, setWriterShowHint] = useState<boolean>(false);

  const filteredWriterExercises = useMemo(() => {
    if (writerCategory === "ALL") return ARTICLE_WRITING_EXERCISES;
    return ARTICLE_WRITING_EXERCISES.filter(ex => ex.category === writerCategory);
  }, [writerCategory]);

  const curWriterEx: ArticleWritingExercise = filteredWriterExercises[writerIndex % (filteredWriterExercises.length || 1)] || ARTICLE_WRITING_EXERCISES[0];

  const handleWriterSubmit = () => {
    if (!writerInput.trim() || writerSubmitted) return;
    const normalize = (str: string) =>
      str
        .toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()""„“»«!?]/g, "")
        .replace(/\s+/g, " ")
        .trim();

    const cleanUser = normalize(writerInput);
    const cleanCorrect = normalize(curWriterEx.blankAnswer);

    // 1. Exact answer or acceptable variants
    const isExact = cleanUser === cleanCorrect;
    const isVariant = Boolean(
      curWriterEx.acceptableAnswers &&
      curWriterEx.acceptableAnswers.some(a => normalize(a) === cleanUser)
    );

    // 2. Article + Noun (e.g. "dem Mann")
    const articlePlusNoun = normalize(`${curWriterEx.blankAnswer} ${curWriterEx.noun}`);
    const isArticlePlusNoun = cleanUser === articlePlusNoun;

    // 3. Full sentence (e.g. "Ich schenke dem Mann ein Buch")
    const fullExpected = normalize(`${curWriterEx.beforeText} ${curWriterEx.blankAnswer} ${curWriterEx.afterText}`);
    const isFullSentence = cleanUser === fullExpected;

    const isOk = isExact || isVariant || isArticlePlusNoun || isFullSentence;
    
    setWriterSubmitted(true);
    setWriterIsCorrect(isOk);
    if (isOk) {
      setWriterStreak(prev => prev + 1);
      confetti({ particleCount: 35, spread: 55, origin: { y: 0.6 } });
    } else {
      setWriterStreak(0);
    }
  };

  const handleWriterNext = () => {
    setWriterIndex(prev => (prev + 1) % filteredWriterExercises.length);
    setWriterInput("");
    setWriterSubmitted(false);
    setWriterIsCorrect(null);
    setWriterShowHint(false);
  };

  const handleWriterPrev = () => {
    setWriterIndex(prev => (prev - 1 + filteredWriterExercises.length) % filteredWriterExercises.length);
    setWriterInput("");
    setWriterSubmitted(false);
    setWriterIsCorrect(null);
    setWriterShowHint(false);
  };

  const curCase: CaseDeclensionTable = GERMAN_CASES_DATA[selectedCaseIdx];

  // Filter questions
  const filteredQuestions = useMemo(() => {
    if (quizFilter === "ALL") return CASES_DRILL_QUESTIONS;
    return CASES_DRILL_QUESTIONS.filter(q => q.caseCategory === quizFilter);
  }, [quizFilter]);

  // Stable 10-question sprint selection
  const sprintQuestions = useMemo(() => {
    const list = [...filteredQuestions];
    let seed = ((quizRoundSeed * 16807 + 1013904223) >>> 0);
    for (let i = list.length - 1; i > 0; i--) {
      seed = ((seed * 1664525 + 1013904223) >>> 0);
      const j = seed % (i + 1);
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list.slice(0, 10);
  }, [filteredQuestions, quizRoundSeed]);

  const curQuestion: CaseDrillQuestion | undefined = sprintQuestions[quizIndex % sprintQuestions.length];

  // Seeded shuffled options for current question
  const shuffledOptions = useMemo(() => {
    if (!curQuestion || !curQuestion.options) return [];
    const copy = [...curQuestion.options];
    let seed = ((curQuestion.id * 16807 + quizRoundSeed * 31 + quizIndex * 17) >>> 0);
    for (let i = copy.length - 1; i > 0; i--) {
      seed = ((seed * 1664525 + 1013904223) >>> 0);
      const j = seed % (i + 1);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }, [curQuestion, quizRoundSeed, quizIndex]);

  const handleSelectOption = (opt: string) => {
    if (quizSelectedOption !== null || !curQuestion) return;
    setQuizSelectedOption(opt);

    if (opt === curQuestion.correctAnswer) {
      setQuizScore(prev => prev + 1);
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    }
  };

  const handleNextQuizQuestion = () => {
    if (quizIndex + 1 >= sprintQuestions.length) {
      setQuizCompleted(true);
    } else {
      setQuizIndex(prev => prev + 1);
      setQuizSelectedOption(null);
    }
  };

  const handleStartNextSprint = () => {
    setQuizRoundSeed(prev => prev + 1);
    setQuizIndex(0);
    setQuizSelectedOption(null);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  const toggleItemReveal = (key: string) => {
    setRevealedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-300 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Core Grammar Foundation: A0 to B1 Cases</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              der / die / das & <span className="text-amber-400">The 4 German Cases Matrix</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Master <strong>Nominativ</strong>, <strong>Akkusativ</strong>, <strong>Dativ</strong>, and <strong>Genitiv</strong> through high-yield exam rules. Learn the 100% gender ending secrets and two-way prepositions without learning irrelevant grammar.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
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
            <span className="px-3 py-1.5 bg-slate-950 text-amber-400 font-mono text-xs font-bold rounded-xl border border-slate-800">
              Exam Benchmark: 60% to Pass
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-slate-800">
          {[
            { id: "MATRIX", label: "1. The 4 Cases Matrix", icon: Layers },
            { id: "GENDER_DECODER", label: "2. der/die/das Decoder", icon: Tag },
            { id: "WECHSEL", label: "3. Two-Way Prepositions (Wo vs Wohin)", icon: Compass },
            { id: "CASES_QUIZ", label: "4. Case Practice Quiz (10Q Sprints)", icon: Zap },
            { id: "ACTIVE_WRITER", label: "5. Active Sentence Writer (der/die/das)", icon: PenTool }
          ].map((tab) => {
            const Icon = tab.icon;
            const isCur = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                  isCur
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── TAB 1: THE 4 CASES MASTER MATRIX ─── */}
      {activeTab === "MATRIX" && (
        <div className="space-y-6">
          {/* Case Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {GERMAN_CASES_DATA.map((c, idx) => {
              const isSelected = selectedCaseIdx === idx;
              return (
                <button
                  key={c.caseName}
                  onClick={() => setSelectedCaseIdx(idx)}
                  className={`p-4 rounded-2xl border text-left transition ${
                    isSelected
                      ? "bg-amber-500/20 border-amber-500 text-amber-200 shadow-md shadow-amber-500/10 font-bold"
                      : "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300"
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-wider text-amber-400 font-extrabold font-mono">
                    {c.questionWord}
                  </div>
                  <div className="text-lg font-black text-white mt-0.5">{c.caseName}</div>
                  <div className="text-xs text-slate-400 mt-1 line-clamp-1">{c.coreFunction}</div>
                </button>
              );
            })}
          </div>

          {/* Active Case Details Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-lg border border-amber-500/20 font-mono">
                  Question: {curCase.questionWord}
                </span>
                <h3 className="text-2xl font-black text-white mt-1">{curCase.caseName}</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">{curCase.coreFunction}</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-amber-300 max-w-sm">
                <strong>B1 Pass Strategy:</strong> {curCase.examPassHack}
              </div>
            </div>

            {/* Declension Table Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Article Declension in {curCase.caseName}:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                {/* Masculine */}
                <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-400 uppercase">Maskulin (m)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">der Mann</span>
                  </div>
                  <div className="space-y-1 font-mono text-slate-200">
                    <div>Definite: <strong className="text-blue-300 text-sm">{curCase.articles.masculine.definite}</strong></div>
                    <div>Indefinite: <strong className="text-blue-300 text-sm">{curCase.articles.masculine.indefinite}</strong></div>
                    <div>Negative: <strong className="text-blue-300 text-sm">{curCase.articles.masculine.negative}</strong></div>
                  </div>
                </div>

                {/* Feminine */}
                <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-400 uppercase">Feminin (f)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">die Frau</span>
                  </div>
                  <div className="space-y-1 font-mono text-slate-200">
                    <div>Definite: <strong className="text-rose-300 text-sm">{curCase.articles.feminine.definite}</strong></div>
                    <div>Indefinite: <strong className="text-rose-300 text-sm">{curCase.articles.feminine.indefinite}</strong></div>
                    <div>Negative: <strong className="text-rose-300 text-sm">{curCase.articles.feminine.negative}</strong></div>
                  </div>
                </div>

                {/* Neuter */}
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400 uppercase">Neutral (n)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">das Kind</span>
                  </div>
                  <div className="space-y-1 font-mono text-slate-200">
                    <div>Definite: <strong className="text-emerald-300 text-sm">{curCase.articles.neuter.definite}</strong></div>
                    <div>Indefinite: <strong className="text-emerald-300 text-sm">{curCase.articles.neuter.indefinite}</strong></div>
                    <div>Negative: <strong className="text-emerald-300 text-sm">{curCase.articles.neuter.negative}</strong></div>
                  </div>
                </div>

                {/* Plural */}
                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400 uppercase">Plural (pl)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">die Leute</span>
                  </div>
                  <div className="space-y-1 font-mono text-slate-200">
                    <div>Definite: <strong className="text-amber-300 text-sm">{curCase.articles.plural.definite}</strong></div>
                    <div>Indefinite: <strong className="text-amber-300 text-sm">{curCase.articles.plural.indefinite}</strong></div>
                    <div>Negative: <strong className="text-amber-300 text-sm">{curCase.articles.plural.negative}</strong></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed Prepositions Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Fixed Prepositions Governing {curCase.caseName}:
              </span>
              <div className="flex flex-wrap gap-2">
                {curCase.fixedPrepositions.map((prep, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-xs font-mono"
                  >
                    {prep}
                  </span>
                ))}
              </div>
            </div>

            {/* Sample Sentences with Audio */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Exam Examples in Full Sentences:
              </h4>
              <div className="space-y-2.5">
                {curCase.sampleSentences.map((sent, idx) => {
                  const itemKey = `sent-${curCase.caseName}-${idx}`;
                  const isRevealed = showEnglish || revealedItems[itemKey];
                  return (
                    <div
                      key={idx}
                      className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="text-sm sm:text-base font-bold text-white">
                          {sent.de}
                        </div>
                        {isRevealed ? (
                          <div className="text-xs text-slate-400 animate-fadeIn">
                            {sent.en}
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => toggleItemReveal(itemKey)}
                            className="text-[11px] text-slate-500 hover:text-amber-400 inline-flex items-center gap-1 transition"
                          >
                            <Eye className="w-3 h-3 text-slate-500" />
                            <span>Show English translation</span>
                          </button>
                        )}
                        <div className="text-[11px] text-amber-300/80 font-mono">
                          {sent.highlight}
                        </div>
                      </div>
                      <AudioVoiceButton text={sent.de} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 2: DER / DIE / DAS GENDER DECODER ─── */}
      {activeTab === "GENDER_DECODER" && (
        <div className="space-y-6">
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-xs sm:text-sm text-amber-300 space-y-1">
            <strong>ADHD Memory Hack:</strong> Don't try to memorize the gender of 5,000 words randomly. Learn these 10 ending suffixes. In German, the <strong>ending of the word</strong> determines its gender, not the meaning!
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GENDER_SUFFIX_RULES.map((rule) => {
              const badgeColor = rule.gender === "der"
                ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
                : rule.gender === "die"
                ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";

              return (
                <div
                  key={rule.gender}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-xl text-xs font-black uppercase font-mono border ${badgeColor}`}>
                        {rule.genderLabel}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{rule.accuracy}</span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Look for these suffixes:
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {rule.suffixes.map((suf, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-slate-950 text-white font-mono font-bold text-xs rounded-lg border border-slate-800"
                          >
                            {suf}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 space-y-1.5">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        High-Yield Exam Nouns:
                      </h4>
                      {rule.examples.map((ex, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between text-xs">
                          <span className="font-bold text-white">{ex.de}</span>
                          <span className="text-[11px] text-slate-500">{ex.en}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-[11px] text-amber-300/90 bg-amber-950/20 p-3 rounded-xl border border-amber-500/20 flex items-start gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Exam Tip:</strong> {rule.examTip}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── TAB 3: TWO-WAY PREPOSITIONS (WO VS WOHIN) ─── */}
      {activeTab === "WECHSEL" && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-lg border border-amber-500/20 font-mono">
                The 9 Two-Way Prepositions (Wechselpräpositionen)
              </span>
              <h3 className="text-2xl font-black text-white">
                Direction (Akkusativ) vs. Location (Dativ)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                These 9 prepositions take <strong>Akkusativ</strong> when there is motion / direction towards a target (Wohin?), and <strong>Dativ</strong> when something is already in a stationary place (Wo?).
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {WECHSELPRAEPOSITIONEN_DATA.prepositions.map((prep) => (
                  <span
                    key={prep}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 font-bold font-mono text-sm"
                  >
                    {prep}
                  </span>
                ))}
              </div>
            </div>

            {/* Formula Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Wohin -> Akkusativ */}
              <div className="p-5 rounded-2xl bg-blue-950/20 border border-blue-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-blue-400 uppercase font-mono">
                    {WECHSELPRAEPOSITIONEN_DATA.ruleWohin.question}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-xs font-black">
                    {WECHSELPRAEPOSITIONEN_DATA.ruleWohin.case}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{WECHSELPRAEPOSITIONEN_DATA.ruleWohin.concept}</p>
                <div className="p-3 bg-slate-950 rounded-xl border border-blue-500/20 font-mono text-xs text-blue-300">
                  {WECHSELPRAEPOSITIONEN_DATA.ruleWohin.formula}
                </div>
                <div className="text-xs text-white font-semibold">
                  Example: {WECHSELPRAEPOSITIONEN_DATA.ruleWohin.sample}
                </div>
              </div>

              {/* Wo -> Dativ */}
              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-emerald-400 uppercase font-mono">
                    {WECHSELPRAEPOSITIONEN_DATA.ruleWo.question}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-black">
                    {WECHSELPRAEPOSITIONEN_DATA.ruleWo.case}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{WECHSELPRAEPOSITIONEN_DATA.ruleWo.concept}</p>
                <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/20 font-mono text-xs text-emerald-300">
                  {WECHSELPRAEPOSITIONEN_DATA.ruleWo.formula}
                </div>
                <div className="text-xs text-white font-semibold">
                  Example: {WECHSELPRAEPOSITIONEN_DATA.ruleWo.sample}
                </div>
              </div>
            </div>

            {/* Paired Verbs Cheat Sheet */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                The 4 Classic Paired Verbs Tested in B1:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WECHSELPRAEPOSITIONEN_DATA.pairedVerbs.map((p, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-blue-300 font-bold">{p.movement}</span>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                    <span className="text-emerald-300 font-bold">{p.state}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 4: CASE DRILL MACHINE (10Q SPRINTS) ─── */}
      {activeTab === "CASES_QUIZ" && (
        <div className="space-y-6">
          {/* Header & Category Filters */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 font-bold text-xs rounded-lg border border-amber-500/30">
                  Sprint Round #{quizRoundSeed}
                </span>
                <span className="text-xs text-slate-400">10 Questions per Sprint</span>
              </div>
              <h3 className="text-lg font-black text-white mt-1">
                Articles & Cases Practice Sprint
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Practice Nominativ, Akkusativ, Dativ, Genitiv, and der/die/das rules until you achieve 100% mastery.
              </p>
            </div>

            <button
              type="button"
              onClick={handleStartNextSprint}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition flex items-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>New 10Q Sprint</span>
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "ALL", label: "All Topics" },
              { id: "AKKUSATIV", label: "Akkusativ (den/einen)" },
              { id: "DATIV", label: "Dativ (dem/der)" },
              { id: "WECHSELPRAEPOSITION", label: "Wo vs Wohin" },
              { id: "GENITIV", label: "Genitiv (des/der)" },
              { id: "GENDER_RULE", label: "der/die/das Rules" }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setQuizFilter(cat.id as any);
                  setQuizIndex(0);
                  setQuizSelectedOption(null);
                  setQuizScore(0);
                  setQuizCompleted(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  quizFilter === cat.id
                    ? "bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/20"
                    : "bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quiz Body */}
          {quizCompleted ? (
            <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-700/80 rounded-2xl p-8 text-center space-y-5 shadow-2xl">
              <div className="inline-flex p-4 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400">
                <Award className="w-12 h-12" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">Sprint Completed!</h3>
                <p className="text-sm text-slate-400 mt-1">
                  You scored <span className="text-amber-400 font-bold text-lg">{quizScore}</span> out of <span className="font-bold">{sprintQuestions.length}</span>
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                {quizScore >= Math.ceil(sprintQuestions.length * 0.6) ? (
                  <div className="text-emerald-400 font-semibold space-y-1">
                    <div>Passed! Case Recognition Threshold Reached ({Math.round((quizScore / sprintQuestions.length) * 100)}%).</div>
                    <div className="text-slate-400 text-[11px]">
                      Excellent accuracy. Keep drilling to automate der/die/das and Akkusativ/Dativ without thinking during the exam!
                    </div>
                  </div>
                ) : (
                  <div className="text-amber-400 font-semibold space-y-1">
                    <div>Practice Needed ({Math.round((quizScore / sprintQuestions.length) * 100)}% - B1 pass mark is 60%).</div>
                    <div className="text-slate-400 text-[11px]">
                      Review the 4 Cases Matrix tab and take another sprint immediately to cement the rules.
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleStartNextSprint}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/30 transition inline-flex items-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>Start Next 10-Question Sprint</span>
                </button>
              </div>
            </div>
          ) : curQuestion ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">
                    Question <strong className="text-white">{quizIndex + 1}</strong> of {sprintQuestions.length}
                  </span>
                  <span className="text-amber-400 font-bold">
                    Score: {quizScore} / {quizIndex + (quizSelectedOption !== null ? 1 : 0)}
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-amber-300 h-full transition-all duration-300"
                    style={{ width: `${((quizIndex + 1) / sprintQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800/90 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/80 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                    Category: {curQuestion.caseCategory}
                  </span>
                  <AudioVoiceButton text={curQuestion.prompt_de} />
                </div>

                <div className="space-y-1">
                  <h4 className="text-lg sm:text-xl font-black text-white">
                    {curQuestion.prompt_de}
                  </h4>
                  {showEnglish && (
                    <p className="text-xs text-slate-400 italic">
                      {curQuestion.prompt_en}
                    </p>
                  )}
                </div>
              </div>

              {/* Multiple Choice Options */}
              <div className="grid grid-cols-1 gap-3">
                {shuffledOptions.map((opt, idx) => {
                  const isSelected = quizSelectedOption === opt;
                  const isCorrect = opt === curQuestion.correctAnswer;
                  const revealed = quizSelectedOption !== null;

                  let btnStyle = "bg-slate-800/80 hover:bg-slate-750 text-slate-200 border-slate-700/80 hover:border-slate-600";
                  if (revealed) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold shadow-lg shadow-emerald-500/10";
                    } else if (isSelected) {
                      btnStyle = "bg-rose-950/70 border-rose-500 text-rose-200";
                    } else {
                      btnStyle = "bg-slate-900/60 border-slate-800 text-slate-500 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={revealed}
                      onClick={() => handleSelectOption(opt)}
                      className={`p-4 rounded-xl border text-left text-sm font-semibold transition flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <span className="flex-1">{opt}</span>
                      {revealed && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {revealed && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Step */}
              {quizSelectedOption !== null && (
                <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3 animate-fadeIn">
                  <div className="text-xs text-slate-300 font-medium">
                    {curQuestion.explanation_de}
                  </div>
                  {showEnglish && (
                    <div className="text-[11px] text-slate-500 italic">
                      {curQuestion.explanation_en}
                    </div>
                  )}

                  <div className="text-[11px] text-amber-200/90 bg-amber-950/20 p-2.5 rounded-lg border border-amber-500/20 font-mono">
                    <strong>Rule Formula:</strong> {curQuestion.ruleSchematic}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextQuizQuestion}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm transition flex items-center gap-2 shadow-lg shadow-amber-500/20"
                    >
                      <span>{quizIndex + 1 >= sprintQuestions.length ? "Finish Sprint" : "Next Question"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* ─── TAB 5: ACTIVE SENTENCE WRITER (der/die/das) ─── */}
      {activeTab === "ACTIVE_WRITER" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          {/* Header & Category Filter */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-lg border border-amber-500/20 font-mono">
                  A0-to-B1 Active Writing Lab
                </span>
                <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/20">
                  Level {curWriterEx.level}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Active Sentence Completion: der / die / das & Cases
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Type the correct article or connector directly into the sentence. Builds the subconscious reflex required for B1 Schreiben and Sprechen.
              </p>
            </div>

            {/* Streak & Score Counter */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-2">
                <Flame className={`w-4 h-4 ${writerStreak > 0 ? "text-amber-400 animate-pulse" : "text-slate-600"}`} />
                <div className="text-xs">
                  <div className="text-slate-500 uppercase tracking-wider text-[10px] font-mono">Streak</div>
                  <div className="text-amber-300 font-extrabold">{writerStreak} Correct</div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "ALL", label: "All Cases" },
              { id: "AKKUSATIV", label: "Akkusativ (den / einen)" },
              { id: "DATIV", label: "Dativ (dem / der / einem)" },
              { id: "WECHSEL", label: "Two-Way Prepositions" },
              { id: "NEGATION", label: "Negation (kein / keine / keinen)" },
              { id: "GENITIV", label: "Genitiv (des / der)" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setWriterCategory(cat.id as any);
                  setWriterIndex(0);
                  setWriterInput("");
                  setWriterSubmitted(false);
                  setWriterIsCorrect(null);
                  setWriterShowHint(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  writerCategory === cat.id
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm shadow-amber-500/10"
                    : "bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Exercise Progression Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400">
              <span>
                Exercise <strong className="text-white">{writerIndex + 1}</strong> of {filteredWriterExercises.length}
              </span>
              <span className="text-amber-400/90 font-medium">
                Target Noun: {curWriterEx.noun}
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-amber-300 h-full transition-all duration-300"
                style={{ width: `${((writerIndex + 1) / filteredWriterExercises.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Target Sentence Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
            {/* Clue Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-blue-950/40 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold">
                  Noun: {curWriterEx.noun}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
                  Gender: {curWriterEx.gender}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
                  Case: {curWriterEx.caseName}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono">
                  Base Word: &quot;{curWriterEx.targetWordPrompt}&quot;
                </span>
              </div>

              <AudioVoiceButton text={`${curWriterEx.beforeText} ${curWriterEx.blankAnswer} ${curWriterEx.afterText}`} />
            </div>

            {/* Inline Writing Sentence Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!writerSubmitted) {
                  handleWriterSubmit();
                } else {
                  handleWriterNext();
                }
              }}
              className="space-y-4"
            >
              <div className="p-4 sm:p-6 rounded-xl bg-slate-900 border border-slate-800 text-base sm:text-xl font-medium text-slate-100 leading-relaxed flex flex-wrap items-baseline gap-2">
                <span>{curWriterEx.beforeText}</span>
                <div className="inline-flex flex-col items-center">
                  <input
                    type="text"
                    value={writerInput}
                    onChange={(e) => {
                      if (!writerSubmitted) setWriterInput(e.target.value);
                    }}
                    disabled={writerSubmitted}
                    placeholder="____"
                    autoFocus
                    className={`w-28 sm:w-36 text-center font-bold px-3 py-1 rounded-lg border transition outline-none text-base sm:text-xl ${
                      writerSubmitted
                        ? writerIsCorrect
                          ? "bg-emerald-950/50 border-emerald-500 text-emerald-300 shadow-sm shadow-emerald-500/20"
                          : "bg-rose-950/50 border-rose-500 text-rose-300"
                        : "bg-slate-950 border-amber-500/60 focus:border-amber-400 text-amber-300 focus:ring-2 focus:ring-amber-500/20"
                    }`}
                  />
                  <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                    ({curWriterEx.targetWordPrompt})
                  </span>
                </div>
                <span>{curWriterEx.afterText}</span>
              </div>

              {/* Translation line if toggled ON */}
              {showEnglish && (
                <div className="text-xs sm:text-sm text-slate-400 italic px-2">
                  Meaning: {curWriterEx.translation_en}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setWriterShowHint(prev => !prev)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium transition flex items-center gap-1.5"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                    <span>{writerShowHint ? "Hide Hint" : "Show Grammar Hint"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWriterPrev}
                    className="px-3 py-1.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs transition flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {!writerSubmitted ? (
                    <button
                      type="submit"
                      disabled={!writerInput.trim()}
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black text-xs sm:text-sm transition flex items-center gap-2 shadow-lg shadow-amber-500/20"
                    >
                      <Check className="w-4 h-4" />
                      <span>Check Answer (Enter ↵)</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleWriterNext}
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm transition flex items-center gap-2 shadow-lg shadow-amber-500/20"
                    >
                      <span>Next Exercise</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </form>

            {/* Hint Box */}
            {writerShowHint && (
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs space-y-1 animate-fadeIn">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>Grammar Clue:</span>
                </div>
                <p className="text-slate-200">{curWriterEx.hint_de}</p>
                {showEnglish && (
                  <p className="text-slate-400 italic text-[11px]">{curWriterEx.hint_en}</p>
                )}
              </div>
            )}

            {/* Submission Feedback Result Box */}
            {writerSubmitted && (
              <div className={`p-5 rounded-2xl border space-y-3 animate-fadeIn ${
                writerIsCorrect
                  ? "bg-emerald-950/30 border-emerald-500/50"
                  : "bg-rose-950/30 border-rose-500/50"
              }`}>
                <div className="flex items-start gap-3">
                  {writerIsCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <h4 className="text-base font-black text-white">
                      {writerIsCorrect ? "Ausgezeichnet! Korrekt!" : "Nicht ganz richtig"}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200">
                      Richtig ist: <strong className="font-mono text-amber-300 px-2 py-0.5 bg-slate-950 rounded border border-slate-800">{curWriterEx.blankAnswer}</strong>
                      {!writerIsCorrect && (
                        <span className="text-rose-300 ml-2">
                          (Ihre Eingabe: <span className="line-through">{writerInput}</span>)
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-slate-300 pt-1">
                      {curWriterEx.hint_de}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-amber-300 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>B1 Pass Strategy:</strong> {curWriterEx.examTip}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
