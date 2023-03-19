import { Circle } from "react-konva"
import { useStore } from '@nanostores/react'
import { selection, modalState, open } from '@/stores/wildhearts/weapon-sim'
import { location } from '@/utils/utils'
import type { Coordinate } from '@/types/wildhearts/weapon'

type Props={
  coord: Coordinate;
}

const colors = {
  fill: { active: '#15803d', inactive: '#1f2937' },
  stroke: { active: '#4ade80', inactive: '#a16207' },
}

export default function Weapon({ coord }: Props): JSX.Element {
  const $selection = useStore(selection)

  const isSelected = () => {
    return Boolean($selection.find(item => item.coord === coord))
  }
  const color = (type: keyof typeof colors) => {
    const state = isSelected() ? 'active' : 'inactive'
    return colors[type][state]
  }

  return (
    <>
      <Circle onClick={() => open('enhanceModal', coord)}
        fill={color('fill')} stroke={color('stroke')}
        shadowColor={colors.stroke.active} shadowBlur={15} shadowEnabled={isSelected()}
        x={location[coord]['x']} y={location[coord]['y']} width={isSelected() ? 30 : 60} height={isSelected() ? 30 : 40} />
    </>
  );
}
