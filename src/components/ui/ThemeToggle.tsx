"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-xl border border-[#E8E8E6] dark:border-[#2A2A2A] flex items-center justify-center opacity-0" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`w-9 h-9 rounded-xl border border-[#E8E8E6] dark:border-[#2A2A2A] bg-white dark:bg-[#1B1B1B] text-[#777777] dark:text-[#A3A3A3] hover:text-[#D5AD55] dark:hover:text-[#D5AD55] hover:border-[#D5AD55]/40 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5AD55] ${className || ""}`}
      aria-label="Toggle theme"
      title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4 text-[#D5AD55]" />
      )}
    </button>
  );
}
