import { useStore } from '@nanostores/react'
import React, { useState, useEffect } from 'react'
import { selection, enhance } from '@/features/wildhearts/weapon-sim/stores/weapon-sim'
import { modalStates, close } from '@/features/wildhearts/weapon-sim/stores/modals'
import { weapons } from '@/features/wildhearts/weapon-sim/stores/weapons'
import SkillToolTip from '@/components/SkillToolTip'
import type { InheritedSkill, Coordinate, Weapon } from '@/features/wildhearts/weapon-sim/models/weapon'
import { characColor, attributeColor  } from '@/features/wildhearts/weapon-sim/models/weapon'

export default function EnhanceModal(): JSX.Element | null {
  const $selection = useStore(selection)
  const $modalStates = useStore(modalStates)
  const $weapons = useStore(weapons)
  const coord = $modalStates.enhanceModal

  const selectedWeapon = $weapons.find(w => w.coord === $modalStates.enhanceModal)!
  const [selectedSkills, setSelectedSkill] = useState<InheritedSkill[]>([])

  const lastSelected = $selection[$selection.length - 1]
  const currentWeapon = $weapons.find(w => w.coord === lastSelected.coord)!

  const inheritableSkills = lastSelected.skills
  useEffect(() => {
    // 選択した武器が変更されるたびに初期化
    setSelectedSkill([]);
  }, [selectedWeapon])

  const isSelected = (skill: InheritedSkill): boolean => {
    const found = selectedSkills.find(selected => selected.id === skill.id)
    return Boolean(found)
  }

  const selectSkill = (skill: InheritedSkill) => {
    // validate
    if (selectedSkills.length >= selectedWeapon.capacity) { return }
    if (isSelected(skill)) { return }
    // add
    setSelectedSkill(prev => [...prev, skill])
  }
  const deSelectSkill = (skill: InheritedSkill) => {
    // remove
    const removedArr = selectedSkills.filter(selected => selected.id !== skill.id)
    setSelectedSkill([...removedArr])
  }

  const comparedColor = (attr: keyof Weapon):string  => {
    switch (true) {
      case selectedWeapon[attr] > currentWeapon[attr]: {
        return 'text-green-300'
      }
      case selectedWeapon[attr] < currentWeapon[attr]: {
        return 'text-red-400'
      }
      default: {
        return ''
      }
    }
  }

  if (Boolean(coord)) {
    return (
      <>
        <div onClick={() => close('enhanceModal')} className="fixed text-xs md:text-sm bg-gray-800 bg-opacity-60 top-0 left-0 right-0 z-50 w-full p-10 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
          <div className="relative w-full h-full md:h-auto">
            <div className="relative">
              <div className="px-4 py-2 space-y-2 grid grid-cols-1 md:grid-cols-[1fr_128px_1fr]">
                <div className="place-self-center md:place-self-end">
                  <table onClick={(e) => { e.stopPropagation() }} className="bg-gray-800 border-separate border-4 border-amber-400 text-gray-100 rounded-lg border-spacing-0 w-64">
                    <tbody className="text-xs md:text-sm">
                    <tr>
                      <td className="border-b-2 border-amber-200 text-center text-sm md:text-base py-1 md:py-2 font-bold" colSpan={2}>{currentWeapon?.name}</td>
                    </tr>
                    <tr>
                      <th className="border-b border-amber-200 text-right font-normal w-28">攻撃力</th>
                      <td className="border-b border-amber-200 text-right pr-10 font-bold text-l">
                        <span className={`mr-2 text-[0.6rem] md:text-xs ${characColor(currentWeapon)}`}>{currentWeapon?.charac}</span>
                        <span>{currentWeapon?.attack}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="border-b border-amber-200 text-right font-normal w-28">属性攻撃力</th>
                      <td className="border-b border-amber-200 text-right pr-10 font-bold text-l">
                        <span className={`mr-2 text-[0.6rem] md:text-xs ${attributeColor(currentWeapon)}`}>{currentWeapon?.attribute}</span>
                        <span>{currentWeapon?.attributePower}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="border-b border-amber-200 text-right font-normal w-28">会心率</th>
                      <td className="border-b border-amber-200 text-right pr-10 font-bold text-l">
                        <span>{currentWeapon?.critical}</span>
                        <span>%</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="border-b-2 border-amber-200" colSpan={2}>固有技能</th>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <ul>
                          { [0,1,2].map(i => {
                            return <li key={i} className="bg-gray-900/75 h-6 pt-0.5 mb-1 px-2" data-tooltip-id="skill-tooltip" data-tooltip-content={currentWeapon.inherentSkills[i]}>{currentWeapon?.inherentSkills[i]}</li>
                          })}
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <th className="border-b-2 border-amber-200" colSpan={2}>継承技能</th>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <ul>
                          { [...Array(5)].map((_, i) => i).map(i => {
                            const skill = inheritableSkills[i]
                            let classes = "bg-gray-900/75 h-6 pt-0.5 mb-1 px-2"
                            if (skill) {
                              classes += isSelected(skill) ? ' text-gray-500' : ''
                              return <li key={i} className={classes}
                              onClick={() => selectSkill(skill)} data-tooltip-id="skill-tooltip" data-tooltip-content={skill.name}>{skill.name}</li>
                            }
                            if (i >= currentWeapon.inheritedSkills.length + currentWeapon.capacity) {
                              classes = 'h-6 pt-0.5 mb-1 px-2'
                            }
                            return <li key={i} className={classes}></li>
                          })}
                        </ul>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <div className="flex justify-center items-center px-3 py-2 space-x-2">
                    <button type="button" onClick={() => close('enhanceModal')} className="text-amber-100 bg-gray-800 border-2 border-amber-400 hover:bg-amber-600 rounded-lg text-sm px-3 py-2 text-center">キャンセル</button>
                  </div>
                </div>

                <div className="place-self-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-12 h-12 rotate-90 md:w-24 md:h-24 md:rotate-0 text-gray-100 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>

                <div className="place-self-center md:place-self-start">
                  <table onClick={(e) => { e.stopPropagation() }} className="bg-gray-800 border-separate border-4 border-amber-400 text-gray-100 rounded-lg border-spacing-0 w-64">
                    <tbody className="text-xs md:text-sm">
                    <tr>
                      <td className="border-b-2 border-amber-200 text-center text-sm md:text-base py-1 md:py-2 font-bold" colSpan={2}>{selectedWeapon.name}</td>
                    </tr>
                    <tr>
                      <th className="border-b border-amber-200 text-right font-normal w-28">攻撃力</th>
                      <td className="border-b border-amber-200 text-right pr-10 font-bold text-l">
                        <span className={`mr-2 text-[0.6rem] md:text-xs ${characColor(selectedWeapon)}`}>{selectedWeapon.charac}</span>
                        <span className={comparedColor('attack')}>{selectedWeapon.attack}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="border-b border-amber-200 text-right font-normal w-28">属性攻撃力</th>
                      <td className="border-b border-amber-200 text-right pr-10 font-bold text-l">
                        <span className={`mr-2 text-[0.6rem] md:text-xs ${attributeColor(selectedWeapon)}`}>{selectedWeapon.attribute}</span>
                        <span className={comparedColor('attributePower')}>{selectedWeapon.attributePower}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="border-b border-amber-200 text-right font-normal w-28">会心率</th>
                      <td className="border-b border-amber-200 text-right pr-10 font-bold text-l">
                        <span className={comparedColor('critical')}>
                          <span>{selectedWeapon.critical}</span>
                          <span>%</span>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th className="border-b-2 border-amber-200" colSpan={2}>固有技能</th>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <ul>
                          { [0,1,2].map(i => {
                            return <li key={i} className="bg-gray-900/75 h-6 pt-0.5 mb-1 px-2" data-tooltip-id="skill-tooltip" data-tooltip-content={selectedWeapon.inherentSkills[i]}>{selectedWeapon.inherentSkills[i]}</li>
                          })}
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <th className="border-b-2 border-amber-200" colSpan={2}>継承技能</th>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <ul>
                          { [...Array(5)].map((_, i) => i).map(i => {
                            let classes = "bg-gray-900/75 h-6 pt-0.5 mb-1 px-2"
                            let skill = selectedWeapon.inheritedSkills[i]
                            if (skill) {
                              return <li key={i} className={classes} data-tooltip-id="skill-tooltip" data-tooltip-content={skill.name}>{skill.name}</li>
                            }
                            skill = selectedSkills[i - selectedWeapon.inheritedSkills.length]
                            if (skill) {
                              return <li key={i} className={classes} onClick={() => deSelectSkill(skill)} data-tooltip-id="skill-tooltip" data-tooltip-content={skill.name}>{skill.name}</li>
                            }
                            if (i >= selectedWeapon.inheritedSkills.length + selectedWeapon.capacity) {
                              classes = 'h-6 pt-0.5 mb-1 px-2'
                            }
                            return <li key={i} className={classes}></li>
                          })}
                        </ul>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <div className="flex justify-center items-center px-3 py-2 space-x-2">
                    <button type="button" onClick={(e) => { e.stopPropagation(); enhance(coord as Coordinate, selectedSkills)}}
                      className="text-gray-700 bg-amber-300 border-2 border-amber-300 hover:bg-amber-600 hover:text-amber-100 rounded-lg text-sm px-6 py-2 text-center font-bold">強化</button>
                  </div>
                </div>
                <div></div><div></div>
                <div className="place-self-center md:place-self-start">
                  <table className="bg-gray-800 border-separate border-2 border-amber-400 text-gray-100 rounded-lg border-spacing-0 w-64">
                    <tbody>
                      { selectedWeapon.materials.map(material => {
                        return (
                          <tr key={material.name} className="py-1">
                            <td className="pl-5 pr-1 border-b border-amber-200">{material.name}</td>
                            <td className="pl-1 pr-5 border-b border-amber-200 text-right">{material.count}</td>
                          </tr>
                        )
                      }) }
                      <tr className="py-1">
                        <td className="pl-5 pr-1">金</td>
                        <td className="pl-1 pr-5 text-right">{selectedWeapon.gold}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <SkillToolTip id="skill-modal-tooltip" />
        </div>
      </>
    )
  } else {
    return null
  }
}
