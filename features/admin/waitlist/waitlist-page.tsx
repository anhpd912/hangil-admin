"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { adminWaitlistApi } from "@/shared/api/admin-waitlist-api";
import type { Paginated } from "@/shared/api/types/admin-user";
import type { WaitlistEntry } from "@/shared/api/types/admin-stats";
import { LoadingState, ErrorState, EmptyState } from "@/features/admin/components/ui/state-views";
import { Pagination } from "@/features/admin/components/ui/pagination";
import { WaitlistTable } from "./components/waitlist-table";

const PAGE_SIZE = 20;

export function WaitlistPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");

  const [data, setData] = useState<Paginated<WaitlistEntry> | null>(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    adminWaitlistApi
      .list({ page, pageSize: PAGE_SIZE })
      .then(setData)
      .catch(setError);
  }, [page]);

  function handlePageChange(nextPage: number) {
    router.push(`/admin/waitlist?page=${nextPage}`);
  }

  if (error) return <ErrorState error={error} />;
  if (!data) return <LoadingState />;
  if (data.items.length === 0) return <EmptyState />;

  return (
    <div>
      <WaitlistTable entries={data.items} />
      <Pagination page={data.page} pageSize={data.pageSize} total={data.total} onPageChange={handlePageChange} />
    </div>
  );
}
