import { Badge } from "@/features/admin/components/ui/badge";
import type { AdminUserDetail } from "@/shared/api/types/admin-user";

export function UserDetailCard({ user }: { user: AdminUserDetail }) {
  return (
    <div className="rounded-2xl border border-dark p-6">
      <p className="text-lg font-black text-dark">{user.email}</p>
      <p className="text-sm text-muted">{user.name ?? "—"}</p>
      <div className="mt-4 flex gap-2">
        <Badge active={user.plan === "pro"}>{user.plan}</Badge>
        <Badge active={user.role === "admin"}>{user.role}</Badge>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <p className="font-mono-label text-2xl text-dark">{user.totalCards}</p>
          <p className="font-mono-label text-xs text-muted">Tổng thẻ</p>
        </div>
        <div>
          <p className="font-mono-label text-2xl text-dark">{user.lessonsDone}</p>
          <p className="font-mono-label text-xs text-muted">Bài học hoàn thành</p>
        </div>
      </div>
    </div>
  );
}
