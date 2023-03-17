import { useStore } from '@nanostores/react'
import React, { useState, useEffect } from 'react'
import { selection, allWeapons, craft, modalState, close } from '@/stores/wildhearts/weapon-sim'
import { skillName } from '@/utils/utils'
import allSkillList from '@/assets/wildhearts/skill_list.json'
import SkillToolTip from '@/components/SkillToolTip'

export default function CraftModal(): JSX.Element | null {
  const $selection = useStore(selection)
  const $modalState = useStore(modalState)
  const coord = $modalState.craftModal

  const selectedWeapon = allWeapons.find(w => w.coord === $modalState.craftModal)
  const [selectedSkills, setSelectedSkill] = useState<{}[]>([])

  const lastSelected = $selection[$selection.length - 1]
  const currentWeapon = allWeapons.find(w => w.coord === lastSelected.coord)!

  const inheritableSkills = lastSelected.skills
  const [inheritedSkills, setInheritedSkill] = useState<{}[]>([])
  useEffect(() => {
    setInheritedSkill([...inheritableSkills]);
    setSelectedSkill([]);
  }, [inheritableSkills])

  const selectSkill = (skill) => {
    // add
    setSelectedSkill(prev => [...prev, skill])
    // remove
    const removedArr = inheritedSkills.filter(inheritance => inheritance.id !== skill.id)
    setInheritedSkill([...removedArr])
  }
  const deSelectSkill = (skill) => {
    // add
    setInheritedSkill(prev => [...prev, skill])
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
            <button type="button" onClick={() => close('craftModal')} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
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
        <div className="fixed text-xs md:text-sm bg-gray-600 bg-opacity-50 top-0 left-0 right-0 z-50 w-1/3 p-10 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
          <div className="relative w-full h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {ModalHeader()}
              <div className="px-4 py-2 space-y-2 flex">
                <table className="border border-1 border-gray-700">
                  <tbody>
                    <tr className="border border-1 border-gray-700">
                      <th className="border border-1 border-gray-700">名称</th>
                      <td>{currentWeapon.name}</td>
                    </tr>
                    <tr>
                      <th className="border border-1 border-gray-700">技能</th>
                      <td>
                        <ul>
                          { inheritedSkills.map((skill, i) => {
                            return <li key={skill.id} onClick={() => selectSkill(skill)}>{skill.name}</li>
                          })
                          }
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
                <table className="border border-1 border-gray-700">
                  <tbody>
                    <tr className="border border-1 border-gray-700">
                      <th className="border border-1 border-gray-700">名称</th>
                      <td>{selectedWeapon.name}</td>
                    </tr>
                    <tr>
                      <th className="border border-1 border-gray-700">技能</th>
                      <td>
                        <ul>
                          { selectedWeapon.skills.map((skill, i) => {
                            return <li key={skill.id}>{skill.name}</li>
                          })}
                          { selectedSkills.map((skill, i) => {
                            return <li key={skill.id} onClick={() => deSelectSkill(skill)}>{skill.name}</li>
                          })}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end items-center px-3 py-2 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button type="button" onClick={() => craft(coord, selectedSkills)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">OK</button>
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
