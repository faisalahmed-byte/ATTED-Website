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
    sm: "w-9 h-9 text-xs font-semibold",
    md: "w-12 h-12 text-sm font-bold",
    lg: "w-16 h-16 text-lg font-bold",
    xl: "w-20 h-20 text-xl font-bold",
  };

  return (
    <div className="relative inline-flex items-center justify-center shrink-0">
      <div
        className={cn(
          "rounded-full bg-[#111111] text-[#D5AD55] flex items-center justify-center select-none ring-2 ring-[#D5AD55]/60 overflow-hidden",
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
          className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-[#111111] rounded-full shadow-xs"
          title="Active"
        />
      )}
    </div>
  );
}
