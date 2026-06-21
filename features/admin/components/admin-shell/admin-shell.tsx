import { AdminNav } from "./admin-nav";
import { AdminHeader } from "./admin-header";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-parchment">
      <aside className="flex w-[200px] shrink-0 flex-col bg-dark py-6">
        <div className="px-5 pb-6">
          <p className="text-lg font-black text-parchment">한길</p>
          <p className="font-mono-label text-xs text-parchment/40">01 — ADMIN</p>
        </div>
        <AdminNav />
        <div className="mt-auto px-2 pt-6">
          <AdminHeader />
        </div>
      </aside>
      <main className="flex-1 overflow-x-auto p-8">{children}</main>
    </div>
  );
}
