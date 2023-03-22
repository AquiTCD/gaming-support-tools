import { atom, map, computed, action, onMount } from 'nanostores'
import allKatanaList from '@/assets/wildhearts/katana_list.json'
import type { Weapon, Select, Coordinate, InheritedSkill } from '@/types/wildhearts/weapon'
import { router } from '@/stores/router'
import { searchParams } from '@/stores/searchParams'

const weaponList = map<Weapon[]>([])

// router
onMount(weaponList, () => {
  return router.subscribe(async router => {
    if (router?.route !== 'wildheartsWeaponSim') { return }

    switch (router.params.category) {
      case 'katana': {
        await weaponList.set([...allKatanaList] as Weapon[])
        break
      }
      default: {
        window.location.href = '/wildhearts/weapon-sim'
      }
    }
  })
})
// query parameter loading
onMount(weaponList, () => {
  return searchParams.subscribe(async params => {
    // if (params.c === 'katana') {
    //   weaponList.set([...allKatanaList] as Weapon[])
    // }
  })
})

// stores
const selection = map<Select[]>([{order:1, coord:'1I', skills:[]}])
const initialModalState = {
  enhanceModal: false,
  requirementsModal: false,
  restoreModal: false,
}
const previewModalState = atom<{coord: Coordinate | false, x:number, y:number}>({coord: false, x:0, y:0})
const modalState = map<{ [key in keyof typeof initialModalState]: boolean | Coordinate }>(initialModalState)

// action
const open = (modalName:keyof typeof initialModalState, value:Coordinate|true = true) => {
  modalState.setKey(modalName, value)
}
const close = (modalName:keyof typeof initialModalState) => {
  modalState.setKey(modalName, false)
}
const preview = (coord: Coordinate, position: {x:number, y:number}) => {
  previewModalState.set({coord, x:position.x, y: position.y})
}
const closePreview = () => {
  previewModalState.set({coord: false, x: 0, y: 0})
}

const enhance = (coord: Coordinate, skills:InheritedSkill[] | undefined) => {
  const selectedWeapon = weaponList.get().find(w => w.coord === coord )!
  if (skills === undefined) { return ;}
  const currentSelect = {
    order: selection.get().length + 1,
    coord: coord,
    skills: [...selectedWeapon.inheritedSkills, ...skills]
  }
  selection.set([...selection.get(), currentSelect])
  close('enhanceModal')
}

const restore = (coord: Coordinate) => {
  const selected = selection.get().find(select => select.coord === coord)!
  const restoredSelection = selection.get().filter(select => select.order <= selected.order)
  selection.set([...restoredSelection])
  close('restoreModal')
}

export { weaponList, selection, open, close, enhance, restore, modalState, previewModalState, preview, closePreview }
