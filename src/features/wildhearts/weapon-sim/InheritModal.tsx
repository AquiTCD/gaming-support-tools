import { useStore } from '@nanostores/react'
import React, { useState } from 'react'
import { selection, allWeapons, craft } from '@/stores/wildhearts/weapon-sim'
import { skillName } from '@/utils/utils'
import allSkillList from '@/assets/wildhearts/skill_list.json'
import SkillToolTip from '@/components/SkillToolTip'

type Props={
  showInheritModal: boolean;
  setShowInheritModal: any;
  coord: any
}

// TODO: useStateの値を取りだす方法
// modalを1つで上手く開く方法（stateの値を渡す？）

export default function InheritModal({ showInheritModal, setShowInheritModal, coord }: Props): JSX.Element | null {
  const $selection = useStore(selection)
  const selectedWeapon = allWeapons.find(w => w.coord === coord )!
  const [selectedSkills, setSelectedSkill] = useState(selectedWeapon?.skills ?? [])
  const lastSelected = $selection[$selection.length - 1]
  const inheritanceSkills: string[] = lastSelected.skills
  // const allSkills = new Set($armorList.flatMap(armor => armor.skills ))

  // const allArmorSkillList = allSkillList.filter(skill => {
  //   return Array.from(allSkills).map(armorSkill => skillName(armorSkill)).includes(skill.name)
  // })

  // クリックでstate に 溜めて add で stete から写す

  const title = "装備"

  // const skillList = ():string[] => {
  //   let list = allArmorSkillList.sort((a, b) => a.kana.localeCompare(b.kana, 'ja'))
  //   if (searchInput) {
  //     list = list.filter(skill => skill.name.includes(searchInput) || skill.kana.includes(searchInput))
  //   }
  //   return list.map(skill => skill.name)
  // }

  if (showInheritModal) {
    const ModalHeader = () => {
      if (title) {
        return (
          <div className="flex items-start justify-between px-4 pt-2 pb-1 border-b rounded-t dark:border-gray-600">
            <h3 className="text-base md:text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button type="button" onClick={() => setShowInheritModal(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
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
              <div className="px-4 py-2 space-y-2">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                  </div>
                </div>
                { inheritanceSkills.map((skill, i) => {
                  const colorClasses = selectedSkills.includes(skill) ? "bg-pink-200 text-gray-700 font-bold" : "bg-gray-200 text-gray-500"
                  const classes = `rounded-full px-2 md:px-3 py-1 mr-2 ${colorClasses}`
                  return <button key={i}
                    className={classes}
                    onClick={() => setSelectedSkill([...selectedSkills, skill])}
                    data-tooltip-id="skill-modal-tooltip" data-tooltip-content={skill}>{skill}</button>
                  })
                }
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
