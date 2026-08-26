import { useMemo, useState } from 'react'
import { Badge } from './Badge'
import {
  healthyRangeKg,
  lorentzWomenKg,
  noteForCurrentWeight,
} from '../lib/idealWeight'

const HEIGHT_MIN = 140
const HEIGHT_MAX = 190

const fieldClass =
  'h-11 w-full min-w-0 rounded-2xl border border-sand bg-canvas px-3 text-base text-ink outline-none focus:border-rose/50'

function clampHeight(value: number) {
  return Math.min(HEIGHT_MAX, Math.max(HEIGHT_MIN, Math.round(value)))
}

function parsePositive(raw: string) {
  const next = Number(raw.replace(',', '.').trim())
  return Number.isFinite(next) && next > 0 ? next : NaN
}

export function IdealWeightCard() {
  const [heightText, setHeightText] = useState('162')
  const [heightCm, setHeightCm] = useState(162)
  const [current, setCurrent] = useState('')

  const ideal = lorentzWomenKg(heightCm)
  const range = healthyRangeKg(heightCm)
  const currentKg = parsePositive(current)
  const comparison = useMemo(() => {
    if (!Number.isFinite(currentKg) || currentKg < 30 || currentKg > 200) return null
    return noteForCurrentWeight(currentKg, range.min, range.max)
  }, [currentKg, range.min, range.max])

  function applyHeight(value: number) {
    const next = clampHeight(value)
    setHeightCm(next)
    setHeightText(String(next))
  }

  function commitHeight() {
    const parsed = parsePositive(heightText)
    applyHeight(Number.isFinite(parsed) ? parsed : heightCm)
  }

  function onHeightChange(raw: string) {
    const digits = raw.replace(/[^\d]/g, '').slice(0, 3)
    setHeightText(digits)
    const parsed = parsePositive(digits)
    if (parsed >= HEIGHT_MIN && parsed <= HEIGHT_MAX) {
      setHeightCm(parsed)
    }
  }

  function nudgeHeight(delta: number) {
    applyHeight(heightCm + delta)
  }

  return (
    <section
      id="ideal-weight"
      className="rounded-[1.75rem] border border-sand bg-paper/75 p-4 shadow-[0_10px_32px_rgba(44,36,32,0.06)] sm:p-6"
    >
      <Badge tone="rose">تقدير لطيف</Badge>
      <h2 className="mt-3 font-display text-2xl font-bold text-ink">حساب الوزن المثالي</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        أدخلي طولكِ. يظهر رقم تقريبي ومجال صحي. اقرئي الملاحظات تحت الرقم قبل أن تأخذيه كهدف.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="block rounded-[1.25rem] bg-paper/70 px-4 py-3">
          <span className="text-sm font-medium text-ink">الطول</span>
          <span className="mt-2 flex items-center gap-2" dir="ltr">
            <button
              type="button"
              aria-label="إنقاص الطول"
              onClick={() => nudgeHeight(-1)}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sand text-lg font-semibold text-ink transition hover:bg-rose hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
            >
              −
            </button>
            <input
              id="ideal-height"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              enterKeyHint="done"
              autoComplete="off"
              dir="ltr"
              min={HEIGHT_MIN}
              max={HEIGHT_MAX}
              value={heightText}
              onChange={(event) => onHeightChange(event.target.value)}
              onBlur={commitHeight}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  commitHeight()
                  event.currentTarget.blur()
                }
              }}
              className={`${fieldClass} text-center`}
            />
            <button
              type="button"
              aria-label="زيادة الطول"
              onClick={() => nudgeHeight(1)}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sand text-lg font-semibold text-ink transition hover:bg-rose hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
            >
              +
            </button>
            <span className="shrink-0 text-sm text-muted">سم</span>
          </span>
        </label>
        <label className="block rounded-[1.25rem] bg-paper/70 px-4 py-3">
          <span className="text-sm font-medium text-ink">وزنكِ الحالي (اختياري)</span>
          <span className="mt-2 flex items-center gap-2">
            <input
              id="ideal-current"
              type="text"
              inputMode="decimal"
              enterKeyHint="done"
              autoComplete="off"
              dir="ltr"
              value={current}
              placeholder="—"
              onChange={(event) => {
                setCurrent(event.target.value.replace(/[^\d.,]/g, '').slice(0, 6))
              }}
              className={`${fieldClass} placeholder:text-muted/60`}
            />
            <span className="shrink-0 text-sm text-muted">كغ</span>
          </span>
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[1.5rem] bg-rose/10 px-5 py-4">
          <p className="text-xs font-medium text-rose-deep">الوزن المثالي التقريبي</p>
          <p className="mt-1 font-display text-3xl font-bold text-ink">
            {ideal}
            <span className="ms-1 text-base font-medium text-muted">كغ</span>
          </p>
        </div>
        <div className="rounded-[1.5rem] bg-sage/10 px-5 py-4">
          <p className="text-xs font-medium text-sage">المجال الصحي حسب الطول</p>
          <p className="mt-1 font-display text-3xl font-bold leading-tight text-ink">
            {range.min} – {range.max}
            <span className="ms-1 text-base font-medium text-muted">كغ</span>
          </p>
        </div>
      </div>

      {comparison ? (
        <p
          className={`mt-4 rounded-[1.25rem] px-4 py-3 text-sm leading-relaxed ${
            comparison.kind === 'in-range'
              ? 'bg-sage/12 text-ink'
              : 'bg-sand/80 text-ink'
          }`}
        >
          {comparison.text}
        </p>
      ) : null}

      <div className="mt-5 rounded-[1.5rem] bg-sand/70 px-4 py-4">
        <h3 className="font-display text-lg font-bold text-ink">ملاحظات عن الرقم الذي يظهر</h3>
        <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-muted">
          <li>الوزن المثالي تقدير متوسط حسب الطول فقط (معادلة لورنتز للنساء)، وليس قياساً لجسمكِ الفعلي.</li>
          <li>المجال الصحي أهم من رقم واحد: جسمان بنفس الطول قد يكونان بصحة جيدة بأوزان مختلفة.</li>
          <li>العضلات، العظام، الماء، الحمل والرضاعة ترفع الميزان دون أن تعني «زيادة دهون».</li>
          <li>الميزان لا يرى الرشاقة ولا الطاقة ولا الدورة الشهرية؛ لا تزني نفسكِ كل يوم.</li>
          <li>إن كنتِ حاملاً، مرضعة، دون 18 سنة، أو عندكِ حالة صحية، استشيري طبيبة قبل أي هدف وزن.</li>
        </ul>
      </div>
    </section>
  )
}
