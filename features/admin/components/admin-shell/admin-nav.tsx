"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin", label: "Tổng quan", icon: "⌂" },
  { href: "/admin/lessons", label: "Bài học", icon: "▤" },
  { href: "/admin/vocabulary", label: "Từ vựng", icon: "字" },
  { href: "/admin/users", label: "Người dùng", icon: "◎" },
  { href: "/admin/waitlist", label: "Waitlist", icon: "✉" },
  { href: "/admin/feedback", label: "Góp ý", icon: "💬" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex w-[200px] flex-col gap-1 px-4 py-2">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
              active ? "bg-parchment/10 text-parchment" : "text-parchment/50 hover:text-parchment/80"
            }`}
          >
            <span className="font-mono-label w-4 text-center text-xs">{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
