import { useStore } from '@nanostores/react'
import React from 'react'
import { positions, positionFilter, armorList, equip, togglePositionFilter, skillFilter, toggleSkillFilter } from '@/stores/armor-sim'
import { i18nPosition, pathValue } from '@/utils/utils'
import type { Loadout, Position, Armor } from '@/types/types'

type Props = {
  list: Armor[]
}
export default function ArmorListRow({ list }: Props): JSX.Element {

  const positionRowColorClass = {
    head: 'bg-orange-50',
    body: 'bg-lime-50',
    arm: 'bg-emerald-50',
    waist: 'bg-cyan-50',
    leg: 'bg-indigo-50',
  }

  const positionClasses = (position:string) => {
    return `${positionRowColorClass[position as Position]} text-gray-600 border-b border-gray-200 hover:bg-gray-100`
  }

  return (
    <>
      { list.map((armor) => {
          return <tr key={armor.id} className={positionClasses(armor.position)}>
            <td onClick={() => equip(armor.id, armor.position)} className="py-2 px-4"><button className="rounded-full bg-gray-300 text-gray-700 text-sm px-2 py-1">装備</button></td>
            <td className="py-2 px-4 text-center">{i18nPosition[armor.position as Position]}</td>
            <td className="py-2 px-4 text-left">{armor.name}</td>
            <td className="py-2 px-4 text-left">{pathValue(armor.path)}</td>
            <td className="py-2 px-4 text-right">{armor.defence}</td>
            <td className="py-2 px-4 text-right">{armor.woodResilience}</td>
            <td className="py-2 px-4 text-right">{armor.fireResilience}</td>
            <td className="py-2 px-4 text-right">{armor.waterResilience}</td>
            <td className="py-2 px-4 text-right">{armor.windResilience}</td>
            <td className="py-2 px-4 text-right">{armor.earthResilience}</td>
            <td className="py-2 px-4 text-left">{armor.skills.map((skill:string, i:number) => <React.Fragment key={i}>{skill}<br /></React.Fragment>)}</td>
            <td className="py-2 px-4 text-center">{armor.materials}</td>
          </tr>
      })}
    </>
  );
}
