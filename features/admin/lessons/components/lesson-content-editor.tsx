import type { LessonContent } from "@/shared/api/types/admin-lesson";
import { TheoryEditor } from "./theory-editor";
import { ExamplesEditor } from "./examples-editor";
import { ExercisesEditor } from "./exercises-editor";

export const EMPTY_CONTENT: LessonContent = {
  theory: { title: "", explanation: "", notes: "" },
  examples: [],
  exercises: [],
};

type LessonContentEditorProps = {
  value: LessonContent;
  onChange: (value: LessonContent) => void;
};

export function LessonContentEditor({ value, onChange }: LessonContentEditorProps) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-dark/10 p-4">
      <TheoryEditor value={value.theory} onChange={(theory) => onChange({ ...value, theory })} />
      <ExamplesEditor value={value.examples} onChange={(examples) => onChange({ ...value, examples })} />
      <ExercisesEditor value={value.exercises} onChange={(exercises) => onChange({ ...value, exercises })} />
    </div>
  );
}
