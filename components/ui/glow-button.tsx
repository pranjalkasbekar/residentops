"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { type ButtonHTMLAttributes } from "react";

type GlowButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "secondary";
};

export function GlowButton({
  className,
  variant = "primary",
  children,
  ...props
}: GlowButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-flex">
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 disabled:cursor-not-allowed disabled:opacity-60",
          variant === "primary" &&
            "border-blue-400/60 bg-blue-500 text-slate-950 shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:shadow-[0_0_35px_rgba(56,189,248,0.5)]",
          variant === "secondary" &&
            "border-slate-700 bg-slate-800/80 text-slate-100 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(56,189,248,0.25)]",
          variant === "ghost" &&
            "border-slate-700/80 bg-transparent text-slate-200 hover:border-blue-400/60 hover:bg-slate-800/60 hover:shadow-[0_0_20px_rgba(56,189,248,0.25)]",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    </motion.div>
  );
}
