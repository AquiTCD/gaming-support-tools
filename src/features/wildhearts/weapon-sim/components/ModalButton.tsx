import { open } from '@/features/wildhearts/weapon-sim/stores/modals'

export default function ModalButton(): JSX.Element {
  return (
    <>
      <button onClick={() => open('skillModal')}
        className="inline-block border rounded-lg px-2 border-amber-400 text-amber-400 hover:text-gray-800 bg-gray-800 hover:bg-amber-400">
        技能
      </button>
    </>
  );
}
