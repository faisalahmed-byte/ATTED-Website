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
      "relative inline-flex items-center justify-center font-semibold rounded-2xl select-none transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none disabled:active:scale-100";

    const variantStyles = {
      primary:
        "bg-brand-gradient text-white shadow-brand-glow hover:shadow-brand-glow-lg hover:brightness-105 active:brightness-95",
      secondary:
        "bg-white dark:bg-surfaceCard-dark text-text-light dark:text-text-dark border border-border-light dark:border-border-dark shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800",
      outline:
        "bg-transparent text-primary dark:text-indigo-400 border-2 border-primary/40 dark:border-indigo-500/40 hover:bg-primary/5 active:bg-primary/10",
      ghost:
        "bg-transparent text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark hover:bg-slate-100 dark:hover:bg-slate-800",
      danger:
        "bg-rose-500 text-white hover:bg-rose-600 shadow-sm shadow-rose-500/30",
    };

    const sizeStyles = {
      sm: "h-10 px-4 text-sm gap-2",
      md: "min-h-[48px] px-5 text-base gap-2.5", // Min 48px tap target
      lg: "min-h-[54px] px-6 text-lg gap-3",
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
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

