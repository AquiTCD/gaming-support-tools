import SkillToolTip from '@/features/wildhearts/weapon-sim/components/WeaponSkillToolTip'
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export default function GlobalToolTip(): JSX.Element {
  return (
    <div className="z-50 relative w-screen px-10">
      <SkillToolTip id="skill-tooltip" />
      <Tooltip id="global-tooltip" style={{ backgroundColor: "#f59e0b", color: "#1f2937" }} />
    </div>
  );
}
