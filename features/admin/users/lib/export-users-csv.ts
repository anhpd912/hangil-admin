import type { AdminUser } from "@/shared/api/types/admin-user";

export function exportUsersCsv(users: AdminUser[]) {
  const header = ["email", "name", "plan", "role", "streak", "createdAt"];
  const rows = users.map((u) => [u.email, u.name ?? "", u.plan, u.role, String(u.streakCount), u.createdAt]);
  const csv = [header, ...rows].map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `hangil-users-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
