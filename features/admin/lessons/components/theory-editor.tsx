import { TextField } from "@/features/admin/components/ui/text-field";
import type { LessonContent } from "@/shared/api/types/admin-lesson";

type TheoryEditorProps = {
  value: LessonContent["theory"];
  onChange: (value: LessonContent["theory"]) => void;
};

export function TheoryEditor({ value, onChange }: TheoryEditorProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono-label text-xs text-muted">Lý thuyết</p>
      <TextField
        label="Tiêu đề"
        value={value.title}
        onChange={(e) => onChange({ ...value, title: e.target.value })}
      />
      <div className="flex flex-col gap-1">
        <label className="font-mono-label text-xs text-muted">Giải thích</label>
        <textarea
          rows={4}
          value={value.explanation}
          onChange={(e) => onChange({ ...value, explanation: e.target.value })}
          className="rounded-2xl border border-dark/20 bg-cream px-4 py-2.5 text-sm text-dark"
        />
      </div>
      <TextField
        label="Ghi chú (optional)"
        value={value.notes ?? ""}
        onChange={(e) => onChange({ ...value, notes: e.target.value })}
      />
    </div>
  );
}
