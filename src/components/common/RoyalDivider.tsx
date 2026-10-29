import React from "react";
import { Crown } from "lucide-react";

interface RoyalDividerProps {
  className?: string;
  variant?: "crown" | "tea" | "simple";
  title?: string;
}

export default function RoyalDivider({
  className = "",
  variant = "crown",
  title,
}: RoyalDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-3 my-8 ${className}`}>
      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[var(--color-primary-border)] to-[var(--color-accent-gold)]" />

      {variant === "crown" && (
        <div className="flex items-center gap-1 text-[var(--color-accent-gold)]">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-gold)]" />
          <Crown className="w-5 h-5 drop-shadow-sm animate-float-soft" />
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-gold)]" />
        </div>
      )}

      {variant === "simple" && (
        <div className="w-2 h-2 rotate-45 border border-[var(--color-accent-gold)] bg-[var(--color-accent-gold-light)]" />
      )}

      {title && (
        <span className="font-serif italic text-sm tracking-wider uppercase text-[var(--color-primary-dark)] px-2 font-medium">
          {title}
        </span>
      )}

      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-[var(--color-primary-border)] to-[var(--color-accent-gold)]" />
    </div>
  );
}
