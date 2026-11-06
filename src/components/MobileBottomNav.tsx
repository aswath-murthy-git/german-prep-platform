"use client";

import React from "react";
import { 
  LayoutDashboard, 
  Target, 
  GraduationCap, 
  Mic, 
  Building2, 
  User,
  BookOpen,
  Compass,
  Rocket
} from "lucide-react";
import { NavSectionType } from "./Navbar";
import { useUser } from "@/context/UserContext";

interface MobileBottomNavProps {
  activeSection: NavSectionType;
  onSelectSection: (section: NavSectionType) => void;
  onOpenProfile: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeSection,
  onSelectSection,
  onOpenProfile
}) => {
  const { theme } = useUser();
  const isDark = theme === "dark";

  const items = [
    { 
      id: "DASHBOARD" as const, 
      label: "Home", 
      icon: LayoutDashboard,
      isActive: activeSection === "DASHBOARD"
    },
    { 
      id: "ZERO_TO_B1" as const, 
      label: "A0->B1", 
      icon: Rocket,
      isActive: activeSection === "ZERO_TO_B1" || activeSection === "PATHWAY"
    },
    { 
      id: "FAST_TRACK" as const, 
      label: "30-Day", 
      icon: Compass,
      isActive: activeSection === "FAST_TRACK"
    },
    { 
      id: "EXAM" as const, 
      label: "Exam", 
      icon: Target,
      isActive: ["EXAM", "STRATEGY"].includes(activeSection)
    },
    { 
      id: "PRACTICE" as const, 
      label: "Practice", 
      icon: BookOpen,
      isActive: ["PRACTICE", "READING", "LISTENING", "WRITING", "GRAMMAR"].includes(activeSection)
    },
    { 
      id: "LEARN" as const, 
      label: "Learn", 
      icon: GraduationCap,
      isActive: ["LEARN", "ACADEMY", "CASES", "CONJUNCTIONS", "KEYWORDS"].includes(activeSection)
    },
    { 
      id: "SPEAKING" as const, 
      label: "Speaking", 
      icon: Mic,
      isActive: activeSection === "SPEAKING"
    },
    { 
      id: "CITIZENSHIP" as const, 
      label: "Citizenship", 
      icon: Building2,
      isActive: activeSection === "CITIZENSHIP"
    },
  ];

  return (
    <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl border-t px-2 py-1 shadow-2xl transition-colors duration-200 ${
      isDark ? "bg-slate-950/95 border-slate-800 text-slate-200" : "bg-white/95 border-slate-200 text-slate-700"
    }`}>
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.isActive;
          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition min-w-[50px] min-h-[46px] ${
                isActive
                  ? "text-purple-500 font-extrabold"
                  : isDark
                  ? "text-slate-400 hover:text-slate-200"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 mb-0.5 ${isActive ? "text-purple-500 scale-110" : ""}`} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-0.5" />
              )}
            </button>
          );
        })}

        {/* Profile Trigger */}
        <button
          onClick={onOpenProfile}
          className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl min-w-[50px] min-h-[46px] ${
            isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <User className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Account</span>
        </button>
      </div>
    </div>
  );
};
