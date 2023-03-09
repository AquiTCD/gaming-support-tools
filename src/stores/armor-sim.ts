import { atom, map, computed, action } from 'nanostores'
import allArmorList from '@/assets/wildhearts/armor_list.json'
import type { Loadout, Position, Armor, Resilience } from '@/types/types'

const positions: Position[] = ['head', 'body', 'arm', 'waist', 'leg']

// stores
const currentLoadout = map<Loadout>({ head: undefined, body: undefined, arm: undefined, waist: undefined, leg: undefined })
const armorList = map<Armor[]>(allArmorList as Armor[])
const positionFilter = atom<Position[]>(['head', 'body', 'arm', 'waist', 'leg'])
const skillFilter = atom<Array<string>>([])
const resilienceFilter = map<{[key in Resilience]: number | ''}>({
  defence: '',
  woodResilience: '',
  fireResilience: '',
  waterResilience: '',
  windResilience: '',
  earthResilience: '',
})

// actions
const equip = (id:number) => {
  const list = allArmorList as Armor[]
  const found = list.find(armor => armor.id === id)
  if (found) {
    currentLoadout.setKey(found.position, id)
  }
}
const remove = (position:Position) => {
  currentLoadout.setKey(position, undefined)
}
const changeEquip = (id: number, position: Position) => {
  if (isEquipped(id)) {
    remove(position)
  } else {
    equip(id)
  }
}

const isEquipped = (id:number):boolean => {
  return Object.values(currentLoadout.get()).includes(id)
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
const changeResilience = (type:Resilience, value:string) => {
  const convertedValue = value === '' ? '' : Number(value)
  resilienceFilter.setKey(type, convertedValue)
}

export { positions, currentLoadout, armorList, positionFilter, skillFilter, resilienceFilter, changeResilience, equip, remove, togglePositionFilter, toggleSkillFilter, changeEquip, isEquipped }
