import { useStore } from '@nanostores/react'
import { changeEquip, isEquipped, skillFilter } from '@/stores/armor-sim'
import { i18nPosition, pathValue } from '@/utils/utils'
import type { Loadout, Position, Armor } from '@/types/types'

type Props = {
  list: Armor[]
}
export default function ArmorListRow({ list }: Props): JSX.Element {
  const $skillFilter = useStore(skillFilter)

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

  const decorateSkills = (skills: string[]|undefined) => {
    if (skills === undefined) { return; }
    const decoratedSkills = skills.map((skill:string, i:number) => {
      let classes = ""
      switch (true) {
        case skill.startsWith('[活人皆伝]'):
          classes += "text-blue-600"
          break;
        case skill.startsWith('[活人]'):
          classes += "text-blue-800"
          break;
        case skill.startsWith('[獣道]'):
          classes += "text-red-800"
          break;
        case skill.startsWith('[獣道皆伝]'):
          classes += "text-red-600"
          break;
        default:
          break;
      }
      if($skillFilter.includes(skill)) {
        classes += " font-bold"
      }
      return <li key={i} className={classes}>{skill}</li>
    })
    return <>{decoratedSkills}</>
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
            <td className={cellClass(['t-l', 'b-l'])}><ul>{decorateSkills(armor.skills)}</ul></td>
            <td className={cellClass(['t-c', 'b-l'])}>{armor.materials}</td>
          </tr>
      })}
    </>
  );
}
