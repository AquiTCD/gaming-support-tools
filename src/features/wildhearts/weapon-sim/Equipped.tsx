import { useStore } from '@nanostores/react'
import { selection, allWeapons } from '@/stores/wildhearts/weapon-sim'
import type { Weapon, Select, InheritedSkill } from '@/types/wildhearts/weapon'
import { useEffect, useState } from "react"
import Draggable, {DraggableCore} from 'react-draggable'

type Props={
  name?: string;
}

export default function Equipped({ name }: Props): JSX.Element {
  const $selection = useStore(selection)
  const lastSelected = $selection[$selection.length - 1]
  const EquippedWeapon: Weapon | undefined = allWeapons.find(weapon => weapon.coord === lastSelected.coord)
  const inheritedSkills: InheritedSkill[] = lastSelected.skills

  return (
    <>
      <Draggable
        handle="#equipped"
        defaultPosition={{x: 0, y: 0}}
      >
        <table id="equipped" className="bg-gray-800/75 border-separate border-4 border-amber-400 text-gray-100 w-80 rounded-lg border-spacing-2 handle absolute bottom-10 right-10 cursor-grab active:cursor-grabbing">
          <tbody>
          <tr>
            <td className="border-b-2 border-amber-200 text-center text-lg md:text-xl py-1 md:py-2 font-bold" colSpan={2}>{EquippedWeapon?.name}</td>
          </tr>
          <tr>
            <th className="border-b-2 border-amber-200 text-right font-normal w-28">攻撃力</th>
            <td className="border-b-2 border-amber-200 text-right pr-10 font-bold text-l">
              <span className="mr-2">{EquippedWeapon?.charac}</span>
              <span>{EquippedWeapon?.attack}</span>
            </td>
          </tr>
          <tr>
            <th className="border-b-2 border-amber-200 text-right font-normal w-28">属性攻撃力</th>
            <td className="border-b-2 border-amber-200 text-right pr-10 font-bold text-l">
              <span className="mr-2">{EquippedWeapon?.attribute}</span>
              <span>{EquippedWeapon?.attributePower}</span>
            </td>
          </tr>
          <tr>
            <th className="border-b-2 border-amber-200 text-right font-normal w-28">会心率</th>
            <td className="border-b-2 border-amber-200 text-right pr-10 font-bold text-l">
              <span>{EquippedWeapon?.critical}</span>
              <span>%</span>
            </td>
          </tr>
          <tr>
            <th className="border-b-2 border-amber-200" colSpan={2}>固有技能</th>
          </tr>
          <tr>
            <td colSpan={2}>
              <ul>
                { [0,1,2].map(i => {
                  return <li key={i} className="bg-gray-900/75 h-7 pt-0.5 mb-1 px-2">{EquippedWeapon?.inherentSkills[i]}</li>
                })}
              </ul>
            </td>
          </tr>
          <tr>
            <th className="border-b-2 border-amber-200" colSpan={2}>継承技能</th>
          </tr>
          <tr>
            <td colSpan={2}>
              <ul>
                { [0,1,2,3,4].map(i => {
                  return <li key={i} className="bg-gray-900/75 h-7 pt-0.5 mb-1 px-2">{inheritedSkills[i]?.name}</li>
                })}
              </ul>
            </td>
          </tr>
          </tbody>
        </table>
      </Draggable>
    </>
  )
}
