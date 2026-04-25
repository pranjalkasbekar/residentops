"use client";

import { RoleGuard } from "@/components/admin/role-guard";
import { AnimatedInput } from "@/components/ui/animated-input";
import { EmptyState } from "@/components/ui/empty-state";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { StatusBadge } from "@/components/ui/status-badge";
import { type Role } from "@/store/use-auth-store";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type Complaint = {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Completed";
  resident: string;
  assignedTo: string;
};

type ComplaintSplitViewProps = {
  role: Role;
  complaints: Complaint[];
};

export function ComplaintSplitView({ role, complaints }: ComplaintSplitViewProps) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedId, setSelectedId] = useState<string | null>(complaints[0]?.id ?? null);

  const filtered = useMemo(() => {
    return complaints.filter((c) => {
      const qMatch = c.title.toLowerCase().includes(query.toLowerCase());
      const sMatch = statusFilter === "All" || c.status === statusFilter;
      const cMatch = categoryFilter === "All" || c.category === categoryFilter;
      return qMatch && sMatch && cMatch;
    });
  }, [complaints, query, statusFilter, categoryFilter]);

  const selected = filtered.find((c) => c.id === selectedId) ?? filtered[0] ?? null;

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <GlassCard className="space-y-3 lg:col-span-2">
        <h3 className="text-sm font-semibold text-slate-200">Complaint Control Panel</h3>
        <AnimatedInput placeholder="Search complaints..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className="grid grid-cols-2 gap-2">
          <select
            className="h-10 rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs text-slate-200"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option>All</option>
            <option>Plumbing</option>
            <option>Electrical</option>
            <option>Security</option>
          </select>
          <select
            className="h-10 rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs text-slate-200"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <div className="max-h-[420px] space-y-2 overflow-auto pr-1">
          {filtered.length ? (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`w-full rounded-xl border p-3 text-left transition ${
                  selected?.id === item.id
                    ? "border-blue-400/55 bg-blue-500/10"
                    : "border-slate-800 bg-slate-950/50 hover:border-blue-400/45"
                }`}
              >
                <p className="text-sm font-medium text-slate-100">{item.title}</p>
                <p className="mt-1 text-xs text-slate-400">{item.category}</p>
              </button>
            ))
          ) : (
            <EmptyState title="No issues right now" description="Try another filter or add test complaint." />
          )}
        </div>
      </GlassCard>

      <motion.div className="lg:col-span-3" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}>
        <GlassCard className="space-y-4">
          {selected ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-slate-100">{selected.title}</h3>
                <StatusBadge status={selected.status} />
              </div>
              <p className="text-sm text-slate-400">{selected.description}</p>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-300">
                  Category: {selected.category}
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-300">
                  Priority: {selected.priority}
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-300">
                  Resident: {selected.resident}
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-300">
                  Assigned: {selected.assignedTo}
                </div>
              </div>

              <div className="grid gap-2 md:grid-cols-2">
                <RoleGuard role={role} allow={["SUPER_ADMIN", "MANAGER"]}>
                  <select className="h-10 rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs text-slate-200">
                    <option>Assign Worker</option>
                    <option>John (Plumber)</option>
                    <option>Sarah (Electrician)</option>
                    <option>Alex (Technician)</option>
                  </select>
                </RoleGuard>
                <RoleGuard role={role} allow={["SUPER_ADMIN", "MANAGER", "STAFF"]}>
                  <select className="h-10 rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs text-slate-200">
                    <option>Change Status</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </RoleGuard>
                <RoleGuard role={role} allow={["SUPER_ADMIN", "MANAGER", "STAFF"]}>
                  <GlowButton
                    variant="secondary"
                    className="w-full text-xs"
                    onClick={() => toast.success("Timeline update added")}
                  >
                    Add Timeline Update
                  </GlowButton>
                </RoleGuard>
                <RoleGuard role={role} allow={["SUPER_ADMIN", "MANAGER", "STAFF"]}>
                  <GlowButton className="w-full text-xs" onClick={() => toast.success("Complaint marked completed")}>
                    Mark Complete
                  </GlowButton>
                </RoleGuard>
              </div>
            </>
          ) : (
            <EmptyState
              title="No complaint selected"
              description="Choose an item from the list to inspect and control the full lifecycle."
            />
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
