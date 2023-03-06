import { atom, map, computed, action } from 'nanostores'
import allArmorList from '@/assets/wildhearts/armor_list.json'

const positions = ['head', 'body', 'arm', 'waist', 'leg']

type Loadout = {
  head: null | number,
  body: null | number,
  arm: null | number,
  waist: null | number,
  leg: null | number,
}

type Position = keyof Loadout

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
  skills: Array<string>,
  materials: string
}

const initialValue: Loadout = { head: null, body: null, arm: null, waist: null, leg: null }

const currentLoadout = map<Loadout>(initialValue)
const armorList = map<typeof allArmorList>(allArmorList)

const positionFilter = atom(['head', 'body', 'arm', 'waist', 'leg'])
const skillFilter = atom([])
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
  currentLoadout.setKey(position, null)
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
export type { Loadout, Position, Armor }
