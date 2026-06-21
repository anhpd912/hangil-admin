type BadgeProps = {
  children: React.ReactNode;
  active?: boolean;
};

export function Badge({ children, active = false }: BadgeProps) {
  const style = active ? "bg-red text-parchment border-red" : "border-dark/20 text-muted";
  return (
    <span
      className={`font-mono-label rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-wide ${style}`}
    >
      {children}
    </span>
  );
}
