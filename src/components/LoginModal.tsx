"use client";

import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import { 
  X, 
  User, 
  Lock, 
  KeyRound, 
  Download, 
  Upload, 
  RotateCcw, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  PlusCircle,
  LogOut
} from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { 
    account, 
    profile, 
    login, 
    createAccount, 
    logout, 
    updateProfile, 
    exportDataJson, 
    importDataJson, 
    resetProgress 
  } = useUser();

  const [activeTab, setActiveTab] = useState<"SETTINGS" | "LOGIN" | "SIGNUP" | "BACKUP">("SETTINGS");

  // Profile Settings Form
  const [name, setName] = useState(profile.name);
  const [targetExam, setTargetExam] = useState(profile.targetExam);
  const [targetDate, setTargetDate] = useState(profile.targetDate);
  const [selectedState, setSelectedState] = useState(profile.selectedState);

  // Login Form
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPin, setLoginPin] = useState("");
  const [loginError, setLoginError] = useState("");

  // Create Account Form
  const [newUsername, setNewUsername] = useState("");
  const [newPin, setNewPin] = useState("");
  const [newName, setNewName] = useState("");
  const [signupError, setSignupError] = useState("");

  // Backup Import State
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      targetExam,
      targetDate,
      selectedState
    });
    onClose();
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const ok = login(loginUsername, loginPin);
    if (ok) {
      onClose();
    } else {
      setLoginError("Invalid username or PIN. (Default account: student / 1234)");
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError("");
    const ok = createAccount(newUsername, newPin, newName);
    if (ok) {
      onClose();
    } else {
      setSignupError("Username already exists. Please choose a different username.");
    }
  };

  const handleExport = () => {
    const dataStr = exportDataJson();
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `german-prep-backup-${account.username}-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importDataJson(content);
      if (success) {
        setImportStatus("Progress imported successfully! ✦");
        setTimeout(() => setImportStatus(null), 3000);
      } else {
        setImportStatus("Failed to parse progress file. Please check JSON format.");
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all test scores and progress? This cannot be undone.")) {
      resetProgress();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative space-y-5">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab("SETTINGS")}
            className={`flex-1 py-2 px-3 rounded-xl font-bold transition text-center ${
              activeTab === "SETTINGS"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Exam Profile
          </button>
          <button
            onClick={() => setActiveTab("LOGIN")}
            className={`flex-1 py-2 px-3 rounded-xl font-bold transition text-center ${
              activeTab === "LOGIN"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Switch Account
          </button>
          <button
            onClick={() => setActiveTab("SIGNUP")}
            className={`flex-1 py-2 px-3 rounded-xl font-bold transition text-center ${
              activeTab === "SIGNUP"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            New Account
          </button>
          <button
            onClick={() => setActiveTab("BACKUP")}
            className={`flex-1 py-2 px-3 rounded-xl font-bold transition text-center ${
              activeTab === "BACKUP"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Data Backup
          </button>
        </div>

        {/* Current Active Account Header */}
        <div className="flex items-center justify-between p-3 bg-slate-950/80 rounded-2xl border border-slate-800/80 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 font-extrabold flex items-center justify-center border border-amber-500/30">
              {account.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-bold text-white flex items-center gap-1.5">
                <span>Logged in as: {account.username}</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded font-semibold">
                  Local Device
                </span>
              </div>
              <div className="text-[11px] text-slate-400">{profile.name} • {profile.targetExam}</div>
            </div>
          </div>
        </div>

        {/* TAB 1: PROFILE SETTINGS */}
        {activeTab === "SETTINGS" && (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Display Name / Student Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Target German Exam:</label>
              <select
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="DTZ">DTZ (Deutsch-Test für Zuwanderer A2-B1)</option>
                <option value="TELC_B1">TELC Deutsch B1 (Zertifikat Deutsch)</option>
                <option value="GOETHE_B1">Goethe-Zertifikat B1</option>
                <option value="CITIZENSHIP_ONLY">Citizenship Test Only (Einbürgerungstest)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Target Exam Date:</label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Bundesland (German State for Citizenship):</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="baden-wuerttemberg">Baden-Württemberg</option>
                <option value="bayern">Bayern</option>
                <option value="berlin">Berlin</option>
                <option value="brandenburg">Brandenburg</option>
                <option value="bremen">Bremen</option>
                <option value="hamburg">Hamburg</option>
                <option value="hessen">Hessen</option>
                <option value="mecklenburg-vorpommern">Mecklenburg-Vorpommern</option>
                <option value="niedersachsen">Niedersachsen</option>
                <option value="nordrhein-westfalen">Nordrhein-Westfalen</option>
                <option value="rheinland-pfalz">Rheinland-Pfalz</option>
                <option value="saarland">Saarland</option>
                <option value="sachsen">Sachsen</option>
                <option value="sachsen-anhalt">Sachsen-Anhalt</option>
                <option value="schleswig-holstein">Schleswig-Holstein</option>
                <option value="thueringen">Thüringen</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition shadow-lg shadow-amber-500/20"
              >
                Save Settings ✦
              </button>
            </div>

            {/* Fresh Start: Danger Zone */}
            <div className="mt-4 pt-4 border-t border-slate-800 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-300">
                <RotateCcw className="w-4 h-4 text-rose-400" />
                <span>Fresh Start (Clear All Progress & Attempts)</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Clears all simulation attempts, scores, question mastery, completed reading/writing exercises, and study pathways back to a 100% clean slate.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2.5 px-3 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/40 hover:border-rose-500 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4 text-rose-400" />
                <span>Reset All Attempts & Start Fresh ↺</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: SWITCH ACCOUNT / LOGIN */}
        {activeTab === "LOGIN" && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Username:</label>
              <input
                type="text"
                placeholder="e.g. student"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">4-Digit PIN or Password:</label>
              <input
                type="password"
                placeholder="e.g. 1234"
                value={loginPin}
                onChange={(e) => setLoginPin(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
              />
              <span className="text-[11px] text-slate-500">Default account: username <strong>student</strong>, PIN <strong>1234</strong></span>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-950/50 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition shadow-lg shadow-amber-500/20"
            >
              Sign In ✦
            </button>
          </form>
        )}

        {/* TAB 3: CREATE NEW ACCOUNT */}
        {activeTab === "SIGNUP" && (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Your Full Name:</label>
              <input
                type="text"
                placeholder="e.g. Alex Becker"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Choose a Username:</label>
              <input
                type="text"
                placeholder="e.g. alex2026"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">4-Digit PIN / Passcode:</label>
              <input
                type="password"
                placeholder="e.g. 5678"
                maxLength={8}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            {signupError && (
              <div className="p-3 bg-rose-950/50 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{signupError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition shadow-lg shadow-amber-500/20"
            >
              Create Account & Start Drills ✦
            </button>
          </form>
        )}

        {/* TAB 4: DATA BACKUP & FREE HOSTING SYNC */}
        {activeTab === "BACKUP" && (
          <div className="space-y-5 text-xs text-slate-300">
            <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-300 space-y-1 leading-relaxed">
              <strong className="block text-white font-bold">Free Hosting Sync & Portability:</strong>
              When you host this site on Vercel or Netlify for free, or switch between your phone and laptop, export your progress as a file and upload it on your other device with zero cost.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleExport}
                className="p-4 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 text-center transition"
              >
                <Download className="w-6 h-6 text-amber-400" />
                <span className="font-bold text-white">Export Progress (JSON)</span>
                <span className="text-[10px] text-slate-400">Save test scores & drills to file</span>
              </button>

              <label className="p-4 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 text-center transition cursor-pointer">
                <Upload className="w-6 h-6 text-emerald-400" />
                <span className="font-bold text-white">Import Progress (JSON)</span>
                <span className="text-[10px] text-slate-400">Restore your drills from file</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {importStatus && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-300 font-semibold text-center">
                {importStatus}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
