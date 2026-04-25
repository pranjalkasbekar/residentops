"use client";

import { GlowBadge } from "@/components/resident/glow-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { motion } from "framer-motion";
import { UserCircle2 } from "lucide-react";

type ActivityItem = {
  id: string;
  title: string;
  category: string;
  status: "Pending" | "In Progress" | "Completed";
  worker: string;
  timestamp: string;
};

type ActivityFeedProps = {
  items: ActivityItem[];
};

const statusBar = {
  Pending: "bg-amber-400",
  "In Progress": "bg-blue-400",
  Completed: "bg-emerald-400",
} as const;

export function ActivityFeed({ items }: ActivityFeedProps) {
  if (!items.length) {
    return (
      <EmptyState
        title="No complaint activity yet"
        description="Raise your first complaint and track every update in this live operations feed."
      />
    );
  }

  return (
    <GlassCard className="space-y-3">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-200">Recent Complaints Activity</h2>
        <GlowButton variant="ghost" className="px-3 py-1.5 text-xs">
          View all
        </GlowButton>
      </div>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.07 }}
          whileHover={{ y: -3 }}
          className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950/55 p-4 transition-all duration-300 hover:border-blue-400/45 hover:shadow-[0_10px_35px_rgba(56,189,248,0.12)]"
        >
          <div className={`absolute inset-y-0 left-0 w-1 ${statusBar[item.status]}`} />
          <div className="flex flex-wrap items-start justify-between gap-3 pl-2">
            <div>
              <p className="font-medium text-slate-100">{item.title}</p>
              <p className="mt-1 text-xs text-slate-400">{item.category}</p>
            </div>
            <GlowBadge label={item.status} />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pl-2 text-xs text-slate-400">
            <p className="inline-flex items-center gap-1.5">
              <UserCircle2 size={14} className="text-blue-300" />
              {item.worker}
            </p>
            <span>{item.timestamp}</span>
          </div>
        </motion.div>
      ))}
    </GlassCard>
  );
}
