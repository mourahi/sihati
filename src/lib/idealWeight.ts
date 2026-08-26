export function roundKg(value: number) {
  return Math.round(value * 2) / 2
}

/** Lorentz formula for adult women, in kilograms. */
export function lorentzWomenKg(heightCm: number) {
  return roundKg(heightCm - 100 - (heightCm - 150) / 2.5)
}

export function bmiWeightKg(heightCm: number, bmi: number) {
  const meters = heightCm / 100
  return roundKg(bmi * meters * meters)
}

export function healthyRangeKg(heightCm: number) {
  return {
    min: bmiWeightKg(heightCm, 18.5),
    max: bmiWeightKg(heightCm, 24.9),
  }
}

export type WeightNoteKind = 'in-range' | 'below' | 'above'

export function noteForCurrentWeight(
  currentKg: number,
  minKg: number,
  maxKg: number,
): { kind: WeightNoteKind; text: string } {
  if (currentKg < minKg) {
    return {
      kind: 'below',
      text: 'الرقم الحالي أقل من المجال التقديري. النحافة ليست دائماً علامة صحة؛ إن أحسستِ بتعب أو دوخة، راجعي مختصة.',
    }
  }
  if (currentKg > maxKg) {
    return {
      kind: 'above',
      text: 'الرقم الحالي فوق المجال التقديري. هذا ليس حكماً عليكِ: العضلات، العظام، والماء ترفع الميزان. اللطف والروتين أهم من مطاردة رقم.',
    }
  }
  return {
    kind: 'in-range',
    text: 'وزنكِ الحالي داخل المجال الصحي حسب طولكِ. هذا المجال مساحة، لا هدفاً يومياً على الميزان.',
  }
}
