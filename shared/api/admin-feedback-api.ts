import { apiFetch, buildQuery } from "./api-client";
import type { Paginated } from "./types/admin-user";
import type { FeedbackEntry } from "./types/admin-feedback";

type RawFeedbackList = { entries: FeedbackEntry[]; page: number; pageSize: number; total: number };

export const adminFeedbackApi = {
  async list(params: { page?: number; pageSize?: number }): Promise<Paginated<FeedbackEntry>> {
    const raw = await apiFetch<RawFeedbackList>(`/api/v1/admin/feedback${buildQuery(params)}`);
    return { items: raw.entries, page: raw.page, pageSize: raw.pageSize, total: raw.total };
  },
};
