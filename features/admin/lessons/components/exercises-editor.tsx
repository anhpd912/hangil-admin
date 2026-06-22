import { TextField } from "@/features/admin/components/ui/text-field";
import { Button } from "@/features/admin/components/ui/button";
import type { LessonExercise } from "@/shared/api/types/admin-lesson";

type ExercisesEditorProps = {
  value: LessonExercise[];
  onChange: (value: LessonExercise[]) => void;
};

export function ExercisesEditor({ value, onChange }: ExercisesEditorProps) {
  function updateRow(i: number, patch: Partial<LessonExercise>) {
    onChange(value.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));
  }

  function removeRow(i: number) {
    onChange(value.filter((_, idx) => idx !== i));
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="font-mono-label text-xs text-muted">Bài tập</p>
        <Button
          type="button"
          variant="ghost"
          onClick={() => onChange([...value, { type: "multiple_choice", prompt: "", options: [], answer: "" }])}
        >
          + Thêm bài tập
        </Button>
      </div>
      {value.map((row, i) => (
        <div key={i} className="flex flex-col gap-2 rounded-xl border border-dark/10 p-3">
          <div className="flex items-center justify-between gap-2">
            <TextField placeholder="Loại (multiple_choice, fill_blank...)" value={row.type} onChange={(e) => updateRow(i, { type: e.target.value })} />
            <button type="button" onClick={() => removeRow(i)} className="text-dark/40 hover:text-red">
              🗑
            </button>
          </div>
          <TextField placeholder="Câu hỏi" value={row.prompt} onChange={(e) => updateRow(i, { prompt: e.target.value })} />
          <TextField
            placeholder="Các lựa chọn (phân tách bằng dấu phẩy)"
            value={(row.options ?? []).join(", ")}
            onChange={(e) => updateRow(i, { options: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
          />
          <TextField placeholder="Đáp án đúng" value={row.answer} onChange={(e) => updateRow(i, { answer: e.target.value })} />
        </div>
      ))}
    </div>
  );
}
