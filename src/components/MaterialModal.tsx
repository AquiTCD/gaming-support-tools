import { useStore } from '@nanostores/react'
import { armorList, materialFilter, toggleFilter } from '@/stores/wildhearts/armor-sim'

type Props={
  showMaterialModal: boolean;
  setShowMaterialModal: any;
}

export default function Modal({ showMaterialModal, setShowMaterialModal }: Props): JSX.Element | null {
  const $armorList = useStore(armorList)
  const $materialFilter = useStore(materialFilter)
  const allMaterials = new Set($armorList.map(armor => armor.materials ))
  const title = "素材フィルタ"

  if (showMaterialModal) {
    const ModalHeader = () => {
      if (title) {
        return (
          <div className="flex items-start justify-between px-4 pt-2 pb-1 border-b rounded-t dark:border-gray-600">
            <h3 className="text-base md:text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button type="button" onClick={() => setShowMaterialModal(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
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
                { Array.from(allMaterials).map((material, i) => {
                  const colorClasses = $materialFilter.includes(material) ? "bg-amber-300 text-gray-700 font-bold" : "bg-gray-200 text-gray-500"
                  const classes = `rounded-full px-2 md:px-3 py-1 mr-2 ${colorClasses}`
                  return <button key={i}
                    className={classes}
                    onClick={() => toggleFilter('material', material)}>{material}</button>
                  })
                }
              </div>
              <div className="flex justify-end items-center px-3 py-2 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button type="button" onClick={() => setShowMaterialModal(false)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">OK</button>
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
