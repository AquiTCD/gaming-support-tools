import { useStore } from '@nanostores/react'
import { selection, allWeapons } from '@/stores/wildhearts/weapon-sim'
import type { Weapon, Select, InheritedSkill } from '@/types/wildhearts/weapon'
import { useEffect, useState } from "react"

type Props={
  name?: string;
}

export default function Equipped({ name }: Props): JSX.Element {
  const $selection = useStore(selection)
  const lastSelected = $selection[$selection.length - 1]
  const EquippedWeapon: Weapon | undefined = allWeapons.find(weapon => weapon.coord === lastSelected.coord)
  const inheritedSkills: InheritedSkill[] = lastSelected.skills
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
    {isClient &&
      <table className="border-separate border-4 border-gray-700 w-80 rounded-lg border-spacing-2">
        <tbody>
        <tr>
          <td className="border-b-2 border-gray-700 text-center text-lg md:text-xl py-1 md:py-2" colSpan={2}>{EquippedWeapon?.name}</td>
        </tr>
        <tr>
          <th className="border-b-2 border-r border-gray-700">攻撃力</th>
          <td className="border-b-2 border-gray-700">
            <span>{EquippedWeapon?.charac}</span>
            <span>{EquippedWeapon?.attack}</span>
          </td>
        </tr>
        <tr>
          <th className="border-b-2 border-r border-gray-700">属性攻撃力</th>
          <td className="border-b-2 border-gray-700">
            <span>{EquippedWeapon?.attribute}</span>
            <span>{EquippedWeapon?.attributePower}</span>
          </td>
        </tr>
        <tr>
          <th className="border-b-2 border-r border-gray-700">会心率</th>
          <td className="border-b-2 border-gray-700">
            <span>{EquippedWeapon?.critical}</span>
            <span>%</span>
          </td>
        </tr>
        <tr>
          <th className="border-b-2 border-gray-700" colSpan={2}>固有技能</th>
        </tr>
        <tr>
          <td colSpan={2}>
            <ul>
              { [0,1,2].map(i => {
                return <li key={i} className="border-b border-gray-700 h-6">{EquippedWeapon?.inherentSkills[i]}</li>
              })}
            </ul>
          </td>
        </tr>
        <tr>
          <th className="border-b-2 border-gray-700" colSpan={2}>継承技能</th>
        </tr>
        <tr>
          <td colSpan={2}>
            <ul>
              { [0,1,2,3,4].map(i => {
                return <li key={i} className="border-b border-gray-700 h-6">{inheritedSkills[i]?.name}</li>
              })}
            </ul>
          </td>
        </tr>
        </tbody>
      </table>
      }
    </>
  )
}
