import { useStore } from '@nanostores/react'
import React, { useState } from 'react'
import { positions, positionFilter, togglePositionFilter, skillFilter } from '@/stores/armor-sim'
import SkillModal from '@/components/SkillModal'
import { i18nPosition } from '@/utils/utils'
import type { Loadout, Position, Armor } from '@/types/types'

export default function Filter(): JSX.Element {
  const $positionFilter = useStore(positionFilter)
  const $skillFilter = useStore(skillFilter)
  const [showSkillModal, setShowSkillModal] = useState(false)

  const positionButtonColorClass = {
    head: 'bg-orange-300',
    body: 'bg-lime-300',
    arm: 'bg-emerald-300',
    waist: 'bg-cyan-300',
    leg: 'bg-indigo-300',
  }

  return (
    <>
      <div className="w-full bg-white text-xs md:text-sm border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
        <ul className="flex flex-wrap font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
          <li className="mr-2">
            <button id="about-tab" data-tabs-target="#about" type="button" role="tab" aria-controls="about" aria-selected="true" className="inline-block px-4 py-2 text-gray-700 font-bold rounded-tl-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500">絞り込みフィルタ</button>
          </li>
        </ul>
        <div id="defaultTabContent" className="px-4 py-4">
          <div className="grid grid-cols-[max-content,1fr] gap-2">
            <div className="border rounded-lg bg-gray-200 px-2 py-1 font-bold text-sm md:text-base">部位</div>
            <div className="mt-1">
              { positions.map((position, i) => {
                const colorClasses = $positionFilter.includes(position) ? `${positionButtonColorClass[position]} text-gray-700 font-bold` : "bg-gray-200 text-gray-500"
                const classes = `rounded-full px-4 py-1 mr-2 ${colorClasses}`
                return <button key={i}
                  className={classes}
                  onClick={() => togglePositionFilter(position)}>{i18nPosition[position]}</button>
                })
              }
            </div>
            <div className="border rounded-lg bg-gray-200 px-2 py-1 font-bold text-sm md:text-base">技能: </div>
            <div className="space-y-2 mt-1">
              <SkillModal showSkillModal={showSkillModal} setShowSkillModal={setShowSkillModal} />
              <button onClick={() => setShowSkillModal(true)}
                className="block border border-gray-500 text-gray-700 hover:text-gray-50 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-2 py-0.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                技能フィルタ設定
              </button>
              { $skillFilter.map((skill, i) => {
                const classes = "rounded-full px-4 py-1 mr-2 bg-pink-200 text-gray-700 font-bold"
                return <button key={i}
                  className={classes} >{skill}</button>
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
