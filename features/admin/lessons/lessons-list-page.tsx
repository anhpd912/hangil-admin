"use client";

import { useEffect, useState } from "react";
import { adminLessonsApi } from "@/shared/api/admin-lessons-api";
import type { Lesson } from "@/shared/api/types/admin-lesson";
import { LoadingState, ErrorState, EmptyState } from "@/features/admin/components/ui/state-views";
import { Button } from "@/features/admin/components/ui/button";
import { ConfirmDialog } from "@/features/admin/components/ui/confirm-dialog";
import { LessonsTable } from "./components/lessons-table";
import { LessonForm } from "./components/lesson-form";

export function LessonsListPage() {
  const [lessons, setLessons] = useState<Lesson[] | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [selectedId, setSelectedId] = useState<string | null | undefined>(undefined);
  const [deleting, setDeleting] = useState<Lesson | null>(null);

  function refetch() {
    adminLessonsApi.list().then(setLessons).catch(setError);
  }

  useEffect(() => {
    adminLessonsApi.list().then(setLessons).catch(setError);
  }, []);

  function handleTogglePublished(id: string, next: boolean) {
    setLessons((prev) => prev?.map((l) => (l.id === id ? { ...l, isPublished: next } : l)) ?? prev);
  }

  async function handleDeleteConfirm() {
    if (!deleting) return;
    await adminLessonsApi.remove(deleting.id);
    setDeleting(null);
    if (selectedId === deleting.id) setSelectedId(undefined);
    refetch();
  }

  if (error) return <ErrorState error={error} />;
  if (!lessons) return <LoadingState />;

  const sorted = [...lessons].sort((a, b) => a.orderIndex - b.orderIndex);
  const selectedLesson = sorted.find((l) => l.id === selectedId) ?? null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono-label text-xs text-muted">Content Management</p>
          <h1 className="text-2xl font-black text-dark">Quản lý Bài học</h1>
        </div>
        <Button onClick={() => setSelectedId(null)}>+ Thêm bài học</Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-dark/15 bg-cream">
          <p className="font-mono-label px-4 py-3 text-[11px] uppercase tracking-wide text-muted">
            Danh sách bài học ({sorted.length})
          </p>
          {sorted.length === 0 ? (
            <EmptyState />
          ) : (
            <LessonsTable
              lessons={sorted}
              selectedId={selectedId ?? undefined}
              onTogglePublished={handleTogglePublished}
              onSelect={(lesson) => setSelectedId(lesson.id)}
              onDelete={(lesson) => setDeleting(lesson)}
            />
          )}
        </div>

        {selectedId !== undefined ? (
          <LessonForm
            key={selectedLesson?.id ?? "create"}
            lesson={selectedLesson}
            onSaved={() => {
              refetch();
              setSelectedId(undefined);
            }}
          />
        ) : (
          <div className="flex items-center justify-center rounded-2xl border border-dark/15 p-12 text-sm text-muted">
            Chọn một bài học để sửa, hoặc tạo bài học mới.
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleting !== null}
        title="Xoá bài học"
        message={`Xoá "${deleting?.titleVi}"? Hành động không thể hoàn tác.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
