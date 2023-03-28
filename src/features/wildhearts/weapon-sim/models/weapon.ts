import type { KatanaCoordinate, KatanaPath } from "./katanaMap"
import type { MaulCoordinate, MaulPath } from "./maulMap"
import type { BowCoordinate, BowPath } from "./bowMap"
import type { WagasaCoordinate, WagasaPath } from "./wagasaMap"
import type { CanonCoordinate, CanonPath } from "./canonMap"
import type { ClawCoordinate, ClawPath } from "./clawMap"
import type { StaffCoordinate, StaffPath } from "./staffMap"

export type Select = {
  order: number,
  coord: string, // '1D'
  skills: {id: string, name: string}[],  // ['1D-0', '1D-1']
}

export type Coordinate = KatanaCoordinate | MaulCoordinate | BowCoordinate | WagasaCoordinate | CanonCoordinate | ClawCoordinate | StaffCoordinate
export type Path = KatanaPath | MaulPath | BowPath | WagasaPath | CanonPath  | ClawPath | StaffPath
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

export const characColor = (weapon: Weapon): string => {
  switch (weapon.charac) {
    case '斬撃': {
      return 'text-cyan-300'
    }
    case '殴打': {
      return 'text-orange-300'
    }
    case '刺突': {
      return 'text-lime-300'
    }
    default: {
      return ''
    }
  }
}

export const attributeColor = (weapon: Weapon): string => {
  switch (weapon.attribute) {
    // '樹' | '火' | '水' | '風' | '土' | '',
    case '樹': {
      return 'text-green-500'
    }
    case '火': {
      return 'text-red-500'
    }
    case '水': {
      return 'text-blue-500'
    }
    case '風': {
      return 'text-cyan-500'
    }
    case '土': {
      return 'text-yellow-500'
    }
    default: {
      return ''
    }
  }
}
