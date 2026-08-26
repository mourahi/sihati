import { Link } from "react-router-dom";
import { Badge } from "./Badge";

type WorkoutCardProps = {
  title: string;
  durationMin: number;
  level: string;
  youtubeId: string;
  channel: string;
  zoneLabel: string;
};

const LEVEL_LABEL: Record<string, string> = {
  beginner: "مبتدئة",
  easy: "مبتدئة",
  intermediate: "متوسطة",
  medium: "متوسطة",
  advanced: "متقدمة",
  hard: "متقدمة",
};

function levelLabel(value: string) {
  return LEVEL_LABEL[value] ?? value;
}

export function WorkoutCard({
  title,
  durationMin,
  level,
  youtubeId,
  channel,
  zoneLabel,
}: WorkoutCardProps) {
  const href = `/workouts/${youtubeId}`;
  const thumbnail = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

  return (
    <Link
      to={href}
      className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-sand bg-white/70 shadow-[0_8px_30px_rgba(44,36,32,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_12px_40px_rgba(44,36,32,0.1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
    >
      <div className="relative aspect-video overflow-hidden bg-sand">
        <img
          src={thumbnail}
          alt=""
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-ink/15 transition group-hover:bg-ink/25"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose text-cream shadow-[0_8px_24px_rgba(224,122,144,0.45)]"
        >
          <svg viewBox="0 0 24 24" className="ms-0.5 h-6 w-6 fill-current" aria-hidden="true">
            <path d="M8.5 6.8v10.4L18 12 8.5 6.8z" />
          </svg>
        </span>
        <Badge tone="sand" className="absolute bottom-3 start-3 bg-cream/90">
          {durationMin} دقيقة
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="sage">{levelLabel(level)}</Badge>
          <span className="text-xs font-medium text-sage">{zoneLabel}</span>
        </div>
        <h3 className="mt-3 font-display text-lg font-bold leading-snug text-ink group-hover:text-rose-deep">
          {title}
        </h3>
        <p className="mt-2 text-xs text-muted">{channel}</p>
        <span className="mt-4 inline-flex w-fit items-center rounded-[1.5rem] bg-rose px-4 py-2 text-sm font-semibold text-cream">
          شاهد
        </span>
      </div>
    </Link>
  );
}
