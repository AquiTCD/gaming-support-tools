import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import allSkillList from '@/assets/wildhearts/skill_list.json'

type Props={
  id: string;
}

export default function SkillToolTip({ id }: Props): JSX.Element {
  const skillDescription = (name:string|null):string => {
    let description = ''
    if (name) {
      const found = allSkillList.find(item => item.name === name.replace(/\s\+?\d*%?$/, ''))
      description = found?.description ?? '説明が見つかりませんでした'
    }
    return description
  }

  return (
    <>
      <Tooltip id={id}
        render={({ content }) => (
          <div className="text-xs md:text-sm">
            <p>{content}</p>
            <hr />
            <p>{skillDescription(content)}</p>
          </div>
        )}>
      </Tooltip>
    </>
  );
}
