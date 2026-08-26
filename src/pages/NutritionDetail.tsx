import { useParams } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { YoutubeEmbed } from '../components/YoutubeEmbed'
import { foodTips } from '../data/content'

export default function NutritionDetail() {
  const { id } = useParams<{ id: string }>()
  const food = foodTips.find((item) => item.id === id)

  if (!food) {
    return (
      <section className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-ink">
          عذراً، لم نجد هذه الوصفة
        </h1>
        <p className="mt-3 text-muted">جرّبي قائمة المطبخ الصحي، الوصفات كلها هناك.</p>
        <Button className="mt-8" to="/nutrition">
          العودة إلى المطبخ الصحي
        </Button>
      </section>
    )
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Badge tone="sage">{food.category}</Badge>
      <h1 className="mt-4 font-display text-4xl font-bold leading-snug text-ink">
        {food.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{food.summary}</p>

      <figure className="mt-8 overflow-hidden rounded-[1.5rem] bg-sand shadow-[0_8px_30px_rgba(44,36,32,0.06)]">
        <img
          src={food.imageUrl}
          alt={food.title}
          className="aspect-[16/10] w-full object-cover"
        />
      </figure>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold text-ink">شاهدي الفيديو</h2>
        <p className="mt-2 text-sm text-muted">{food.channel}</p>
        <div className="mt-4">
          <YoutubeEmbed youtubeId={food.youtubeId} title={food.title} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold text-ink">المكوّنات</h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-muted">
          {food.ingredients.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold text-ink">طريقة التحضير</h2>
        <ol className="mt-4 list-inside list-decimal space-y-2 text-muted">
          {food.howTo.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mt-10 rounded-[1.5rem] bg-sand/80 px-5 py-5">
        <h2 className="font-display text-2xl font-bold text-ink">لماذا هي مفيدة؟</h2>
        <p className="mt-3 leading-relaxed text-muted">{food.whyHealthy}</p>
      </section>

      {food.swapFrom ? (
        <p className="mt-6 rounded-[1.5rem] border border-gold/40 bg-white/70 px-5 py-4 text-sm leading-relaxed text-ink">
          {food.swapFrom}
        </p>
      ) : null}

      <Button className="mt-10" variant="ghost" to="/nutrition">
        وصفات أخرى
      </Button>
    </article>
  )
}
