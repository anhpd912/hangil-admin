"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { adminUsersApi } from "@/shared/api/admin-users-api";
import type { AdminUser, Paginated } from "@/shared/api/types/admin-user";
import { LoadingState, ErrorState, EmptyState } from "@/features/admin/components/ui/state-views";
import { Pagination } from "@/features/admin/components/ui/pagination";
import { Button } from "@/features/admin/components/ui/button";
import { StatCard } from "@/features/admin/dashboard/components/stat-card";
import { UsersTable } from "./components/users-table";
import { UsersSearchBar } from "./components/users-search-bar";
import { exportUsersCsv } from "./lib/export-users-csv";

const PAGE_SIZE = 20;

export function UsersListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");
  const search = searchParams.get("search") ?? "";

  const [data, setData] = useState<Paginated<AdminUser> | null>(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    adminUsersApi
      .list({ search: search || undefined, page, pageSize: PAGE_SIZE })
      .then(setData)
      .catch(setError);
  }, [search, page]);

  function handlePageChange(nextPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    router.push(`/admin/users?${params.toString()}`);
  }

  const proCount = data?.items.filter((u) => u.plan === "pro").length ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono-label text-xs text-muted">Directory / Users</p>
          <h1 className="text-2xl font-black text-dark">Quản lý Người dùng</h1>
        </div>
        <Button
          variant="secondary"
          onClick={() => data && exportUsersCsv(data.items)}
          disabled={!data || data.items.length === 0}
        >
          Export CSV
        </Button>
      </div>

      {data && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Tổng user" value={data.total} />
          <StatCard label="Pro (trang này)" value={proCount} />
          <StatCard label="Trang hiện tại" value={`${data.page}/${Math.max(1, Math.ceil(data.total / data.pageSize))}`} />
          <StatCard label="Mỗi trang" value={data.pageSize} />
        </div>
      )}

      <UsersSearchBar initialSearch={search} />
      {error ? (
        <ErrorState error={error} />
      ) : !data ? (
        <LoadingState />
      ) : data.items.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <UsersTable users={data.items} />
          <Pagination page={data.page} pageSize={data.pageSize} total={data.total} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
}
