import { useStore } from '@nanostores/react'
import React from 'react'
import { positions, positionFilter, armorList, equip, togglePositionFilter, skillFilter, toggleSkillFilter } from '@/stores/armor-sim'
import ArmorListRow from '@/components/ArmorListRow'
import { i18nPosition } from '@/utils/utils'
import type { Loadout, Position, Armor } from '@/types/types'

export default function ArmorList(): JSX.Element {
  const $armorList = useStore(armorList)
  const $positionFilter = useStore(positionFilter)
  const $skillFilter = useStore(skillFilter)
  const allSkills = new Set($armorList.flatMap(armor => armor.skills ))

  const filteredArmorList = () => {
    let list = $armorList
    list = Object.values(list).filter(armor => $positionFilter.includes(armor.position))
    if ($skillFilter.length > 0) {
      list = Object.values(list).filter((armor) => {
        return [...armor.skills, ...$skillFilter].filter(item => armor.skills.includes(item) && $skillFilter.includes(item)).length > 0
      })
    }
    return list
  }

  const positionButtonColorClass = {
    head: 'bg-orange-300',
    body: 'bg-lime-300',
    arm: 'bg-emerald-300',
    waist: 'bg-cyan-300',
    leg: 'bg-indigo-300',
  }

  return (
    <>
      <h2 className="flex flex-row flex-nowrap items-center my-8">
        <span className="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
        <span className="flex-none block mx-4 px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
          装備リスト
        </span>
        <span className="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
      </h2>

      <div className="px-5 py-3 border-gray-500 border">
        <span>絞りこみ: </span>
        { positions.map((position, i) => {
          const colorClasses = $positionFilter.includes(position) ? `${positionButtonColorClass[position]} text-gray-700 font-bold` : "bg-gray-200 text-gray-500"
          const classes = `rounded-full text-sm px-4 py-1 mr-2 ${colorClasses}`
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
      <hr />

      <table className="relative min-w-max w-full table-auto">
        <thead>
          <tr className="text-gray-600 uppercase text-sm leading-normal">
            <th className="sticky top-0 bg-gray-300 py-2 px-4 border-l border-gray-200">装備</th>
            <th className="sticky top-0 bg-gray-300 py-2 px-4 border-l border-gray-200">部位</th>
            <th className="sticky top-0 bg-gray-300 py-2 px-4 border-l border-gray-200">名称</th>
            <th className="sticky top-0 bg-gray-300 py-2 px-4 border-l border-gray-200">流派</th>
            <th className="sticky top-0 bg-gray-300 py-2 px-4 border-l border-gray-200">防御力</th>
            <th className="sticky top-0 bg-gray-300 py-2 px-4 border-l border-gray-200">木耐性</th>
            <th className="sticky top-0 bg-gray-300 py-2 px-4 border-l border-gray-200">火耐性</th>
            <th className="sticky top-0 bg-gray-300 py-2 px-4 border-l border-gray-200">水耐性</th>
            <th className="sticky top-0 bg-gray-300 py-2 px-4 border-l border-gray-200">風耐性</th>
            <th className="sticky top-0 bg-gray-300 py-2 px-4 border-l border-gray-200">土耐性</th>
            <th className="sticky top-0 bg-gray-300 py-2 px-4 border-l border-gray-200">技能</th>
            <th className="sticky top-0 bg-gray-300 py-2 px-4 border-l border-gray-200">素材系統</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          <ArmorListRow list={filteredArmorList()} />
        </tbody>
      </table>
    </>
  );
}
