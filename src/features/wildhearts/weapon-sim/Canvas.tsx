import { Layer, Rect, Stage, Circle, Line } from "react-konva"
import Weapon from '@/features/wildhearts/weapon-sim/Weapon'
import Path from '@/features/wildhearts/weapon-sim/Path'
import { coordinates }  from '@/types/wildhearts/weapon'
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
            <Path coords={['1D', '1I']} />
            <Path coords={['1I', '1N']} />
            <Path coords={['1N', '4O']} />
            <Path coords={['4O', '5O']} />
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
