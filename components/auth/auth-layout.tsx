"use client";

import { DashboardPreviewMock } from "@/components/landing/dashboard-preview-mock";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle: string;
};

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const router = useRouter();

  return (
    <main className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
      <section className="relative hidden overflow-hidden border-r border-slate-800 bg-[radial-gradient(circle_at_22%_20%,rgba(56,189,248,0.22),transparent_36%),radial-gradient(circle_at_78%_22%,rgba(59,130,246,0.18),transparent_38%),#0B1220] p-8 xl:p-10 lg:block">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(148,163,184,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.5)_1px,transparent_1px)] [background-size:36px_36px]" />
        <div className="relative z-10 flex min-h-full flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">HomeOps</p>
            <h1 className="mt-4 max-w-lg text-4xl font-semibold tracking-tight text-slate-100">{title}</h1>
            <p className="mt-4 max-w-lg text-sm text-slate-400">{subtitle}</p>
          </motion.div>
          <div className="mt-10 max-w-2xl">
            <DashboardPreviewMock liveFlicker />
          </div>
        </div>
      </section>
      <section className="relative bg-[#0B1220] p-4 md:p-6 lg:p-8">
        <div className="absolute left-4 top-4 z-10 flex gap-2 md:left-8 md:top-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs text-slate-300 transition hover:border-blue-400/55 hover:text-blue-200"
          >
            <ArrowLeft size={13} />
            Back
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs text-slate-300 transition hover:border-blue-400/55 hover:text-blue-200"
          >
            <Home size={13} />
            Home
          </Link>
        </div>
        <div className="mx-auto flex min-h-full w-full max-w-xl items-center justify-center pt-16 md:pt-0">
          <div className="w-full">
            <div className="mb-5 lg:hidden">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">HomeOps</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-100">Run Your Society Like a System</h1>
            </div>
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
