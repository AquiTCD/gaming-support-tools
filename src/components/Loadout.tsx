import { useStore } from '@nanostores/react'
import { useEffect } from 'react'
import { positions, currentLoadout, armorList, equip, remove, toggleLock } from '@/stores/armor-sim'
import { i18nPosition, pathValue } from '@/utils/utils'
import type { Loadout, Position, Armor } from '@/types/types'

export default function Loadout(): JSX.Element {
  const $currentLoadout = useStore(currentLoadout)
  const $armorList = useStore(armorList)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    for (const [_key, value] of searchParams) {
      equip(Number(value), true)
    }
  }, [])

  const currentArmor = () => {
    const currentArmor : {
      head: undefined | Armor,
      body: undefined | Armor,
      arm: undefined | Armor,
      waist: undefined | Armor,
      leg: undefined | Armor,
    } = {
      head: undefined,
      body: undefined,
      arm: undefined,
      waist: undefined,
      leg: undefined
    }
    positions.forEach((position) => {
      currentArmor[position] = $armorList.filter(armor => armor.id === $currentLoadout[position]?.id).shift()
    })
    return currentArmor
  }

  const calc = (column:string):number => {
    const current = currentArmor()
    let total:number = 0
    positions.forEach((position) => {
      if (current[position] !== undefined) {
        total += current[position][column]
      }
    })
    return total
  }

  const colorize = (value:number, low:number = 0, high:number = 999) => {
    let color = ''
    switch (true) {
      case value < low:
        color = 'text-red-600'
        break;
      case value > high:
        color = 'text-blue-600'
        break;
      default:
        break;
      }
    return <span className={color}>{value}</span>
  }

  const pathCalc = () => {
    const sum = calc('path')
    const path = 0 < sum ? '獣道' : '活人'
    const diff = Math.abs(sum)
    const isPure = diff >= 150
    const pathName = diff < 50 ? '我流' : `${path}流${isPure ? '皆伝' : ''}`

    return `${pathName}(${path}:${diff})`
  }

  const cellClass = (options: string[]) => {
    const base = "py-1 px-2 md:py-2 md:px-4"
    let classes = base
    if (options.includes('t-c')) { classes += " text-center" }
    if (options.includes('t-l')) { classes += " text-left" }
    if (options.includes('t-r')) { classes += " text-right" }
    if (options.includes('b-l')) { classes += " border-l border-gray-200" }
    if (options.includes('b-r')) { classes += " border-l border-gray-200" }
    return classes
  }

  const decorateSkills = (skills: string[]|undefined) => {
    if (skills === undefined) { return; }
    const decoratedSkills = skills.map((skill:string, i:number) => {
      let classes = ""
      const path = calc('path')
      switch (true) {
        case skill.startsWith('[活人皆伝]') && -150 < path:
          classes += "line-through"
          break;
        case skill.startsWith('[活人]') && -50 < path:
          classes += "line-through"
          break;
        case skill.startsWith('[獣道]') && path < 50:
          classes += "line-through"
          break;
        case skill.startsWith('[獣道皆伝]') && path < 150:
          classes += "line-through"
          break;
        default:
          break;
      }
      return <li key={i} className={classes}>{skill}</li>
    })
    return <>{decoratedSkills}</>
  }

  const lockButton = (armor:Armor|undefined) => {
    if (armor === undefined) {
      return null
    }
    const openImg = <path strokeLinecap="round" stroke="#9ca3af" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    const closeImg = <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    const isLocked = $currentLoadout[armor.position]?.isLocked ?? false
    const svg = <svg fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">{ isLocked ? closeImg : openImg }</svg>
    return (
      <button className="w-4 h-4 pt-1" onClick={() => toggleLock(armor.position)}>{svg}</button>
    )
  }

  return (
    <>
      <table className="relative min-w-max w-full table-auto text-xs md:text-sm">
        <thead>
          <tr className="bg-gray-700 text-gray-200 leading-normal">
            <th className="p-1 md:p-2 rounded-tl-lg" colSpan={2}>装備</th>
            <th className="p-1 md:p-2 border-l border-gray-500">部位</th>
            <th className='p-1 md:p-2 border-l border-gray-500'>名称</th>
            <th className='p-1 md:p-2 border-l border-gray-500'>流派</th>
            <th className='p-1 md:p-2 border-l border-gray-500'>防御力</th>
            <th className='p-1 md:p-2 border-l border-gray-500'>木耐性</th>
            <th className='p-1 md:p-2 border-l border-gray-500'>火耐性</th>
            <th className='p-1 md:p-2 border-l border-gray-500'>水耐性</th>
            <th className='p-1 md:p-2 border-l border-gray-500'>風耐性</th>
            <th className='p-1 md:p-2 border-l border-gray-500'>土耐性</th>
            <th className='p-1 md:p-2 border-l border-gray-500'>技能</th>
            <th className='p-1 md:p-2 border-l border-gray-500 rounded-tr-lg'>素材系統</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          { positions.map((position, idx) => {
              const armor = currentArmor()[position]
              return <tr key={idx} className="border border-gray-300 hover:bg-gray-100">
                <td className="py-1 pl-1 pr-1 md:py-2 md:pl-2 text-right">
                  {lockButton(armor)}
                </td>
                <td className="py-1 pr-1 md:py-2 md:pr-2 text-left">
                  <input type="checkbox" onChange={e => { if(armor){ remove(position) }}} checked={ armor ? true : false} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2" />
                </td>
                <td className={cellClass(['t-c', 'b-l'])}>{i18nPosition[position]}</td>
                <td className={cellClass(['t-l', 'b-l'])}>{armor?.name}</td>
                <td className={cellClass(['t-c', 'b-l'])}>{pathValue(armor?.path)}</td>
                <td className={cellClass(['t-r', 'b-l'])}>{armor?.defence}</td>
                <td className={cellClass(['t-r', 'b-l'])}>{armor?.woodResilience}</td>
                <td className={cellClass(['t-r', 'b-l'])}>{armor?.fireResilience}</td>
                <td className={cellClass(['t-r', 'b-l'])}>{armor?.waterResilience}</td>
                <td className={cellClass(['t-r', 'b-l'])}>{armor?.windResilience}</td>
                <td className={cellClass(['t-r', 'b-l'])}>{armor?.earthResilience}</td>
                <td className={cellClass(['t-l', 'b-l'])}><ul>{decorateSkills(armor?.skills)}</ul></td>
                <td className={cellClass(['t-c', 'b-l'])}>{armor?.materials}</td>
              </tr>
          })}

          {/* 合計 */}
          <tr className="bg-gray-300 text-gray-800 font-bold">
            <td className="p-1 md:p-2 text-center rounded-bl-lg" colSpan={2}>合計</td>
            <td className={cellClass(['t-c', 'b-l'])}>-</td>
            <td className={cellClass(['t-c', 'b-l'])}>-</td>
            <td className={cellClass(['t-c', 'b-l'])}>{pathCalc()}</td>
            <td className={cellClass(['t-r', 'b-l'])}>{calc('defence')}</td>
            <td className={cellClass(['t-r', 'b-l'])}>{colorize(calc('woodResilience'))}</td>
            <td className={cellClass(['t-r', 'b-l'])}>{colorize(calc('fireResilience'))}</td>
            <td className={cellClass(['t-r', 'b-l'])}>{colorize(calc('waterResilience'))}</td>
            <td className={cellClass(['t-r', 'b-l'])}>{colorize(calc('windResilience'))}</td>
            <td className={cellClass(['t-r', 'b-l'])}>{colorize(calc('earthResilience'))}</td>
            <td className={cellClass(['t-c', 'b-l'])}>-</td>
            <td className="p-1 md:p-2 text-center rounded-br-lg border-l border-gray-200">-</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
