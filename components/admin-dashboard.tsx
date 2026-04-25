"use client";

import { GlowButton } from "@/components/ui/glow-button";
import { useAuthStore, type Role } from "@/store/use-auth-store";
import { ComplaintStatus, useOpsStore } from "@/store/use-ops-store";
import { motion } from "framer-motion";
import {
  Bell,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  Home,
  LogOut,
  Search,
  ShieldCheck,
  UserCircle2,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type AdminSection = "overview" | "complaints" | "workers" | "members" | "payments" | "roles";

const leftNav: { label: string; key: AdminSection; icon: LucideIcon }[] = [
  { label: "Overview", icon: ClipboardCheck, key: "overview" },
  { label: "Complaint Control", icon: ClipboardList, key: "complaints" },
  { label: "Workers", icon: Wrench, key: "workers" },
  { label: "Members", icon: Users, key: "members" },
  { label: "Payments", icon: CreditCard, key: "payments" },
  { label: "Role Management", icon: ShieldCheck, key: "roles" },
];

function statusClass(status: string) {
  if (status === "Completed") return "border-emerald-400/40 bg-emerald-500/15 text-emerald-300";
  if (status === "Pending") return "border-amber-400/40 bg-amber-500/15 text-amber-300";
  if (status === "Overdue") return "border-red-400/40 bg-red-500/15 text-red-300";
  return "border-blue-400/40 bg-blue-500/15 text-blue-300";
}

export function AdminDashboard() {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const initializeAuth = useAuthStore((s) => s.initializeAuth);
  const authRole = useAuthStore((s) => s.user?.role);
  const role: Role =
    authRole === "SUPER_ADMIN" || authRole === "MANAGER" || authRole === "STAFF" ? authRole : "SUPER_ADMIN";
  const [section, setSection] = useState<AdminSection>("overview");
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null);
  const [timelineInput, setTimelineInput] = useState("");

  const complaints = useOpsStore((s) => s.complaints);
  const workers = useOpsStore((s) => s.workers);
  const payments = useOpsStore((s) => s.payments);
  const activity = useOpsStore((s) => s.activity);
  const ready = useOpsStore((s) => s.ready);
  const initializeRealtime = useOpsStore((s) => s.initializeRealtime);
  const assignWorker = useOpsStore((s) => s.assignWorker);
  const updateComplaintStatus = useOpsStore((s) => s.updateComplaintStatus);
  const addTimelineUpdate = useOpsStore((s) => s.addTimelineUpdate);

  const selectedComplaint = useMemo(
    () => complaints.find((c) => c.id === selectedComplaintId) ?? complaints[0] ?? null,
    [complaints, selectedComplaintId],
  );

  const stats = useMemo(() => {
    const total = complaints.length;
    const active = complaints.filter((c) => c.status === "In Progress").length;
    const overdue = complaints.filter((c) => c.status === "Pending").length;
    const revenue = payments.filter((p) => p.status === "Paid").reduce((sum, p) => sum + p.amount, 0);
    return [
      { label: "Total Complaints", value: total, trend: "+live", tone: "blue" },
      { label: "Active Issues", value: active, trend: "in progress", tone: "amber" },
      { label: "Overdue Tasks", value: overdue, trend: "pending", tone: "red" },
      { label: "Revenue This Month", value: `Rs ${revenue.toLocaleString("en-IN")}`, trend: "paid records", tone: "emerald" },
    ];
  }, [complaints, payments]);

  const canAssign = role === "SUPER_ADMIN" || role === "MANAGER";
  const canDelete = role === "SUPER_ADMIN";

  useEffect(() => {
    initializeAuth();
    initializeRealtime();
  }, [initializeAuth, initializeRealtime]);

  return (
    <main className="min-h-screen w-full bg-[#0B1220] p-2 text-[#E2E8F0] md:p-3">
      <div className="grid w-full gap-3 rounded-2xl border border-slate-800/90 bg-slate-950/35 p-2 backdrop-blur-xl lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-slate-800 bg-[#0F172A]/80 p-3 md:p-4">
          <div className="mb-6 flex items-center gap-2">
            <div className="rounded-lg bg-blue-500/20 p-1.5 text-blue-300">
              <ShieldCheck size={14} />
            </div>
            <p className="text-lg font-semibold">
              Admin<span className="text-blue-400">Ops</span>
            </p>
          </div>
          <div className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
            {leftNav.map((item) => (
              <button
                key={item.label}
                onClick={() => setSection(item.key)}
                className={`flex w-full items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                  section === item.key
                    ? "border-blue-500/50 bg-blue-500/15 text-slate-100 shadow-[0_0_25px_rgba(59,130,246,0.2)]"
                    : "border-transparent text-slate-400 hover:border-slate-700 hover:bg-slate-900/65 hover:text-slate-200"
                }`}
              >
                <item.icon size={14} />
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-3 lg:mt-6">
            <p className="text-xs font-semibold text-slate-200">Role Access</p>
            <p className="mt-1 text-xs text-slate-400">Current role: {role.replace("_", " ")}</p>
          </div>
        </aside>

        <section className="min-w-0 space-y-3">
          <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-[#0F172A]/80 p-3 md:p-4">
            <div>
              <p className="text-sm text-slate-400">Admin view</p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-100">Admin Control Center</h1>
              <p className="text-sm text-slate-400">Manage complaints lifecycle, assignments, and payments in real-time.</p>
            </div>
            <div className="flex w-full flex-wrap items-center gap-2 md:w-auto">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-3 text-slate-500" />
                <input
                  placeholder="Search system..."
                  className="h-10 w-full rounded-xl border border-slate-700 bg-slate-900/85 pl-9 pr-3 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400/40 md:w-52"
                />
              </div>
              <button className="rounded-xl border border-slate-700 bg-slate-900/85 p-2.5 text-slate-300">
                <Bell size={15} />
              </button>
              <div className="rounded-xl border border-slate-700 bg-slate-900/85 p-2 text-slate-300">
                <UserCircle2 size={18} />
              </div>
              <Link href="/">
                <GlowButton variant="ghost" className="px-3 py-2 text-xs">
                  <Home size={13} />
                  Home
                </GlowButton>
              </Link>
              <GlowButton
                variant="ghost"
                className="px-3 py-2 text-xs"
                onClick={() => {
                  logout();
                  router.push("/login?role=ADMIN");
                }}
              >
                <LogOut size={13} />
                Logout
              </GlowButton>
            </div>
          </header>

          {section === "overview" ? (
            <>
              <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
                {!ready ? (
                  <div className="rounded-2xl border border-slate-700/70 bg-slate-950/45 p-4 text-sm text-slate-400">
                    Syncing realtime data...
                  </div>
                ) : null}
                {stats.map((card) => (
                  <motion.div key={card.label} whileHover={{ y: -4 }} className="rounded-2xl border border-slate-800 bg-[#0F172A]/85 p-4 shadow-[0_15px_35px_rgba(2,6,23,0.45)]">
                    <p className="text-xs text-slate-400">{card.label}</p>
                    <p className="mt-2 text-4xl font-semibold tracking-tight">{card.value}</p>
                    <p className="mt-1 text-xs text-slate-400">{card.trend}</p>
                    <div className="mt-3 h-8 rounded-lg bg-gradient-to-r from-blue-500/30 to-cyan-500/5" />
                  </motion.div>
                ))}
              </div>
              <div className="grid gap-3 2xl:grid-cols-[2fr_1fr]">
                <div className="rounded-2xl border border-slate-800 bg-[#0F172A]/85 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-100">Latest Complaints</h2>
                    <GlowButton variant="ghost" className="px-3 py-1.5 text-xs" onClick={() => setSection("complaints")}>
                      Open Control
                    </GlowButton>
                  </div>
                  <div className="space-y-2">
                    {complaints.slice(0, 4).map((c) => (
                      <div key={c.id} className="rounded-xl border border-slate-800 bg-slate-950/55 p-3">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium">{c.title}</p>
                          <span className={`rounded-full border px-2 py-0.5 text-xs ${statusClass(c.status)}`}>{c.status}</span>
                        </div>
                        <p className="mt-1 text-xs text-slate-400">{c.category} • {c.residentName}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-[#0F172A]/85 p-4">
                  <h3 className="text-lg font-semibold text-slate-100">Live System Activity</h3>
                  <div className="mt-3 space-y-2">
                    {activity.slice(0, 6).map((a) => (
                      <div key={a} className="rounded-lg border border-slate-800 bg-slate-950/55 p-2 text-xs text-slate-300">
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : null}

          {section === "complaints" ? (
            <div className="grid gap-3 xl:grid-cols-[1.1fr_1.4fr]">
              <div className="rounded-2xl border border-slate-800 bg-[#0F172A]/85 p-4">
                <h2 className="text-lg font-semibold">Complaint List</h2>
                <div className="mt-3 space-y-2">
                  {complaints.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedComplaintId(c.id)}
                      className={`w-full rounded-xl border p-3 text-left ${selectedComplaint?.id === c.id ? "border-blue-500/45 bg-blue-500/10" : "border-slate-800 bg-slate-950/55"}`}
                    >
                      <p className="text-sm font-medium">{c.title}</p>
                      <p className="text-xs text-slate-400">{c.category} • {c.priority}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-[#0F172A]/85 p-4">
                {selectedComplaint ? (
                  <>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-semibold">{selectedComplaint.title}</h3>
                      <span className={`rounded-full border px-2 py-0.5 text-xs ${statusClass(selectedComplaint.status)}`}>
                        {selectedComplaint.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{selectedComplaint.description}</p>
                    <p className="mt-1 text-xs text-slate-500">Resident: {selectedComplaint.residentName}</p>

                    <div className="mt-4 grid gap-2 md:grid-cols-2">
                      <select
                        className="h-10 rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs"
                        onChange={async (e) => {
                          if (!e.target.value) return;
                          try {
                            await assignWorker(selectedComplaint.id, e.target.value);
                            toast.success("Worker assigned");
                          } catch {
                            toast.error("Unable to assign worker");
                          }
                        }}
                        disabled={!canAssign}
                        defaultValue=""
                      >
                        <option value="">Assign worker</option>
                        {workers.map((w) => (
                          <option key={w.id} value={w.id}>
                            {w.name} ({w.role})
                          </option>
                        ))}
                      </select>
                      <select
                        className="h-10 rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs"
                        onChange={async (e) => {
                          if (!e.target.value) return;
                          try {
                            await updateComplaintStatus(selectedComplaint.id, e.target.value as ComplaintStatus);
                            toast.success("Status updated");
                          } catch {
                            toast.error("Unable to update status");
                          }
                        }}
                        defaultValue=""
                      >
                        <option value="">Change status</option>
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                      </select>
                      <input
                        value={timelineInput}
                        onChange={(e) => setTimelineInput(e.target.value)}
                        placeholder="Add timeline update"
                        className="h-10 rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs md:col-span-2"
                      />
                    </div>

                    <div className="mt-3 flex gap-2">
                      <GlowButton
                        variant="secondary"
                        className="text-xs"
                        onClick={async () => {
                          await addTimelineUpdate(selectedComplaint.id, timelineInput);
                          setTimelineInput("");
                          toast.success("Timeline update added");
                        }}
                      >
                        Add Update
                      </GlowButton>
                      <GlowButton
                        className="text-xs"
                        onClick={async () => {
                          await updateComplaintStatus(selectedComplaint.id, "Completed");
                          toast.success("Complaint marked completed");
                        }}
                      >
                        Mark Complete
                      </GlowButton>
                    </div>

                    <ul className="mt-4 list-disc space-y-1 pl-5 text-xs text-slate-300">
                      {selectedComplaint.timeline.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="text-sm text-slate-400">No complaint selected.</p>
                )}
              </div>
            </div>
          ) : null}

          {section === "workers" ? (
            <div className="rounded-2xl border border-slate-800 bg-[#0F172A]/85 p-4">
              <h2 className="text-xl font-semibold">Workers</h2>
              <div className="mt-3 grid gap-2 md:grid-cols-3">
                {workers.map((w) => (
                  <div key={w.id} className="rounded-xl border border-slate-800 bg-slate-950/55 p-3">
                    <p className="font-medium">{w.name}</p>
                    <p className="text-xs text-slate-400">{w.role} • {w.phone}</p>
                    <p className={`mt-1 text-xs ${w.availability === "Free" ? "text-emerald-300" : "text-amber-300"}`}>{w.availability}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {section === "members" ? (
            <div className="rounded-2xl border border-slate-800 bg-[#0F172A]/85 p-4">
              <h2 className="text-xl font-semibold">Members</h2>
              <p className="mt-2 text-sm text-slate-400">Resident complaint/payment linkage is active in complaint and payments modules.</p>
            </div>
          ) : null}

          {section === "payments" ? (
            <div className="rounded-2xl border border-slate-800 bg-[#0F172A]/85 p-4">
              <h2 className="text-xl font-semibold">Payment Control Center</h2>
              <div className="mt-3 space-y-2">
                {payments.map((p) => (
                  <div key={p.id} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/55 p-3 text-sm">
                    <span>{p.residentName}</span>
                    <span>{p.month} {p.year}</span>
                    <span>Rs {p.amount}</span>
                    <span className={`rounded-full border px-2 py-0.5 text-xs ${statusClass(p.status === "Paid" ? "Completed" : p.status === "Overdue" ? "Overdue" : "Pending")}`}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
              {canDelete ? <GlowButton variant="ghost" className="mt-3 text-xs">Delete payment record (Super Admin)</GlowButton> : null}
            </div>
          ) : null}

          {section === "roles" ? (
            <div className="rounded-2xl border border-slate-800 bg-[#0F172A]/85 p-4">
              <h2 className="text-xl font-semibold">Role Management</h2>
              <p className="mt-2 text-sm text-slate-400">
                Current role: {role}. {role === "STAFF" ? "You can update status only." : role === "MANAGER" ? "You can assign workers." : "You have full permissions."}
              </p>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
