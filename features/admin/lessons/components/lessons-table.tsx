import { Badge } from "@/features/admin/components/ui/badge";
import type { Lesson } from "@/shared/api/types/admin-lesson";
import { trackLabel, levelLabel } from "../lib/lesson-enums";
import { PublishToggle } from "./publish-toggle";

type LessonsTableProps = {
  lessons: Lesson[];
  selectedId?: string;
  onTogglePublished: (id: string, next: boolean) => void;
  onSelect: (lesson: Lesson) => void;
  onDelete: (lesson: Lesson) => void;
};

export function LessonsTable({ lessons, selectedId, onTogglePublished, onSelect, onDelete }: LessonsTableProps) {
  return (
    <div className="flex flex-col">
      {lessons.map((lesson, i) => (
        <div
          key={lesson.id}
          onClick={() => onSelect(lesson)}
          className={`flex cursor-pointer items-center gap-3 border-b border-dark/10 px-3 py-3 ${
            selectedId === lesson.id ? "bg-dark/5" : "hover:bg-dark/[0.02]"
          }`}
        >
          <span className="font-mono-label w-6 shrink-0 text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-dark">{lesson.titleVi}</p>
            <p className="truncate text-xs text-muted">{lesson.titleKo}</p>
          </div>
          <Badge>{trackLabel(lesson.track)}</Badge>
          <Badge>{levelLabel(lesson.level)}</Badge>
          <PublishToggle
            lessonId={lesson.id}
            isPublished={lesson.isPublished}
            onChanged={(next) => onTogglePublished(lesson.id, next)}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(lesson);
            }}
            aria-label="Xoá"
            className="rounded-lg px-2 py-1 text-dark/40 hover:bg-dark/5 hover:text-red"
          >
            🗑
          </button>
        </div>
      ))}
    </div>
  );
}
