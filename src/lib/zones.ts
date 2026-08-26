import type { BodyZone } from '../data/content'
import { programs, workouts, zones } from '../data/content'

export function getZoneLabel(zone: BodyZone): string {
  return zones.find((item) => item.id === zone)?.label ?? zone
}

export function isBodyZone(value: string | null): value is BodyZone {
  return value !== null && zones.some((item) => item.id === value)
}

export function workoutsForZone(zone: BodyZone) {
  return workouts.filter((item) => item.zone === zone)
}

export function programPathForZone(zone: BodyZone) {
  const program = programs.find((item) => item.zone === zone)
  return program ? `/programs/${program.id}` : '/programs'
}
