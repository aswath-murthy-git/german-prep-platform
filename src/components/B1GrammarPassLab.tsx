"use client";

import React, { useState, useMemo } from "react";
import { 
  MODAL_VERBS_DATA, 
  SATZBAU_RULES_DATA, 
  GRAMMAR_QUIZ_QUESTIONS, 
  WORD_ORDER_PUZZLES,
  PASS_B1_CRITERIA_SUMMARY,
  ModalVerbInfo,
  SatzbauRule
} from "@/data/b1_grammar_data";
import { AudioVoiceButton } from "./AudioVoiceButton";
import { useUser } from "@/context/UserContext";
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Award, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  HelpCircle, 
  Lightbulb, 
  Layers, 
  ShieldCheck, 
  ChevronRight,
  Flame,
  Volume2,
  PenTool,
  Check,
  Zap
} from "lucide-react";
import confetti from "canvas-confetti";
import { VerbMasterLibrary } from "./VerbMasterLibrary";

interface ModalDrillItem {
  id: number;
  verb: string;
  sentenceBefore: string;
  blank: string;
  sentenceAfter: string;
  acceptableAnswers: string[];
  options: string[];
  translation: string;
  ruleExplanation: string;
}

const MODAL_DRILLS_DATA: Record<string, ModalDrillItem[]> = {
  können: [
    {
      id: 1,
      verb: "können",
      sentenceBefore: "Herr Schneider,",
      blank: "könnten",
      sentenceAfter: "Sie mir bitte die Unterlagen per E-Mail zusenden?",
      acceptableAnswers: ["könnten", "können", "könntest"],
      options: ["könnten", "kann", "könnt", "konnte"],
      translation: "Mr. Schneider, could you please send me the documents by email? (Polite Konjunktiv II request)",
      ruleExplanation: "In formal B1 emails, always use 'könnten Sie bitte...' for polite requests!"
    },
    {
      id: 2,
      verb: "können",
      sentenceBefore: "Ich",
      blank: "kann",
      sentenceAfter: "sehr gut Englisch und etwas Deutsch sprechen.",
      acceptableAnswers: ["kann"],
      options: ["kann", "kannst", "können", "könnte"],
      translation: "I can speak English very well and a little German.",
      ruleExplanation: "First-person singular 'ich kann' has a stem vowel change to 'a' and takes NO -e ending!"
    },
    {
      id: 3,
      verb: "können",
      sentenceBefore: "Letzte Woche war ich krank und",
      blank: "konnte",
      sentenceAfter: "leider nicht zum Unterricht kommen.",
      acceptableAnswers: ["konnte"],
      options: ["konnte", "könnte", "kann", "konntest"],
      translation: "Last week I was sick and unfortunately could not come to class.",
      ruleExplanation: "Präteritum of 'können' has NO umlaut: 'ich konnte' (past fact), unlike 'könnte' (subjunctive)."
    }
  ],
  müssen: [
    {
      id: 4,
      verb: "müssen",
      sentenceBefore: "Gestern hatte ich hohes Fieber und",
      blank: "musste",
      sentenceAfter: "dringend zum Arzt gehen.",
      acceptableAnswers: ["musste"],
      options: ["musste", "müsste", "muss", "mussten"],
      translation: "Yesterday I had a high fever and had to go to the doctor urgently.",
      ruleExplanation: "Past tense of 'müssen' drops the umlaut: 'ich musste' (past obligation)."
    },
    {
      id: 5,
      verb: "müssen",
      sentenceBefore: "Du",
      blank: "musst",
      sentenceAfter: "jeden Tag mindestens 15 Minuten Deutsch sprechen.",
      acceptableAnswers: ["musst"],
      options: ["musst", "müsst", "muss", "müssen"],
      translation: "You have to speak German for at least 15 minutes every day.",
      ruleExplanation: "Second-person singular: 'du musst' (stem changes to 'u', no umlaut!)."
    }
  ],
  dürfen: [
    {
      id: 6,
      verb: "dürfen",
      sentenceBefore: "Entschuldigung,",
      blank: "darf",
      sentenceAfter: "man hier im Wartezimmer telefonieren?",
      acceptableAnswers: ["darf"],
      options: ["darf", "darfst", "dürfen", "durfte"],
      translation: "Excuse me, is one allowed to make phone calls here in the waiting room?",
      ruleExplanation: "'man' takes third-person singular: 'man darf' (stem vowel 'a', zero ending)."
    },
    {
      id: 7,
      verb: "dürfen",
      sentenceBefore: "Hier",
      blank: "dürfen",
      sentenceAfter: "Sie nicht parken, da es eine Feuerwehreinfahrt ist.",
      acceptableAnswers: ["dürfen"],
      options: ["dürfen", "darf", "durften", "dürft"],
      translation: "You are not allowed to park here because it is a fire department entrance.",
      ruleExplanation: "Polite formal address: 'Sie dürfen' retains the umlaut and takes standard -en ending."
    }
  ],
  sollen: [
    {
      id: 8,
      verb: "sollen",
      sentenceBefore: "Der Arzt hat gesagt, ich",
      blank: "soll",
      sentenceAfter: "drei Tage die Bettruhe einhalten.",
      acceptableAnswers: ["soll", "sollte"],
      options: ["soll", "sollte", "sollt", "sollen"],
      translation: "The doctor said I should stay in bed for three days.",
      ruleExplanation: "'sollen' expresses advice, doctor instructions, or indirect commands: 'ich soll'."
    },
    {
      id: 9,
      verb: "sollen",
      sentenceBefore: "Was",
      blank: "sollen",
      sentenceAfter: "wir zur Abschiedsfeier von Sarah mitbringen?",
      acceptableAnswers: ["sollen"],
      options: ["sollen", "sollt", "soll", "sollten"],
      translation: "What should we bring to Sarah's farewell party?",
      ruleExplanation: "First-person plural: 'wir sollen' in joint planning discussions."
    }
  ],
  wollen: [
    {
      id: 10,
      verb: "wollen",
      sentenceBefore: "Wir",
      blank: "wollen",
      sentenceAfter: "am Wochenende einen gemeinsamen Ausflug nach Potsdam machen.",
      acceptableAnswers: ["wollen"],
      options: ["wollen", "will", "wollt", "wollten"],
      translation: "We want to take a weekend trip to Potsdam together.",
      ruleExplanation: "'wir wollen' expresses intention and strong plans for the future."
    },
    {
      id: 11,
      verb: "wollen",
      sentenceBefore: "Er",
      blank: "will",
      sentenceAfter: "nächstes Jahr eine Weiterbildung im IT-Bereich absolvieren.",
      acceptableAnswers: ["will"],
      options: ["will", "willst", "wollen", "wollte"],
      translation: "He wants to complete an IT professional training program next year.",
      ruleExplanation: "Third-person singular 'er will' has stem change to 'i' with zero ending!"
    }
  ],
  möchten: [
    {
      id: 12,
      verb: "möchten",
      sentenceBefore: "Ich",
      blank: "möchte",
      sentenceAfter: "mich gern um die ausgeschriebene Stelle bewerben.",
      acceptableAnswers: ["möchte"],
      options: ["möchte", "möchtest", "möchten", "möchtet"],
      translation: "I would like to apply for the advertised position.",
      ruleExplanation: "Crucial formula for job applications and polite requests: 'Ich möchte mich bewerben'."
    },
    {
      id: 13,
      verb: "möchten",
      sentenceBefore: "Was",
      blank: "möchten",
      sentenceAfter: "Sie gern trinken, Herr Richter?",
      acceptableAnswers: ["möchten"],
      options: ["möchten", "möchte", "möchtet", "mag"],
      translation: "What would you like to drink, Mr. Richter?",
      ruleExplanation: "Polite customer service or guest invitation: 'Was möchten Sie...?'"
    }
  ]
};

export const B1GrammarPassLab: React.FC = () => {
  const { profile, showEnglish } = useUser();
  const [activeTab, setActiveTab] = useState<"MODAL_VERBS" | "REFLEXIV" | "PARTIZIP_2" | "SATZBAU" | "QUIZ" | "PUZZLE" | "PASS_GUARANTEE" | "VERBS_LIBRARY">("MODAL_VERBS");

  // Modal Verbs Tab state
  const [selectedVerbIdx, setSelectedVerbIdx] = useState<number>(0);
  const curVerb: ModalVerbInfo = MODAL_VERBS_DATA[selectedVerbIdx];

  // Modal Verb Active Practice Workout State
  const [modalWorkoutMode, setModalWorkoutMode] = useState<"TYPE" | "CHIP">("TYPE");
  const [modalDrillIndex, setModalDrillIndex] = useState<number>(0);
  const [modalUserTyped, setModalUserTyped] = useState<string>("");
  const [modalSelectedChip, setModalSelectedChip] = useState<string | null>(null);
  const [modalWorkoutSubmitted, setModalWorkoutSubmitted] = useState<boolean>(false);
  const [modalWorkoutIsCorrect, setModalWorkoutIsCorrect] = useState<boolean | null>(null);
  const [modalWorkoutStreak, setModalWorkoutStreak] = useState<number>(0);
  const [modalWorkoutScore, setModalWorkoutScore] = useState<number>(0);

  // Reflexive Verbs Workout State
  const [reflexivDrillIdx, setReflexivDrillIdx] = useState<number>(0);
  const [reflexivTyped, setReflexivTyped] = useState<string>("");
  const [reflexivSelected, setReflexivSelected] = useState<string | null>(null);
  const [reflexivSubmitted, setReflexivSubmitted] = useState<boolean>(false);
  const [reflexivIsCorrect, setReflexivIsCorrect] = useState<boolean | null>(null);
  const [reflexivScore, setReflexivScore] = useState<number>(0);
  const [reflexivMode, setReflexivMode] = useState<"TYPE" | "CHIP">("TYPE");

  // Partizip II Workout State
  const [partizipDrillIdx, setPartizipDrillIdx] = useState<number>(0);
  const [partizipTyped, setPartizipTyped] = useState<string>("");
  const [partizipSelected, setPartizipSelected] = useState<string | null>(null);
  const [partizipSubmitted, setPartizipSubmitted] = useState<boolean>(false);
  const [partizipIsCorrect, setPartizipIsCorrect] = useState<boolean | null>(null);
  const [partizipScore, setPartizipScore] = useState<number>(0);
  const [partizipMode, setPartizipMode] = useState<"TYPE" | "CHIP">("TYPE");

  const handleModalWorkoutCheck = (overrideValue?: string) => {
    const rawVal = overrideValue !== undefined ? overrideValue : (modalWorkoutMode === "TYPE" ? modalUserTyped : (modalSelectedChip || ""));
    if (!rawVal.trim()) return;

    const normalize = (str: string) =>
      str
        .toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()""„“»«!?]/g, "")
        .replace(/\s+/g, " ")
        .trim();

    const cleanInput = normalize(rawVal);
    const activeDrills = MODAL_DRILLS_DATA[curVerb.verb] || MODAL_DRILLS_DATA.können;
    const currentDrill = activeDrills[modalDrillIndex % activeDrills.length];
    const cleanCorrect = normalize(currentDrill.blank);

    // 1. Exact verb match
    const isExact = cleanInput === cleanCorrect;
    // 2. Acceptable variant match
    const isVariant = currentDrill.acceptableAnswers.some(ans => normalize(ans) === cleanInput);
    // 3. Full sentence match
    const fullExpected = normalize(`${currentDrill.sentenceBefore} ${currentDrill.blank} ${currentDrill.sentenceAfter}`);
    const isFullSentence = cleanInput === fullExpected;

    const isCorrect = isExact || isVariant || isFullSentence;

    setModalWorkoutSubmitted(true);
    setModalWorkoutIsCorrect(isCorrect);

    if (isCorrect) {
      setModalWorkoutScore(prev => prev + 1);
      const newStreak = modalWorkoutStreak + 1;
      setModalWorkoutStreak(newStreak);
      if (newStreak % 3 === 0) {
        confetti({ particleCount: 35, spread: 55, origin: { y: 0.6 } });
      }
    } else {
      setModalWorkoutStreak(0);
    }
  };

  const handleNextModalDrill = () => {
    const activeDrills = MODAL_DRILLS_DATA[curVerb.verb] || MODAL_DRILLS_DATA.können;
    setModalDrillIndex(prev => (prev + 1) % activeDrills.length);
    setModalUserTyped("");
    setModalSelectedChip(null);
    setModalWorkoutSubmitted(false);
    setModalWorkoutIsCorrect(null);
  };

  // Satzbau Tab state
  const [selectedRuleId, setSelectedRuleId] = useState<string>("modal-bracket");
  const curRule: SatzbauRule = SATZBAU_RULES_DATA.find(r => r.id === selectedRuleId) || SATZBAU_RULES_DATA[0];

  // Quiz state
  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [answeredCount, setAnsweredCount] = useState<number>(0);

  // Puzzle state
  const [puzzleIdx, setPuzzleIdx] = useState<number>(0);
  const curPuzzle = WORD_ORDER_PUZZLES[puzzleIdx];
  const [assembledTokens, setAssembledTokens] = useState<string[]>([]);
  const [puzzleFeedback, setPuzzleFeedback] = useState<"IDLE" | "CORRECT" | "INCORRECT">("IDLE");

  // Handle Quiz selection
  const curQuizQ = GRAMMAR_QUIZ_QUESTIONS[quizIdx];

  // Stable shuffled options per grammar quiz question so correct answer is mixed up!
  const shuffledQuizOptions = useMemo(() => {
    if (!curQuizQ || !curQuizQ.options) return [];
    const copy = [...curQuizQ.options];
    let seed = ((curQuizQ.id * 16807 + 1013904223) >>> 0);
    for (let i = copy.length - 1; i > 0; i--) {
      seed = ((seed * 1664525 + 1013904223) >>> 0);
      const j = seed % (i + 1);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }, [curQuizQ]);

  const handleSelectOption = (idx: number) => {
    if (selectedAnswerIdx !== null) return;
    setSelectedAnswerIdx(idx);
    setAnsweredCount(prev => prev + 1);
    const isCorrect = shuffledQuizOptions[idx]?.isCorrect;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    }
  };

  const handleNextQuiz = () => {
    setSelectedAnswerIdx(null);
    setQuizIdx(prev => (prev + 1) % GRAMMAR_QUIZ_QUESTIONS.length);
  };

  // Handle Puzzle interactions
  const handleAddToken = (token: string, originalIdx: number) => {
    if (puzzleFeedback === "CORRECT") return;
    setAssembledTokens(prev => [...prev, token]);
  };

  const handleRemoveToken = (removeIdx: number) => {
    if (puzzleFeedback === "CORRECT") return;
    setAssembledTokens(prev => prev.filter((_, idx) => idx !== removeIdx));
    setPuzzleFeedback("IDLE");
  };

  const handleResetPuzzle = () => {
    setAssembledTokens([]);
    setPuzzleFeedback("IDLE");
  };

  const handleCheckPuzzle = () => {
    const isExact = assembledTokens.join(" ") === curPuzzle.correctOrder.join(" ");
    if (isExact) {
      setPuzzleFeedback("CORRECT");
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } else {
      setPuzzleFeedback("INCORRECT");
    }
  };

  const handleNextPuzzle = () => {
    setAssembledTokens([]);
    setPuzzleFeedback("IDLE");
    setPuzzleIdx(prev => (prev + 1) % WORD_ORDER_PUZZLES.length);
  };

  // Available tokens for puzzle
  const remainingTokens = curPuzzle.scrambledTokens.filter((token, idx) => {
    const countInAssembled = assembledTokens.filter(t => t === token).length;
    const occurrencesInOriginal = curPuzzle.scrambledTokens.filter(t => t === token).length;
    const alreadyUsedBeforeThis = curPuzzle.scrambledTokens.slice(0, idx).filter(t => t === token).length;
    return alreadyUsedBeforeThis >= countInAssembled;
  });

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-300 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>A1/A2 to B1 Pass Bridge - High-Yield Grammar</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              B1 Pass Grammar & <span className="text-amber-400">Modal Verbs Lab</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Master the exact grammar choke points tested in B1: <strong>Modal Verbs</strong>, <strong>Sentence Word Order</strong>, and <strong>Trap Connectors</strong>. Score 60%+ without learning irrelevant complex German.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-slate-950 text-amber-400 font-mono text-xs font-bold rounded-xl border border-slate-800">
              Exam Benchmark: 60% to Pass
            </span>
          </div>
        </div>

        {/* Quick Launch Banner for 26-Topic Verb Master Library */}
        <div className="mt-4 p-3.5 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-transparent border border-amber-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs text-slate-200">
              Need all German verb rules beyond modal verbs? Practice <strong>26 verb rules</strong> with <strong>208 authentic audio sentences</strong> and <strong>78 sentence workouts</strong>.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab("VERBS_LIBRARY")}
            className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center gap-1.5 shrink-0 self-start sm:self-auto shadow-sm"
          >
            <span>Open Verb Master Bank</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-800">
          {[
            { id: "MODAL_VERBS", label: "1. The 6 Modal Verbs", icon: Sparkles },
            { id: "REFLEXIV", label: "2. Reflexive Verben (mich/sich)", icon: RotateCcw },
            { id: "PARTIZIP_2", label: "3. Partizip II & Perfekt", icon: Award },
            { id: "SATZBAU", label: "4. Sentence Word Order (Satzbau)", icon: Layers },
            { id: "QUIZ", label: "5. 10-Question Pass Drill", icon: CheckCircle2 },
            { id: "PUZZLE", label: "6. Word Order Sentence Puzzle", icon: RotateCcw },
            { id: "PASS_GUARANTEE", label: "7. Will I Pass B1? (Guarantee)", icon: Award },
            { id: "VERBS_LIBRARY", label: "8. Verb Master Bank (26 Rules & 200+ Examples)", icon: Zap }
          ].map((tab) => {
            const Icon = tab.icon;
            const isCur = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  isCur
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black"
                    : "bg-slate-950/80 hover:bg-slate-800 text-slate-300 border border-slate-800"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: THE 6 MODAL VERBS */}
      {activeTab === "MODAL_VERBS" && (
        <div className="space-y-6">
          {/* #1 Exam Trap Callout Banner */}
          <div className="bg-rose-950/40 border border-rose-500/50 p-4 sm:p-5 rounded-2xl flex items-start gap-4 shadow-lg">
            <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5 text-xs sm:text-sm">
              <h4 className="font-black text-rose-200 text-base">
                CRITICAL EXAM TRAP: &ldquo;nicht dürfen&rdquo; vs &ldquo;nicht müssen&rdquo;
              </h4>
              <p className="text-slate-200 leading-relaxed">
                In almost every B1 reading and listening test, examiners test this exact distinction:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-950/80 p-3 rounded-xl border border-rose-500/30">
                  <span className="font-extrabold text-rose-300 block mb-1">
                    🚫 &ldquo;darf NICHT&rdquo; = STRICTLY FORBIDDEN (Verboten)
                  </span>
                  <span className="text-slate-300 text-xs">
                    Example: &ldquo;Hier darf man nicht parken.&rdquo; = Parking is prohibited by law.
                  </span>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-xl border border-emerald-500/30">
                  <span className="font-extrabold text-emerald-300 block mb-1">
                    🟢 &ldquo;muss NICHT&rdquo; = OPTIONAL / NO OBLIGATION (Freiwillig)
                  </span>
                  <span className="text-slate-300 text-xs">
                    Example: &ldquo;Sie müssen nicht bezahlen.&rdquo; = You don&apos;t have to pay, it is free of charge.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Verb Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {MODAL_VERBS_DATA.map((mv, idx) => {
              const isSelected = selectedVerbIdx === idx;
              return (
                <button
                  key={mv.verb}
                  onClick={() => setSelectedVerbIdx(idx)}
                  className={`p-3 rounded-2xl border text-left transition ${
                    isSelected
                      ? "bg-amber-500/20 border-amber-500 text-amber-200 shadow-md shadow-amber-500/10 font-bold"
                      : "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300"
                  }`}
                >
                  <div className="text-xs text-slate-400">Modalverb</div>
                  <div className="text-base sm:text-lg font-black text-white">{mv.verb}</div>
                  {showEnglish && <div className="text-[11px] text-slate-400 truncate">{mv.meaning_en}</div>}
                </button>
              );
            })}
          </div>

          {/* Selected Verb Detail Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-black text-white">{curVerb.verb}</h3>
                  <AudioVoiceButton text={curVerb.verb} label="Listen" />
                </div>
                {showEnglish && <p className="text-sm text-cyan-300 font-medium mt-0.5">{curVerb.meaning_en}</p>}
                <p className="text-xs text-slate-400 mt-1">{curVerb.coreFunction}</p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-2xl max-w-sm">
                <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4" />
                  <span>Exam Tip</span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                  {curVerb.examTrapWarning}
                </p>
              </div>
            </div>

            {/* Conjugation Tables (Präsens + Präteritum) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Präsens (Present Tense) */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Präsens (Present Tense) - Memorize for Speaking
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-800/80 flex justify-between">
                    <span className="text-slate-400">ich:</span>
                    <strong className="text-white font-mono">{curVerb.conjugation.ich}</strong>
                  </div>
                  <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-800/80 flex justify-between">
                    <span className="text-slate-400">wir:</span>
                    <strong className="text-white font-mono">{curVerb.conjugation.wir}</strong>
                  </div>
                  <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-800/80 flex justify-between">
                    <span className="text-slate-400">du:</span>
                    <strong className="text-white font-mono">{curVerb.conjugation.du}</strong>
                  </div>
                  <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-800/80 flex justify-between">
                    <span className="text-slate-400">ihr:</span>
                    <strong className="text-white font-mono">{curVerb.conjugation.ihr}</strong>
                  </div>
                  <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-800/80 flex justify-between">
                    <span className="text-slate-400">er/sie/es:</span>
                    <strong className="text-white font-mono">{curVerb.conjugation.er_sie_es}</strong>
                  </div>
                  <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-800/80 flex justify-between">
                    <span className="text-slate-400">sie/Sie:</span>
                    <strong className="text-white font-mono">{curVerb.conjugation.sie_Sie}</strong>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 italic">
                  Notice: &ldquo;ich&rdquo; and &ldquo;er/sie/es&rdquo; forms are ALWAYS identical for all modal verbs!
                </div>
              </div>

              {/* Präteritum / Konjunktiv II */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  {curVerb.pastOrPolite.label}
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-800/80 flex justify-between">
                    <span className="text-slate-400">ich:</span>
                    <strong className="text-white font-mono">{curVerb.pastOrPolite.forms.ich}</strong>
                  </div>
                  <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-800/80 flex justify-between">
                    <span className="text-slate-400">wir:</span>
                    <strong className="text-white font-mono">{curVerb.pastOrPolite.forms.wir}</strong>
                  </div>
                  <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-800/80 flex justify-between">
                    <span className="text-slate-400">du:</span>
                    <strong className="text-white font-mono">{curVerb.pastOrPolite.forms.du}</strong>
                  </div>
                  <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-800/80 flex justify-between">
                    <span className="text-slate-400">er/sie/es:</span>
                    <strong className="text-white font-mono">{curVerb.pastOrPolite.forms.er_sie_es}</strong>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500">
                  Essential for past excuses in writing (e.g. &ldquo;Ich musste zum Arzt gehen&rdquo;).
                </div>
              </div>
            </div>

            {/* High-Scoring Exam Sentences */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                High-Scoring B1 Sentences Using &ldquo;{curVerb.verb}&rdquo;
              </h4>
              <div className="space-y-2">
                {curVerb.sampleSentences.map((sent, sIdx) => (
                  <div key={sIdx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                        <span>{sent.de}</span>
                      </div>
                      <div className="text-xs text-slate-400">{sent.en}</div>
                      <div className="inline-block mt-1 px-2 py-0.5 bg-amber-500/10 text-amber-300 text-[10px] font-bold rounded border border-amber-500/20">
                        Exam Formula: {sent.highlight}
                      </div>
                    </div>
                    <AudioVoiceButton text={sent.de} />
                  </div>
                ))}
              </div>
            </div>

            {/* Active Sentence Workout & Fill-in-the-Blanks */}
            {(() => {
              const activeDrills = MODAL_DRILLS_DATA[curVerb.verb] || MODAL_DRILLS_DATA.können;
              const curDrill = activeDrills[modalDrillIndex % activeDrills.length];
              return (
                <div className="bg-slate-950 p-5 sm:p-7 rounded-3xl border border-amber-500/30 space-y-5 mt-6 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Active Sentence Workout
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          Übung {modalDrillIndex + 1} von {activeDrills.length}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-black text-white">
                        Lückentext: &ldquo;{curVerb.verb}&rdquo; im Satz anwenden
                      </h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs font-bold text-amber-300">
                        <Flame className="w-3.5 h-3.5 text-amber-400" />
                        <span>Serie: {modalWorkoutStreak}</span>
                      </div>
                      <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
                        <button
                          type="button"
                          onClick={() => setModalWorkoutMode("TYPE")}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                            modalWorkoutMode === "TYPE"
                              ? "bg-amber-500 text-slate-950 shadow-xs"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          ✍️ Tippen
                        </button>
                        <button
                          type="button"
                          onClick={() => setModalWorkoutMode("CHIP")}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                            modalWorkoutMode === "CHIP"
                              ? "bg-amber-500 text-slate-950 shadow-xs"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          🧩 Klick-Karten
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Sentence with Blank */}
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-3">
                    <div className="text-base sm:text-xl font-bold text-white font-sans leading-relaxed">
                      &ldquo;{curDrill.sentenceBefore}{" "}
                      <span className={`inline-block px-3 py-1 rounded-xl border-2 font-mono font-black text-sm sm:text-base transition ${
                        modalWorkoutSubmitted
                          ? modalWorkoutIsCorrect
                            ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                            : "bg-rose-950 border-rose-500 text-rose-300"
                          : "bg-slate-950 border-dashed border-amber-400 text-amber-300"
                      }`}>
                        {modalWorkoutMode === "TYPE" 
                          ? (modalUserTyped || "_____") 
                          : (modalSelectedChip || "_____")}
                      </span>{" "}
                      {curDrill.sentenceAfter}&rdquo;
                    </div>

                    <div className="text-xs text-slate-400">
                      {curDrill.translation}
                    </div>
                  </div>

                  {/* Interaction Controls */}
                  {modalWorkoutMode === "TYPE" ? (
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <input
                        type="text"
                        value={modalUserTyped}
                        onChange={(e) => setModalUserTyped(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !modalWorkoutSubmitted) {
                            handleModalWorkoutCheck();
                          }
                        }}
                        disabled={modalWorkoutSubmitted}
                        placeholder={`Passende Form von '${curVerb.verb}' eingeben (z.B. ${curDrill.blank})...`}
                        className="flex-1 w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-amber-400 font-mono"
                      />
                      {!modalWorkoutSubmitted ? (
                        <button
                          type="button"
                          onClick={() => handleModalWorkoutCheck()}
                          disabled={!modalUserTyped.trim()}
                          className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black text-sm rounded-2xl transition shadow-md shadow-amber-500/20"
                        >
                          Antwort prüfen ✦
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleNextModalDrill}
                          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-2xl transition flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
                        >
                          <span>Nächster Satz</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ) : (
                    /* CHIP CLICK / SELECTION MODE */
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        {curDrill.options.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            disabled={modalWorkoutSubmitted}
                            onClick={() => {
                              setModalSelectedChip(opt);
                              handleModalWorkoutCheck(opt);
                            }}
                            className={`px-5 py-3 rounded-2xl font-black text-sm font-mono border transition shadow-xs ${
                              modalWorkoutSubmitted
                                ? opt === curDrill.blank || curDrill.acceptableAnswers.includes(opt)
                                  ? "bg-emerald-600 text-white border-emerald-600"
                                  : opt === modalSelectedChip
                                  ? "bg-rose-600 text-white border-rose-600"
                                  : "bg-slate-900 border-slate-800 text-slate-500 opacity-60"
                                : modalSelectedChip === opt
                                ? "bg-amber-500 text-slate-950 border-amber-500"
                                : "bg-slate-900 border-slate-700 text-white hover:border-amber-400 hover:bg-slate-850"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>

                      {modalWorkoutSubmitted && (
                        <div className="flex justify-center pt-2">
                          <button
                            type="button"
                            onClick={handleNextModalDrill}
                            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-2xl transition flex items-center gap-2 shadow-md shadow-amber-500/20"
                          >
                            <span>Nächster Satz</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Feedback Box with Grammatical Rule */}
                  {modalWorkoutSubmitted && (
                    <div className={`p-4 rounded-2xl border space-y-1.5 animate-fadeIn ${
                      modalWorkoutIsCorrect
                        ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-200"
                        : "bg-rose-950/40 border-rose-500/50 text-rose-200"
                    }`}>
                      <div className="flex items-center gap-2 font-black text-sm">
                        {modalWorkoutIsCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Richtig! Ausgezeichnet kombiniert.</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-400" />
                            <span>Falsch. Richtige Form ist: <strong className="underline font-mono px-1">{curDrill.blank}</strong></span>
                          </>
                        )}
                      </div>
                      <p className="text-xs leading-relaxed opacity-95">
                        {curDrill.ruleExplanation}
                      </p>
                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400 italic font-mono">
                          Ganzer Satz: &ldquo;{curDrill.sentenceBefore} {curDrill.blank} {curDrill.sentenceAfter}&rdquo;
                        </span>
                        <AudioVoiceButton text={`${curDrill.sentenceBefore} ${curDrill.blank} ${curDrill.sentenceAfter}`} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      )}


      {/* TAB 2: REFLEXIVE VERBEN (mich, dich, sich) */}
      {activeTab === "REFLEXIV" && (() => {
        const reflexivItems = [
          {
            id: 1,
            before: "Ich freue",
            blank: "mich",
            after: "sehr auf meinen Urlaub in Spanien.",
            acceptable: ["mich"],
            options: ["mich", "mir", "sich", "dich"],
            translation: "I look forward very much to my vacation in Spain.",
            rule: "'sich freuen auf' takes Akkusativ: 'ich freue mich'."
          },
          {
            id: 2,
            before: "Herr Müller bewirbt",
            blank: "sich",
            after: "um die Stelle als Projektleiter.",
            acceptable: ["sich"],
            options: ["sich", "ihn", "ihm", "mich"],
            translation: "Mr. Müller applies for the position as project manager.",
            rule: "3rd-person singular 'Herr Müller' always takes 'sich'!"
          },
          {
            id: 3,
            before: "Ich putze",
            blank: "mir",
            after: "jeden Morgen gründlich die Zähne.",
            acceptable: ["mir"],
            options: ["mir", "mich", "dir", "sich"],
            translation: "I brush my teeth thoroughly every morning.",
            rule: "Dativ 'mir' because a direct object ('die Zähne') is present!"
          },
          {
            id: 4,
            before: "Wann treffen",
            blank: "wir",
            after: "uns am Samstag vor dem Kino?",
            acceptable: ["wir", "uns"],
            options: ["uns", "euch", "sich", "wir"],
            translation: "When do we meet on Saturday in front of the cinema?",
            rule: "1st-person plural reflexive pronoun is 'uns': 'wir treffen uns'."
          },
          {
            id: 5,
            before: "Interessieren Sie",
            blank: "sich",
            after: "für deutsche Geschichte und Kultur?",
            acceptable: ["sich"],
            options: ["sich", "Ihnen", "Sie", "euch"],
            translation: "Are you interested in German history and culture?",
            rule: "Formal 'Sie' takes 'sich': 'Interessieren Sie sich für...?'"
          },
          {
            id: 6,
            before: "Ich merke",
            blank: "mir",
            after: "die wichtigsten Grammatikregeln für die B1-Prüfung.",
            acceptable: ["mir"],
            options: ["mir", "mich", "sich", "dir"],
            translation: "I memorize the most important grammar rules for the B1 exam.",
            rule: "'sich merken' takes Dativ: 'ich merke mir'."
          }
        ];

        const curReflexiv = reflexivItems[reflexivDrillIdx % reflexivItems.length];

        const handleCheckReflexiv = (val?: string) => {
          const input = (val || reflexivTyped).trim().toLowerCase();
          if (!input) return;
          const isCorrect = curReflexiv.acceptable.includes(input);
          setReflexivSubmitted(true);
          setReflexivIsCorrect(isCorrect);
          if (isCorrect) {
            setReflexivScore(prev => prev + 1);
            confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
          }
        };

        const handleNextReflexiv = () => {
          setReflexivDrillIdx(prev => (prev + 1) % reflexivItems.length);
          setReflexivTyped("");
          setReflexivSelected(null);
          setReflexivSubmitted(false);
          setReflexivIsCorrect(null);
        };

        return (
          <div className="space-y-6">
            {/* Header Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    High-Yield B1 Reflexive Verben
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    Reflexive Verben: Akkusativ vs. Dativ
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    90% of German reflexive verbs take Akkusativ (mich, dich, sich). Only when a direct noun object is present does it switch to Dativ (mir, dir).
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-mono font-black text-amber-400">{reflexivScore} / {reflexivItems.length}</div>
                  <div className="text-[10px] text-slate-500 font-semibold">Workout Score</div>
                </div>
              </div>

              {/* Pronoun Reference Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-950 text-slate-300 border-b border-slate-800 font-bold">
                    <tr>
                      <th className="p-3">Personalpronomen</th>
                      <th className="p-3 text-purple-400">Akkusativ (Standard)</th>
                      <th className="p-3 text-cyan-400">Dativ (Mit weiterem Objekt)</th>
                      <th className="p-3">Praxis-Beispiel</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
                    <tr>
                      <td className="p-3 font-bold text-white">ich</td>
                      <td className="p-3 font-mono text-purple-300 font-bold">mich</td>
                      <td className="p-3 font-mono text-cyan-300 font-bold">mir</td>
                      <td className="p-3">Ich wasche mich. vs. Ich wasche mir die Hände.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">du</td>
                      <td className="p-3 font-mono text-purple-300 font-bold">dich</td>
                      <td className="p-3 font-mono text-cyan-300 font-bold">dir</td>
                      <td className="p-3">Du ziehst dich an. vs. Du putzt dir die Zähne.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">er / sie / es</td>
                      <td className="p-3 font-mono text-purple-300 font-bold">sich</td>
                      <td className="p-3 font-mono text-cyan-300 font-bold">sich</td>
                      <td className="p-3 text-amber-300 font-bold">Always 'sich' in both cases!</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">wir</td>
                      <td className="p-3 font-mono text-purple-300 font-bold">uns</td>
                      <td className="p-3 font-mono text-cyan-300 font-bold">uns</td>
                      <td className="p-3">Wir treffen uns um 18 Uhr.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">ihr</td>
                      <td className="p-3 font-mono text-purple-300 font-bold">euch</td>
                      <td className="p-3 font-mono text-cyan-300 font-bold">euch</td>
                      <td className="p-3">Ruht euch gut aus!</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">sie / Sie</td>
                      <td className="p-3 font-mono text-purple-300 font-bold">sich</td>
                      <td className="p-3 font-mono text-cyan-300 font-bold">sich</td>
                      <td className="p-3 text-amber-300 font-bold">Always 'sich' in both cases!</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Interactive Workout Card */}
            <div className="bg-slate-950 p-6 rounded-3xl border border-purple-500/30 space-y-5 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-purple-400">
                  Reflexive Sentence Workout (Question {curReflexiv.id} of {reflexivItems.length})
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setReflexivMode("TYPE")}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition border ${
                      reflexivMode === "TYPE" ? "bg-purple-600 text-white border-purple-500" : "bg-slate-900 text-slate-400 border-slate-800"
                    }`}
                  >
                    Typing Mode
                  </button>
                  <button
                    type="button"
                    onClick={() => setReflexivMode("CHIP")}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition border ${
                      reflexivMode === "CHIP" ? "bg-purple-600 text-white border-purple-500" : "bg-slate-900 text-slate-400 border-slate-800"
                    }`}
                  >
                    Multiple Choice Chips
                  </button>
                </div>
              </div>

              {/* Sentence Blank Display */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center text-lg sm:text-xl font-black text-white leading-relaxed">
                &ldquo;{curReflexiv.before}
                <span className="inline-block mx-2 px-3 py-1 border-2 border-dashed rounded-xl min-w-[70px] bg-slate-950 border-purple-400 text-purple-300">
                  {reflexivSelected || reflexivTyped || "___"}
                </span>
                {curReflexiv.after}&rdquo;
              </div>

              {/* Input Area */}
              {reflexivMode === "TYPE" ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={reflexivTyped}
                    onChange={(e) => setReflexivTyped(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCheckReflexiv()}
                    placeholder="Type missing reflexive pronoun (mich, mir, sich...)"
                    className="flex-1 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-white text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleCheckReflexiv()}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm rounded-2xl transition"
                  >
                    Check
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 pt-1">
                  {curReflexiv.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setReflexivSelected(opt);
                        handleCheckReflexiv(opt);
                      }}
                      className={`px-5 py-2.5 rounded-xl font-bold text-sm border transition ${
                        reflexivSelected === opt
                          ? reflexivIsCorrect
                            ? "bg-emerald-600 text-white border-emerald-500"
                            : "bg-rose-600 text-white border-rose-500"
                          : "bg-slate-900 text-slate-200 border-slate-700 hover:border-purple-400"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Feedback Banner */}
              {reflexivSubmitted && (
                <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold space-y-1 ${
                  reflexivIsCorrect ? "bg-emerald-950/60 border-emerald-500 text-emerald-200" : "bg-rose-950/60 border-rose-500 text-rose-200"
                }`}>
                  <div className="flex items-center gap-1.5">
                    {reflexivIsCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
                    <span>{reflexivIsCorrect ? "Ausgezeichnet! Richtig!" : `Falsch! Erwartet: ${curReflexiv.acceptable[0]}`}</span>
                  </div>
                  <div className="font-normal text-slate-200">{curReflexiv.rule}</div>
                  <div className="text-[11px] text-slate-400 pt-1">Translation: {curReflexiv.translation}</div>
                </div>
              )}

              {reflexivSubmitted && (
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={handleNextReflexiv}
                    className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition shadow-md"
                  >
                    Next Reflexive Sentence ({((reflexivDrillIdx + 1) % reflexivItems.length) + 1} of {reflexivItems.length})
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* TAB 3: PARTIZIP II & PERFEKT (Past Tense Master) */}
      {activeTab === "PARTIZIP_2" && (() => {
        const partizipItems = [
          {
            id: 1,
            before: "Ich habe gestern meine Hausaufgaben sorgfältig",
            blank: "gemacht",
            after: ".",
            acceptable: ["gemacht"],
            options: ["gemacht", "gemachen", "macht", "gemachte"],
            translation: "I did my homework carefully yesterday.",
            rule: "Regular weak verb: ge- + mach- + -t = 'gemacht'."
          },
          {
            id: 2,
            before: "Mein Bruder hat fünf Jahre in Heidelberg Medizin",
            blank: "studiert",
            after: ".",
            acceptable: ["studiert"],
            options: ["studiert", "gestudiert", "studieren", "studierte"],
            translation: "My brother studied medicine in Heidelberg for five years.",
            rule: "Verbs ending in '-ieren' NEVER take 'ge-': studieren -> studiert!"
          },
          {
            id: 3,
            before: "Der Zug ist pünktlich um 14 Uhr am Hauptbahnhof",
            blank: "angekommen",
            after: ".",
            acceptable: ["angekommen"],
            options: ["angekommen", "geankommen", "ankommt", "angekommt"],
            translation: "The train arrived punctually at 2 PM at the main station.",
            rule: "Separable verb: prefix (an-) + -ge- + strong stem (-komm-) + -en = 'angekommen'. Triggers SEIN!"
          },
          {
            id: 4,
            before: "Er hat die schwierige Grammatikregel sofort",
            blank: "verstanden",
            after: ".",
            acceptable: ["verstanden"],
            options: ["verstanden", "geverstanden", "versteht", "verstandet"],
            translation: "He understood the difficult grammar rule immediately.",
            rule: "Inseparable prefix 'ver-': NEVER takes 'ge-': verstehen -> verstanden."
          },
          {
            id: 5,
            before: "Am Wochenende sind wir zu Hause",
            blank: "geblieben",
            after: ", weil es geregnet hat.",
            acceptable: ["geblieben"],
            options: ["geblieben", "bleiben", "gebleibt", "gebliebt"],
            translation: "On the weekend we stayed at home because it rained.",
            rule: "Vowel mutation: bleiben -> geblieben. Triggers SEIN ('wir sind geblieben')!"
          },
          {
            id: 6,
            before: "Ich habe heute morgen eine wichtige E-Mail an die Behörde",
            blank: "geschrieben",
            after: ".",
            acceptable: ["geschrieben"],
            options: ["geschrieben", "geschreibt", "schreiben", "geschriebt"],
            translation: "I wrote an important email to the authority this morning.",
            rule: "Strong verb with vowel change: schreiben (ei) -> geschrieben (ie)."
          }
        ];

        const curPartizip = partizipItems[partizipDrillIdx % partizipItems.length];

        const handleCheckPartizip = (val?: string) => {
          const input = (val || partizipTyped).trim().toLowerCase();
          if (!input) return;
          const isCorrect = curPartizip.acceptable.includes(input);
          setPartizipSubmitted(true);
          setPartizipIsCorrect(isCorrect);
          if (isCorrect) {
            setPartizipScore(prev => prev + 1);
            confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
          }
        };

        const handleNextPartizip = () => {
          setPartizipDrillIdx(prev => (prev + 1) % partizipItems.length);
          setPartizipTyped("");
          setPartizipSelected(null);
          setPartizipSubmitted(false);
          setPartizipIsCorrect(null);
        };

        return (
          <div className="space-y-6">
            {/* Blueprint Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    High-Yield B1 Perfekt & Vergangenheit
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    Partizip II & Perfekt: Die 5 Goldenen Regeln
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Spoken German in B1 uses Perfekt (haben / sein + Partizip II) for 95% of past events!
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-mono font-black text-amber-400">{partizipScore} / {partizipItems.length}</div>
                  <div className="text-[10px] text-slate-500 font-semibold">Workout Score</div>
                </div>
              </div>

              {/* 5 Rules Cheat Sheet */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-400 block">1. Regelmäßige Verben:</span>
                  <div className="font-mono text-purple-300">ge- + Stamm + -t</div>
                  <div className="text-slate-400">machen &rarr; gemacht | kaufen &rarr; gekauft</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-400 block">2. Verben auf -ieren:</span>
                  <div className="font-mono text-cyan-300">Stamm + -t (NIEMALS ge-!)</div>
                  <div className="text-slate-400">studieren &rarr; studiert | reparieren &rarr; repariert</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-400 block">3. Trennbare Verben:</span>
                  <div className="font-mono text-emerald-300">Vorsilbe + -ge- + Stamm + -t/-en</div>
                  <div className="text-slate-400">einkaufen &rarr; eingekauft | anrufen &rarr; angerufen</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-400 block">4. Untrennbare Verben:</span>
                  <div className="font-mono text-rose-300">be-, ver-, er-, ent- (KEIN ge-!)</div>
                  <div className="text-slate-400">verstehen &rarr; verstanden | besuchen &rarr; besucht</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 md:col-span-2">
                  <span className="font-bold text-amber-400 block">5. Hilfsverb: haben vs. sein</span>
                  <div className="text-slate-300">
                    <strong>SEIN</strong> bei Bewegung von A nach B (ist gefahren, ist gelaufen) & Zustandswechsel (ist aufgewacht, ist gestorben) sowie bei <em>bleiben</em> (ist geblieben). <strong>HABEN</strong> für alle anderen!
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Partizip II Workout */}
            <div className="bg-slate-950 p-6 rounded-3xl border border-amber-500/30 space-y-5 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-amber-400">
                  Partizip II Sentence Workout (Question {curPartizip.id} of {partizipItems.length})
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPartizipMode("TYPE")}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition border ${
                      partizipMode === "TYPE" ? "bg-amber-500 text-slate-950 border-amber-400 font-black" : "bg-slate-900 text-slate-400 border-slate-800"
                    }`}
                  >
                    Typing Mode
                  </button>
                  <button
                    type="button"
                    onClick={() => setPartizipMode("CHIP")}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition border ${
                      partizipMode === "CHIP" ? "bg-amber-500 text-slate-950 border-amber-400 font-black" : "bg-slate-900 text-slate-400 border-slate-800"
                    }`}
                  >
                    Multiple Choice Chips
                  </button>
                </div>
              </div>

              {/* Sentence Blank Display */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center text-lg sm:text-xl font-black text-white leading-relaxed">
                &ldquo;{curPartizip.before}
                <span className="inline-block mx-2 px-3 py-1 border-2 border-dashed rounded-xl min-w-[80px] bg-slate-950 border-amber-400 text-amber-300">
                  {partizipSelected || partizipTyped || "___"}
                </span>
                {curPartizip.after}&rdquo;
              </div>

              {/* Input Area */}
              {partizipMode === "TYPE" ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={partizipTyped}
                    onChange={(e) => setPartizipTyped(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCheckPartizip()}
                    placeholder="Type missing Partizip II (gemacht, studiert, angekommen...)"
                    className="flex-1 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-white text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleCheckPartizip()}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-2xl transition"
                  >
                    Check
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 pt-1">
                  {curPartizip.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setPartizipSelected(opt);
                        handleCheckPartizip(opt);
                      }}
                      className={`px-5 py-2.5 rounded-xl font-bold text-sm border transition ${
                        partizipSelected === opt
                          ? partizipIsCorrect
                            ? "bg-emerald-600 text-white border-emerald-500"
                            : "bg-rose-600 text-white border-rose-500"
                          : "bg-slate-900 text-slate-200 border-slate-700 hover:border-amber-400"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Feedback Banner */}
              {partizipSubmitted && (
                <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold space-y-1 ${
                  partizipIsCorrect ? "bg-emerald-950/60 border-emerald-500 text-emerald-200" : "bg-rose-950/60 border-rose-500 text-rose-200"
                }`}>
                  <div className="flex items-center gap-1.5">
                    {partizipIsCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
                    <span>{partizipIsCorrect ? "Ausgezeichnet! Richtig!" : `Falsch! Erwartet: ${curPartizip.acceptable[0]}`}</span>
                  </div>
                  <div className="font-normal text-slate-200">{curPartizip.rule}</div>
                  <div className="text-[11px] text-slate-400 pt-1">Translation: {curPartizip.translation}</div>
                </div>
              )}

              {partizipSubmitted && (
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={handleNextPartizip}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition shadow-md"
                  >
                    Next Partizip II Sentence ({((partizipDrillIdx + 1) % partizipItems.length) + 1} of {partizipItems.length})
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* TAB 2: SATZBAU (SENTENCE WORD ORDER) */}
      {activeTab === "SATZBAU" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SATZBAU_RULES_DATA.map((rule) => {
              const isSelected = selectedRuleId === rule.id;
              return (
                <button
                  key={rule.id}
                  onClick={() => setSelectedRuleId(rule.id)}
                  className={`p-4 rounded-2xl border text-left transition ${
                    isSelected
                      ? "bg-amber-500/20 border-amber-500 text-amber-200 shadow-md shadow-amber-500/10 font-bold"
                      : "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300"
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold text-slate-500">{rule.category}</div>
                  <div className="text-sm font-extrabold text-white mt-0.5">{rule.title}</div>
                </button>
              );
            })}
          </div>

          {/* Rule Detail Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
            <div className="space-y-2 pb-4 border-b border-slate-800">
              <h3 className="text-xl font-black text-white">{curRule.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {curRule.ruleDescription}
              </p>

              {/* Visual Formula Box */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/40 text-amber-300 font-mono text-xs sm:text-sm font-extrabold tracking-wide mt-3 shadow-inner">
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-1 font-sans">
                  The B1 Sentence Formula:
                </span>
                {curRule.formula}
              </div>
            </div>

            {/* Connectors list if applicable */}
            {curRule.connectors && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Key Connectors in this Category:
                </div>
                <div className="flex flex-wrap gap-2">
                  {curRule.connectors.map((conn, cIdx) => (
                    <span
                      key={cIdx}
                      className="px-3 py-1 bg-slate-950 text-cyan-300 rounded-xl text-xs font-mono font-bold border border-cyan-500/30"
                    >
                      {conn}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Examples */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Exam-Standard Examples:
              </div>
              <div className="space-y-2">
                {curRule.examples.map((eg, egIdx) => (
                  <div key={egIdx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="text-sm sm:text-base font-bold text-white">{eg.de}</div>
                      <div className="text-xs text-slate-400">{eg.en}</div>
                      <div className="text-[11px] text-amber-400/90 font-medium pt-1">
                        Verb Position: {eg.verbPos}
                      </div>
                    </div>
                    <AudioVoiceButton text={eg.de} />
                  </div>
                ))}
              </div>
            </div>

            {/* Trap to Avoid */}
            <div className="p-4 bg-rose-950/30 border border-rose-500/30 rounded-2xl text-xs text-rose-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold mb-0.5">Examiner Trap to Avoid:</strong>
                {curRule.trapToAvoid}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 10-QUESTION PASS DRILL */}
      {activeTab === "QUIZ" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 max-w-2xl mx-auto shadow-2xl space-y-6">
          {/* Progress Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 font-bold rounded-lg border border-amber-500/20">
                Drill Question {quizIdx + 1} / {GRAMMAR_QUIZ_QUESTIONS.length}
              </span>
              <span className="text-slate-400 text-[11px]">{curQuizQ.category}</span>
            </div>

            <div className="text-xs text-slate-300">
              Score: <strong className="text-amber-400">{quizScore}</strong> / {answeredCount}
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                {curQuizQ.prompt_de}
              </h3>
              <AudioVoiceButton text={curQuizQ.prompt_de} className="shrink-0" />
            </div>
            {showEnglish && (
              <p className="text-xs sm:text-sm font-semibold text-cyan-300 bg-cyan-950/30 p-2.5 rounded-xl border border-cyan-500/20">
                {curQuizQ.prompt_en}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-3">
            {shuffledQuizOptions.map((opt, optIdx) => {
              const isSelected = selectedAnswerIdx === optIdx;
              const hasAnswered = selectedAnswerIdx !== null;

              let style = "bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-200";
              if (hasAnswered) {
                if (opt.isCorrect) {
                  style = "bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold shadow-md shadow-emerald-500/20";
                } else if (isSelected && !opt.isCorrect) {
                  style = "bg-rose-950/70 border-rose-500 text-rose-200 font-bold shadow-md shadow-rose-500/20";
                }
              }

              return (
                <button
                  key={optIdx}
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 rounded-2xl border text-left transition flex items-start gap-3.5 min-h-[56px] ${style}`}
                >
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 mt-0.5 border ${
                    hasAnswered && opt.isCorrect
                      ? "bg-emerald-500 text-slate-950 border-emerald-400"
                      : hasAnswered && isSelected && !opt.isCorrect
                      ? "bg-rose-500 text-white border-rose-400"
                      : "bg-slate-900 border-slate-700 text-slate-400"
                  }`}>
                    {["A", "B", "C"][optIdx]}
                  </span>
                  <div className="space-y-1">
                    <div className="text-sm sm:text-base leading-snug">{opt.text}</div>
                    {hasAnswered && (
                      <div className="text-xs text-slate-300 font-normal pt-1 border-t border-slate-800/80">
                        {opt.explanation_de}
                        {showEnglish && <div className="text-slate-400 text-[11px]">{opt.explanation_en}</div>}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          {selectedAnswerIdx !== null && (
            <div className="pt-2 animate-fadeIn">
              <button
                onClick={handleNextQuiz}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-2xl text-base shadow-lg shadow-amber-500/25 transition flex items-center justify-center gap-2"
              >
                <span>Next Drill Question</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: WORD ORDER PUZZLE */}
      {activeTab === "PUZZLE" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 max-w-2xl mx-auto shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
            <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 font-bold rounded-lg border border-amber-500/20">
              Puzzle {puzzleIdx + 1} of {WORD_ORDER_PUZZLES.length}
            </span>
            <button
              onClick={handleResetPuzzle}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Goal prompt in English */}
          <div className="space-y-1 text-center">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">
              Assemble the German Sentence:
            </div>
            <h3 className="text-lg sm:text-xl font-black text-amber-300">
              &ldquo;{curPuzzle.prompt_en}&rdquo;
            </h3>
          </div>

          {/* Assembled Sentence Drop Area */}
          <div className="min-h-[76px] p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 flex flex-wrap items-center gap-2">
            {assembledTokens.length === 0 ? (
              <span className="text-xs text-slate-500 mx-auto italic">
                Tap the words below in the correct B1 sentence order...
              </span>
            ) : (
              assembledTokens.map((tok, tIdx) => (
                <button
                  key={tIdx}
                  onClick={() => handleRemoveToken(tIdx)}
                  className="px-3 py-1.5 bg-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-sm hover:bg-amber-400 transition"
                  title="Tap to remove"
                >
                  {tok}
                </button>
              ))
            )}
          </div>

          {/* Word Bank */}
          <div className="space-y-2">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
              Word Bank (Tap to add):
            </div>
            <div className="flex flex-wrap gap-2">
              {remainingTokens.map((tok, rIdx) => (
                <button
                  key={rIdx}
                  onClick={() => handleAddToken(tok, rIdx)}
                  className="px-3 py-2 bg-slate-950 hover:bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm rounded-xl border border-slate-800 active:scale-95 transition"
                >
                  {tok}
                </button>
              ))}
            </div>
          </div>

          {/* Result Feedback */}
          {puzzleFeedback === "CORRECT" && (
            <div className="p-4 bg-emerald-950/50 border border-emerald-500/50 rounded-2xl text-emerald-200 text-xs sm:text-sm space-y-1 animate-fadeIn">
              <div className="flex items-center gap-2 font-black text-emerald-300">
                <CheckCircle2 className="w-5 h-5" />
                <span>Perfekt! Correct Word Order!</span>
              </div>
              <p className="text-slate-300 leading-relaxed pt-1">
                {curPuzzle.ruleExplanation}
              </p>
            </div>
          )}

          {puzzleFeedback === "INCORRECT" && (
            <div className="p-4 bg-rose-950/50 border border-rose-500/50 rounded-2xl text-rose-200 text-xs sm:text-sm space-y-1 animate-fadeIn">
              <div className="flex items-center gap-2 font-black text-rose-300">
                <XCircle className="w-5 h-5" />
                <span>Nicht ganz richtig (Not quite right)</span>
              </div>
              <p className="text-slate-300 text-xs">
                Check the verb position: modal verb in Pos 2, action verb at the end, or subclause connector kicking the verb to the end.
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-2">
            {puzzleFeedback !== "CORRECT" ? (
              <button
                onClick={handleCheckPuzzle}
                disabled={assembledTokens.length === 0}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:hover:bg-amber-500 text-slate-950 font-black rounded-2xl text-sm transition shadow-md shadow-amber-500/20"
              >
                Check Sentence Order
              </button>
            ) : (
              <button
                onClick={handleNextPuzzle}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black rounded-2xl text-sm transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                <span>Next Puzzle</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: PASS B1 GUARANTEE MATRIX */}
      {activeTab === "PASS_GUARANTEE" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-300 rounded-full text-xs font-bold border border-amber-500/30">
              <Award className="w-4 h-4 text-amber-400" />
              <span>The B1 Passing Reality</span>
            </div>
            <h3 className="text-2xl font-black text-white">
              &ldquo;If someone completes this training, will they pass?&rdquo;
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              <strong>YES.</strong> German language exams (Goethe Zertifikat B1, TELC Deutsch B1, and DTZ) are graded strictly against objective CEFR rubrics. The passing mark is <strong>60%</strong> (18 out of 30, or 60/100 points).
            </p>
          </div>

          {/* The 3 Official Exam Formats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PASS_B1_CRITERIA_SUMMARY.examBreakdown.map((ex, idx) => (
              <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="font-extrabold text-white text-base text-amber-400">{ex.exam}</div>
                <div className="text-xs text-slate-400 font-semibold">
                  Passing Bar: <span className="text-slate-200">{ex.passThreshold}</span>
                </div>
                <div className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                  {ex.strategySummary}
                </div>
              </div>
            ))}
          </div>

          {/* Why practicing our platform guarantees passing */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Why Our Minimum-Viable Curriculum Guarantees Passing:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PASS_B1_CRITERIA_SUMMARY.whyOurTrainingGuaranteesPass.map((item, iIdx) => (
                <div key={iIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                    {iIdx + 1}
                  </span>
                  <span className="text-xs text-slate-200 leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Exam Day Blueprint */}
          <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl space-y-2">
            <div className="font-extrabold text-amber-300 text-sm flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>The 60% Passing Formula for an A1 Learner:</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li><strong>Schreiben (Writing):</strong> Memorize our 8 letter templates. Plug in the test names, dates, and excuses. Using &ldquo;weil&rdquo;, &ldquo;dass&rdquo;, and &ldquo;Könnten Sie bitte...&rdquo; guarantees 75%+ in writing.</li>
              <li><strong>Sprechen (Speaking):</strong> Master the 5-sentence picture description (&ldquo;Auf dem Bild sehe ich...&rdquo;) and joint planning formula (&ldquo;Wollen wir uns am Samstag treffen?&rdquo;). Evaluators reward structure over perfection.</li>
              <li><strong>Lesen & Hören:</strong> Focus on signal words and avoid the &ldquo;nicht dürfen&rdquo; vs &ldquo;nicht müssen&rdquo; traps. You only need 18 out of 30 correct!</li>
              <li><strong>Citizenship Test:</strong> You only need 17 out of 33 correct (51%). With our 10-question sprint batches, achieving 17 is virtually effortless.</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 6: VERB MASTER LIBRARY & 200+ EXAMPLE BANK */}
      {activeTab === "VERBS_LIBRARY" && (
        <div className="space-y-6 animate-fadeIn">
          <VerbMasterLibrary />
        </div>
      )}
    </div>
  );
};
