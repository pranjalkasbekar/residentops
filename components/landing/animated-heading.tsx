"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type AnimatedHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function AnimatedHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: AnimatedHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45 }}
      className={cn(align === "center" ? "text-center" : "text-left", className)}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-blue-300">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-slate-100 md:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-4 max-w-2xl text-sm text-slate-400 md:text-base">{subtitle}</p> : null}
    </motion.div>
  );
}
