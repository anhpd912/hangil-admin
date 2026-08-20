import Link from "next/link";
import type { MetricTrend } from "@/shared/api/types/admin-stats";
import { describeTrend, formatNumber } from "../lib/format";

type StatCardProps = {
  /** Chỉ số thứ tự kiểu tạp chí; bỏ trống khi card đứng ngoài lưới có đánh số. */
  index?: number;
  label: string;
  value: number | string;
  trend?: MetricTrend;
  caption?: string;
  href?: string;
};

const DIRECTION_STYLE = {
  up: { glyph: "↑", className: "text-ok" },
  down: { glyph: "↓", className: "text-red" },
  flat: { glyph: "→", className: "text-muted-ink" },
} as const;

export function StatCard({ index, label, value, trend, caption, href }: StatCardProps) {
  const view = trend ? describeTrend(trend) : null;
  const direction = view ? DIRECTION_STYLE[view.direction] : null;

  const body = (
    <div className="group flex h-full flex-col justify-between rounded-[1.75rem] border border-line bg-cream p-6 transition-colors hover:border-line-strong">
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono-label text-[11px] uppercase leading-4 tracking-[0.12em] text-muted-ink">{label}</p>
        {index !== undefined && (
          <span className="font-mono-label text-[11px] text-muted">{String(index).padStart(2, "0")}</span>
        )}
      </div>

      <p className="tnum mt-5 text-[2.5rem] font-extrabold leading-none text-dark">{typeof value === "number" ? formatNumber(value) : value}</p>

      <div className="mt-4 min-h-[2.5rem]">
        {view && direction && (
          <p className={`font-mono-label text-[11px] leading-5 ${direction.className}`}>
            <span aria-hidden="true">{direction.glyph} </span>
            {view.label}
          </p>
        )}
        {!view && caption && <p className="font-mono-label text-[11px] leading-5 text-muted-ink">{caption}</p>}
      </div>

      {/* Luôn giữ chỗ chân card để hàng 4 card thẳng hàng dù chỉ vài card có link. */}
      <p className="mt-auto border-t border-line pt-3 text-[13px] text-muted-ink transition-colors group-hover:text-dark">
        {href ? (
          <>
            Xem chi tiết <span aria-hidden="true">→</span>
          </>
        ) : (
          <span className="font-mono-label text-[11px] text-muted">chỉ số hệ thống</span>
        )}
      </p>
    </div>
  );

  return href ? (
    <Link href={href} className="block h-full rounded-[1.75rem]">
      {body}
    </Link>
  ) : (
    body
  );
}
