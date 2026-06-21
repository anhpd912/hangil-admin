/** Dữ liệu mẫu — BE chưa có endpoint thống kê theo tuần, wire sau khi có. */
const SAMPLE_HEIGHTS = [55, 70, 62, 100, 58, 75, 68];

export function CompletionChart() {
  return (
    <div className="rounded-2xl border border-dark/15 bg-cream p-5">
      <p className="font-mono-label text-[11px] uppercase tracking-wide text-muted">
        Tỷ lệ hoàn thành bài học — dữ liệu mẫu
      </p>
      <div className="mt-6 flex h-32 items-end gap-2">
        {SAMPLE_HEIGHTS.map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t-md ${h === 100 ? "bg-red" : "bg-dark/80"}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <p className="mt-4 text-sm text-dark">
        Tăng trưởng 12% so với tuần trước. Chủ yếu ở danh mục <span className="font-bold">Sơ cấp 1</span>.
      </p>
    </div>
  );
}
