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
    <header className="flex items-center justify-between py-3 mb-4 shrink-0 select-none">
      <div className="flex items-center gap-3">
        {backHref ? (
          <Link
            href={backHref}
            className="w-10 h-10 rounded-full border border-border-light dark:border-border-dark bg-white dark:bg-surfaceCard-dark flex items-center justify-center text-text-light dark:text-text-dark hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        ) : showBrand ? (
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-black flex items-center justify-center shadow-md ring-1.5 ring-amber-400/50 shadow-amber-500/10 group-hover:scale-105 transition-transform">
              <img
                src="/logo.png"
                alt="Atedd AI Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-text-light dark:text-text-dark">
              Atedd AI
            </span>
          </Link>
        ) : null}

        {title && (
          <h1 className="text-xl font-bold tracking-tight text-text-light dark:text-text-dark">
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
