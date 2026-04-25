import { cn } from "@/lib/utils";

const glowBadgeStyles = {
  Pending: "border-amber-400/40 bg-amber-500/15 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.18)]",
  "In Progress":
    "border-blue-400/40 bg-blue-500/15 text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.22)]",
  Completed:
    "border-emerald-400/40 bg-emerald-500/15 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.22)]",
  High: "border-red-400/40 bg-red-500/15 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.2)]",
  Medium: "border-amber-400/40 bg-amber-500/15 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.18)]",
  Low: "border-emerald-400/40 bg-emerald-500/15 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]",
} as const;

type GlowBadgeProps = {
  label: keyof typeof glowBadgeStyles;
  className?: string;
};

export function GlowBadge({ label, className }: GlowBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        glowBadgeStyles[label],
        className,
      )}
    >
      {label}
    </span>
  );
}
