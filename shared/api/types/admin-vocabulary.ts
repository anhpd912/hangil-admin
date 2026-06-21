export type Vocabulary = {
  id: string;
  korean: string;
  romanization: string;
  vietnamese: string;
  exampleSentenceKo: string | null;
  exampleSentenceVi: string | null;
  audioUrl: string | null;
  lessonId: string;
  createdAt: string;
};

export type CreateVocabularyInput = {
  lessonId: string;
  korean: string;
  romanization: string;
  vietnamese: string;
  exampleSentenceKo?: string;
  exampleSentenceVi?: string;
  audioUrl?: string;
};

export type UpdateVocabularyInput = Partial<Omit<CreateVocabularyInput, "lessonId">>;
