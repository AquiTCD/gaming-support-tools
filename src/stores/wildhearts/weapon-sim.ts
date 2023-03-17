import { atom, map, computed, action } from 'nanostores'
import type { Weapon, Select } from '@/types/wildhearts/weapon'

const allWeapons: Weapon[] = [
  {
    coord: '1D',
    name: 'ひのきのぼう',
    power: 10,
    chara: '打',
    element: '',
    elementalPower: 0,
    specificSkills: [],
    skills: [],
  },
  {
    coord: '1F',
    name: 'くだものナイフ',
    power: 3,
    chara: '斬',
    element: '',
    elementalPower: 0,
    specificSkills: ['皮剥き'],
    skills: [{id: '2F', name: 'ピーラーいらず'}]
  },
  {
    coord: '2F',
    name: '包丁',
    power: 100,
    chara: '斬',
    element: '木',
    elementalPower: 10,
    specificSkills: ['みじん切り'],
    skills: [{id: '1F', name: 'カレー作ろう'}]
  },
  {
    coord: '3F',
    name: '超すごい刀',
    power: 1,
    chara: '斬',
    element: '',
    elementalPower: 0,
    specificSkills: ['悪・即・斬'],
    skills: [{id: '3F', name: 'つばめ返し'}]
  }
]


// stores
const selection = map<Select[]>([{order:1, coord:'1D', skills:[]}])
const initialModalState = {
  craftModal: false
}
// const modalState = map<{[typeof initialModalState]: string | boolean}>(initialModalState)
const modalState = map<{}>(initialModalState)

// action
const open = (modalName:keyof typeof initialModalState, value:string|true = true) => {
  console.log(`${modalName}, ${value}`)
  modalState.setKey(modalName, value)
}
const close = (modalName:keyof typeof initialModalState) => {
  modalState.setKey(modalName, false)
}

const craft = (coord, skills:{id:string, name:string}[] | undefined) => {
  const selectedWeapon = allWeapons.find(w => w.coord === coord )
  if (skills === undefined) { return ;}
  const currentSelect = {
    order: selection.get().length + 1,
    coord: coord,
    skills: [...selectedWeapon.skills, ...skills]
  }
  selection.set([...selection.get(), currentSelect])
  close('craftModal')
}

export { allWeapons, selection, open, close, craft, modalState }
