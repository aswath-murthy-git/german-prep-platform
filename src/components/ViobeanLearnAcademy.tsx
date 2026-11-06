"use client";

import React, { useState, useMemo } from "react";
import { useUser } from "@/context/UserContext";
import confetti from "canvas-confetti";
import { 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw,
  Sparkles,
  Volume2,
  Lightbulb,
  Clock,
  Check,
  Award,
  AlertCircle,
  Keyboard,
  MousePointerClick,
  Flame,
  HelpCircle,
  BookOpen,
  Zap
} from "lucide-react";
import { LEARN_ACADEMY_LESSONS, TopicLessonData } from "@/data/learn_academy_lessons";
import { VerbMasterLibrary } from "@/components/VerbMasterLibrary";

interface TopicCatalogItem {
  id: string;
  level: "A1" | "A2" | "B1";
  title: string;
  desc: string;
  duration: string;
  stepsCount: number;
  completed: boolean;
  mastery: number;
  badge: string;
}

interface ViobeanLearnAcademyProps {
  onNavigateToSection?: (section: string) => void;
  onOpenAiCoach?: () => void;
}

export const ViobeanLearnAcademy: React.FC<ViobeanLearnAcademyProps> = ({
  onNavigateToSection,
  onOpenAiCoach
}) => {
  const { profile, theme } = useUser();
  const [activeTab, setActiveTab] = useState<"CATALOG" | "PLAYER" | "VERBS_LIBRARY">("CATALOG");
  const [selectedTopicId, setSelectedTopicId] = useState<string>("a1-praesens");
  const [filterLevel, setFilterLevel] = useState<"ALL" | "A1" | "A2" | "B1">("ALL");

  const isDark = theme === "dark";

  // Active topic & lesson data
  const currentLesson: TopicLessonData = 
    LEARN_ACADEMY_LESSONS[selectedTopicId] || LEARN_ACADEMY_LESSONS["a1-praesens"];
  const lessonSteps = currentLesson.steps;

  // Lesson player navigation state
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([0]);
  const [playerSpeed, setPlayerSpeed] = useState<number>(1.0);

  const currentStepDef = lessonSteps[currentStep] || lessonSteps[0];
  const stepType = currentStepDef?.type || (
    currentStep === 0 ? "intro" :
    currentStep === 1 ? "table" :
    currentStep === 2 ? "drill1" :
    currentStep === 3 ? "drill2" :
    currentStep === 4 ? "typing" :
    currentStep === 5 ? "nuance" :
    currentStep === 6 ? "quiz" : "summary"
  );

  // Exercise states for Step 2: Drill 1 (Multiple Choice / Quick Recall)
  const [drill1Index, setDrill1Index] = useState<number>(0);
  const [selectedDrill1Option, setSelectedDrill1Option] = useState<string | null>(null);
  const [drill1Feedback, setDrill1Feedback] = useState<"correct" | "incorrect" | null>(null);
  const [drill1Score, setDrill1Score] = useState<number>(0);

  // Exercise states for Step 3: Drill 2 (Interactive Nuance / Gender / Placement)
  const [drill2Index, setDrill2Index] = useState<number>(0);
  const [selectedDrill2Option, setSelectedDrill2Option] = useState<string | null>(null);
  const [drill2Feedback, setDrill2Feedback] = useState<"correct" | "incorrect" | null>(null);
  const [drill2Score, setDrill2Score] = useState<number>(0);

  // Bonus Gender sorting bucket state for a1-genus in Step 3
  const [sortedBuckets, setSortedBuckets] = useState<{
    der: string[];
    die: string[];
    das: string[];
  }>({
    der: [],
    die: [],
    das: []
  });
  const [remainingWords, setRemainingWords] = useState<string[]>([
    "Zeitung", "Computer", "Mädchen", "Wohnung", "Auto", "Freiheit", "Frühling", "Ergebnis"
  ]);

  // Exercise states for Step 4: Active Recall & Sentence Typing Workout
  const [typingIndex, setTypingIndex] = useState<number>(0);
  const [typedInput, setTypedInput] = useState<string>("");
  const [showTypingHint, setShowTypingHint] = useState<boolean>(false);
  const [typingMode, setTypingMode] = useState<"type" | "click">("type");
  const [typingFeedback, setTypingFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [typingScore, setTypingScore] = useState<number>(0);
  const [typingStreak, setTypingStreak] = useState<number>(0);
  const [wasFullSentence, setWasFullSentence] = useState<boolean>(false);

  // Exercise states for Step 6: Mini Sprint Quiz
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);

  // Topics Catalog dynamically derived from LEARN_ACADEMY_LESSONS (all 15 modules across A1, A2, and B1)
  const topicsCatalog: TopicCatalogItem[] = useMemo(() => {
    return Object.values(LEARN_ACADEMY_LESSONS).map((l, idx) => ({
      id: l.id,
      level: l.level,
      title: l.title,
      desc: l.desc,
      duration: l.duration,
      stepsCount: l.steps?.length || 8,
      completed: idx === 0,
      mastery: idx === 0 ? 100 : Math.min(85, 20 + ((idx * 7) % 60)),
      badge: l.badge
    }));
  }, []);

  const currentTopicMeta = topicsCatalog.find(t => t.id === selectedTopicId) || topicsCatalog[0];

  const filteredTopics = filterLevel === "ALL" 
    ? topicsCatalog 
    : topicsCatalog.filter(t => t.level === filterLevel);

  // Audio speech player
  const handlePlayAudio = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      utterance.rate = playerSpeed;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Gender Map for a1-genus bonus sorter
  const GENDER_MAP: Record<string, "der" | "die" | "das"> = {
    "Zeitung": "die",
    "Computer": "der",
    "Mädchen": "das",
    "Wohnung": "die",
    "Auto": "das",
    "Freiheit": "die",
    "Frühling": "der",
    "Ergebnis": "das"
  };

  const handleSortWord = (word: string, targetBucket: "der" | "die" | "das") => {
    const isCorrect = GENDER_MAP[word] === targetBucket;
    if (isCorrect) {
      setSortedBuckets(prev => ({
        ...prev,
        [targetBucket]: [...prev[targetBucket], word]
      }));
      setRemainingWords(prev => prev.filter(w => w !== word));
      if (remainingWords.length <= 1) {
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
        setCompletedSteps(prev => [...new Set([...prev, 3])]);
      }
    } else {
      alert(`Falsch! '${word}' gehört zu '${GENDER_MAP[word]}'. Tipp: Achten Sie auf die Nachsilbe (Suffix)!`);
    }
  };

  // Text normalization for typing input
  const normalizeText = (str: string) =>
    str
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()""„“»«!?]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  // Reset drill and exercise states when switching topics or re-running lesson
  const resetAllLessonStates = () => {
    setCurrentStep(0);
    setCompletedSteps([0]);
    // Drill 1
    setDrill1Index(0);
    setSelectedDrill1Option(null);
    setDrill1Feedback(null);
    setDrill1Score(0);
    // Drill 2
    setDrill2Index(0);
    setSelectedDrill2Option(null);
    setDrill2Feedback(null);
    setDrill2Score(0);
    // Gender
    setSortedBuckets({ der: [], die: [], das: [] });
    setRemainingWords(["Zeitung", "Computer", "Mädchen", "Wohnung", "Auto", "Freiheit", "Frühling", "Ergebnis"]);
    // Typing
    setTypingIndex(0);
    setTypedInput("");
    setShowTypingHint(false);
    setTypingFeedback(null);
    setTypingScore(0);
    setTypingStreak(0);
    setWasFullSentence(false);
    // Quiz
    setQuizIndex(0);
    setSelectedQuizOption(null);
    setQuizScore(0);
    setQuizAnswered(false);
  };

  // Start selected lesson
  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setActiveTab("PLAYER");
    resetAllLessonStates();
  };

  // Step advancement
  const handleNextStep = () => {
    if (currentStep < lessonSteps.length - 1) {
      setCompletedSteps(prev => [...new Set([...prev, currentStep])]);
      setCurrentStep(prev => prev + 1);
    } else {
      setActiveTab("CATALOG");
    }
  };

  // Sentence typing validation logic
  const handleCheckTyping = () => {
    if (!typedInput.trim()) return;
    const curItem = currentLesson.typingWorkout.items[typingIndex];
    if (!curItem) return;

    const cleanInput = normalizeText(typedInput);

    // 1. Exact match against acceptable answers
    let isMatch = false;
    let isFullSentenceMatch = false;

    for (const acc of curItem.acceptableAnswers) {
      if (cleanInput === normalizeText(acc)) {
        isMatch = true;
        break;
      }
    }

    // 2. Full sentence match: sentenceBefore + acceptableAnswer + sentenceAfter
    if (!isMatch) {
      for (const acc of curItem.acceptableAnswers) {
        const fullExpected = normalizeText(`${curItem.sentenceBefore} ${acc} ${curItem.sentenceAfter}`);
        if (cleanInput === fullExpected) {
          isMatch = true;
          isFullSentenceMatch = true;
          break;
        }
      }
    }

    setTypingFeedback(isMatch ? "correct" : "incorrect");
    setWasFullSentence(isFullSentenceMatch);

    if (isMatch) {
      setTypingScore(prev => prev + 1);
      const newStreak = typingStreak + 1;
      setTypingStreak(newStreak);
      if (newStreak % 3 === 0) {
        confetti({ particleCount: 35, spread: 55, origin: { y: 0.65 } });
      }
      // Play audio of the complete correct sentence
      const spokenSentence = `${curItem.sentenceBefore} ${curItem.acceptableAnswers[0]} ${curItem.sentenceAfter}`.replace(/\s+/g, " ").trim();
      handlePlayAudio(spokenSentence);
    } else {
      setTypingStreak(0);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* ─── TOP PRIMARY MODE SWITCHER ─── */}
      <div className="flex flex-wrap items-center gap-2 pb-1">
        <button
          type="button"
          onClick={() => setActiveTab("CATALOG")}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 border transition ${
            activeTab === "CATALOG" || activeTab === "PLAYER"
              ? "bg-purple-600 text-white border-purple-600 shadow-sm"
              : isDark
              ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
              : "bg-white border-slate-200 text-slate-600 hover:text-slate-900"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{Object.keys(LEARN_ACADEMY_LESSONS).length} Lesson Blueprints</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("VERBS_LIBRARY")}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 border transition ${
            activeTab === "VERBS_LIBRARY"
              ? "bg-purple-600 text-white border-purple-600 shadow-sm"
              : isDark
              ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
              : "bg-white border-slate-200 text-slate-600 hover:text-slate-900"
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Verb Master Library & Example Bank (26 Rules & 200+ Examples)</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400/20 text-amber-300 border border-amber-400/30">
            NEW
          </span>
        </button>
      </div>

      {/* ─── CATALOG VIEW ─── */}
      {activeTab === "CATALOG" && (
        <div className="space-y-6">
          {/* Header */}
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b transition-colors duration-200 ${
            isDark ? "border-slate-800" : "border-slate-200"
          }`}>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                  isDark ? "bg-purple-950/60 text-purple-300 border border-purple-500/30" : "bg-purple-100 text-purple-700"
                }`}>
                  Interactive Learning
                </span>
                <span className={`text-xs font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  From Complete Beginner (A0) to Exam Pass (B1)
                </span>
              </div>
              <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}>
                Learn Academy & Grammar Blueprints
              </h1>
            </div>

            {/* Level Filter Pills */}
            <div className={`inline-flex p-1 rounded-2xl border self-start sm:self-auto transition-colors duration-200 ${
              isDark ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"
            }`}>
              {(["ALL", "A1", "A2", "B1"] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setFilterLevel(lvl)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                    filterLevel === lvl
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                      : isDark
                      ? "text-slate-400 hover:text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                className={`group rounded-3xl border p-5 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 ${
                  isDark
                    ? "bg-slate-900/90 border-slate-800 hover:border-purple-500/50 hover:bg-slate-900"
                    : "bg-white border-slate-200 hover:border-purple-300 hover:bg-purple-50/20"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded-lg text-xs font-black uppercase tracking-wider ${
                      topic.level === "A1"
                        ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/30"
                        : topic.level === "A2"
                        ? "bg-blue-950/60 text-blue-300 border border-blue-500/30"
                        : "bg-purple-950/60 text-purple-300 border border-purple-500/30"
                    }`}>
                      {topic.level}
                    </span>

                    <span className={`text-[11px] font-bold flex items-center gap-1 ${
                      isDark ? "text-slate-500" : "text-slate-400"
                    }`}>
                      <Clock className="w-3 h-3" />
                      {topic.duration}
                    </span>
                  </div>

                  <h3 className={`text-base font-bold group-hover:text-purple-400 transition ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}>
                    {topic.title}
                  </h3>

                  <p className={`text-xs leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    {topic.desc}
                  </p>
                </div>

                <div className={`space-y-3 pt-2 border-t ${isDark ? "border-slate-800" : "border-slate-100"}`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className={isDark ? "text-slate-400 font-medium" : "text-slate-500 font-medium"}>Mastery progress</span>
                    <span className="font-extrabold text-purple-400">{topic.mastery}%</span>
                  </div>

                  <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
                    <div
                      className="bg-purple-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${topic.mastery}%` }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectTopic(topic.id)}
                    className={`w-full py-2.5 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95 ${
                      isDark
                        ? "bg-purple-950/60 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30"
                        : "bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white"
                    }`}
                  >
                    <span>{topic.completed ? "Review Lesson" : "Start Lesson"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── INTERACTIVE LESSON PLAYER (Viobean Style) ─── */}
      {activeTab === "PLAYER" && (
        <div className="space-y-6">
          {/* Top Bar */}
          <div className={`rounded-3xl border p-4 sm:p-5 shadow-sm flex items-center justify-between gap-4 transition-colors duration-200 ${
            isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveTab("CATALOG")}
                className={`p-2 rounded-xl transition ${
                  isDark ? "bg-slate-800 hover:bg-slate-700 text-slate-200" : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
                title="Return to Catalog"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="text-xs text-purple-400 font-bold uppercase tracking-wider">
                  Interactive Lesson: {currentLesson.level}
                </div>
                <div className={`text-base sm:text-lg font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                  {currentLesson.title}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold hidden sm:inline ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Step {currentStep + 1} of {lessonSteps.length}
              </span>
              <button
                type="button"
                onClick={() => handlePlayAudio(`${currentLesson.title}. ${currentLesson.intro.description}`)}
                className={`p-2 rounded-xl border transition ${
                  isDark ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-purple-400" : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
                title="Listen to native pronunciation"
              >
                <Volume2 className="w-4 h-4 text-purple-400" />
              </button>
            </div>
          </div>

          {/* Workbench Grid: Left Checklist + Right Interactive Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column: Contents Checklist */}
            <div className={`lg:col-span-1 rounded-3xl border p-4 sm:p-5 shadow-sm space-y-3 transition-colors duration-200 ${
              isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-1">
                Lesson Contents
              </div>

              <div className="space-y-1.5">
                {lessonSteps.map((step, idx) => {
                  const isActive = currentStep === idx;
                  const isDone = completedSteps.includes(idx);

                  return (
                    <button
                      key={step.title}
                      type="button"
                      onClick={() => setCurrentStep(idx)}
                      className={`w-full p-2.5 rounded-2xl text-left text-xs font-bold flex items-center gap-2.5 transition ${
                        isActive
                          ? "bg-purple-600 text-white shadow-sm"
                          : isDone
                          ? isDark
                            ? "bg-slate-950 hover:bg-slate-800 text-slate-300"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                          : isDark
                          ? "hover:bg-slate-800 text-slate-500"
                          : "hover:bg-slate-100 text-slate-400"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                        isActive
                          ? "bg-white text-purple-600 font-black"
                          : isDone
                          ? "bg-emerald-500 text-white"
                          : isDark
                          ? "bg-slate-800 text-slate-400"
                          : "bg-slate-200 text-slate-600"
                      }`}>
                        {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                      </div>

                      <div className="min-w-0 flex-1 truncate">
                        <div className="truncate">{step.title}</div>
                        <div className={`text-[10px] truncate ${isActive ? "text-purple-100 font-normal" : "text-slate-500"}`}>
                          {step.subtitle}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Step Interactive Workspace */}
            <div className={`lg:col-span-3 rounded-3xl border p-5 sm:p-7 shadow-sm space-y-6 transition-colors duration-200 ${
              isDark ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}>

              {/* ─── STEP 0: THE CORE BLUEPRINT FORMULA ─── */}
              {stepType === "intro" && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="space-y-1.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      isDark ? "bg-purple-950/60 text-purple-300 border border-purple-500/30" : "bg-purple-100 text-purple-700"
                    }`}>
                      {currentLesson.intro.badge}
                    </span>
                    <h3 className={`text-xl font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>
                      {currentLesson.intro.title}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                      {currentLesson.intro.description}
                    </p>
                  </div>

                  {/* Formula / Blueprint Card */}
                  <div className={`p-5 rounded-2xl border grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm ${
                    isDark ? "bg-slate-950/60 border-slate-800" : "bg-purple-50/50 border-purple-200"
                  }`}>
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-purple-400 uppercase">Core Pattern:</span>
                      <div className={`text-base sm:text-lg font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                        {currentLesson.intro.exampleCard.title}
                      </div>
                      <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        {currentLesson.intro.exampleCard.highlight}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-bold text-purple-400 uppercase">Formula Blueprint:</span>
                      <div className={`font-mono text-xs p-3 rounded-xl border leading-relaxed ${
                        isDark ? "bg-slate-900 border-slate-700 text-purple-300" : "bg-white border-purple-200 text-purple-800"
                      }`}>
                        {currentLesson.intro.exampleCard.formula}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Example Explorer with Native Audio */}
                  <div className={`p-4 rounded-2xl border space-y-2 ${isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                    <div className="text-xs font-bold text-slate-400 uppercase">Click to hear authentic pronunciation and pattern:</div>
                    <div className="flex flex-wrap gap-2">
                      {currentLesson.intro.interactiveItems.map((item) => (
                        <button
                          key={item.german}
                          type="button"
                          onClick={() => handlePlayAudio(item.german)}
                          className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition ${
                            isDark ? "bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700" : "bg-white hover:bg-slate-100 text-slate-800 border-slate-200"
                          }`}
                        >
                          <Volume2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>{item.german}</span>
                          <span className="text-[10px] text-slate-400">({item.english})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── STEP 1: REFERENCE TABLE & MATRIX ─── */}
              {stepType === "table" && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="space-y-1.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      isDark ? "bg-purple-950/60 text-purple-300 border border-purple-500/30" : "bg-purple-100 text-purple-700"
                    }`}>
                      {currentLesson.table.badge}
                    </span>
                    <h3 className={`text-xl font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>
                      {currentLesson.table.title}
                    </h3>
                    <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                      {currentLesson.table.description}
                    </p>
                  </div>

                  <div className={`overflow-x-auto rounded-2xl border ${isDark ? "border-slate-800" : "border-slate-200"}`}>
                    <table className="w-full text-xs sm:text-sm text-left">
                      <thead className={`font-bold border-b ${
                        isDark ? "bg-slate-950 text-slate-300 border-slate-800" : "bg-slate-50 text-slate-700 border-slate-200"
                      }`}>
                        <tr>
                          {currentLesson.table.headers.map((h, i) => (
                            <th key={i} className="p-3">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className={`divide-y font-medium ${
                        isDark ? "divide-slate-800 text-slate-300" : "divide-slate-100 text-slate-800"
                      }`}>
                        {currentLesson.table.rows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-purple-500/5 transition">
                            <td className="p-3 font-bold text-purple-400">{row.col1}</td>
                            <td className="p-3 font-mono font-black text-purple-300">{row.col2}</td>
                            <td className="p-3 font-medium">{row.col3}</td>
                            {row.col4 && <td className="p-3 font-medium">{row.col4}</td>}
                            {row.col5 && <td className="p-3 font-medium">{row.col5}</td>}
                            {row.tip && (
                              <td className="p-3 text-[11px] text-slate-400">{row.tip}</td>
                            )}
                            <td className="p-3">
                              <button
                                type="button"
                                onClick={() => handlePlayAudio(`${row.col1}, ${row.col3}`)}
                                className="p-1 hover:text-purple-400 transition"
                                title="Listen to row"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Golden Tip Box */}
                  <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                    isDark ? "bg-amber-950/30 border-amber-500/30 text-amber-200" : "bg-amber-50 border-amber-200 text-amber-900"
                  }`}>
                    <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-amber-400">Exam Pass Tip</div>
                      <div className="text-xs sm:text-sm leading-relaxed">{currentLesson.table.goldenTip}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── STEP 2: DRILL 1 (RAPID RECALL / MULTIPLE CHOICE) ─── */}
              {stepType === "drill1" && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      isDark ? "bg-purple-950/60 text-purple-300 border border-purple-500/30" : "bg-purple-100 text-purple-700"
                    }`}>
                      {currentLesson.drill1.badge} ({drill1Index + 1} of {currentLesson.drill1.questions.length})
                    </span>
                    <span className="text-xs font-bold text-purple-400">Score: {drill1Score} / {currentLesson.drill1.questions.length}</span>
                  </div>

                  <h3 className={`text-xl font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>
                    {currentLesson.drill1.title}
                  </h3>
                  <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    {currentLesson.drill1.description}
                  </p>

                  {(() => {
                    const q = currentLesson.drill1.questions[drill1Index];
                    if (!q) return null;

                    return (
                      <div className={`p-6 rounded-2xl border space-y-5 ${
                        isDark ? "bg-slate-950/60 border-slate-800" : "bg-purple-50/40 border-purple-200"
                      }`}>
                        {/* Sentence with blank */}
                        <div className={`p-4 rounded-xl border text-center text-base sm:text-lg font-black leading-relaxed ${
                          isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-purple-200 text-slate-900"
                        }`}>
                          &ldquo;{q.sentence.split("___").map((part, i, arr) => (
                            <React.Fragment key={i}>
                              {part}
                              {i < arr.length - 1 && (
                                <span className={`inline-block mx-1 px-3 py-1 border-2 border-dashed rounded-xl min-w-[70px] ${
                                  isDark ? "bg-slate-950 border-purple-400 text-purple-300" : "bg-purple-50 border-purple-400 text-purple-700"
                                }`}>
                                  {selectedDrill1Option || "___"}
                                </span>
                              )}
                            </React.Fragment>
                          ))}&rdquo;
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                          {q.options.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                setSelectedDrill1Option(opt);
                                const isCorrect = opt === q.correct;
                                setDrill1Feedback(isCorrect ? "correct" : "incorrect");
                                if (isCorrect) {
                                  setDrill1Score(prev => prev + 1);
                                  handlePlayAudio(q.sentence.replace("___", opt));
                                }
                              }}
                              className={`p-3.5 rounded-xl font-bold text-xs sm:text-sm border transition shadow-xs ${
                                selectedDrill1Option === opt
                                  ? opt === q.correct
                                    ? "bg-emerald-600 text-white border-emerald-600"
                                    : "bg-rose-600 text-white border-rose-600"
                                  : isDark
                                  ? "bg-slate-900 text-slate-200 border-slate-700 hover:border-purple-400"
                                  : "bg-white text-slate-800 border-slate-200 hover:border-purple-300 hover:bg-purple-50"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>

                        {drill1Feedback === "correct" && (
                          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500 text-emerald-200 text-xs font-bold animate-fadeIn">
                            ✓ Ausgezeichnet! {q.explanation}
                          </div>
                        )}

                        {drill1Feedback === "incorrect" && (
                          <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500 text-rose-200 text-xs font-bold animate-fadeIn">
                            ✕ Falsch! {q.explanation}
                          </div>
                        )}

                        {drill1Feedback && drill1Index < currentLesson.drill1.questions.length - 1 && (
                          <div className="text-center pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedDrill1Option(null);
                                setDrill1Feedback(null);
                                setDrill1Index(prev => prev + 1);
                              }}
                              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition"
                            >
                              Next Drill ({drill1Index + 2} of {currentLesson.drill1.questions.length}) →
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* ─── STEP 3: DRILL 2 (INTERACTIVE NUANCE / GENDER CHALLENGE) ─── */}
              {stepType === "drill2" && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      isDark ? "bg-purple-950/60 text-purple-300 border border-purple-500/30" : "bg-purple-100 text-purple-700"
                    }`}>
                      {currentLesson.drill2.badge} ({drill2Index + 1} of {currentLesson.drill2.questions.length})
                    </span>
                    <span className="text-xs font-bold text-purple-400">Score: {drill2Score} / {currentLesson.drill2.questions.length}</span>
                  </div>

                  <h3 className={`text-xl font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>
                    {currentLesson.drill2.title}
                  </h3>
                  <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    {currentLesson.drill2.description}
                  </p>

                  {/* Special Suffix Sorter for a1-genus */}
                  {selectedTopicId === "a1-genus" && remainingWords.length > 0 && (
                    <div className={`p-4 rounded-2xl border space-y-4 mb-4 ${
                      isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
                    }`}>
                      <div className="text-xs font-bold text-purple-400 uppercase">Interactive Bucket Sorter (Click word to place):</div>
                      <div className="flex flex-wrap gap-2">
                        {remainingWords.map((word) => (
                          <div key={word} className="flex items-center gap-1">
                            <span className={`px-3 py-1.5 rounded-xl border text-xs font-bold ${
                              isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-800"
                            }`}>
                              {word}
                            </span>
                            <div className="flex gap-1">
                              {(["der", "die", "das"] as const).map(b => (
                                <button
                                  key={b}
                                  type="button"
                                  onClick={() => handleSortWord(word, b)}
                                  className="px-2 py-1 bg-purple-600/30 hover:bg-purple-600 text-purple-300 hover:text-white rounded text-[10px] font-black"
                                >
                                  {b}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-2">
                        {(["der", "die", "das"] as const).map(b => (
                          <div key={b} className={`p-2.5 rounded-xl border text-center ${
                            isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                          }`}>
                            <div className="font-black text-xs text-purple-400 uppercase">{b}</div>
                            <div className="text-[11px] text-slate-400">{sortedBuckets[b].join(", ") || "-"}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Standard Drill 2 Interactive Questions */}
                  {(() => {
                    const q = currentLesson.drill2.questions[drill2Index];
                    if (!q) return null;

                    return (
                      <div className={`p-6 rounded-2xl border space-y-5 ${
                        isDark ? "bg-slate-950/60 border-slate-800" : "bg-purple-50/40 border-purple-200"
                      }`}>
                        <div className={`p-4 rounded-xl border text-center text-base sm:text-lg font-black leading-relaxed ${
                          isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-purple-200 text-slate-900"
                        }`}>
                          &ldquo;{q.sentence.split("___").map((part, i, arr) => (
                            <React.Fragment key={i}>
                              {part}
                              {i < arr.length - 1 && (
                                <span className={`inline-block mx-1 px-3 py-1 border-2 border-dashed rounded-xl min-w-[70px] ${
                                  isDark ? "bg-slate-950 border-purple-400 text-purple-300" : "bg-purple-50 border-purple-400 text-purple-700"
                                }`}>
                                  {selectedDrill2Option || "___"}
                                </span>
                              )}
                            </React.Fragment>
                          ))}&rdquo;
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                          {q.options.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                setSelectedDrill2Option(opt);
                                const isCorrect = opt === q.correct;
                                setDrill2Feedback(isCorrect ? "correct" : "incorrect");
                                if (isCorrect) {
                                  setDrill2Score(prev => prev + 1);
                                  handlePlayAudio(q.sentence.replace("___", opt));
                                }
                              }}
                              className={`p-3.5 rounded-xl font-bold text-xs sm:text-sm border transition shadow-xs ${
                                selectedDrill2Option === opt
                                  ? opt === q.correct
                                    ? "bg-emerald-600 text-white border-emerald-600"
                                    : "bg-rose-600 text-white border-rose-600"
                                  : isDark
                                  ? "bg-slate-900 text-slate-200 border-slate-700 hover:border-purple-400"
                                  : "bg-white text-slate-800 border-slate-200 hover:border-purple-300 hover:bg-purple-50"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>

                        {drill2Feedback === "correct" && (
                          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500 text-emerald-200 text-xs font-bold animate-fadeIn">
                            ✓ Ausgezeichnet! {q.explanation}
                          </div>
                        )}

                        {drill2Feedback === "incorrect" && (
                          <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500 text-rose-200 text-xs font-bold animate-fadeIn">
                            ✕ Falsch! {q.explanation}
                          </div>
                        )}

                        {drill2Feedback && drill2Index < currentLesson.drill2.questions.length - 1 && (
                          <div className="text-center pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedDrill2Option(null);
                                setDrill2Feedback(null);
                                setDrill2Index(prev => prev + 1);
                              }}
                              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition"
                            >
                              Next Question ({drill2Index + 2} of {currentLesson.drill2.questions.length}) →
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* ─── STEP 4: ACTIVE RECALL & SENTENCE TYPING WORKOUT ─── */}
              {stepType === "typing" && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      isDark ? "bg-purple-950/60 text-purple-300 border border-purple-500/30" : "bg-purple-100 text-purple-700"
                    }`}>
                      {currentLesson.typingWorkout.badge} ({typingIndex + 1} of {currentLesson.typingWorkout.items.length})
                    </span>

                    <div className="flex items-center gap-3">
                      {typingStreak > 1 && (
                        <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-500/30 animate-pulse">
                          <Flame className="w-3.5 h-3.5" />
                          {typingStreak} Streak
                        </span>
                      )}
                      <span className="text-xs font-bold text-purple-400">Score: {typingScore} / {currentLesson.typingWorkout.items.length}</span>
                    </div>
                  </div>

                  <h3 className={`text-xl font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>
                    {currentLesson.typingWorkout.title}
                  </h3>
                  <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    {currentLesson.typingWorkout.description}
                  </p>

                  {/* Mode Selector: Typing vs Fast-Pick */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setTypingMode("type")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition ${
                        typingMode === "type"
                          ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                          : isDark
                          ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                          : "bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Keyboard className="w-3.5 h-3.5" />
                      <span>Active Typing Mode (Recommended)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTypingMode("click")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition ${
                        typingMode === "click"
                          ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                          : isDark
                          ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                          : "bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <MousePointerClick className="w-3.5 h-3.5" />
                      <span>Fast-Pick Options</span>
                    </button>
                  </div>

                  {(() => {
                    const item = currentLesson.typingWorkout.items[typingIndex];
                    if (!item) return null;

                    return (
                      <div className={`p-6 rounded-2xl border space-y-5 ${
                        isDark ? "bg-slate-950/60 border-slate-800" : "bg-purple-50/40 border-purple-200"
                      }`}>
                        {/* Sentence display with fill target */}
                        <div className={`p-5 rounded-2xl border text-center text-lg sm:text-xl font-black leading-relaxed ${
                          isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-purple-200 text-slate-900"
                        }`}>
                          &ldquo;{item.sentenceBefore}
                          <span className={`inline-block mx-2 px-3 py-1 border-2 border-dashed rounded-xl min-w-[80px] ${
                            isDark ? "bg-slate-950 border-purple-400 text-purple-300" : "bg-purple-50 border-purple-400 text-purple-700"
                          }`}>
                            {typedInput || "___"}
                          </span>
                          {item.sentenceAfter}&rdquo;
                        </div>

                        {/* Interactive Input or Chips based on Mode */}
                        {typingMode === "type" ? (
                          <div className="space-y-3">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={typedInput}
                                onChange={(e) => setTypedInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleCheckTyping();
                                  }
                                }}
                                placeholder="Type the missing word or the full sentence..."
                                className={`flex-1 px-4 py-3 rounded-2xl border text-sm sm:text-base font-semibold focus:outline-hidden focus:ring-2 focus:ring-purple-500 transition ${
                                  isDark
                                    ? "bg-slate-900 border-slate-700 text-white placeholder-slate-500"
                                    : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                                }`}
                              />
                              <button
                                type="button"
                                onClick={handleCheckTyping}
                                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-2xl transition shadow-sm active:scale-95"
                              >
                                Check ✦
                              </button>
                            </div>

                            <div className="flex items-center justify-between text-xs">
                              <button
                                type="button"
                                onClick={() => setShowTypingHint(!showTypingHint)}
                                className="text-purple-400 hover:underline flex items-center gap-1 font-semibold"
                              >
                                <HelpCircle className="w-3.5 h-3.5" />
                                {showTypingHint ? "Hide Hint" : "Show Hint"}
                              </button>
                              <span className="text-[11px] text-slate-400">
                                💡 Tip: You can type just the word or the complete sentence!
                              </span>
                            </div>

                            {showTypingHint && (
                              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-medium animate-fadeIn">
                                Hint: {item.hint}
                              </div>
                            )}
                          </div>
                        ) : (
                          /* Fast-Pick Options Mode */
                          <div className="space-y-3">
                            <div className="text-xs font-bold text-slate-400 uppercase">Click the correct answer:</div>
                            <div className="flex flex-wrap gap-2.5">
                              {[item.acceptableAnswers[0], "nicht", "sehr", "immer", "doch"].slice(0, 4).map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => {
                                    setTypedInput(opt);
                                    const isCorrect = item.acceptableAnswers.map(a => normalizeText(a)).includes(normalizeText(opt));
                                    setTypingFeedback(isCorrect ? "correct" : "incorrect");
                                    if (isCorrect) {
                                      setTypingScore(prev => prev + 1);
                                      handlePlayAudio(`${item.sentenceBefore} ${opt} ${item.sentenceAfter}`);
                                    }
                                  }}
                                  className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm border transition ${
                                    isDark ? "bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200" : "bg-white hover:bg-purple-50 border-slate-200 text-slate-800"
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Feedback Banner */}
                        {typingFeedback === "correct" && (
                          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500 text-emerald-200 text-xs font-bold space-y-1 animate-fadeIn">
                            <div className="flex items-center gap-1.5 text-emerald-300 font-extrabold text-sm">
                              <CheckCircle2 className="w-4 h-4" />
                              {wasFullSentence ? "🎉 Ausgezeichnet! Perfekter ganzer Satz getippt!" : "✓ Richtig!"}
                            </div>
                            <p className="font-normal text-emerald-100">{item.explanation}</p>
                          </div>
                        )}

                        {typingFeedback === "incorrect" && (
                          <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500 text-rose-200 text-xs font-bold space-y-1 animate-fadeIn">
                            <div className="flex items-center gap-1.5 text-rose-300 font-extrabold text-sm">
                              <AlertCircle className="w-4 h-4" />
                              ✕ Falsch! Erwartet: &ldquo;{item.acceptableAnswers[0]}&rdquo;
                            </div>
                            <p className="font-normal text-rose-100">{item.explanation}</p>
                          </div>
                        )}

                        {/* Next Item Button */}
                        {typingFeedback && typingIndex < currentLesson.typingWorkout.items.length - 1 && (
                          <div className="text-center pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                setTypedInput("");
                                setTypingFeedback(null);
                                setWasFullSentence(false);
                                setShowTypingHint(false);
                                setTypingIndex(prev => prev + 1);
                              }}
                              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition shadow-sm"
                            >
                              Next Workout Sentence ({typingIndex + 2} of {currentLesson.typingWorkout.items.length}) →
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* ─── STEP 5: NUANCES, TRAPS & STEM CHANGES ─── */}
              {stepType === "nuance" && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="space-y-1.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      isDark ? "bg-purple-950/60 text-purple-300 border border-purple-500/30" : "bg-purple-100 text-purple-700"
                    }`}>
                      {currentLesson.nuance.badge}
                    </span>
                    <h3 className={`text-xl font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>
                      {currentLesson.nuance.title}
                    </h3>
                    <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                      {currentLesson.nuance.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentLesson.nuance.cards.map((card, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border space-y-2.5 transition hover:shadow-md ${
                          isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-purple-400 uppercase tracking-wide">
                            {card.title}
                          </span>
                          <button
                            type="button"
                            onClick={() => handlePlayAudio(card.de)}
                            className="p-1 hover:text-purple-400 transition"
                            title="Hear example"
                          >
                            <Volume2 className="w-3.5 h-3.5 text-purple-400" />
                          </button>
                        </div>

                        <div className={`text-sm font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                          &ldquo;{card.de}&rdquo;
                        </div>

                        <div className="text-xs text-slate-400">
                          {card.en}
                        </div>

                        <div className={`p-2.5 rounded-xl border text-[11px] leading-relaxed ${
                          isDark ? "bg-slate-900/80 border-slate-800 text-purple-300" : "bg-white border-purple-100 text-purple-800"
                        }`}>
                          💡 <strong>Rule:</strong> {card.rule}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── STEP 6: MINI SPRINT QUIZ ─── */}
              {stepType === "quiz" && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      isDark ? "bg-purple-950/60 text-purple-300 border border-purple-500/30" : "bg-purple-100 text-purple-700"
                    }`}>
                      {currentLesson.quiz.badge} ({quizIndex + 1} of {currentLesson.quiz.questions.length})
                    </span>
                    <span className="text-xs font-bold text-purple-400">Sprint Score: {quizScore} / {currentLesson.quiz.questions.length}</span>
                  </div>

                  <h3 className={`text-xl font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>
                    {currentLesson.quiz.title}
                  </h3>

                  {(() => {
                    const q = currentLesson.quiz.questions[quizIndex];
                    if (!q) return null;

                    return (
                      <div className={`p-6 rounded-2xl border space-y-4 ${
                        isDark ? "bg-slate-950/60 border-slate-800" : "bg-purple-50/40 border-purple-200"
                      }`}>
                        <div className={`text-base sm:text-lg font-bold leading-relaxed ${isDark ? "text-white" : "text-slate-900"}`}>
                          {q.prompt}
                        </div>

                        <div className="space-y-2 pt-2">
                          {q.options.map((opt, i) => {
                            const isSelected = selectedQuizOption === i;
                            const isCorrect = i === q.correct;
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => {
                                  if (quizAnswered) return;
                                  setSelectedQuizOption(i);
                                  setQuizAnswered(true);
                                  if (isCorrect) {
                                    setQuizScore(prev => prev + 1);
                                  }
                                }}
                                className={`w-full p-3.5 rounded-xl font-semibold text-xs sm:text-sm border transition flex items-center justify-between text-left ${
                                  quizAnswered
                                    ? isCorrect
                                      ? "bg-emerald-600/90 text-white border-emerald-600"
                                      : isSelected
                                      ? "bg-rose-600/90 text-white border-rose-600"
                                      : isDark ? "bg-slate-900 text-slate-400 border-slate-800" : "bg-slate-50 text-slate-400 border-slate-200"
                                    : isDark
                                    ? "bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-purple-400"
                                    : "bg-white hover:bg-purple-50 text-slate-800 border-slate-200 hover:border-purple-300"
                                }`}
                              >
                                <span>{opt}</span>
                                {quizAnswered && isCorrect && <Check className="w-4 h-4 stroke-[3]" />}
                              </button>
                            );
                          })}
                        </div>

                        {quizAnswered && (
                          <div className={`p-3 rounded-xl border text-xs font-semibold ${
                            selectedQuizOption === q.correct
                              ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                              : "bg-rose-950/40 border-rose-500/40 text-rose-300"
                          }`}>
                            {selectedQuizOption === q.correct ? "✓ Richtig! " : "✕ Falsch! "}
                            {q.explanation}
                          </div>
                        )}

                        {quizAnswered && quizIndex < currentLesson.quiz.questions.length - 1 && (
                          <div className="text-center pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedQuizOption(null);
                                setQuizAnswered(false);
                                setQuizIndex(prev => prev + 1);
                              }}
                              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition"
                            >
                              Next Quiz Question ({quizIndex + 2} of {currentLesson.quiz.questions.length}) →
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* ─── STEP 7: LESSON MASTERY & PASS CERTIFICATE ─── */}
              {stepType === "summary" && (
                <div className="space-y-6 text-center animate-fadeIn py-4">
                  <div className="w-16 h-16 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center mx-auto border border-purple-500/30">
                    <Award className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-purple-950/60 text-purple-300 border border-purple-500/30">
                      {currentLesson.summary.badge || "Lesson Mastery"}
                    </span>
                    <h3 className={`text-2xl sm:text-3xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                      {currentLesson.summary.title}
                    </h3>
                    <p className={`text-xs sm:text-sm max-w-md mx-auto ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                      {currentLesson.summary.takeaway || `You completed all 8 interactive steps for ${currentLesson.title}!`}
                    </p>
                  </div>

                  {/* Summary Takeaway Points */}
                  <div className={`p-5 rounded-2xl border text-left max-w-lg mx-auto space-y-2 ${
                    isDark ? "bg-slate-950 border-slate-800" : "bg-purple-50/50 border-purple-200"
                  }`}>
                    <div className="text-xs font-bold uppercase tracking-wider text-purple-400">Core Takeaways for B1:</div>
                    <ul className="space-y-1.5 text-xs">
                      {(currentLesson.summary.points || currentLesson.summary.bulletPoints || []).map((pt: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className={isDark ? "text-slate-200" : "text-slate-800"}>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Score Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto text-center">
                    <div className={`p-3 rounded-2xl border ${isDark ? "bg-slate-950 border-slate-800" : "bg-purple-50 border-purple-200"}`}>
                      <div className="text-lg font-black text-purple-400">8 / 8</div>
                      <div className="text-[11px] font-bold text-slate-400">Steps Finished</div>
                    </div>
                    <div className={`p-3 rounded-2xl border ${isDark ? "bg-slate-950 border-slate-800" : "bg-purple-50 border-purple-200"}`}>
                      <div className="text-lg font-black text-emerald-400">{drill1Score} / {currentLesson.drill1.questions.length}</div>
                      <div className="text-[11px] font-bold text-slate-400">Drill 1 Score</div>
                    </div>
                    <div className={`p-3 rounded-2xl border ${isDark ? "bg-slate-950 border-slate-800" : "bg-purple-50 border-purple-200"}`}>
                      <div className="text-lg font-black text-blue-400">{typingScore} / {currentLesson.typingWorkout.items.length}</div>
                      <div className="text-[11px] font-bold text-slate-400">Typing Recall</div>
                    </div>
                    <div className={`p-3 rounded-2xl border ${isDark ? "bg-slate-950 border-slate-800" : "bg-purple-50 border-purple-200"}`}>
                      <div className="text-lg font-black text-amber-400">{quizScore} / {currentLesson.quiz.questions.length}</div>
                      <div className="text-[11px] font-bold text-slate-400">Sprint Quiz</div>
                    </div>
                  </div>

                  {/* Next Recommendation */}
                  {currentLesson.summary.nextRecommendation && (
                    <div className="text-xs text-slate-400 max-w-md mx-auto">
                      👉 <strong>Next Recommended Step:</strong> {currentLesson.summary.nextRecommendation}
                    </div>
                  )}

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        resetAllLessonStates();
                        confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
                      }}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                        isDark ? "border-slate-800 text-slate-300 hover:bg-slate-800" : "border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Review Lesson Again
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab("CATALOG")}
                      className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-md shadow-purple-600/30"
                    >
                      <span>Return to Academy Catalog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Segmented Step Controls */}
              <div className={`pt-6 border-t flex items-center justify-between gap-4 ${
                isDark ? "border-slate-800" : "border-slate-100"
              }`}>
                <button
                  type="button"
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                  className={`px-4 py-2 rounded-xl border text-xs font-bold disabled:opacity-40 transition ${
                    isDark ? "border-slate-800 text-slate-300 hover:bg-slate-800" : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Previous Step
                </button>

                <div className="flex items-center gap-1">
                  {lessonSteps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        currentStep === i 
                          ? "w-6 bg-purple-600" 
                          : completedSteps.includes(i) 
                          ? "w-3 bg-emerald-500" 
                          : isDark ? "w-3 bg-slate-800" : "w-3 bg-slate-200"
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <span>{currentStep === lessonSteps.length - 1 ? "Finish Lesson" : "Continue"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── VERB MASTER LIBRARY & EXAMPLE BANK VIEW ─── */}
      {activeTab === "VERBS_LIBRARY" && (
        <VerbMasterLibrary
          onSelectTopicForLesson={(topicId) => {
            setSelectedTopicId(topicId);
            setActiveTab("PLAYER");
            resetAllLessonStates();
          }}
        />
      )}
    </div>
  );
};
