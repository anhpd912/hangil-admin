"use client";

type LessonContentEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export function LessonContentEditor({ value, onChange }: LessonContentEditorProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-mono-label text-xs text-muted">Nội dung bài học (markdown)</label>
      <textarea
        rows={14}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-2xl border border-dark/20 bg-cream px-4 py-3 font-mono text-sm text-dark"
      />
    </div>
  );
}

/** content jsonb lưu {markdown: string} — round-trip an toàn dù schema chưa cố định ở BE. */
export function contentToMarkdown(content: unknown): string {
  if (content && typeof content === "object" && "markdown" in content) {
    return String((content as { markdown: unknown }).markdown ?? "");
  }
  return "";
}

export function markdownToContent(markdown: string): unknown {
  return markdown.trim() ? { markdown } : undefined;
}
