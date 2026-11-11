"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MobileShell } from "@/components/layout/MobileShell";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <MobileShell>
      <div className="flex flex-col min-h-full justify-between flex-1">
        {/* Top Navigation */}
        <Header showBrand />

        {/* Hero & CTA Unified Container */}
        <div className="flex-1 flex flex-col justify-center items-center text-center py-6 sm:py-12 md:py-16 px-1 max-w-xl mx-auto w-full my-auto animate-fadeIn">
          {/* Official Logo with delicate gold accent */}
          <div className="relative mb-6 sm:mb-8">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-black p-1 shadow-2xl ring-2 ring-amber-400/50 shadow-amber-500/10 mx-auto select-none transition-transform hover:scale-105 duration-300">
              <img
                src="/logo.png"
                alt="Atedd AI Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            {/* Subtle warm gold ambient aura */}
            <div className="absolute inset-0 rounded-full -z-10 blur-xl bg-amber-400/15" />
          </div>

          {/* Hero Heading */}
          <h1 className="text-2xl min-[360px]:text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-light dark:text-text-dark leading-[1.2] mb-3">
            Welcome to{" "}
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              Atedd AI
            </span>
          </h1>

          {/* Clean Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-[290px] sm:max-w-md md:max-w-lg leading-relaxed mb-6">
            Your intelligent workspace, crafted for seamless usability across both mobile and desktop.
          </p>

          {/* Subtle gold hairline accent divider */}
          <div className="w-16 sm:w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mb-6 sm:mb-8" />

          {/* Action Buttons: Vertical stack on mobile, horizontal row on laptop */}
          <div className="w-full max-w-sm sm:max-w-md flex flex-col sm:flex-row gap-3">
            <Link href="/signup" className="flex-1">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                rightIcon={<ArrowRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />}
              >
                Sign Up
              </Button>
            </Link>

            <Link href="/login" className="flex-1">
              <Button variant="secondary" size="lg" className="w-full">
                Login
              </Button>
            </Link>
          </div>

          {/* Reassurance Footer Text */}
          <p className="text-center text-xs text-slate-500 dark:text-slate-400 pt-5 font-medium">
            Your data is secure &bull; Atedd AI v1.0
          </p>
        </div>
      </div>
    </MobileShell>
  );
}
