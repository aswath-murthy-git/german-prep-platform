"use client";

import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioVoiceButtonProps {
  text: string;
  lang?: string;
  rate?: number;
  label?: string;
  className?: string;
}

export const AudioVoiceButton: React.FC<AudioVoiceButtonProps> = ({
  text,
  lang = "de-DE",
  rate = 0.88,
  label = "Aussprache hören",
  className = ""
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Sprachausgabe wird von Ihrem Browser nicht unterstützt.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean brackets, labels, or template markers before speaking
    const cleanText = text
      .replace(/\[BLANK_\d+\]/g, "")
      .replace(/\[.*?\]/g, "")
      .replace(/Prüfer-Frage:/g, "")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang;
    utterance.rate = rate;

    // Pick a German voice if available
    const voices = window.speechSynthesis.getVoices();
    const deVoice = voices.find(v => v.lang.startsWith("de") || v.lang.includes("DE"));
    if (deVoice) {
      utterance.voice = deVoice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={handleSpeak}
      type="button"
      title={label}
      aria-label={label}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-200 border ${
        isPlaying
          ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/20"
          : "bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border-slate-700 hover:border-amber-500/30"
      } ${className}`}
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Stoppen</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-amber-400" />
          {label && <span>{label}</span>}
        </>
      )}
    </button>
  );
};
