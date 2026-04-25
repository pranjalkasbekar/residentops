import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
};

export function GlassCard({ className, hover = true, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-800/90 bg-slate-900/65 p-5 shadow-[0_10px_45px_rgba(2,6,23,0.55)] backdrop-blur-md transition-all duration-300",
        hover &&
          "hover:-translate-y-1 hover:border-blue-400/60 hover:shadow-[0_15px_50px_rgba(56,189,248,0.15)]",
        className,
      )}
      {...props}
    />
  );
}
