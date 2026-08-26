import { Link } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { FloralDivider, FloralIllustration, IconMoon } from '../components/Florals'
import { ClassCard } from '../components/ClassCard'
import { FoodCard } from '../components/FoodCard'
import { ProgramCard } from '../components/ProgramCard'
import { SectionTitle } from '../components/SectionTitle'
import { ZoneCard } from '../components/ZoneCard'
import { foodTips, gymClasses, programs, siteCopy, zones } from '../data/content'
import { getZoneLabel } from '../lib/zones'

export default function Home() {
  const featuredPrograms = programs.slice(0, 3)
  const featuredClasses = gymClasses.slice(0, 3)
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
            <Button variant="ghost" to="/classes">
              حصة رياضية
            </Button>
            <Button variant="ghost" to="/nutrition">
              المطبخ
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
          eyebrow="حصة رياضية"
          title="تابعي الصفّ كأنكِ في النادي"
          subtitle="فيديوهات حصص كاملة: حركات، موسيقى تحفيزية، ومدربة على الشاشة."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {featuredClasses.map((item) => (
            <ClassCard key={item.id} item={item} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="ghost" to="/classes">
            كل الحصص
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

      <aside className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 overflow-hidden rounded-[1.75rem] bg-gradient-to-l from-rose-deep via-rose to-[#d4a07a] px-6 py-6 text-cream sm:flex-row sm:items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-sm text-cream/90">
              <IconMoon className="h-4 w-4" />
              خصوصية أولاً
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold">تتبع الدورة الشهرية</h2>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-cream/90">
              تقويم بألوان المراحل. تضغطين اليوم مباشرة على الشبكة، والدخول برقم سري.
            </p>
          </div>
          <Link
            to="/cycle"
            className="inline-flex items-center justify-center rounded-[1.5rem] bg-cream px-5 py-2.5 text-sm font-semibold text-rose-deep transition hover:bg-paper"
          >
            فتح التقويم
          </Link>
        </div>
      </aside>

      <aside className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="rounded-[1.5rem] border border-gold/30 bg-sand/80 px-6 py-5">
          <Badge tone="gold">تنبيه لطيف</Badge>
          <p className="mt-3 text-sm leading-relaxed text-muted">{siteCopy.disclaimer}</p>
        </div>
      </aside>
    </>
  )
}
