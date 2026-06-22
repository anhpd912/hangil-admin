import { TextField } from "@/features/admin/components/ui/text-field";
import { Button } from "@/features/admin/components/ui/button";
import type { LessonExample } from "@/shared/api/types/admin-lesson";

type ExamplesEditorProps = {
  value: LessonExample[];
  onChange: (value: LessonExample[]) => void;
};

export function ExamplesEditor({ value, onChange }: ExamplesEditorProps) {
  function updateRow(i: number, patch: Partial<LessonExample>) {
    onChange(value.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));
  }

  function removeRow(i: number) {
    onChange(value.filter((_, idx) => idx !== i));
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="font-mono-label text-xs text-muted">Ví dụ</p>
        <Button
          type="button"
          variant="ghost"
          onClick={() => onChange([...value, { korean: "", vietnamese: "", source: "" }])}
        >
          + Thêm ví dụ
        </Button>
      </div>
      {value.map((row, i) => (
        <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 rounded-xl border border-dark/10 p-3">
          <TextField placeholder="Hangul" value={row.korean} onChange={(e) => updateRow(i, { korean: e.target.value })} />
          <TextField placeholder="Tiếng Việt" value={row.vietnamese} onChange={(e) => updateRow(i, { vietnamese: e.target.value })} />
          <button type="button" onClick={() => removeRow(i)} className="text-dark/40 hover:text-red">
            🗑
          </button>
        </div>
      ))}
    </div>
  );
}
