import { Circle } from "react-konva"
import { location } from '@/utils/utils'
import type { Coordinate } from '@/features/wildhearts/weapon-sim/models/weapon'

type Props={
  coord: Coordinate;
}

export default function InheritedCandidate({ coord }: Props): JSX.Element {
  return (
    <>
      <Circle fill='#f5d0fe'
        x={location[coord]['x']} y={location[coord]['y']} width={12} height={12} offset={{x:-12, y:12}}
        />
    </>
  );
}
