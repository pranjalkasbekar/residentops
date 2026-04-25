"use client";

import { db } from "@/lib/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { create } from "zustand";

export type ComplaintStatus = "Pending" | "In Progress" | "Completed";
export type ComplaintPriority = "Low" | "Medium" | "High";
export type WorkerRole = "Plumber" | "Electrician" | "Carpenter" | "Painter" | "Technician";

export type Worker = {
  id: string;
  name: string;
  role: WorkerRole;
  phone: string;
  availability: "Free" | "Busy";
};

export type Complaint = {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  residentUid?: string;
  residentName: string;
  createdAt: string;
  assignedWorkerId: string | null;
  timeline: string[];
};

export type PaymentRecord = {
  id: string;
  residentUid?: string;
  residentName: string;
  amount: number;
  month: string;
  year: string;
  status: "Paid" | "Pending" | "Overdue";
  createdAt: string;
};

type OpsState = {
  complaints: Complaint[];
  workers: Worker[];
  payments: PaymentRecord[];
  activity: string[];
  ready: boolean;
  initializeRealtime: () => void;
  createComplaint: (input: {
    title: string;
    description: string;
    category: string;
    priority: ComplaintPriority;
    residentUid: string;
    residentName: string;
  }) => Promise<Complaint>;
  assignWorker: (complaintId: string, workerId: string) => Promise<void>;
  updateComplaintStatus: (complaintId: string, status: ComplaintStatus) => Promise<void>;
  addTimelineUpdate: (complaintId: string, update: string) => Promise<void>;
  recordPayment: (input: { residentUid: string; residentName: string; amount: number; month: string; year: string }) => Promise<void>;
};

function formatTimestamp(ts: Timestamp | null | undefined) {
  if (!ts) return new Date().toLocaleString("en-IN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" });
  return ts.toDate().toLocaleString("en-IN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" });
}

let initialized = false;
let unsubscribers: Array<() => void> = [];
let seededWorkers = false;

async function ensureWorkersSeeded() {
  if (seededWorkers) return;
  const defaults: Worker[] = [
    { id: "w1", name: "John", role: "Plumber", phone: "+91 99111 22334", availability: "Free" },
    { id: "w2", name: "Sarah", role: "Electrician", phone: "+91 99222 33445", availability: "Free" },
    { id: "w3", name: "Alex", role: "Technician", phone: "+91 99333 44556", availability: "Free" },
  ];
  const batch = writeBatch(db);
  defaults.forEach((worker) => batch.set(doc(db, "workers", worker.id), worker, { merge: true }));
  await batch.commit();
  seededWorkers = true;
}

export const useOpsStore = create<OpsState>((set, get) => ({
  complaints: [],
  workers: [],
  payments: [],
  activity: [],
  ready: false,
  initializeRealtime: () => {
    if (initialized) return;
    initialized = true;

    ensureWorkersSeeded().catch(() => undefined);

    const complaintsUnsub = onSnapshot(
      query(collection(db, "complaints"), orderBy("createdAt", "desc")),
      (snap) => {
        const rows: Complaint[] = snap.docs.map((d) => {
          const data = d.data() as {
            title: string;
            description: string;
            category: string;
            priority: ComplaintPriority;
            status: ComplaintStatus;
            residentUid?: string;
            residentName: string;
            assignedWorkerId?: string | null;
            timeline?: string[];
            createdAt?: Timestamp;
          };
          return {
            id: d.id,
            title: data.title,
            description: data.description,
            category: data.category,
            priority: data.priority,
            status: data.status,
            residentUid: data.residentUid,
            residentName: data.residentName,
            assignedWorkerId: data.assignedWorkerId ?? null,
            timeline: data.timeline ?? [],
            createdAt: formatTimestamp(data.createdAt),
          };
        });
        set({ complaints: rows, ready: true });
      },
    );

    const workersUnsub = onSnapshot(query(collection(db, "workers"), orderBy("name", "asc")), (snap) => {
      const rows: Worker[] = snap.docs.map((d) => {
        const data = d.data() as Omit<Worker, "id">;
        return { id: d.id, ...data };
      });
      set({ workers: rows, ready: true });
    });

    const paymentsUnsub = onSnapshot(
      query(collection(db, "payments"), orderBy("createdAt", "desc")),
      (snap) => {
        const rows: PaymentRecord[] = snap.docs.map((d) => {
          const data = d.data() as {
            residentUid?: string;
            residentName: string;
            amount: number;
            month: string;
            year: string;
            status: "Paid" | "Pending" | "Overdue";
            createdAt?: Timestamp;
          };
          return {
            id: d.id,
            residentName: data.residentName,
            residentUid: data.residentUid,
            amount: data.amount,
            month: data.month,
            year: data.year,
            status: data.status,
            createdAt: formatTimestamp(data.createdAt),
          };
        });
        set({ payments: rows, ready: true });
      },
    );

    const activityUnsub = onSnapshot(query(collection(db, "activity"), orderBy("createdAt", "desc")), (snap) => {
      const rows = snap.docs.map((d) => {
        const data = d.data() as { message: string };
        return data.message;
      });
      set({ activity: rows.slice(0, 30), ready: true });
    });

    unsubscribers = [complaintsUnsub, workersUnsub, paymentsUnsub, activityUnsub];
  },

  createComplaint: async ({ title, description, category, priority, residentUid, residentName }) => {
    const payload = {
      title,
      description,
      category,
      priority,
      status: "Pending" as ComplaintStatus,
      residentUid,
      residentName,
      assignedWorkerId: null,
      timeline: ["Complaint created"],
      createdAt: serverTimestamp(),
    };
    const ref = await addDoc(collection(db, "complaints"), payload);
    await addDoc(collection(db, "activity"), {
      message: `New complaint created: ${title}`,
      createdAt: serverTimestamp(),
    });
    return {
      id: ref.id,
      ...payload,
      createdAt: new Date().toLocaleString("en-IN"),
    };
  },

  assignWorker: async (complaintId, workerId) => {
    const worker = get().workers.find((w) => w.id === workerId);
    if (!worker) return;
    const complaint = get().complaints.find((c) => c.id === complaintId);
    const timeline = complaint ? [...complaint.timeline, `Assigned to ${worker.name}`] : [`Assigned to ${worker.name}`];

    await updateDoc(doc(db, "complaints", complaintId), {
      assignedWorkerId: workerId,
      status: "In Progress",
      timeline,
    });
    await updateDoc(doc(db, "workers", workerId), { availability: "Busy" });
    await addDoc(collection(db, "activity"), {
      message: `${worker.name} assigned to complaint`,
      createdAt: serverTimestamp(),
    });
  },

  updateComplaintStatus: async (complaintId, status) => {
    const complaint = get().complaints.find((c) => c.id === complaintId);
    const timeline = complaint ? [...complaint.timeline, `Status changed to ${status}`] : [`Status changed to ${status}`];
    await updateDoc(doc(db, "complaints", complaintId), { status, timeline });
    await addDoc(collection(db, "activity"), {
      message: `Complaint status updated to ${status}`,
      createdAt: serverTimestamp(),
    });
  },

  addTimelineUpdate: async (complaintId, update) => {
    if (!update.trim()) return;
    const complaint = get().complaints.find((c) => c.id === complaintId);
    const timeline = complaint ? [...complaint.timeline, update] : [update];
    await updateDoc(doc(db, "complaints", complaintId), { timeline });
    await addDoc(collection(db, "activity"), {
      message: `Timeline update: ${update}`,
      createdAt: serverTimestamp(),
    });
  },

  recordPayment: async ({ residentUid, residentName, amount, month, year }) => {
    await addDoc(collection(db, "payments"), {
      residentUid,
      residentName,
      amount,
      month,
      year,
      status: "Paid",
      createdAt: serverTimestamp(),
    });
    await addDoc(collection(db, "activity"), {
      message: `Payment received Rs ${amount}`,
      createdAt: serverTimestamp(),
    });
  },
}));

export function disposeOpsStoreListeners() {
  unsubscribers.forEach((fn) => fn());
  unsubscribers = [];
  initialized = false;
}
