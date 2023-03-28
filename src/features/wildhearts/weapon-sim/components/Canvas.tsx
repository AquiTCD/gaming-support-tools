import { Layer, Rect, Stage, Circle, Line } from "react-konva"
import { useStore } from '@nanostores/react'
import Weapon from '@/features/wildhearts/weapon-sim/components/Weapon'
import Path from '@/features/wildhearts/weapon-sim/components/Path'
import Mark from '@/features/wildhearts/weapon-sim/components/Pin'
import { coordinates, paths } from '@/features/wildhearts/weapon-sim/stores/weapons'
import { closePreview } from '@/features/wildhearts/weapon-sim/stores/modals'
import { pinnedWeapons  } from '@/features/wildhearts/weapon-sim/stores/skills'
import useWindowSize from '@/hooks/useWindowSize'

export default function Canvas(): JSX.Element {
  const $coordinates = useStore(coordinates)
  const $paths = useStore(paths)
  const $pinnedWeapons = useStore(pinnedWeapons)
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
      <Stage width={1040 * scale.x} height={1040} scaleX={scale.x} scaleY={scale.y} draggable={true}>
        <Layer>
          <Rect fill="#4b5563" width={1040} height={980} onTouchEnd={_e => { closePreview() }} />
        </Layer>
        <Layer>
          { $paths.map((coords, i) => {
            return <Path key={i} coords={coords} />
          })}
        </Layer>
        <Layer>
          { $coordinates.map((coord, i) => {
            return <Weapon key={i} coord={coord} />
          })}
        </Layer>
        <Layer>
          { $pinnedWeapons.map((coord, i) => {
            return <Mark key={i} coord={coord} />
          })}
        </Layer>
      </Stage>
    </>
  );
}
