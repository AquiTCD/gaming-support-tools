import { useStore } from '@nanostores/react'
import React from 'react'
import { positions, currentLoadout, armorList, remove } from '@/stores/armor-sim'

export default function Loadout(): JSX.Element {
  const $currentLoadout = useStore(currentLoadout)
  const $armorList = useStore(armorList)

  const currentArmor = () => {
    const currentArmor = {
      head: undefined,
      body: undefined,
      arm: undefined,
      waist: undefined,
      leg: undefined
    }
    positions.forEach((position) => {
      currentArmor[position] = $armorList.filter(armor => armor.id === $currentLoadout[position]).shift()
    })
    return currentArmor
  }

  const calc = (column:string):number => {
    const current = currentArmor()
    let total:number = 0
    positions.forEach((position) => {
      if (current[position]) {
        total += current[position][column]
      }
    })
    return total
  }

  const pathCalc = () => {
    const sum = calc('path')
    const path = 0 < sum ? '獣道' : '活人'
    const diff = Math.abs(sum)
    const isPure = diff >= 150
    const pathName = diff < 50 ? '我流' : `${path}流${isPure ? '皆伝' : ''}`

    return `${pathName}(${path}:${diff})`
  }
  const i18nPosition = {
    head: '頭',
    body: '胴',
    arm: '腕',
    waist: '腰',
    leg: '脚',
  }

  const pathValue = (path:number):string => {
    switch (true){
    case path > 0:
      return `[獣]${Math.abs(path)}`
    case path < 0:
      return `[人]${Math.abs(path)}`
    default:
      return '-'
    }
  }

  return (
    <>
      <table className="min-w-max w-full table-auto">
        <thead>
          <tr className="bg-gray-700 text-gray-200 uppercase text-sm leading-normal">
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
        <tbody className="text-gray-600">
          { positions.map((position, idx) => {
              const armor = currentArmor()[position]
              let removeButton = undefined
              if (armor) {
                removeButton = <button onClick={() => remove(position)} className="rounded-full bg-gray-300 text-gray-700 text-sm px-2 py-1">外す</button>
              }

              return <tr key={idx} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-2 px-4 text-center">{removeButton}</td>
                <td className="py-2 px-4 text-center">{i18nPosition[position]}</td>
                <td className="py-2 px-4 text-left">{armor?.name}</td>
                <td className="py-2 px-4 text-left">{pathValue(armor?.path)}</td>
                <td className="py-2 px-4 text-right">{armor?.defence}</td>
                <td className="py-2 px-4 text-right">{armor?.woodResilience}</td>
                <td className="py-2 px-4 text-right">{armor?.fireResilience}</td>
                <td className="py-2 px-4 text-right">{armor?.waterResilience}</td>
                <td className="py-2 px-4 text-right">{armor?.windResilience}</td>
                <td className="py-2 px-4 text-right">{armor?.earthResilience}</td>
                <td className="py-2 px-4 text-left">{armor?.skills.map((skill:string, i:number) => <React.Fragment key={1}>{skill}<br /></React.Fragment>)}</td>
                <td className="py-2 px-4 text-left">{armor?.materials}</td>
              </tr>
          })}
          <tr className="bg-gray-300 text-gray-800">
            <td className="py-2 px-4 text-center">合計</td>
            <td className="py-2 px-4 text-center">-</td>
            <td className="py-2 px-4 text-center">-</td>
            <td className="py-2 px-4 text-center">{pathCalc()}</td>
            <td className="py-2 px-4 text-right">{calc('defence')}</td>
            <td className="py-2 px-4 text-right">{calc('woodResilience')}</td>
            <td className="py-2 px-4 text-right">{calc('fireResilience')}</td>
            <td className="py-2 px-4 text-right">{calc('waterResilience')}</td>
            <td className="py-2 px-4 text-right">{calc('windResilience')}</td>
            <td className="py-2 px-4 text-right">{calc('earthResilience')}</td>
            <td className="py-2 px-4 text-center">-</td>
            <td className="py-2 px-4 text-center">-</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
