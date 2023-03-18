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
      <table className="border border-1 border-gray-700">
        <tbody>
        <tr className="border border-1 border-gray-700">
          <th className="border border-1 border-gray-700">名称</th>
          <td>{EquippedWeapon?.name}</td>
        </tr>
        <tr className="border border-1 border-gray-700">
          <th className="border border-1 border-gray-700">属性</th>
          <td>{EquippedWeapon?.charac}</td>
        </tr>
        <tr className="border border-1 border-gray-700">
          <th className="border border-1 border-gray-700">攻撃力</th>
          <td>{EquippedWeapon?.attack}</td>
        </tr>
        <tr className="border border-1 border-gray-700">
          <th className="border border-1 border-gray-700">属性攻撃力</th>
          <td>{EquippedWeapon?.attributePower}</td>
        </tr>
        <tr className="border border-1 border-gray-700">
          <th className="border border-1 border-gray-700">固有技能</th>
          <td>{EquippedWeapon?.inherentSkills}</td>
        </tr>
        <tr className="border border-1 border-gray-700">
          <th className="border border-1 border-gray-700">継承技能</th>
          <td>
            <ul>
              { inheritedSkills.map((skill, i) => {
                return <li key={skill.id}>{skill.name}</li>
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
