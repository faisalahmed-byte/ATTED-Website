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
}: MobileShellProps) {
  return (
    <div className="min-h-screen w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark antialiased selection:bg-primary/20 selection:text-primary flex flex-col transition-colors duration-200">
      {/* Responsive layout container - adapts seamlessly from phone (390px-440px) to laptop/desktop */}
      <main
        className={cn(
          "w-full flex-1 flex flex-col mx-auto",
          className
        )}
      >
        <div className="w-full flex-1 flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8 max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
