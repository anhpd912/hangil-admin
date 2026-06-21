export type AdminUser = {
  id: string;
  name: string | null;
  email: string;
  plan: "free" | "pro";
  role: "user" | "admin";
  track: string | null;
  streakCount: number;
  lastStudiedAt: string | null;
  createdAt: string;
};

export type AdminUserDetail = AdminUser & {
  totalCards: number;
  lessonsDone: number;
};

export type Paginated<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
};

export type UpdateUserInput = {
  plan?: "free" | "pro";
  role?: "user" | "admin";
};
