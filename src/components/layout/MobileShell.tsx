"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MobileShellProps {
  children: React.ReactNode;
  className?: string;
  hideHeaderOrnament?: boolean;
}

export function MobileShell({
  children,
  className,
  hideHeaderOrnament = false,
}: MobileShellProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 dark:bg-[#070A11] antialiased text-text-light dark:text-text-dark sm:py-6 selection:bg-primary/20 selection:text-primary">
      {/* Mobile container - strictly max 440px on desktop, 100% on mobile */}
      <main
        className={cn(
          "w-full max-w-[440px] min-h-[100dvh] sm:min-h-[844px] sm:max-h-[920px] bg-background-light dark:bg-background-dark sm:rounded-[36px] sm:border sm:border-slate-200/80 dark:sm:border-slate-800 sm:shadow-[0_20px_50px_rgba(15,23,42,0.15)] dark:sm:shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col relative overflow-hidden",
          className
        )}
      >
        {/* Subtle top phone speaker / Dynamic Island ornament on desktop */}
        {!hideHeaderOrnament && (
          <div className="hidden sm:flex justify-center pt-2.5 pb-1 select-none pointer-events-none z-20">
            <div className="w-24 h-4 bg-slate-300 dark:bg-slate-800 rounded-full flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-700 mr-2" />
              <div className="w-8 h-1 rounded-full bg-slate-400 dark:bg-slate-700" />
            </div>
          </div>
        )}

        {/* Scrollable app content with safe-area padding for mobile notches */}
        <div className="flex-1 flex flex-col overflow-y-auto px-5 pt-[max(env(safe-area-inset-top),16px)] pb-[max(env(safe-area-inset-bottom),24px)] sm:px-6">
          {children}
        </div>
      </main>
    </div>
  );
}

