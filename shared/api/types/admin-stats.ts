/** So sánh cửa sổ 7 ngày gần nhất với 7 ngày liền trước. */
export type MetricTrend = { current: number; previous: number };

export type AdminStats = {
  totalUsers: number;
  activeToday: number;
  lessonsCompleted: number;
  journalCheckCalls: number;
  proUsers: number;
  newUsers: MetricTrend;
  completions: MetricTrend;
  journalChecks: MetricTrend;
  activeLearners: MetricTrend;
  content: {
    lessonsTotal: number;
    lessonsPublished: number;
    vocabularyTotal: number;
    waitlistTotal: number;
    feedbackNew: number;
  };
};

export type ActivityKind = "signup" | "lesson_completed" | "journal" | "feedback" | "waitlist";

export type ActivityItem = {
  id: string;
  kind: ActivityKind;
  /** ISO UTC — format sang giờ VN ở FE */
  at: string;
  actor: string;
  detail: string;
};

export type DailyPoint = {
  /** YYYY-MM-DD theo giờ VN */
  date: string;
  lessonsCompleted: number;
  activeLearners: number;
  newUsers: number;
};

export type Timeseries = { days: number; points: DailyPoint[] };

export type ServiceStatus = "operational" | "degraded" | "down" | "unconfigured";

export type ServiceCheck = {
  id: string;
  name: string;
  status: ServiceStatus;
  detail: string;
  latencyMs: number | null;
};

export type ServiceHealth = { services: ServiceCheck[]; checkedAt: string };

export type WaitlistEntry = {
  id: string;
  email: string;
  createdAt: string;
};
