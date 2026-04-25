"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

type AdminStatCardProps = {
  icon: LucideIcon;
  label: string;
  value: number;
  trend: string;
  status: "green" | "yellow" | "red" | "blue";
  sparkline: number[];
};

const statusColor = {
  green: "bg-emerald-400",
  yellow: "bg-amber-400",
  red: "bg-red-400",
  blue: "bg-blue-400",
};

function Counter({ target }: { target: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 850;
    const loop = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return <>{value.toLocaleString("en-IN")}</>;
}

function Spark({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values
    .map((v, i) => {
      const x = (i / Math.max(values.length - 1, 1)) * 100;
      const y = 24 - ((v - min) / Math.max(max - min, 1)) * 20;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 100 28" className="h-8 w-24">
      <polyline points={points} fill="none" stroke="rgba(56,189,248,0.9)" strokeWidth="2.2" />
    </svg>
  );
}

export function AdminStatCard({ icon: Icon, label, value, trend, status, sparkline }: AdminStatCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -6 }}>
      <GlassCard className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-400">{label}</p>
          <div className="rounded-lg border border-blue-400/40 bg-blue-500/15 p-2 text-blue-300">
            <Icon size={16} />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <p className="text-3xl font-semibold text-slate-100">
            <Counter target={value} />
          </p>
          <Spark values={sparkline} />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400">{trend}</p>
          <span className={`h-2.5 w-2.5 rounded-full ${statusColor[status]}`} />
        </div>
      </GlassCard>
    </motion.div>
  );
}
