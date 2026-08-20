"use client";

import { useState } from "react";
import type { DailyPoint, Timeseries } from "@/shared/api/types/admin-stats";
import { formatDayLabel, formatNumber } from "../lib/format";

type MetricKey = "lessonsCompleted" | "activeLearners" | "newUsers";

const METRICS: { key: MetricKey; label: string; unit: string }[] = [
  { key: "lessonsCompleted", label: "Bài học hoàn thành", unit: "lượt" },
  { key: "activeLearners", label: "Học viên hoạt động", unit: "người" },
  { key: "newUsers", label: "Người dùng mới", unit: "tài khoản" },
];

const CHART_HEIGHT_PX = 168;
/** Cột giá trị 0 vẫn vẽ 2px để trục ngang không bị đứt quãng. */
const MIN_BAR_PX = 2;

function barHeight(value: number, max: number): number {
  if (max <= 0 || value <= 0) return MIN_BAR_PX;
  return Math.max(MIN_BAR_PX, Math.round((value / max) * CHART_HEIGHT_PX));
}

function isToday(point: DailyPoint, points: DailyPoint[]): boolean {
  return point.date === points[points.length - 1]?.date;
}

export function DailyActivityChart({ timeseries }: { timeseries: Timeseries }) {
  const [metric, setMetric] = useState<MetricKey>("lessonsCompleted");
  const points = timeseries.points;
  const active = METRICS.find((item) => item.key === metric) ?? METRICS[0];
  const values = points.map((point) => point[metric]);
  const max = Math.max(...values, 0);
  const total = values.reduce((sum, value) => sum + value, 0);

  return (
    <div className="flex h-full flex-col rounded-[1.75rem] border border-line bg-cream p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono-label text-[11px] uppercase tracking-[0.12em] text-muted-ink">
            {timeseries.days} ngày gần nhất · giờ VN
          </p>
          <p className="tnum mt-2 text-[1.75rem] font-extrabold leading-none text-dark">{formatNumber(total)}</p>
          <p className="mt-1 text-[13px] text-muted-ink">
            {active.label.toLowerCase()} — tổng {formatNumber(total)} {active.unit}
          </p>
        </div>

        <div role="tablist" aria-label="Chọn chỉ số" className="flex flex-wrap gap-1.5">
          {METRICS.map((item) => (
            <button
              key={item.key}
              role="tab"
              aria-selected={item.key === metric}
              onClick={() => setMetric(item.key)}
              className={`font-mono-label rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.08em] transition-colors ${
                item.key === metric
                  ? "border-dark bg-dark text-parchment"
                  : "border-line text-muted-ink hover:border-line-strong hover:text-dark"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {max === 0 ? (
        <div
          className="mt-8 flex flex-1 items-center rounded-2xl border border-dashed border-line-strong px-5"
          style={{ minHeight: CHART_HEIGHT_PX }}
        >
          <p className="max-w-[40ch] text-[14px] leading-6 text-muted-ink">
            Chưa có {active.label.toLowerCase()} nào trong {timeseries.days} ngày qua. Biểu đồ sẽ tự hiện khi có dữ
            liệu thật.
          </p>
        </div>
      ) : (
        <div className="mt-8 flex flex-1 items-end gap-[3px]" style={{ minHeight: CHART_HEIGHT_PX }}>
          {points.map((point) => {
            const value = point[metric];
            const { weekday, day } = formatDayLabel(point.date);
            return (
              <div key={point.date} className="group flex flex-1 flex-col items-center justify-end gap-2">
                <span className="tnum font-mono-label text-[10px] leading-3 text-muted opacity-0 transition-opacity group-hover:opacity-100">
                  {formatNumber(value)}
                </span>
                <div
                  title={`${weekday} ${day}: ${formatNumber(value)} ${active.unit}`}
                  style={{ height: barHeight(value, max) }}
                  className={`w-full rounded-t-[4px] transition-colors ${
                    isToday(point, points) ? "bg-red" : "bg-dark/75 group-hover:bg-dark"
                  }`}
                />
                <span className="tnum font-mono-label text-[9px] leading-3 text-muted">{day.slice(0, 2)}</span>
              </div>
            );
          })}
        </div>
      )}

      <p className="mt-4 border-t border-line pt-3 font-mono-label text-[11px] text-muted-ink">
        {max === 0
          ? `Khoảng thống kê: ${points[0]?.date} → ${points[points.length - 1]?.date}`
          : `Cao nhất ${formatNumber(max)} ${active.unit}/ngày · cột đỏ là hôm nay`}
      </p>
    </div>
  );
}
