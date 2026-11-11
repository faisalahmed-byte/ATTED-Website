import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "flat";
}

export function Card({
  className,
  variant = "default",
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    default:
      "bg-white dark:bg-[#1B1B1B] border border-[#E8E8E6] dark:border-[#2A2A2A] shadow-card dark:shadow-card-dark",
    elevated:
      "bg-white dark:bg-[#1B1B1B] border border-[#E8E8E6] dark:border-[#2A2A2A] shadow-card dark:shadow-card-dark",
    flat:
      "bg-white dark:bg-[#1B1B1B] border border-[#E8E8E6] dark:border-[#2A2A2A]",
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-5 sm:p-6 transition-colors duration-150",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
