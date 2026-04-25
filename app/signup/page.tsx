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

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
};

export default function SignupPage() {
  const router = useRouter();
  const { signup, isLoading, user, initializeAuth } = useAuthStore();
  const initialRole: AuthRole =
    typeof window !== "undefined"
      ? (() => {
          const roleParam = new URLSearchParams(window.location.search).get("role");
          return roleParam === "ADMIN" || roleParam === "RESIDENT" ? roleParam : "RESIDENT";
        })()
      : "RESIDENT";
  const [role, setRole] = useState<AuthRole>(initialRole);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!user) return;
    router.push(user.role === "ADMIN" ? "/admin" : "/resident");
  }, [user, router]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const next: FormErrors = {};
    if (!name.trim()) next.name = "Full name is required.";
    if (!/\S+@\S+\.\S+/.test(email)) next.email = "Enter a valid email.";
    if (!/^[0-9]{10}$/.test(phone)) next.phone = "Enter a 10-digit phone number.";
    if (password.length < 8) next.password = "Use at least 8 characters.";
    if (confirmPassword !== password) next.confirmPassword = "Passwords do not match.";
    setErrors(next);
    if (Object.keys(next).length) return;

    try {
      const user = await signup({ name, email, phone, password, role });
      toast.success("Account created");
      router.push(user.role === "ADMIN" ? "/admin" : "/resident");
    } catch {
      toast.error("Unable to create account");
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
          <AuthHeader title="Create Account" subtitle="Get started with HomeOps in minutes." />
          <div className="mt-6 space-y-3">
            <RoleSelector value={role} onChange={setRole} />
            <AuthInput label="Full Name" value={name} onChange={setName} error={errors.name} placeholder="Aarav Shah" />
            <AuthInput label="Email" value={email} onChange={setEmail} error={errors.email} placeholder="you@email.com" />
            <AuthInput label="Phone" value={phone} onChange={setPhone} error={errors.phone} placeholder="9876543210" />
            <AuthInput
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              error={errors.password}
              placeholder="Create a strong password"
            />
            <AuthInput
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              error={errors.confirmPassword}
              placeholder="Re-enter password"
            />
            <GlowButton type="submit" className="w-full justify-center">
              {isLoading ? "Creating account..." : "Create Account"}
            </GlowButton>
            <p className="text-center text-xs text-slate-400">
              Already have an account?{" "}
              <Link href={`/login?role=${role}`} className="text-blue-300 hover:text-blue-200">
                Sign in
              </Link>
            </p>
          </div>
        </AuthCard>
      </motion.form>
    </AuthLayout>
  );
}
