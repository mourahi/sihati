import { useSearchParams } from 'react-router-dom'
import { Button } from '../components/Button'
import { ClassCard } from '../components/ClassCard'
import { SectionTitle } from '../components/SectionTitle'
import { gymClasses } from '../data/content'
import type { ClassStyle } from '../data/content'

const styles = [...new Set(gymClasses.map((item) => item.style))]

function isClassStyle(value: string | null): value is ClassStyle {
  return value !== null && styles.includes(value as ClassStyle)
}

export default function Classes() {
  const [searchParams] = useSearchParams()
  const styleParam = searchParams.get('style')
  const activeStyle = isClassStyle(styleParam) ? styleParam : null

  const visible = activeStyle
    ? gymClasses.filter((item) => item.style === activeStyle)
    : gymClasses

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle
        eyebrow="حصة رياضية"
        title="تابعي الصفّ كأنكِ في النادي"
        subtitle="فيديوهات حصص كاملة: حركات، موسيقى تحفيزية، ومدربة على الشاشة. شغّلي الفيديو وابدئي معها من الدار."
      />

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <Button variant={activeStyle === null ? 'primary' : 'ghost'} to="/classes">
          الكل
        </Button>
        {styles.map((style) => (
          <Button
            key={style}
            variant={activeStyle === style ? 'primary' : 'ghost'}
            to={`/classes?style=${encodeURIComponent(style)}`}
          >
            {style}
          </Button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 text-center text-muted">لا توجد حصص في هذا التصنيف بعد.</p>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <ClassCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  )
}
