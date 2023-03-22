import { Layer, Rect, Stage, Circle, Line } from "react-konva"
import { useStore } from '@nanostores/react'
import Weapon from '@/features/wildhearts/weapon-sim/components/Weapon'
import Path from '@/features/wildhearts/weapon-sim/components/Path'
import { coordinates, paths } from '@/features/wildhearts/weapon-sim/stores/weapons'

export default function Canvas(): JSX.Element {
  const $coordinates = useStore(coordinates)
  const $paths = useStore(paths)
  return (
    <>
      <Stage width={1040} height={980}>
        <Layer>
          <Rect fill="#4b5563" width={1040} height={980} />
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
      </Stage>
    </>
  );
}
