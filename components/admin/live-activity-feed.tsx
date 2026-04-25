"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "framer-motion";
import { BellRing, CheckCircle2, CreditCard, UserPlus } from "lucide-react";

const entries = [
  { id: "l1", text: "Complaint created in Block B", icon: BellRing, time: "Now" },
  { id: "l2", text: "Worker assigned to electrical issue", icon: UserPlus, time: "2m ago" },
  { id: "l3", text: "Payment received Rs 5,000", icon: CreditCard, time: "5m ago" },
  { id: "l4", text: "Issue marked complete", icon: CheckCircle2, time: "8m ago" },
];

export function LiveActivityFeed() {
  return (
    <GlassCard className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-200">Live System Activity</h3>
      <div className="max-h-72 space-y-2 overflow-auto pr-1">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-xl border border-slate-800 bg-slate-950/60 p-3"
          >
            <div className="flex items-center gap-2">
              <entry.icon size={14} className="text-blue-300" />
              <p className="text-xs text-slate-200">{entry.text}</p>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">{entry.time}</p>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
