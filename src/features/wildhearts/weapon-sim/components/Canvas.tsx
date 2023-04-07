import { Layer, Rect, Stage, Circle, Line } from "react-konva"
import { useStore } from '@nanostores/react'
import Weapon from '@/features/wildhearts/weapon-sim/components/Weapon'
import Path from '@/features/wildhearts/weapon-sim/components/Path'
import Pin from '@/features/wildhearts/weapon-sim/components/Pin'
import InherentCandidate from '@/features/wildhearts/weapon-sim/components/InherentCandidate'
import InheritedCandidate from '@/features/wildhearts/weapon-sim/components/InheritedCandidate'
import { coordinates, paths } from '@/features/wildhearts/weapon-sim/stores/weapons'
import { closePreview, previewModalState } from '@/features/wildhearts/weapon-sim/stores/modals'
import { pinnedWeapons, candidateSkills } from '@/features/wildhearts/weapon-sim/stores/skills'
import useWindowSize from '@/hooks/useWindowSize'
import { location } from '@/utils/utils'

export default function Canvas(): JSX.Element {
  const $coordinates = useStore(coordinates)
  const $paths = useStore(paths)
  const $pinnedWeapons = useStore(pinnedWeapons)
  const $candidateSkills = useStore(candidateSkills)
  const inherentSkillsCoords = $candidateSkills.inherent?.coords
  const inheritedSkillsCoords = [...new Set([
    ...$candidateSkills.inherited1?.coords ?? '',
    ...$candidateSkills.inherited2?.coords ?? '',
    ...$candidateSkills.inherited3?.coords ?? '',
    ...$candidateSkills.inherited4?.coords ?? '',
    ...$candidateSkills.inherited5?.coords ?? ''
  ])]
  const $previewModalState = useStore(previewModalState)

  // const [isClient, setIsClient] = useState(false);
  const [width, height] = useWindowSize()
  // useEffect(() => {
  //   setIsClient(true);
  // }, []);
  const scale = {x: 1, y: 1}
  switch (true) {
    case width <= 640: {
      scale.x = 0.6
      scale.y = 0.6
      break
    }
    case width <= 768: {
      scale.x = 0.8
      scale.y = 0.8
      break
    }
    default: {
      break
    }
  }

  return (
    <>
      <Stage width={1040 * scale.x} height={1040 * scale.y} scaleX={scale.x} scaleY={scale.y} draggable={false}>
        <Layer>
          <Rect fill="#4b5563" width={1040} height={980} onTouchEnd={_e => { closePreview() }} />
        </Layer>
        <Layer>
          { $paths.map((coords, i) => {
            return <Path key={i} coords={coords} />
          })}
          { $previewModalState.coord &&
              <Circle fill="#fde047" shadowColor="#fde047"
                shadowBlur={15} x={location[$previewModalState.coord]['x']} y={location[$previewModalState.coord]['y']} width={45} height={45} />
           }
        </Layer>
        <Layer>
          { $coordinates.map((coord, i) => {
            return <Weapon key={i} coord={coord} />
          })}
        </Layer>
        <Layer>
          { $pinnedWeapons.map((coord, i) => {
            return <Pin key={i} coord={coord} />
          })}
          { inheritedSkillsCoords.length > 0 && inheritedSkillsCoords.map((coord, i) => {
            return <InheritedCandidate key={i} coord={coord} />
          })}
          { inherentSkillsCoords && inherentSkillsCoords.map((coord, i) => {
            return <InherentCandidate key={i} coord={coord} />
          })}
        </Layer>
      </Stage>
    </>
  );
}
