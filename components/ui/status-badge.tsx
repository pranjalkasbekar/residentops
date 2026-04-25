import { cn } from "@/lib/utils";

const statusClasses = {
  Pending: "bg-amber-500/20 text-amber-300 border-amber-400/40",
  "In Progress": "bg-blue-500/20 text-blue-300 border-blue-400/40",
  Completed: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
  Overdue: "bg-red-500/20 text-red-300 border-red-400/40",
  Paid: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
  Unpaid: "bg-slate-500/20 text-slate-300 border-slate-400/40",
} as const;

type StatusBadgeProps = {
  status: keyof typeof statusClasses;
  className?: string;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        statusClasses[status],
        className,
      )}
    >
      {status}
    </span>
  );
}
