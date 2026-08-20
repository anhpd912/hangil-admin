import Link from "next/link";
import type { AdminStats } from "@/shared/api/types/admin-stats";
import { formatNumber } from "../lib/format";

type Row = { label: string; value: string; href?: string; highlight?: boolean };

export function ContentInventory({ stats }: { stats: AdminStats }) {
  const { content, proUsers, totalUsers } = stats;
  const publishRatio = content.lessonsTotal === 0 ? 0 : content.lessonsPublished / content.lessonsTotal;
  const proRatio = totalUsers === 0 ? 0 : proUsers / totalUsers;

  const rows: Row[] = [
    {
      label: "Bài học đã xuất bản",
      value: `${formatNumber(content.lessonsPublished)} / ${formatNumber(content.lessonsTotal)}`,
      href: "/admin/lessons",
    },
    { label: "Từ vựng", value: formatNumber(content.vocabularyTotal), href: "/admin/vocabulary" },
    { label: "Email waitlist", value: formatNumber(content.waitlistTotal), href: "/admin/waitlist" },
    {
      label: "Góp ý chưa xử lý",
      value: formatNumber(content.feedbackNew),
      href: "/admin/feedback",
      highlight: content.feedbackNew > 0,
    },
    { label: "Tài khoản Pro", value: `${formatNumber(proUsers)} · ${Math.round(proRatio * 100)}%`, href: "/admin/users" },
  ];

  return (
    <div className="flex h-full flex-col rounded-[1.75rem] border border-line bg-cream p-6">
      <p className="font-mono-label text-[11px] uppercase tracking-[0.12em] text-muted-ink">Kho nội dung</p>

      <div className="mt-4">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-dark/10">
          <div className="h-full rounded-full bg-dark" style={{ width: `${Math.round(publishRatio * 100)}%` }} />
        </div>
        <p className="mt-2 font-mono-label text-[11px] text-muted-ink">
          {content.lessonsTotal === 0
            ? "Chưa có bài học nào trong hệ thống"
            : `${Math.round(publishRatio * 100)}% bài học đã xuất bản`}
        </p>
      </div>

      <ul className="mt-5">
        {rows.map((row) => (
          <li key={row.label} className="border-b border-line last:border-b-0">
            <Link
              href={row.href ?? "#"}
              className="flex items-center justify-between gap-4 py-3 transition-colors hover:text-dark"
            >
              <span className="text-[14px] text-muted-ink">{row.label}</span>
              <span
                className={`tnum font-mono-label text-[13px] ${row.highlight ? "font-semibold text-red" : "text-dark"}`}
              >
                {row.value}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
