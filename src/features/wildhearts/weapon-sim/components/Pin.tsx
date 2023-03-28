import { Circle, Text } from "react-konva"
import { useStore } from '@nanostores/react'
import { pinnedWeapons  } from '@/features/wildhearts/weapon-sim/stores/skills'
import { location } from '@/utils/utils'
import type { Coordinate, Path } from '@/features/wildhearts/weapon-sim/models/weapon'

type Props={
  coord: Coordinate;
}

export default function Pin({ coord }: Props): JSX.Element {
  const $pinnedWeapons = useStore(pinnedWeapons)

  const pinnedIndex = () => {
    return String($pinnedWeapons.findIndex(m => m === coord) + 1)
  }

  return (
    <>
      <Circle fill='#dc2626'
        x={location[coord]['x']} y={location[coord]['y']} width={17} height={17} offset={{x:12, y:12}}
        />
      <Text text={pinnedIndex()} fontStyle='bold' fill='#f9fafb'
        x={location[coord]['x']} y={location[coord]['y']} offset={{x:16, y:17}} />
    </>
  );
}
