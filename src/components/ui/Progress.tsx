import { cn } from "@/lib/utils/cn";

interface ProgressBarProps {
  value: number; // 0–100
  className?: string;
  size?: "sm" | "md";
  color?: "blue" | "teal" | "success";
  animated?: boolean;
}

export function ProgressBar({ value, className, size = "md", color = "blue", animated }: ProgressBarProps) {
  return (
    <div className={cn("w-full bg-[#EEF1F4] rounded-full overflow-hidden", size === "sm" ? "h-1.5" : "h-2", className)}>
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-500 ease-out",
          color === "blue" && "bg-[#2F5BFF]",
          color === "teal" && "bg-[#0F766E]",
          color === "success" && "bg-[#157347]",
          animated && "animate-[progressFill_500ms_ease-out]"
        )}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
