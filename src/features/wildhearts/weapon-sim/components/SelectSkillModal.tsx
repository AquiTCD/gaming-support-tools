import { useStore } from '@nanostores/react'
import { useState, useEffect } from 'react'
import { modalStates, close } from '@/features/wildhearts/weapon-sim/stores/modals'
import { inherentSkills, inheritedSkills, candidateSkills, setCandidate, removeCandidate } from '@/features/wildhearts/weapon-sim/stores/skills'
import allSkillList from '@/assets/wildhearts/skill_list.json'
import type { Candidate } from '@/features/wildhearts/weapon-sim/models/skill'

export default function SelectSkillModal(): JSX.Element | null {
  const $inherentSkills = useStore(inherentSkills)
  const $inheritedSkills = useStore(inheritedSkills)
  const $modalStates = useStore(modalStates)
  const $candidateSkills = useStore(candidateSkills)

  const [searchInput, setSearchInput] = useState('')

  const candidate = $modalStates.selectSkillModal as Candidate

  useEffect(() => {
    setSearchInput('');
  }, [candidate])

  const skills = candidate === 'inherent' ? $inherentSkills : $inheritedSkills
  const bgColor = candidate === 'inherent' ? "bg-teal-200" : "bg-fuchsia-200"
  const currentSkill = $candidateSkills[candidate]
  const clickHandler = (skill) => {
    console.log(skill)
    if (currentSkill === skill) {
      removeCandidate(candidate)
    } else {
      setCandidate(candidate, skill)
    }
  }
  const filteredSkills = allSkillList.filter(skill => {
    return skills.map(skill => skill.name).includes(skill.name)
  })

  const skillList = ():string[] => {
    let list = filteredSkills.sort((a, b) => a.kana.localeCompare(b.kana, 'ja'))
    if (searchInput) {
      list = list.filter(skill => skill.name.includes(searchInput) || skill.kana.includes(searchInput))
    }
    return list.map(skill => skill.name)
  }

  if (Boolean(candidate)) {
    return (
      <>
        <div className="fixed text-xs md:text-sm bg-gray-600 bg-opacity-50 top-0 left-0 right-0 z-50 w-full p-10 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
          <div className="relative w-full h-full md:h-auto">
            <div className="relative bg-gray-800 rounded-lg shadow border-4 border-amber-400">
              <div className="px-4 py-2 space-y-2 text-xs md:text-sm text-gray-200">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                  </div>
                  <input type="text" onChange={(e) => setSearchInput(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto pl-10 px-2.5 py-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" />
                </div>
                { skillList().map((skillName, i) => {
                    const skill = skills.find(aSkill => aSkill.name === skillName)
                    const colorClasses = currentSkill === skill ? `${bgColor} text-gray-900 font-bold` : "bg-gray-300 text-gray-700"
                    const classes = `rounded-full px-2 md:px-3 py-1 mr-2 ${colorClasses}`
                    return <button key={skillName}
                      className={classes}
                      onClick={() => clickHandler(skill)}
                      data-tooltip-id="skill-tooltip" data-tooltip-content={skill.name}>{skill.name}</button>
                    })
                }
              </div>
              <div className="flex justify-end items-center px-3 py-2 space-x-2">
                <button type="button" onClick={() => close('selectSkillModal')} className="text-gray-800 bg-amber-300 border-2 border-amber-400 hover:bg-amber-600 rounded-lg text-sm px-3 py-2 text-center">OK</button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return null
  }
}
