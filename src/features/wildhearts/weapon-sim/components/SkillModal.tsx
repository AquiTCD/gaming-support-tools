import { useStore } from '@nanostores/react'
import { modalStates, open, close } from '@/features/wildhearts/weapon-sim/stores/modals'
import { inherentSkills, inheritedSkills } from '@/features/wildhearts/weapon-sim/stores/skills'

export default function SkillModal(): JSX.Element | null {
  const $modalStates = useStore(modalStates)
  const isOpen = $modalStates.skillModal

  if (isOpen) {
    return (
      <>
        <div className="fixed text-xs md:text-sm bg-gray-600 bg-opacity-50 top-0 left-0 right-0 z-50 w-full p-10 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
          <div className="relative w-full h-full md:h-auto">
            <div className="relative bg-gray-800 rounded-lg shadow border-4 border-amber-400">
              <div className="px-4 py-2 space-y-2 grid justify-items-center text-xs md:text-sm text-gray-200">
                <ul>
                  <li>
                    <button onClick={() => open('selectSkillModal', 'inherent')}>
                      固有技能 候補
                    </button>
                  </li>
                  <li>
                    <button onClick={() => open('selectSkillModal', 'inherited1')}>
                      継承技能 候補1
                    </button>
                  </li>
                  <li>
                    <button onClick={() => open('selectSkillModal', 'inherited2')}>
                      継承技能 候補2
                    </button>
                  </li>
                  <li>
                    <button onClick={() => open('selectSkillModal', 'inherited3')}>
                      継承技能 候補3
                    </button>
                  </li>
                  <li>
                    <button onClick={() => open('selectSkillModal', 'inherited4')}>
                      継承技能 候補4
                    </button>
                  </li>
                  <li>
                    <button onClick={() => open('selectSkillModal', 'inherited5')}>
                      継承技能 候補5
                    </button>
                  </li>
                </ul>
              </div>
              <div className="flex justify-end items-center px-3 py-2 space-x-2">
                <button type="button" onClick={() => close('skillModal')} className="text-amber-100 bg-gray-800 border-2 border-amber-400 hover:bg-amber-600 rounded-lg text-sm px-3 py-2 text-center">キャンセル</button>
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
