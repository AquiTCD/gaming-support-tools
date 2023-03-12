import { useStore } from '@nanostores/react'
import React from 'react'
import { positionFilter, armorList, skillFilter, resilienceFilter, modifierFilter, materialFilter } from '@/stores/armor-sim'
import ArmorListRow from '@/components/ArmorListRow'
import type { Loadout, Position, Armor, Resilience } from '@/types/types'

export default function ArmorList(): JSX.Element {
  const $armorList = useStore(armorList)
  const $positionFilter = useStore(positionFilter)
  const $skillFilter = useStore(skillFilter)
  const $resilienceFilter = useStore(resilienceFilter)
  const $modifierFilter = useStore(modifierFilter)
  const $materialFilter = useStore(materialFilter)

  const allMaterials = Array.from(new Set($armorList.map(armor => armor.materials )))

  const filteredArmorList = () => {
    let list = $armorList
    if ($positionFilter.length < 5) {
      list = Object.values(list).filter(armor => $positionFilter.includes(armor.position))
    }
    if ($skillFilter.length > 0) {
      list = Object.values(list).filter((armor) => {
        return [...armor.skills, ...$skillFilter].filter(item => armor.skills.includes(item) && $skillFilter.includes(item)).length > 0
      })
    }
    if (0 < $materialFilter.length && $materialFilter.length < allMaterials.length ) {
      list = Object.values(list).filter(armor => $materialFilter.includes(armor.materials))
    }
    Object.entries($resilienceFilter).forEach(([key, value]) => {
      if (value === '') { return }
      list = Object.values(list).filter(armor => armor[key as Resilience] >= value )
    })
    if ($modifierFilter.length < 3) {
      const f = $modifierFilter
      switch(true) {
        case f.includes('無改造') && f.includes('活人流改造'):
          list = Object.values(list).filter(armor => !armor.name.endsWith('/獣'))
          break;
        case f.includes('無改造') && f.includes('獣道流改造'):
          list = Object.values(list).filter(armor => !armor.name.endsWith('/人'))
          break;
        case f.includes('活人流改造') && f.includes('獣道流改造'):
          list = Object.values(list).filter(armor => armor.name.endsWith('/人') || armor.name.endsWith('/獣'))
          break;
        case f.length === 1 && f.includes('無改造'):
          list = Object.values(list).filter(armor => !(armor.name.endsWith('/人') || armor.name.endsWith('/獣')))
          break;
        case f.length === 1 && f.includes('活人流改造'):
          list = Object.values(list).filter(armor => armor.name.endsWith('/人'))
          break;
        case f.length === 1 && f.includes('獣道流改造'):
          list = Object.values(list).filter(armor => armor.name.endsWith('/獣'))
          break;
        default:
          list = []
          break;
      }
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
