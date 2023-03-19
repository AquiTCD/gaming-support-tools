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
    console.log(skill)
    const found = selectedSkills.find(selected => selected.id === skill.id)
    return Boolean(found)
  }

  const selectSkill = (skill: InheritedSkill) => {

    if (selectedSkills.length >= selectedWeapon.capacity) { return }
    if (isSelected(skill)) { return }
    // add
    console.log('select')
    setSelectedSkill(prev => [...prev, skill])
    console.log(selectedSkills)
  }
  const deSelectSkill = (skill: InheritedSkill) => {
    // remove
    const removedArr = selectedSkills.filter(selected => selected.id !== skill.id)
    setSelectedSkill([...removedArr])
  }

  const title = "装備"

  if (Boolean(coord)) {
    const ModalHeader = () => {
      if (title) {
        return (
          <div className="flex items-start justify-between px-4 pt-2 pb-1 border-b rounded-t dark:border-gray-600">
            <h3 className="text-base md:text-xl font-semibold text-gray-900 dark:text-white">
              {selectedWeapon.name}
            </h3>
            <button type="button" onClick={() => close('enhanceModal')} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
        )
      } else {
        null
      }
    }
    return (
      <>
        <div className="fixed text-xs md:text-sm bg-gray-600 bg-opacity-50 top-0 left-0 right-0 z-50 w-full p-10 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
          <div className="relative w-full h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {ModalHeader()}
              <div className="px-4 py-2 space-y-2 grid grid-cols-3 gap-8">
                <table className="bg-gray-800/75 border-separate border-4 border-amber-400 text-gray-100 rounded-lg border-spacing-2">
                  <tbody>
                  <tr>
                    <td className="border-b-2 border-amber-200 text-center text-lg md:text-xl py-1 md:py-2 font-bold" colSpan={2}>{currentWeapon?.name}</td>
                  </tr>
                  <tr>
                    <th className="border-b-2 border-amber-200 text-right font-normal w-28">攻撃力</th>
                    <td className="border-b-2 border-amber-200 text-right pr-10 font-bold text-l">
                      <span className="mr-2">{currentWeapon?.charac}</span>
                      <span>{currentWeapon?.attack}</span>
                    </td>
                  </tr>
                  <tr>
                    <th className="border-b-2 border-amber-200 text-right font-normal w-28">属性攻撃力</th>
                    <td className="border-b-2 border-amber-200 text-right pr-10 font-bold text-l">
                      <span className="mr-2">{currentWeapon?.attribute}</span>
                      <span>{currentWeapon?.attributePower}</span>
                    </td>
                  </tr>
                  <tr>
                    <th className="border-b-2 border-amber-200 text-right font-normal w-28">会心率</th>
                    <td className="border-b-2 border-amber-200 text-right pr-10 font-bold text-l">
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
                          return <li key={i} className="bg-gray-900/75 h-7 pt-0.5 mb-1 px-2">{currentWeapon?.inherentSkills[i]}</li>
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
                        { [0,1,2,3,4].map(i => {
                          const skill = inheritableSkills[i]
                          if (skill) {
                            const classes = isSelected(skill) ? 'text-gray-500' : ''
                            return <li key={skill.id} className={`bg-gray-900/75 h-7 pt-0.5 mb-1 px-2 ${classes}`}
                            onClick={() => selectSkill(skill)}>{skill.name}</li>
                          } else {
                            const classes = i > currentWeapon.inheritedSkills.length + currentWeapon.capacity ?
                              '' : 'bg-gray-900/75 h-7 pt-0.5 mb-1 px-2'
                            return <li key={i} className={classes}> </li>
                          }
                        })}
                      </ul>
                    </td>
                  </tr>
                  </tbody>
                </table>

                <div className="place-self-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>

                <table className="bg-gray-800/75 border-separate border-4 border-amber-400 text-gray-100 rounded-lg border-spacing-2">
                  <tbody>
                  <tr>
                    <td className="border-b-2 border-amber-200 text-center text-lg md:text-xl py-1 md:py-2 font-bold" colSpan={2}>{selectedWeapon.name}</td>
                  </tr>
                  <tr>
                    <th className="border-b-2 border-amber-200 text-right font-normal w-28">攻撃力</th>
                    <td className="border-b-2 border-amber-200 text-right pr-10 font-bold text-l">
                      <span className="mr-2">{selectedWeapon.charac}</span>
                      <span>{selectedWeapon.attack}</span>
                    </td>
                  </tr>
                  <tr>
                    <th className="border-b-2 border-amber-200 text-right font-normal w-28">属性攻撃力</th>
                    <td className="border-b-2 border-amber-200 text-right pr-10 font-bold text-l">
                      <span className="mr-2">{selectedWeapon.attribute}</span>
                      <span>{selectedWeapon.attributePower}</span>
                    </td>
                  </tr>
                  <tr>
                    <th className="border-b-2 border-amber-200 text-right font-normal w-28">会心率</th>
                    <td className="border-b-2 border-amber-200 text-right pr-10 font-bold text-l">
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
                          return <li key={i} className="bg-gray-900/75 h-7 pt-0.5 mb-1 px-2">{selectedWeapon.inherentSkills[i]}</li>
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
                          let classes = "bg-gray-900/75 h-7 pt-0.5 mb-1 px-2"
                          let skill = selectedWeapon.inheritedSkills[i]
                          if (skill) {
                            return <li key={skill.id} className={classes}>{skill.name}</li>
                          }
                          skill = selectedSkills[i - selectedWeapon.inheritedSkills.length]
                          if (skill) {
                            return <li key={skill.id} className={classes} onClick={() => deSelectSkill(skill)}>{skill.name}</li>
                          }
                          if (i >= selectedWeapon.inheritedSkills.length + selectedWeapon.capacity) {
                            classes = 'h-7 pt-0.5 mb-1 px-2'
                          }
                          return <li key={i} className={classes}></li>
                        })}
                      </ul>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end items-center px-3 py-2 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button type="button" onClick={() => enhance(coord as Coordinate, selectedSkills)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">OK</button>
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
