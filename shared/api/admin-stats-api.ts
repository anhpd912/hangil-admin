import { apiFetch } from "./api-client";
import type { AdminStats } from "./types/admin-stats";

export const adminStatsApi = {
  get(): Promise<AdminStats> {
    return apiFetch<AdminStats>("/api/v1/admin/stats");
  },
};
