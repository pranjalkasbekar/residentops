"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

export function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, rotateX: 3, rotateY: -3, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={cn("h-full", className)}
    >
      <GlassCard className="h-full">
        <div className="mb-4 inline-flex rounded-xl border border-blue-400/35 bg-blue-500/10 p-2.5 text-blue-300 shadow-[0_0_24px_rgba(56,189,248,0.28)]">
          <Icon size={18} />
        </div>
        <h3 className="text-base font-semibold text-slate-100">{title}</h3>
        <p className="mt-2 text-sm text-slate-400">{description}</p>
      </GlassCard>
    </motion.div>
  );
}
