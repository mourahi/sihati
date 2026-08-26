import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { FloralDivider, FloralIllustration } from '../components/Florals'
import { FoodCard } from '../components/FoodCard'
import { ProgramCard } from '../components/ProgramCard'
import { SectionTitle } from '../components/SectionTitle'
import { WorkoutCard } from '../components/WorkoutCard'
import { ZoneCard } from '../components/ZoneCard'
import { foodTips, programs, siteCopy, workouts, zones } from '../data/content'
import { getZoneLabel } from '../lib/zones'

export default function Home() {
  const featuredPrograms = programs.slice(0, 3)
  const featuredFoods = foodTips.slice(0, 3)

  return (
    <>
      <section className="relative overflow-hidden bg-sand px-4 py-16 sm:px-8 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -start-16 top-8 h-48 w-48 rounded-full bg-rose/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-10 bottom-0 h-56 w-56 rounded-full bg-sage/10 blur-3xl"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <FloralIllustration
            name="corner"
            alt=""
            className="absolute -start-8 -top-6 h-[170px] w-[170px] mix-blend-multiply opacity-50"
          />
          <FloralIllustration
            name="sprig"
            alt=""
            className="absolute -end-6 bottom-2 h-[150px] w-[150px] mix-blend-multiply opacity-45"
          />
        </div>
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-1.5 font-sans text-sm font-medium text-rose">
            <FloralIllustration
              name="roses"
              alt=""
              className="pointer-events-none h-8 w-8 mix-blend-multiply opacity-55"
            />
            {siteCopy.tagline}
          </p>
          <h1 className="mt-4 font-display text-[2.15rem] font-semibold leading-relaxed text-ink sm:text-[2.85rem]">
            {siteCopy.heroTitle}
          </h1>
          <FloralDivider />
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {siteCopy.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button variant="primary" to="/programs">
              البرامج
            </Button>
            <Button variant="ghost" to="/workouts">
              الرياضة
            </Button>
          </div>
          <p className="mt-8 text-xs text-muted">
            للبطن · الخصر · الأفخاذ · الذراعين · الأرداف · الجسم كامل
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionTitle
          eyebrow="اختاري منطقتك"
          title="ستة مداخل للجسم… بنفس اللطف"
          subtitle="كل منطقة عندها برنامج أكل وتمارين يناسب إيقاع الدار والحياة المغربية."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {zones.map((zone) => (
            <ZoneCard
              key={zone.id}
              id={zone.id}
              label={zone.label}
              description={zone.description}
              href={`/programs?zone=${zone.id}`}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionTitle
          eyebrow="البرامج"
          title="ثلاثة مسارات نبدأو بيهم"
          subtitle="أسابيع قصيرة، أكل كتعرفيه، وحركة تقدرين تكملها."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {featuredPrograms.map((program) => (
            <ProgramCard
              key={program.id}
              id={program.id}
              title={program.title}
              subtitle={program.subtitle}
              durationWeeks={program.durationWeeks}
              difficulty={program.difficulty}
              zoneLabel={getZoneLabel(program.zone)}
              href={`/programs/${program.id}`}
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="ghost" to="/programs">
            كل البرامج
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionTitle
          eyebrow="الرياضة"
          title="فيديوهات تتبعينها في البيت"
          subtitle="مدربات معروفات على يوتوب، مدة قصيرة، وتختارين المنطقة اللي تهمّك."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {workouts.slice(0, 3).map((workout) => (
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
        <div className="mt-8 text-center">
          <Button variant="ghost" to="/workouts">
            كل الفيديوهات
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionTitle
          eyebrow="المطبخ الصحي"
          title="وصفات مغربية خفيفة"
          subtitle="حريرة، طاجين، كسكس… بنسخة تشبع وما تثقلش."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {featuredFoods.map((food) => (
            <FoodCard
              key={food.id}
              id={food.id}
              title={food.title}
              category={food.category}
              summary={food.summary}
              href={`/nutrition/${food.id}`}
              imageUrl={food.imageUrl}
              youtubeId={food.youtubeId}
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="ghost" to="/nutrition">
            المزيد من الوصفات
          </Button>
        </div>
      </section>

      <aside className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="rounded-[1.5rem] border border-gold/30 bg-sand/80 px-6 py-5">
          <Badge tone="gold">تنبيه لطيف</Badge>
          <p className="mt-3 text-sm leading-relaxed text-muted">{siteCopy.disclaimer}</p>
        </div>
      </aside>
    </>
  )
}
