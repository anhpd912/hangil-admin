"use client";

import { useState } from "react";
import { Drawer } from "@/features/admin/components/ui/drawer";
import { TextField } from "@/features/admin/components/ui/text-field";
import { SelectField } from "@/features/admin/components/ui/select-field";
import { Button } from "@/features/admin/components/ui/button";
import { ApiError } from "@/shared/api/api-error";
import { errorMessage } from "@/features/admin/lib/error-message";
import { adminVocabularyApi } from "@/shared/api/admin-vocabulary-api";
import type { Vocabulary } from "@/shared/api/types/admin-vocabulary";
import type { Lesson } from "@/shared/api/types/admin-lesson";

type VocabularyFormProps = {
  open: boolean;
  onClose: () => void;
  vocab: Vocabulary | null;
  lessons: Lesson[];
  defaultLessonId: string;
  onSaved: () => void;
};

export function VocabularyForm({ open, onClose, vocab, lessons, defaultLessonId, onSaved }: VocabularyFormProps) {
  const [lessonId, setLessonId] = useState(vocab?.lessonId ?? defaultLessonId);
  const [korean, setKorean] = useState(vocab?.korean ?? "");
  const [romanization, setRomanization] = useState(vocab?.romanization ?? "");
  const [vietnamese, setVietnamese] = useState(vocab?.vietnamese ?? "");
  const [exampleSentenceKo, setExampleSentenceKo] = useState(vocab?.exampleSentenceKo ?? "");
  const [exampleSentenceVi, setExampleSentenceVi] = useState(vocab?.exampleSentenceVi ?? "");
  const [audioUrl, setAudioUrl] = useState(vocab?.audioUrl ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const common = {
        korean,
        romanization,
        vietnamese,
        exampleSentenceKo: exampleSentenceKo || undefined,
        exampleSentenceVi: exampleSentenceVi || undefined,
        audioUrl: audioUrl || undefined,
      };
      if (vocab) {
        await adminVocabularyApi.update(vocab.id, common);
      } else {
        await adminVocabularyApi.create({ ...common, lessonId });
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? errorMessage(err.code) : "Lỗi không xác định");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Drawer open={open} onClose={onClose} title={vocab ? "Sửa từ vựng" : "Thêm từ vựng"}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {!vocab && (
          <SelectField
            label="Bài học"
            value={lessonId}
            onChange={(e) => setLessonId(e.target.value)}
            options={lessons.map((l) => ({ value: l.id, label: `${l.titleKo} · ${l.titleVi}` }))}
          />
        )}
        <TextField label="Hangul" value={korean} onChange={(e) => setKorean(e.target.value)} required />
        <TextField label="Phiên âm" value={romanization} onChange={(e) => setRomanization(e.target.value)} required />
        <TextField label="Tiếng Việt" value={vietnamese} onChange={(e) => setVietnamese(e.target.value)} required />
        <TextField
          label="Ví dụ (Hangul, optional)"
          value={exampleSentenceKo}
          onChange={(e) => setExampleSentenceKo(e.target.value)}
        />
        <TextField
          label="Ví dụ (Tiếng Việt, optional)"
          value={exampleSentenceVi}
          onChange={(e) => setExampleSentenceVi(e.target.value)}
        />
        <TextField label="Audio URL (optional)" value={audioUrl} onChange={(e) => setAudioUrl(e.target.value)} />
        {error && <p className="text-sm text-red">{error}</p>}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang lưu..." : "Lưu"}
        </Button>
      </form>
    </Drawer>
  );
}
