type Loadout = {
  head: undefined | { id: number, isLocked: boolean },
  body: undefined | { id: number, isLocked: boolean },
  arm: undefined | { id: number, isLocked: boolean },
  waist: undefined | { id: number, isLocked: boolean },
  leg: undefined | { id: number, isLocked: boolean }
}
type Position = 'head' | 'body' | 'arm' | 'waist' | 'leg'
type Armor = {
  id: number,
  name: string,
  position: Position,
  path: number,
  defence: number,
  woodResilience: number,
  fireResilience: number,
  waterResilience: number,
  windResilience: number,
  earthResilience: number,
  skills: string[],
  materials: string
}
type Resilience = 'defence' | 'woodResilience' | 'fireResilience' | 'waterResilience' | 'windResilience' | 'earthResilience'

export type { Loadout, Position, Armor, Resilience }
