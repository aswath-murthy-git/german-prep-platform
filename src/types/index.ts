export interface QuestionOption {
  de: string;
  en: string;
}

export interface CitizenshipQuestion {
  id: number;
  stateSlug: string | null;
  stateName: string | null;
  de: string;
  en: string;
  options: QuestionOption[];
  correct: number;
  explanation_de: string;
  explanation_en: string;
  image: string | null;
  category: string;
}

export interface StateInfo {
  slug: string;
  name_de: string;
  name_en: string;
  questions: CitizenshipQuestion[];
}

export interface CitizenshipData {
  version: string;
  totalGeneral: number;
  totalStates: number;
  general: CitizenshipQuestion[];
  states: Record<string, StateInfo>;
}

export interface UserProfile {
  name: string;
  targetExam: "DTZ" | "TELC_B1" | "GOETHE_B1" | "CITIZENSHIP_ONLY";
  targetDate: string;
  selectedState: string;
  completedWritingIds: string[];
  masteredSpeakingIds: string[];
  masteredKeywordIds: string[];
  completedReadingIds: string[];
  completedListeningIds: string[];
  questionMastery: Record<number, number>; // questionId -> consecutive correct count (2 = Exam Ready)
  currentStreak: number;
  bestStreak: number;
  adhdFocusMode: boolean;
  soundEnabled: boolean;
  citizenshipExamHistory: {
    date: string;
    score: number;
    total: number;
    passed: boolean;
    state: string;
    timeSpentSeconds: number;
  }[];
  bookmarkedQuestionIds: number[];
  failedQuestionIds: number[];
}

export interface LocalAccount {
  id: string;
  username: string;
  pin: string; // 4-digit PIN or password
  createdAt: string;
  lastLogin: string;
  profile: UserProfile;
}

export interface WritingTemplate {
  id: string;
  title: string;
  examType: string;
  level: string;
  scenario: string;
  scenario_en: string;
  bulletPoints: string[];
  bulletPoints_en: string[];
  sampleSolution: string;
  sampleSolution_en: string;
  fillInTheBlankTemplate: string;
  blankAnswers: string[];
  distractors?: string[];
  keyVocab: { de: string; en: string }[];
}

export interface SpeakingPart {
  id: string;
  partNumber: 1 | 2 | 3;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  minPassFormula: string[];
  minPassFormula_en: string[];
  samplePrompts: {
    prompt: string;
    prompt_en: string;
    modelAnswer: string;
    modelAnswer_en: string;
    followUpQuestions?: { q: string; q_en: string; a: string; a_en: string }[];
  }[];
}

export interface KeywordPair {
  id: string;
  keyword: string;
  keyword_en: string;
  synonym_de: string;
  synonym_en: string;
  exampleContext: string;
  exampleContext_en: string;
  trapWarning?: string;
  trapWarning_en?: string;
}

export interface ReadingExamItem {
  id: string;
  title: string;
  sourceType: string;
  text_de: string;
  text_en: string;
  question_de: string;
  question_en: string;
  options: { de: string; en: string }[];
  correct: number;
  keywordHint: string;
  keywordHint_en: string;
}

export interface ReadingQuestionItem {
  id: string;
  question_de: string;
  question_en: string;
  options: { de: string; en: string }[];
  correct: number;
  keywordHint: string;
  keywordHint_en: string;
  trapAlert?: string;
}

export interface ReadingExamPart {
  id: string;
  setNumber?: number;
  setName?: string;
  partNumber: 1 | 2 | 3 | 4 | 5;
  title: string;
  title_en: string;
  examSource: string;
  textType: string;
  description: string;
  description_en: string;
  passHack: string;
  text_de: string;
  text_en: string;
  questions: ReadingQuestionItem[];
}

export interface ListeningQuestionItem {
  id: string;
  question_de: string;
  question_en: string;
  options: { de: string; en: string }[];
  correct: number;
  keywordHint: string;
  keywordHint_en: string;
  distractorTrap: string;
}

export interface ListeningExamPart {
  id: string;
  setNumber?: number;
  setName?: string;
  partNumber: 1 | 2 | 3 | 4;
  title: string;
  title_en: string;
  scenarioType: string;
  examSource: string;
  description: string;
  description_en: string;
  passHack: string;
  audioTranscript_de: string;
  audioTranscript_en: string;
  questions: ListeningQuestionItem[];
}
