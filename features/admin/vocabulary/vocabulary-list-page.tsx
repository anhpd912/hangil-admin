"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { adminVocabularyApi } from "@/shared/api/admin-vocabulary-api";
import { adminLessonsApi } from "@/shared/api/admin-lessons-api";
import type { Vocabulary } from "@/shared/api/types/admin-vocabulary";
import type { Lesson } from "@/shared/api/types/admin-lesson";
import { LoadingState, ErrorState, EmptyState } from "@/features/admin/components/ui/state-views";
import { Button } from "@/features/admin/components/ui/button";
import { SelectField } from "@/features/admin/components/ui/select-field";
import { ConfirmDialog } from "@/features/admin/components/ui/confirm-dialog";
import { VocabularyTable } from "./components/vocabulary-table";
import { VocabularyForm } from "./components/vocabulary-form";

export function VocabularyListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("lessonId") ?? "";

  const [lessons, setLessons] = useState<Lesson[] | null>(null);
  const [items, setItems] = useState<Vocabulary[] | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [editing, setEditing] = useState<Vocabulary | null | undefined>(undefined);
  const [deleting, setDeleting] = useState<Vocabulary | null>(null);

  useEffect(() => {
    adminLessonsApi.list().then(setLessons).catch(setError);
  }, []);

  function refetch() {
    adminVocabularyApi.list({ lessonId: lessonId || undefined }).then(setItems).catch(setError);
  }

  useEffect(() => {
    adminVocabularyApi.list({ lessonId: lessonId || undefined }).then(setItems).catch(setError);
  }, [lessonId]);

  function handleLessonFilterChange(nextLessonId: string) {
    const params = new URLSearchParams();
    if (nextLessonId) params.set("lessonId", nextLessonId);
    router.push(`/admin/vocabulary?${params.toString()}`);
  }

  async function handleDeleteConfirm() {
    if (!deleting) return;
    await adminVocabularyApi.remove(deleting.id);
    setDeleting(null);
    refetch();
  }

  if (error) return <ErrorState error={error} />;
  if (!lessons || !items) return <LoadingState />;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono-label text-xs text-muted">Content Management</p>
          <h1 className="text-2xl font-black text-dark">Quản lý Từ vựng</h1>
        </div>
        <Button onClick={() => setEditing(null)} disabled={!lessonId}>
          + Thêm 1 từ
        </Button>
      </div>
      <SelectField
        label="Lọc theo bài học"
        value={lessonId}
        onChange={(e) => handleLessonFilterChange(e.target.value)}
        options={[{ value: "", label: "Tất cả" }, ...lessons.map((l) => ({ value: l.id, label: `${l.titleKo} · ${l.titleVi}` }))]}
      />
      {!lessonId && <p className="text-xs text-muted">Chọn bài học để thêm từ vựng mới.</p>}
      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <VocabularyTable items={items} lessons={lessons} onEdit={(v) => setEditing(v)} onDelete={(v) => setDeleting(v)} />
      )}
      <VocabularyForm
        key={`${editing?.id ?? "create"}-${lessonId}`}
        open={editing !== undefined}
        onClose={() => setEditing(undefined)}
        vocab={editing ?? null}
        lessons={lessons}
        defaultLessonId={lessonId}
        onSaved={refetch}
      />
      <ConfirmDialog
        open={deleting !== null}
        title="Xoá từ vựng"
        message={`Xoá "${deleting?.korean}"? Hành động không thể hoàn tác.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
