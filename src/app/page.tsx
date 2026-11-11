"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { MobileShell } from "@/components/layout/MobileShell";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <MobileShell containerClassName="max-w-4xl">
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

        {/* Visually Balanced Hero Section */}
        <div className="flex-1 flex flex-col justify-center items-center text-center py-10 sm:py-16 my-auto animate-fadeIn w-full max-w-xl mx-auto">
          {/* Prominent ATEDD AI Logo */}
          <div className="relative mb-6 sm:mb-8">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-[#111111] p-1 ring-2 ring-[#D5AD55]/70 shadow-lg mx-auto select-none">
              <img
                src="/logo.png"
                alt="ATEDD AI Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Strong Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#171717] dark:text-[#F7F7F5] leading-tight mb-4">
            Welcome to{" "}
            <span className="text-[#D5AD55]">
              ATEDD AI
            </span>
          </h1>

          {/* Concise Supporting Text */}
          <p className="text-sm sm:text-base md:text-lg text-[#777777] dark:text-[#A3A3A3] max-w-md leading-relaxed mb-8 sm:mb-10">
            Empowering your workflow with intelligent clarity, speed, and seamless precision.
          </p>

          {/* Clearly Differentiated Buttons */}
          <div className="w-full max-w-xs sm:max-w-sm flex flex-col sm:flex-row gap-3 justify-center">
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
        </div>

        {/* Reassurance Footer */}
        <div className="pt-6 pb-3 border-t border-[#E8E8E6]/60 dark:border-[#2A2A2A]/60 flex flex-col sm:flex-row items-center justify-between text-xs text-[#777777] dark:text-[#A3A3A3] gap-2">
          <span>&copy; 2026 ATEDD AI. All rights reserved.</span>
          <span className="flex items-center gap-1.5 text-[#171717] dark:text-[#F7F7F5]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#D5AD55]" />
            Your data is secure
          </span>
        </div>
      </div>
    </MobileShell>
  );
}