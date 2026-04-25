import { GlassCard } from "@/components/ui/glass-card";
import { ArrowUpRight } from "lucide-react";
import { type LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  growth?: string;
  icon: LucideIcon;
};

export function StatCard({ label, value, growth, icon: Icon }: StatCardProps) {
  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{label}</p>
        <div className="rounded-lg border border-blue-400/40 bg-blue-500/15 p-2 text-blue-300">
          <Icon size={16} />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-semibold tracking-tight text-slate-100">{value}</p>
        {growth ? (
          <p className="flex items-center gap-1 text-xs text-emerald-300">
            <ArrowUpRight size={12} />
            {growth}
          </p>
        ) : null}
      </div>
    </GlassCard>
  );
}
