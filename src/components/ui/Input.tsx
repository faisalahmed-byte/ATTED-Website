"use client";

import React, { InputHTMLAttributes, forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, hint, leftIcon, rightIcon, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-text-light dark:text-text-dark tracking-tight"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-muted-light dark:text-muted-dark">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            className={cn(
              // 16px (text-base) is critical for preventing iOS auto-zoom on input focus
              "w-full min-h-[50px] text-base px-4 rounded-2xl bg-white dark:bg-surfaceCard-dark text-text-light dark:text-text-dark border transition-all duration-200 placeholder:text-muted-light/60 dark:placeholder:text-muted-dark/50",
              "border-border-light dark:border-border-dark",
              "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary dark:focus:border-indigo-500",
              leftIcon && "pl-11",
              isPassword && "pr-11",
              error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-400",
              className
            )}
            {...props}
          />
          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 p-1 text-muted-light hover:text-text-light dark:text-muted-dark dark:hover:text-text-dark focus:outline-none transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          ) : rightIcon ? (
            <div className="absolute right-3.5 flex items-center">
              {rightIcon}
            </div>
          ) : null}
        </div>
        {error ? (
          <p className="text-xs font-medium text-rose-500 dark:text-rose-400 animate-fadeIn pl-1">
            {error}
          </p>
        ) : hint ? (
          <p className="text-xs text-muted-light dark:text-muted-dark pl-1">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

