"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { MobileShell } from "@/components/layout/MobileShell";
import { Header } from "@/components/layout/Header";
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

      // Success -> Redirect to profile dashboard
      router.push("/dashboard");
      router.refresh();
    } catch {
      setGlobalError("Unable to connect to server. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <MobileShell>
      <div className="flex flex-col min-h-full justify-between pb-6">
        <Header backHref="/" />

        <div className="flex-1 flex flex-col justify-center py-2 animate-fadeIn">
          {/* Welcome Text */}
          <div className="mb-6 text-left">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-black p-0.5 shadow-md ring-2 ring-amber-400/50 shadow-amber-500/10 mb-3 select-none">
              <img
                src="/logo.png"
                alt="Atedd AI Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-text-light dark:text-text-dark">
              Sign In to Atedd AI
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">
              Enter your credentials to access your dashboard.
            </p>
          </div>

          {/* Global Error Alert */}
          {globalError && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300 text-sm flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
              <span>{globalError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="faisal@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              error={errors.email}
              leftIcon={<Mail className="w-5 h-5" />}
              autoComplete="email"
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: "" });
              }}
              error={errors.password}
              leftIcon={<Lock className="w-5 h-5" />}
              autoComplete="current-password"
              required
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-5 h-5 ml-1" />}
              >
                Sign In
              </Button>
            </div>
          </form>
        </div>

        {/* Footer Link */}
        <div className="pt-4 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-300">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-primary dark:text-indigo-300 hover:text-indigo-600 dark:hover:text-indigo-200 hover:underline inline-flex items-center"
            >
              Sign Up
            </Link>
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-400 pt-3">
            Your data is secure &bull; Atedd AI v1.0
          </p>
        </div>
      </div>
    </MobileShell>
  );
}
