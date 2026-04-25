"use client";

import { motion } from "framer-motion";
import { Building2, UserRound } from "lucide-react";

type AuthRole = "ADMIN" | "RESIDENT";

type RoleSelectorProps = {
  value: AuthRole;
  onChange: (role: AuthRole) => void;
};

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  const items: { id: AuthRole; label: string; icon: typeof Building2 }[] = [
    { id: "RESIDENT", label: "Resident", icon: UserRound },
    { id: "ADMIN", label: "Admin", icon: Building2 },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((item) => {
        const active = value === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`relative rounded-xl border p-3 text-left transition ${
              active ? "border-blue-400/60 text-slate-100" : "border-slate-700 text-slate-400 hover:text-slate-200"
            }`}
          >
            {active ? (
              <motion.span
                layoutId="auth-role"
                className="absolute inset-0 -z-10 rounded-xl bg-blue-500/15 shadow-[0_0_24px_rgba(56,189,248,0.25)]"
              />
            ) : null}
            <item.icon size={14} className="mb-2 text-blue-300" />
            <p className="text-xs font-medium">{item.label}</p>
          </button>
        );
      })}
    </div>
  );
}
