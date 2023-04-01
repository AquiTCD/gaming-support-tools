import { useStore } from '@nanostores/react'
import { modalStates, close } from '@/features/wildhearts/weapon-sim/stores/modals'
import { inherentSkills, inheritedSkills, candidateSkills, setCandidate, removeCandidate } from '@/features/wildhearts/weapon-sim/stores/skills'
import type { Candidate } from '@/features/wildhearts/weapon-sim/models/skill'

export default function SelectSkillModal(): JSX.Element | null {
  const $inherentSkills = useStore(inherentSkills)
  const $inheritedSkills = useStore(inheritedSkills)
  const $modalStates = useStore(modalStates)
  const $candidateSkills = useStore(candidateSkills)
  const candidate = $modalStates.selectSkillModal as Candidate

  const skills = candidate === 'inherent' ? $inherentSkills : $inheritedSkills
  const bgColor = candidate === 'inherent' ? "bg-teal-200" : "bg-fuchsia-200"
  const currentSkill = $candidateSkills[candidate]
  const clickHandler = (skill) => {
    if (currentSkill === skill) {
      removeCandidate(candidate)
    } else {
      setCandidate(candidate, skill)
      close('selectSkillModal')
    }
  }

  if (Boolean(candidate)) {
    return (
      <>
        <div className="fixed text-xs md:text-sm bg-gray-600 bg-opacity-50 top-0 left-0 right-0 z-50 w-full p-10 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
          <div className="relative w-full h-full md:h-auto">
            <div className="relative bg-gray-800 rounded-lg shadow border-4 border-amber-400">
              <div className="px-4 py-2 space-y-2 text-xs md:text-sm text-gray-200">
                { skills.map((skill, i) => {
                    const colorClasses = currentSkill === skill ? `${bgColor} text-gray-900 font-bold` : "bg-gray-300 text-gray-700"
                    const classes = `rounded-full px-2 md:px-3 py-1 mr-2 ${colorClasses}`
                    return <button key={i}
                      className={classes}
                      onClick={() => clickHandler(skill)}
                      data-tooltip-id="skill-tooltip" data-tooltip-content={skill.name}>{skill.name}</button>
                    })
                }
              </div>
              <div className="flex justify-end items-center px-3 py-2 space-x-2">
                <button type="button" onClick={() => close('selectSkillModal')} className="text-amber-100 bg-gray-800 border-2 border-amber-400 hover:bg-amber-600 rounded-lg text-sm px-3 py-2 text-center">キャンセル</button>
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
