"use client";

import { DataTable } from "@/components/ui/data-table";
import { EmptyState } from "@/components/ui/empty-state";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { StatusBadge } from "@/components/ui/status-badge";

type PaymentRow = {
  id: string;
  resident: string;
  month: string;
  amount: string;
  status: "Paid" | "Overdue";
};

type PaymentDashboardProps = {
  rows: PaymentRow[];
};

export function PaymentDashboard({ rows }: PaymentDashboardProps) {
  return (
    <div className="space-y-4">
      <GlassCard>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-slate-200">Payment Control Center</h3>
          <div className="flex gap-2">
            <select className="h-10 rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs text-slate-200">
              <option>Apr 2026</option>
              <option>Mar 2026</option>
              <option>Feb 2026</option>
            </select>
            <GlowButton variant="secondary" className="px-3 py-2 text-xs">
              Export
            </GlowButton>
          </div>
        </div>
      </GlassCard>
      {rows.length ? (
        <DataTable
          columns={[
            { key: "resident", label: "Resident" },
            { key: "month", label: "Month" },
            { key: "amount", label: "Amount" },
            {
              key: "status",
              label: "Status",
              render: (row) => <StatusBadge status={row.status === "Paid" ? "Paid" : "Overdue"} />,
            },
          ]}
          rows={rows}
        />
      ) : (
        <EmptyState
          title="No payment logs"
          description="Payment logs will appear as transactions are recorded."
        />
      )}
    </div>
  );
}
