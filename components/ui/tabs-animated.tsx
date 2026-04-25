"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type TabItem = {
  id: string;
  label: string;
};

type TabsAnimatedProps = {
  tabs: TabItem[];
  value: string;
  onChange: (tab: string) => void;
  className?: string;
};

export function TabsAnimated({ tabs, value, onChange, className }: TabsAnimatedProps) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-wrap gap-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-2",
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === value;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative rounded-xl px-4 py-2 text-sm font-medium transition-colors",
              isActive ? "text-slate-100" : "text-slate-400 hover:text-slate-200",
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="tab-slider"
                className="absolute inset-0 -z-10 rounded-xl border border-blue-400/30 bg-blue-500/15"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            ) : null}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
