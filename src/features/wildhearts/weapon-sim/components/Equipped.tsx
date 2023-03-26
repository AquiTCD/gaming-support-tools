import { useStore } from '@nanostores/react'
import { open } from '@/features/wildhearts/weapon-sim/stores/modals'
import { weapons, selection } from '@/features/wildhearts/weapon-sim/stores/weapons'
import React, { useEffect, useState } from 'react'
import useWindowSize from '@/hooks/useWindowSize'
import type { Weapon, Select, InheritedSkill } from '@/features/wildhearts/weapon-sim/models/weapon'
import { characColor, attributeColor  } from '@/features/wildhearts/weapon-sim/models/weapon'
import Draggable, {DraggableCore} from 'react-draggable'

export default function Equipped(): JSX.Element {
  const $weapons = useStore(weapons)
  const $selection = useStore(selection)
  const [isClient, setIsClient] = useState(false)
  const [width, height] = useWindowSize()
  const [isExpand, setIsExpand] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setIsExpand(width > 768)
  }, [])
  useEffect(() => {
    setIsExpand(width > 768)
  }, [width])

  console.log($selection)

  const lastSelected = $selection[$selection.length - 1]
  const equippedWeapon: Weapon = $weapons.find(weapon => weapon.coord === lastSelected.coord)!
  const inheritedSkills: InheritedSkill[] = lastSelected.skills

  return (
    <>
      { isClient &&
      <Draggable
        handle="#equipped"
        defaultPosition={{x: 0, y: 0}}
        cancel=".cancel-drag"
      >
        <table id="equipped" className="bg-gray-800/75 border-separate border-4 border-amber-400 text-gray-100 w-40 md:w-52 rounded-lg border-spacing-0 absolute bottom-[20px] left-[20px] cursor-grab active:cursor-grabbing">
          <tbody className="text-xs md:text-sm">
          <tr>
            <td onClick={() => setIsExpand(!isExpand)} onTouchEnd={() => setIsExpand(!isExpand)} className="cursor-pointer border-b-2 border-amber-200 text-center text-sm md:text-base py-1 md:py-2 font-bold" colSpan={2}>
              <div className="w-full text-center">
                {equippedWeapon.name}
                <div className="float-right">
                  <svg className={`w-4 md:w-6 h-4 md:h-6 ${isExpand ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </div>
              </div>
            </td>
          </tr>
          { isExpand && <tr>
            <th className="border-b border-amber-200 text-right font-normal w-20 md:w-24">攻撃力</th>
            <td className="border-b border-amber-200 text-right pr-3 md:pr-5 font-bold text-l">
              <span className={`mr-2 text-[0.6rem] md:text-xs ${characColor(equippedWeapon)}`}>{equippedWeapon.charac}</span>
              <span>{equippedWeapon.attack}</span>
            </td>
          </tr> }
          { isExpand && <tr>
            <th className="border-b border-amber-200 text-right font-normal w-20 md:w-24">属性攻撃力</th>
            <td className="border-b border-amber-200 text-right pr-3 md:pr-5 font-bold text-l">
              <span className={`mr-2 text-[0.6rem] md:text-xs ${attributeColor(equippedWeapon)}`}>{equippedWeapon.attribute}</span>
              <span>{equippedWeapon.attributePower}</span>
            </td>
          </tr> }
          { isExpand && <tr>
            <th className="border-b border-amber-200 text-right font-normal w-20 md:w-24">会心率</th>
            <td className="border-b border-amber-200 text-right pr-3 md:pr-5 font-bold text-l">
              <span>{equippedWeapon.critical}</span>
              <span>%</span>
            </td>
          </tr> }
          { isExpand && <tr>
            <th className="border-b-2 border-amber-200" colSpan={2}>固有技能</th>
          </tr> }
          { isExpand && <tr>
            <td colSpan={2}>
              <ul>
                { [0,1,2].map(i => {
                  return equippedWeapon.inherentSkills[i] ?
                    <li key={i} className="bg-gray-900/75 h-6 pt-0.5 mb-1 px-2 cancel-drag" data-tooltip-id="skill-tooltip" data-tooltip-content={equippedWeapon.inherentSkills[i]}>{equippedWeapon.inherentSkills[i]}</li> :
                    <li key={i} className="bg-gray-900/75 h-6 pt-0.5 mb-1 px-2">{equippedWeapon.inherentSkills[i]}</li>
                })}
              </ul>
            </td>
          </tr> }
          <tr>
            <th className="border-b-2 border-amber-200" colSpan={2}>継承技能</th>
          </tr>
          <tr>
            <td colSpan={2}>
              <ul>
                { [...Array(5)].map((_, i) => i).map(i => {
                  const skill = inheritedSkills[i]
                  let classes = "bg-gray-900/75 h-6 pt-0.5 mb-1 px-2"
                  if (skill) {
                    return skill.name ?
                      <li key={i} className={`${classes} cancel-drag`} data-tooltip-id="skill-tooltip" data-tooltip-content={skill.name}>{skill.name}</li> :
                      <li key={i} className={classes}>{skill.name}</li>
                  }
                  if (i >= equippedWeapon.inheritedSkills.length + equippedWeapon.capacity) {
                    classes = 'h-6 pt-0.5 mb-1 px-2'
                  }
                    return <li key={i} className={classes}></li>
                })}
              </ul>
            </td>
          </tr>
          { isExpand && <tr>
            <td colSpan={2} className="text-right">
              <button type="button" onClick={() => open('requirementsModal')} onTouchEnd={() => open('requirementsModal')} className="text-amber-300 bg-transparent hover:text-amber-700 p-0.5 ml-auto mr-1 inline-flex items-center">
                必要素材合計を表示
              </button>
            </td>
          </tr> }
          </tbody>
        </table>
      </Draggable>
      }
    </>
  )
}
