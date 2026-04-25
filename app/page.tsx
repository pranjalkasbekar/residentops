"use client";

import { AnimatedHeading } from "@/components/landing/animated-heading";
import { DashboardPreviewMock } from "@/components/landing/dashboard-preview-mock";
import { FeatureCard } from "@/components/landing/feature-card";
import { SectionWrapper } from "@/components/landing/section-wrapper";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Activity,
  ArrowRight,
  Building2,
  CreditCard,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Wrench,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Raise Complaints",
    description: "Structured issue capture with category, priority, and context.",
  },
  {
    icon: Activity,
    title: "Track Status",
    description: "Watch every update from acknowledgment to closure in one timeline.",
  },
  {
    icon: UserCheck,
    title: "Assign Workers",
    description: "Route tasks to technicians with clear ownership and accountability.",
  },
  {
    icon: CreditCard,
    title: "Payment Management",
    description: "Collect maintenance dues, monitor settlements, and reduce leakage.",
  },
  {
    icon: Sparkles,
    title: "Real-time Updates",
    description: "Instant notifications across residents, admins, and operational teams.",
  },
  {
    icon: Activity,
    title: "Analytics",
    description: "Understand complaint and revenue trends with live dashboard intelligence.",
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative overflow-hidden pb-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(59,130,246,0.14),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(148,163,184,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.4)_1px,transparent_1px)] [background-size:40px_40px]" />

      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${
          scrolled
            ? "border-slate-700/80 bg-slate-950/65 backdrop-blur-xl"
            : "border-transparent bg-transparent backdrop-blur-0"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-8">
          <p className="text-sm font-semibold tracking-wide text-slate-100">HomeOps</p>
          <nav className="hidden items-center gap-6 text-sm text-slate-400 md:flex">
            <a href="#features" className="transition hover:text-slate-200">
              Features
            </a>
            <a href="#live-preview" className="transition hover:text-slate-200">
              Preview
            </a>
            <a href="#cta" className="transition hover:text-slate-200">
              Get Started
            </a>
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Link href="/login">
              <GlowButton variant="ghost" className="text-xs">
                Login
              </GlowButton>
            </Link>
            <Link href="/signup">
              <GlowButton className="text-xs">Sign up</GlowButton>
            </Link>
          </div>
        </div>
      </header>

      <SectionWrapper className="pt-12 md:pt-20">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/35 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
              <Sparkles size={14} />
              Residential Operations Platform
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-100 md:text-6xl">
              <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Modern Residential Operations
              </span>
              <br />
              <span className="leading-[0.95] text-slate-100">Simplified</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm text-slate-400 md:text-base">
              Manage complaints, track tasks, and handle maintenance seamlessly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup?role=RESIDENT">
                <GlowButton>
                  Get Started <ArrowRight size={14} />
                </GlowButton>
              </Link>
              <Link href="/login?role=ADMIN">
                <GlowButton variant="secondary">View Demo</GlowButton>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <DashboardPreviewMock scale="xl" liveFlicker />
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        id="product-split"
        className="relative before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.1),transparent_50%)] before:content-['']"
      >
        <div className="relative">
          <AnimatedHeading
            eyebrow="Product Split"
            title="Built for every role in your community"
            subtitle="Two focused experiences, one synchronized source of truth."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <motion.div whileHover={{ y: -8, rotateX: 4, rotateY: -4 }} transition={{ duration: 0.2 }}>
              <GlassCard className="relative overflow-hidden">
                <div className="pointer-events-none absolute -right-20 -top-16 h-44 w-44 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="mb-5 flex items-center gap-3">
                  <Building2 className="text-blue-300" />
                  <h2 className="text-lg font-semibold text-slate-100">Resident Dashboard</h2>
                </div>
                <p className="mb-6 text-sm text-slate-400">
                  Raise complaints, track worker updates, and pay maintenance dues.
                </p>
                <Link href="/login?role=RESIDENT">
                  <GlowButton className="w-full">Open Resident View</GlowButton>
                </Link>
              </GlassCard>
            </motion.div>
            <motion.div whileHover={{ y: -8, rotateX: 4, rotateY: 4 }} transition={{ duration: 0.2 }}>
              <GlassCard className="relative overflow-hidden">
                <div className="pointer-events-none absolute -right-20 -top-16 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" />
                <div className="mb-5 flex items-center gap-3">
                  <ShieldCheck className="text-blue-300" />
                  <h2 className="text-lg font-semibold text-slate-100">Admin Dashboard</h2>
                </div>
                <p className="mb-6 text-sm text-slate-400">
                  Manage residents, triage complaints, monitor payments, and review trends.
                </p>
                <Link href="/login?role=ADMIN">
                  <GlowButton variant="secondary" className="w-full">
                    Open Admin View
                  </GlowButton>
                </Link>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="features" className="bg-transparent">
        <div className="rounded-3xl border border-slate-800/40 bg-slate-950/25 p-6 md:p-8">
          <AnimatedHeading
            eyebrow="Capabilities"
            title="Stop Managing Chaos. Start Running Systems."
            subtitle="Precision tooling for faster issue resolution and happier residents."
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="mt-10 grid gap-4 md:grid-cols-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                className={
                  index === 0
                    ? "md:col-span-2 md:row-span-2"
                    : index <= 2
                      ? "md:col-span-2"
                      : "md:col-span-1"
                }
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        id="live-preview"
        className="relative before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_70%_40%,rgba(56,189,248,0.12),transparent_50%)] before:content-['']"
      >
        <div className="relative">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <AnimatedHeading
              eyebrow="Live Preview"
              title="See Every Issue. Control Every Outcome."
              subtitle="HomeOps mirrors modern product operations with clean interfaces, live states, and high signal data."
            />
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-3xl border border-slate-800 bg-slate-900/50 p-4 shadow-[0_35px_90px_rgba(2,6,23,0.65)]"
            >
              <DashboardPreviewMock scale="xl" liveFlicker />
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="how-it-works">
        <AnimatedHeading
          eyebrow="How It Works"
          title="From issue raised to issue resolved"
          subtitle="Fast, accountable execution without fragmented communication."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { title: "Raise Issue", desc: "Residents submit a structured complaint with clear priority.", icon: Sparkles },
            { title: "Assign Worker", desc: "Admins route work instantly to the right technician.", icon: Wrench },
            { title: "Track & Resolve", desc: "Updates flow live until closure and resident confirmation.", icon: Activity },
          ].map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08 }}
            >
              <GlassCard>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
                  Step 0{index + 1}
                </p>
                <div className="mb-4 inline-flex rounded-lg border border-blue-400/35 bg-blue-500/10 p-2 text-blue-300">
                  <step.icon size={16} />
                </div>
                <h3 className="text-base font-semibold text-slate-100">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{step.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="cta">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="relative overflow-hidden rounded-3xl border border-blue-400/30 bg-slate-900/70 p-12 text-center shadow-[0_28px_90px_rgba(56,189,248,0.2)] md:p-16"
        >
          <motion.div
            animate={{ opacity: [0.22, 0.35, 0.22], scale: [1, 1.03, 1] }}
            transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY }}
            className="pointer-events-none absolute inset-0"
          />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl" />
          <h3 className="relative text-3xl font-semibold tracking-tight text-slate-100 md:text-5xl">
            Run Your Society Like a Modern System
          </h3>
          <p className="relative mx-auto mt-4 max-w-xl text-sm text-slate-400 md:text-base">
            From complaints to payments - everything in one command center.
          </p>
          <div className="relative mt-8">
            <Link href="/signup?role=RESIDENT">
              <GlowButton className="px-8 py-3 text-base">Launch Your Operations Hub</GlowButton>
            </Link>
          </div>
        </motion.div>
      </SectionWrapper>

      <footer className="mx-auto mt-8 flex w-full max-w-7xl flex-col gap-3 border-t border-slate-800 px-4 py-8 text-sm md:flex-row md:items-center md:justify-between md:px-8">
        <p className="text-slate-300">HomeOps</p>
        <div className="flex gap-4 text-slate-400">
          <a className="transition hover:text-slate-200" href="#features">
            Features
          </a>
          <a className="transition hover:text-slate-200" href="#live-preview">
            Preview
          </a>
          <a className="transition hover:text-slate-200" href="#cta">
            Get Started
          </a>
        </div>
      </footer>
    </main>
  );
}
