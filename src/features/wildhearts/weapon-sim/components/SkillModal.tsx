import { useStore } from '@nanostores/react'
import { modalStates, open, close } from '@/features/wildhearts/weapon-sim/stores/modals'
import { candidateSkills } from '@/features/wildhearts/weapon-sim/stores/skills'

export default function SkillModal(): JSX.Element | null {
  const $modalStates = useStore(modalStates)
  const $candidateSkills = useStore(candidateSkills)

  const buttonColor = (candidate) => {
    if (Boolean($candidateSkills[candidate])) {
      return candidate === 'inherent' ? "bg-teal-200 text-gray-900 font-bold" : "bg-fuchsia-200  text-gray-900 font-bold"
    } else {
      return "bg-gray-300 text-gray-700"
    }
  }
  const buttonText = (candidate) => {
    return $candidateSkills[candidate]?.name ?? "設定する"
  }

  const isOpen = $modalStates.skillModal

  if (isOpen) {
    return (
      <>
        <div className="fixed text-xs md:text-sm bg-gray-600 bg-opacity-50 top-0 left-0 right-0 z-50 w-full p-10 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
          <div className="relative w-full h-full md:h-auto">
            <div className="relative bg-gray-800 rounded-lg shadow border-4 border-amber-400">
              <div className="px-4 py-2 space-y-2 grid justify-items-center text-xs md:text-sm text-gray-200">
                <table>
                  <tbody>
                    <tr>
                      <th className="text-sm md:text-base">固有技能 候補</th>
                      <td className="py-2 px-2">
                        <button onClick={() => open('selectSkillModal', 'inherent')}
                          className={`${buttonColor('inherent')} rounded-full px-2 md:px-3 py-1 mr-2 `}
                        >
                          {buttonText('inherent')}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th className="text-sm md:text-base">継承技能 候補1</th>
                      <td className="py-2 px-2">
                        <button onClick={() => open('selectSkillModal', 'inherited1')}
                          className={`${buttonColor('inherited1')} rounded-full px-2 md:px-3 py-1 mr-2 `}
                        >
                          {buttonText('inherited1')}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th className="text-sm md:text-base">継承技能 候補2</th>
                      <td className="py-2 px-2">
                        <button onClick={() => open('selectSkillModal', 'inherited2')}
                          className={`${buttonColor('inherited2')} rounded-full px-2 md:px-3 py-1 mr-2 `}
                        >
                          {buttonText('inherited2')}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th className="text-sm md:text-base">継承技能 候補3</th>
                      <td className="py-2 px-2">
                        <button onClick={() => open('selectSkillModal', 'inherited3')}
                          className={`${buttonColor('inherited3')} rounded-full px-2 md:px-3 py-1 mr-2 `}
                        >
                          {buttonText('inherited3')}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th className="text-sm md:text-base">継承技能 候補4</th>
                      <td className="py-2 px-2">
                        <button onClick={() => open('selectSkillModal', 'inherited4')}
                          className={`${buttonColor('inherited4')} rounded-full px-2 md:px-3 py-1 mr-2 `}
                        >
                          {buttonText('inherited4')}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th className="text-sm md:text-base">継承技能 候補5</th>
                      <td className="py-2 px-2">
                        <button onClick={() => open('selectSkillModal', 'inherited5')}
                          className={`${buttonColor('inherited5')} rounded-full px-2 md:px-3 py-1 mr-2 `}
                        >
                          {buttonText('inherited5')}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end items-center px-3 py-2 space-x-2">
                <button type="button" onClick={() => close('skillModal')} className="text-amber-100 bg-gray-800 border-2 border-amber-400 hover:bg-amber-600 rounded-lg text-sm px-3 py-2 text-center">OK</button>
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
