import { useStore } from '@nanostores/react'
import React from 'react'
import { currentLoadout, changeEquip, isEquipped } from '@/stores/armor-sim'
import { i18nPosition, pathValue } from '@/utils/utils'
import type { Loadout, Position, Armor } from '@/types/types'

type Props = {
  list: Armor[]
}
export default function ArmorListRow({ list }: Props): JSX.Element {
  const $currentLoadout = useStore(currentLoadout)

  const positionRowColorClass = {
    head: 'bg-orange-50',
    body: 'bg-lime-50',
    arm: 'bg-emerald-50',
    waist: 'bg-cyan-50',
    leg: 'bg-indigo-50',
  }

  const positionClasses = (position:string) => {
    return `${positionRowColorClass[position as Position]} text-gray-600 border border-gray-300 hover:bg-gray-100`
  }
  const cellClass = (options: string[]) => {
    const base = "p-1 md:p-2"
    let classes = base
    if (options.includes('t-c')) { classes += " text-center" }
    if (options.includes('t-l')) { classes += " text-left" }
    if (options.includes('t-r')) { classes += " text-right" }
    if (options.includes('b-l')) { classes += " border-l border-gray-150" }
    if (options.includes('b-r')) { classes += " border-l border-gray-150" }
    return classes
  }

  return (
    <>
      { list.map((armor) => {
          return <tr key={armor.id} className={positionClasses(armor.position)}>
            <td className="p-1 md:p-2 text-center">
              <input type="checkbox" onChange={() => changeEquip(armor.id, armor.position) } checked={isEquipped(armor.id)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2" />
            </td>
            <td className={cellClass(['t-c', 'b-l'])}>{i18nPosition[armor.position as Position]}</td>
            <td className={cellClass(['t-l', 'b-l'])}>{armor.name}</td>
            <td className={cellClass(['t-l', 'b-l'])}>{pathValue(armor.path)}</td>
            <td className={cellClass(['t-r', 'b-l'])}>{armor.defence}</td>
            <td className={cellClass(['t-r', 'b-l'])}>{armor.woodResilience}</td>
            <td className={cellClass(['t-r', 'b-l'])}>{armor.fireResilience}</td>
            <td className={cellClass(['t-r', 'b-l'])}>{armor.waterResilience}</td>
            <td className={cellClass(['t-r', 'b-l'])}>{armor.windResilience}</td>
            <td className={cellClass(['t-r', 'b-l'])}>{armor.earthResilience}</td>
            <td className={cellClass(['t-l', 'b-l'])}>{armor.skills.map((skill:string, i:number) => <React.Fragment key={i}>{skill}<br /></React.Fragment>)}</td>
            <td className={cellClass(['t-c', 'b-l'])}>{armor.materials}</td>
          </tr>
      })}
    </>
  );
}
