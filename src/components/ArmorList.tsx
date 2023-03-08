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

  return (
    <>
      <table className="relative min-w-max w-full table-auto text-xs md:text-sm">
        <thead>
          <tr className="text-gray-600 uppercase leading-normal">
            <th className="sticky top-0 bg-gray-300 p-1 md:p-2 border-l border-gray-200">装備</th>
            <th className="sticky top-0 bg-gray-300 p-1 md:p-2 border-l border-gray-200">部位</th>
            <th className="sticky top-0 bg-gray-300 p-1 md:p-2 border-l border-gray-200">名称</th>
            <th className="sticky top-0 bg-gray-300 p-1 md:p-2 border-l border-gray-200">流派</th>
            <th className="sticky top-0 bg-gray-300 p-1 md:p-2 border-l border-gray-200">防御力</th>
            <th className="sticky top-0 bg-gray-300 p-1 md:p-2 border-l border-gray-200">樹耐性</th>
            <th className="sticky top-0 bg-gray-300 p-1 md:p-2 border-l border-gray-200">火耐性</th>
            <th className="sticky top-0 bg-gray-300 p-1 md:p-2 border-l border-gray-200">水耐性</th>
            <th className="sticky top-0 bg-gray-300 p-1 md:p-2 border-l border-gray-200">風耐性</th>
            <th className="sticky top-0 bg-gray-300 p-1 md:p-2 border-l border-gray-200">土耐性</th>
            <th className="sticky top-0 bg-gray-300 p-1 md:p-2 border-l border-gray-200">技能</th>
            <th className="sticky top-0 bg-gray-300 p-1 md:p-2 border-l border-gray-200">素材系統</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          <ArmorListRow list={filteredArmorList()} />
        </tbody>
      </table>
    </>
  );
}
