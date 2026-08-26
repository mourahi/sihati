import { foodTips, programs, workouts, zones } from '../data/content'
import { getZoneLabel } from './zones'

export type SearchHit = {
  id: string
  title: string
  hint: string
  href: string
  kind: 'برنامج' | 'رياضة' | 'وصفة' | 'منطقة' | 'صفحة'
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/[^\p{L}\p{N}]+/gu, '')
}

const PAGES: SearchHit[] = [
  { id: 'page-home', title: 'الرئيسية', hint: 'صفحة البداية', href: '/', kind: 'صفحة' },
  { id: 'page-programs', title: 'البرامج', hint: 'مسارات حسب منطقة الجسم', href: '/programs', kind: 'صفحة' },
  { id: 'page-workouts', title: 'الرياضة', hint: 'فيديوهات تمارين في البيت', href: '/workouts', kind: 'صفحة' },
  { id: 'page-nutrition', title: 'المطبخ الصحي', hint: 'وصفات مغربية خفيفة', href: '/nutrition', kind: 'صفحة' },
  { id: 'page-cycle', title: 'تتبع الدورة الشهرية', hint: 'تقويم ملون برقم سري', href: '/cycle', kind: 'صفحة' },
  { id: 'page-about', title: 'عن صحتي', hint: 'قيم الموقع والتنبيه الطبي', href: '/about', kind: 'صفحة' },
]

function catalog(): SearchHit[] {
  const zoneHits: SearchHit[] = zones.map((zone) => ({
    id: `zone-${zone.id}`,
    title: zone.label,
    hint: zone.description,
    href: `/programs?zone=${zone.id}`,
    kind: 'منطقة',
  }))

  const programHits: SearchHit[] = programs.map((program) => ({
    id: `program-${program.id}`,
    title: program.title,
    hint: `${program.subtitle} · ${getZoneLabel(program.zone)}`,
    href: `/programs/${program.id}`,
    kind: 'برنامج',
  }))

  const workoutHits: SearchHit[] = workouts.map((workout) => ({
    id: `workout-${workout.id}`,
    title: workout.title,
    hint: `${workout.durationMin} دقيقة · ${getZoneLabel(workout.zone)}`,
    href: `/workouts/${workout.youtubeId}`,
    kind: 'رياضة',
  }))

  const foodHits: SearchHit[] = foodTips.map((food) => ({
    id: `food-${food.id}`,
    title: food.title,
    hint: `${food.category} · ${food.summary}`,
    href: `/nutrition/${food.id}`,
    kind: 'وصفة',
  }))

  return [...PAGES, ...zoneHits, ...programHits, ...workoutHits, ...foodHits]
}

export function searchSite(query: string, limit = 8): SearchHit[] {
  const needle = normalize(query.trim())
  if (needle.length < 1) return []

  return catalog()
    .map((hit) => {
      const haystack = normalize(`${hit.title} ${hit.hint} ${hit.kind}`)
      const score = haystack.includes(needle)
        ? normalize(hit.title).startsWith(needle)
          ? 3
          : normalize(hit.title).includes(needle)
            ? 2
            : 1
        : 0
      return { hit, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.hit)
}
