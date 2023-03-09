type Loadout = {
  head: undefined | number,
  body: undefined | number,
  arm: undefined | number,
  waist: undefined | number,
  leg: undefined | number,
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
