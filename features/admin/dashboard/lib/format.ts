import type { MetricTrend } from "@/shared/api/types/admin-stats";

const VN_TIMEZONE = "Asia/Ho_Chi_Minh";

const numberFormatter = new Intl.NumberFormat("vi-VN");

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

export function formatClock(iso: string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    timeZone: VN_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

/** Nhãn ngắn cho trục ngang biểu đồ: "T2 · 18/08". */
export function formatDayLabel(dateKey: string): { weekday: string; day: string } {
  const date = new Date(`${dateKey}T12:00:00+07:00`);
  const weekday = new Intl.DateTimeFormat("vi-VN", { timeZone: VN_TIMEZONE, weekday: "short" }).format(date);
  const day = new Intl.DateTimeFormat("vi-VN", { timeZone: VN_TIMEZONE, day: "2-digit", month: "2-digit" }).format(date);
  return { weekday, day };
}

const RELATIVE_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365 * 24 * 60],
  ["month", 30 * 24 * 60],
  ["day", 24 * 60],
  ["hour", 60],
  ["minute", 1],
];

const relativeFormatter = new Intl.RelativeTimeFormat("vi", { numeric: "auto" });

/** "3 giờ trước" — tính theo phút nên không lệch khi client khác múi giờ server. */
export function formatRelative(iso: string, now: number = Date.now()): string {
  const diffMinutes = Math.round((new Date(iso).getTime() - now) / 60_000);
  const absolute = Math.abs(diffMinutes);
  if (absolute < 1) return "vừa xong";

  for (const [unit, minutesPerUnit] of RELATIVE_UNITS) {
    if (absolute >= minutesPerUnit) {
      return relativeFormatter.format(Math.round(diffMinutes / minutesPerUnit), unit);
    }
  }
  return relativeFormatter.format(diffMinutes, "minute");
}

export type TrendView = {
  label: string;
  direction: "up" | "down" | "flat";
};

/**
 * So sánh 7 ngày gần nhất với 7 ngày liền trước. Mốc trước bằng 0 thì phần trăm
 * vô nghĩa, hiển thị số tuyệt đối để không in ra "+∞%".
 */
export function describeTrend(trend: MetricTrend): TrendView {
  const delta = trend.current - trend.previous;
  if (delta === 0) return { label: "không đổi so với 7 ngày trước", direction: "flat" };

  const sign = delta > 0 ? "+" : "−";
  const magnitude = Math.abs(delta);
  const direction = delta > 0 ? "up" : "down";

  if (trend.previous === 0) {
    return { label: `${sign}${formatNumber(magnitude)} so với 7 ngày trước`, direction };
  }

  const percent = Math.round((delta / trend.previous) * 100);
  return { label: `${sign}${Math.abs(percent)}% so với 7 ngày trước`, direction };
}
