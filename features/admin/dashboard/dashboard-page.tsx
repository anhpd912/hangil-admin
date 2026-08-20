"use client";

import { ErrorState } from "@/features/admin/components/ui/state-views";
import { useDashboardData } from "./lib/use-dashboard-data";
import { formatClock } from "./lib/format";
import { DashboardHeader } from "./components/dashboard-header";
import { DashboardSkeleton } from "./components/dashboard-skeleton";
import { SectionHeading } from "./components/section-heading";
import { StatCard } from "./components/stat-card";
import { ActivityFeed } from "./components/activity-feed";
import { DailyActivityChart } from "./components/daily-activity-chart";
import { ServiceStatusPanel } from "./components/service-status";
import { ContentInventory } from "./components/content-inventory";

export function DashboardPage() {
  const { data, error, isRefreshing, refresh } = useDashboardData();

  if (error && !data) {
    return (
      <div className="mx-auto w-full max-w-[1180px]">
        <DashboardHeader onRefresh={refresh} isRefreshing={isRefreshing} />
        <ErrorState error={error} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto w-full max-w-[1180px]">
        <DashboardHeader onRefresh={refresh} isRefreshing={isRefreshing} />
        <DashboardSkeleton />
      </div>
    );
  }

  const { stats, activity, timeseries, health } = data;

  return (
    <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-12">
      <DashboardHeader
        onRefresh={refresh}
        isRefreshing={isRefreshing}
        checkedAt={formatClock(health.checkedAt)}
      />

      <section>
        <SectionHeading index={1} title="Chỉ số chính" hint="7 ngày gần nhất" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            index={1}
            label="Tổng người dùng"
            value={stats.totalUsers}
            trend={stats.newUsers}
            href="/admin/users"
          />
          <StatCard
            index={2}
            label="Học viên hoạt động"
            value={stats.activeLearners.current}
            trend={stats.activeLearners}
          />
          <StatCard
            index={3}
            label="Bài học hoàn thành"
            value={stats.lessonsCompleted}
            trend={stats.completions}
            href="/admin/lessons"
          />
          <StatCard
            index={4}
            label="Lượt AI chấm nhật ký"
            value={stats.journalCheckCalls}
            trend={stats.journalChecks}
          />
        </div>
        <p className="mt-3 font-mono-label text-[11px] text-muted-ink">
          Đang học hôm nay: <span className="tnum text-dark">{stats.activeToday}</span> · Tài khoản Pro:{" "}
          <span className="tnum text-dark">{stats.proUsers}</span>
        </p>
      </section>

      <section>
        <SectionHeading index={2} title="Nhịp hoạt động" hint="dữ liệu trực tiếp" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <DailyActivityChart timeseries={timeseries} />
          </div>
          <div className="lg:col-span-5">
            <ContentInventory stats={stats} />
          </div>
        </div>
      </section>

      <section>
        <SectionHeading index={3} title="Dòng thời gian" hint={`${activity.length} sự kiện gần nhất`} />
        <ActivityFeed items={activity} />
      </section>

      <section>
        <SectionHeading index={4} title="Hạ tầng" hint="ping trực tiếp" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ServiceStatusPanel health={health} />
          </div>
        </div>
      </section>
    </div>
  );
}
