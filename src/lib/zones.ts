import type { BodyZone } from '../data/content'
import { zones } from '../data/content'

export function getZoneLabel(zone: BodyZone): string {
  return zones.find((item) => item.id === zone)?.label ?? zone
}

export function isBodyZone(value: string | null): value is BodyZone {
  return value !== null && zones.some((item) => item.id === value)
}
