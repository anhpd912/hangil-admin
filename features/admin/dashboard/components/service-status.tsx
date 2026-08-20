import type { ServiceCheck, ServiceHealth, ServiceStatus } from "@/shared/api/types/admin-stats";
import { formatClock } from "../lib/format";

const STATUS_VIEW: Record<ServiceStatus, { dot: string; label: string; text: string }> = {
  operational: { dot: "bg-ok", label: "Ổn định", text: "text-muted-ink" },
  degraded: { dot: "bg-amber-600", label: "Chậm", text: "text-amber-700" },
  down: { dot: "bg-red", label: "Lỗi", text: "text-red" },
  unconfigured: { dot: "bg-muted", label: "Chưa cấu hình", text: "text-muted-ink" },
};

function ServiceRow({ service }: { service: ServiceCheck }) {
  const view = STATUS_VIEW[service.status];
  return (
    <li className="flex items-center justify-between gap-4 border-b border-line py-3 last:border-b-0">
      <span className="flex min-w-0 items-center gap-3">
        <span className={`h-2 w-2 shrink-0 rounded-full ${view.dot}`} aria-hidden="true" />
        <span className="truncate text-[14px] text-dark">{service.name}</span>
      </span>
      <span className={`font-mono-label shrink-0 text-right text-[11px] ${view.text}`}>
        <span className="tnum">{service.detail}</span>
        <span className="ml-2 uppercase tracking-[0.08em] text-muted">{view.label}</span>
      </span>
    </li>
  );
}

export function ServiceStatusPanel({ health }: { health: ServiceHealth }) {
  const problems = health.services.filter((service) => service.status !== "operational").length;

  return (
    <div className="flex h-full flex-col rounded-[1.75rem] border border-line bg-cream p-6">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-mono-label text-[11px] uppercase tracking-[0.12em] text-muted-ink">Trạng thái dịch vụ</p>
        <span className="font-mono-label tnum text-[11px] text-muted">{formatClock(health.checkedAt)}</span>
      </div>

      <p className="mt-3 text-[14px] leading-6 text-dark">
        {problems === 0
          ? "Tất cả phụ thuộc đang hoạt động bình thường."
          : `${problems} dịch vụ cần chú ý.`}
      </p>

      <ul className="mt-4">
        {health.services.map((service) => (
          <ServiceRow key={service.id} service={service} />
        ))}
      </ul>
    </div>
  );
}
