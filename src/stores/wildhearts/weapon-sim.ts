import { atom, map, computed, action } from 'nanostores'
import type { Weapon, Select } from '@/types/wildhearts/weapon'

const allWeapons: Weapon[] = [
  {
    coord: '1D',
    name: '刀',
    power: 10,
    chara: '斬',
    element: '',
    elementalPower: 0,
    specificSkills: [],
    skills: [],
  },
  {
    coord: '1F',
    name: '包丁',
    power: 100,
    chara: '斬',
    element: '木',
    elementalPower: 10,
    specificSkills: ['悪・即・斬'],
    skills: ['カレー作ろう'],
  },
  {
    coord: '2F',
    name: 'くだものナイフ',
    power: 3,
    chara: '斬',
    element: '',
    elementalPower: 0,
    specificSkills: ['皮剥き'],
    skills: ['ピーラーいらず', '怪我しない'],
  },
  {
    coord: '3F',
    name: 'おぼんぼう',
    power: 1,
    chara: '打',
    element: '',
    elementalPower: 0,
    specificSkills: ['あげちゃうぞ'],
    skills: ['ごっこ'],
  }
]


// stores
const selection = map<Select[]>([{order:1, coord:'1D', skills:[]}])

const craft = (coord, skills:string[] | undefined) => {
  // const selectedWeapon = allWeapons.find(w => w.coord === coord )
  if (skills === undefined) { return ;}
  const currentSelect = {
    order: selection.get().length + 1,
    coord: coord,
    skills: skills
  }
  selection.set([...selection.get(), currentSelect])
}

export { allWeapons, selection, craft }
