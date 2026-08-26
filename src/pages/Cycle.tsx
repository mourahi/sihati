import { useEffect, useMemo, useState } from 'react'
import { FloralIllustration, IconMoon, IconRose } from '../components/Florals'
import { IdealWeightCard } from '../components/IdealWeightCard'
import { SectionTitle } from '../components/SectionTitle'
import {
  CYCLE_PIN,
  CYCLE_UNLOCK_KEY,
  MONTHS,
  PHASE_META,
  WEEKDAYS,
  WEEKDAYS_SHORT,
  type CyclePhase,
  type CycleSettings,
  addDays,
  isSameDay,
  loadCycleSettings,
  monthCells,
  nextPeriodDate,
  phaseForDay,
  saveCycleSettings,
  toDateKey,
} from '../lib/cycle'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] as const

function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [digits, setDigits] = useState('')
  const [error, setError] = useState(false)

  function press(value: string) {
    if (digits.length >= 4) return
    const next = digits + value
    setDigits(next)
    setError(false)
    if (next.length === 4) {
      if (next === CYCLE_PIN) {
        sessionStorage.setItem(CYCLE_UNLOCK_KEY, '1')
        onUnlock()
      } else {
        setError(true)
        window.setTimeout(() => setDigits(''), 280)
      }
    }
  }

  function backspace() {
    setError(false)
    setDigits((value) => value.slice(0, -1))
  }

  return (
    <section className="relative mx-auto mt-4 flex max-w-md flex-col items-center px-4 py-8 text-center">
      <FloralIllustration
        name="corner"
        alt=""
        className="pointer-events-none absolute -start-8 -top-4 h-36 w-36 mix-blend-multiply opacity-45"
      />
      <FloralIllustration
        name="sprig"
        alt=""
        className="pointer-events-none absolute -end-6 bottom-6 h-32 w-32 mix-blend-multiply opacity-40"
      />
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-rose/15 text-rose">
        <IconMoon className="h-8 w-8" />
      </span>
      <h2 className="mt-5 font-display text-3xl font-semibold text-ink">تقويم الدورة</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        أدخلي الرقم السري لفتح تقويم الدورة. معلوماتكِ تبقى على هذا الجهاز فقط.
      </p>

      <div className="mt-7 flex items-center justify-center gap-3" aria-hidden="true">
        {Array.from({ length: 4 }).map((_, index) => (
          <span
            key={index}
            className={`h-3.5 w-3.5 rounded-full transition ${
              index < digits.length
                ? 'bg-rose shadow-[0_0_0_4px_rgba(224,122,144,0.18)]'
                : 'bg-sand'
            } ${error ? 'animate-pulse bg-rose-deep' : ''}`}
          />
        ))}
      </div>
      {error ? (
        <p className="mt-3 text-sm text-rose-deep" role="alert">
          الرقم غير صحيح. جرّبي من جديد.
        </p>
      ) : (
        <p className="mt-3 text-xs text-muted">أربع أرقام</p>
      )}

      <div dir="ltr" className="mt-8 grid w-full max-w-[17rem] grid-cols-3 gap-3">
        {KEYS.slice(0, 9).map((key) => (
          <PinKey key={key} label={key} onPress={() => press(key)} />
        ))}
        <span />
        <PinKey label="0" onPress={() => press('0')} />
        <PinKey label="⌫" ariaLabel="مسح" onPress={backspace} muted />
      </div>
    </section>
  )
}

function PinKey({
  label,
  onPress,
  muted,
  ariaLabel,
}: {
  label: string
  onPress: () => void
  muted?: boolean
  ariaLabel?: string
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel ?? label}
      onClick={onPress}
      className={`h-14 rounded-2xl text-xl font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose ${
        muted
          ? 'bg-sand/80 text-muted hover:bg-sand'
          : 'bg-paper/80 text-ink shadow-[0_8px_24px_rgba(44,36,32,0.06)] hover:bg-rose hover:text-cream'
      }`}
    >
      {label}
    </button>
  )
}

function Stepper({
  label,
  value,
  min,
  max,
  unit,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  unit: string
  onChange: (value: number) => void
}) {
  return (
    <div className="flex items-center justify-between rounded-[1.25rem] bg-paper/70 px-4 py-3">
      <p className="text-sm font-medium text-ink">{label}</p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sand text-ink hover:bg-rose hover:text-cream"
          onClick={() => onChange(Math.max(min, value - 1))}
          aria-label={`إنقاص ${label}`}
        >
          −
        </button>
        <span className="min-w-14 text-center text-sm font-semibold text-rose-deep">
          {value} {unit}
        </span>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sand text-ink hover:bg-rose hover:text-cream"
          onClick={() => onChange(Math.min(max, value + 1))}
          aria-label={`زيادة ${label}`}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default function Cycle() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(CYCLE_UNLOCK_KEY) === '1')
  const [settings, setSettings] = useState<CycleSettings>(DEFAULT_VIEW)
  const [cursor, setCursor] = useState(() => new Date())
  const today = useMemo(() => new Date(), [])

  useEffect(() => {
    setSettings(loadCycleSettings())
  }, [])

  function update(next: CycleSettings) {
    setSettings(next)
    saveCycleSettings(next)
  }

  if (!unlocked) {
    return (
      <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-14">
        <SectionTitle
          eyebrow="خاص بالمرأة"
          title="مساحة لجسمكِ ودورتكِ"
          subtitle="حساب وزن لطيف حسب طولكِ، وتقويم للدورة يبقى خلف رقم سري."
        />
        <div className="mt-8">
          <IdealWeightCard />
        </div>
        <div className="mt-10">
          <PinGate onUnlock={() => setUnlocked(true)} />
        </div>
      </article>
    )
  }

  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const cells = monthCells(year, month)
  const todayPhase = phaseForDay(
    today,
    settings.periodStart,
    settings.cycleLength,
    settings.periodLength,
  )
  const upcoming = nextPeriodDate(settings)
  const startDate = settings.periodStart

  function selectDay(date: Date) {
    const key = toDateKey(date)
    update({
      ...settings,
      periodStart: settings.periodStart === key ? null : key,
    })
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-14">
      <SectionTitle
        eyebrow="خاص بالمرأة"
        title="مساحة لجسمكِ ودورتكِ"
        subtitle="حساب وزن لطيف حسب طولكِ، وتقويم ملون لدورتكِ خلف رقم سري."
      />

      <div className="mt-8">
        <IdealWeightCard />
      </div>

      <h2 className="mt-12 font-display text-2xl font-bold text-ink">تقويم الدورة الشهرية</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        اضغطي مباشرة على يوم بداية دورتكِ. الألوان تُظهر كل مرحلة في الشهر.
      </p>

      {todayPhase ? (
        <section
          className={`mt-8 overflow-hidden rounded-[1.75rem] px-5 py-5 text-cream ${
            todayPhase === 'follicular'
              ? 'bg-gradient-to-l from-[#e7b48a] to-[#d4a07a]'
              : todayPhase === 'ovulation'
                ? 'bg-gradient-to-l from-sage to-[#4f7f6b]'
                : todayPhase === 'luteal'
                  ? 'bg-gradient-to-l from-cycle-luteal to-[#7d4e8a]'
                  : 'bg-gradient-to-l from-rose to-rose-deep'
          }`}
        >
          <p className="inline-flex items-center gap-2 text-sm/relaxed opacity-90">
            <IconRose className="h-4 w-4" />
            اليوم
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold">
            {PHASE_META[todayPhase].label}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-cream/90">
            {PHASE_META[todayPhase].hint}
          </p>
        </section>
      ) : (
        <p className="mt-8 rounded-[1.5rem] bg-sand/80 px-5 py-4 text-center text-sm text-muted">
          اختاري من التقويم يوم أول نزيف في آخر دورة. تدريجياً يظهر المسار كاملاً.
        </p>
      )}

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Stepper
          label="طول الدورة"
          value={settings.cycleLength}
          min={21}
          max={40}
          unit="يوم"
          onChange={(cycleLength) => update({ ...settings, cycleLength })}
        />
        <Stepper
          label="أيام الحيض"
          value={settings.periodLength}
          min={3}
          max={10}
          unit="أيام"
          onChange={(periodLength) => update({ ...settings, periodLength })}
        />
      </div>

      <section className="mt-4 rounded-[1.75rem] border border-sand bg-paper/75 p-4 shadow-[0_10px_32px_rgba(44,36,32,0.06)] sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sand text-ink hover:bg-rose hover:text-cream"
            onClick={() => setCursor(new Date(year, month - 1, 1))}
            aria-label="الشهر السابق"
          >
            ›
          </button>
          <h2 className="font-display text-2xl font-semibold text-ink">
            {MONTHS[month]} {year}
          </h2>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sand text-ink hover:bg-rose hover:text-cream"
            onClick={() => setCursor(new Date(year, month + 1, 1))}
            aria-label="الشهر الموالي"
          >
            ‹
          </button>
        </div>

        <div className="mt-5 grid grid-cols-7 gap-1 text-center text-[0.65rem] font-medium text-muted sm:gap-1.5 sm:text-xs">
          {WEEKDAYS.map((day, index) => (
            <span key={day} className="py-1">
              <span className="sm:hidden">{WEEKDAYS_SHORT[index]}</span>
              <span className="hidden sm:inline">{day}</span>
            </span>
          ))}
        </div>

        <div className="mt-1 grid grid-cols-7 gap-1 sm:gap-1.5">
          {cells.map((date, index) => {
            if (!date) {
              return <span key={`empty-${index}`} className="aspect-square" />
            }
            const phase = phaseForDay(
              date,
              settings.periodStart,
              settings.cycleLength,
              settings.periodLength,
            )
            const selected = startDate === toDateKey(date)
            const isToday = isSameDay(date, today)
            const isNext = upcoming ? isSameDay(date, upcoming) : false
            return (
              <button
                key={toDateKey(date)}
                type="button"
                onClick={() => selectDay(date)}
                aria-pressed={selected}
                aria-label={`${date.getDate()} ${MONTHS[month]}${phase ? `، ${PHASE_META[phase].label}` : ''}`}
                className={`relative aspect-square rounded-xl text-xs font-semibold transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose sm:rounded-2xl sm:text-sm ${
                  phase ? PHASE_META[phase].cell : 'bg-canvas text-ink hover:bg-sand'
                } ${selected ? 'ring-2 ring-gold ring-offset-2 ring-offset-cream' : ''} ${
                  isToday && !phase ? 'ring-2 ring-rose/50' : ''
                }`}
              >
                {date.getDate()}
                {isToday ? (
                  <span className="absolute inset-x-0 -bottom-0.5 mx-auto h-1 w-1 rounded-full bg-current opacity-80" />
                ) : null}
                {isNext && !selected ? (
                  <span className="absolute end-1 top-1 h-1.5 w-1.5 rounded-full bg-gold" />
                ) : null}
              </button>
            )
          })}
        </div>
      </section>

      <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {(Object.keys(PHASE_META) as CyclePhase[]).map((phase) => (
          <li
            key={phase}
            className="flex items-center gap-2 rounded-[1.25rem] bg-paper/70 px-3 py-2.5 text-sm"
          >
            <span className={`h-3.5 w-3.5 rounded-full ${PHASE_META[phase].swatch}`} />
            <span className="font-medium text-ink">{PHASE_META[phase].label}</span>
          </li>
        ))}
      </ul>

      {startDate && upcoming ? (
        <p className="mt-6 rounded-[1.5rem] border border-gold/35 bg-sand/70 px-5 py-4 text-sm leading-relaxed text-ink">
          بداية آخر دورة: <strong>{fromKeyLabel(startDate)}</strong>. الدورة الموالية المتوقعة:{' '}
          <strong>{fromKeyLabel(toDateKey(upcoming))}</strong>
          {' '}
          · نافذة الإباضة حول{' '}
          <strong>
            {fromKeyLabel(toDateKey(addDays(fromDateKeySafe(startDate), settings.cycleLength - 14)))}
          </strong>
          .
        </p>
      ) : null}

      <p className="mt-6 text-center text-xs leading-relaxed text-muted">
        التقويم تقديري للتوعية، وليس تشخيصاً طبياً. اضغطي نفس اليوم مرة أخرى لإلغاء العلامة.
      </p>

      <div className="mt-6 text-center">
        <button
          type="button"
          className="text-sm font-medium text-muted underline-offset-4 hover:text-rose hover:underline"
          onClick={() => {
            sessionStorage.removeItem(CYCLE_UNLOCK_KEY)
            setUnlocked(false)
          }}
        >
          إغلاق بمفتاح الخصوصية
        </button>
      </div>
    </article>
  )
}

const DEFAULT_VIEW: CycleSettings = {
  periodStart: null,
  cycleLength: 28,
  periodLength: 5,
}

function fromDateKeySafe(key: string) {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function fromKeyLabel(key: string) {
  const date = fromDateKeySafe(key)
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`
}
