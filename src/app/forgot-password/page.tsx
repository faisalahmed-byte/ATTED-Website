"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  KeyRound,
} from "lucide-react";
import { MobileShell } from "@/components/layout/MobileShell";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resetUrl, setResetUrl] = useState<string | null>(null);

  const validate = () => {
    if (!email.trim()) {
      setError("Email address is required.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Unable to process password reset.");
        setIsLoading(false);
        return;
      }

      setResetUrl(data.resetUrl);
      setIsLoading(false);
    } catch {
      setError("Unable to connect to server. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <MobileShell containerClassName="max-w-md">
      <div className="flex flex-col min-h-[90vh] justify-between flex-1 w-full mx-auto">
        <Header backHref="/login" />

        <div className="my-auto py-4 sm:py-6 w-full">
          <Card className="py-7 sm:py-9 px-6 sm:px-8 animate-fadeIn border-[#E8E8E6] dark:border-[#2A2A2A] shadow-sm">
            {/* Header */}
            <div className="mb-6 text-left">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#111111] p-0.5 ring-1.5 ring-[#D5AD55]/70 shadow-sm mb-3.5 select-none">
                <img
                  src="/logo.png"
                  alt="ATEDD AI Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#171717] dark:text-[#F7F7F5]">
                Reset Password
              </h1>
              <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A3A3A3] mt-1">
                Enter your registered email address to receive a secure reset link.
              </p>
            </div>

            {/* Success State */}
            {resetUrl ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs">
                  <div className="flex items-center gap-2 font-semibold mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Reset Link Ready</span>
                  </div>
                  <p className="leading-relaxed">
                    A secure password reset token has been generated for <strong>{email}</strong>. It will remain valid for 15 minutes.
                  </p>
                </div>

                <div className="pt-2">
                  <Link href={resetUrl} className="block w-full">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      leftIcon={<KeyRound className="w-4 h-4 mr-1.5" />}
                    >
                      Proceed to Reset Password
                    </Button>
                  </Link>
                </div>

                <div className="pt-4 text-center border-t border-[#E8E8E6] dark:border-[#2A2A2A]">
                  <button
                    type="button"
                    onClick={() => {
                      setResetUrl(null);
                      setEmail("");
                    }}
                    className="text-xs font-semibold text-[#777777] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#F7F7F5] underline"
                  >
                    Reset another account
                  </button>
                </div>
              </div>
            ) : (
              /* Request Form */
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {error && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                    <span>{error}</span>
                  </div>
                )}

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  leftIcon={<Mail className="w-4 h-4" />}
                  autoComplete="email"
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
                    Send Reset Link
                  </Button>
                </div>

                <div className="pt-5 text-center border-t border-[#E8E8E6] dark:border-[#2A2A2A] mt-6">
                  <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A3A3A3]">
                    Remember your password?{" "}
                    <Link
                      href="/login"
                      className="font-semibold text-[#D5AD55] hover:underline inline-flex items-center"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            )}
          </Card>
        </div>

        {/* Reassurance Footer */}
        <div className="py-4 text-center text-xs text-[#777777] dark:text-[#A3A3A3] flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#D5AD55]" />
          <span>Your data is secure &bull; ATEDD AI</span>
        </div>
      </div>
    </MobileShell>
  );
}
