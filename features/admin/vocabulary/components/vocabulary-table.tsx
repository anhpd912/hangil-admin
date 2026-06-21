import { DataTable, type Column } from "@/features/admin/components/ui/data-table";
import { Badge } from "@/features/admin/components/ui/badge";
import type { Vocabulary } from "@/shared/api/types/admin-vocabulary";
import type { Lesson } from "@/shared/api/types/admin-lesson";

type VocabularyTableProps = {
  items: Vocabulary[];
  lessons: Lesson[];
  onEdit: (vocab: Vocabulary) => void;
  onDelete: (vocab: Vocabulary) => void;
};

export function VocabularyTable({ items, lessons, onEdit, onDelete }: VocabularyTableProps) {
  function lessonLabel(lessonId: string) {
    const lesson = lessons.find((l) => l.id === lessonId);
    return lesson ? `Bài ${lesson.orderIndex}` : "—";
  }

  const columns: Column<Vocabulary>[] = [
    { key: "korean", header: "Korean", render: (row) => row.korean },
    { key: "romanization", header: "Romanization", render: (row) => <span className="italic text-muted">{row.romanization}</span> },
    { key: "vietnamese", header: "Vietnamese" },
    { key: "lessonId", header: "Bài học", render: (row) => <Badge>{lessonLabel(row.lessonId)}</Badge> },
    { key: "audioUrl", header: "Audio", render: (row) => (row.audioUrl ? "🔊" : "—") },
    {
      key: "actions",
      header: "",
      render: (row) => (
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(row)}
            aria-label="Sửa"
            className="rounded-lg px-2 py-1 text-dark/60 hover:bg-dark/5 hover:text-dark"
          >
            ✎
          </button>
          <button
            onClick={() => onDelete(row)}
            aria-label="Xoá"
            className="rounded-lg px-2 py-1 text-dark/60 hover:bg-dark/5 hover:text-red"
          >
            🗑
          </button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} rows={items} rowKey={(row) => row.id} />;
}
