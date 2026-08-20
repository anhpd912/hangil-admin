type DashboardHeaderProps = {
  onRefresh: () => void;
  isRefreshing: boolean;
  checkedAt?: string;
};

export function DashboardHeader({ onRefresh, isRefreshing, checkedAt }: DashboardHeaderProps) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-6 border-b border-line-strong pb-6">
      <div>
        <p className="font-mono-label text-[11px] uppercase tracking-[0.14em] text-muted-ink">
          Hangil · bảng điều khiển vận hành
        </p>
        <h1 className="mt-2 text-[2.25rem] font-extrabold leading-[1.1] tracking-[-0.01em] text-dark">Tổng quan</h1>
        <p className="mt-2 max-w-[52ch] text-[14px] leading-6 text-muted-ink">
          Toàn bộ số liệu lấy trực tiếp từ hangil-server, tính theo giờ Việt Nam (GMT+7).
        </p>
      </div>

      <div className="flex items-center gap-4">
        {checkedAt && (
          <span className="font-mono-label tnum text-[11px] text-muted">Cập nhật {checkedAt}</span>
        )}
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="font-mono-label rounded-full border border-dark px-4 py-2 text-[11px] uppercase tracking-[0.1em] text-dark transition-colors hover:bg-dark hover:text-parchment disabled:opacity-40"
        >
          {isRefreshing ? "Đang tải..." : "Làm mới"}
        </button>
      </div>
    </header>
  );
}
