import { useStore } from '@nanostores/react'
import { modalStates, close } from '@/features/wildhearts/weapon-sim/stores/modals'
import { weapons, selection } from '@/features/wildhearts/weapon-sim/stores/weapons'

export default function RequirementsModal(): JSX.Element | null {
  const $weapons = useStore(weapons)

  const $selection = useStore(selection)
  const $modalStates = useStore(modalStates)
  const visible = $modalStates.requirementsModal

  const coords = $selection.map(select => select.coord)
  const selectedWeapons = $weapons.filter(weapon => coords.includes(weapon.coord))
  const totalGold = selectedWeapons.reduce((sum, w) => { return sum + w.gold }, 0)
  const totalMaterials = selectedWeapons.reduce((sum, w) => { return [...sum, ...w.materials] }, []) as {name: string, count: number}[]
  const sum = totalMaterials.reduce((acc: Record<string, number>, item: {name: string, count: number}) => {
    if (acc[item.name]) {
      acc[item.name] += item.count;
    } else {
      acc[item.name] = item.count;
    }
    return acc;
  }, {})
  const allMaterials : {name: string, count: number}[] = []
  Object.entries(sum).forEach(([key, value]) => {
    allMaterials.push({ name: key, count: value })
  })


  const title = "総必要素材"
  if (Boolean(visible)) {
    const ModalHeader = () => {
      if (title) {
        return (
          <div className="flex items-start justify-between px-4 pt-2 pb-1 border-b rounded-t border-amber-200">
            <h3 className="text-base md:text-xl font-semibold text-gray-200">
              {title}
            </h3>
            <button type="button" onClick={() => close('requirementsModal')} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
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
            <div className="relative bg-gray-800 rounded-lg shadow border-4 border-amber-400">
              {ModalHeader()}
              <div className="px-4 py-2 space-y-2 grid justify-items-center ">
                <table className="relative min-w-max table-auto text-xs md:text-sm text-gray-200">
                  <tbody>
                    { allMaterials.map(material => {
                      return (
                        <tr key={material.name}>
                          <th className="py-1 px-2 md:px-4 border border-gray-300">{material.name}</th>
                          <td className="py-1 px-2 md:px-4 text-right pr-10 border border-gray-300">{material.count}</td>
                        </tr>
                      )
                    }) }
                  <tr>
                    <th className="py-1 px-2 md:px-4 border border-gray-300">総金額</th>
                    <td className="py-1 px-2 md:px-4 text-right pr-10 border border-gray-300">{totalGold}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end items-center px-3 py-2 space-x-2">
                <button type="button" onClick={() => close('requirementsModal')} className="text-gray-700 bg-amber-300 border-2 border-amber-300 hover:bg-amber-600 hover:text-amber-100 rounded-lg text-sm px-6 py-2 text-center font-bold">閉じる</button>
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
