"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "./nav-items";

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-0.5 px-3">
      {NAV_ITEMS.map((item, index) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 rounded-full px-4 py-2.5 text-[14px] transition-colors ${
              active ? "bg-parchment text-dark" : "text-parchment/65 hover:bg-parchment/10 hover:text-parchment"
            }`}
          >
            <span className={`font-mono-label text-[10px] ${active ? "text-dark/50" : "text-parchment/35"}`}>
              {String(index + 1).padStart(2, "0")}
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
