import { type Role } from "@/store/use-auth-store";
import { type ReactNode } from "react";

type RoleGuardProps = {
  role: Role;
  allow: Role[];
  children: ReactNode;
  fallback?: ReactNode;
};

export function RoleGuard({ role, allow, children, fallback = null }: RoleGuardProps) {
  if (!allow.includes(role)) return <>{fallback}</>;
  return <>{children}</>;
}
