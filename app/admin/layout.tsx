import { AdminGuard } from "@/shared/auth/admin-guard";
import { AdminShell } from "@/features/admin/components/admin-shell/admin-shell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <AdminShell>{children}</AdminShell>
    </AdminGuard>
  );
}
