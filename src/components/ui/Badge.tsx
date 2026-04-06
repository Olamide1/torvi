import { cn } from "@/lib/utils/cn";
import type { UserStatus } from "@/lib/types/cohort";

// Warm palette status badges — only use color where it communicates state
const STATUS_CONFIG: Record<UserStatus, { label: string; className: string }> = {
  lead:                { label: "Lead",          className: "bg-[#F5F4F2] text-[#78716C] border border-[#E7E5E4]" },
  checkout_started:    { label: "Checkout",      className: "bg-[#FEFCE8] text-[#A16207]" },
  paid:                { label: "Paid",          className: "bg-[#EFF6FF] text-[#1D4ED8]" },
  enrolled:            { label: "Enrolled",      className: "bg-[#EFF6FF] text-[#1D4ED8]" },
  onboarding_started:  { label: "Onboarding",   className: "bg-[#EFF6FF] text-[#1D4ED8]" },
  onboarding_completed:{ label: "Ready",         className: "bg-[#F0FDF4] text-[#15803D]" },
  active_week_1:       { label: "Week 1",        className: "bg-[#F0FDF4] text-[#15803D]" },
  active_week_2:       { label: "Week 2",        className: "bg-[#F0FDF4] text-[#15803D]" },
  active_week_3:       { label: "Week 3",        className: "bg-[#F0FDF4] text-[#15803D]" },
  active_week_4:       { label: "Week 4",        className: "bg-[#F0FDF4] text-[#15803D]" },
  stalled:             { label: "Stalled",       className: "bg-[#FEFCE8] text-[#A16207]" },
  assessment_submitted:{ label: "Submitted",     className: "bg-[#EFF6FF] text-[#1D4ED8]" },
  passed:              { label: "Passed",        className: "bg-[#F0FDF4] text-[#15803D]" },
  certified:           { label: "Certified",     className: "bg-[#F0FDF4] text-[#15803D]" },
  upsell_eligible:     { label: "Eligible",      className: "bg-[#F0FDF4] text-[#15803D]" },
  member_active:       { label: "Member",        className: "bg-[#F0FDF4] text-[#15803D]" },
  payment_issue:       { label: "Payment issue", className: "bg-[#FEF2F2] text-[#B91C1C]" },
  churned:             { label: "Churned",       className: "bg-[#F5F4F2] text-[#78716C] border border-[#E7E5E4]" },
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status as UserStatus] ?? {
    label: status.replace(/_/g, " "),
    className: "bg-[#F5F4F2] text-[#78716C] border border-[#E7E5E4]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-semibold tracking-[0.04em] uppercase",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "success" | "warn" | "error";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-semibold tracking-[0.04em] uppercase",
        variant === "default"  && "bg-[#F5F4F2] text-[#78716C] border border-[#E7E5E4]",
        variant === "accent"   && "bg-[#EFF6FF] text-[#1D4ED8]",
        variant === "success"  && "bg-[#F0FDF4] text-[#15803D]",
        variant === "warn"     && "bg-[#FEFCE8] text-[#A16207]",
        variant === "error"    && "bg-[#FEF2F2] text-[#B91C1C]",
        className
      )}
    >
      {children}
    </span>
  );
}
