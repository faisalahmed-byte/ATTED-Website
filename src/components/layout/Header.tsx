"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface HeaderProps {
  title?: string;
  backHref?: string;
  showBrand?: boolean;
  rightAction?: React.ReactNode;
}

export function Header({
  title,
  backHref,
  showBrand = false,
  rightAction,
}: HeaderProps) {
  return (
    <header className="w-full flex items-center justify-between py-3 mb-4 sm:mb-6 shrink-0 select-none border-b border-[#E8E8E6]/60 dark:border-[#2A2A2A]/60">
      <div className="flex items-center gap-3">
        {backHref ? (
          <Link
            href={backHref}
            className="w-9 h-9 rounded-xl border border-[#E8E8E6] dark:border-[#2A2A2A] bg-white dark:bg-[#1B1B1B] flex items-center justify-center text-[#171717] dark:text-[#F7F7F5] hover:border-[#D5AD55]/50 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
        ) : showBrand ? (
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-[#111111] flex items-center justify-center ring-1.5 ring-[#D5AD55]/60 group-hover:scale-105 transition-transform">
              <img
                src="/logo.png"
                alt="ATEDD AI Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-extrabold text-base tracking-wider text-[#171717] dark:text-[#F7F7F5] uppercase">
              ATEDD AI
            </span>
          </Link>
        ) : null}

        {title && (
          <h1 className="text-lg font-bold tracking-tight text-[#171717] dark:text-[#F7F7F5]">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        {rightAction}
        <ThemeToggle />
      </div>
    </header>
  );
}
