"use client";

import { cn } from "@/lib/utils";
import { type InputHTMLAttributes } from "react";

type AnimatedInputProps = InputHTMLAttributes<HTMLInputElement>;

export function AnimatedInput({ className, ...props }: AnimatedInputProps) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border border-slate-700/90 bg-slate-900/80 px-3 text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus-visible:scale-[1.01] focus-visible:border-blue-400/70 focus-visible:shadow-[0_0_0_3px_rgba(59,130,246,0.18)] focus-visible:outline-none",
        className,
      )}
      {...props}
    />
  );
}
