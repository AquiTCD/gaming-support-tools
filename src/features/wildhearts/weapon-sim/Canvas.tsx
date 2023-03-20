import { Layer, Rect, Stage, Circle, Line } from "react-konva"
import Weapon from '@/features/wildhearts/weapon-sim/Weapon'
import Path from '@/features/wildhearts/weapon-sim/Path'
import { coordinates, paths }  from '@/types/wildhearts/weapon'
import type { Coordinate }  from '@/types/wildhearts/weapon'

type Props={
  name?: string;
}

export default function Canvas({ name }: Props): JSX.Element {
  return (
    <>
      <Stage width={1400} height={1300}>
        <Layer>
          <Rect fill="#4b5563" width={1400} height={1300} />
        </Layer>
        <Layer>
          { paths.map((coords, i) => {
            return <Path key={i} coords={coords} />
          })}
        </Layer>
        <Layer>
          { coordinates.map((coord, i) => {
            return <Weapon key={i} coord={coord} />
          })}
        </Layer>
      </Stage>
    </>
  );
}
