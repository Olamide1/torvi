import { cn } from "@/lib/utils/cn";
import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, icon, ...props }, ref) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7B8391]">
          {icon}
        </div>
      )}
      <input
        ref={ref}
        className={cn(
          "w-full h-11 px-4 rounded-md border border-[#DDE1E7] bg-white",
          "text-sm text-[#16181D] placeholder:text-[#7B8391]",
          "focus:outline-none focus:border-[#2F5BFF] focus:ring-2 focus:ring-[#2F5BFF]/20",
          "transition-all duration-120",
          icon && "pl-10",
          className
        )}
        {...props}
      />
    </div>
  );
});

Input.displayName = "Input";
export { Input };
