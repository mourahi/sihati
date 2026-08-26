import { Link } from 'react-router-dom'
import { Badge } from './Badge'
import { IconBlossom } from './Florals'
import type { GymClass } from '../data/content'

type ClassCardProps = {
  item: GymClass
}

export function ClassCard({ item }: ClassCardProps) {
  const thumbnail = `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`

  return (
    <Link
      id={item.id}
      to={`/classes/${item.id}`}
      className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-sand bg-paper/70 shadow-[0_8px_30px_rgba(44,36,32,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_12px_40px_rgba(44,36,32,0.1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
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
          {item.durationMin} دقيقة
        </Badge>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-3 end-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-cream/85 text-rose"
        >
          <IconBlossom className="h-3.5 w-3.5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="sage">{item.level}</Badge>
          <Badge tone="gold">{item.style}</Badge>
        </div>
        <h3 className="mt-3 font-display text-lg font-bold leading-snug text-ink group-hover:text-rose-deep">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{item.summary}</p>
        <p className="mt-2 text-xs text-muted">{item.channel}</p>
        <span className="mt-4 inline-flex w-fit items-center rounded-[1.5rem] bg-rose px-4 py-2 text-sm font-semibold text-cream">
          ابدئي الحصة
        </span>
      </div>
    </Link>
  )
}
