"use client";

import { cn } from "@/lib/utils/cn";
import { type ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          // Base — nearly square corners (4px = rounded)
          "inline-flex items-center justify-center gap-2 font-medium rounded transition-colors duration-100",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "min-h-[44px]",
          "tracking-[-0.01em]",
          // Sizes
          size === "sm" && "h-9 px-4 text-sm",
          size === "md" && "h-11 px-5 text-sm",
          size === "lg" && "h-12 px-6 text-base",
          // Variants
          variant === "primary" && [
            "bg-[#1D4ED8] text-white",
            "hover:bg-[#1e40af] active:bg-[#1d3a8a]",
          ],
          variant === "secondary" && [
            "bg-white text-[#1C1917] border border-[#1C1917]/20",
            "hover:bg-[#F7F6F3] hover:border-[#1C1917]/30 active:bg-[#F5F4F2]",
          ],
          variant === "ghost" && [
            "bg-transparent text-[#78716C]",
            "hover:bg-[#F5F4F2] hover:text-[#1C1917]",
          ],
          variant === "destructive" && [
            "bg-white text-[#B91C1C] border border-[#B91C1C]/20",
            "hover:bg-[#FEF2F2] active:bg-[#fee2e2]",
          ],
          className
        )}
        {...props}
      >
        {loading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
