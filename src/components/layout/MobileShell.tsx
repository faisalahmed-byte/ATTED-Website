"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MobileShellProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function MobileShell({
  children,
  className,
  containerClassName,
}: MobileShellProps) {
  return (
    <div className="min-h-screen w-full bg-[#F7F7F5] dark:bg-[#111111] text-[#171717] dark:text-[#F7F7F5] antialiased flex flex-col transition-colors duration-150 overflow-x-hidden">
      <main
        className={cn(
          "w-full flex-1 flex flex-col mx-auto",
          className
        )}
      >
        <div
          className={cn(
            "w-full flex-1 flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-6 max-w-6xl mx-auto",
            containerClassName
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
