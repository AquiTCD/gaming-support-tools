import SkillToolTip from '@/components/SkillToolTip'
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export default function GlobalToolTip(): JSX.Element {
  return (
    <div className="z-50 relative w-screen px-10">
      <SkillToolTip id="skill-tooltip" />
      <Tooltip id="global-tooltip" />
    </div>
  );
}
