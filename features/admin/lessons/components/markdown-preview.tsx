function renderInline(text: string) {
  return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

/** Renderer markdown tối giản — đủ cho preview nội dung bài học, không phải parser đầy đủ. */
export function MarkdownPreview({ markdown }: { markdown: string }) {
  const lines = markdown.split("\n");

  return (
    <div className="flex flex-col gap-2 text-sm text-dark">
      {lines.map((line, i) => {
        if (line.startsWith("### ")) {
          return <h3 key={i} className="text-base font-bold">{line.slice(4)}</h3>;
        }
        if (line.startsWith("## ")) {
          return <h2 key={i} className="text-lg font-bold">{line.slice(3)}</h2>;
        }
        if (line.startsWith("# ")) {
          return <h1 key={i} className="text-xl font-black">{line.slice(2)}</h1>;
        }
        if (line.startsWith("- ")) {
          return (
            <li key={i} className="ml-4" dangerouslySetInnerHTML={{ __html: renderInline(line.slice(2)) }} />
          );
        }
        if (!line.trim()) return <br key={i} />;
        return <p key={i} dangerouslySetInnerHTML={{ __html: renderInline(line) }} />;
      })}
    </div>
  );
}
