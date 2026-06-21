import { apiFetch } from "./api-client";
import type { CreateLessonInput, Lesson, UpdateLessonInput } from "./types/admin-lesson";

export const adminLessonsApi = {
  list(): Promise<Lesson[]> {
    return apiFetch<Lesson[]>("/api/v1/admin/lessons");
  },

  create(body: CreateLessonInput): Promise<Lesson> {
    return apiFetch<Lesson>("/api/v1/admin/lessons", { method: "POST", body });
  },

  update(id: string, body: UpdateLessonInput): Promise<Lesson> {
    return apiFetch<Lesson>(`/api/v1/admin/lessons/${id}`, { method: "PATCH", body });
  },

  setPublished(id: string, isPublished: boolean): Promise<Lesson> {
    return apiFetch<Lesson>(`/api/v1/admin/lessons/${id}/publish`, {
      method: "PATCH",
      body: { isPublished },
    });
  },

  remove(id: string): Promise<Lesson> {
    return apiFetch<Lesson>(`/api/v1/admin/lessons/${id}`, { method: "DELETE" });
  },
};
