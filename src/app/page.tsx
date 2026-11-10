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
      <div className="flex flex-col min-h-full justify-between pb-6">
        {/* Top Navigation */}
        <Header showBrand />

        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-8">
          {/* Official Logo */}
          <div className="w-28 h-28 rounded-full overflow-hidden bg-black p-1 shadow-2xl ring-4 ring-primary/20 mb-8 mx-auto animate-fadeIn select-none">
            <img
              src="/logo.png"
              alt="ATTED AI Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Hero Heading */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-light dark:text-text-dark leading-[1.25] mb-3">
            Welcome to{" "}
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              ATTED AI
            </span>
          </h1>

          {/* Clean Subtitle */}
          <p className="text-base text-muted-light dark:text-muted-dark max-w-[320px] leading-relaxed mb-6">
            Your intelligent workspace, crafted for seamless mobile usability.
          </p>
        </div>

        {/* CTA Section: Distinct Login and Sign Up buttons */}
        <div className="w-full space-y-3 pt-4">
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

          <p className="text-center text-[11px] text-muted-light dark:text-muted-dark pt-3">
            Protected by enterprise encryption &bull; ATTED AI v1.0
          </p>
        </div>
      </div>
    </MobileShell>
  );
}
