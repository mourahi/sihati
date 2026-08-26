import { useParams } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { YoutubeEmbed } from '../components/YoutubeEmbed'
import { gymClasses } from '../data/content'

export default function ClassDetail() {
  const { id } = useParams<{ id: string }>()
  const item = gymClasses.find((entry) => entry.id === id)

  if (!item) {
    return (
      <section className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-ink">عذراً، لم نجد هذه الحصة</h1>
        <p className="mt-3 text-muted">اختاري حصة أخرى من القائمة.</p>
        <Button className="mt-8" to="/classes">
          كل الحصص
        </Button>
      </section>
    )
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-16">
      <div className="flex flex-wrap gap-2">
        <Badge tone="gold">{item.style}</Badge>
        <Badge tone="sage">{item.level}</Badge>
        <Badge tone="sand">{item.durationMin} دقيقة</Badge>
      </div>
      <h1 className="mt-4 font-display text-[1.7rem] font-bold leading-snug text-ink sm:text-4xl">
        {item.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{item.summary}</p>

      <section className="mt-8">
        <YoutubeEmbed youtubeId={item.youtubeId} title={item.title} />
        <p className="mt-3 text-sm text-muted">{item.channel}</p>
      </section>

      <section className="mt-10 rounded-[1.5rem] bg-sand/80 px-5 py-5">
        <h2 className="font-display text-2xl font-bold text-ink">كيف تتابعين الحصة؟</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-muted">
          <li>اتركي مسافة خطوتين أمام الشاشة، كما لو وقفتِ في صفّ النادي.</li>
          <li>شغِّلي الصوت: الموسيقى هي الإيقاع، والحركات تتبع العدّ على الشاشة.</li>
          <li>لا تحتاجين أن تكوني مثالية من أول مرة؛ كرري الأسبوع المقبل بنفس الفيديو.</li>
          <li>إن أحسستِ بألم حاد أو ضيق في التنفس، توقفي واشربي ماء.</li>
        </ul>
      </section>

      <Button className="mt-10" variant="ghost" to="/classes">
        حصص أخرى
      </Button>
    </article>
  )
}
