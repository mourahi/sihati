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
  imageUrl: string;
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
  imageUrl,
}: ProgramCardProps) {
  const tone = DIFFICULTY_TONE[difficulty] ?? "sand";

  return (
    <Link
      id={id}
      to={href}
      className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-sand bg-paper/70 shadow-[0_8px_30px_rgba(44,36,32,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_12px_40px_rgba(44,36,32,0.1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <img
          src={imageUrl}
          alt=""
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-ink/10 transition group-hover:bg-ink/20"
        />
        <div className="absolute bottom-3 start-3 flex flex-wrap gap-2">
          <Badge tone={tone} className="bg-cream/90">
            {difficulty}
          </Badge>
          <Badge tone="sand" className="bg-cream/90">
            {durationWeeks} أسابيع
          </Badge>
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-3 end-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-cream/85 text-rose"
        >
          <IconBlossom className="h-3.5 w-3.5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-bold text-ink group-hover:text-rose-deep">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{subtitle}</p>
        <p className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-sage">
          <IconLeaf className="h-3.5 w-3.5 text-sage" />
          {zoneLabel}
        </p>
      </div>
    </Link>
  );
}
