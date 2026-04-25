import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type AuthCardProps = {
  children: ReactNode;
  className?: string;
};

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border border-slate-700/90 bg-slate-900/70 p-6 shadow-[0_18px_60px_rgba(2,6,23,0.6)] backdrop-blur-xl md:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
