import { useStore } from '@nanostores/react'
import React, { useState, useEffect } from 'react'
import { selection, allWeapons, enhance, modalState, close } from '@/stores/wildhearts/weapon-sim'
import SkillToolTip from '@/components/SkillToolTip'
import type { InheritedSkill, Coordinate } from '@/types/wildhearts/weapon'

export default function EnhanceModal(): JSX.Element | null {
  const $selection = useStore(selection)
  const $modalState = useStore(modalState)
  const coord = $modalState.enhanceModal

  const selectedWeapon = allWeapons.find(w => w.coord === $modalState.enhanceModal)!
  const [selectedSkills, setSelectedSkill] = useState<InheritedSkill[]>([])

  const lastSelected = $selection[$selection.length - 1]
  const currentWeapon = allWeapons.find(w => w.coord === lastSelected.coord)!

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

  const title = "装備"

  if (Boolean(coord)) {
    return (
      <>
        <div className="fixed text-xs md:text-sm bg-gray-800 bg-opacity-60 top-0 left-0 right-0 z-50 w-full p-10 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
          <div className="relative w-full h-full md:h-auto">
            <div className="relative">
              <div className="px-4 py-2 space-y-2 grid grid-cols-[1fr_128px_1fr]">
                <div className="place-self-end">
                  <table className="bg-gray-800 border-separate border-4 border-amber-400 text-gray-100 rounded-lg border-spacing-0 w-64">
                    <tbody className="text-xs md:text-sm">
                    <tr>
                      <td className="border-b-2 border-amber-200 text-center text-sm md:text-base py-1 md:py-2 font-bold" colSpan={2}>{currentWeapon?.name}</td>
                    </tr>
                    <tr>
                      <th className="border-b border-amber-200 text-right font-normal w-28">攻撃力</th>
                      <td className="border-b border-amber-200 text-right pr-10 font-bold text-l">
                        <span className="mr-2">{currentWeapon?.charac}</span>
                        <span>{currentWeapon?.attack}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="border-b border-amber-200 text-right font-normal w-28">属性攻撃力</th>
                      <td className="border-b border-amber-200 text-right pr-10 font-bold text-l">
                        <span className="mr-2">{currentWeapon?.attribute}</span>
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
                            return <li key={i} className="bg-gray-900/75 h-6 pt-0.5 mb-1 px-2">{currentWeapon?.inherentSkills[i]}</li>
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
                              return <li key={skill.id} className={classes}
                              onClick={() => selectSkill(skill)}>{skill.name}</li>
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
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-24 h-24 text-gray-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>

                <div className="place-self-start">
                  <table className="bg-gray-800 border-separate border-4 border-amber-400 text-gray-100 rounded-lg border-spacing-0 w-64">
                    <tbody className="text-xs md:text-sm">
                    <tr>
                      <td className="border-b-2 border-amber-200 text-center text-sm md:text-base py-1 md:py-2 font-bold" colSpan={2}>{selectedWeapon.name}</td>
                    </tr>
                    <tr>
                      <th className="border-b border-amber-200 text-right font-normal w-28">攻撃力</th>
                      <td className="border-b border-amber-200 text-right pr-10 font-bold text-l">
                        <span className="mr-2">{selectedWeapon.charac}</span>
                        <span>{selectedWeapon.attack}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="border-b border-amber-200 text-right font-normal w-28">属性攻撃力</th>
                      <td className="border-b border-amber-200 text-right pr-10 font-bold text-l">
                        <span className="mr-2">{selectedWeapon.attribute}</span>
                        <span>{selectedWeapon.attributePower}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="border-b border-amber-200 text-right font-normal w-28">会心率</th>
                      <td className="border-b border-amber-200 text-right pr-10 font-bold text-l">
                        <span>{selectedWeapon.critical}</span>
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
                            return <li key={i} className="bg-gray-900/75 h-6 pt-0.5 mb-1 px-2">{selectedWeapon.inherentSkills[i]}</li>
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
                              return <li key={skill.id} className={classes}>{skill.name}</li>
                            }
                            skill = selectedSkills[i - selectedWeapon.inheritedSkills.length]
                            if (skill) {
                              return <li key={skill.id} className={classes} onClick={() => deSelectSkill(skill)}>{skill.name}</li>
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
                    <button type="button" onClick={() => enhance(coord as Coordinate, selectedSkills)}
                      className="text-gray-700 bg-amber-300 border-2 border-amber-300 hover:bg-amber-600 hover:text-amber-100 rounded-lg text-sm px-6 py-2 text-center font-bold">強化</button>
                  </div>
                </div>
                <div></div><div></div>
                <div>
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
