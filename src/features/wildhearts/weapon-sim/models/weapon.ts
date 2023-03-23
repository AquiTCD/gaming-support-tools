import type { KatanaCoordinate, KatanaPath } from "./katanaMap"
import type { WagasaCoordinate, WagasaPath } from "./wagasaMap"

export type Select = {
  order: number,
  coord: string, // '1D'
  skills: {id: string, name: string}[],  // ['1D-0', '1D-1']
}

export type Coordinate = KatanaCoordinate | WagasaCoordinate
export type Path = KatanaPath | WagasaPath
export type Paths = Path[]

export type InheritedSkill = {
  id: string,
  name: string,
}

export type Weapon = {
  coord: Coordinate,
  name: string,
  charac: '斬撃' | '殴打' | '刺突',
  attack: number,
  critical: number,
  attribute: '樹' | '火' | '水' | '風' | '土' | '',
  attributePower: number,
  inherentSkills: string[],
  inheritedSkills: InheritedSkill[],
  capacity: number,
  gold: number,
  materials: {name: string, count: number}[]
}
