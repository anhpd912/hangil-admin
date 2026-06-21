"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminSession } from "./use-admin-session";

/**
 * Bearer token sống ở localStorage (client-only) — không có server guard thật.
 * BE vẫn enforce requireAdmin trên mọi route /admin/* (defense-in-depth),
 * guard này chỉ chặn UI/UX, không phải lớp bảo mật chính.
 */
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, isPending } = useAdminSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      router.replace("/login?redirect=/admin");
      return;
    }
    if (!isAdmin) {
      router.replace("/login");
    }
  }, [isPending, user, isAdmin, router]);

  if (isPending || !user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-parchment text-dark">
        <p className="font-mono-label text-sm text-muted">Đang kiểm tra quyền truy cập...</p>
      </div>
    );
  }

  return <>{children}</>;
}
