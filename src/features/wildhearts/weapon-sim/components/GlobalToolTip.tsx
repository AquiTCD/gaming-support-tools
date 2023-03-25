import SkillToolTip from '@/features/wildhearts/weapon-sim/components/WeaponSkillToolTip'

export default function GlobalToolTip(): JSX.Element {
  return (
    <div className="z-50 relative w-screen px-10">
      <SkillToolTip id="skill-tooltip" />
    </div>
  );
}
