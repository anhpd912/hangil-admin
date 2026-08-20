/** Tiêu đề khối theo kiểu tạp chí: chỉ số mono ở cột meta, tiêu đề canh trái. */
export function SectionHeading({
  index,
  title,
  hint,
  action,
}: {
  index: number;
  title: string;
  hint?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line pb-3">
      <div className="flex items-baseline gap-4">
        <span className="font-mono-label text-[11px] text-muted">{String(index).padStart(2, "0")}</span>
        <h2 className="text-[17px] font-bold leading-6 text-dark">{title}</h2>
        {hint && <span className="font-mono-label text-[11px] uppercase tracking-[0.1em] text-muted-ink">{hint}</span>}
      </div>
      {action}
    </div>
  );
}
