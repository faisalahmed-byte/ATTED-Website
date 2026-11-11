"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Database, ShieldCheck, Smartphone, Sparkles, CheckCircle2 } from "lucide-react";
import { MobileShell } from "@/components/layout/MobileShell";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function HomePage() {
  return (
    <MobileShell containerClassName="max-w-5xl">
      <div className="flex flex-col min-h-[90vh] justify-between flex-1 w-full">
        {/* Top Navigation */}
        <Header
          showBrand
          rightAction={
            <div className="hidden sm:flex items-center gap-2 mr-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          }
        />

        {/* Hero Section */}
        <div className="flex-1 flex flex-col justify-center items-center text-center py-8 sm:py-12 my-auto animate-fadeIn w-full max-w-3xl mx-auto">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D5AD55]/15 border border-[#D5AD55]/30 text-xs font-semibold text-[#D5AD55] tracking-wider uppercase mb-6 select-none">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Intelligent Workspace</span>
          </div>

          {/* Prominent ATTED AI Logo */}
          <div className="relative mb-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-[#111111] p-1 ring-2 ring-[#D5AD55]/70 shadow-lg mx-auto select-none">
              <img
                src="/logo.png"
                alt="ATTED AI Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Strong Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#171717] dark:text-[#F7F7F5] leading-tight mb-4">
            Welcome to{" "}
            <span className="text-[#D5AD55]">
              ATTED AI
            </span>
          </h1>

          {/* Concise Supporting Text */}
          <p className="text-sm sm:text-base md:text-lg text-[#777777] dark:text-[#A3A3A3] max-w-xl leading-relaxed mb-8">
            Your intelligent workspace, crafted with premium precision, built with a minimalist black & gold aesthetic, and backed by PostgreSQL.
          </p>

          {/* Clearly Differentiated Buttons */}
          <div className="w-full max-w-sm flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="/signup" className="flex-1">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />}
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

          {/* Features Showcase Grid (Responsive: 1 col on mobile, 3 cols on desktop) */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-4">
            <Card className="p-4 sm:p-5 border-[#E8E8E6] dark:border-[#2A2A2A] hover:border-[#D5AD55]/40 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-[#D5AD55] mb-3">
                <Database className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#171717] dark:text-[#F7F7F5] mb-1">
                PostgreSQL Core
              </h3>
              <p className="text-xs text-[#777777] dark:text-[#A3A3A3] leading-relaxed">
                Direct cloud database persistence on AWS Neon PostgreSQL with real-time updates.
              </p>
            </Card>

            <Card className="p-4 sm:p-5 border-[#E8E8E6] dark:border-[#2A2A2A] hover:border-[#D5AD55]/40 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-[#D5AD55] mb-3">
                <Smartphone className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#171717] dark:text-[#F7F7F5] mb-1">
                Laptop & Phone Ready
              </h3>
              <p className="text-xs text-[#777777] dark:text-[#A3A3A3] leading-relaxed">
                Optimized layouts that adapt gracefully to wide desktop displays and mobile phones.
              </p>
            </Card>

            <Card className="p-4 sm:p-5 border-[#E8E8E6] dark:border-[#2A2A2A] hover:border-[#D5AD55]/40 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-[#D5AD55] mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#171717] dark:text-[#F7F7F5] mb-1">
                Robust Security
              </h3>
              <p className="text-xs text-[#777777] dark:text-[#A3A3A3] leading-relaxed">
                Cryptographic bcrypt password hashing and secure HTTP-only session tokens.
              </p>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 pb-2 border-t border-[#E8E8E6]/60 dark:border-[#2A2A2A]/60 flex flex-col sm:flex-row items-center justify-between text-xs text-[#777777] dark:text-[#A3A3A3] gap-2">
          <span>&copy; 2026 ATTED AI. All rights reserved.</span>
          <span className="flex items-center gap-1.5 text-[#171717] dark:text-[#F7F7F5]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#D5AD55]" />
            Your data is secure
          </span>
        </div>
      </div>
    </MobileShell>
  );
}