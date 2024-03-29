import { useStore } from '@nanostores/react'
import React, { useState } from 'react'
import { positions, positionFilter, modifiers, toggleFilter, changeResilience, skillFilter, resilienceFilter, modifierFilter, materialFilter, lockPositionFilter, toggleLockPositionFilter, toggleFilter } from '@/stores/wildhearts/armor-sim'
import SkillModal from '@/components/SkillModal'
import MaterialModal from '@/components/MaterialModal'
import DualRangeSlider from '@/components/DualRangeSlider'
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
  const [showFilters, setShowFilters] = useState(true)

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
      <div className="w-full bg-white text-xs md:text-sm border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 mb-4">
        <div className={`${showFilters ? 'border-b border-gray-200' : 'rounded-b-lg' } bg-gray-100 rounded-t-lg px-4 py-1 md:py-2 text-gray-500`}>
          <button type="button" onClick={() => setShowFilters(!showFilters)} className="flex items-center justify-between w-full text-left font-bold focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
            <span>絞り込みフィルタ</span>
              <svg className={`w-6 h-6 ${showFilters ? 'rotate-180 shrink-0' : 'shrink-0'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        <div className={showFilters ? 'px-4 py-4' : 'hidden'}>
          <div className="grid grid-cols-[max-content,1fr] gap-2">
            <div className="border rounded-lg bg-gray-200 px-2 py-1 font-bold text-sm md:text-base">
              部位
            </div>
            <div className="space-y-1">
              { positions.map((position, i) => {
                const colorClasses = $positionFilter.includes(position) ? `${positionButtonColorClass[position]} text-gray-700 font-bold` : "bg-gray-200 text-gray-500"
                const classes = `rounded-full px-3 md:px-4 py-1 mr-2 ${colorClasses}`
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
                const classes = "rounded-full px-2 md:px-3 py-1 mr-2 bg-pink-200 text-gray-700 font-bold"
                return <button key={i}
                  className={classes} data-tooltip-id="skill-tooltip" data-tooltip-content={skill}>
                    {skill}
                    <div onClick={() => toggleFilter('skill', skill)} className="align-baseline opacity-70 w-3 h-3 inline-block ml-1 border bg-gray-300 text-gray-500 border-2 border-gray-500 rounded-full">
                      <svg fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </button>
                })
              }
            </div>
            <div className="border rounded-lg bg-gray-200 px-2 py-1 font-bold text-sm md:text-base">
              耐性
            </div>
            <div className="mt-0 md:mt-1" data-tooltip-id="global-tooltip" data-tooltip-html="入力した数値以上のみ表示<br />空欄でフィルタ解除">
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
            </div>
            <div className="border rounded-lg bg-gray-200 px-2 py-1 font-bold text-sm md:text-base">
              改造
            </div>
            <div className="space-y-1">
              { modifiers.map((modifier, i) => {
                const colorClasses = $modifierFilter.includes(modifier) ? `${modifierButtonColorClass[modifier]} text-gray-700 font-bold` : "bg-gray-200 text-gray-500"
                const classes = `rounded-full px-2 md:px-3 py-1 mr-2 ${colorClasses}`
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
                const classes = "rounded-full px-2 md:px-3 py-1 mr-2 bg-amber-300 text-gray-700 font-bold"
                return <button key={i}
                  className={classes}>
                    {material}
                    <div onClick={() => toggleFilter('material', material)} className="align-baseline opacity-70 w-3 h-3 inline-block ml-1 border bg-gray-300 text-gray-500 border-2 border-gray-500 rounded-full">
                      <svg fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </button>
                })
              }
            </div>
            <div className="border rounded-lg bg-gray-200 px-2 py-1 font-bold text-sm md:text-base">
              流派
            </div>
            <div className="space-y-1">
              <DualRangeSlider />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
