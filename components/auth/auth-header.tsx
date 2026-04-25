type AuthHeaderProps = {
  title: string;
  subtitle: string;
};

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-slate-100">{title}</h2>
      <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
    </div>
  );
}
