import { useStore } from '@nanostores/react'
import { positions, positionFilter, armorList, equip, togglePositionFilter, skillFilter, toggleSkillFilter } from '@/stores/armor-sim'
import { i18nPosition } from '@/utils/utils'
import type { Loadout, Position, Armor } from '@/types/types'

export default function Filter(): JSX.Element {
  const $armorList = useStore(armorList)
  const $positionFilter = useStore(positionFilter)
  const $skillFilter = useStore(skillFilter)
  const allSkills = new Set($armorList.flatMap(armor => armor.skills ))

  const positionButtonColorClass = {
    head: 'bg-orange-300',
    body: 'bg-lime-300',
    arm: 'bg-emerald-300',
    waist: 'bg-cyan-300',
    leg: 'bg-indigo-300',
  }

  return (
    <>
      <div className="w-full bg-white text-xs md:text-sm border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
        <ul className="flex flex-wrap font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
          <li className="mr-2">
            <button id="about-tab" data-tabs-target="#about" type="button" role="tab" aria-controls="about" aria-selected="true" className="inline-block px-4 py-2 text-gray-700 font-bold rounded-tl-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500">絞り込みフィルタ</button>
          </li>
        </ul>
        <div id="defaultTabContent" className="px-4 py-4">
          { positions.map((position, i) => {
            const colorClasses = $positionFilter.includes(position) ? `${positionButtonColorClass[position]} text-gray-700 font-bold` : "bg-gray-200 text-gray-500"
            const classes = `rounded-full px-4 py-1 mr-2 ${colorClasses}`
            return <button key={i}
              className={classes}
              onClick={() => togglePositionFilter(position)}>{i18nPosition[position]}</button>
            })
          }
          <br />
          { Array.from(allSkills).map((skill, i) => {
            const colorClasses = $skillFilter.includes(skill) ? "bg-pink-200 text-gray-700 font-bold" : "bg-gray-200 text-gray-500"
            const classes = `rounded-full text-sm px-4 py-1 mr-2 ${colorClasses}`
            return <button key={i}
              className={classes}
              onClick={() => toggleSkillFilter(skill)}>{skill}</button>
            })
          }
        </div>
      </div>
    </>
  );
}
