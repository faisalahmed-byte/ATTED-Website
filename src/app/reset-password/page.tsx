"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
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

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!token) {
    return (
      <Card className="py-7 sm:py-9 px-6 sm:px-8 animate-fadeIn border-[#E8E8E6] dark:border-[#2A2A2A] shadow-sm text-center">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-[#171717] dark:text-[#F7F7F5] mb-2">
          Invalid or Missing Token
        </h2>
        <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A3A3A3] mb-6">
          This password reset link is invalid or has expired. Please request a new link to reset your password.
        </p>
        <Link href="/forgot-password" className="block w-full">
          <Button variant="primary" size="lg" className="w-full">
            Request New Reset Link
          </Button>
        </Link>
      </Card>
    );
  }

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!password) {
      errs.password = "New password is required.";
    } else if (password.length < 8) {
      errs.password = "Password must be at least 8 characters long.";
    }

    if (!confirmPassword) {
      errs.confirmPassword = "Please confirm your new password.";
    } else if (password !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
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
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setGlobalError(data.error || "Failed to reset password.");
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      setIsLoading(false);
    } catch {
      setGlobalError("Unable to connect to server. Please try again.");
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="py-7 sm:py-9 px-6 sm:px-8 animate-fadeIn border-[#E8E8E6] dark:border-[#2A2A2A] shadow-sm text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4 ring-2 ring-emerald-500/20">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#171717] dark:text-[#F7F7F5] mb-2">
          Password Updated!
        </h2>
        <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A3A3A3] mb-6">
          Your password has been securely reset. You can now sign in with your new credentials.
        </p>
        <Link href="/login?reset=success" className="block w-full">
          <Button variant="primary" size="lg" className="w-full">
            Proceed to Sign In
          </Button>
        </Link>
      </Card>
    );
  }

  return (
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
          Set New Password
        </h1>
        <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A3A3A3] mt-1">
          Create a strong, new password for your account.
        </p>
      </div>

      {/* Global Error */}
      {globalError && (
        <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2 animate-fadeIn">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
          <span>{globalError}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          label="New Password"
          type="password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors({ ...errors, password: "" });
          }}
          error={errors.password}
          leftIcon={<Lock className="w-4 h-4" />}
          autoComplete="new-password"
          required
        />

        <Input
          label="Confirm New Password"
          type="password"
          placeholder="Re-enter your new password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" });
          }}
          error={errors.confirmPassword}
          leftIcon={<KeyRound className="w-4 h-4" />}
          autoComplete="new-password"
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
            Update Password
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <MobileShell containerClassName="max-w-md">
      <div className="flex flex-col min-h-[90vh] justify-between flex-1 w-full mx-auto">
        <Header backHref="/login" />

        <div className="my-auto py-4 sm:py-6 w-full">
          <Suspense fallback={<div className="h-96 w-full animate-pulse rounded-2xl bg-black/5 dark:bg-white/5" />}>
            <ResetPasswordForm />
          </Suspense>
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
