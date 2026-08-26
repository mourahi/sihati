export type CyclePhase = 'period' | 'follicular' | 'ovulation' | 'luteal'

export type CycleSettings = {
  periodStart: string | null
  cycleLength: number
  periodLength: number
}

export const CYCLE_PIN = '1155'
export const CYCLE_STORAGE_KEY = 'sihati-cycle-v1'
export const CYCLE_UNLOCK_KEY = 'sihati-cycle-unlocked'

export const DEFAULT_CYCLE: CycleSettings = {
  periodStart: null,
  cycleLength: 28,
  periodLength: 5,
}

export const PHASE_META: Record<
  CyclePhase,
  { label: string; hint: string; swatch: string; cell: string; text: string }
> = {
  period: {
    label: 'الحيض',
    hint: 'أيام الراحة والدفء. الحديد، الماء، والقيلولة الصغيرة تساعد.',
    swatch: 'bg-cycle-period',
    cell: 'bg-cycle-period text-cream shadow-[0_6px_16px_rgba(196,93,116,0.35)]',
    text: 'text-cycle-period',
  },
  follicular: {
    label: 'ما بعد الحيض',
    hint: 'الطاقة ترجع بلطف. وقت جميل للحركة الخفيفة والطبخ المغذي.',
    swatch: 'bg-cycle-bloom',
    cell: 'bg-cycle-bloom text-ink',
    text: 'text-[#b86b4a]',
  },
  ovulation: {
    label: 'الإباضة',
    hint: 'ذروة الخصوبة والطاقة. استمعي لجسمكِ ونامي كفاية.',
    swatch: 'bg-cycle-ovulation',
    cell: 'bg-cycle-ovulation text-cream shadow-[0_6px_16px_rgba(110,154,134,0.3)]',
    text: 'text-sage',
  },
  luteal: {
    label: 'ما قبل الدورة',
    hint: 'الجسم يطلب حناناً: سكر أقل، أتاي خفيف، ونوم أبكر.',
    swatch: 'bg-cycle-luteal',
    cell: 'bg-cycle-luteal text-cream shadow-[0_6px_16px_rgba(155,107,168,0.28)]',
    text: 'text-cycle-luteal',
  },
}

export const WEEKDAYS = ['الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد']
export const WEEKDAYS_SHORT = ['إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت', 'أحد']

export const MONTHS = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'ماي',
  'يونيو',
  'يوليوز',
  'غشت',
  'شتنبر',
  'أكتوبر',
  'نونبر',
  'دجنبر',
]

export function toDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function fromDateKey(key: string): Date {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function isSameDay(a: Date, b: Date): boolean {
  return toDateKey(a) === toDateKey(b)
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function diffDays(from: Date, to: Date): number {
  const a = startOfDay(from).getTime()
  const b = startOfDay(to).getTime()
  return Math.round((b - a) / 86_400_000)
}

export function addDays(date: Date, amount: number): Date {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return next
}

export function cycleDayIndex(start: Date, date: Date, cycleLength: number): number | null {
  const diff = diffDays(start, date)
  if (diff < 0) return null
  return diff % cycleLength
}

export function phaseForDay(
  date: Date,
  periodStart: string | null,
  cycleLength: number,
  periodLength: number,
): CyclePhase | null {
  if (!periodStart) return null
  const index = cycleDayIndex(fromDateKey(periodStart), date, cycleLength)
  if (index === null) return null
  if (index < periodLength) return 'period'
  const ovulation = Math.max(periodLength + 1, cycleLength - 14)
  if (index >= ovulation - 1 && index <= ovulation + 1) return 'ovulation'
  if (index < ovulation - 1) return 'follicular'
  return 'luteal'
}

export function nextPeriodDate(settings: CycleSettings): Date | null {
  if (!settings.periodStart) return null
  return addDays(fromDateKey(settings.periodStart), settings.cycleLength)
}

export function monthCells(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1)
  const mondayIndex = (first.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (Date | null)[] = []
  for (let i = 0; i < mondayIndex; i += 1) cells.push(null)
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, month, day))
  }
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

export function loadCycleSettings(): CycleSettings {
  try {
    const raw = localStorage.getItem(CYCLE_STORAGE_KEY)
    if (!raw) return { ...DEFAULT_CYCLE }
    const parsed = JSON.parse(raw) as Partial<CycleSettings>
    return {
      periodStart: typeof parsed.periodStart === 'string' ? parsed.periodStart : null,
      cycleLength:
        typeof parsed.cycleLength === 'number' && parsed.cycleLength >= 21 && parsed.cycleLength <= 40
          ? parsed.cycleLength
          : DEFAULT_CYCLE.cycleLength,
      periodLength:
        typeof parsed.periodLength === 'number' && parsed.periodLength >= 3 && parsed.periodLength <= 10
          ? parsed.periodLength
          : DEFAULT_CYCLE.periodLength,
    }
  } catch {
    return { ...DEFAULT_CYCLE }
  }
}

export function saveCycleSettings(settings: CycleSettings) {
  localStorage.setItem(CYCLE_STORAGE_KEY, JSON.stringify(settings))
}
