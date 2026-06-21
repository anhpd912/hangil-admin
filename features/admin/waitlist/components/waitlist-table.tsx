import { DataTable, type Column } from "@/features/admin/components/ui/data-table";
import type { WaitlistEntry } from "@/shared/api/types/admin-stats";

const COLUMNS: Column<WaitlistEntry>[] = [
  { key: "email", header: "Email" },
  {
    key: "createdAt",
    header: "Ngày đăng ký",
    render: (row) => new Date(row.createdAt).toLocaleDateString("vi-VN"),
  },
];

export function WaitlistTable({ entries }: { entries: WaitlistEntry[] }) {
  return <DataTable columns={COLUMNS} rows={entries} rowKey={(row) => row.id} />;
}
