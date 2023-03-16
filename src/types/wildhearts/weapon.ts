export type Select = {
  order: number,
  coord: string, // '1D'
  skills: string[],  // ['1D-0', '1D-1']
}
export type Weapon = {
  coord: string,
  name: string,
  chara: string,
  power: number,
  element: string,
  elementalPower: number,
  specificSkills: string[],
  skills: string[],
}
