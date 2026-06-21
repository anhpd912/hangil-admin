type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: { value: string; label: string }[];
};

export function SelectField({ label, id, options, className = "", ...rest }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="font-mono-label text-xs text-muted">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`rounded-2xl border border-dark bg-cream px-4 py-2 text-dark ${className}`}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
