"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  Phone,
  Database,
  Smartphone,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!name.trim()) {
      errs.name = "Full name is required";
    } else if (name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters";
    }

    if (!email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address";
    }

    if (phone && phone.trim().length > 25) {
      errs.phone = "Phone number is too long";
    }

    if (!password) {
      errs.password = "Password is required";
    } else if (password.length < 8) {
      errs.password = "Password must be at least 8 characters long";
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
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setGlobalError(data.error || "Failed to create account.");
        setIsLoading(false);
        return;
      }

      // Automatically sign in upon registration
      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      if (loginRes.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        router.push("/login?registered=true");
      }
    } catch {
      setGlobalError("Unable to connect to server. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background-light dark:bg-background-dark flex flex-col justify-center items-center p-4 sm:p-6 lg:p-10 transition-colors duration-200">
      {/* Main Container - Full-featured split screen on laptop, fluid single-column on phone */}
      <div className="w-full max-w-5xl bg-transparent lg:bg-white lg:dark:bg-surfaceCard-dark lg:rounded-3xl lg:shadow-2xl lg:border lg:border-border-light lg:dark:border-border-dark overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px] animate-fadeIn">
        {/* Left Side: Desktop Branding Hero (Laptop only) */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white p-10 lg:p-12 flex-col justify-between relative overflow-hidden">
          {/* Subtle gold glow in background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl -z-1" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-1" />

          {/* Top Brand */}
          <div className="flex items-center gap-3 select-none">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-black p-0.5 shadow-md ring-2 ring-amber-400/60 shadow-amber-500/20">
              <img
                src="/logo.png"
                alt="Atedd AI Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              Atedd AI
            </span>
          </div>

          {/* Middle Presentation */}
          <div className="my-auto py-8 space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight leading-snug">
              Start your intelligent journey with Atedd AI.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Create your account in seconds and manage your custom profile with full PostgreSQL persistence.
            </p>

            {/* Feature highlights */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-3 text-xs text-slate-200 bg-white/5 p-3 rounded-xl border border-white/10 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant Registration &amp; Automatic Login</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-200 bg-white/5 p-3 rounded-xl border border-white/10 backdrop-blur-sm">
                <Database className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Full PostgreSQL Database Integration</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-200 bg-white/5 p-3 rounded-xl border border-white/10 backdrop-blur-sm">
                <Smartphone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Adaptive Layout for Phone &amp; Laptop</span>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="text-xs text-slate-400">
            Your data is secure &bull; Atedd AI v1.0
          </div>
        </div>

        {/* Right Side: Form Container (Both Laptop & Phone) */}
        <div className="col-span-1 lg:col-span-7 p-4 sm:p-8 lg:p-12 flex flex-col justify-between max-w-md mx-auto lg:max-w-none w-full">
          {/* Top Navigation */}
          <div className="flex items-center justify-between pb-6 select-none">
            <Link
              href="/"
              className="inline-flex items-center text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-indigo-300 transition-colors gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <ThemeToggle />
          </div>

          {/* Form Content */}
          <div className="my-auto py-2">
            {/* Header Text */}
            <div className="mb-6 text-left">
              <div className="lg:hidden w-12 h-12 rounded-full overflow-hidden bg-black p-0.5 shadow-md ring-2 ring-amber-400/50 shadow-amber-500/10 mb-3 select-none">
                <img
                  src="/logo.png"
                  alt="Atedd AI Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-light dark:text-text-dark">
                Join Atedd AI
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-300 mt-1.5">
                Enter your details to create your intelligent workspace.
              </p>
            </div>

            {/* Error Banner */}
            {globalError && (
              <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300 text-sm flex items-start gap-2.5 animate-fadeIn">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
                <span>{globalError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Phone in 2-column grid on desktop/tablet, single-column on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  error={errors.name}
                  leftIcon={<User className="w-5 h-5" />}
                  autoComplete="name"
                  required
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors({ ...errors, phone: "" });
                  }}
                  error={errors.phone}
                  hint="Optional - e.g. +91 98765 43210"
                  leftIcon={<Phone className="w-5 h-5" />}
                  autoComplete="tel"
                />
              </div>

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
                leftIcon={<Mail className="w-5 h-5" />}
                autoComplete="email"
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: "" });
                }}
                error={errors.password}
                leftIcon={<Lock className="w-5 h-5" />}
                autoComplete="new-password"
                required
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  isLoading={isLoading}
                  rightIcon={<ArrowRight className="w-5 h-5 ml-1" />}
                >
                  Create Account
                </Button>
              </div>
            </form>
          </div>

          {/* Footer Switch Link */}
          <div className="pt-6 text-center border-t border-border-light dark:border-border-dark mt-6">
            <p className="text-sm text-slate-500 dark:text-slate-300">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-primary dark:text-indigo-300 hover:text-indigo-600 dark:hover:text-indigo-200 hover:underline inline-flex items-center"
              >
                Sign In
              </Link>
            </p>
            <p className="lg:hidden text-[11px] text-slate-400 dark:text-slate-400 pt-3">
              Your data is secure &bull; Atedd AI v1.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
