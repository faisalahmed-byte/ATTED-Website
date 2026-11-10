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
      <div className="flex flex-col min-h-full">
        {/* Top Navigation */}
        <Header showBrand />

        {/* Hero & CTA Unified Container (properly balanced spacing for mobile) */}
        <div className="flex-1 flex flex-col justify-center items-center text-center py-6 px-1 max-w-sm mx-auto w-full my-auto">
          {/* Official Logo with delicate gold accent */}
          <div className="relative mb-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-black p-1 shadow-2xl ring-2 ring-amber-400/50 shadow-amber-500/10 mx-auto animate-fadeIn select-none">
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
          <h1 className="text-2xl min-[360px]:text-3xl font-extrabold tracking-tight text-text-light dark:text-text-dark leading-[1.25] mb-2.5">
            Welcome to{" "}
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              Atedd AI
            </span>
          </h1>

          {/* Clean Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-[280px] sm:max-w-[320px] leading-relaxed mb-5">
            Your intelligent workspace, crafted for seamless mobile usability.
          </p>

          {/* Subtle gold hairline accent divider */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mb-6" />

          {/* Action Buttons */}
          <div className="w-full space-y-3">
            <Link href="/signup" className="block w-full">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />}
              >
                Sign Up
              </Button>
            </Link>

            <Link href="/login" className="block w-full">
              <Button variant="secondary" size="lg">
                Login
              </Button>
            </Link>
          </div>

          {/* Reassurance Footer Text */}
          <p className="text-center text-xs text-slate-500 dark:text-slate-400 pt-4 font-medium">
            Your data is secure &bull; Atedd AI v1.0
          </p>
        </div>
      </div>
    </MobileShell>
  );
}
