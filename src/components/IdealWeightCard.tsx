import { useMemo, useState } from 'react'
import { Badge } from './Badge'
import {
  healthyRangeKg,
  lorentzWomenKg,
  noteForCurrentWeight,
} from '../lib/idealWeight'

function NumberField({
  id,
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  id: string
  label: string
  value: number
  min: number
  max: number
  step: number
  unit: string
  onChange: (value: number) => void
}) {
  return (
    <label className="block rounded-[1.25rem] bg-paper/70 px-4 py-3">
      <span className="text-sm font-medium text-ink">{label}</span>
      <span className="mt-2 flex items-center gap-2">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : ''}
          onChange={(event) => {
            const next = Number(event.target.value)
            if (Number.isFinite(next)) onChange(Math.min(max, Math.max(min, next)))
          }}
          className="h-11 w-full rounded-2xl border border-sand bg-canvas px-3 text-ink outline-none focus:border-rose/50"
        />
        <span className="shrink-0 text-sm text-muted">{unit}</span>
      </span>
    </label>
  )
}

export function IdealWeightCard() {
  const [height, setHeight] = useState(162)
  const [current, setCurrent] = useState('')

  const ideal = lorentzWomenKg(height)
  const range = healthyRangeKg(height)
  const currentKg = Number(current.replace(',', '.'))
  const comparison = useMemo(() => {
    if (!Number.isFinite(currentKg) || currentKg < 30 || currentKg > 200) return null
    return noteForCurrentWeight(currentKg, range.min, range.max)
  }, [currentKg, range.min, range.max])

  return (
    <section
      id="ideal-weight"
      className="rounded-[1.75rem] border border-sand bg-paper/75 p-5 shadow-[0_10px_32px_rgba(44,36,32,0.06)] sm:p-6"
    >
      <Badge tone="rose">تقدير لطيف</Badge>
      <h2 className="mt-3 font-display text-2xl font-bold text-ink">حساب الوزن المثالي</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        أدخلي طولكِ. يظهر رقم تقريبي ومجال صحي. اقرئي الملاحظات تحت الرقم قبل أن تأخذيه كهدف.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <NumberField
          id="ideal-height"
          label="الطول"
          value={height}
          min={140}
          max={190}
          step={1}
          unit="سم"
          onChange={setHeight}
        />
        <label className="block rounded-[1.25rem] bg-paper/70 px-4 py-3">
          <span className="text-sm font-medium text-ink">وزنكِ الحالي (اختياري)</span>
          <span className="mt-2 flex items-center gap-2">
            <input
              id="ideal-current"
              type="number"
              inputMode="decimal"
              min={35}
              max={180}
              step={0.5}
              value={current}
              placeholder="—"
              onChange={(event) => setCurrent(event.target.value)}
              className="h-11 w-full rounded-2xl border border-sand bg-canvas px-3 text-ink outline-none placeholder:text-muted/60 focus:border-rose/50"
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
          <p className="mt-1 font-display text-3xl font-bold text-ink">
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
