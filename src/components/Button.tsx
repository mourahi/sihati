import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

type ButtonVariant = "primary" | "ghost";

type ButtonBase = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = ButtonBase &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBase> & {
    to?: never;
  };

type ButtonAsLink = ButtonBase &
  Omit<LinkProps, keyof ButtonBase> & {
    to: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const BASE =
  "btn-3d inline-flex items-center justify-center gap-2 rounded-[1.5rem] px-5 py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-rose text-cream shadow-[0_10px_28px_rgba(224,122,144,0.32)] hover:bg-rose-deep",
  ghost:
    "border border-sand bg-transparent text-ink hover:border-gold/50 hover:bg-sand/70",
};

function classes(variant: ButtonVariant, className: string | undefined) {
  return [BASE, VARIANTS[variant], className].filter(Boolean).join(" ");
}

export function Button(props: ButtonProps) {
  if ("to" in props && props.to != null) {
    const { variant = "primary", className, children, to, ...rest } = props;
    return (
      <Link to={to} className={classes(variant, className)} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant = "primary", className, children, type, ...rest } = props;
  return (
    <button type={type ?? "button"} className={classes(variant, className)} {...rest}>
      {children}
    </button>
  );
}
