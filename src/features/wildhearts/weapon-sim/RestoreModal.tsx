import { useStore } from '@nanostores/react'
import React, { useState, useEffect } from 'react'
import { selection, allWeapons, enhance, modalState, close, restore } from '@/stores/wildhearts/weapon-sim'
import SkillToolTip from '@/components/SkillToolTip'
import type { InheritedSkill, Coordinate } from '@/types/wildhearts/weapon'

export default function RestoreModal(): JSX.Element | null {
  const $modalState = useStore(modalState)
  const coord = $modalState.restoreModal as Coordinate

  const selectedWeapon = allWeapons.find(w => w.coord === $modalState.restoreModal)

  if (Boolean(coord)) {
    return (
      <>
        <div className="fixed text-xs md:text-sm bg-gray-600 bg-opacity-50 top-0 left-0 right-0 z-50 w-full p-10 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
          <div className="relative w-full h-full md:h-auto">
            <div className="relative bg-gray-800 rounded-lg shadow border-4 border-amber-400">
              <div className="px-4 py-2 space-y-2 grid justify-items-center text-xs md:text-sm text-gray-200">
                <p className="text-lg md:text-lg text-center">
                  強化状態を<br />
                  <span className="font-bold">「{selectedWeapon!.name}」</span><br />
                  まで戻してよろしいですか？
                </p>
              </div>
              <div className="flex justify-end items-center px-3 py-2 space-x-2">
                <button type="button" onClick={() => close('restoreModal')} className="text-amber-100 bg-gray-800 border-2 border-amber-400 hover:bg-amber-600 rounded-lg text-sm px-3 py-2 text-center">キャンセル</button>
                <button type="button" onClick={() => restore(coord)} className="text-gray-700 bg-amber-300 border-2 border-amber-300 hover:bg-amber-600 hover:text-amber-100 rounded-lg text-sm px-3 py-2 text-center font-bold">強化を戻す</button>
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
