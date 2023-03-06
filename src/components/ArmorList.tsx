import { useStore } from '@nanostores/react'
import React from 'react'
import { positions, positionFilter, armorList, equip, togglePositionFilter, skillFilter, toggleSkillFilter } from '@/stores/armor-sim'
import type { Loadout, Position, Armor } from '@/stores/armor-sim'

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

  const i18nPosition = {
    head: '頭',
    body: '胴',
    arm: '腕',
    waist: '腰',
    leg: '脚',
  }

  const positionButtonColorClass = {
    head: 'bg-orange-300',
    body: 'bg-lime-300',
    arm: 'bg-emerald-300',
    waist: 'bg-cyan-300',
    leg: 'bg-indigo-300',
  }
  const positionRowColorClass = {
    head: 'bg-orange-50',
    body: 'bg-lime-50',
    arm: 'bg-emerald-50',
    waist: 'bg-cyan-50',
    leg: 'bg-indigo-50',
  }

  const pathValue = (path:number) => {
    switch (true){
    case path > 0:
      return `[獣]${Math.abs(path)}`
    case path < 0:
      return `[人]${Math.abs(path)}`
    default:
      return '-'
    }
  }
  const positionClasses = (position:string) => {
    return `${positionRowColorClass[position]} text-gray-600 border-b border-gray-200 hover:bg-gray-100`
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

      <table className="min-w-max w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className='py-2 px-4'>装備</th>
            <th className='py-2 px-4'>部位</th>
            <th className='py-2 px-4'>名称</th>
            <th className='py-2 px-4'>流派</th>
            <th className='py-2 px-4'>防御力</th>
            <th className='py-2 px-4'>木耐性</th>
            <th className='py-2 px-4'>火耐性</th>
            <th className='py-2 px-4'>水耐性</th>
            <th className='py-2 px-4'>風耐性</th>
            <th className='py-2 px-4'>土耐性</th>
            <th className='py-2 px-4'>技能</th>
            <th className='py-2 px-4'>素材系統</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          { filteredArmorList().map((armor) => {
              return <tr key={armor.id} className={positionClasses(armor.position)}>
                <td onClick={() => equip(armor.id, armor.position)} className="py-2 px-4"><button className="rounded-full bg-gray-300 text-gray-700 text-sm px-2 py-1">装備</button></td>
                <td className="py-2 px-4 text-center">{i18nPosition[armor.position]}</td>
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
        </tbody>
      </table>
    </>
  );
}
