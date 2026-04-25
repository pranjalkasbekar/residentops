"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "framer-motion";

type Member = {
  id: string;
  name: string;
  flat: string;
  contact: string;
  paymentStatus: "Paid" | "Pending";
  activeComplaints: number;
};

type MemberDetailPanelProps = {
  member: Member | null;
};

export function MemberDetailPanel({ member }: MemberDetailPanelProps) {
  return (
    <motion.div initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }}>
      <GlassCard className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-200">Member Detail</h3>
        {member ? (
          <>
            <p className="text-base font-semibold text-slate-100">{member.name}</p>
            <p className="text-xs text-slate-400">Flat {member.flat}</p>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-300">
              Contact: {member.contact}
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-300">
              Payment history: Last 3 months settled
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-300">
              Complaint history: {member.activeComplaints} active
            </div>
          </>
        ) : (
          <p className="text-sm text-slate-400">Select a member row to inspect full details.</p>
        )}
      </GlassCard>
    </motion.div>
  );
}
