"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile, LocalAccount } from "@/types";
import { playSuccessChime, playErrorChime } from "@/utils/soundEffects";

const DEFAULT_PROFILE: UserProfile = {
  name: "German Student",
  targetExam: "DTZ",
  targetDate: "2026-12-31",
  selectedState: "brandenburg",
  completedWritingIds: [],
  masteredSpeakingIds: [],
  masteredKeywordIds: [],
  completedReadingIds: [],
  completedListeningIds: [],
  questionMastery: {},
  currentStreak: 0,
  bestStreak: 0,
  adhdFocusMode: false,
  soundEnabled: true,
  citizenshipExamHistory: [],
  bookmarkedQuestionIds: [],
  failedQuestionIds: []
};

const DEFAULT_ACCOUNT: LocalAccount = {
  id: "primary-user",
  username: "student",
  pin: "1234",
  createdAt: new Date().toISOString(),
  lastLogin: new Date().toISOString(),
  profile: DEFAULT_PROFILE
};

const ACCOUNTS_STORAGE_KEY = "german_prep_accounts_v2";
const ACTIVE_ACCOUNT_ID_KEY = "german_prep_active_account_id_v2";
const AUTH_SESSION_KEY = "german_prep_auth_session_v2";

interface UserContextType {
  account: LocalAccount;
  profile: UserProfile;
  isLoggedIn: boolean;
  isLoaded: boolean;
  login: (username: string, pin: string) => boolean;
  createAccount: (username: string, pin: string, name: string) => boolean;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  markWritingCompleted: (id: string) => void;
  toggleWritingCompleted: (id: string) => void;
  markSpeakingMastered: (id: string) => void;
  toggleSpeakingMastered: (id: string) => void;
  toggleKeywordMastered: (id: string) => void;
  markReadingCompleted: (id: string) => void;
  toggleReadingCompleted: (id: string) => void;
  markListeningCompleted: (id: string) => void;
  toggleListeningCompleted: (id: string) => void;
  recordCitizenshipExamResult: (score: number, total: number, state: string, timeSpentSeconds: number) => void;
  toggleBookmarkQuestion: (id: number) => void;
  recordQuestionAnswer: (id: number, isCorrect: boolean) => void;
  toggleAdhdFocusMode: () => void;
  toggleSound: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonString: string) => boolean;
  resetProgress: () => void;
  overallReadiness: number;
  masteredQuestionsCount: number;
  showEnglish: boolean;
  setShowEnglish: (val: boolean) => void;
  toggleShowEnglish: () => void;
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
  toggleTheme: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "german_prep_theme_preference";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<LocalAccount>(DEFAULT_ACCOUNT);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // default logged in for convenience
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [showEnglish, setShowEnglish] = useState<boolean>(false); // Always toggled off by default - user can turn on
  const [theme, setThemeState] = useState<"dark" | "light">("dark"); // Default is dark per user preference

  const applyThemeToDoc = (t: "dark" | "light") => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (t === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
        root.setAttribute("data-theme", "dark");
      } else {
        root.classList.add("light");
        root.classList.remove("dark");
        root.setAttribute("data-theme", "light");
      }
    }
  };

  const setTheme = (newTheme: "dark" | "light") => {
    setThemeState(newTheme);
    applyThemeToDoc(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {}
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Initial theme setup on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as "dark" | "light" | null;
      const initial = saved === "light" ? "light" : "dark"; // Default is dark
      setThemeState(initial);
      applyThemeToDoc(initial);
    } catch {
      applyThemeToDoc("dark");
    }
  }, []);

  const toggleShowEnglish = () => {
    setShowEnglish(prev => !prev);
  };

  // Load from local storage
  useEffect(() => {
    try {
      const storedAccounts = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      let accounts: Record<string, LocalAccount> = {};

      if (storedAccounts) {
        accounts = JSON.parse(storedAccounts);
      } else {
        accounts = { [DEFAULT_ACCOUNT.id]: DEFAULT_ACCOUNT };
        localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
      }

      const activeId = localStorage.getItem(ACTIVE_ACCOUNT_ID_KEY) || DEFAULT_ACCOUNT.id;
      const currentAcc = accounts[activeId] || DEFAULT_ACCOUNT;

      // Merge defaults in case older stored version lacks reading/listening arrays
      if (!currentAcc.profile.completedReadingIds) currentAcc.profile.completedReadingIds = [];
      if (!currentAcc.profile.completedListeningIds) currentAcc.profile.completedListeningIds = [];

      // Check session
      const hasSession = localStorage.getItem(AUTH_SESSION_KEY) === "true";
      setAccount(currentAcc);
      setIsLoggedIn(hasSession || true);
    } catch (e) {
      console.error("Failed to load accounts from storage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const persistAccount = (acc: LocalAccount) => {
    setAccount(acc);
    try {
      const storedAccounts = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      let accounts: Record<string, LocalAccount> = storedAccounts ? JSON.parse(storedAccounts) : {};
      accounts[acc.id] = acc;
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
      localStorage.setItem(ACTIVE_ACCOUNT_ID_KEY, acc.id);
    } catch (e) {
      console.error("Failed to persist account", e);
    }
  };

  const login = (username: string, pin: string): boolean => {
    try {
      const stored = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      if (!stored) return false;
      const accounts: Record<string, LocalAccount> = JSON.parse(stored);
      const found = Object.values(accounts).find(
        a => a.username.toLowerCase() === username.trim().toLowerCase() && a.pin === pin.trim()
      );

      if (found) {
        const updated = { ...found, lastLogin: new Date().toISOString() };
        persistAccount(updated);
        setIsLoggedIn(true);
        localStorage.setItem(AUTH_SESSION_KEY, "true");
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const createAccount = (username: string, pin: string, name: string): boolean => {
    try {
      const stored = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      let accounts: Record<string, LocalAccount> = stored ? JSON.parse(stored) : {};

      const exists = Object.values(accounts).some(
        a => a.username.toLowerCase() === username.trim().toLowerCase()
      );
      if (exists) return false;

      const newId = "user-" + Date.now();
      const newAcc: LocalAccount = {
        id: newId,
        username: username.trim(),
        pin: pin.trim(),
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        profile: {
          ...DEFAULT_PROFILE,
          name: name.trim() || username.trim()
        }
      };

      accounts[newId] = newAcc;
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
      persistAccount(newAcc);
      setIsLoggedIn(true);
      localStorage.setItem(AUTH_SESSION_KEY, "true");
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem(AUTH_SESSION_KEY);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    const updatedAccount = {
      ...account,
      profile: {
        ...account.profile,
        ...updates
      }
    };
    persistAccount(updatedAccount);
  };

  const toggleWritingCompleted = (id: string) => {
    const isCompleted = account.profile.completedWritingIds.includes(id);
    const updated = isCompleted
      ? account.profile.completedWritingIds.filter(x => x !== id)
      : [...account.profile.completedWritingIds, id];
    if (!isCompleted && account.profile.soundEnabled) playSuccessChime();
    updateProfile({ completedWritingIds: updated });
  };

  const markWritingCompleted = (id: string) => {
    toggleWritingCompleted(id);
  };

  const toggleSpeakingMastered = (id: string) => {
    const isMastered = account.profile.masteredSpeakingIds.includes(id);
    const updated = isMastered
      ? account.profile.masteredSpeakingIds.filter(x => x !== id)
      : [...account.profile.masteredSpeakingIds, id];
    if (!isMastered && account.profile.soundEnabled) playSuccessChime();
    updateProfile({ masteredSpeakingIds: updated });
  };

  const markSpeakingMastered = (id: string) => {
    toggleSpeakingMastered(id);
  };

  const toggleKeywordMastered = (id: string) => {
    const exists = account.profile.masteredKeywordIds.includes(id);
    const updated = exists
      ? account.profile.masteredKeywordIds.filter(x => x !== id)
      : [...account.profile.masteredKeywordIds, id];
    if (!exists && account.profile.soundEnabled) playSuccessChime();
    updateProfile({ masteredKeywordIds: updated });
  };

  const toggleReadingCompleted = (id: string) => {
    const current = account.profile.completedReadingIds || [];
    const isCompleted = current.includes(id);
    const updated = isCompleted
      ? current.filter(x => x !== id)
      : [...current, id];
    if (!isCompleted && account.profile.soundEnabled) playSuccessChime();
    updateProfile({ completedReadingIds: updated });
  };

  const markReadingCompleted = (id: string) => {
    toggleReadingCompleted(id);
  };

  const toggleListeningCompleted = (id: string) => {
    const current = account.profile.completedListeningIds || [];
    const isCompleted = current.includes(id);
    const updated = isCompleted
      ? current.filter(x => x !== id)
      : [...current, id];
    if (!isCompleted && account.profile.soundEnabled) playSuccessChime();
    updateProfile({ completedListeningIds: updated });
  };

  const markListeningCompleted = (id: string) => {
    toggleListeningCompleted(id);
  };

  const recordCitizenshipExamResult = (score: number, total: number, state: string, timeSpentSeconds: number) => {
    const passed = score >= 17;
    if (passed && account.profile.soundEnabled) playSuccessChime();
    const newEntry = {
      date: new Date().toISOString(),
      score,
      total,
      passed,
      state,
      timeSpentSeconds
    };
    updateProfile({
      citizenshipExamHistory: [newEntry, ...account.profile.citizenshipExamHistory]
    });
  };

  const toggleBookmarkQuestion = (id: number) => {
    const exists = account.profile.bookmarkedQuestionIds.includes(id);
    const updated = exists
      ? account.profile.bookmarkedQuestionIds.filter(x => x !== id)
      : [...account.profile.bookmarkedQuestionIds, id];
    updateProfile({ bookmarkedQuestionIds: updated });
  };

  const recordQuestionAnswer = (id: number, isCorrect: boolean) => {
    const prevCount = account.profile.questionMastery[id] || 0;
    const newCount = isCorrect ? prevCount + 1 : 0;
    const newMastery = { ...account.profile.questionMastery, [id]: newCount };

    let newStreak = isCorrect ? account.profile.currentStreak + 1 : 0;
    let newBest = Math.max(account.profile.bestStreak, newStreak);

    let updatedFailed = account.profile.failedQuestionIds;
    if (isCorrect) {
      if (account.profile.soundEnabled) playSuccessChime();
      updatedFailed = updatedFailed.filter(x => x !== id);
    } else {
      if (account.profile.soundEnabled) playErrorChime();
      if (!updatedFailed.includes(id)) {
        updatedFailed = [...updatedFailed, id];
      }
    }

    updateProfile({
      questionMastery: newMastery,
      currentStreak: newStreak,
      bestStreak: newBest,
      failedQuestionIds: updatedFailed
    });
  };

  const toggleAdhdFocusMode = () => {
    updateProfile({ adhdFocusMode: !account.profile.adhdFocusMode });
  };

  const toggleSound = () => {
    updateProfile({ soundEnabled: !account.profile.soundEnabled });
  };

  const exportDataJson = (): string => {
    return JSON.stringify(account, null, 2);
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.profile) {
        persistAccount(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const resetProgress = () => {
    updateProfile({
      completedWritingIds: [],
      masteredSpeakingIds: [],
      masteredKeywordIds: [],
      completedReadingIds: [],
      completedListeningIds: [],
      questionMastery: {},
      currentStreak: 0,
      bestStreak: 0,
      citizenshipExamHistory: [],
      bookmarkedQuestionIds: [],
      failedQuestionIds: []
    });

    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("german_prep_adhd_pathway_progress");
        localStorage.removeItem("german_prep_fight_path_DTZ");
        localStorage.removeItem("german_prep_fight_path_TELC_B1");
        localStorage.removeItem("german_prep_fight_path_GOETHE_B1");
        localStorage.removeItem("german_prep_fight_path_CITIZENSHIP_ONLY");
        window.dispatchEvent(new Event("german_prep_reset_progress"));
      } catch (e) {
        console.warn("Could not clear pathway progress in localStorage", e);
      }
    }
  };

  const masteredQuestionsCount = Object.values(account.profile.questionMastery || {}).filter(c => c >= 2).length;

  // Comprehensive 5-Pillar Practice-Until-You-Pass Readiness Formula:
  // 1. Citizenship (310 Qs for target state): 30%
  // 2. Writing (8 exam templates): 20%
  // 3. Speaking (3 scripts/scenarios): 20%
  // 4. Reading (15 tasks across 3 sets): 15%
  // 5. Listening (12 tasks across 3 sets): 15%
  // Total = 100%!
  const targetQuestions = 310;
  const citizenshipProgress = Math.min(30, (masteredQuestionsCount / targetQuestions) * 30);
  const writingProgress = Math.min(20, (account.profile.completedWritingIds.length / 8) * 20);
  const speakingProgress = Math.min(20, (account.profile.masteredSpeakingIds.length / 3) * 20);
  const readingProgress = Math.min(15, ((account.profile.completedReadingIds || []).length / 15) * 15);
  const listeningProgress = Math.min(15, ((account.profile.completedListeningIds || []).length / 12) * 15);

  const overallReadiness = Math.round(
    citizenshipProgress + writingProgress + speakingProgress + readingProgress + listeningProgress
  );

  return (
    <UserContext.Provider
      value={{
        account,
        profile: account.profile,
        isLoggedIn,
        isLoaded,
        login,
        createAccount,
        logout,
        updateProfile,
        markWritingCompleted,
        toggleWritingCompleted,
        markSpeakingMastered,
        toggleSpeakingMastered,
        toggleKeywordMastered,
        markReadingCompleted,
        toggleReadingCompleted,
        markListeningCompleted,
        toggleListeningCompleted,
        recordCitizenshipExamResult,
        toggleBookmarkQuestion,
        recordQuestionAnswer,
        toggleAdhdFocusMode,
        toggleSound,
        exportDataJson,
        importDataJson,
        resetProgress,
        overallReadiness,
        masteredQuestionsCount,
        showEnglish,
        setShowEnglish,
        toggleShowEnglish,
        theme,
        setTheme,
        toggleTheme
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
