import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name?: string | null): string {
  if (!name) return "A";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Format names into clean Title Case (e.g. "FAISAL" -> "Faisal", "FAISAL AHMED" -> "Faisal Ahmed")
 */
export function formatName(name?: string | null): string {
  if (!name) return "";
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Get first name in clean Title Case (e.g. "FAISAL" -> "Faisal")
 */
export function getFirstName(name?: string | null): string {
  if (!name) return "there";
  const rawFirst = name.trim().split(/\s+/)[0];
  return rawFirst.charAt(0).toUpperCase() + rawFirst.slice(1).toLowerCase();
}
