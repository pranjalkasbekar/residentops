import { cn } from "@/lib/utils";

type AuthInputProps = {
  label: string;
  value: string;
  type?: string;
  placeholder?: string;
  error?: string;
  onChange: (value: string) => void;
};

export function AuthInput({ label, value, type = "text", placeholder, error, onChange }: AuthInputProps) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs text-slate-400">{label}</span>
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-11 w-full rounded-xl border bg-slate-900/80 px-3 text-sm text-slate-100 placeholder:text-slate-500 transition focus:outline-none focus:ring-2",
          error
            ? "border-red-500/60 focus:ring-red-500/20"
            : "border-slate-700 focus:border-blue-400/70 focus:ring-blue-500/20",
        )}
      />
      {error ? <p className="text-xs text-red-300">{error}</p> : null}
    </label>
  );
}
