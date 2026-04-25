"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "framer-motion";
import { BellRing, CheckCircle2, CreditCard, UserCheck } from "lucide-react";
import { useMemo } from "react";

const updates = [
  {
    id: "u1",
    icon: UserCheck,
    text: "Worker assigned to plumbing issue",
    time: "Just now",
  },
  {
    id: "u2",
    icon: CreditCard,
    text: "Payment received Rs 5,000",
    time: "2 min ago",
  },
  {
    id: "u3",
    icon: CheckCircle2,
    text: "Complaint marked as completed",
    time: "8 min ago",
  },
];

export function LiveUpdatePanel() {
  const items = useMemo(() => updates, []);

  return (
    <GlassCard className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-200">Live Activity</p>
        <BellRing size={14} className="text-blue-300" />
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.12 }}
            className="rounded-xl border border-slate-800 bg-slate-950/65 p-3"
          >
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 rounded-md border border-blue-400/35 bg-blue-500/10 p-1.5 text-blue-300">
                <item.icon size={13} />
              </div>
              <div>
                <p className="text-xs text-slate-200">{item.text}</p>
                <p className="mt-1 text-[11px] text-slate-500">{item.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
