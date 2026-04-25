"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "framer-motion";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

type StatCardAdvancedProps = {
  icon: LucideIcon;
  title: string;
  value: number;
  trend: string;
  sparkline: number[];
};

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * 100;
      const normalized = (v - min) / Math.max(max - min, 1);
      const y = 28 - normalized * 24;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 30" className="h-10 w-full">
      <polyline
        fill="none"
        stroke="rgba(56,189,248,0.9)"
        strokeWidth="2.3"
        points={points}
        className="drop-shadow-[0_0_8px_rgba(56,189,248,0.55)]"
      />
    </svg>
  );
}

export function StatCardAdvanced({ icon: Icon, title, value, trend, sparkline }: StatCardAdvancedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.22 }}
    >
      <GlassCard className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{title}</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-100">{value}</p>
          </div>
          <div className="rounded-xl border border-blue-400/45 bg-blue-500/15 p-2.5 text-blue-300 shadow-[0_0_24px_rgba(59,130,246,0.3)]">
            <Icon size={16} />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1 rounded-full border border-emerald-500/35 bg-emerald-500/15 px-2 py-1 text-xs text-emerald-300">
            <ArrowUpRight size={12} />
            {trend}
          </div>
          <div className="w-24">
            <Sparkline values={sparkline} />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
