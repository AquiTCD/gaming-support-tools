import { Circle } from "react-konva"
import { location } from '@/utils/utils'
import type { Coordinate } from '@/features/wildhearts/weapon-sim/models/weapon'

type Props={
  coord: Coordinate;
}

export default function InherentCandidate({ coord }: Props): JSX.Element {
  return (
    <>
      <Circle fill='#99f6e4' shadowColor="#99f6e4" shadowBlur={15}
        x={location[coord]['x']} y={location[coord]['y']} width={12} height={12}
        />
    </>
  );
}
