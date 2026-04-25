import { Inbox } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-10 text-center">
      <div className="mb-3 rounded-full border border-slate-700 bg-slate-800 p-3 text-slate-400">
        <Inbox size={18} />
      </div>
      <h4 className="text-sm font-semibold text-slate-200">{title}</h4>
      <p className="mt-1 max-w-sm text-sm text-slate-400">{description}</p>
    </div>
  );
}
