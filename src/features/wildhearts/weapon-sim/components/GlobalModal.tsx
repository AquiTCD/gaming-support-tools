import EnhanceModal from '@/features/wildhearts/weapon-sim/components/EnhanceModal'
import RequirementsModal from '@/features/wildhearts/weapon-sim/components/RequirementsModal'
import RestoreModal from '@/features/wildhearts/weapon-sim/components/RestoreModal'
import PreviewModal from '@/features/wildhearts/weapon-sim/components/PreviewModal'
import SkillModal from '@/features/wildhearts/weapon-sim/components/SkillModal'
import SelectSkillModal from '@/features/wildhearts/weapon-sim/components/SelectSkillModal'

export default function GlobalModal(): JSX.Element {
  return (
    <div className="z-30">
      <EnhanceModal />
      <RequirementsModal />
      <RestoreModal />
      <PreviewModal />
      <SkillModal />
      <SelectSkillModal />
    </div>
  );
}
