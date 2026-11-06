"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { AudioVoiceButton } from "./AudioVoiceButton";
import { 
  Bot, 
  Sparkles, 
  X, 
  Loader2, 
  Copy, 
  Check, 
  Lightbulb, 
  Volume2,
  ExternalLink,
  BookOpen
} from "lucide-react";

interface SelectionAiExplainerProps {
  onOpenAiCoach?: (prompt?: string) => void;
}

declare global {
  interface Window {
    __explainGermanText?: (text: string) => void;
  }
}

export const SelectionAiExplainer: React.FC<SelectionAiExplainerProps> = ({ onOpenAiCoach }) => {
  const [selectedText, setSelectedText] = useState<string>("");
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number } | null>(null);
  const [isExplaining, setIsExplaining] = useState<boolean>(false);
  const [explanationData, setExplanationData] = useState<{ text: string; reply: string; source?: string } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Core selection inspection logic
  const inspectCurrentSelection = useCallback(() => {
    if (typeof window === "undefined") return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      if (!isExplaining && !explanationData) {
        setTooltipPos(null);
      }
      return;
    }

    const rawText = selection.toString().trim();
    // Valid German word or phrase length (2 to 350 chars)
    if (rawText.length < 2 || rawText.length > 350) {
      if (!isExplaining && !explanationData) {
        setTooltipPos(null);
      }
      return;
    }

    try {
      if (selection.rangeCount === 0) return;
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      if (rect.width > 0 && rect.height > 0) {
        setSelectedText(rawText);

        // Smart vertical positioning:
        // If selection is close to top (sticky navbar / task switcher at ~140px), place below selection
        const isNearTop = rect.top < 155;
        const top = isNearTop
          ? Math.min(window.innerHeight - 60, rect.bottom + 10)
          : Math.max(12, rect.top - 48);

        // Clamp horizontally so the pill stays comfortably within viewport
        const left = Math.min(Math.max(140, rect.left + rect.width / 2), window.innerWidth - 140);
        setTooltipPos({ top, left });
      }
    } catch {
      // Safe fallback
    }
  }, [isExplaining, explanationData]);

  // Request explanation from local AI model or fallback
  const handleExplainDirect = async (textToExplain: string) => {
    const text = (textToExplain || selectedText).trim();
    if (!text) return;

    setIsExplaining(true);
    setTooltipPos(null); // Hide floating pill while modal/drawer is open

    try {
      const res = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "EXPLAIN_GRAMMAR",
          prompt: text
        })
      });

      const data = await res.json();
      setExplanationData({
        text,
        reply: data?.reply || "Keine Erklärung verfügbar.",
        source: data?.source || "local-llm"
      });
    } catch {
      setExplanationData({
        text,
        reply: `1. Meaning: "${text}" is an essential German B1 exam vocabulary term.\n2. Grammar Breakdown: Check the article (der/die/das), plural ending, and word order.\n3. Exam Usage: Practice using this word in your B1 Schreiben and Sprechen tasks.`,
        source: "heuristic-fallback"
      });
    } finally {
      setIsExplaining(false);
    }
  };

  // Listen to selectionchange, mouseup, touchend, dblclick, and keyup
  useEffect(() => {
    let debounceTimer: NodeJS.Timeout | null = null;

    const handleDebouncedSelection = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(inspectCurrentSelection, 80);
    };

    const handleImmediateSelection = () => {
      setTimeout(inspectCurrentSelection, 40);
    };

    document.addEventListener("selectionchange", handleDebouncedSelection);
    document.addEventListener("mouseup", handleImmediateSelection);
    document.addEventListener("touchend", handleImmediateSelection);
    document.addEventListener("dblclick", handleImmediateSelection);
    document.addEventListener("keyup", handleDebouncedSelection);

    // Expose global helper to window so any component can invoke word explainer directly
    window.__explainGermanText = (text: string) => {
      if (!text || !text.trim()) return;
      setSelectedText(text.trim());
      handleExplainDirect(text.trim());
    };

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      document.removeEventListener("selectionchange", handleDebouncedSelection);
      document.removeEventListener("mouseup", handleImmediateSelection);
      document.removeEventListener("touchend", handleImmediateSelection);
      document.removeEventListener("dblclick", handleImmediateSelection);
      document.removeEventListener("keyup", handleDebouncedSelection);
      delete window.__explainGermanText;
    };
  }, [inspectCurrentSelection]);

  // Handle escape key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (explanationData) {
          setExplanationData(null);
        } else if (tooltipPos) {
          setTooltipPos(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [explanationData, tooltipPos]);

  const handleCopy = () => {
    if (!explanationData) return;
    navigator.clipboard.writeText(explanationData.reply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setExplanationData(null);
    setTooltipPos(null);
    setSelectedText("");
  };

  const handleQuickAudio = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      {/* ─── 1. FLOATING QUICK-TRIGGER BADGE ABOVE / BELOW SELECTION ─── */}
      {tooltipPos && !explanationData && (
        <div
          style={{
            position: "fixed",
            top: `${tooltipPos.top}px`,
            left: `${tooltipPos.left}px`,
            transform: "translateX(-50%)",
            zIndex: 10000
          }}
          className="animate-fadeIn"
          onMouseDown={(e) => {
            // CRITICAL: Prevent mousedown from collapsing the active window text selection
            e.preventDefault();
            e.stopPropagation();
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex items-center gap-1 bg-slate-900 border-2 border-amber-400 p-1 rounded-full shadow-2xl shadow-amber-500/40 backdrop-blur-md">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleExplainDirect(selectedText)}
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5 transition active:scale-95 shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
              <span>AI Tutor: Explain</span>
              <span className="max-w-[130px] truncate opacity-90 font-mono text-[11px] font-bold">
                "{selectedText}"
              </span>
            </button>

            {/* Quick Listen Button right on the floating trigger */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleQuickAudio(selectedText)}
              className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white transition"
              title="Aussprache anhören (Listen to pronunciation)"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setTooltipPos(null);
                const sel = window.getSelection();
                if (sel) sel.removeAllRanges();
              }}
              className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
              title="Schließen (Dismiss)"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ─── 2. LOADING SPINNER OVERLAY IF EXPLAINING ─── */}
      {isExplaining && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 max-w-sm w-full text-center space-y-3 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
              <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">AI Tutor is Analyzing...</div>
              <p className="text-xs text-slate-400 mt-1">
                Consulting B1 exam grammar & vocabulary models for: <strong className="text-amber-300">"{selectedText}"</strong>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─── 3. EXPLANATION FLOATING POPOVER / BOTTOM DRAWER ─── */}
      {explanationData && (
        <div 
          className="fixed inset-0 z-[10001] flex items-end sm:items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div
            ref={popoverRef}
            className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 font-bold">
                  <Bot className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white flex items-center gap-1.5">
                    <span>AI Tutor: Word & Sentence Explainer</span>
                    <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/20">
                      B1 Level
                    </span>
                  </h4>
                  <div className="text-[10px] text-slate-400">
                    Instant vocabulary breakdown & CEFR exam context
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Selected German Text Chip */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Highlighted German Text:
                </span>
                <p className="text-sm sm:text-base font-black text-amber-300 font-sans truncate">
                  "{explanationData.text}"
                </p>
              </div>
              <AudioVoiceButton text={explanationData.text} label="Listen" />
            </div>

            {/* AI Explanation Content */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Grammar & Meaning Breakdown:</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                {explanationData.reply}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-slate-800">
              <div className="text-[11px] text-slate-500 font-mono">
                {explanationData.source === "local-llm"
                  ? "Powered by local Ollama AI Tutor (german-b1-tutor)"
                  : "B1 Exam Fast-Track Knowledge Base"}
              </div>

              <div className="flex items-center gap-2">
                {onOpenAiCoach && (
                  <button
                    type="button"
                    onClick={() => {
                      const text = explanationData.text;
                      handleClose();
                      onOpenAiCoach(`Kannst du mir bitte "${text}" noch genauer im B1-Prüfungskontext erklären?`);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold transition flex items-center gap-1 border border-slate-700"
                  >
                    <span>Ask Full AI Coach →</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
