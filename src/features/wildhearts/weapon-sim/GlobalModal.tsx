import EnhanceModal from '@/features/wildhearts/weapon-sim/EnhanceModal'
import RequirementsModal from '@/features/wildhearts/weapon-sim/RequirementsModal'
import RestoreModal from '@/features/wildhearts/weapon-sim/RestoreModal'
import PreviewModal from '@/features/wildhearts/weapon-sim/PreviewModal'

export default function GlobalModal(): JSX.Element {
  return (
    <>
      <EnhanceModal />
      <RequirementsModal />
      <RestoreModal />
      <PreviewModal />
    </>
  );
}
