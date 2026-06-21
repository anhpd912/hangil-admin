/** Dữ liệu mẫu — BE chưa có health-check endpoint cho từng service, wire sau khi có. */
const SAMPLE_SERVICES = [
  { name: "Database Cluster", status: "operational" as const, detail: "OPERATIONAL" },
  { name: "OpenAI Gateway", status: "operational" as const, detail: "24ms LATENCY" },
  { name: "Image CDN", status: "degraded" as const, detail: "DEGRADED" },
];

const DOT_CLASS: Record<string, string> = {
  operational: "bg-emerald-500",
  degraded: "bg-red",
};

export function ServiceStatus() {
  return (
    <div className="rounded-2xl border border-dark/15 bg-cream p-5">
      <p className="font-mono-label text-[11px] uppercase tracking-wide text-muted">
        Trạng thái dịch vụ — dữ liệu mẫu
      </p>
      <div className="mt-4 flex flex-col gap-3">
        {SAMPLE_SERVICES.map((s) => (
          <div key={s.name} className="flex items-center justify-between text-sm">
            <span className="text-dark">{s.name}</span>
            <span className="font-mono-label flex items-center gap-2 text-[10px] uppercase text-muted">
              <span className={`h-1.5 w-1.5 rounded-full ${DOT_CLASS[s.status]}`} />
              {s.detail}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
