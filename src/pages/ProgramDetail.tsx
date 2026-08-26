import { useParams } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { programs } from '../data/content'
import type { Program } from '../data/content'
import { getZoneLabel } from '../lib/zones'

function difficultyTone(difficulty: Program['difficulty']) {
  if (difficulty === 'سهل') return 'sage' as const
  if (difficulty === 'متوسط') return 'gold' as const
  return 'rose' as const
}

export default function ProgramDetail() {
  const { id } = useParams<{ id: string }>()
  const program = programs.find((item) => item.id === id)

  if (!program) {
    return (
      <section className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-ink">
          عذراً، لم نجد هذا البرنامج
        </h1>
        <p className="mt-3 text-muted">قد يكون الرابط قديماً أو فيه خطأ صغير.</p>
        <Button className="mt-8" to="/programs">
          العودة إلى البرامج
        </Button>
      </section>
    )
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-medium text-gold">{getZoneLabel(program.zone)}</p>
      <h1 className="mt-2 font-display text-4xl font-bold leading-snug text-ink">
        <span aria-hidden="true" className="me-2">
          {program.imageEmoji}
        </span>
        {program.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{program.subtitle}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Badge tone={difficultyTone(program.difficulty)}>{program.difficulty}</Badge>
        <Badge tone="sand">{program.durationWeeks} أسابيع</Badge>
        <Badge tone="sage">{getZoneLabel(program.zone)}</Badge>
      </div>
      <p className="mt-4 text-sm text-muted">{program.caloriesHint}</p>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-ink">الأهداف</h2>
        <ul className="mt-4 space-y-2 text-muted">
          {program.goals.map((goal) => (
            <li key={goal} className="rounded-[1.25rem] bg-sand/70 px-4 py-3">
              {goal}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-ink">خطة الأيام السبعة</h2>

        <div className="mt-6 hidden overflow-hidden rounded-[1.5rem] border border-sand bg-white/70 md:block">
          <table className="w-full text-start text-sm">
            <thead className="bg-sand/80 text-ink">
              <tr>
                <th className="px-4 py-3 font-semibold">اليوم</th>
                <th className="px-4 py-3 font-semibold">الوجبات</th>
                <th className="px-4 py-3 font-semibold">النشاط</th>
              </tr>
            </thead>
            <tbody>
              {program.weeklyPlan.map((row) => (
                <tr key={row.day} className="border-t border-sand align-top">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{row.day}</td>
                  <td className="px-4 py-3 leading-relaxed text-muted">{row.meals}</td>
                  <td className="px-4 py-3 leading-relaxed text-muted">{row.activity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 space-y-3 md:hidden">
          {program.weeklyPlan.map((row) => (
            <article
              key={row.day}
              className="rounded-[1.5rem] border border-sand bg-white/70 p-4"
            >
              <h3 className="font-semibold text-ink">{row.day}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{row.meals}</p>
              <p className="mt-2 text-sm leading-relaxed text-sage">{row.activity}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-ink">نصائح من القلب</h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-muted">
          {program.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>

      <div className="mt-12 flex flex-wrap gap-3">
        <Button variant="primary" to={`/workouts?zone=${program.zone}`}>
          رياضة لهذه المنطقة
        </Button>
        <Button variant="ghost" to="/programs">
          كل البرامج
        </Button>
      </div>
    </article>
  )
}
