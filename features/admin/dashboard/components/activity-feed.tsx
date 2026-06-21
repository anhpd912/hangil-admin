import { DataTable, type Column } from "@/features/admin/components/ui/data-table";
import { Badge } from "@/features/admin/components/ui/badge";

type ActivityRow = {
  id: string;
  time: string;
  action: string;
  user: string;
  status: string;
};

/** Dữ liệu mẫu — BE chưa có endpoint activity log, wire sau khi có. */
const SAMPLE_ROWS: ActivityRow[] = [
  { id: "1", time: "14:22:01", action: "Đăng ký mới", user: "minh.tran@gmail.com", status: "success" },
  { id: "2", time: "13:45:12", action: "Nâng cấp Pro", user: "hoang.kim@naver.com", status: "pro" },
  { id: "3", time: "13:10:05", action: "API Log: GPT-4 Prompt", user: "system_internal", status: "cached" },
  { id: "4", time: "12:58:30", action: "Đăng ký mới", user: "phuonglee99@outlook.com", status: "success" },
  { id: "5", time: "12:30:11", action: "API Error: Timeout", user: "user_id_982", status: "failed" },
];

const COLUMNS: Column<ActivityRow>[] = [
  { key: "time", header: "Thời gian" },
  { key: "action", header: "Hoạt động" },
  { key: "user", header: "Người dùng" },
  { key: "status", header: "Trạng thái", render: (row) => <Badge active={row.status === "failed"}>{row.status}</Badge> },
];

export function ActivityFeed() {
  return (
    <div>
      <p className="font-mono-label mb-3 text-[11px] uppercase tracking-wide text-muted">
        Hoạt động gần đây — dữ liệu mẫu
      </p>
      <DataTable columns={COLUMNS} rows={SAMPLE_ROWS} rowKey={(row) => row.id} />
    </div>
  );
}
