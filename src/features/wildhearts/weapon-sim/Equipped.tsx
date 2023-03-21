import { useStore } from '@nanostores/react'
import { selection, weaponList, open } from '@/stores/wildhearts/weapon-sim'
import { useEffect, useState } from 'react'
import type { Weapon, Select, InheritedSkill } from '@/types/wildhearts/weapon'
import Draggable, {DraggableCore} from 'react-draggable'

type Props={
  name?: string;
}

export default function Equipped({ name }: Props): JSX.Element {
  const $weaponList = useStore(weaponList)
  const $selection = useStore(selection)
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const lastSelected = $selection[$selection.length - 1]
  const equippedWeapon: Weapon = $weaponList.find(weapon => weapon.coord === lastSelected.coord)!
  const inheritedSkills: InheritedSkill[] = lastSelected.skills

  return (
    <>
      { isClient &&
      <Draggable
        handle="#equipped"
        defaultPosition={{x: 0, y: 0}}
      >
        <table id="equipped" className="bg-gray-800/75 border-separate border-4 border-amber-400 text-gray-100 w-64 rounded-lg border-spacing-0 absolute bottom-10 left-10 cursor-grab active:cursor-grabbing">
          <tbody className="text-xs md:text-sm">
          <tr>
            <td className="border-b-2 border-amber-200 text-center text-sm md:text-base py-1 md:py-2 font-bold" colSpan={2}>{equippedWeapon.name}</td>
          </tr>
          <tr>
            <th className="border-b border-amber-200 text-right font-normal w-28">攻撃力</th>
            <td className="border-b border-amber-200 text-right pr-10 font-bold text-l">
              <span className="mr-2">{equippedWeapon.charac}</span>
              <span>{equippedWeapon.attack}</span>
            </td>
          </tr>
          <tr>
            <th className="border-b border-amber-200 text-right font-normal w-28">属性攻撃力</th>
            <td className="border-b border-amber-200 text-right pr-10 font-bold text-l">
              <span className="mr-2">{equippedWeapon.attribute}</span>
              <span>{equippedWeapon.attributePower}</span>
            </td>
          </tr>
          <tr>
            <th className="border-b border-amber-200 text-right font-normal w-28">会心率</th>
            <td className="border-b border-amber-200 text-right pr-10 font-bold text-l">
              <span>{equippedWeapon.critical}</span>
              <span>%</span>
            </td>
          </tr>
          <tr>
            <th className="border-b-2 border-amber-200" colSpan={2}>固有技能</th>
          </tr>
          <tr>
            <td colSpan={2}>
              <ul>
                { [0,1,2].map(i => {
                  return <li key={i} className="bg-gray-900/75 h-6 pt-0.5 mb-1 px-2">{equippedWeapon.inherentSkills[i]}</li>
                })}
              </ul>
            </td>
          </tr>
          <tr>
            <th className="border-b-2 border-amber-200" colSpan={2}>継承技能</th>
          </tr>
          <tr>
            <td colSpan={2}>
              <ul>
                { [...Array(5)].map((_, i) => i).map(i => {
                  const skill = inheritedSkills[i]
                  let classes = "bg-gray-900/75 h-6 pt-0.5 mb-1 px-2"
                  if (skill) {
                    return <li key={i} className={classes}>{skill.name}</li>
                  }
                  if (i >= equippedWeapon.inheritedSkills.length + equippedWeapon.capacity) {
                    classes = 'h-6 pt-0.5 mb-1 px-2'
                  }
                    return <li key={i} className={classes}></li>
                })}
              </ul>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="text-right">
              <button type="button" onClick={() => open('requirementsModal')} className="text-amber-300 bg-transparent hover:text-amber-700 p-0.5 ml-auto mr-1 inline-flex items-center">
                必要素材合計を表示
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </Draggable>
      }
    </>
  )
}
