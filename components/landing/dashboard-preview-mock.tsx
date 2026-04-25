"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Activity, CircleCheck, CreditCard, Wrench } from "lucide-react";

const floatingTransition = {
  duration: 4,
  repeat: Number.POSITIVE_INFINITY,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const,
};

type DashboardPreviewMockProps = {
  scale?: "default" | "xl";
  liveFlicker?: boolean;
};

export function DashboardPreviewMock({ scale = "default", liveFlicker = false }: DashboardPreviewMockProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useTransform(mouseX, [-120, 120], [-6, 6]);
  const rotateX = useTransform(mouseY, [-120, 120], [6, -6]);

  const isXL = scale === "xl";

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left - rect.width / 2);
        mouseY.set(event.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      className={`relative w-full ${isXL ? "min-h-[520px] md:min-h-[560px]" : "min-h-[340px]"}`}
    >
      <div className="pointer-events-none absolute -left-14 top-14 h-44 w-44 rounded-full bg-blue-500/16 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 top-4 h-36 w-36 rounded-full bg-cyan-400/18 blur-3xl" />
      <div className="pointer-events-none absolute left-8 top-24 h-[62%] w-[78%] rounded-3xl border border-slate-700/50 bg-slate-900/35 blur-[1px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        className={`absolute left-0 ${isXL ? "top-10 w-[90%]" : "top-8 w-[84%]"}`}
      >
        <GlassCard className="space-y-3 shadow-[0_20px_70px_rgba(2,6,23,0.62)]">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Operations Pulse</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-slate-700 bg-slate-950/70 p-2">
              <p className="text-xs text-slate-400">Open</p>
              <p className="text-lg font-semibold text-slate-100">18</p>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-950/70 p-2">
              <p className="text-xs text-slate-400">In Progress</p>
              <p className="text-lg font-semibold text-blue-300">7</p>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-950/70 p-2">
              <p className="text-xs text-slate-400">Resolved</p>
              <p className="text-lg font-semibold text-emerald-300">42</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div
        animate={{ y: [-2, -10, -2] }}
        transition={{ ...floatingTransition, delay: 0.15 }}
        className={`absolute right-0 top-0 ${isXL ? "w-[58%]" : "w-[52%]"}`}
      >
        <GlassCard>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Wrench size={14} className="text-blue-300" />
            Assign Worker
          </div>
          <p className="mt-2 text-xs text-slate-400">Plumbing request auto-routed to technician.</p>
        </GlassCard>
      </motion.div>

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ ...floatingTransition, duration: 5.5, delay: 0.35 }}
        className={`absolute right-4 ${isXL ? "top-48 w-[62%]" : "top-36 w-[56%]"}`}
      >
        <GlassCard>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <CreditCard size={14} className="text-blue-300" />
            Payments
          </div>
          <motion.p
            animate={liveFlicker ? { opacity: [1, 0.55, 1] } : {}}
            transition={liveFlicker ? { repeat: Number.POSITIVE_INFINITY, duration: 1.8 } : {}}
            className="mt-2 text-xs text-slate-400"
          >
            Rs 3.2L collected this month.
          </motion.p>
        </GlassCard>
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ ...floatingTransition, duration: 6.5, delay: 0.5 }}
        className={`absolute left-8 ${isXL ? "top-[21.5rem] w-[68%]" : "top-56 w-[62%]"}`}
      >
        <GlassCard className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-200">Live updates</p>
            <p className="text-xs text-slate-400">Resident notified in real-time.</p>
          </div>
          <div className="flex gap-2 text-slate-300">
            <Activity size={14} />
            <CircleCheck size={14} className="text-emerald-300" />
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
