import { useSearchParams } from 'react-router-dom'
import { Button } from '../components/Button'
import { ProgramCard } from '../components/ProgramCard'
import { SectionTitle } from '../components/SectionTitle'
import { programs, zones } from '../data/content'
import { getZoneLabel, isBodyZone, programImageUrl } from '../lib/zones'

export default function Programs() {
  const [searchParams] = useSearchParams()
  const zoneParam = searchParams.get('zone')
  const activeZone = isBodyZone(zoneParam) ? zoneParam : null

  const visible = activeZone
    ? programs.filter((program) => program.zone === activeZone)
    : programs

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle
        eyebrow="البرامج"
        title="مسار حسب منطقة جسمكِ"
        subtitle="اختاري المنطقة، وتابعي أسبوعاً بلطف: أكل مغربي وحركة من الدار."
      />

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <Button variant={activeZone === null ? 'primary' : 'ghost'} to="/programs">
          الكل
        </Button>
        {zones.map((zone) => (
          <Button
            key={zone.id}
            variant={activeZone === zone.id ? 'primary' : 'ghost'}
            to={`/programs?zone=${zone.id}`}
          >
            {zone.label}
          </Button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 text-center text-muted">لا توجد برامج لهذه المنطقة بعد.</p>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((program) => (
            <ProgramCard
              key={program.id}
              id={program.id}
              title={program.title}
              subtitle={program.subtitle}
              durationWeeks={program.durationWeeks}
              difficulty={program.difficulty}
              zoneLabel={getZoneLabel(program.zone)}
              href={`/programs/${program.id}`}
              imageUrl={programImageUrl(program.zone)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
