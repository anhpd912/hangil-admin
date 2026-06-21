type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function TextField({ label, id, className = "", ...rest }: TextFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="font-mono-label text-xs text-muted">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`rounded-2xl border border-dark bg-cream px-4 py-2 text-dark ${className}`}
        {...rest}
      />
    </div>
  );
}
