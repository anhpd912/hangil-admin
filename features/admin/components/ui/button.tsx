type ButtonVariant = "primary" | "secondary" | "ghost";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "bg-red text-parchment",
  secondary: "bg-dark text-parchment",
  ghost: "bg-transparent text-dark underline underline-offset-4",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({ variant = "primary", className = "", ...rest }: ButtonProps) {
  const shape = variant === "ghost" ? "" : "rounded-full px-4 py-2";
  return (
    <button
      className={`font-bold disabled:opacity-50 ${shape} ${VARIANT_CLASS[variant]} ${className}`}
      {...rest}
    />
  );
}
