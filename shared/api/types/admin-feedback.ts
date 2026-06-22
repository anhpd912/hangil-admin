export type FeedbackEntry = {
  id: string;
  userId: string | null;
  email: string | null;
  message: string;
  status: string;
  createdAt: string;
};
