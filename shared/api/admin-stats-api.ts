import { apiFetch, buildQuery } from "./api-client";
import type { AdminStats, ActivityItem, ServiceHealth, Timeseries } from "./types/admin-stats";

export const adminStatsApi = {
  get(): Promise<AdminStats> {
    return apiFetch<AdminStats>("/api/v1/admin/stats");
  },

  activity(limit = 10): Promise<{ items: ActivityItem[] }> {
    return apiFetch<{ items: ActivityItem[] }>(`/api/v1/admin/stats/activity${buildQuery({ limit })}`);
  },

  timeseries(days = 7): Promise<Timeseries> {
    return apiFetch<Timeseries>(`/api/v1/admin/stats/timeseries${buildQuery({ days })}`);
  },

  services(): Promise<ServiceHealth> {
    return apiFetch<ServiceHealth>("/api/v1/admin/stats/services");
  },
};
