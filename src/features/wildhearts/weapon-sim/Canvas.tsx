import { Layer, Rect, Stage, Circle, Line } from "react-konva"
import Weapon from '@/features/wildhearts/weapon-sim/Weapon'
import Path from '@/features/wildhearts/weapon-sim/Path'
import { coordinates }  from '@/types/wildhearts/weapon'

type Props={
  name?: string;
}
// A-Q
// 1-16
export default function Canvas({ name }: Props): JSX.Element {
  return (
    <>
      <Stage width={1400} height={1300}>
        {/* base */}
        {/* 1a 1b 1c 1d 1e 1f 1g*/}
        {/* 2a 2b 2c 2d 2e 2f 2g*/}
        {/* 3a 3b 3c 3d 3e 3f 3g*/}
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
