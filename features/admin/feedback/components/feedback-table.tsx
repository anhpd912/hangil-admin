import { DataTable, type Column } from "@/features/admin/components/ui/data-table";
import { Badge } from "@/features/admin/components/ui/badge";
import type { FeedbackEntry } from "@/shared/api/types/admin-feedback";

const COLUMNS: Column<FeedbackEntry>[] = [
  { key: "message", header: "Nội dung" },
  { key: "email", header: "Email", render: (row) => row.email ?? "—" },
  { key: "status", header: "Trạng thái", render: (row) => <Badge active={row.status === "new"}>{row.status}</Badge> },
  {
    key: "createdAt",
    header: "Thời gian",
    render: (row) => new Date(row.createdAt).toLocaleString("vi-VN"),
  },
];

export function FeedbackTable({ entries }: { entries: FeedbackEntry[] }) {
  return <DataTable columns={COLUMNS} rows={entries} rowKey={(row) => row.id} />;
}
