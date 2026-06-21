import { apiFetch, buildQuery } from "./api-client";
import type { Paginated } from "./types/admin-user";
import type { WaitlistEntry } from "./types/admin-stats";

type RawWaitlistList = { entries: WaitlistEntry[]; page: number; pageSize: number; total: number };

export const adminWaitlistApi = {
  async list(params: { page?: number; pageSize?: number }): Promise<Paginated<WaitlistEntry>> {
    const raw = await apiFetch<RawWaitlistList>(`/api/v1/admin/waitlist${buildQuery(params)}`);
    return { items: raw.entries, page: raw.page, pageSize: raw.pageSize, total: raw.total };
  },
};
