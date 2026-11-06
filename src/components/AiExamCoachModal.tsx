"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { AudioVoiceButton } from "./AudioVoiceButton";
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  PenTool, 
  Mic, 
  HelpCircle, 
  RotateCcw, 
  Lightbulb, 
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight
} from "lucide-react";

interface AiExamCoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "GRADE_LETTER" | "SPEAKING_PARTNER" | "EXPLAIN_GRAMMAR";
  initialLetterText?: string;
}

export const AiExamCoachModal: React.FC<AiExamCoachModalProps> = ({
  isOpen,
  onClose,
  initialMode = "GRADE_LETTER",
  initialLetterText = ""
}) => {
  const { profile } = useUser();
  const [activeTab, setActiveTab] = useState<"GRADE_LETTER" | "SPEAKING_PARTNER" | "EXPLAIN_GRAMMAR">(initialMode);
  const [aiStatus, setAiStatus] = useState<{ online: boolean; modelName?: string; backend?: string }>({ online: false });

  // Letter Grader State
  const [letterText, setLetterText] = useState<string>(initialLetterText);
  const [isGrading, setIsGrading] = useState<boolean>(false);
  const [gradingResult, setGradingResult] = useState<any>(null);

  // Speaking Partner State
  const [speakingHistory, setSpeakingHistory] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: "Hallo! Schön, dass wir zusammen die mündliche Prüfung (Teil 3: Gemeinsam etwas planen) üben. Wollen wir am Samstag zusammen ein Abschiedsfest für unseren Kollegen Thomas organisieren? Hast du einen Vorschlag für den Ort?"
    }
  ]);
  const [speakingInput, setSpeakingInput] = useState<string>("");
  const [isPartnerThinking, setIsPartnerThinking] = useState<boolean>(false);

  // Grammar Explainer State
  const [grammarQuestion, setGrammarQuestion] = useState<string>("");
  const [grammarAnswer, setGrammarAnswer] = useState<string>("");
  const [isExplaining, setIsExplaining] = useState<boolean>(false);

  // Check Ollama status on open
  useEffect(() => {
    if (!isOpen) return;

    fetch("/api/ai-tutor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: "STATUS" })
    })
      .then(res => res.json())
      .then(data => {
        setAiStatus({
          online: !!data.online,
          modelName: data.modelName || "german-b1-tutor",
          backend: data.backend || "ollama-local"
        });
      })
      .catch(() => {
        setAiStatus({ online: false, backend: "heuristic-fallback" });
      });
  }, [isOpen]);

  if (!isOpen) return null;

  // Grade Letter Handler
  const handleGradeLetter = async () => {
    if (!letterText.trim()) return;
    setIsGrading(true);
    setGradingResult(null);

    try {
      const res = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "GRADE_LETTER",
          letterText,
          targetExam: profile.targetExam
        })
      });
      const data = await res.json();
      setGradingResult(data);
    } catch (err) {
      console.error("Grading failed:", err);
    } finally {
      setIsGrading(false);
    }
  };

  // Speaking Partner Message Handler
  const handleSendSpeakingMessage = async () => {
    if (!speakingInput.trim() || isPartnerThinking) return;
    const userMsg = speakingInput.trim();
    setSpeakingInput("");

    const newHistory = [...speakingHistory, { role: "user" as const, content: userMsg }];
    setSpeakingHistory(newHistory);
    setIsPartnerThinking(true);

    try {
      const res = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "SPEAKING_PARTNER",
          prompt: userMsg,
          history: newHistory.slice(-6)
        })
      });
      const data = await res.json();
      if (data.reply) {
        setSpeakingHistory(prev => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch (err) {
      console.error("Speaking partner failed:", err);
    } finally {
      setIsPartnerThinking(false);
    }
  };

  // Explain Grammar Handler
  const handleExplainGrammar = async (q?: string) => {
    const query = q || grammarQuestion;
    if (!query.trim() || isExplaining) return;
    setIsExplaining(true);
    setGrammarAnswer("");

    try {
      const res = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "EXPLAIN_GRAMMAR",
          prompt: query
        })
      });
      const data = await res.json();
      setGrammarAnswer(data.reply || "Keine Antwort erhalten.");
    } catch (err) {
      console.error("Grammar explanation failed:", err);
    } finally {
      setIsExplaining(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">AI German Exam Coach</h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono border ${
                  aiStatus.online 
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                    : "bg-slate-800 text-slate-400 border-slate-700"
                }`}>
                  {aiStatus.online ? "Local Ollama Connected" : "Local Engine Ready"}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Trained specifically for {profile.targetExam} passing criteria
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-4 pt-2 text-xs font-bold gap-2">
          <button
            onClick={() => setActiveTab("GRADE_LETTER")}
            className={`px-3.5 py-2.5 rounded-t-xl transition flex items-center gap-1.5 border-b-2 ${
              activeTab === "GRADE_LETTER"
                ? "bg-slate-900 text-amber-400 border-amber-500"
                : "text-slate-400 hover:text-slate-200 border-transparent"
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Letter Grader (Schreiben)</span>
          </button>

          <button
            onClick={() => setActiveTab("SPEAKING_PARTNER")}
            className={`px-3.5 py-2.5 rounded-t-xl transition flex items-center gap-1.5 border-b-2 ${
              activeTab === "SPEAKING_PARTNER"
                ? "bg-slate-900 text-amber-400 border-amber-500"
                : "text-slate-400 hover:text-slate-200 border-transparent"
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Speaking Partner (Teil 3)</span>
          </button>

          <button
            onClick={() => setActiveTab("EXPLAIN_GRAMMAR")}
            className={`px-3.5 py-2.5 rounded-t-xl transition flex items-center gap-1.5 border-b-2 ${
              activeTab === "EXPLAIN_GRAMMAR"
                ? "bg-slate-900 text-amber-400 border-amber-500"
                : "text-slate-400 hover:text-slate-200 border-transparent"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Grammar & Questions</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-5">
          {/* TAB 1: LETTER GRADER */}
          {activeTab === "GRADE_LETTER" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-300">
                    Paste or write your B1 exam letter:
                  </label>
                  <span className="text-slate-500 font-mono text-[11px]">
                    {letterText.trim().split(/\s+/).filter(Boolean).length} words
                  </span>
                </div>
                <textarea
                  value={letterText}
                  onChange={(e) => setLetterText(e.target.value)}
                  placeholder="Sehr geehrte Damen und Herren, ich schreibe Ihnen, weil... Mit freundlichen Grüßen..."
                  rows={7}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500/60 leading-relaxed font-sans resize-none"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setLetterText("Sehr geehrte Frau Müller,\n\nich schreibe Ihnen, weil ich gestern leider nicht zum Deutschunterricht kommen konnte. Ich hatte starkes Fieber und musste zum Arzt gehen. Das ärztliche Attest habe ich beigefügt.\n\nKönnten Sie mir bitte mitteilen, welche Hausaufgaben wir bis morgen erledigen müssen? Ich möchte den Stoff schnell nachholen.\n\nVielen Dank für Ihr Verständnis.\n\nMit freundlichen Grüßen,\nAlex")}
                  className="text-xs text-amber-400 hover:underline"
                >
                  Insert Sample Letter
                </button>

                <button
                  type="button"
                  disabled={isGrading || !letterText.trim()}
                  onClick={handleGradeLetter}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm transition flex items-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isGrading ? "Analyzing Letter..." : "Grade with AI Tutor"}</span>
                </button>
              </div>

              {/* Grading Results */}
              {gradingResult && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      {gradingResult.isPass ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      )}
                      <div>
                        <div className="text-sm font-black text-white">
                          {gradingResult.isPass ? "BESTANDEN (PASS)" : "NICHT BESTANDEN (NEEDS WORK)"}
                        </div>
                        <div className="text-[11px] text-slate-400">{gradingResult.assessment}</div>
                      </div>
                    </div>
                    <div className="text-xl font-black text-amber-400 font-mono">
                      {gradingResult.score}%
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="font-bold text-slate-400 uppercase text-[10px] tracking-wider">
                      Examiner Corrections & Actionable Feedback:
                    </div>
                    {gradingResult.feedback && Array.isArray(gradingResult.feedback) ? (
                      <ul className="space-y-1">
                        {gradingResult.feedback.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                            <span className="text-amber-400 font-bold shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>{gradingResult.feedback}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SPEAKING PARTNER ROLEPLAY */}
          {activeTab === "SPEAKING_PARTNER" && (
            <div className="space-y-4">
              <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-2xl text-xs text-amber-200/90 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Exam Simulation:</strong> The AI acts as your partner for Sprechen Teil 3 (Gemeinsam etwas planen). Reply with suggestions and negotiate logistics.
                </span>
              </div>

              {/* Chat Message Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 max-h-72 overflow-y-auto space-y-3">
                {speakingHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed space-y-2 ${
                        msg.role === "user"
                          ? "bg-amber-500 text-slate-950 font-semibold"
                          : "bg-slate-900 border border-slate-800 text-slate-200"
                      }`}
                    >
                      <p>{msg.content}</p>
                      {msg.role === "assistant" && (
                        <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between">
                          <AudioVoiceButton text={msg.content.split("[")[0]} label="Listen" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isPartnerThinking && (
                  <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                    <span>Exam partner is replying...</span>
                  </div>
                )}
              </div>

              {/* Reply Input Bar */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={speakingInput}
                  onChange={(e) => setSpeakingInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendSpeakingMessage()}
                  placeholder="Z. B.: 'Das klingt super! Wie wäre es, wenn wir am Samstag um 15 Uhr...'"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  disabled={!speakingInput.trim() || isPartnerThinking}
                  onClick={handleSendSpeakingMessage}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-1.5 disabled:opacity-50 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: GRAMMAR & QUESTIONS */}
          {activeTab === "EXPLAIN_GRAMMAR" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-300">
                  Ask any question about B1 German or citizenship:
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={grammarQuestion}
                    onChange={(e) => setGrammarQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleExplainGrammar()}
                    placeholder="Z. B.: Warum heißt es 'mit dem Bus' und nicht 'mit den Bus'?"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    disabled={!grammarQuestion.trim() || isExplaining}
                    onClick={() => handleExplainGrammar()}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-1.5 disabled:opacity-50 shrink-0"
                  >
                    <span>Explain</span>
                  </button>
                </div>
              </div>

              {/* Quick Questions Pills */}
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {[
                  "Was ist der Unterschied zwischen 'nicht dürfen' und 'nicht müssen'?",
                  "Wohin gehört das Verb bei 'weil' und 'obwohl'?",
                  "Wie funktioniert die 5-Satz-Bildbeschreibung für Sprechen?",
                  "Was ist der Trick bei Dativ-Präpositionen?"
                ].map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setGrammarQuestion(q);
                      handleExplainGrammar(q);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-amber-300 border border-slate-800 transition text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Answer Box */}
              {grammarAnswer && (
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-200 leading-relaxed animate-fadeIn">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Tutor Explanation:</span>
                  </div>
                  <p className="whitespace-pre-wrap">{grammarAnswer}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
