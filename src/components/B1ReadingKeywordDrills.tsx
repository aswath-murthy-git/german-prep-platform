"use client";

import React, { useState, useMemo } from "react";
import { B1_KEYWORD_PAIRS, B1_READING_EXAM_ITEMS } from "@/data/b1_keywords_data";
import { B1_EXPANDED_VOCABULARY, B1VocabularyWord, B1VocabularyCategory } from "@/data/b1_vocabulary_expansion";
import { useUser } from "@/context/UserContext";
import { AudioVoiceButton } from "./AudioVoiceButton";
import { 
  KeyRound, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  BookOpen, 
  Sparkles, 
  Check, 
  HelpCircle,
  RotateCw,
  Search,
  BookmarkCheck,
  Tag,
  Zap,
  ArrowRight,
  Award,
  GraduationCap
} from "lucide-react";
import confetti from "canvas-confetti";

export const B1ReadingKeywordDrills: React.FC = () => {
  const { profile, toggleKeywordMastered, showEnglish } = useUser();
  const [activeSubTab, setActiveSubTab] = useState<"FLASHCARDS" | "READING_TESTS" | "VOCABULARY_PASS_BANK" | "VOCAB_QUIZ">("FLASHCARDS");

  // Vocabulary bank filters
  const [vocabCategory, setVocabCategory] = useState<"ALL" | B1VocabularyCategory>("ALL");
  const [vocabSearch, setVocabSearch] = useState<string>("");

  // Flashcards state
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Reading tests state
  const [selectedReadingAnswers, setSelectedReadingAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  // Vocab Quiz state (10 Questions per Sprint)
  const [quizRoundSeed, setQuizRoundSeed] = useState<number>(1);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [quizDirection, setQuizDirection] = useState<"DE_TO_EN" | "EN_TO_DE">("DE_TO_EN");

  // 10 stable questions drawn for current sprint
  const quizRoundItems = useMemo(() => {
    const list = [...B1_EXPANDED_VOCABULARY];
    let seed = ((quizRoundSeed * 16807 + 1013904223) >>> 0);
    for (let i = list.length - 1; i > 0; i--) {
      seed = ((seed * 1664525 + 1013904223) >>> 0);
      const j = seed % (i + 1);
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list.slice(0, 10);
  }, [quizRoundSeed]);

  const currentQuizWord = quizRoundItems[quizIndex % quizRoundItems.length];

  // Shuffled 4 options for current question
  const quizOptions = useMemo(() => {
    if (!currentQuizWord) return [];
    const candidates = B1_EXPANDED_VOCABULARY.filter(w => w.id !== currentQuizWord.id);
    let seed = ((quizRoundSeed * 31 + quizIndex * 17 + 101) >>> 0);
    const distractors: B1VocabularyWord[] = [];
    const samePos = candidates.filter(w => w.partOfSpeech === currentQuizWord.partOfSpeech);
    const pool = samePos.length >= 3 ? samePos : candidates;

    const usedIndices = new Set<number>();
    while (distractors.length < 3 && usedIndices.size < pool.length) {
      seed = ((seed * 1664525 + 1013904223) >>> 0);
      const idx = seed % pool.length;
      if (!usedIndices.has(idx)) {
        usedIndices.add(idx);
        distractors.push(pool[idx]);
      }
    }

    const allFour = [currentQuizWord, ...distractors];
    for (let i = allFour.length - 1; i > 0; i--) {
      seed = ((seed * 1103515245 + 12345) >>> 0);
      const j = seed % (i + 1);
      [allFour[i], allFour[j]] = [allFour[j], allFour[i]];
    }
    return allFour;
  }, [currentQuizWord, quizRoundSeed, quizIndex]);

  const correctQuizOptionIndex = quizOptions.findIndex(w => w.id === currentQuizWord?.id);

  const handlePickQuizOption = (optIdx: number) => {
    if (quizSelectedOption !== null) return;
    setQuizSelectedOption(optIdx);

    if (optIdx === correctQuizOptionIndex) {
      setQuizScore(prev => prev + 1);
      confetti({ particleCount: 45, spread: 55, origin: { y: 0.6 } });
    }
  };

  const handleNextQuizQuestion = () => {
    if (quizIndex + 1 >= 10) {
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

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePickReadingOption = (itemId: string, optionIdx: number, correctIdx: number) => {
    setSelectedReadingAnswers(prev => ({ ...prev, [itemId]: optionIdx }));
    setShowExplanation(prev => ({ ...prev, [itemId]: true }));

    if (optionIdx === correctIdx) {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-300 mb-2">
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>Keyword Recognition & Exam Trap Drills</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              B1 Reading & Listening <span className="text-amber-400">Pass Hacks</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Do not waste time trying to understand every word in long texts. Master keyword synonyms and distractor traps to score the 60% passing threshold effortlessly.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Mastered Keywords:</span>
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-bold rounded-lg border border-amber-500/40 text-sm">
              {profile.masteredKeywordIds.length} / {B1_KEYWORD_PAIRS.length}
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-slate-800">
          <button
            onClick={() => setActiveSubTab("FLASHCARDS")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeSubTab === "FLASHCARDS"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>High-Yield Synonym Flashcards</span>
          </button>

          <button
            onClick={() => setActiveSubTab("READING_TESTS")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeSubTab === "READING_TESTS"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Model Reading Practice & Trap Detection</span>
          </button>

          <button
            onClick={() => setActiveSubTab("VOCABULARY_PASS_BANK")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeSubTab === "VOCABULARY_PASS_BANK"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>B1 Vocabulary Bank ({B1_EXPANDED_VOCABULARY.length} Words)</span>
          </button>

          <button
            onClick={() => setActiveSubTab("VOCAB_QUIZ")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeSubTab === "VOCAB_QUIZ"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Vocab Quiz Drill (10Q Sprints)</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: SYNONYM FLASHCARDS */}
      {activeSubTab === "FLASHCARDS" && (
        <div className="space-y-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300 flex items-center justify-between">
            <span><strong>Tip:</strong> Tap any card to flip and view synonyms, English translation, and common exam traps.</span>
            <span className="text-slate-400">Tap checkmark to mark mastered.</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {B1_KEYWORD_PAIRS.map((kw) => {
              const isFlipped = flippedCards[kw.id];
              const isMastered = profile.masteredKeywordIds.includes(kw.id);

              return (
                <div
                  key={kw.id}
                  onClick={() => toggleFlip(kw.id)}
                  className={`cursor-pointer rounded-2xl border p-5 transition duration-200 min-h-[220px] flex flex-col justify-between ${
                    isMastered
                      ? "bg-slate-900/90 border-emerald-500/50 shadow-sm shadow-emerald-500/10"
                      : "bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-2 py-0.5 bg-amber-500/10 rounded border border-amber-500/20">
                      {isFlipped ? "Synonyms & Trap" : "Keyword Front"}
                    </span>
                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <AudioVoiceButton text={kw.keyword} label="" />
                      <button
                        onClick={() => toggleKeywordMastered(kw.id)}
                        className={`p-1.5 rounded-lg border transition ${
                          isMastered
                            ? "bg-emerald-500 text-slate-950 border-emerald-400"
                            : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                        }`}
                        title="Toggle Mastered"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {!isFlipped ? (
                    <div className="my-auto space-y-2 text-center py-4">
                      <h4 className="text-xl font-extrabold text-white tracking-tight">
                        {kw.keyword}
                      </h4>
                      <p className="text-xs text-amber-300 font-medium">
                        {kw.keyword_en}
                      </p>
                      <p className="text-[11px] text-slate-400 italic pt-1">
                        &quot;{kw.exampleContext}&quot;
                      </p>
                    </div>
                  ) : (
                    <div className="my-auto space-y-2.5 py-2">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Exam Synonyms:
                        </span>
                        <div className="text-xs font-semibold text-emerald-300">
                          {kw.synonym_de}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {kw.synonym_en}
                        </div>
                      </div>

                      {kw.trapWarning && (
                        <div className="p-2 bg-rose-950/40 border border-rose-500/30 rounded-lg text-[11px] text-rose-300 flex items-start gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                          <span>{kw.trapWarning}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
                    <span className="flex items-center gap-1">
                      <RotateCw className="w-3 h-3" />
                      Tap to flip
                    </span>
                    {isMastered && (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Mastered
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 2: READING PRACTICE & TRAP DETECTION */}
      {activeSubTab === "READING_TESTS" && (
        <div className="space-y-6">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300">
            <strong>Strategy Drill:</strong> Read each short German exam snippet and identify the correct option. The explanation highlights the exact keyword link.
          </div>

          <div className="space-y-6">
            {B1_READING_EXAM_ITEMS.map((item) => {
              const userChoice = selectedReadingAnswers[item.id];
              const isAnswered = userChoice !== undefined;
              const isCorrect = userChoice === item.correct;

              return (
                <div
                  key={item.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="px-2.5 py-0.5 bg-slate-800 text-amber-400 text-xs font-bold rounded-md border border-slate-700">
                        {item.sourceType}
                      </span>
                      <h4 className="text-base font-bold text-white mt-1.5">{item.title}</h4>
                    </div>
                    <AudioVoiceButton text={item.text_de} label="Text anhören" />
                  </div>

                  {/* Text box with side-by-side or stacked layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-sans text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                      {item.text_de}
                    </div>
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 font-sans text-xs sm:text-sm text-slate-400 leading-relaxed whitespace-pre-wrap">
                      {item.text_en}
                    </div>
                  </div>

                  {/* Question Prompt */}
                  <div className="pt-2 border-t border-slate-800 space-y-1">
                    <h5 className="text-sm sm:text-base font-bold text-white">{item.question_de}</h5>
                    <p className="text-xs text-amber-300/80">{item.question_en}</p>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-2.5">
                    {item.options.map((opt: { de: string; en: string }, optIdx: number) => {
                      const isPicked = userChoice === optIdx;
                      const isThisCorrect = optIdx === item.correct;

                      let optClass = "bg-slate-950 hover:bg-slate-800/70 border-slate-800 text-slate-200";

                      if (isAnswered) {
                        if (isThisCorrect) {
                          optClass = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold";
                        } else if (isPicked && !isThisCorrect) {
                          optClass = "bg-rose-950/60 border-rose-500 text-rose-200 font-semibold";
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handlePickReadingOption(item.id, optIdx, item.correct)}
                          className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm flex items-start gap-3 transition ${optClass}`}
                        >
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                            isAnswered && isThisCorrect
                              ? "bg-emerald-500 text-slate-950 border-emerald-400"
                              : isAnswered && isPicked && !isThisCorrect
                              ? "bg-rose-500 text-white border-rose-400"
                              : "bg-slate-900 border-slate-700 text-slate-400"
                          }`}>
                            {["A", "B", "C", "D"][optIdx]}
                          </span>
                          <div>
                            <div>{opt.de}</div>
                            <div className="text-[11px] text-slate-400 mt-0.5">{opt.en}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Keyword Hint & Explanation */}
                  {isAnswered && (
                    <div className={`p-4 rounded-xl border text-xs space-y-1 ${
                      isCorrect ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200" : "bg-amber-950/40 border-amber-500/40 text-amber-200"
                    }`}>
                      <strong className="block text-amber-300 font-semibold">
                        💡 Key Signal Word Match / Exam Hack:
                      </strong>
                      <p>{item.keywordHint}</p>
                      <p className="text-slate-400">{item.keywordHint_en}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 3: B1 PASS VOCABULARY BANK */}
      {activeSubTab === "VOCABULARY_PASS_BANK" && (
        <div className="space-y-6">
          {/* Search & Category Filter Bar */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={vocabSearch}
                  onChange={(e) => setVocabSearch(e.target.value)}
                  placeholder={`Search ${B1_EXPANDED_VOCABULARY.length} words (e.g., Vertrag, Kaution, Krankschreibung, kündigen)...`}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              {/* Counter badge */}
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs font-bold text-amber-300 shrink-0">
                <BookmarkCheck className="w-4 h-4 text-amber-400" />
                <span>
                  {B1_EXPANDED_VOCABULARY.filter(w => {
                    const matchesCat = vocabCategory === "ALL" || w.category === vocabCategory;
                    const matchesSearch = vocabSearch === "" || 
                      w.german.toLowerCase().includes(vocabSearch.toLowerCase()) || 
                      w.english.toLowerCase().includes(vocabSearch.toLowerCase());
                    return matchesCat && matchesSearch;
                  }).length} Words
                </span>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { id: "ALL", label: "All Categories" },
                { id: "ARBEIT", label: "Arbeit & Beruf" },
                { id: "WOHNEN", label: "Wohnen & Miete" },
                { id: "BEHOERDEN", label: "Behörden & Bürgeramt" },
                { id: "GESUNDHEIT", label: "Gesundheit & Arzt" },
                { id: "REKLAMATION", label: "Reklamation & Reklamieren" },
                { id: "VERKEHR", label: "Verkehr & Mobilität" },
                { id: "EINKAUFEN", label: "Einkaufen & Finanzen" },
                { id: "FAMILIE", label: "Familie & Alltag" },
                { id: "FREIZEIT", label: "Freizeit & Medien" },
                { id: "REISE", label: "Reise & Urlaub" },
                { id: "KOMMUNIKATION", label: "B1 Redemittel" }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setVocabCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    vocabCategory === cat.id
                      ? "bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/20"
                      : "bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Vocabulary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {B1_EXPANDED_VOCABULARY.filter(w => {
              const matchesCat = vocabCategory === "ALL" || w.category === vocabCategory;
              const matchesSearch = vocabSearch === "" || 
                w.german.toLowerCase().includes(vocabSearch.toLowerCase()) || 
                w.english.toLowerCase().includes(vocabSearch.toLowerCase());
              return matchesCat && matchesSearch;
            }).map(w => {
              let articleColor = "bg-slate-800 text-slate-300";
              if (w.article === "der") articleColor = "bg-sky-500/20 text-sky-300 border border-sky-500/30";
              if (w.article === "die") articleColor = "bg-rose-500/20 text-rose-300 border border-rose-500/30";
              if (w.article === "das") articleColor = "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";

              return (
                <div
                  key={w.id}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between gap-3 transition"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {w.article && (
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase font-mono ${articleColor}`}>
                              {w.article}
                            </span>
                          )}
                          <span className="text-lg font-black text-white">{w.german}</span>
                        </div>
                        {w.plural && (
                          <div className="text-[11px] text-slate-400 font-mono">
                            Plural: {w.plural}
                          </div>
                        )}
                      </div>

                      <AudioVoiceButton text={w.article ? `${w.article} ${w.german}` : w.german} className="shrink-0" />
                    </div>

                    {showEnglish || flippedCards[`vocab-${w.id}`] ? (
                      <>
                        <div className="text-sm font-bold text-amber-300/90 animate-fadeIn">
                          {w.english}
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                          <div className="text-xs text-slate-300 font-medium">{w.example_de}</div>
                          <div className="text-[11px] text-slate-500 italic">{w.example_en}</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => toggleFlip(`vocab-${w.id}`)}
                          className="text-[11px] text-slate-500 hover:text-amber-400 transition"
                        >
                          English meaning (Off - click to show)
                        </button>
                        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                          <div className="text-xs text-slate-300 font-medium">{w.example_de}</div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 text-[11px] text-amber-200/80 bg-amber-950/20 p-2 rounded-lg border border-amber-500/20 flex items-start gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Exam Pass Tip:</strong> {w.examSignalTip}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 4: VOCABULARY QUIZ (10Q SPRINTS) */}
      {activeSubTab === "VOCAB_QUIZ" && (
        <div className="space-y-6">
          {/* Header & Controls */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 font-bold text-xs rounded-lg border border-amber-500/30">
                  Sprint Round #{quizRoundSeed}
                </span>
                <span className="text-xs text-slate-400">10 Questions per Sprint</span>
              </div>
              <h3 className="text-lg font-black text-white mt-1">
                High-Yield B1 Vocabulary Practice Sprint
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Practice 10 rapid-fire questions until you pass. Instant feedback with exam tips and audio.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  setQuizDirection(prev => (prev === "DE_TO_EN" ? "EN_TO_DE" : "DE_TO_EN"));
                  setQuizSelectedOption(null);
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
              >
                <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                <span>Mode: {quizDirection === "DE_TO_EN" ? "German → English" : "English → German"}</span>
              </button>

              <button
                type="button"
                onClick={handleStartNextSprint}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition flex items-center gap-1.5 shadow-md shadow-amber-500/20"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>New 10Q Sprint</span>
              </button>
            </div>
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
                  You scored <span className="text-amber-400 font-bold text-lg">{quizScore}</span> out of <span className="font-bold">10</span>
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                {quizScore >= 6 ? (
                  <div className="text-emerald-400 font-semibold space-y-1">
                    <div>Passed! B1 threshold achieved ({Math.round((quizScore / 10) * 100)}%).</div>
                    <div className="text-slate-400 text-[11px]">
                      Great recognition speed. Keep sprinting across different sets to lock in all {B1_EXPANDED_VOCABULARY.length} exam words.
                    </div>
                  </div>
                ) : (
                  <div className="text-amber-400 font-semibold space-y-1">
                    <div>Practice Needed ({Math.round((quizScore / 10) * 100)}% - B1 pass threshold is 60%).</div>
                    <div className="text-slate-400 text-[11px]">
                      ADHD sprint repetition works best: take another 10-question sprint right away to reinforce retention!
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
          ) : currentQuizWord ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">
                    Question <strong className="text-white">{quizIndex + 1}</strong> of 10
                  </span>
                  <span className="text-amber-400 font-bold">
                    Score: {quizScore} / {quizIndex + (quizSelectedOption !== null ? 1 : 0)}
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-amber-300 h-full transition-all duration-300"
                    style={{ width: `${((quizIndex + 1) / 10) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800/90 text-center space-y-3 relative">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400/80 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 inline-block">
                  Category: {currentQuizWord.category} - {currentQuizWord.partOfSpeech}
                </span>

                {quizDirection === "DE_TO_EN" ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      {currentQuizWord.article && (
                        <span className={`px-2 py-0.5 rounded-md text-xs font-black uppercase font-mono ${
                          currentQuizWord.article === "der"
                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                            : currentQuizWord.article === "die"
                            ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        }`}>
                          {currentQuizWord.article}
                        </span>
                      )}
                      <h4 className="text-2xl sm:text-3xl font-black text-white">
                        {currentQuizWord.german}
                      </h4>
                      <AudioVoiceButton
                        text={currentQuizWord.article ? `${currentQuizWord.article} ${currentQuizWord.german}` : currentQuizWord.german}
                      />
                    </div>
                    {currentQuizWord.plural && (
                      <div className="text-xs text-slate-400 font-mono">
                        Plural: {currentQuizWord.plural}
                      </div>
                    )}
                    <p className="text-xs text-slate-400">
                      What is the correct English meaning for this B1 exam term?
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h4 className="text-2xl sm:text-3xl font-black text-amber-300">
                      {currentQuizWord.english}
                    </h4>
                    <p className="text-xs text-slate-400">
                      What is the correct German word for this B1 term?
                    </p>
                  </div>
                )}
              </div>

              {/* 4 Multiple Choice Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quizOptions.map((opt, idx) => {
                  const isSelected = quizSelectedOption === idx;
                  const isCorrect = idx === correctQuizOptionIndex;
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

                  const optionLabel = quizDirection === "DE_TO_EN"
                    ? opt.english
                    : (opt.article ? `${opt.article} ${opt.german}` : opt.german);

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={revealed}
                      onClick={() => handlePickQuizOption(idx)}
                      className={`p-4 rounded-xl border text-left text-sm font-semibold transition flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <span className="flex-1">{optionLabel}</span>
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
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-amber-300">
                        {currentQuizWord.article ? `${currentQuizWord.article} ${currentQuizWord.german}` : currentQuizWord.german} = {currentQuizWord.english}
                      </div>
                      <div className="text-xs text-slate-300 font-medium mt-1">
                        {currentQuizWord.example_de}
                      </div>
                      <div className="text-[11px] text-slate-500 italic">
                        {currentQuizWord.example_en}
                      </div>
                    </div>
                    <AudioVoiceButton text={currentQuizWord.example_de} />
                  </div>

                  <div className="text-[11px] text-amber-200/90 bg-amber-950/20 p-2.5 rounded-lg border border-amber-500/20 flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Exam Trap Note:</strong> {currentQuizWord.examSignalTip}</span>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextQuizQuestion}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm transition flex items-center gap-2 shadow-lg shadow-amber-500/20"
                    >
                      <span>{quizIndex + 1 >= 10 ? "Finish Sprint" : "Next Question"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
