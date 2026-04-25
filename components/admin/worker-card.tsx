"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { motion } from "framer-motion";

type Worker = {
  id: string;
  name: string;
  role: string;
  availability: "Busy" | "Free";
  activeTasks: number;
  workload: number;
};

type WorkerCardProps = {
  worker: Worker;
};

export function WorkerCard({ worker }: WorkerCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <GlassCard className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-slate-100">{worker.name}</p>
            <p className="text-xs text-slate-400">{worker.role}</p>
          </div>
          <span
            className={`rounded-full border px-2 py-1 text-xs ${
              worker.availability === "Free"
                ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-300"
                : "border-amber-400/40 bg-amber-500/15 text-amber-300"
            }`}
          >
            {worker.availability}
          </span>
        </div>
        <p className="text-xs text-slate-400">Active tasks: {worker.activeTasks}</p>
        <div>
          <div className="mb-1 flex items-center justify-between text-[11px] text-slate-500">
            <span>Workload</span>
            <span>{worker.workload}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-800">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-300"
              style={{ width: `${worker.workload}%` }}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <GlowButton variant="secondary" className="px-3 py-1.5 text-xs">
            Assign task
          </GlowButton>
          <GlowButton variant="ghost" className="px-3 py-1.5 text-xs">
            Availability
          </GlowButton>
        </div>
      </GlassCard>
    </motion.div>
  );
}
