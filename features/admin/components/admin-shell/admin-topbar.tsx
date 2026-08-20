"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "./nav-items";
import { AdminHeader } from "./admin-header";

/** Thay thế sidebar trên màn hình hẹp: nav cuộn ngang, giữ nguyên toàn bộ điểm đến. */
export function AdminTopbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 bg-dark md:hidden">
      <div className="flex items-center justify-between gap-4 px-5 pt-4">
        <p className="text-[18px] font-extrabold leading-none text-parchment">한길</p>
        <div className="max-w-[60%]">
          <AdminHeader />
        </div>
      </div>
      <nav className="flex gap-1.5 overflow-x-auto px-5 pb-3 pt-3">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] transition-colors ${
                active ? "bg-parchment text-dark" : "bg-parchment/10 text-parchment/70"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
