"use client";

import { AuthCard } from "@/components/auth/auth-card";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthInput } from "@/components/auth/auth-input";
import { AuthLayout } from "@/components/auth/auth-layout";
import { RoleSelector } from "@/components/auth/role-selector";
import { GlowButton } from "@/components/ui/glow-button";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/use-auth-store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type AuthRole = "ADMIN" | "RESIDENT";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, user, initializeAuth } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const initialRole: AuthRole =
    typeof window !== "undefined"
      ? (() => {
          const roleParam = new URLSearchParams(window.location.search).get("role");
          return roleParam === "ADMIN" || roleParam === "RESIDENT" ? roleParam : "RESIDENT";
        })()
      : "RESIDENT";
  const [role, setRole] = useState<AuthRole>(initialRole);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!user) return;
    router.push(user.role === "ADMIN" ? "/admin" : "/resident");
  }, [user, router]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: { email?: string; password?: string } = {};
    if (!/\S+@\S+\.\S+/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (password.length < 6) nextErrors.password = "Password must be at least 6 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      const user = await login({ email, password, role, remember });
      toast.success("Signed in successfully");
      router.push(user.role === "ADMIN" ? "/admin" : "/resident");
    } catch {
      toast.error("Invalid credentials");
    }
  };

  return (
    <AuthLayout
      title="Run Your Society Like a System"
      subtitle="Manage complaints, track operations, and handle payments seamlessly."
    >
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full"
      >
        <AuthCard>
          <AuthHeader title="Sign In" subtitle="Access your HomeOps command center." />
          <div className="mt-6 space-y-4">
            <RoleSelector value={role} onChange={setRole} />
            <AuthInput
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="admin@homeops.com"
              error={errors.email}
            />
            <AuthInput
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              error={errors.password}
            />
            <div className="flex items-center justify-between text-xs">
              <label className="inline-flex items-center gap-2 text-slate-400">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-slate-600 bg-slate-900"
                />
                Remember me
              </label>
              <button type="button" className="text-blue-300 hover:text-blue-200">
                Forgot password?
              </button>
            </div>
            <GlowButton type="submit" className="w-full justify-center">
              {isLoading ? "Signing in..." : "Sign In"}
            </GlowButton>
            <p className="text-center text-xs text-slate-400">
              Don&apos;t have an account?{" "}
              <Link href={`/signup?role=${role}`} className="text-blue-300 hover:text-blue-200">
                Sign up
              </Link>
            </p>
          </div>
        </AuthCard>
      </motion.form>
    </AuthLayout>
  );
}
