import { AdminNav } from "./admin-nav";
import { AdminHeader } from "./admin-header";
import { AdminTopbar } from "./admin-topbar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-parchment md:flex-row">
      <AdminTopbar />

      <aside className="sticky top-0 hidden h-[100dvh] w-[216px] shrink-0 flex-col bg-dark py-7 md:flex">
        <div className="px-6 pb-7">
          <p className="text-[20px] font-extrabold leading-none text-parchment">한길</p>
          <p className="font-mono-label mt-2 text-[10px] uppercase tracking-[0.16em] text-parchment/45">
            Bảng điều khiển
          </p>
        </div>
        <AdminNav />
        <div className="mt-auto border-t border-parchment/10 px-3 pt-4">
          <AdminHeader />
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-5 py-8 md:px-10 md:py-12">{children}</main>
    </div>
  );
}
