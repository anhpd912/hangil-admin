"use client";

import { useEffect, useState } from "react";
import { adminStatsApi } from "@/shared/api/admin-stats-api";
import type { AdminStats } from "@/shared/api/types/admin-stats";
import { LoadingState, ErrorState } from "@/features/admin/components/ui/state-views";
import { StatCard } from "./components/stat-card";
import { ActivityFeed } from "./components/activity-feed";
import { CompletionChart } from "./components/completion-chart";
import { ServiceStatus } from "./components/service-status";

export function DashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    adminStatsApi.get().then(setStats).catch(setError);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="font-mono-label text-xs text-muted">01 — Hệ thống vận hành hiện tại</p>
        <h1 className="text-2xl font-black text-dark">Tổng quan</h1>
      </div>

      {error ? (
        <ErrorState error={error} />
      ) : !stats ? (
        <LoadingState />
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Tổng user" value={stats.totalUsers} href="/admin/users" />
          <StatCard label="Hoạt động hôm nay" value={stats.activeToday} delta="hôm nay" />
          <StatCard label="Bài học hoàn thành" value={stats.lessonsCompleted} href="/admin/lessons" />
          <StatCard label="Lượt chấm nhật ký" value={stats.journalCheckCalls} />
        </div>
      )}

      <ActivityFeed />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <CompletionChart />
        <ServiceStatus />
      </div>
    </div>
  );
}
