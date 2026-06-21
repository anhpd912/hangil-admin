import { apiFetch, buildQuery } from "./api-client";
import type { CreateVocabularyInput, UpdateVocabularyInput, Vocabulary } from "./types/admin-vocabulary";

export const adminVocabularyApi = {
  list(params: { lessonId?: string } = {}): Promise<Vocabulary[]> {
    return apiFetch<Vocabulary[]>(`/api/v1/admin/vocabulary${buildQuery(params)}`);
  },

  create(body: CreateVocabularyInput): Promise<Vocabulary> {
    return apiFetch<Vocabulary>("/api/v1/admin/vocabulary", { method: "POST", body });
  },

  update(id: string, body: UpdateVocabularyInput): Promise<Vocabulary> {
    return apiFetch<Vocabulary>(`/api/v1/admin/vocabulary/${id}`, { method: "PATCH", body });
  },

  remove(id: string): Promise<Vocabulary> {
    return apiFetch<Vocabulary>(`/api/v1/admin/vocabulary/${id}`, { method: "DELETE" });
  },
};
