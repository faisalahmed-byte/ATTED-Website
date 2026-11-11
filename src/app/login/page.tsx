"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  Database,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
} from "lucide-react";
import { MobileShell } from "@/components/layout/MobileShell";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address";
    }

    if (!password) {
      errs.password = "Password is required";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);

    if (!validate()) return;

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setGlobalError(data.error || "Invalid email or password.");
        setIsLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setGlobalError("Unable to connect to server. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <MobileShell containerClassName="max-w-5xl">
      <div className="flex flex-col min-h-[90vh] justify-between flex-1 w-full mx-auto">
        <Header backHref="/" />

        {/* Main Content: Split grid on laptop (lg:), single column on mobile */}
        <div className="my-auto py-4 sm:py-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Laptop Left Feature Panel (Hidden on Mobile) */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-between p-8 xl:p-10 rounded-3xl bg-[#111111] text-[#F7F7F5] border border-[#2A2A2A] shadow-xl relative overflow-hidden min-h-[500px]">
            {/* Background subtle gold glow accent */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#D5AD55]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Gold Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D5AD55]/15 border border-[#D5AD55]/30 text-xs font-semibold text-[#D5AD55] tracking-wider uppercase mb-6 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D5AD55]" />
                Intelligent Workspace
              </div>

              {/* Large Laptop Headline */}
              <h2 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-tight mb-4">
                High-performance clarity for modern teams.
              </h2>
              <p className="text-sm xl:text-base text-[#A3A3A3] leading-relaxed mb-8">
                Welcome back to ATTED AI. Connect to your real-time PostgreSQL workspace with enterprise-grade session security and minimalist precision.
              </p>

              {/* Highlights List */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D5AD55] shrink-0 mt-0.5">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">PostgreSQL Data Sync</h3>
                    <p className="text-xs text-[#A3A3A3] mt-0.5">
                      Direct cloud database persistence on Neon AWS with zero mock data.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D5AD55] shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Bank-Grade Session Security</h3>
                    <p className="text-xs text-[#A3A3A3] mt-0.5">
                      Salted bcrypt password hashing and encrypted HTTP-only session tokens.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D5AD55] shrink-0 mt-0.5">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Adaptive Across All Screens</h3>
                    <p className="text-xs text-[#A3A3A3] mt-0.5">
                      Engineered for high-res desktop monitors and mobile touchscreens alike.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="pt-8 border-t border-white/10 flex items-center justify-between text-xs text-[#777777]">
              <span>ATTED AI &bull; Version 1.0</span>
              <span className="flex items-center gap-1 text-[#D5AD55]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Your data is secure
              </span>
            </div>
          </div>

          {/* Right Column: Sign In Form Card (Full width on mobile, col-span-6 on laptop) */}
          <div className="w-full lg:col-span-6 max-w-md mx-auto">
            <Card className="py-7 sm:py-9 px-6 sm:px-8 animate-fadeIn border-[#E8E8E6] dark:border-[#2A2A2A] shadow-sm">
              {/* Header */}
              <div className="mb-6 text-left">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#111111] p-0.5 ring-1.5 ring-[#D5AD55]/70 shadow-sm mb-3 select-none">
                  <img
                    src="/logo.png"
                    alt="ATTED AI Logo"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#171717] dark:text-[#F7F7F5]">
                  Sign In to ATTED AI
                </h1>
                <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A3A3A3] mt-1">
                  Enter your credentials to access your dashboard.
                </p>
              </div>

              {/* Error Alert */}
              {globalError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                  <span>{globalError}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  error={errors.email}
                  leftIcon={<Mail className="w-4 h-4" />}
                  autoComplete="email"
                  required
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: "" });
                  }}
                  error={errors.password}
                  leftIcon={<Lock className="w-4 h-4" />}
                  autoComplete="current-password"
                  required
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isLoading}
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                  >
                    Sign In
                  </Button>
                </div>
              </form>

              {/* Switch to Signup */}
              <div className="pt-5 text-center border-t border-[#E8E8E6] dark:border-[#2A2A2A] mt-6">
                <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A3A3A3]">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-semibold text-[#D5AD55] hover:underline inline-flex items-center"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </Card>

            {/* Reassurance Footer */}
            <p className="text-center text-xs text-[#777777] dark:text-[#A3A3A3] py-4">
              Your data is secure &bull; ATTED AI v1.0
            </p>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}