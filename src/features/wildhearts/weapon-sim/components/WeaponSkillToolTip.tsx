import { Tooltip } from 'react-tooltip'
import { skillName } from '@/utils/utils'
import 'react-tooltip/dist/react-tooltip.css'
import allSkillList from '@/assets/wildhearts/skill_list.json'

type Props={
  id: string;
}

export default function WeaponSkillToolTip({ id }: Props): JSX.Element {
  const skillDescription = (name:string|null):string => {
    let description = ''
    if (name) {
      const found = allSkillList.find(item => item.name === name)
      description = found?.description ?? '説明が見つかりませんでした'
    }
    return description
  }

  return (
    <>
      <Tooltip id={id} render={({ content }) => {
        const name = content ? skillName(content) : ''
        return (
          <div className="text-xs md:text-sm">
            <p>{name}</p>
            <hr className="border-gray-800" />
            <p>{skillDescription(name)}</p>
          </div>
        )}}
        style={{ backgroundColor: "#f59e0b", color: "#1f2937" }}>
      </Tooltip>
    </>
  );
}
