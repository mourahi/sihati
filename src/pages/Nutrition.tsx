import { useSearchParams } from 'react-router-dom'
import { Button } from '../components/Button'
import { FoodCard } from '../components/FoodCard'
import { SectionTitle } from '../components/SectionTitle'
import { foodTips } from '../data/content'
import type { FoodTip } from '../data/content'

const categories = [...new Set(foodTips.map((item) => item.category))]

function isFoodCategory(value: string | null): value is FoodTip['category'] {
  return value !== null && categories.includes(value as FoodTip['category'])
}

export default function Nutrition() {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  const activeCategory = isFoodCategory(categoryParam) ? categoryParam : null

  const visible = activeCategory
    ? foodTips.filter((item) => item.category === activeCategory)
    : foodTips

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle
        eyebrow="المطبخ الصحي"
        title="أكل مغربي يشبع ويحب جسمكِ"
        subtitle="وصفات وعادات يومية: حريرة خفيفة، طاجين خضر، شاي بنعنع كثير وسكر قليل."
      />

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <Button
          variant={activeCategory === null ? 'primary' : 'ghost'}
          to="/nutrition"
        >
          الكل
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? 'primary' : 'ghost'}
            to={`/nutrition?category=${encodeURIComponent(category)}`}
          >
            {category}
          </Button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 text-center text-muted">لا توجد وصفات في هذا التصنيف بعد.</p>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((food) => (
            <FoodCard
              key={food.id}
              id={food.id}
              title={food.title}
              category={food.category}
              summary={food.summary}
              href={`/nutrition/${food.id}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
