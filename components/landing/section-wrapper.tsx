import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type SectionWrapperProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export function SectionWrapper({ id, className, children }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24", className)}>
      {children}
    </section>
  );
}
