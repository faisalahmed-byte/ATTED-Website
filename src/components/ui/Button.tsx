"use client";

import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      fullWidth = true,
      leftIcon,
      rightIcon,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium rounded-xl select-none transition-colors duration-150 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5AD55] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#111111] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100";

    const variantStyles = {
      primary:
        "bg-[#D5AD55] hover:bg-[#E8CB83] active:bg-[#B8933C] text-[#111111] font-semibold shadow-gold",
      secondary:
        "bg-white dark:bg-[#1B1B1B] text-[#171717] dark:text-[#F7F7F5] border border-[#E8E8E6] dark:border-[#2A2A2A] hover:bg-black/[0.03] dark:hover:bg-white/[0.04] active:bg-black/[0.06] dark:active:bg-white/[0.08] shadow-subtle",
      outline:
        "bg-transparent text-[#D5AD55] border border-[#D5AD55] hover:bg-[#D5AD55]/10 active:bg-[#D5AD55]/15",
      ghost:
        "bg-transparent text-[#777777] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5",
      danger:
        "bg-rose-600 hover:bg-rose-700 text-white shadow-subtle",
    };

    const sizeStyles = {
      sm: "h-9 px-3.5 text-xs gap-1.5",
      md: "min-h-[48px] px-5 text-sm gap-2", // Min 48px touch target
      lg: "min-h-[52px] px-6 text-base gap-2.5",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
            <span>Please wait...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
