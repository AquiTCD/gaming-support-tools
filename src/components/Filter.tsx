import { useStore } from '@nanostores/react'
import React, { useState } from 'react'
import { positions, positionFilter, modifiers, toggleFilter, changeResilience, skillFilter, resilienceFilter, modifierFilter, materialFilter, lockPositionFilter, toggleLockPositionFilter } from '@/stores/armor-sim'
import SkillModal from '@/components/SkillModal'
import MaterialModal from '@/components/MaterialModal'
import { Tooltip } from '@/components/Tooltip'
import { i18nPosition } from '@/utils/utils'
import type { Loadout, Position, Armor } from '@/types/types'

export default function Filter(): JSX.Element {
  const $positionFilter = useStore(positionFilter)
  const $skillFilter = useStore(skillFilter)
  const $resilienceFilter = useStore(resilienceFilter)
  const $modifierFilter = useStore(modifierFilter)
  const $materialFilter = useStore(materialFilter)
  const $lockPositionFilter = useStore(lockPositionFilter)
  const [showSkillModal, setShowSkillModal] = useState(false)
  const [showMaterialModal, setShowMaterialModal] = useState(false)

  const positionButtonColorClass = {
    head: 'bg-orange-300',
    body: 'bg-lime-300',
    arm: 'bg-emerald-300',
    waist: 'bg-cyan-300',
    leg: 'bg-indigo-300',
  }
  const modifierButtonColorClass = {
    '無改造': 'bg-gray-300',
    '活人流改造': 'bg-blue-300',
    '獣道流改造': 'bg-red-300'
  }

  return (
    <>
      <div className="w-full bg-white text-xs md:text-sm border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
        <ul className="flex flex-wrap font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800">
          <li className="mr-2">
            <button type="button" role="tab" aria-controls="about" aria-selected="true" className="inline-block px-4 py-2 text-gray-700 font-bold rounded-tl-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500">絞り込みフィルタ</button>
          </li>
        </ul>
        <div className="px-4 py-4">
          <div className="grid grid-cols-[max-content,1fr] gap-2">
            <div className="border rounded-lg bg-gray-200 px-2 py-1 font-bold text-sm md:text-base">
              部位
            </div>
            <div className="space-y-1">
              { positions.map((position, i) => {
                const colorClasses = $positionFilter.includes(position) ? `${positionButtonColorClass[position]} text-gray-700 font-bold` : "bg-gray-200 text-gray-500"
                const classes = `rounded-full px-4 py-1 mr-2 ${colorClasses}`
                return <button key={i}
                  className={classes}
                  onClick={() => toggleFilter('position', position)}>{i18nPosition[position]}</button>
                })
              }
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" onChange={() => toggleLockPositionFilter() } checked={$lockPositionFilter} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">ロックした部位を除外</span>
                </label>
              </div>
            </div>
            <div className="border rounded-lg bg-gray-200 px-2 py-1 font-bold text-sm md:text-base">
              技能
            </div>
            <div className="space-y-1">
              <SkillModal showSkillModal={showSkillModal} setShowSkillModal={setShowSkillModal} />
              <button onClick={() => setShowSkillModal(true)}
                className="block border mt-1 border-gray-500 text-gray-700 hover:text-gray-50 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-2 py-0.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                技能フィルタ設定
              </button>
              { $skillFilter.map((skill, i) => {
                const classes = "rounded-full px-4 py-1 mr-2 bg-pink-200 text-gray-700 font-bold"
                return <button key={i}
                  className={classes} >{skill}</button>
                })
              }
            </div>
            <div className="border rounded-lg bg-gray-200 px-2 py-1 font-bold text-sm md:text-base">
              耐性
            </div>
            <Tooltip text="入力した数値以上のみ表示\n空欄でフィルタ解除">
              <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
                <div className="flex">
                  <span className="inline-flex items-center px-1 text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                    防御力
                  </span>
                  <input type="number" value={$resilienceFilter.defence} onChange={(e) => changeResilience('defence', e.target.value)} className="text-right rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full border-gray-300 px-1 py-0" />
                  </div>
                <div className="flex">
                  <span className="inline-flex items-center px-1 text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                    樹耐性
                  </span>
                  <input type="number" value={$resilienceFilter.woodResilience} onChange={(e) => changeResilience('woodResilience', e.target.value)} className="text-right rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full border-gray-300 px-1 py-0" />
                </div>
                <div className="flex">
                  <span className="inline-flex items-center px-1 text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                    火耐性
                  </span>
                  <input type="number" value={$resilienceFilter.fireResilience} onChange={(e) => changeResilience('fireResilience', e.target.value)} className="text-right rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full border-gray-300 px-1 py-0" />
                </div>
                <div className="flex">
                  <span className="inline-flex items-center px-1 text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                    水耐性
                  </span>
                  <input type="number" value={$resilienceFilter.waterResilience} onChange={(e) => changeResilience('waterResilience', e.target.value)} className="text-right rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full border-gray-300 px-1 py-0" />
                </div>
                <div className="flex">
                  <span className="inline-flex items-center px-1 text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                    風耐性
                  </span>
                  <input type="number" value={$resilienceFilter.windResilience} onChange={(e) => changeResilience('windResilience', e.target.value)} className="text-right rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full border-gray-300 px-1 py-0" />
                </div>
                <div className="flex">
                  <span className="inline-flex items-center px-1 text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                    土耐性
                  </span>
                  <input type="number" value={$resilienceFilter.earthResilience} onChange={(e) => changeResilience('earthResilience', e.target.value)} className="text-right rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full border-gray-300 px-1 py-0" />
                </div>
              </div>
            </Tooltip>
            <div className="border rounded-lg bg-gray-200 px-2 py-1 font-bold text-sm md:text-base">
              改造
            </div>
            <div className="space-y-1">
              { modifiers.map((modifier, i) => {
                const colorClasses = $modifierFilter.includes(modifier) ? `${modifierButtonColorClass[modifier]} text-gray-700 font-bold` : "bg-gray-200 text-gray-500"
                const classes = `rounded-full px-4 py-1 mr-2 ${colorClasses}`
                return <button key={i}
                  className={classes}
                  onClick={() => toggleFilter('modifier', modifier)}>{[modifier]}</button>
                })
              }
            </div>
            <div className="border rounded-lg bg-gray-200 px-2 py-1 font-bold text-sm md:text-base">
              素材
            </div>
            <div className="space-y-1">
              <MaterialModal showMaterialModal={showMaterialModal} setShowMaterialModal={setShowMaterialModal} />
              <button onClick={() => setShowMaterialModal(true)}
                className="block border mt-1 border-gray-500 text-gray-700 hover:text-gray-50 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-2 py-0.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                素材フィルタ設定
              </button>
              { $materialFilter.map((material, i) => {
                const classes = "rounded-full px-4 py-1 mr-2 bg-amber-300 text-gray-700 font-bold"
                return <button key={i}
                  className={classes} >{material}</button>
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
