import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

type Props={
  id: string;
}

export default function SkillToolTip({ id }: Props): JSX.Element {
  const allSkills  = [
      { name: '[活人]蘇生ノ構', description: '仲間を救援すると、一定時間、攻撃と防御が上昇する。'}
    ]

  const skillDescription = (name:string|null):string => {
    let description = ''
    if (name) {
      const found = allSkills.find(item => item.name === name.replace(/\s\+?\d*%?$/g, ''))
      description = found?.description ?? '説明が見つかりませんでした'
    }
    return description
  }

  return (
    <>
      <Tooltip id={id}
        render={({ content }) => (
          <div>
            <p>{content}</p>
            <hr />
            <p>{skillDescription(content)}</p>
          </div>
        )}>
      </Tooltip>
    </>
  );
}
