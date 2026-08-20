"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminSession } from "./use-admin-session";

/**
 * Bearer token sống ở localStorage (client-only) — không có server guard thật.
 * BE vẫn enforce requireAdmin trên mọi route /admin/* (defense-in-depth),
 * guard này chỉ chặn UI/UX, không phải lớp bảo mật chính.
 *
 * Bắt buộc refetch session khi mount: store session của Better Auth là nanostore
 * module-level, giữ nguyên kết quả `null` của lần kiểm tra trước. Sau khi đăng nhập
 * xong, /login không subscribe store nên tín hiệu sign-in không kích hoạt refetch,
 * guard đọc phải giá trị cũ và đá ngược người dùng về /login ngay lập tức.
 */
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, isPending, isRefetching, refetch } = useAdminSession();
  const router = useRouter();
  const [revalidated, setRevalidated] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    void Promise.resolve(refetch()).finally(() => setRevalidated(true));
  }, [refetch]);

  const isChecking = !revalidated || isPending || isRefetching;

  useEffect(() => {
    if (isChecking) return;
    if (!user) {
      router.replace("/login?redirect=/admin");
      return;
    }
    if (!isAdmin) {
      router.replace("/login?error=admin_required");
    }
  }, [isChecking, user, isAdmin, router]);

  if (isChecking || !user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-parchment text-dark">
        <p className="font-mono-label text-sm text-muted">Đang kiểm tra quyền truy cập...</p>
      </div>
    );
  }

  return <>{children}</>;
}
