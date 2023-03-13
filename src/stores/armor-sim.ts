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
const modifiers = ['無改造', '活人流改造', '獣道流改造']
const modifierFilter = atom<typeof modifiers>(modifiers)
const materialFilter = atom<Array<string>>([])
const lockPositionFilter = atom<boolean>(false)

// actions
const equip = (id:number, withLock: boolean = false) => {
  const list = allArmorList as Armor[]
  const found = list.find(armor => armor.id === id)
  if (found) {
    currentLoadout.setKey(found.position, { id: id, isLocked: withLock })
  }
}
const remove = (position:Position) => {
  if(currentLoadout.get()[position]?.isLocked) {
    return
  }
  currentLoadout.setKey(position, undefined)
}
const changeEquip = (id: number, position: Position) => {
  if(currentLoadout.get()[position]?.isLocked) {
    return
  }
  if (isEquipped(id)) {
    remove(position)
  } else {
    equip(id)
  }
}

const isEquipped = (id:number):boolean => {
  return Object.values(currentLoadout.get()).map(lo => lo?.id).filter(Boolean).includes(id)
}

const toggleLock = (position:Position) => {
  const loadout = currentLoadout.get()[position]
  if (loadout) {
    currentLoadout.setKey(position, { id: loadout.id, isLocked: !loadout.isLocked })
  }
}

const toggleFilter = (
    type:'position' | 'skill' | 'modifier' | 'material',
    item: Position|string
  ) => {
    const filterList = {
      position: positionFilter,
      skill: skillFilter,
      modifier: modifierFilter,
      material: materialFilter
    }
    const filter = filterList[type]
    const current = filter.get()
    if (current.includes(item)) {
      filter.set(current.filter(p => p != item))
    } else {
      filter.set([...current, item])
    }
}
const toggleLockPositionFilter = () => {
  lockPositionFilter.set(!lockPositionFilter.get())
}

const changeResilience = (type:Resilience, value:string) => {
  const convertedValue = value === '' ? '' : Number(value)
  resilienceFilter.setKey(type, convertedValue)
}

const isLocked = (position:Position):boolean => { return currentLoadout.get()[position]?.isLocked ?? false }

export { positions, modifiers, currentLoadout, armorList, positionFilter, skillFilter, resilienceFilter, modifierFilter, materialFilter, lockPositionFilter, toggleLockPositionFilter, changeResilience, equip, remove, toggleLock, toggleFilter, changeEquip, isEquipped, isLocked }
