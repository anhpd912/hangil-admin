"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { adminFeedbackApi } from "@/shared/api/admin-feedback-api";
import type { Paginated } from "@/shared/api/types/admin-user";
import type { FeedbackEntry } from "@/shared/api/types/admin-feedback";
import { LoadingState, ErrorState, EmptyState } from "@/features/admin/components/ui/state-views";
import { Pagination } from "@/features/admin/components/ui/pagination";
import { FeedbackTable } from "./components/feedback-table";

const PAGE_SIZE = 20;

export function FeedbackListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");

  const [data, setData] = useState<Paginated<FeedbackEntry> | null>(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    adminFeedbackApi.list({ page, pageSize: PAGE_SIZE }).then(setData).catch(setError);
  }, [page]);

  function handlePageChange(nextPage: number) {
    router.push(`/admin/feedback?page=${nextPage}`);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="font-mono-label text-xs text-muted">Hộp thư</p>
        <h1 className="text-2xl font-black text-dark">Góp ý người dùng</h1>
      </div>
      {error ? (
        <ErrorState error={error} />
      ) : !data ? (
        <LoadingState />
      ) : data.items.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <FeedbackTable entries={data.items} />
          <Pagination page={data.page} pageSize={data.pageSize} total={data.total} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
}
