export type Column<T> = {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
};

export function DataTable<T extends Record<string, unknown>>({ columns, rows, rowKey }: DataTableProps<T>) {
  return (
    <table className="w-full border-collapse text-left">
      <thead>
        <tr className="border-b border-line-strong">
          {columns.map((col, i) => (
            <th key={col.key} className="font-mono-label py-3 pr-4 text-[11px] uppercase tracking-[0.1em] text-muted-ink">
              {col.header && String(i + 1).padStart(2, "0") + " — " + col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={rowKey(row)} className="border-b border-line transition-colors hover:bg-dark/[0.03]">
            {columns.map((col) => (
              <td key={col.key} className="py-3.5 pr-4 text-[14px] leading-6 text-dark">
                {col.render ? col.render(row) : String(row[col.key] ?? "")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
