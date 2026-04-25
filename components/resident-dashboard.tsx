"use client";

import { GlowButton } from "@/components/ui/glow-button";
import { useAuthStore } from "@/store/use-auth-store";
import { ComplaintPriority, useOpsStore } from "@/store/use-ops-store";
import { motion } from "framer-motion";
import {
  Bell,
  CircleHelp,
  CirclePlus,
  ClipboardList,
  CreditCard,
  Gauge,
  Home,
  IndianRupee,
  LogOut,
  Search,
  Settings,
  UserCircle2,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type ResidentSection =
  | "dashboard"
  | "raise"
  | "track"
  | "maintenance"
  | "payments"
  | "profile"
  | "notifications"
  | "help"
  | "settings";

const residentName = "Rohan Sharma";

const sidebarItems: { label: string; icon: LucideIcon; key: ResidentSection; badge?: string }[] = [
  { label: "Dashboard", icon: Home, key: "dashboard" },
  { label: "Raise Complaint", icon: CirclePlus, key: "raise" },
  { label: "Track Complaints", icon: ClipboardList, key: "track" },
  { label: "Pay Maintenance", icon: IndianRupee, key: "maintenance" },
  { label: "My Payments", icon: CreditCard, key: "payments" },
  { label: "My Profile", icon: UserCircle2, key: "profile" },
  { label: "Notifications", icon: Bell, key: "notifications", badge: "3" },
  { label: "Help & Support", icon: CircleHelp, key: "help" },
  { label: "Settings", icon: Settings, key: "settings" },
];

function statusClass(status: string) {
  if (status === "Completed") return "border-emerald-400/40 bg-emerald-500/15 text-emerald-300";
  if (status === "Pending") return "border-amber-400/40 bg-amber-500/15 text-amber-300";
  return "border-blue-400/40 bg-blue-500/15 text-blue-300";
}

export function ResidentDashboard() {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const initializeAuth = useAuthStore((s) => s.initializeAuth);
  const authUser = useAuthStore((s) => s.user);
  const [section, setSection] = useState<ResidentSection>("dashboard");

  const complaints = useOpsStore((s) => s.complaints);
  const workers = useOpsStore((s) => s.workers);
  const payments = useOpsStore((s) => s.payments);
  const activity = useOpsStore((s) => s.activity);
  const ready = useOpsStore((s) => s.ready);
  const initializeRealtime = useOpsStore((s) => s.initializeRealtime);
  const createComplaint = useOpsStore((s) => s.createComplaint);
  const recordPayment = useOpsStore((s) => s.recordPayment);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Plumbing");
  const [priority, setPriority] = useState<ComplaintPriority>("Medium");
  const [amount, setAmount] = useState("5000");
  const [month, setMonth] = useState("May");
  const [year, setYear] = useState("2026");

  const currentResidentName = authUser?.name || residentName;
  const currentResidentUid = authUser?.uid || "";

  const residentComplaints = useMemo(() => {
    return complaints.filter((c) =>
      c.residentUid ? c.residentUid === currentResidentUid : c.residentName === currentResidentName,
    );
  }, [complaints, currentResidentUid, currentResidentName]);

  const residentPayments = useMemo(() => {
    return payments.filter((p) =>
      p.residentUid ? p.residentUid === currentResidentUid : p.residentName === currentResidentName,
    );
  }, [payments, currentResidentUid, currentResidentName]);

  const stats = useMemo(() => {
    const total = residentComplaints.length;
    const pending = residentComplaints.filter((c) => c.status === "Pending").length;
    const progress = residentComplaints.filter((c) => c.status === "In Progress").length;
    const done = residentComplaints.filter((c) => c.status === "Completed").length;
    return [
      { label: "Total Complaints", value: total, trend: "+live data", tone: "blue" },
      { label: "Pending", value: pending, trend: "needs action", tone: "amber" },
      { label: "In Progress", value: progress, trend: "workers active", tone: "blue" },
      { label: "Completed", value: done, trend: "resolved", tone: "emerald" },
    ];
  }, [residentComplaints]);

  const pendingDue = residentPayments.find((p) => p.status !== "Paid")?.amount ?? 0;

  useEffect(() => {
    initializeAuth();
    initializeRealtime();
  }, [initializeAuth, initializeRealtime]);

  const onCreateComplaint = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Title and description are required");
      return;
    }
    try {
      if (!currentResidentUid) {
        toast.error("User session not ready, please try again.");
        return;
      }
      await createComplaint({
        title,
        description,
        category,
        priority,
        residentUid: currentResidentUid,
        residentName: currentResidentName,
      });
      setTitle("");
      setDescription("");
      setSection("track");
      toast.success("Complaint created. Admin can now assign a worker.");
    } catch {
      toast.error("Unable to create complaint");
    }
  };

  const onPay = async () => {
    const numeric = Number(amount);
    if (!numeric || numeric <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    try {
      if (!currentResidentUid) {
        toast.error("User session not ready, please try again.");
        return;
      }
      await recordPayment({
        residentUid: currentResidentUid,
        residentName: currentResidentName,
        amount: numeric,
        month,
        year,
      });
      setSection("payments");
      toast.success("Payment recorded");
    } catch {
      toast.error("Unable to record payment");
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0B1220] p-2 text-[#E2E8F0] md:p-3">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(148,163,184,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.45)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="pointer-events-none absolute left-[12%] top-[22%] h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
      <div className="pointer-events-none absolute right-[8%] top-[18%] h-64 w-64 rounded-full bg-cyan-400/12 blur-3xl" />
      <div className="mx-auto w-full md:w-[90.91%] md:origin-top md:scale-[1.1]">
        <div className="relative grid w-full gap-3 rounded-2xl border border-slate-700/80 bg-slate-950/45 p-2 shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-md lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-slate-700/80 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(15,23,42,0.86))] p-3 shadow-[inset_0_1px_0_rgba(148,163,184,0.1)] backdrop-blur-md md:p-4">
            <div className="mb-6 flex items-center gap-2">
              <div className="rounded-lg bg-blue-500/20 p-1.5 text-blue-300">
                <Home size={14} />
              </div>
              <p className="text-lg font-semibold">
                Home<span className="text-blue-400">Ops</span>
              </p>
            </div>

            <div className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setSection(item.key)}
                  className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                    section === item.key
                    ? "border-blue-400/60 bg-blue-500/18 text-slate-100 shadow-[0_0_30px_rgba(59,130,246,0.26)]"
                    : "border-slate-800/65 text-slate-400 hover:border-slate-600 hover:bg-slate-900/65 hover:text-slate-200"
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <item.icon size={14} />
                    {item.label}
                  </span>
                  {item.badge ? (
                    <span className="rounded-full bg-blue-500 px-2 py-0.5 text-[10px] font-semibold text-white">{item.badge}</span>
                  ) : null}
                </button>
              ))}
            </div>
          </aside>

          <section className="min-w-0 space-y-3">
            <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-700/80 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(15,23,42,0.86))] p-3 shadow-[inset_0_1px_0_rgba(148,163,184,0.1)] backdrop-blur-md md:p-4">
              <div>
                <p className="text-sm text-slate-400">Welcome back,</p>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-100">{currentResidentName}</h1>
                <p className="text-sm text-slate-400">Here&apos;s what&apos;s happening in your community today.</p>
              </div>
              <div className="flex w-full flex-wrap items-center gap-2 md:w-auto">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-3 text-slate-500" />
                  <input
                    placeholder="Search anything..."
                    className="h-10 w-full rounded-xl border border-slate-700 bg-slate-900/85 pl-9 pr-3 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400/40 md:w-56"
                  />
                </div>
                <button className="rounded-xl border border-slate-700 bg-slate-900/85 p-2.5 text-slate-300">
                  <Bell size={15} />
                </button>
                <div className="rounded-xl border border-slate-700 bg-slate-900/85 p-2">
                  <UserCircle2 size={18} />
                </div>
                <Link href="/">
                  <GlowButton variant="ghost" className="px-3 py-2 text-xs">
                    Home
                  </GlowButton>
                </Link>
                <GlowButton
                  variant="ghost"
                  className="px-3 py-2 text-xs"
                  onClick={() => {
                    logout();
                    router.push("/login?role=RESIDENT");
                  }}
                >
                  <LogOut size={13} />
                  Logout
                </GlowButton>
                <GlowButton className="px-4 py-2 text-xs" onClick={() => setSection("raise")}>
                  Raise Complaint
                </GlowButton>
              </div>
            </header>

            {section === "dashboard" ? (
              <>
                <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
                  {stats.map((card, index) => (
                    <motion.div
                      key={card.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06 }}
                    className="rounded-2xl border border-slate-700/80 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(15,23,42,0.86))] p-4 shadow-[0_15px_40px_rgba(2,6,23,0.42),inset_0_1px_0_rgba(148,163,184,0.1)] backdrop-blur-sm"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-400">{card.label}</p>
                        <div className="rounded-lg border border-slate-700 bg-slate-900/80 p-2">
                          <Gauge size={14} className={card.tone === "amber" ? "text-amber-300" : card.tone === "emerald" ? "text-emerald-300" : "text-blue-300"} />
                        </div>
                      </div>
                      <p className="mt-2 text-4xl font-semibold tracking-tight">{card.value}</p>
                      <p className="mt-1 text-xs text-slate-400">{card.trend}</p>
                      <div className="mt-3 h-8 rounded-lg bg-gradient-to-r from-blue-500/30 to-cyan-500/5" />
                    </motion.div>
                  ))}
                </div>

                <div className="grid gap-3 2xl:grid-cols-[2fr_1fr]">
                  <div className="rounded-2xl border border-slate-700/80 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(15,23,42,0.86))] p-4 shadow-[inset_0_1px_0_rgba(148,163,184,0.1)] backdrop-blur-sm">
                    <div className="mb-3 flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-slate-100">Recent Complaints</h2>
                      <GlowButton variant="ghost" className="px-3 py-1.5 text-xs" onClick={() => setSection("track")}>
                        View All
                      </GlowButton>
                    </div>
                    <div className="space-y-2">
                      {!ready ? (
                        <div className="rounded-xl border border-slate-700/70 bg-slate-950/45 p-3 text-sm text-slate-400">
                          Loading complaints...
                        </div>
                      ) : null}
                      {residentComplaints.slice(0, 4).map((row) => {
                        const worker = workers.find((w) => w.id === row.assignedWorkerId);
                        return (
                          <div key={row.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-700/70 bg-slate-950/45 p-3 shadow-[inset_0_1px_0_rgba(148,163,184,0.07)]">
                            <div className="flex items-center gap-3">
                              <div className="rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 p-2 text-white">
                                <Wrench size={14} />
                              </div>
                              <div>
                                <p className="font-medium text-slate-100">{row.title}</p>
                                <p className="text-xs text-slate-400">
                                  {row.category} • {row.priority}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-xs">
                              <span className={`rounded-full border px-2.5 py-1 ${statusClass(row.status)}`}>{row.status}</span>
                              <span className="text-slate-300">{worker ? `${worker.name} (${worker.role})` : "Unassigned"}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                    <div className="space-y-3">
                    <div className="rounded-2xl border border-slate-700/80 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(15,23,42,0.86))] p-4 shadow-[inset_0_1px_0_rgba(148,163,184,0.1)] backdrop-blur-sm">
                      <h3 className="text-lg font-semibold text-slate-100">Payment Summary</h3>
                      <div className="mt-3 rounded-xl border border-emerald-400/35 bg-gradient-to-br from-emerald-500/25 to-emerald-500/5 p-3">
                        <p className="text-xs text-emerald-200">Pending Dues</p>
                        <p className="mt-1 text-4xl font-semibold text-slate-100">Rs {pendingDue}</p>
                      </div>
                      <GlowButton className="mt-3 w-full justify-center" onClick={() => setSection("maintenance")}>
                        Pay Now
                      </GlowButton>
                    </div>
                    <div className="rounded-2xl border border-slate-700/80 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(15,23,42,0.86))] p-4 shadow-[inset_0_1px_0_rgba(148,163,184,0.1)] backdrop-blur-sm">
                      <h3 className="mb-3 text-lg font-semibold text-slate-100">Live Updates</h3>
                      <div className="space-y-2">
                        {activity.slice(0, 4).map((u) => (
                          <div key={u} className="rounded-lg border border-slate-800 bg-slate-950/55 p-2.5 text-xs text-slate-300">
                            {u}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}

            {section === "raise" ? (
              <div className="rounded-2xl border border-slate-700/80 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(15,23,42,0.86))] p-5 shadow-[inset_0_1px_0_rgba(148,163,184,0.1)] backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-slate-100">Raise Complaint</h2>
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Issue title" className="h-10 rounded-xl border border-slate-700 bg-slate-900 px-3 text-sm" />
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-10 rounded-xl border border-slate-700 bg-slate-900 px-3 text-sm">
                    <option>Plumbing</option><option>Electrical</option><option>Security</option><option>Painting</option>
                  </select>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="min-h-24 rounded-xl border border-slate-700 bg-slate-900 p-3 text-sm md:col-span-2" />
                  <select value={priority} onChange={(e) => setPriority(e.target.value as ComplaintPriority)} className="h-10 rounded-xl border border-slate-700 bg-slate-900 px-3 text-sm">
                    <option>Low</option><option>Medium</option><option>High</option>
                  </select>
                </div>
                <GlowButton className="mt-4" onClick={onCreateComplaint}>Create New Complaint</GlowButton>
              </div>
            ) : null}

            {section === "track" ? (
              <div className="rounded-2xl border border-slate-700/80 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(15,23,42,0.86))] p-5 shadow-[inset_0_1px_0_rgba(148,163,184,0.1)] backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-slate-100">Track Complaints</h2>
                <div className="mt-3 space-y-3">
                  {residentComplaints.map((c) => {
                    const worker = workers.find((w) => w.id === c.assignedWorkerId);
                    return (
                      <div key={c.id} className="rounded-xl border border-slate-700/70 bg-slate-950/45 p-3 shadow-[inset_0_1px_0_rgba(148,163,184,0.07)]">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium">{c.title}</p>
                          <span className={`rounded-full border px-2 py-0.5 text-xs ${statusClass(c.status)}`}>{c.status}</span>
                        </div>
                        <p className="mt-1 text-xs text-slate-400">{worker ? `${worker.name} (${worker.role}) • ${worker.phone}` : "Awaiting admin assignment"}</p>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-300">
                          {c.timeline.slice(-3).map((t) => <li key={t}>{t}</li>)}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {section === "maintenance" ? (
              <div className="rounded-2xl border border-slate-700/80 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(15,23,42,0.86))] p-5 shadow-[inset_0_1px_0_rgba(148,163,184,0.1)] backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-slate-100">Pay Maintenance</h2>
                <div className="mt-3 grid gap-2 md:grid-cols-3">
                  <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" className="h-10 rounded-xl border border-slate-700 bg-slate-900 px-3 text-sm" />
                  <input value={month} onChange={(e) => setMonth(e.target.value)} placeholder="Month" className="h-10 rounded-xl border border-slate-700 bg-slate-900 px-3 text-sm" />
                  <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" className="h-10 rounded-xl border border-slate-700 bg-slate-900 px-3 text-sm" />
                </div>
                <GlowButton className="mt-4" onClick={onPay}>Record Payment</GlowButton>
              </div>
            ) : null}

            {section === "payments" ? (
              <div className="rounded-2xl border border-slate-700/80 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(15,23,42,0.86))] p-5 shadow-[inset_0_1px_0_rgba(148,163,184,0.1)] backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-slate-100">My Payments</h2>
                <div className="mt-3 space-y-2">
                  {residentPayments.map((p) => (
                    <div key={p.id} className="flex items-center justify-between rounded-xl border border-slate-700/70 bg-slate-950/45 p-3 text-sm shadow-[inset_0_1px_0_rgba(148,163,184,0.07)]">
                      <span>{p.month} {p.year}</span>
                      <span>Rs {p.amount}</span>
                      <span className={`rounded-full border px-2 py-0.5 text-xs ${p.status === "Paid" ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-300" : "border-amber-400/40 bg-amber-500/15 text-amber-300"}`}>{p.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {["profile", "notifications", "help", "settings"].includes(section) ? (
              <div className="rounded-2xl border border-slate-700/70 bg-[linear-gradient(180deg,rgba(15,23,42,0.84),rgba(15,23,42,0.66))] p-5 shadow-[inset_0_1px_0_rgba(148,163,184,0.08)] backdrop-blur-2xl">
                <h2 className="text-xl font-semibold text-slate-100 capitalize">{section}</h2>
                <p className="mt-2 text-sm text-slate-400">This section is active and accessible from workflow navigation.</p>
                <GlowButton className="mt-4" onClick={() => setSection("dashboard")}>Back to Dashboard</GlowButton>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </main>
  );
}
