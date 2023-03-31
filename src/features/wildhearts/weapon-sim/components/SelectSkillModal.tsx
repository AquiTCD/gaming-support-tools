import { useStore } from '@nanostores/react'
import { modalStates, close } from '@/features/wildhearts/weapon-sim/stores/modals'
import { inherentSkills, inheritedSkills, setCandidate } from '@/features/wildhearts/weapon-sim/stores/skills'
import type { Candidate } from '@/features/wildhearts/weapon-sim/models/skill'

export default function SelectSkillModal(): JSX.Element | null {
  const $inherentSkills = useStore(inherentSkills)
  const $inheritedSkills = useStore(inheritedSkills)
  const $modalStates = useStore(modalStates)
  console.log($modalStates)
  const candidate = $modalStates.selectSkillModal as Candidate

  const skills = candidate === 'inherent' ? $inherentSkills : $inheritedSkills

  if (Boolean(candidate)) {
    return (
      <>
        <div className="fixed text-xs md:text-sm bg-gray-600 bg-opacity-50 top-0 left-0 right-0 z-50 w-full p-10 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
          <div className="relative w-full h-full md:h-auto">
            <div className="relative bg-gray-800 rounded-lg shadow border-4 border-amber-400">
              <div className="px-4 py-2 space-y-2 grid justify-items-center text-xs md:text-sm text-gray-200">
                <ul>
                  { skills.map((skill, i) => {
                    return (
                      <li key={i}>
                        <button onClick={() => {setCandidate(candidate, skill); close('selectSkillModal')}}>
                          {skill.name}
                        </button>
                      </li>
                    )
                  })}
                </ul>
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
