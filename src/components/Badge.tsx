import type { ReactNode } from "react";

type BadgeTone = "rose" | "sage" | "gold" | "sand";

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
};

const TONES: Record<BadgeTone, string> = {
  rose: "bg-rose/15 text-rose-deep",
  sage: "bg-sage/12 text-sage",
  gold: "bg-gold/20 text-ink",
  sand: "bg-sand text-muted",
};

export function Badge({ children, tone = "rose", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
