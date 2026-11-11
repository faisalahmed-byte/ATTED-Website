"use client";

import React, { InputHTMLAttributes, forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelRight?: React.ReactNode;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      labelRight,
      error,
      hint,
      leftIcon,
      rightIcon,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;
    const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {(label || labelRight) && (
          <div className="flex items-center justify-between">
            {label && (
              <label
                htmlFor={inputId}
                className="block text-xs font-semibold uppercase tracking-wider text-[#171717] dark:text-[#F7F7F5]"
              >
                {label}
              </label>
            )}
            {labelRight}
          </div>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#777777] dark:text-[#A3A3A3]">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={inputType}
            disabled={disabled}
            className={cn(
              "w-full min-h-[48px] text-base px-3.5 rounded-xl transition-colors duration-150",
              "bg-white dark:bg-[#1B1B1B] text-[#171717] dark:text-[#F7F7F5]",
              "border border-[#E8E8E6] dark:border-[#2A2A2A]",
              "placeholder:text-[#777777]/60 dark:placeholder:text-[#777777]",
              "focus:outline-none focus:border-[#D5AD55] focus:ring-2 focus:ring-[#D5AD55]/30",
              disabled && "opacity-60 cursor-not-allowed bg-black/5 dark:bg-white/5",
              leftIcon && "pl-11",
              (isPassword || rightIcon) && "pr-11",
              error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20",
              className
            )}
            {...props}
          />

          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 p-1 text-[#777777] hover:text-[#171717] dark:hover:text-[#F7F7F5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D5AD55] rounded-lg transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          ) : rightIcon ? (
            <div className="absolute right-3.5 flex items-center text-[#777777] dark:text-[#A3A3A3]">
              {rightIcon}
            </div>
          ) : null}
        </div>

        {error ? (
          <p className="text-xs font-medium text-rose-600 dark:text-rose-400 animate-fadeIn pl-0.5">
            {error}
          </p>
        ) : hint ? (
          <p className="text-xs text-[#777777] dark:text-[#A3A3A3] pl-0.5">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
