import { Link } from "react-router-dom";
import { Badge } from "./Badge";
import { IconBlossom, IconLeaf } from "./Florals";

type ProgramCardProps = {
  id: string;
  title: string;
  subtitle: string;
  durationWeeks: number;
  difficulty: string;
  zoneLabel: string;
  href: string;
};

const DIFFICULTY_TONE: Record<string, "sage" | "gold" | "rose"> = {
  beginner: "sage",
  easy: "sage",
  سهل: "sage",
  مبتدئة: "sage",
  intermediate: "gold",
  medium: "gold",
  متوسط: "gold",
  متوسطة: "gold",
  advanced: "rose",
  hard: "rose",
  متقدم: "rose",
  متقدمة: "rose",
};

export function ProgramCard({
  id,
  title,
  subtitle,
  durationWeeks,
  difficulty,
  zoneLabel,
  href,
}: ProgramCardProps) {
  const tone = DIFFICULTY_TONE[difficulty] ?? "sand";

  return (
    <Link
      id={id}
      to={href}
      className="group relative flex flex-col rounded-[1.5rem] border border-sand bg-paper/70 p-6 shadow-[0_8px_30px_rgba(44,36,32,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_12px_40px_rgba(44,36,32,0.1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
    >
      <IconBlossom className="pointer-events-none absolute top-3 end-3 h-3.5 w-3.5 text-rose/35" />
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={tone}>{difficulty}</Badge>
        <Badge tone="sand">{durationWeeks} أسابيع</Badge>
      </div>
      <h3 className="mt-4 font-display text-xl font-bold text-ink group-hover:text-rose-deep">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{subtitle}</p>
      <p className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-sage">
        <IconLeaf className="h-3.5 w-3.5 text-sage" />
        {zoneLabel}
      </p>
    </Link>
  );
}
