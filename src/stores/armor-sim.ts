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

const positionFilter = map({
  head: true,
  body: true,
  arm: true,
  waist: true,
  leg: true,
})

// actions
const equip = (id:number, position: Position) => {
  currentLoadout.setKey(position, id)
}
const remove = (position:Position) => {
  currentLoadout.setKey(position, null)
}
const toggleFilter = (position:Position) => {
  positionFilter.setKey(position, !positionFilter.get()[position])
}


export { positions, currentLoadout, armorList, positionFilter, equip, remove, toggleFilter }
export type { Loadout, Position, Armor }
