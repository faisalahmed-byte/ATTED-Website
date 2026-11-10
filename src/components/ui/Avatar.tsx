import React from "react";
import { getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";

export interface AvatarProps {
  name?: string | null;
  src?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showBadge?: boolean;
}

export function Avatar({
  name,
  src,
  size = "md",
  className,
  showBadge = false,
}: AvatarProps) {
  const initials = getInitials(name);

  const sizeClasses = {
    sm: "w-10 h-10 text-sm font-semibold",
    md: "w-14 h-14 text-xl font-bold",
    lg: "w-20 h-20 text-2xl font-bold",
    xl: "w-24 h-24 text-3xl font-extrabold",
  };

  return (
    <div className="relative inline-flex items-center justify-center shrink-0">
      <div
        className={cn(
          "rounded-full bg-brand-gradient text-white flex items-center justify-center shadow-brand-glow select-none ring-2 ring-amber-400/50 shadow-amber-500/10 dark:ring-amber-400/60 overflow-hidden",
          sizeClasses[size],
          className
        )}
      >
        {src ? (
          <img
            src={src}
            alt={name || "Profile picture"}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      {showBadge && (
        <span
          className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-surfaceCard-dark rounded-full shadow-sm"
          title="Online"
        />
      )}
    </div>
  );
}
