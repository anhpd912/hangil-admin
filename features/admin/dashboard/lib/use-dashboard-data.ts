"use client";

import { useCallback, useEffect, useState } from "react";
import { adminStatsApi } from "@/shared/api/admin-stats-api";
import type { ActivityItem, AdminStats, ServiceHealth, Timeseries } from "@/shared/api/types/admin-stats";

const TIMESERIES_DAYS = 14;
const ACTIVITY_LIMIT = 12;

export type DashboardData = {
  stats: AdminStats;
  activity: ActivityItem[];
  timeseries: Timeseries;
  health: ServiceHealth;
};

type State = {
  data: DashboardData | null;
  error: unknown;
  isRefreshing: boolean;
  refresh: () => void;
};

/**
 * Bốn endpoint gọi song song và chỉ commit khi cả bốn xong — tránh dashboard
 * hiện nửa số liệu cũ nửa mới trong lúc bấm "Làm mới".
 */
export function useDashboardData(): State {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [nonce, setNonce] = useState(0);
  const [loadedNonce, setLoadedNonce] = useState(-1);

  const refresh = useCallback(() => setNonce((value) => value + 1), []);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      adminStatsApi.get(),
      adminStatsApi.activity(ACTIVITY_LIMIT),
      adminStatsApi.timeseries(TIMESERIES_DAYS),
      adminStatsApi.services(),
    ])
      .then(([stats, activity, timeseries, health]) => {
        if (cancelled) return;
        setData({ stats, activity: activity.items, timeseries, health });
        setError(null);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoadedNonce(nonce);
      });

    return () => {
      cancelled = true;
    };
  }, [nonce]);

  // Lượt fetch đang chạy = nonce hiện tại chưa được đánh dấu đã load xong.
  return { data, error, isRefreshing: loadedNonce !== nonce, refresh };
}
