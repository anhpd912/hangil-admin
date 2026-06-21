import Link from "next/link";
import { DataTable, type Column } from "@/features/admin/components/ui/data-table";
import { Badge } from "@/features/admin/components/ui/badge";
import type { AdminUser } from "@/shared/api/types/admin-user";

const COLUMNS: Column<AdminUser>[] = [
  {
    key: "email",
    header: "Email",
    render: (row) => (
      <Link href={`/admin/users/${row.id}`} className="underline underline-offset-4">
        {row.email}
      </Link>
    ),
  },
  { key: "name", header: "Tên", render: (row) => row.name ?? "—" },
  { key: "plan", header: "Plan", render: (row) => <Badge active={row.plan === "pro"}>{row.plan}</Badge> },
  { key: "role", header: "Role", render: (row) => <Badge active={row.role === "admin"}>{row.role}</Badge> },
];

export function UsersTable({ users }: { users: AdminUser[] }) {
  return <DataTable columns={COLUMNS} rows={users} rowKey={(row) => row.id} />;
}
