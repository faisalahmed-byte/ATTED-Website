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
  CheckCircle2,
} from "lucide-react";
import { MobileShell } from "@/components/layout/MobileShell";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
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
    <MobileShell containerClassName="max-w-md">
      <div className="flex flex-col min-h-[90vh] justify-between flex-1 w-full mx-auto">
        <Header backHref="/" />

        {/* Premium Centered Create Account Card */}
        <div className="my-auto py-4 sm:py-6 w-full">
          <Card className="py-7 sm:py-9 px-6 sm:px-8 animate-fadeIn border-[#E8E8E6] dark:border-[#2A2A2A] shadow-sm">
            {/* Header */}
            <div className="mb-6 text-left">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#111111] p-0.5 ring-1.5 ring-[#D5AD55]/70 shadow-sm mb-3.5 select-none">
                <img
                  src="/logo.png"
                  alt="ATTED AI Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#171717] dark:text-[#F7F7F5]">
                Create Account
              </h1>
              <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A3A3A3] mt-1">
                Enter your details to create your intelligent workspace.
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
            <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
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
                leftIcon={<User className="w-4 h-4" />}
                autoComplete="name"
                required
              />

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
                label="Phone Number"
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors({ ...errors, phone: "" });
                }}
                error={errors.phone}
                hint="Optional (e.g. +91 98765 43210)"
                leftIcon={<Phone className="w-4 h-4" />}
                autoComplete="tel"
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
                leftIcon={<Lock className="w-4 h-4" />}
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
                  Create Account
                </Button>
              </div>
            </form>

            {/* Switch to Login */}
            <div className="pt-5 text-center border-t border-[#E8E8E6] dark:border-[#2A2A2A] mt-5">
              <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A3A3A3]">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-[#D5AD55] hover:underline inline-flex items-center"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </Card>
        </div>

        {/* Reassurance Footer */}
        <div className="py-4 text-center text-xs text-[#777777] dark:text-[#A3A3A3] flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#D5AD55]" />
          <span>Your data is secure &bull; ATTED AI</span>
        </div>
      </div>
    </MobileShell>
  );
}