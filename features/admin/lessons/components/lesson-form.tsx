"use client";

import { useState } from "react";
import { TextField } from "@/features/admin/components/ui/text-field";
import { SelectField } from "@/features/admin/components/ui/select-field";
import { Button } from "@/features/admin/components/ui/button";
import { ApiError } from "@/shared/api/api-error";
import { errorMessage } from "@/features/admin/lib/error-message";
import { adminLessonsApi } from "@/shared/api/admin-lessons-api";
import type { Lesson } from "@/shared/api/types/admin-lesson";
import { TRACK_OPTIONS, LEVEL_OPTIONS, trackLabel, levelLabel } from "../lib/lesson-enums";
import { LessonContentEditor, EMPTY_CONTENT } from "./lesson-content-editor";

type LessonFormProps = {
  lesson: Lesson | null;
  onSaved: () => void;
};

export function LessonForm({ lesson, onSaved }: LessonFormProps) {
  const [titleVi, setTitleVi] = useState(lesson?.titleVi ?? "");
  const [titleKo, setTitleKo] = useState(lesson?.titleKo ?? "");
  const [track, setTrack] = useState<string>(lesson?.track ?? "k_culture");
  const [level, setLevel] = useState<string>(lesson?.level ?? "beginner");
  const [orderIndex, setOrderIndex] = useState(String(lesson?.orderIndex ?? 0));
  const [content, setContent] = useState(lesson?.content ?? EMPTY_CONTENT);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const body = {
        titleVi,
        titleKo,
        track: track as Lesson["track"],
        level: level as Lesson["level"],
        orderIndex: Number(orderIndex),
        content,
      };
      if (lesson) {
        await adminLessonsApi.update(lesson.id, body);
      } else {
        await adminLessonsApi.create(body);
      }
      onSaved();
    } catch (err) {
      setError(err instanceof ApiError ? errorMessage(err.code) : "Lỗi không xác định");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-dark/15 bg-cream p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono-label text-xs text-muted">Soạn thảo & xem trước</p>
        <Button type="submit" form="lesson-form" disabled={isSubmitting}>
          {isSubmitting ? "Đang lưu..." : lesson ? "Cập nhật" : "Xuất bản"}
        </Button>
      </div>
      <form id="lesson-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField label="Tiêu đề Tiếng Việt" value={titleVi} onChange={(e) => setTitleVi(e.target.value)} required />
        <TextField label="Tiêu đề Tiếng Hàn" value={titleKo} onChange={(e) => setTitleKo(e.target.value)} required />
        <div className="grid grid-cols-2 gap-4">
          <SelectField label="Track" value={track} onChange={(e) => setTrack(e.target.value)} options={TRACK_OPTIONS} />
          <SelectField label="Level" value={level} onChange={(e) => setLevel(e.target.value)} options={LEVEL_OPTIONS} />
        </div>
        <TextField label="Thứ tự" type="number" value={orderIndex} onChange={(e) => setOrderIndex(e.target.value)} />
        <LessonContentEditor value={content} onChange={setContent} />
        {error && <p className="text-sm text-red">{error}</p>}
      </form>

      <div className="mt-6 border-t border-dark/10 pt-4">
        <p className="font-mono-label mb-3 text-[11px] uppercase tracking-wide text-muted">Live preview</p>
        <div className="rounded-2xl border border-dark/15 p-5">
          <p className="font-mono-label text-xs text-red">01 — {levelLabel(level)} · {trackLabel(track)}</p>
          <h2 className="mt-1 text-xl font-black text-dark">{titleVi || "Tiêu đề bài học"}</h2>
          <h3 className="mt-3 text-base font-bold text-dark">{content.theory.title || "Lý thuyết"}</h3>
          <p className="mt-1 text-sm text-dark">{content.theory.explanation}</p>
          {content.examples.length > 0 && (
            <p className="font-mono-label mt-3 text-xs text-muted">{content.examples.length} ví dụ</p>
          )}
          {content.exercises.length > 0 && (
            <p className="font-mono-label text-xs text-muted">{content.exercises.length} bài tập</p>
          )}
        </div>
      </div>
    </div>
  );
}
