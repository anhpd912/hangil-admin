export type AdminStats = {
  totalUsers: number;
  activeToday: number;
  lessonsCompleted: number;
  journalCheckCalls: number;
};

export type WaitlistEntry = {
  id: string;
  email: string;
  createdAt: string;
};
