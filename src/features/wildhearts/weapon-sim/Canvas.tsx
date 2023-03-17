import { Layer, Rect, Stage, Circle, Line } from "react-konva"
import Weapon from '@/features/wildhearts/weapon-sim/Weapon'
import Path from '@/features/wildhearts/weapon-sim/Path'

type Props={
  name?: string;
}
// A-Q
// 1-16
export default function Canvas({ name }: Props): JSX.Element {
  // const coordinate(pos:'x'|'y', id:string) => {
  // }
  return (
    <>
      <Stage width={800} height={1200}>
        {/* base */}
        {/* 1a 1b 1c 1d 1e 1f 1g*/}
        {/* 2a 2b 2c 2d 2e 2f 2g*/}
        {/* 3a 3b 3c 3d 3e 3f 3g*/}
       <Layer>
          <Path coords={['1B', '1D']} />
          <Path coords={['1D', '1F']} />
          <Path coords={['1B', '2A']} />
          <Path coords={['1B', '2B']} />
          <Path coords={['1D', '2C']} />
          <Path coords={['1D', '2D']} />
          <Path coords={['1D', '2E']} />
          <Path coords={['1F', '2F']} />
          <Path coords={['1F', '2G']} />
          <Path coords={['2A', '3A']} />
          <Path coords={['2B', '3B']} />
          <Path coords={['2C', '3C']} />
          <Path coords={['2D', '3D']} />
          <Path coords={['2E', '3E']} />
          <Path coords={['2F', '3F']} />
          <Path coords={['2G', '3G']} />
        </Layer>
        <Layer>
          {/* 1A */}
          <Weapon coord='1B' />
          {/* 1B */}
          <Weapon coord='1D' />
          {/* 1E */}
          <Weapon coord='1F' />
          {/* 1G */}
          <Weapon coord='2A' />
          <Weapon coord='2B' />
          <Weapon coord='2C' />
          <Weapon coord='2D' />
          <Weapon coord='2E' />
          <Weapon coord='2F' />
          <Weapon coord='2G' />
          <Weapon coord='3A' />
          <Weapon coord='3B' />
          <Weapon coord='3C' />
          <Weapon coord='3D' />
          <Weapon coord='3E' />
          <Weapon coord='3F' />
          <Weapon coord='3G' />
        </Layer>

      </Stage>
    </>
  );
}
