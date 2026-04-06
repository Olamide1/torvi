import { cn } from "@/lib/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
  hoverable?: boolean;
}

export function Card({ children, className, onClick, selected, hoverable }: CardProps) {
  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") onClick(); } : undefined}
      className={cn(
        "rounded-xl border bg-white",
        "shadow-[0_1px_3px_0_rgb(0,0,0,0.06),0_1px_2px_-1px_rgb(0,0,0,0.06)]",
        hoverable && "cursor-pointer transition-all duration-120",
        hoverable && !selected && "border-[#DDE1E7] hover:border-[#C8CDD5] hover:shadow-[0_4px_6px_-1px_rgb(0,0,0,0.07)]",
        selected && "border-[#2F5BFF] ring-2 ring-[#2F5BFF]/20",
        !hoverable && !selected && "border-[#DDE1E7]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("px-5 py-4 border-b border-[#EEF1F4]", className)}>{children}</div>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("px-5 py-4", className)}>{children}</div>;
}
