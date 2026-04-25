"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type TabItem = {
  id: string;
  label: string;
};

type AnimatedTabsProps = {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
};

export function AnimatedTabs({ tabs, value, onChange }: AnimatedTabsProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-2">
      <div className="relative flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const active = tab.id === value;

          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                "relative rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                active ? "text-slate-100" : "text-slate-400 hover:text-slate-200",
              )}
            >
              {active ? (
                <>
                  <motion.span
                    layoutId="resident-tab-bg"
                    className="absolute inset-0 -z-10 rounded-xl border border-blue-400/35 bg-blue-500/15"
                    transition={{ type: "spring", stiffness: 390, damping: 30 }}
                  />
                  <motion.span
                    layoutId="resident-tab-line"
                    className="absolute -bottom-1 left-3 right-3 h-0.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(56,189,248,0.7)]"
                    transition={{ type: "spring", stiffness: 390, damping: 30 }}
                  />
                </>
              ) : null}
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
