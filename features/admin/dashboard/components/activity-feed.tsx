"use client";

import Link from "next/link";
import type { ActivityItem, ActivityKind } from "@/shared/api/types/admin-stats";
import { formatClock, formatRelative } from "../lib/format";

const KIND_VIEW: Record<ActivityKind, { label: string; href?: string; accent: boolean }> = {
  signup: { label: "Đăng ký", href: "/admin/users", accent: false },
  lesson_completed: { label: "Bài học", href: "/admin/lessons", accent: false },
  journal: { label: "AI chấm", accent: false },
  feedback: { label: "Góp ý", href: "/admin/feedback", accent: true },
  waitlist: { label: "Waitlist", href: "/admin/waitlist", accent: false },
};

function KindChip({ kind }: { kind: ActivityKind }) {
  const view = KIND_VIEW[kind];
  const style = view.accent ? "border-red/40 text-red" : "border-line-strong text-muted-ink";
  return (
    <span
      className={`font-mono-label inline-block shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.08em] ${style}`}
    >
      {view.label}
    </span>
  );
}

function ActivityRow({ item }: { item: ActivityItem }) {
  const view = KIND_VIEW[item.kind];

  const row = (
    <div className="grid grid-cols-[128px_minmax(0,1fr)] items-baseline gap-x-6 gap-y-1 py-3.5 md:grid-cols-[168px_minmax(0,1fr)_auto]">
      <div className="font-mono-label text-[11px] leading-5 text-muted-ink">
        <span className="tnum">{formatClock(item.at)}</span>
        <span className="tnum ml-2 text-muted">{formatRelative(item.at)}</span>
      </div>

      <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
        <KindChip kind={item.kind} />
        <span className="text-[14px] leading-6 text-dark">{item.detail}</span>
      </div>

      <div className="col-start-2 truncate font-mono-label text-[11px] text-muted-ink md:col-start-3 md:text-right">
        {item.actor}
      </div>
    </div>
  );

  return (
    <li className="border-b border-line last:border-b-0">
      {view.href ? (
        <Link href={view.href} className="block transition-colors hover:bg-dark/[0.03]">
          {row}
        </Link>
      ) : (
        row
      )}
    </li>
  );
}

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  if (items.length === 0) {
    return (
      <p className="rounded-[1.75rem] border border-dashed border-line-strong px-6 py-10 text-[14px] text-muted-ink">
        Chưa có hoạt động nào được ghi nhận. Dòng thời gian này tổng hợp đăng ký mới, bài học hoàn thành, lượt AI chấm
        nhật ký, góp ý và waitlist.
      </p>
    );
  }

  return (
    <ul className="border-t border-line">
      {items.map((item) => (
        <ActivityRow key={item.id} item={item} />
      ))}
    </ul>
  );
}
