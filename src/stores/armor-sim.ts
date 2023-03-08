import { atom, map, computed, action } from 'nanostores'
import allArmorList from '@/assets/wildhearts/armor_list.json'
import type { Loadout, Position, Armor } from '@/types/types'

const positions: Position[] = ['head', 'body', 'arm', 'waist', 'leg']

// stores
const currentLoadout = map<Loadout>({ head: undefined, body: undefined, arm: undefined, waist: undefined, leg: undefined })
const armorList = map<Armor[]>(allArmorList as Armor[])
const positionFilter = atom<Position[]>(['head', 'body', 'arm', 'waist', 'leg'])
const skillFilter = atom<Array<string>>([])
const resilienceFilter = map({
  defence: undefined,
  woodResilience: undefined,
  fireResilience: undefined,
  waterResilience: undefined,
  windResilience: undefined,
  earthResilience: undefined,
})

// actions
const equip = (id:number, position: Position) => {
  currentLoadout.setKey(position, id)
}
const remove = (position:Position) => {
  currentLoadout.setKey(position, undefined)
}
const togglePositionFilter = (position:Position) => {
  const current = positionFilter.get()
  if (current.includes(position)) {
    positionFilter.set(current.filter(p => p != position))
  } else {
    positionFilter.set([...current, position])
  }
}
const toggleSkillFilter = (skill:string) => {
  const current = skillFilter.get()
  if (current.includes(skill)) {
    skillFilter.set(current.filter(p => p != skill))
  } else {
    skillFilter.set([...current, skill])
  }
}

export { positions, currentLoadout, armorList, positionFilter, skillFilter, equip, remove, togglePositionFilter, toggleSkillFilter }