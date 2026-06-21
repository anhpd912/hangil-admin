"use client";

import { useRouter } from "next/navigation";
import { useAdminSession } from "@/shared/auth/use-admin-session";
import { signOutAndClearToken } from "@/shared/auth/auth-client";

export function AdminHeader() {
  const { user } = useAdminSession();
  const router = useRouter();

  async function handleSignOut() {
    await signOutAndClearToken();
    router.push("/login");
  }

  const initial = (user?.email ?? "?").slice(0, 2).toUpperCase();

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-parchment/70 transition-colors hover:bg-parchment/10 hover:text-parchment"
    >
      <span className="font-mono-label flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red text-xs text-parchment">
        {initial}
      </span>
      <span className="flex flex-col overflow-hidden">
        <span className="truncate text-sm">{user?.email ?? "—"}</span>
        <span className="font-mono-label text-[10px] uppercase text-parchment/40">Đăng xuất</span>
      </span>
    </button>
  );
}
