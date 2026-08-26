import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { SectionTitle } from '../components/SectionTitle'
import { WorkoutCard } from '../components/WorkoutCard'
import { YoutubeEmbed } from '../components/YoutubeEmbed'
import { workouts, zones } from '../data/content'
import { getZoneLabel, isBodyZone } from '../lib/zones'

export default function Workouts() {
  const { videoId } = useParams<{ videoId: string }>()
  const [searchParams] = useSearchParams()
  const zoneParam = searchParams.get('zone')
  const activeZone = isBodyZone(zoneParam) ? zoneParam : null

  const selected = videoId
    ? workouts.find((item) => item.youtubeId === videoId)
    : undefined

  const visible = activeZone
    ? workouts.filter((item) => item.zone === activeZone)
    : workouts

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [videoId])

  const filterTo = (zoneId: string | null) => {
    const base = videoId ? `/workouts/${videoId}` : '/workouts'
    return zoneId ? `${base}?zone=${zoneId}` : base
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      {selected ? (
        <div className="mb-14">
          <YoutubeEmbed youtubeId={selected.youtubeId} title={selected.title} />
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge tone="sage">{selected.level}</Badge>
            <Badge tone="gold">{getZoneLabel(selected.zone)}</Badge>
            <Badge tone="sand">{selected.durationMin} دقيقة</Badge>
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold text-ink">{selected.title}</h1>
          <p className="mt-2 text-muted">{selected.channel}</p>
        </div>
      ) : videoId ? (
        <div className="mb-12 rounded-[1.5rem] border border-sand bg-paper/70 px-6 py-8 text-center">
          <h1 className="font-display text-2xl font-bold text-ink">
            عذراً، لم نجد هذا الفيديو
          </h1>
          <p className="mt-2 text-muted">اختاري تمريناً من القائمة أسفله.</p>
          <Button className="mt-6" variant="ghost" to="/workouts">
            كل التمارين
          </Button>
        </div>
      ) : (
        <SectionTitle
          eyebrow="الرياضة"
          title="فيديوهات تتبعينها من المنزل"
          subtitle="مدربات معروفات، مدد قصيرة، ومستوى واضح. اختاري المنطقة وابدئي بلطف."
        />
      )}

      <div className="flex flex-wrap justify-center gap-2">
        <Button variant={activeZone === null ? 'primary' : 'ghost'} to={filterTo(null)}>
          الكل
        </Button>
        {zones.map((zone) => (
          <Button
            key={zone.id}
            variant={activeZone === zone.id ? 'primary' : 'ghost'}
            to={filterTo(zone.id)}
          >
            {zone.label}
          </Button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 text-center text-muted">لا توجد تمارين لهذه المنطقة بعد.</p>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((workout) => (
            <WorkoutCard
              key={workout.id}
              title={workout.title}
              durationMin={workout.durationMin}
              level={workout.level}
              youtubeId={workout.youtubeId}
              channel={workout.channel}
              zoneLabel={getZoneLabel(workout.zone)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
