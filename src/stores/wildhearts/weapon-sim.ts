import { atom, map, computed, action } from 'nanostores'
import { allWeaponList } from '@/assets/wildhearts/weapon_list.js'
import type { Weapon, Select, Coordinate, InheritedSkill } from '@/types/wildhearts/weapon'

const allWeapons: Weapon[] = allWeaponList

// stores
const selection = map<Select[]>([{order:1, coord:'1I', skills:[]}])
const initialModalState = {
  enhanceModal: false,
  requirementsModal: false
}
// const modalState = map<{[typeof initialModalState]: string | boolean}>(initialModalState)
const modalState = map<{ [key in keyof typeof initialModalState]: boolean | Coordinate }>(initialModalState)

// action
const open = (modalName:keyof typeof initialModalState, value:Coordinate|true = true) => {
  modalState.setKey(modalName, value)
}
const close = (modalName:keyof typeof initialModalState) => {
  modalState.setKey(modalName, false)
}

const enhance = (coord: Coordinate, skills:InheritedSkill[] | undefined) => {
  const selectedWeapon = allWeapons.find(w => w.coord === coord )!
  if (skills === undefined) { return ;}
  const currentSelect = {
    order: selection.get().length + 1,
    coord: coord,
    skills: [...selectedWeapon.inheritedSkills, ...skills]
  }
  selection.set([...selection.get(), currentSelect])
  close('enhanceModal')
}

export { allWeapons, selection, open, close, enhance, modalState }
