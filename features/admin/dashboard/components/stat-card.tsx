import Link from "next/link";

type StatCardProps = {
  label: string;
  value: string | number;
  delta?: string;
  deltaTone?: "positive" | "warning";
  href?: string;
};

export function StatCard({ label, value, delta, deltaTone = "positive", href }: StatCardProps) {
  const deltaClass = deltaTone === "warning" ? "text-red" : "text-emerald-600";

  const content = (
    <div className="rounded-2xl border border-dark/15 bg-cream p-5">
      <p className="font-mono-label text-[11px] uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-2 text-3xl font-black text-dark">{value}</p>
      {delta && <p className={`font-mono-label mt-1 text-xs ${deltaClass}`}>{delta}</p>}
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
