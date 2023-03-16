import { useStore } from '@nanostores/react'
import { selection, allWeapons } from '@/stores/wildhearts/weapon-sim'
import type { Weapon, Select } from '@/types/wildhearts/weapon'
import { useEffect, useState } from "react"

type Props={
  name?: string;
}

export default function Equipped({ name }: Props): JSX.Element {
  const $selection = useStore(selection)
  const lastSelected = $selection[$selection.length - 1]
  const EquippedWeapon: Weapon | undefined = allWeapons.find(weapon => weapon.coord === lastSelected.coord)
  const inheritanceSkills: string[] = lastSelected.skills
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
    {isClient &&
      <table>
        <tbody>
        <tr>
          <th>名称</th>
          <td>{EquippedWeapon?.name}</td>
        </tr>
        <tr>
          <th>属性</th>
          <td>{EquippedWeapon?.chara}</td>
        </tr>
        <tr>
          <th>攻撃力</th>
          <td>{EquippedWeapon?.power}</td>
        </tr>
        <tr>
          <th>属性攻撃力</th>
          <td>{EquippedWeapon?.elementalPower}</td>
        </tr>
        <tr>
          <th>固有技能</th>
          <td>{EquippedWeapon?.specificSkills}</td>
        </tr>
        <tr>
          <th>継承技能</th>
          <td>{inheritanceSkills}</td>
        </tr>
        </tbody>
      </table>
      }
    </>
  )
}
