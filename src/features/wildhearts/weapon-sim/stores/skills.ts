import { weapons, selection } from '@/features/wildhearts/weapon-sim/stores/weapons'
import { atom, onMount } from 'nanostores'
import { skillName } from '@/utils/utils'
import type { Coordinate } from '../models/weapon'

const weaponSkills = weapons.get().reduce((sum, w) => {
  const inherent = w.inherentSkills.map(skill => skillName(skill))
  const iniherited = w.inheritedSkills.map(skill => skillName(skill.name))
  return [...sum, ...inherent, ...iniherited]
}, [])
export const skills = atom<string[]>([...new Set(weaponSkills)])

export const pinnedWeapons = atom<Coordinate[]>([])
export const togglePin = (coord: Coordinate ) => {
  const current = pinnedWeapons.get()
  if (current.includes(coord)) {
    pinnedWeapons.set(current.filter(c => c != coord))
  } else {
    pinnedWeapons.set([...current, coord])
  }
}
