/** Giữ đúng khung layout thật để nội dung không nhảy khi số liệu về. */
function Block({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-[1.75rem] border border-line bg-cream ${className}`} />;
}

export function DashboardSkeleton() {
  return (
    <div className="mt-12 flex flex-col gap-12" aria-busy="true" aria-live="polite">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((index) => (
          <Block key={index} className="h-[190px]" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Block className="h-[340px] lg:col-span-7" />
        <Block className="h-[340px] lg:col-span-5" />
      </div>
      <span className="sr-only">Đang tải số liệu dashboard</span>
    </div>
  );
}
