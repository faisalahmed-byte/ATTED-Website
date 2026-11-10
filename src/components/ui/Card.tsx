import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "glass" | "gradient";
}

export function Card({
  className,
  variant = "default",
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    default:
      "bg-white dark:bg-surfaceCard-dark border border-border-light dark:border-border-dark shadow-card dark:shadow-card-dark",
    elevated:
      "bg-white dark:bg-surfaceCard-dark border border-border-light/80 dark:border-border-dark shadow-xl dark:shadow-2xl",
    glass:
      "bg-white/80 dark:bg-surfaceCard-dark/80 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-card",
    gradient:
      "bg-brand-subtle dark:bg-indigo-950/20 border border-primary/20 dark:border-indigo-500/20 shadow-card",
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-200",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

