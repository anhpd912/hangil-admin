export type Lesson = {
  id: string;
  titleVi: string;
  titleKo: string;
  track: "k_culture" | "topik";
  level: "beginner" | "intermediate" | "advanced";
  orderIndex: number;
  content: unknown;
  isPublished: boolean;
  createdAt: string;
};

export type CreateLessonInput = {
  titleVi: string;
  titleKo: string;
  track: "k_culture" | "topik";
  level: "beginner" | "intermediate" | "advanced";
  orderIndex?: number;
  content?: unknown;
};

export type UpdateLessonInput = Partial<CreateLessonInput>;
