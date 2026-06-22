export type LessonExample = {
  korean: string;
  vietnamese: string;
  source?: string;
};

export type LessonExercise = {
  type: string;
  prompt: string;
  options?: string[];
  answer: string;
};

export type LessonContent = {
  theory: {
    title: string;
    explanation: string;
    notes?: string;
  };
  examples: LessonExample[];
  exercises: LessonExercise[];
};

export type Lesson = {
  id: string;
  titleVi: string;
  titleKo: string;
  track: "k_culture" | "topik";
  level: "beginner" | "intermediate" | "advanced";
  orderIndex: number;
  content: LessonContent | null;
  isPublished: boolean;
  createdAt: string;
};

export type CreateLessonInput = {
  titleVi: string;
  titleKo: string;
  track: "k_culture" | "topik";
  level: "beginner" | "intermediate" | "advanced";
  orderIndex?: number;
  content?: LessonContent;
};

export type UpdateLessonInput = Partial<CreateLessonInput>;
