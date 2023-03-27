import { atom, map, computed, action, onMount } from 'nanostores'
import type { Weapon, Select, Coordinate, InheritedSkill } from '@/features/wildhearts/weapon-sim/models/weapon'
import { weapons, selection } from '@/features/wildhearts/weapon-sim/stores/weapons'
import { close } from '@/features/wildhearts/weapon-sim/stores/modals'

export const enhance = (coord: Coordinate, skills:InheritedSkill[] | undefined) => {
  const selectedWeapon = weapons.get().find(w => w.coord === coord )!
  if (skills === undefined) { return ;}
  const currentSelect = {
    order: selection.get().length + 1,
    coord: coord,
    skills: [...selectedWeapon.inheritedSkills, ...skills]
  }
  selection.set([...selection.get(), currentSelect])
  close('enhanceModal')
}

export const restore = (coord: Coordinate) => {
  const selected = selection.get().find(select => select.coord === coord)!
  const restoredSelection = selection.get().filter(select => select.order <= selected.order)
  selection.set([...restoredSelection])
  close('restoreModal')
}
