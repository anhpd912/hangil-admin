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
      title={user?.email ?? undefined}
      className="flex w-full items-center gap-3 rounded-full px-3 py-2.5 text-left text-parchment/70 transition-colors hover:bg-parchment/10 hover:text-parchment"
    >
      <span className="font-mono-label flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red text-[11px] text-parchment">
        {initial}
      </span>
      {/* min-w-0 bắt buộc: thiếu nó thì truncate vô hiệu và email dài tràn khỏi sidebar. */}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[13px] leading-5">{user?.email ?? "—"}</span>
        <span className="font-mono-label text-[10px] uppercase tracking-[0.1em] text-parchment/45">Đăng xuất</span>
      </span>
    </button>
  );
}
